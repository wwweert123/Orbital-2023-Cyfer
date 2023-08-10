// Mui
import { Card, Divider } from "@mui/material";

// Connex
import Connex from "../../api/connex";

// ABI
import { ABICombined } from "../../Vechain/abicombined";

// Hooks
import { useEffect, useState } from "react";

export default function CurrentClauseWidget({ contractAddress, clauseNum }) {
    const connex = Connex();

    const [clauseText, setClauseText] = useState("");

    useEffect(() => {
        const getClauseText = async () => {
            const readABI = ABICombined[1].find(
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
        if (contractAddress !== "") {
            getClauseText();
        }
        // eslint-disable-next-line
    }, [clauseNum]);

    return (
        <Card
            sx={{
                py: 5,
                px: 3,
                boxShadow: 0,
                textAlign: "left",
                color: (theme) => theme.palette.text.primary,
                bgcolor: "transparent",
                border: 2,
                borderColor: (theme) => theme.palette.success.dark,
            }}
        >
            Current Clause #{Number(clauseNum) + 1}
            <Divider sx={{ m: 1 }} />
            {clauseText}
        </Card>
    );
}
