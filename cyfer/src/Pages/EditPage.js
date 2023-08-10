import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

// Hooks
import useGetContractType from "../hooks/useGetContractType";
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
    Stack,
    Chip,
} from "@mui/material";

// axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// utils
import walletShort from "wallet-short";

// components
import EditContractWidget from "../sections/editsections/EditContractWidget";
import AlertDialog from "../Components/AlertDialog";

// connex
import Connex from "../api/connex";
import { ABICombined } from "../Vechain/abicombined";
import CurrentClauseWidget from "../sections/editsections/CurrentClauseWidget";

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

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [errmsg, setErrmsg] = useState("");
    const [errtitle, setErrtitle] = useState("");

    const contractType = useGetContractType(contract);

    const handleSubmit = async () => {
        const writeABI = ABICombined[contractType].find(
            ({ name }) => name === "store"
        );
        console.log(clausetext);
        try {
            const visitor = await connex.thor.account(contract);
            const clause = visitor
                .method(writeABI)
                .asClause(clauseNumber, clausetext);
            const result = await connex.vendor
                .sign("tx", [clause])
                .signer(wallet)
                .comment(`writing info ${contract}`)
                .request();
            setErrtitle("Success!");
            setErrmsg(`Transaction done: ${result.txid}`);
            setOpen(true);
        } catch (err) {
            console.log(err);
        }
    };

    const selectItems = contracts.map((contract, index) => (
        <MenuItem value={contract} key={index}>
            <Typography variant="subtitle1">{walletShort(contract)}</Typography>
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
                if (err.response?.status === 403) {
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
    }, [wallet]);

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
                <title> Edit | Cyfer </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Edit the clauses for your contract here
                </Typography>
                <Chip
                    label={`Wallet: ${wallet}`}
                    sx={{
                        p: 2,
                        bgcolor: (theme) => theme.palette.primary.darker,
                        width: "100%",
                    }}
                />
                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                        mt={5}
                        mx={5}
                        spacing={3}
                    >
                        <FormControl sx={{ minWidth: 1 / 2 }}>
                            <InputLabel id="contract-select-label">
                                Contract
                            </InputLabel>
                            <Select
                                labelId="contract-select-label"
                                id="contract-select"
                                value={contract}
                                label="Contract"
                                onChange={handleChange}
                                inputProps={{
                                    MenuProps: {
                                        MenuListProps: {
                                            sx: {
                                                backgroundColor: (theme) =>
                                                    theme.palette.background
                                                        .default,
                                            },
                                        },
                                    },
                                }}
                            >
                                {selectItems}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 1 / 4 }}>
                            <InputLabel id="clause-select-label">
                                Clause
                            </InputLabel>
                            <Select
                                labelId="clause-select-label"
                                id="clause-select"
                                value={clauseNumber}
                                label="Clause"
                                onChange={handleClause}
                                inputProps={{
                                    MenuProps: {
                                        MenuListProps: {
                                            sx: {
                                                backgroundColor: (theme) =>
                                                    theme.palette.background
                                                        .default,
                                            },
                                        },
                                    },
                                }}
                            >
                                {Array.from(Array(20)).map((x, index) => (
                                    <MenuItem key={index} value={index}>
                                        <Typography variant="subtitle2">
                                            {index + 1}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                {contract === "" ? (
                    <Typography>Please Select a Contract</Typography>
                ) : (
                    <Stack spacing={3}>
                        <CurrentClauseWidget
                            contractAddress={contract}
                            clauseNum={clauseNumber}
                        />
                        <EditContractWidget
                            icon={"mdi:contract"}
                            number={clauseNumber}
                            contract={contract}
                            clausetext={clausetext}
                            handleClauseText={handleClauseText}
                            handleSubmit={handleSubmit}
                        />
                    </Stack>
                )}
            </Container>
            <AlertDialog
                open={open}
                handleClose={handleClose}
                errtitle={errtitle}
                errmsg={errmsg}
            />
        </>
    );
}
