import { useEffect, useState } from "react";

// Mui
import { Stack, Typography, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Components
import Iconify from "../../Components/iconify/Iconify";
import AlertDialog from "../../Components/AlertDialog";

import useWallet from "../../hooks/useWallet";

// Utils
import encode from "../../utils/encode";

// Vechain
import { byteCodes } from "../../Vechain/abicombined";
import Connex from "../../api/connex";

// Axios
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const contractCode = {
    1: "Basic",
    2: "Variant 1",
    3: "Variant 2",
};

export default function CreateContractStep({
    selectedContractType,
    contractName,
    contractDesc,
    contractAddress,
    handleSetContractAddress,
}) {
    // Axios Connection Instance
    const axiosPrivate = useAxiosPrivate();

    // Vechain Connex Connection Instance
    const connex = Connex();

    // Wallet to create contract
    const { wallet } = useWallet();

    // Dialog
    // For controlling the alert dialog
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [errmsg, setErrmsg] = useState("");
    const [errtitle, setErrtitle] = useState("");

    // Send the contract Address to the MongoDB
    const sendContractDB = async (signer, contractAddressString) => {
        try {
            const Axiosresp = await axiosPrivate.post("/wallet/addcontract", {
                walletaddress: signer.toLowerCase(),
                contractaddress: contractAddressString,
            });
            setProgress(100);
            console.log(Axiosresp.data);
            setErrtitle("Success!");
            setErrmsg(`Contract Created Successfully`);
            setOpen(true);
            // handleCreateName();
        } catch (err) {
            console.log(err);
            console.log("could not send to db");
        }
        setProgress(0);
    };

    useEffect(() => {
        handleSetContractAddress("0x217022135ff7f4024b9d785a06239487054f65d2");
    }, []);

    // Getting the contract address using txid
    const seeContractAddress = async (trans) => {
        try {
            const resp = await axiosPrivate.get(
                `/wallet/getcontractaddress/${trans}`
            );
            console.log(resp.data);
            handleSetContractAddress(resp.data);
            if (resp.data !== "") {
                setProgress(80);
                console.log("sending contract DB", resp.data);
                sendContractDB(wallet, resp.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Delay before getting the contract address
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
        const strings = [contractName, contractDesc];
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
                setProgress(20);
                await delay(3000);
                setProgress(40);
                await delay(3000);
                setProgress(60);
                await delay(3000);
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

    const [progress, setProgress] = useState(0);
    const handleClick = () => {
        handleCreateContract();
    };

    return (
        <>
            <Stack spacing={3}>
                <Typography variant="h5">
                    Check your details and Create!
                </Typography>
                <Typography variant="Subtitle1">
                    Contract Type: {contractCode[selectedContractType]}
                </Typography>
                <Typography variant="Subtitle1">
                    Contract Name: {contractName}
                </Typography>
                <Typography variant="Subtitle1">
                    Contract Description: {contractDesc}
                </Typography>
                <Stack direction={"row"} spacing={3}>
                    <Button
                        sx={{ width: 1 / 2 }}
                        onClick={handleClick}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Create Contract
                    </Button>
                    <CircularProgress variant="determinate" value={progress} />
                </Stack>
                <Typography variant="h5">
                    You have created a contract with address:
                    {contractAddress}
                </Typography>
            </Stack>
            <AlertDialog
                open={open}
                handleClose={handleClose}
                errtitle={errtitle}
                errmsg={errmsg}
            />
        </>
    );
}
