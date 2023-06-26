import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
//import { useTheme } from "@mui/material/styles";
import { Container, Typography, Grid } from "@mui/material";

import ContractWidgetSummary from "../sections/viewsections/ContractWidgetSummary";

export default function TestPage() {
    const [expandedID, setExpandedID] = useState();

    const handleExpanded = (id) => {
        setExpandedID(expandedID !== id ? id : false);
    };

    //const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Test | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
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
                </Grid>
            </Container>
        </>
    );
}
