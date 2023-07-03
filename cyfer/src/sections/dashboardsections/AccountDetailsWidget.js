// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Stack, Button, Box, Grid } from "@mui/material";

// components
import Iconify from "../../Components/iconify";
import Label from "../../Components/label";

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

const StyledProductImg = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
});

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
    // numContract,
    icon,
    color = "primary",
    sx,
    handleSelected,
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
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.background.neutral,
                            color: (theme) => theme.palette.primary.light,
                        }}
                    >
                        <Box sx={{ pt: "100%", position: "relative" }}>
                            <Label
                                variant="filled"
                                color={"info"}
                                sx={{
                                    zIndex: 9,
                                    top: 16,
                                    right: 16,
                                    position: "absolute",
                                    textTransform: "uppercase",
                                }}
                            >
                                Owner
                            </Label>
                            <StyledProductImg
                                alt="contract"
                                src={`/assets/images/contract.jpg`}
                            />
                        </Box>
                        <Stack spacing={1} sx={{ p: 1 }}>
                            <Typography variant="subtitle1" noWrap>
                                Contract Name
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                    }}
                                >
                                    0x...asfdadsf
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.text.secondary,
                                    }}
                                >
                                    Awaiting action
                                </Typography>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    );
}
