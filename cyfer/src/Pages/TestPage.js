import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
//import { useTheme } from "@mui/material/styles";
// import { Container, Typography, Grid } from "@mui/material";
import { Typography } from "@mui/material";

//import ContractWidgetSummary from "../sections/viewsections/ContractWidgetSummary";

import Connex from "../api/connex";
import { ABI } from "../Vechain/abi";

// Dialog
import AddEditorDialog from "../sections/viewsections/AddEditorDialog";

export default function TestPage() {
    const [clauseText, setClauseText] = useState("Empty");
    // const [expandedID, setExpandedID] = useState();

    // const handleExpanded = (id) => {
    //     setExpandedID(expandedID !== id ? id : false);
    // };

    const connex = Connex();
    useEffect(() => {
        const getClauseText = async () => {
            console.log("hi");
            const readABI = ABI.find(({ name }) => name === "retrieve");
            const result = await connex.thor
                .account("0x9524bb149161edd41b13039b4ec4d95bc1e23f8b")
                .method(readABI)
                .call(2);
            if (result) {
                console.log(result);
                setClauseText(result.decoded[0]);
            }
        };
        getClauseText();
        // eslint-disable-next-line
    }, []);

    //const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Test | Minimal UI </title>
            </Helmet>

            {/*<Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    View your Contracts here
                </Typography>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={expandedID === "hehehe" ? 12 : 3}
                    >
                        <ContractWidgetSummary
                            title="Contract Owner"
                            address="hehehe"
                            icon={"fluent-mdl2:party-leader"}
                            id="hehehe"
                            handleExpanded={handleExpanded}
                        />
                    </Grid>
                </Grid> */}
            <Typography>{clauseText}</Typography>
            <AddEditorDialog />
            {/* </Container> */}
        </>
    );
}
