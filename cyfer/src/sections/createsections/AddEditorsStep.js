import { useState } from "react";

// Mui
import {
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    Box,
    List,
} from "@mui/material";

export default function AddEditorsStep() {
    const [addedEditors, setAddedEditors] = useState([]);

    // Dialog states
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Username and wallet address
    const [username, setUsername] = useState("");
    const handleUserChange = (e) => {
        setUsername(e.target.value);
    };

    const [walletAddress, setWalletAddress] = useState("");
    const handleWalletAddressChange = (e) => {
        setWalletAddress(e.target.value);
    };

    const handleAddEditor = () => {
        handleClose();
        const Editor = {
            username,
            walletAddress,
        };
        setAddedEditors((prev) => [...prev, Editor]);
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h5">
                Add editors to your new contract
            </Typography>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Editor
            </Button>
            <Box sx={{ mt: 1 }}>
                <List></List>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                    }}
                >
                    Add Editor for Contract
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
                        onClick={handleAddEditor}
                        disabled={
                            walletAddress === "" || username === ""
                                ? true
                                : false
                        }
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
