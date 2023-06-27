import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
} from "@mui/material";

import { useState, useEffect } from "react";

// Conex
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";

export default function AddEditorDialog({ contract }) {
    const connex = Connex();

    const AddEditor = async () => {
        const setEditorABI = ABI.find(
            ({ name }) => name === "addAuthorizedAddress"
        );

        const clause = connex.thor
            .account(contract)
            .method(setEditorABI)
            .asClause(walletAddress);
        const result = await connex.vendor
            .sign("tx", [clause])
            .comment("setting editor")
            .request();
        alert("transaction done: ", result.txid);
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

    // Popup message
    const [infoMsg, setInfoMsg] = useState("");
    useEffect(() => {
        setInfoMsg("");
    }, [username, walletAddress]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                <Alert
                    severity="success"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    }}
                >
                    Success! User Wallet Address added as Editor
                </Alert>
            </Dialog>
        </div>
    );
}
