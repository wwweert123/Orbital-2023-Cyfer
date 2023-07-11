import { useState } from "react";

// Mui
import { Stack, Typography } from "@mui/material";
import {
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
} from "@mui/material";

export default function SelectTypeStep() {
    const [selectedContract, setSelectedContract] = useState("first");

    const handleChange = (e) => {
        setSelectedContract(e.target.value);
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
                        value="first"
                        control={<Radio color="secondary" />}
                        label="First"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        value="second"
                        control={<Radio color="success" />}
                        label="Second"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        value="third"
                        control={<Radio color="default" />}
                        label="Third"
                        onChange={handleChange}
                    />
                </RadioGroup>
            </FormControl>
            <Typography hidden={selectedContract === "first" ? true : false}>
                {selectedContract}
            </Typography>
        </Stack>
    );
}
