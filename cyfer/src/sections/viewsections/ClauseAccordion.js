import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

// Connex and ABI
import Connex from "../../api/connex";
import { ABICombined } from "../../Vechain/abicombined";

// hooks
import useGetContractType from "../../hooks/useGetContractType";

// Icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

ClauseAccordion.propTypes = {
    expanded: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
        .isRequired,
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
    const [clauseText, setClauseText] = useState("");

    const connex = Connex();

    const contractType = useGetContractType(contractAddress);

    useEffect(() => {
        const getClauseText = async () => {
            const readABI = ABICombined[contractType].find(
                ({ name }) => name === "retrieve"
            );
            const result = await connex.thor
                .account(contractAddress)
                .method(readABI)
                .call(clauseNum);
            if (result) {
                console.log(result);
                setClauseText(result.decoded[0]);
            }
        };
        if (contractType !== null) {
            getClauseText();
        }

        // eslint-disable-next-line
    }, [contractAddress, contractType]);

    return (
        <Accordion
            expanded={expanded === clauseNum}
            onChange={handleChange(clauseNum)}
            sx={{ border: (theme) => theme.palette.divider }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
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
