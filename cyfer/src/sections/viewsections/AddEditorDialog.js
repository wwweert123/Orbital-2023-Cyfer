import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
    Collapse,
} from "@mui/material";

// Proptypes
import PropTypes from "prop-types";

import { useState, useEffect } from "react";

// Conex
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";

// axios
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

AddEditorDialog.propTypes = {
    contract: PropTypes.string.isRequired,
    wallet: PropTypes.string.isRequired,
};

export default function AddEditorDialog({ contract, wallet }) {
    // Axios Private Instance
    const axiosPrivate = useAxiosPrivate();

    // For fading of the alert message
    const [checked, setChecked] = useState(false);

    // Popup message
    // For the info message
    const [infoMsg, setInfoMsg] = useState("");
    // For the type of message
    const [textSeverity, setTextSeverity] = useState("success");

    const connex = Connex();

    // Send editor information to DB
    const sendEditorDB = async () => {
        try {
            const Axiosresp = await axiosPrivate.post("/wallet/addcontract", {
                editor: username,
                walletaddress: walletAddress.toLowerCase(),
                contractaddress: contract,
            });
            console.log(Axiosresp.data);
        } catch (err) {
            console.log(err);
            console.log("could not send to db");
        }
    };

    const AddEditor = async () => {
        const setEditorABI = ABI.find(
            ({ name }) => name === "addAuthorizedAddress"
        );

        try {
            const clause = connex.thor
                .account(contract)
                .method(setEditorABI)
                .asClause(walletAddress);

            const result = await connex.vendor
                .sign("tx", [clause])
                .signer(wallet)
                .comment("setting editor")
                .request();
            alert("transaction done: ", result.txid);
            setInfoMsg("Success! Editor added to the contract");
            setTextSeverity("success");
            setChecked(true);
            sendEditorDB();
        } catch (err) {
            console.log(err);
            setInfoMsg("Oh No! Something went wrong!");
            setTextSeverity("error");
            setChecked(true);
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        AddEditor();
    };

    const [username, setUsername] = useState("");
    const handleUserChange = (e) => {
        setUsername(e.target.value);
    };

    const [walletAddress, setWalletAddress] = useState("");
    const handleWalletAddressChange = (e) => {
        setWalletAddress(e.target.value);
    };

    useEffect(() => {
        setChecked(false);
        setInfoMsg("");
    }, [username, walletAddress]);

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Editor
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    }}
                >
                    Add Editor For Contract
                </DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    }}
                >
                    <DialogContentText>
                        To add, please enter the account username that is
                        registered with us and the specific wallet address which
                        you wish to share with.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={handleUserChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Wallet Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={walletAddress}
                        onChange={handleWalletAddressChange}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    }}
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            walletAddress === "" || username === ""
                                ? true
                                : false
                        }
                    >
                        Add
                    </Button>
                </DialogActions>
                <Collapse in={checked}>
                    <Alert
                        severity={textSeverity}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.background.default,
                        }}
                    >
                        {infoMsg}
                    </Alert>
                </Collapse>
            </Dialog>
        </div>
    );
}
