// import { useState } from "react";
// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button, TextField } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

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
    clausetext,
    handleClauseText,
    handleSubmit,
}) {
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
            <Typography variant="h4">Clause {number}</Typography>
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
