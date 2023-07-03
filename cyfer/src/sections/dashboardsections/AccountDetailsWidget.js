// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button, Grid } from "@mui/material";

// components
import Iconify from "../../Components/iconify";
import DashboardContractCard from "./DashboardContractCard";

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
    //numContract: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    sx: PropTypes.object,
    handleSelected: PropTypes.func.isRequired,
    selected: PropTypes.string,
    numContract: PropTypes.string,
};

export default function AccountDetailsWidget({
    handleClick,
    icon,
    color = "primary",
    sx,
    handleSelected, //?
    selected,
    numContract,
}) {
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
            <Typography variant="h4">{selected}</Typography>
            <Typography variant="h5" sx={{ opacity: 0.72 }}>
                You Owned or have Editor rights to {numContract} contracts
            </Typography>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                mt={5}
                mx={5}
            >
                <Typography variant="h5" gutterBottom>
                    Can't see your Wallet?
                </Typography>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    startIcon={<Iconify icon="wpf:ask-question" />}
                >
                    Tell us who you are
                </Button>
            </Stack>
            <Grid container spacing={3} mx={1}>
                <DashboardContractCard
                    contractName="Hello"
                    role="owner"
                    contractAddress="0x231231"
                />
            </Grid>
        </Card>
    );
}
