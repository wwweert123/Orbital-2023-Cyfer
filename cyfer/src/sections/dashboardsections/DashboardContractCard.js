// mui
import { Card, Grid, Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

// Components
import Label from "../../Components/label";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
});

// ----------------------------------------------------------------------

DashboardContractCard.propTypes = {
    role: PropTypes.string.isRequired,
    contractName: PropTypes.string.isRequired,
    contractAddress: PropTypes.string.isRequired,
};

export default function DashboardContractCard({
    role,
    contractName,
    contractAddress,
}) {
    return (
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
                        color={(role === "owner" && "error") || "info"}
                        sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: "absolute",
                            textTransform: "uppercase",
                        }}
                    >
                        {role}
                    </Label>
                    <StyledProductImg
                        alt="contract"
                        src={`/assets/images/contract.jpg`}
                    />
                </Box>
                <Stack spacing={1} sx={{ p: 1 }}>
                    <Typography variant="subtitle1" noWrap>
                        {contractName}
                    </Typography>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: (theme) => theme.palette.text.primary,
                            }}
                        >
                            {contractAddress}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: (theme) => theme.palette.text.secondary,
                            }}
                        >
                            Awaiting action
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </Grid>
    );
}
