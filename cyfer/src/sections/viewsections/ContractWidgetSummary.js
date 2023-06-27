// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Link, Typography, Collapse, Box, Stack } from "@mui/material";
// components
import Iconify from "../../Components/iconify";

// Connex
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";
import { useState, useEffect } from "react";

// Utils
import walletShort from "wallet-short";
import ClauseAccordion from "./ClauseAccordion";

// Dialog for adding contract to editor
import AddEditorDialog from "./AddEditorDialog";

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

const NUMCLAUSES = 10;

// ----------------------------------------------------------------------

ContractWidgetSummary.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    handleExpanded: PropTypes.func.isRequired,
    sx: PropTypes.object,
};

export default function ContractWidgetSummary({
    id,
    title,
    address,
    icon,
    color = "primary",
    sx,
    handleExpanded,
    ...other
}) {
    // For the Accordian Clauses
    const [expanded, setExpanded] = useState(0);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // For the expanding of the entire accordion
    const [checked, setChecked] = useState(false);
    const handleCollapse = () => {
        setChecked((prev) => !prev);
        handleExpanded(id);
    };

    // For getting the name of contract from thor
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
    // For generating the Accordion Clauses
    const clauseItems = [];
    for (let i = 0; i < NUMCLAUSES; i++) {
        clauseItems.push(
            <ClauseAccordion
                expanded={expanded}
                handleChange={handleChange}
                clauseNum={i}
                contractAddress={address}
            />
        );
    }

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
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                mt={5}
                mx={5}
            >
                <Link
                    onClick={handleCollapse}
                    variant="subtitle2"
                    underline="hover"
                >
                    Expand
                </Link>
                <AddEditorDialog contract={address} />
            </Stack>

            <Collapse in={checked}>
                <Box sx={{ m: "2rem" }}>{clauseItems}</Box>
            </Collapse>
        </Card>
    );
}
