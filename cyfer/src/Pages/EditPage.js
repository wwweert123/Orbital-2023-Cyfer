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
    Grid,
    Stack,
} from "@mui/material";

// axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// utils
import walletShort from "wallet-short";

export default function EditPage() {
    const axiosPrivate = useAxiosPrivate();
    const [contracts, setContracts] = useState([]);

    const [clause, setClause] = useState(0);

    const navigate = useNavigate();
    const location = useLocation(); //current location

    const { wallet } = useWallet();

    const selectItems = contracts.map((contract) => (
        <MenuItem value={wallet}>
            <Typography
                variant="h5"
                sx={{
                    color: (theme) => theme.palette.primary.dark,
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
                if (err.response.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
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

    const handleClause = (e) => {
        setClause(e.target.value);
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
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                        mt={5}
                        mx={5}
                    >
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
                        <FormControl fullWidth>
                            <InputLabel id="clause-select-label">
                                Clause
                            </InputLabel>
                            <Select
                                labelId="clause-select-label"
                                id="clause-select"
                                value={clause}
                                label="Clause"
                                onChange={handleClause}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}></Grid>
                </Grid>
            </Container>
        </>
    );
}
