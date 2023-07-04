import { useState, useEffect } from "react";

// mui
import { Card, Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

// Components
import Label from "../../Components/label";

// Connex
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";

// Utils
import walletShort from "wallet-short";

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
    contractAddress: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

export default function DashboardContractCard({ role, contractAddress }) {
    const [contractName, setContractname] = useState("<Name>");
    const connex = Connex();
    useEffect(() => {
        const getContractName = async () => {
            const getNameABI = ABI.find(({ name }) => name === "getName");
            try {
                const result = await connex.thor
                    .account(contractAddress)
                    .method(getNameABI)
                    .call();
                if (result) {
                    setContractname(result.decoded[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getContractName();
        // eslint-disable-next-line
    }, []);

    return (
        <Card
            sx={{
                backgroundColor: (theme) => theme.palette.background.neutral,
                color: (theme) => theme.palette.primary.light,
                minWidth: "15vw",
                mx: 3,
            }}
        >
            <Box sx={{ pt: "100%", position: "relative" }}>
                <Label
                    variant="filled"
                    color={(role === "Owner" && "error") || "info"}
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
                    src={
                        (role === "Owner" && "/assets/images/contract.jpg") ||
                        "/assets/images/editor.jpg"
                    }
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
                        {walletShort(contractAddress)}
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
    );
}
