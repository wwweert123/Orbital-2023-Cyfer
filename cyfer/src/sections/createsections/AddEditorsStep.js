import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";

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
    Collapse,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import {
    PersonAddAltOutlined as PersonAddAltOutlinedIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

// utils
import walletShort from "wallet-short";
import Connex from "../../api/connex";

// ABI
import { ABI } from "../../Vechain/abi";

function renderItem({ item, handleRemoveEditor }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemoveEditor(item.walletAddress)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Stack spacing={3} direction="row">
                <PersonAddAltOutlinedIcon
                    sx={{ color: (theme) => theme.palette.warning.dark }}
                />
                <ListItemText
                    primary={item.username}
                    secondary={item.walletAddress}
                />
            </Stack>
        </ListItem>
    );
}

export default function AddEditorsStep({ contractAddress }) {
    // Connex Connection Instance
    const connex = Connex();

    const [addedEditors, setAddedEditors] = useState([]);

    // Remove editor from list
    const handleRemoveEditor = (address) => {
        setAddedEditors((prev) =>
            prev.filter((item) => {
                return item.walletAddress !== address;
            })
        );
    };

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

    const [contractName, setContractName] = useState("");
    useEffect(() => {
        const getContractName = async (contractAddress) => {
            if (contractAddress === "") {
                return;
            }
            const getNameABI = ABI.find(({ name }) => name === "getName");
            const result = await connex.thor
                .account(contractAddress)
                .method(getNameABI)
                .call();
            if (result) {
                setContractName(result.decoded[0]);
            }
        };
        getContractName(contractAddress);
        // eslint-disable-next-line
    }, []);

    return (
        <Stack spacing={3}>
            <Typography variant="h5">
                Add editors to your new contract
            </Typography>
            <Typography variant="subtitle1">
                Adding editors to : {walletShort(contractAddress)}{" "}
                {contractName}
            </Typography>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Editor
            </Button>
            <Box sx={{ mt: 1 }} width={1 / 2}>
                <List>
                    <TransitionGroup>
                        {addedEditors.map((item, index) => (
                            <Collapse key={index}>
                                {renderItem({
                                    item,
                                    index,
                                    handleRemoveEditor,
                                })}
                            </Collapse>
                        ))}
                    </TransitionGroup>
                </List>
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
