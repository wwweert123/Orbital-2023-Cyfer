import { Helmet } from "react-helmet-async";

import useWallet from "../hooks/useWallet";

// @mui
import { Container, Typography } from "@mui/material";

export default function ViewPage() {
    const { wallet } = useWallet();
    //const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Edit | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Edit the clauses for your contract here
                </Typography>
                <Typography variant="h5" sx={{ mb: 5 }}>
                    Your selected wallet is :{wallet}
                </Typography>
            </Container>
        </>
    );
}
