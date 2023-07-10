// Mui
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

import { useState } from "react";

const steps = [
    "Select a contract type",
    "Give a contract name",
    "Create the contract",
    "Add editors",
];

export default function CreateSteps() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "95%", m: "auto" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Add Editors" : "Next"}
                </Button>
            </Box>
        </Box>
    );
}
