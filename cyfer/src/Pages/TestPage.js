import { useEffect, useState } from "react";

// mui
import {
    Alert,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

// Components
import Iconify from "../Components/iconify/Iconify";

// Vechain
import Connex from "../api/connex";
import { ABI } from "../Vechain/abi";

import { Helmet } from "react-helmet-async";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useWallet from "../hooks/useWallet";

export default function TestPage() {
    const { wallet } = useWallet();
    // const connex = new Connex({
    //     node: "https://vethor-node-test.vechaindev.com",
    //     network: "test",
    // });
    const connex = Connex();

    const [transactionDetails, setTransactionDetails] = useState([]);

    const [transactionHistory, setTransactionHistory] = useState("");

    const [transactionHistoryCount, setTransactionHistoryCount] = useState("");

    const axiosPrivate = useAxiosPrivate();

    // const handleChange = (e) => {
    //     setContractname(e.target.value);
    // };

    // const sendContractDB = async (signer) => {
    //     try {
    //         const Axiosresp = await axiosPrivate.post("/wallet/addcontract", {
    //             walletaddress: signer.toLowerCase(),
    //             contractaddress: contractAddress,
    //         });
    //         console.log(Axiosresp.data);
    //     } catch (err) {
    //         console.log(err);
    //         console.log("could not send to db");
    //     }
    // };
    // setTransactionHistoryCount("loading");
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
                // For each item in the output array, return an object with the desired properties.
                // Note: This assumes that each item in the clauses array only contains one object.
                // If there are multiple objects, this will need to be adjusted.
                return {
                    txID: item.txID,
                    origin: item.origin,
                    to: item.clauses[0].to,
                    data: item.clauses[0].data,
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
                                Origin: {detail.origin}
                            </Typography>
                            <Typography variant="h6">
                                To: {detail.to}
                            </Typography>
                            <Typography variant="h6">
                                Data: {detail.data}
                            </Typography>
                            Add data dissection logic here
                        </div>
                    ))}
                </Stack>
            </Container>
        </>
    );
}
