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

// components
import EditContractWidget from "../sections/editsections/EditContractWidget";

// connex
import Connex from "../api/connex";
import { ABI } from "../Vechain/abi";

export default function EditPage() {
    const connex = Connex();
    const axiosPrivate = useAxiosPrivate();
    const [contracts, setContracts] = useState([]);

    const [clauseNumber, setClauseNumber] = useState(0);

    const [clausetext, setClauseText] = useState("");

    const [contract, setContract] = useState("");

    const navigate = useNavigate();
    const location = useLocation(); //current location

    const { wallet } = useWallet();

    const handleSubmit = async () => {
        const writeABI = ABI.find(({ name }) => name === "store");
        console.log(clausetext);
        try {
            const visitor = await connex.thor.account(contract);
            const clause = visitor
                .method(writeABI)
                .asClause(clauseNumber, clausetext);
            const result = await connex.vendor
                .sign("tx", [clause])
                .signer(wallet)
                .comment("writing info")
                .request();
            alert("transaction done: ", result.txid);
        } catch (err) {
            console.log(err);
        }
    };

    const selectItems = contracts.map((contract) => (
        <MenuItem value={contract} sx={{ color: "black" }}>
            <Typography
                variant="h5"
                sx={{
                    color: (theme) => theme.palette.primary.dark,
                }}
            >
                {walletShort(contract)}
            </Typography>
        </MenuItem>
    ));

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getContracts = async () => {
            if (wallet === "") {
                console.log("no wallet selected");
                return;
            }
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
        getContracts();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setContract(e.target.value);
    };

    const handleClause = (e) => {
        setClauseNumber(e.target.value);
    };

    const handleClauseText = (e) => {
        setClauseText(e.target.value);
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
                        spacing={3}
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
                                value={clauseNumber}
                                label="Clause"
                                onChange={handleClause}
                            >
                                <MenuItem value={0}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        0
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={1}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        1
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        2
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        3
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={4}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        4
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={5}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        5
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={6}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        6
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={7}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        7
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={8}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        8
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={9}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                        }}
                                    >
                                        9
                                    </Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <EditContractWidget
                            icon={"mdi:contract"}
                            number={clauseNumber}
                            clausetext={clausetext}
                            handleClauseText={handleClauseText}
                            handleSubmit={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
