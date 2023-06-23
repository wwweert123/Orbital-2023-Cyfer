import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; //import the hook
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";

import ContractWidgetSummary from "../sections/viewsections/ContractWidgetSummary";
import walletShort from "wallet-short";

import { Divider } from "@mui/material";

const Wallets = () => {
    const [walletsObjects, setWalletsObjects] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation(); //current location

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getWallets = async () => {
            try {
                const response = await axiosPrivate.get("/wallet", {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setWalletsObjects(response.data);
            } catch (err) {
                console.error(err);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getWallets();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const walletItems = walletsObjects.map((wallet, i) => (
        <Stack spacing={3} id={i}>
            <Typography variant="h3">{wallet.address}</Typography>
            <Grid container spacing={3}>
                {wallet.owned.map((address) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Contract Owner"
                            address={walletShort(address)}
                            icon={"fluent-mdl2:party-leader"}
                        />
                    </Grid>
                ))}
                {wallet.editor.map((address) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Contract Editor"
                            address={walletShort(address)}
                            color="warning"
                            icon={"material-symbols:edit"}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider variant="middle" />
        </Stack>
    ));

    return (
        <>
            {walletsObjects?.length ? (
                <Stack spacing={3}>{walletItems}</Stack>
            ) : (
                " "
            )}
        </>
    );
};

export default Wallets;
