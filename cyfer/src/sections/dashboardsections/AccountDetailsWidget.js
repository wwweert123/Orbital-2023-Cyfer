// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button } from "@mui/material";

// components
import Iconify from "../../Components/iconify";
import DashboardContractCard from "./DashboardContractCard";
import Scrollbar from "../../Components/scrollbar";

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
    selected: PropTypes.string,
    numContract: PropTypes.number,
    walletObject: PropTypes.object,
};

export default function AccountDetailsWidget({
    handleClick,
    icon,
    color = "primary",
    sx,
    selected,
    numContract,
    walletObject,
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

            <Scrollbar
                sx={{
                    height: 1,
                    "& .simplebar-content": {
                        height: 1,
                        display: "flex",
                        flexDirection: "row",
                    },
                    mx: 3,
                }}
            >
                {walletObject?.owned?.map((address, i) => (
                    <DashboardContractCard
                        role="Owner"
                        contractAddress={address}
                        key={i}
                    />
                ))}
                {walletObject?.editor?.map((address, i) => (
                    <DashboardContractCard
                        role="Editor"
                        contractAddress={address}
                        key={i + walletObject?.owned?.length}
                    />
                ))}
            </Scrollbar>
        </Card>
    );
}
