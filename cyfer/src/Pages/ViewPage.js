import { Helmet } from "react-helmet-async";
// @mui
//import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import ContractWidgetSummary from "../sections/viewsections/ContractWidgetSummary";

export default function ViewPage() {
    //const theme = useTheme();

    return (
        <>
            <Helmet>
                <title> View | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    View your Contracts here
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <ContractWidgetSummary
                            title="Weekly Sales"
                            address="714K"
                            icon={"ant-design:android-filled"}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
