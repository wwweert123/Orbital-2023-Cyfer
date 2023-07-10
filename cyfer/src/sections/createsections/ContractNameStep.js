import { Stack, Typography, TextField, Button } from "@mui/material";

// Components
import Iconify from "../../Components/iconify/Iconify";

export default function ContractNameStep() {
    return (
        <Stack spacing={3}>
            <Typography variant="h3">Give a Contract Name</Typography>
            <TextField
                type="text"
                id="contractName"
                name="contract name"
                autoComplete="off"
                variant="outlined"
                label="Contract Name"
                //value={contractName}
                //onChange={handleChange}
            ></TextField>
            <br></br>
            <Button
                sx={{ width: 1 / 4 }}
                color="info"
                // onClick={handleCreateName}
                variant="contained"
                startIcon={<Iconify icon="subway:title" />}
                // disabled={contractAddress === "" ? true : false}
            >
                Set Name
            </Button>
            <br></br>
        </Stack>
    );
}
