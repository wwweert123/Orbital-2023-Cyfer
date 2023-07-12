import { useEffect, useState } from "react";

// mui
import {
    Container,
    Stack,
    Typography,
} from "@mui/material";

// Vechain
import Connex from "../api/connex";
import { abiDict } from "../Vechain/abiDict";

import { Helmet } from "react-helmet-async";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useWallet from "../hooks/useWallet";

export default function TestPage() {
    const { wallet } = useWallet();

    const connex = Connex();

    const [transactionDetails, setTransactionDetails] = useState([]);

    const [transactionHistoryCount, setTransactionHistoryCount] = useState("");

    const axiosPrivate = useAxiosPrivate();

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
            const details = resp.data.txs.map((item) => {
                let functionName, variable;
                if (item.size > 1000) {
                    functionName = "Create Contract"
                    variable = "null"
                } 
                else{
                    let slicedPortion = item.data.slice(2, 10);
                    if (abiDict.hasOwnProperty(slicedPortion)) {
                        functionName = abiDict[slicedPortion];
                        let restOfData = item.data.slice(10);
                        variable = decode(restOfData);
                    } 
                    else {
                        functionName = "unknown";
                        variable = "unknown";
                    }
                }
                return {
                    txID: item.txID,
                    origin: item.origin,
                    to: item.clauses[0].to,
                    data: item.clauses[0].data,
                    size: item.size,
                    name: functionName,
                    parameters: variable
                };
            });
            setTransactionDetails(details);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        seeContractHistory();
    }, []);

    // useEffect(() => {
    //     console.log(contractAddress);
    //     if (contractAddress !== "") {
    //         sendContractDB(wallet, contractAddress);
    //         seeContractHistory();
    //     }

    //     // eslint-disable-next-line
    // }, [contractAddress]);

    return (
        <>
            <Helmet>
                <title> Create | Minimal UI </title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Create your very own contract
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Your selected wallet is :{wallet}
                    </Typography>
                    <Typography variant="h5">
                        Number of transaction History: {transactionHistoryCount}
                    </Typography>
                    {transactionDetails.map((detail, index) => (
                        <div key={index}>
                            <Typography variant="h6">
                                Transaction ID: {detail.txID}
                            </Typography>
                            <Typography variant="h6">
                                Origin: {detail.origin}     To: {detail.to}
                            </Typography>
                            <Typography variant="h6">
                                Data: {detail.data}
                            </Typography>
                            <Typography variant="h6">
                                Function Name: {detail.name}     Parameters: {detail.parameters}
                            </Typography>
                        </div>
                    ))}
                </Stack>
            </Container>
        </>
    );
}
