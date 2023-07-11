// Mui
import { Stack, Typography } from "@mui/material";
import {
    Radio,
    FormControlLabel,
    FormControl,
    // FormLabel,
    RadioGroup,
    Grow,
} from "@mui/material";
import BasicCard from "./BasicCard";
import VariantOCard from "./VariantOCard";
import VariantTCard from "./VariantTCard";

export default function SelectTypeStep({
    handleChangeContractType,
    selectedContractType,
}) {
    return (
        <Stack spacing={3}>
            <Typography variant="h5">Select the contract you need!</Typography>
            <FormControl>
                {/* <FormLabel id="contract-group-label">Contract Type</FormLabel> */}
                <RadioGroup
                    aria-labelledby="contract-group-label"
                    defaultValue={selectedContractType}
                    name="contract-group"
                    row
                >
                    <FormControlLabel
                        value={1}
                        control={<Radio color="secondary" />}
                        label="Basic"
                        onChange={handleChangeContractType}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio color="success" />}
                        label="Variant 1"
                        onChange={handleChangeContractType}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio color="error" />}
                        label="Variant 2"
                        onChange={handleChangeContractType}
                    />
                </RadioGroup>
            </FormControl>
            <Grow in={selectedContractType === 1}>
                <BasicCard
                    sx={{ display: selectedContractType === 1 ? "" : "none" }}
                />
            </Grow>
            <Grow in={selectedContractType === 2}>
                <VariantOCard
                    sx={{ display: selectedContractType === 2 ? "" : "none" }}
                />
            </Grow>
            <Grow in={selectedContractType === 3}>
                <VariantTCard
                    sx={{ display: selectedContractType === 3 ? "" : "none" }}
                />
            </Grow>
        </Stack>
    );
}
