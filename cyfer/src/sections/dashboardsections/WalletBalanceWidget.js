import { useState } from "react";
// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

// connex
import Connex from "../../api/connex";

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

AccountDetailsWidget.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    address: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default function AccountDetailsWidget({
    address,
    icon,
    color = "secondary",
    sx,
}) {
    const [vet, setVet] = useState("");
    const [vtho, setVtho] = useState("");
    const connex = Connex();
    const handleCheckBalance = async () => {
        try {
            const resp = await connex.thor.account(address).get();
            setVet(resp?.balance / 1e18);
            setVtho(resp?.energy / 1e18);
        } catch (err) {
            alert("tell us your wallet address first!");
        }
    };
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: "center",
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
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
            <Typography variant="h3">Balance</Typography>
            <Typography variant="h4">VET : {vet}</Typography>
            <Typography variant="h4" sx={{ opacity: 0.72 }}>
                VTHO : {vtho}
            </Typography>
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
                    Need more Currency?
                </Typography>
                <Button
                    onClick={handleCheckBalance}
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="nimbus:money" />}
                >
                    Check Balance
                </Button>
                <Button
                    href="https://faucet.vecha.in/"
                    target="_blank"
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="circum:bitcoin" />}
                >
                    Get More!
                </Button>
            </Stack>
        </Card>
    );
}
