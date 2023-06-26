// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Link, Typography } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

// Connex
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";
import { useState, useEffect } from "react";

// Utils
import walletShort from "wallet-short";

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

ContractWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default function ContractWidgetSummary({
    title,
    address,
    icon,
    color = "primary",
    sx,
    ...other
}) {
    const [contractName, setContractname] = useState("<Name>");
    const connex = Connex();
    useEffect(() => {
        const getContractName = async () => {
            const getNameABI = ABI.find(({ name }) => name === "getName");

            const result = await connex.thor
                .account(address)
                .method(getNameABI)
                .call();
            if (result) {
                setContractname(result.decoded[0]);
            }
        };
        getContractName();
        // eslint-disable-next-line
    }, []);

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
            {...other}
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
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
            <Typography variant="h3">{walletShort(address)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {contractName}
            </Typography>
            <Link variant="subtitle2" underline="hover" sx={{ mr: "2%" }}>
                Expand
            </Link>
        </Card>
    );
}
