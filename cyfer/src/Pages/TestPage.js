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
} from "@mui/material";

// Vechain
import { abiDict } from "../Vechain/abiDict";
import { Helmet } from "react-helmet-async";
import { ABI1 } from "../Vechain/abi1";
import Connex from "../api/connex";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useWallet from "../hooks/useWallet";
function dataShort(data) {
    if (typeof data === "string") {
        return (
            `${data}`.slice(0, 10) +
            "..." +
            `${data}`.slice(`${data}`.length - 64)
        );
    } else {
        //throw new Error("Invalid format: " + typeof data);
    }
}

function fromHex(hex) {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
        let temp = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        str += temp;
    }
    return str;
}

function decode(encoded, functionName) {
    let strings = [];
    if (functionName === "Set Clause(clause number, string)") {
        let intVariable = encoded.slice(0, 64);
        strings.push(parseInt(intVariable, 16));
        strings.push(", ");
        let dataStart = parseInt(encoded.slice(64, 128), 16);
        let stringVariable = fromHex(
            encoded.slice(dataStart + 64, encoded.length)
        );
        strings.push(stringVariable);
    } else if (functionName === "Add Editor(address)") {
        strings.push("0x" + encoded.slice(24, 64));
    } else {
        for (let i = 64; i < encoded.length; i += 64) {
            let offset = parseInt(encoded.slice(i, i + 64), 16) * 2;
            let length = parseInt(encoded.slice(offset, offset + 64), 16) * 2;
            let data = encoded.slice(offset + 64, offset + 64 + length);
            strings.push(fromHex(data));
        }
    }
    return strings;
}

const TransactionItem = ({ index, detail }) => {
    const connex = Connex();
    const [contractName, setContractName] = useState("");
    const getName = async (contractAddress) => {
        const getNameABI = ABI1.find(({ name }) => name === "getName");
        try {
            const result = await connex.thor
                .account(contractAddress)
                .method(getNameABI)
                .call();
            setContractName(result.decoded[0]);
            console.log(result.decoded[0]);
        } catch (err) {
            console.log(err);
            return " ";
        }
    };
    useEffect(() => {
        getName(detail.to);
    }, [detail.to]);
    return (
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
                    <Typography variant="subtitle2">
                        Index:{index} {detail.headerDate}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[700],
                    }}
                >
                    <Typography variant="body1">Date: {detail.date}</Typography>
                    <Typography variant="body1">
                        Transaction ID: {detail.txID}
                    </Typography>
                    <Typography variant="body1">
                        Origin: {detail.origin}
                    </Typography>
                    <Typography>
                        To: {detail.to} {contractName}
                    </Typography>
                    <Typography variant="body1">
                        Data: {dataShort(detail.data)}
                    </Typography>
                    <Typography variant="body1">
                        Function Name: {detail.name} Parameters:{" "}
                        {detail.parameters}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default function TestPage() {
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
            const details = await Promise.all(resp.data.txs.map(async (item) => {
                let tempUser = item.origin;
                if (tempUser == wallet){
                    tempUser += " (you)";
                }
                let tempDate = (new Date(item.meta.blockTimestamp * 1000));
                let fullDate = tempDate.toString();
                let shortDate = tempDate.toLocaleDateString();
                let tempName = '';
                try {
                    const result = await connex.thor
                        .account(item.clauses[0].to)
                        .method(getNameABI)
                        .call();
                    tempName = result.decoded[0];
                } catch (err) {
                    console.error('Error getting contract name: ', err);
                }
                let functionName, variable;
                if (item.size > 1000) {
                    functionName = "Create Contract";
                    variable = "null";
                } else {
                    let slicedPortion = item.clauses[0].data.slice(2, 10);
                    if (abiDict.hasOwnProperty(slicedPortion)) {
                        functionName = abiDict[slicedPortion];
                        let restOfData = item.clauses[0].data.slice(10);
                        variable = decode(restOfData, functionName);
                    } else {
                        functionName = "unknown";
                        variable = "unknown";
                    }
                }
                return {
                    date: fullDate,
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
            }));
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
                <title> Transaction History</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Transaction History
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Your selected wallet is :{wallet}
                    </Typography>
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
                                <Typography variant="subtitle2">
                                    Index:{index} {detail.headerDate}
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{backgroundColor: (theme) => theme.palette.grey[700],}}
                                >
                                    <Typography variant="body1">
                                        Date: {detail.date}   
                                    </Typography>
                                    <Typography variant="body1">
                                        Transaction ID: {detail.txID}
                                    </Typography>
                                    <Typography variant="body1">
                                        From: {detail.origin}
                                    </Typography>
                                    <Typography>
                                        To: {detail.to} ({detail.contractName})
                                    </Typography>
                                    <Typography variant="body1">
                                        Data: {dataShort(detail.data)}
                                    </Typography>
                                    <Typography variant="body1">
                                        Function Name: {detail.name}     Parameters: {detail.parameters}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </Stack>
            </Container>
        </>
    );
}
