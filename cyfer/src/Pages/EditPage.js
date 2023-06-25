import { Helmet } from "react-helmet-async";

import useWallet from "../hooks/useWallet";

import { useState } from "react";

// @mui
import {
    Container,
    Typography,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

export default function EditPage() {
    const { wallet } = useWallet();

    const [contract, setContract] = useState("");

    const handleChange = (e) => {
        setContract(e.target.value);
    };
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
                <Box>
                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Your selected wallet is :{wallet}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="contract-select-label">Age</InputLabel>
                        <Select
                            labelId="contract-select-label"
                            id="contract-select"
                            value={contract}
                            label="Contract"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>
        </>
    );
}
