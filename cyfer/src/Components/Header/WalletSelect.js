import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Axios
import { useState } from "react";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";
import useWallet from "../../hooks/useWallet";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Mui
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    Popover,
    IconButton,
    Stack,
    Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function WalletSelect({ color = "primary" }) {
    const [open, setOpen] = useState(null);
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const navigate = useNavigate();
    const location = useLocation(); //current location
    const axiosPrivate = useAxiosPrivate();
    const [wallets, setWallets] = useLocalStorage("wallets", []);

    const { wallet, setWallet } = useWallet();

    const handleChange = (e) => {
        console.log(e);
        setWallet(e.target.innerText);
        setOpen(null);
    };

    const selectItems = wallets.map((currentwallet) => (
        <MenuItem
            value={currentwallet}
            selected={currentwallet === wallet}
            onClick={handleChange}
        >
            {currentwallet}
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
                navigate("/", {
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
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.focusOpacity
                            ),
                    }),
                }}
            >
                <img
                    src="/assets/icons/wallet.svg"
                    alt="/assets/icons/wallet.svg"
                />
            </IconButton>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
                        "& .MuiMenuItem-root": {
                            px: 1,
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Stack spacing={0.75}>{selectItems}</Stack>
            </Popover>
        </>
    );
}
