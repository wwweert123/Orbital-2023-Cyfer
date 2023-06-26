import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; //import the hook
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";

import ContractWidgetSummary from "../sections/viewsections/ContractWidgetSummary";

import { Divider } from "@mui/material";

const Wallets = () => {
    const [walletsObjects, setWalletsObjects] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation(); //current location

    const [expandedID, setExpandedID] = useState();

    const handleExpanded = (id) => {
        setExpandedID(expandedID !== id ? id : false);
    };

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
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={expandedID === address ? 12 : 3}
                    >
                        <ContractWidgetSummary
                            title="Contract Owner"
                            address={address}
                            icon={"fluent-mdl2:party-leader"}
                            id={address}
                            handleExpanded={handleExpanded}
                        />
                    </Grid>
                ))}
                {wallet.editor.map((address) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={expandedID === address ? 12 : 3}
                    >
                        <ContractWidgetSummary
                            id={address}
                            title="Contract Editor"
                            address={address}
                            color="warning"
                            icon={"material-symbols:edit"}
                            handleExpanded={handleExpanded}
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
