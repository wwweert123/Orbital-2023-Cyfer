// Mui
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from "@mui/material";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
    Settings as SettingsIcon,
    GroupAdd as GroupAddIcon,
    Abc as AbcIcon,
    Upload as UploadIcon,
} from "@mui/icons-material";

import { useState } from "react";
import ContractNameStep from "./ContractNameStep";
import CreateContractStep from "./CreateContractStep";
import SelectTypeStep from "./SelectTypeStep";
import AddEditorsStep from "./AddEditorsStep";

const steps = [
    "Select a contract type",
    "Give a contract name",
    "Create the contract",
    "Add editors",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient(90deg, rgba(104,3,128,1) 0%, rgba(38,19,184,0.9977240896358543) 35%, rgba(0,138,255,1) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <AbcIcon />,
        3: <UploadIcon />,
        4: <GroupAddIcon />,
    };
    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

function StepsItems({ stepNum }) {
    // For setting the type of contract
    const [selectedContractType, setSelectedContractType] = useState(1);

    const handleChangeContractType = (e) => {
        setSelectedContractType(Number(e.target.value));
    };

    // For getting the contract name from user in set name step
    const [contractName, setContractname] = useState("");
    const handleChangeName = (e) => {
        setContractname(e.target.value);
    };

    const [contractDesc, setContractDesc] = useState("");
    const handleChangeDesc = (e) => {
        setContractDesc(e.target.value);
    };

    // Getting the newly created contract address
    const [contractAddress, setcontractAddress] = useState("");
    const handleSetContractAddress = (address) => {
        setcontractAddress(address);
    };

    const items = {
        1: (
            <SelectTypeStep
                selectedContractType={selectedContractType}
                handleChangeContractType={handleChangeContractType}
            />
        ),
        2: (
            <ContractNameStep
                contractName={contractName}
                handleChangeName={handleChangeName}
                contractDesc={contractDesc}
                handleChangeDesc={handleChangeDesc}
            />
        ),
        3: (
            <CreateContractStep
                contractName={contractName}
                contractDesc={contractDesc}
                selectedContractType={selectedContractType}
                contractAddress={contractAddress}
                handleSetContractAddress={handleSetContractAddress}
            />
        ),
        4: <AddEditorsStep />,
    };
    return items[stepNum];
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

export default function CreateSteps() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: "95%", m: "auto" }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<ColorlibConnector />}
            >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel
                                StepIconComponent={ColorlibStepIcon}
                                {...labelProps}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <Box sx={{ p: 5 }}>
                    <Typography variant="h5">
                        You can now edit your contract in the edit tab
                    </Typography>
                    <Button onClick={handleReset}>
                        Create another contract
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Step {activeStep + 1}
                    </Typography>
                    {<StepsItems stepNum={activeStep + 1} />}
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
                            {activeStep === steps.length - 1
                                ? "Submit List"
                                : "Next"}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}
