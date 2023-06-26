// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Link, Typography, Collapse, Box } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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
    const [expanded, setExpanded] = useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [checked, setChecked] = useState(false);

    const handleCollapse = () => {
        setChecked((prev) => !prev);
        handleExpanded(id);
    };

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
            <Link
                onClick={handleCollapse}
                variant="subtitle2"
                underline="hover"
                sx={{ mr: "2%" }}
            >
                Expand
            </Link>
            <Collapse in={checked}>
                <Box>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        sx={{ border: (theme) => theme.palette.divider }}
                    >
                        <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.neutral,
                            }}
                        >
                            <Typography>Collapsible Group Item #1</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.grey[700],
                            }}
                        >
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Suspendisse malesuada lacus ex, sit amet blandit
                                leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        sx={{ border: (theme) => theme.palette.divider }}
                    >
                        <AccordionSummary
                            aria-controls="panel2d-content"
                            id="panel2d-header"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.neutral,
                            }}
                        >
                            <Typography>Collapsible Group Item #2</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.grey[700],
                            }}
                        >
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Suspendisse malesuada lacus ex, sit amet blandit
                                leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        sx={{ border: (theme) => theme.palette.divider }}
                    >
                        <AccordionSummary
                            aria-controls="panel3d-content"
                            id="panel3d-header"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.neutral,
                            }}
                        >
                            <Typography>Collapsible Group Item #3</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.grey[700],
                            }}
                        >
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Suspendisse malesuada lacus ex, sit amet blandit
                                leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Collapse>
        </Card>
    );
}
