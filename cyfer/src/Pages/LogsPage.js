import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// mui
import {
    Container,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
} from "@mui/material";

// Vechain
import { abiDictUser } from "../Vechain/abiDict";
import { Helmet } from "react-helmet-async";
import { ABI1 } from "../Vechain/abi1";
import Connex from "../api/connex";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useWallet from "../hooks/useWallet";
import { decode } from "../utils/decode";

const colorcode = {
    "added an editor": "#38dbe7",
    "set contract Description": "#c2f0cb",
    "set Clause": "#dc62fd",
    "voted for the Proposal": "##fad170",
    "voted against the Proposal": "#6ae26c",
    "Create Contract": "#c04f39",
    unknown: "2e2935",
};

export default function LogsPage() {
    const connex = Connex();
    const { wallet } = useWallet();

    const [transactionDetails, setTransactionDetails] = useState([]);

    const [transactionHistoryCount, setTransactionHistoryCount] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getNameABI = ABI1.find(({ name }) => name === "getName");

    const seeContractHistory = async () => {
        if (wallet === "") {
            console.log("no wallet selected");
            return;
        }
        try {
            const resp = await axiosPrivate.get(
                `/wallet/gettransaction/${wallet}`
            );
            console.log(resp.data);
            setTransactionHistoryCount(resp.data.count);
            const details = await Promise.all(
                resp.data.txs.map(async (item) => {
                    let tempUser = item.origin;
                    // if (tempUser === wallet) {
                    //     tempUser += " (you)";
                    // }
                    let tempDate = new Date(item.meta.blockTimestamp * 1000);
                    let shortDate = tempDate.toLocaleDateString();
                    let tempName = "";
                    try {
                        const result = await connex.thor
                            .account(item.clauses[0].to)
                            .method(getNameABI)
                            .call();
                        tempName = result.decoded[0];
                    } catch (err) {
                        console.error("Error getting contract name: ", err);
                    }
                    let functionName, variable;
                    if (item.size > 1000) {
                        functionName = "Create Contract";
                        variable = "null";
                    } else {
                        let slicedPortion = item.clauses[0].data.slice(2, 10);
                        if (abiDictUser.hasOwnProperty(slicedPortion)) {
                            functionName = abiDictUser[slicedPortion];
                            let restOfData = item.clauses[0].data.slice(10);
                            variable = decode(restOfData, functionName);
                        } else {
                            functionName = "unknown";
                            variable = "unknown";
                        }
                    }
                    return {
                        date: tempDate,
                        headerDate: shortDate,
                        txID: item.txID,
                        origin: tempUser,
                        to: item.clauses[0].to,
                        contractName: tempName,
                        data: item.clauses[0].data,
                        size: item.size,
                        name: functionName,
                        parameters: variable,
                    };
                })
            );
            setTransactionDetails(details);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        seeContractHistory();
        // eslint-disable-next-line
    }, [wallet]);

    return (
        <>
            <Helmet>
                <title> Logs | Cyfer</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Transaction History
                    </Typography>
                    <Chip
                        label={`Wallet: ${wallet}`}
                        sx={{
                            p: 2,
                            bgcolor: (theme) => theme.palette.primary.darker,
                            width: "100%",
                        }}
                    />
                    <Typography variant="h5">
                        Number of transactions: {transactionHistoryCount}
                    </Typography>
                    <Typography variant="h6">Recent transactions:</Typography>
                    {transactionDetails.map((detail, index) => (
                        <div key={index}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.background.neutral,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={3}
                                    >
                                        <Typography variant="subtitle2">
                                            {detail.headerDate}
                                        </Typography>
                                        <Chip
                                            label={`${detail.name}`}
                                            sx={{
                                                p: 2,
                                                bgcolor: colorcode[detail.name],
                                                width: "100%",
                                            }}
                                        />
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.grey[700],
                                    }}
                                >
                                    {detail.name === "unknown" ? (
                                        "Unknown Transaction"
                                    ) : (
                                        <>
                                            <Typography variant="h6">
                                                You{" "}
                                                <Chip
                                                    label={`${detail.origin}`}
                                                    sx={{
                                                        p: 1,
                                                        bgcolor: (theme) =>
                                                            theme.palette
                                                                .primary.darker,
                                                        m: 1,
                                                    }}
                                                />
                                                {detail.name}{" "}
                                                {detail.parameters === "null" ||
                                                detail.parameters ===
                                                    undefined ? (
                                                    <></>
                                                ) : (
                                                    <Chip
                                                        label={`${detail.parameters}`}
                                                        sx={{
                                                            p: 1,
                                                            bgcolor: (theme) =>
                                                                theme.palette
                                                                    .error
                                                                    .darker,
                                                            m: 1,
                                                        }}
                                                    />
                                                )}
                                            </Typography>
                                            <Typography variant="overline">
                                                in {"<"}
                                                {detail.contractName}
                                                {">"}{" "}
                                                <Chip
                                                    label={`${detail.to}`}
                                                    sx={{
                                                        p: 1,
                                                        bgcolor: (theme) =>
                                                            theme.palette
                                                                .warning.darker,
                                                        m: 1,
                                                    }}
                                                />
                                            </Typography>
                                        </>
                                    )}

                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={3}
                                    >
                                        <Typography variant="body2">
                                            Transaction Made on:{" "}
                                            {detail.date
                                                .toString()
                                                .slice(0, -35)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Transaction ID: {detail.txID}
                                        </Typography>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </Stack>
            </Container>
        </>
    );
}
