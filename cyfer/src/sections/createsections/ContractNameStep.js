import { Stack, Typography, TextField } from "@mui/material";

// Components
// import Iconify from "../../Components/iconify/Iconify";

export default function ContractNameStep({
    contractName,
    handleChangeName,
    contractDesc,
    handleChangeDesc,
}) {
    return (
        <Stack spacing={3}>
            <Typography variant="h5">Contract Details</Typography>
            <TextField
                type="text"
                id="contractName"
                name="contract name"
                autoComplete="off"
                variant="outlined"
                label="Contract Name"
                value={contractName}
                onChange={handleChangeName}
                required
            ></TextField>
            <br></br>
            <TextField
                type="text"
                id="contractDescription"
                name="contract description"
                autoComplete="off"
                variant="outlined"
                label="Contract Description"
                multiline
                rows={4}
                value={contractDesc}
                onChange={handleChangeDesc}
            ></TextField>
            {/* <Button
                sx={{ width: 1 / 4 }}
                color="info"
                // onClick={handleCreateName}
                variant="contained"
                startIcon={<Iconify icon="subway:title" />}
                // disabled={contractAddress === "" ? true : false}
            >
                Set Name
            </Button> */}
            <br></br>
        </Stack>
    );
}
