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

    const [changedClause, setChangedClause] = useState();

    const handleGetChangedClause = async (selectedContract) => {
        const indexABI = ABICombined[2].find(
            ({ name }) => name === "getProposalIndex"
        );
        const clauseNo = await connex.thor
            .account("0x424406c1f4e6e008124df938ff46bba0a611cadc")
            .method(indexABI)
            .call();
        setChangedClause(clauseNo.decoded[0] ? clauseNo.decoded[0] : "100");
        console.log(clauseNo.decoded[0]);
    };

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
        handleGetChangedClause(contract);
        // eslint-disable-next-line
    }, [contract]);

    return (
        <>
            {changedClause === "100" ? (
                <Card
                    sx={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: "center",
                        color: (theme) => theme.palette[color].lighter,
                        bgcolor: (theme) => theme.palette.background.neutral,
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
                                )} 0%, ${alpha(
                                    theme.palette[color].dark,
                                    0.24
                                )} 100%)`,
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
            ) : (
                <Typography variant="subtitle2">
                    This contract has Proposed Change. Please resolve the
                    proposal in the vote page
                </Typography>
            )}
        </>
    );
}
