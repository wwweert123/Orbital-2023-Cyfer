import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

import useWallet from "../hooks/useWallet";

import { useState, useEffect } from "react";

// @mui
import {
    Container,
    Typography,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

// axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// utils
import walletShort from "wallet-short";

export default function EditPage(color = "primary") {
    const axiosPrivate = useAxiosPrivate();
    const [contracts, setContracts] = useState([]);

    const navigate = useNavigate();
    const location = useLocation(); //current location

    const { wallet } = useWallet();

    const selectItems = contracts.map((contract) => (
        <MenuItem value={wallet}>
            <Typography
                variant="h5"
                sx={{
                    color: (theme) => theme.palette[color].darker,
                }}
            >
                {walletShort(wallet)}
            </Typography>
        </MenuItem>
    ));

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getWallets = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/wallet/contracts/${wallet}`,
                    {
                        signal: controller.signal,
                    }
                );
                console.log(response.data);
                const contracts = response.data.owned.concat(
                    response.data.editor
                );
                isMounted && setContracts(contracts);
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

    const [contract, setContract] = useState("");

    const handleChange = (e) => {
        setContract(e.target.value);
    };
    //const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Edit | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Edit the clauses for your contract here
                </Typography>
                <Box>
                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Your selected wallet is :{wallet}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="contract-select-label">
                            Contract
                        </InputLabel>
                        <Select
                            labelId="contract-select-label"
                            id="contract-select"
                            value={contract}
                            label="Contract"
                            onChange={handleChange}
                        >
                            {selectItems}
                        </Select>
                    </FormControl>
                </Box>
            </Container>
        </>
    );
}
