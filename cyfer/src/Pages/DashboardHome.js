import { Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import AccountDetailsWidget from "../sections/dashboardsections/AccountDetailsWidget";

// Connex
import Connex from "../api/connex";
import WalletBalanceWidget from "../sections/dashboardsections/WalletBalanceWidget";

// axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// hooks
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import useWallet from "../hooks/useWallet";

export default function DashboardHome() {
    const { wallet } = useWallet();

    const [walletObject, setWalletObject] = useState({});

    const [numContract, setnumContract] = useState("?");

    const getWalletObject = async (wallet) => {
        if (wallet === "") {
            setnumContract("?");
            return;
        }
        try {
            const response = await axiosPrivate.get(
                `/wallet/contracts/${wallet}`,
                {
                    signal: AbortSignal.timeout(5000),
                }
            );
            console.log(response.data);
            setWalletObject(response.data);
            const total =
                response.data.owned.length + response.data.editor.length;
            setnumContract(total);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getWalletObject(wallet);
        // eslint-disable-next-line
    }, [wallet]);

    const axiosPrivate = useAxiosPrivate();
    const [wallets, setWallets] = useLocalStorage("wallets", []);
    const message = {
        purpose: "identification",
        payload: {
            type: "text",
            content: "Get Your Wallet Address",
        },
    };
    const connex = Connex();
    const handleIdentification = async () => {
        try {
            const certResponse = await connex.vendor
                .sign("cert", message)
                .request();
            if (certResponse) {
                if (wallets.indexOf(certResponse.annex.signer) !== -1) {
                    console.log("address already exist");
                } else {
                    setWallets((prev) => [...prev, certResponse.annex.signer]);
                    const response = await axiosPrivate.post("/wallet", {
                        address: certResponse.annex.signer,
                    });
                    console.log(response.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    At a Glance
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={8}>
                        <AccountDetailsWidget
                            handleClick={handleIdentification}
                            numContract={Number(numContract)}
                            icon={"mdi:contract"}
                            selected={wallet}
                            walletObject={walletObject}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <WalletBalanceWidget
                            icon={"ion:wallet-outline"}
                            address={wallet}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
