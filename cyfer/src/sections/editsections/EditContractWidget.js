import { useEffect, useState } from "react";
// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button, TextField } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

// connex
import Connex from "../../api/connex";
import { ABICombined } from "../../Vechain/abicombined";

// Hooks
import useGetContractType from "../../hooks/useGetContractType";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

EditContractWidget.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    sx: PropTypes.object,
    number: PropTypes.number.isRequired,
    clausetext: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};

export default function EditContractWidget({
    icon,
    color = "error",
    sx,
    number,
    contract,
    clausetext,
    handleClauseText,
    handleSubmit,
}) {
    // Connex Connection Instance
    const connex = Connex();

    const [contractName, setContractName] = useState("");

    const contractType = useGetContractType(contract);

    useEffect(() => {
        const getContractName = async (contractAddress) => {
            if (contractAddress === "") {
                return;
            }
            console.log(contractType);
            const getNameABI = ABICombined[contractType].find(
                ({ name }) => name === "getName"
            );
            const result = await connex.thor
                .account(contractAddress)
                .method(getNameABI)
                .call();
            if (result) {
                setContractName(result.decoded[0]);
            }
        };
        getContractName(contract);
        // eslint-disable-next-line
    }, [contract]);

    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: "center",
                color: (theme) => theme.palette[color].lighter,
                bgcolor: (theme) => theme.palette[color].darker,
                ...sx,
            }}
        >
            <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(
                            theme.palette[color].dark,
                            0
                        )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                m={3}
            >
                <Typography variant="h5">
                    {contractName} ({contract})
                </Typography>
                <Typography variant="subtitle 2">
                    Editing clause {number}
                </Typography>
            </Stack>

            <TextField
                variant="filled"
                multiline
                rows={4}
                sx={{ width: "100%", mx: 1, color: "black" }}
                type="text"
                id="clause"
                name="clause"
                label="Clause"
                autoComplete="off"
                value={clausetext}
                onChange={handleClauseText}
            />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                mt={5}
                mx={5}
                spacing={2}
            >
                <Typography variant="h5" gutterBottom>
                    Add your clause!
                </Typography>
                <Button
                    // onClick={handleCheckBalance}
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="nimbus:money" />}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </Card>
    );
}
