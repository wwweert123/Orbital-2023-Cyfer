import { Helmet } from "react-helmet-async";
// @mui
//import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import Wallets from "../Components/Wallets";

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
                <Wallets />
            </Container>
        </>
    );
}
