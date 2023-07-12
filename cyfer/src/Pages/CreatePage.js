import { useState } from "react";

// mui
import { Container, Stack, Typography } from "@mui/material";

// Components
// import Iconify from "../Components/iconify/Iconify";
import AlertDialog from "../Components/AlertDialog";
import CreateSteps from "../sections/createsections/CreateSteps";

// Vechain
import Connex from "../api/connex";
import { byteCodes } from "../Vechain/abicombined";

import { Helmet } from "react-helmet-async";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useWallet from "../hooks/useWallet";

// Utils
import encode from "../utils/encode";

export default function CreatePage() {
    const axiosPrivate = useAxiosPrivate();
    const connex = Connex();

    // Wallet to create contract
    const { wallet } = useWallet();

    // For setting the type of contract
    const [selectedContractType, setSelectedContractType] = useState(1);

    const handleChangeContractType = (e) => {
        setSelectedContractType(Number(e.target.value));
    };

    // For getting the contract name from user in set name step
    const [contractName, setContractname] = useState("");
    const handleChangeName = (e) => {
        setContractname(e.target.value);
    };

    const [contractDesc, setContractDesc] = useState("");
    const handleChangeDesc = (e) => {
        setContractDesc(e.target.value);
    };
    // Function to set name of contract
    // const handleCreateName = async () => {
    //     console.log("setting name of contract");
    //     if (contractName === "") {
    //         setErrtitle("Error!");
    //         setErrmsg(`Please give a name`);
    //         setOpen(true);
    //         return;
    //     }
    //     const setNameABI = ABICombined[selectedContractType].find(
    //         ({ name }) => name === "changeName"
    //     );
    //     try {
    //         const clause = connex.thor
    //             .account(contractAddress)
    //             .method(setNameABI)
    //             .asClause(contractName);
    //         const result = await connex.vendor
    //             .sign("tx", [clause])
    //             .signer(wallet)
    //             .comment("setting name")
    //             .request();
    //         setErrtitle("Success!");
    //         setErrmsg(`transaction done! ${result.txid}`);
    //         setOpen(true);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // Getting the newly created contract address
    const [contractAddress, setcontractAddress] = useState("");

    // Send the contract Address to the MongoDB
    const sendContractDB = async (signer) => {
        try {
            const Axiosresp = await axiosPrivate.post("/wallet/addcontract", {
                walletaddress: signer.toLowerCase(),
                contractaddress: contractAddress,
            });
            console.log(Axiosresp.data);
            setErrtitle("Success!");
            setErrmsg(`Contract Created Successfully`);
            setOpen(true);
            // handleCreateName();
        } catch (err) {
            console.log(err);
            console.log("could not send to db");
        }
    };

    // Delay before getting the contract address
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Getting the contract address using txid
    const seeContractAddress = async (trans) => {
        try {
            const resp = await axiosPrivate.get(
                `/wallet/getcontractaddress/${trans}`
            );
            console.log(resp.data);
            setcontractAddress(resp.data);
            if (resp.data !== "") {
                console.log("sending contract DB", resp.data);
                sendContractDB(wallet, resp.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function to create the contract on the blockchain
    const handleCreateContract = async () => {
        if (wallet === "") {
            setErrtitle("Error!");
            setErrmsg(`Select a Wallet`);
            setOpen(true);
            return;
        }
        if (contractName === "") {
            setErrtitle("Error!");
            setErrmsg(`No contract name provided`);
            setOpen(true);
            return;
        }
        setErrtitle("Info");
        setErrmsg(`Please Authenticate with Veworld/Sync2 (without extension)`);
        setOpen(true);
        console.log("creating contract with bytecode");
        const strings = [contractName, "this is the description"];
        const encodedStrings = encode(strings);
        const finalByteCode = byteCodes[selectedContractType] + encodedStrings;
        try {
            const resp = await connex.vendor
                .sign("tx", [
                    {
                        value: 0,
                        data: finalByteCode,
                        to: null,
                    },
                ])
                .signer(wallet)
                .comment(`Deploy contract of type ${selectedContractType}`)
                .request();
            if (resp) {
                await delay(10000);
                console.log("seeing contract address");
                seeContractAddress(resp.txid, resp.signer);
            } else {
                setErrtitle("Error!");
                setErrmsg(`Failed to create contract`);
                setOpen(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // For controlling the alert dialog
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [errmsg, setErrmsg] = useState("");
    const [errtitle, setErrtitle] = useState("");

    return (
        <>
            <Helmet>
                <title> Create | Minimal UI </title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Typography variant="h4">
                        Create your very own contract
                    </Typography>
                    <Typography variant="h5">
                        Your selected wallet is :{wallet}
                    </Typography>
                    {/* <Button
                        sx={{ width: 1 / 2 }}
                        onClick={handleCreateContract}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Begin your journey here
                    </Button>
                    <Typography variant="h5">
                        You have created a contract with address:{" "}
                        {contractAddress}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                type="text"
                                id="contractName"
                                name="contract name"
                                autoComplete="off"
                                variant="outlined"
                                label="Contract Name"
                                value={contractName}
                                onChange={handleChange}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                sx={{ width: 1 / 2 }}
                                color="info"
                                onClick={handleCreateName}
                                variant="contained"
                                startIcon={<Iconify icon="subway:title" />}
                                disabled={contractAddress === "" ? true : false}
                            >
                                Set Name
                            </Button>
                        </Grid>
                    </Grid> */}
                    <CreateSteps
                        selectedContractType={selectedContractType}
                        handleChangeContractType={handleChangeContractType}
                        contractName={contractName}
                        handleChangeName={handleChangeName}
                        contractAddress={contractAddress}
                        handleCreateContract={handleCreateContract}
                        contractDesc={contractDesc}
                        handleChangeDesc={handleChangeDesc}
                    />
                </Stack>
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
