import { useState } from "react";

// Mui
import { Stack, Typography } from "@mui/material";
import {
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Grow,
} from "@mui/material";
import BasicCard from "./BasicCard";
import VariantOCard from "./VariantOCard";
import VariantTCard from "./VariantTCard";

export default function SelectTypeStep() {
    const [selectedContract, setSelectedContract] = useState(1);

    const handleChange = (e) => {
        setSelectedContract(Number(e.target.value));
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h3">Select the contract you need!</Typography>
            <FormControl>
                <FormLabel id="contract-group-label">Contract Type</FormLabel>
                <RadioGroup
                    aria-labelledby="contract-group-label"
                    defaultValue="first"
                    name="contract-group"
                >
                    <FormControlLabel
                        value={1}
                        control={<Radio color="secondary" />}
                        label="Basic"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio color="success" />}
                        label="Variant 1"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio color="default" />}
                        label="Variant 2"
                        onChange={handleChange}
                    />
                </RadioGroup>
            </FormControl>
            <Grow in={selectedContract === 1}>
                <BasicCard />
            </Grow>
            <Grow in={selectedContract === 2}>
                <VariantOCard />
            </Grow>

            <VariantTCard hidden={selectedContract === 3 ? false : true} />
        </Stack>
    );
}
