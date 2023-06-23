import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button } from "@mui/material";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

// utils
import walletshort from "wallet-short";

// axios
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; //import the hook
import useLocalStorage from "../../hooks/useLocalStorage";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AccountDetailsWidget.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    //numContract: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    sx: PropTypes.object,
};

export default function AccountDetailsWidget({
    handleClick,
    // numContract,
    icon,
    color = "primary",
    sx,
}) {
    const navigate = useNavigate();
    const location = useLocation(); //current location
    const [wallets, setWallets] = useLocalStorage("wallets", []);
    const axiosPrivate = useAxiosPrivate();

    const [selectedWallet, setSelectedWallet] = useLocalStorage("selected", "");
    const [numContract, setnumContract] = useState("");

    const checkContractNum = async (wallet) => {
        if (wallet === "") {
            setnumContract("?");
            return;
        }
        try {
            const response = await axiosPrivate.get(
                `/wallet/contracts/${wallet}`,
                {
                    signal: AbortSignal.timeout(5000),
                }
            );
            console.log(response.data);
            const total =
                response.data.owned.length + response.data.editor.length;
            setnumContract(total);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setSelectedWallet(e.target.value);
        checkContractNum(selectedWallet);
    };

    const selectItems = wallets.map((wallet) => (
        <MenuItem value={wallet}>
            <Typography
                variant="h3"
                sx={{
                    color: (theme) => theme.palette[color].darker,
                }}
            >
                {walletshort(wallet)}
            </Typography>
        </MenuItem>
    ));

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getWallets = async () => {
            try {
                const response = await axiosPrivate.get("/wallet", {
                    signal: controller.signal,
                });
                const walletAddresses = response.data.map(
                    (wallet) => wallet.address
                );
                console.log(walletAddresses);
                isMounted && setWallets(walletAddresses);
            } catch (err) {
                console.error(err);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getWallets();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: "center",
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
        >
            <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(
                            theme.palette[color].dark,
                            0
                        )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>
            <FormControl sx={{ width: 1 / 2 }}>
                <InputLabel
                    id="select-wallet-label"
                    sx={{
                        color: (theme) => theme.palette[color].darker,
                    }}
                >
                    Wallet
                </InputLabel>
                <Select
                    labelId="select-wallet-label"
                    id="select-wallet"
                    value={selectedWallet}
                    label="Wallet"
                    onChange={handleChange}
                >
                    {selectItems}
                </Select>
            </FormControl>
            <Typography variant="h5" sx={{ opacity: 0.72 }}>
                You Owned or have Editor rights to {numContract} contracts
            </Typography>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                mt={5}
                mx={5}
            >
                <Typography variant="h5" gutterBottom>
                    Can't see your Wallet?
                </Typography>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    startIcon={<Iconify icon="wpf:ask-question" />}
                >
                    Tell us who you are
                </Button>
            </Stack>
        </Card>
    );
}
