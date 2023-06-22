import { Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import AccountDetailsWidget from "../sections/dashboardsections/AccountDetailsWidget";

import { useState } from "react";

// Connex
import Connex from "../api/connex";
import WalletBalanceWidget from "../sections/dashboardsections/WalletBalanceWidget";

export default function DashboardHome() {
    const [walletAddress, setWalletAddress] = useState("");
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
                setWalletAddress(certResponse.annex.signer);
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
                            numContract={5}
                            address={walletAddress}
                            icon={"mdi:contract"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <WalletBalanceWidget
                            address={walletAddress}
                            icon={"ion:wallet-outline"}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
