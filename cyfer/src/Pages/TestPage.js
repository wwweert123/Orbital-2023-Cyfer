import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
//import { useTheme } from "@mui/material/styles";
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from "@mui/material";

export default function TestPage() {
    const [expanded, setExpanded] = useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    //const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Test | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    View your Contracts here
                </Typography>
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
            </Container>
        </>
    );
}
