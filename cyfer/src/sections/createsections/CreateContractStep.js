import { useState, useEffect } from "react";

// Mui
import { Stack, Typography, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Components
import Iconify from "../../Components/iconify/Iconify";

const contractCode = {
    1: "Basic",
    2: "Variant 1",
    3: "Varaint 2",
};

export default function CreateContractStep({ contractType, contractName }) {
    const [progress, setProgress] = useState(0);
    const [timer, setTimer] = useState();
    const handleClick = () => {
        const timerid = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 10);
        }, 800);
        setTimer(timerid);
    };

    useEffect(() => {
        if (progress === 110) {
            console.log(timer);
            clearInterval(timer);
            setProgress(0);
        }
    }, [progress]);

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Check your details and Create!</Typography>
            <Typography variant="Subtitle1">
                Contract Type: {contractCode[contractType]}
            </Typography>
            <Typography variant="Subtitle1">
                Contract Name: {contractName}
            </Typography>
            <Stack direction={"row"} spacing={3}>
                <Button
                    sx={{ width: 1 / 2 }}
                    // onClick={handleCreateContract}
                    onClick={handleClick}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                >
                    Create Contract
                </Button>
                <CircularProgress variant="determinate" value={progress} />
            </Stack>
            <Typography variant="h5">
                You have created a contract with address:
                {/* {contractAddress} */}
            </Typography>
        </Stack>
    );
}
