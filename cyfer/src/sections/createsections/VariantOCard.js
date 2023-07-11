import { forwardRef } from "react";

// Mui
import { Card, Typography, Divider, Stack, Box } from "@mui/material";
import { Done as DoneIcon } from "@mui/icons-material";

const VariantOCard = forwardRef(function VariantOCard(
    { sx, color = "success", ...props },
    ref
) {
    return (
        <Card
            sx={{
                py: 5,
                px: 3,
                boxShadow: 0,
                textAlign: "left",
                color: (theme) => theme.palette.text.primary,
                bgcolor: "transparent",
                ...sx,
                border: 3,
                borderColor: (theme) => theme.palette[color].dark,
            }}
            {...props}
            ref={ref}
        >
            <Stack spacing={3}>
                <Typography variant="subtitle1">Variant 1</Typography>
                <Divider variant="middle" />
                <Box>
                    <DoneIcon
                        sx={{
                            color: (theme) => theme.palette[color].dark,
                        }}
                    />{" "}
                    <Typography variant="subtitle3">
                        {" "}
                        One contract Owner who will have the full rights to the
                        contract
                    </Typography>
                    <br />
                    <br />
                    <DoneIcon
                        sx={{
                            color: (theme) => theme.palette[color].dark,
                        }}
                    />{" "}
                    <Typography variant="subtitle3">
                        {" "}
                        Contract Owner can add any editor that he wants to the
                        contract
                    </Typography>
                    <br />
                    <br />
                    <DoneIcon
                        sx={{
                            color: (theme) => theme.palette[color].dark,
                        }}
                    />{" "}
                    <Typography variant="subtitle3">
                        {" "}
                        All editors added to the contract will be able to
                        SUGGEST proposals to the contract and all transactions
                        and transfers will be recorded
                    </Typography>
                    <br />
                    <br />
                    <DoneIcon
                        sx={{
                            color: (theme) => theme.palette[color].dark,
                        }}
                    />{" "}
                    <Typography variant="subtitle3">
                        {" "}
                        All editors will have voting rights. In order for any
                        proposed changes to be passed into the contract, there
                        must be a MAJORITY vote for the change.
                    </Typography>
                </Box>
            </Stack>
        </Card>
    );
});

export default VariantOCard;
