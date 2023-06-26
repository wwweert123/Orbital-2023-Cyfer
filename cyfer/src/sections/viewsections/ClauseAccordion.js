import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

// Connex and ABI
import Connex from "../../api/connex";
import { ABI } from "../../Vechain/abi";

ClauseAccordion.propTypes = {
    expanded: PropTypes.oneOf([PropTypes.string, PropTypes.bool]).isRequired,
    handleChange: PropTypes.func.isRequired,
    clauseNum: PropTypes.number.isRequired,
    contractAddress: PropTypes.string.isRequired,
};

export default function ClauseAccordion({
    expanded,
    handleChange,
    clauseNum,
    contractAddress,
}) {
    const connex = Connex();
    const clauseText = async () => {
        const readABI = ABI.find(({ name }) => name === "retrieve");
        const result = await connex.thor
            .account(contractAddress)
            .method(readABI)
            .call(clauseNum);
        if (result) {
            return result.decoded[{ clauseNum }];
        } else {
            return "Empty";
        }
    };

    return (
        <Accordion
            expanded={expanded === clauseNum}
            onChange={handleChange(clauseNum)}
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
                <Typography>Clause No. {clauseNum}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    backgroundColor: (theme) => theme.palette.grey[700],
                }}
            >
                <Typography>{clauseText}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
