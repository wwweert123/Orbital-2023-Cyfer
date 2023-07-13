// mui
import { Container, Stack, Typography } from "@mui/material";

// Components
// import Iconify from "../Components/iconify/Iconify";
// import AlertDialog from "../Components/AlertDialog";
import CreateSteps from "../sections/createsections/CreateSteps";

import { Helmet } from "react-helmet-async";

// Axios
import useWallet from "../hooks/useWallet";

export default function CreatePage() {
    // Wallet to create contract
    const { wallet } = useWallet();

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

    // For controlling the alert dialog
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const [errmsg, setErrmsg] = useState("");
    // const [errtitle, setErrtitle] = useState("");

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
                    <CreateSteps />
                </Stack>
            </Container>
            {/* <AlertDialog
                open={open}
                handleClose={handleClose}
                errtitle={errtitle}
                errmsg={errmsg}
            /> */}
        </>
    );
}
