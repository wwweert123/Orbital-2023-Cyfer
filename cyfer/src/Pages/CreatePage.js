// mui
import { Button, Container, Typography } from "@mui/material";

// Components
import Iconify from "../Components/iconify/Iconify";

import { Helmet } from "react-helmet-async";
//import Connex from "@vechain/connex";

export default function CreatePage() {
    return (
        <>
            <Helmet>
                <title> Create | Minimal UI </title>
            </Helmet>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Create your very own contract
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                >
                    Begin your journey here
                </Button>
            </Container>
        </>
    );
}
