import { Helmet } from "react-helmet-async";

// mui
import {
    Container,
    Chip,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

// Components
import ClauseAccordion from "../sections/viewsections/ClauseAccordion";
import ProoposedChangeSection from "../sections/votesections/ProposedChangeSection";

// Hooks
import useWallet from "../hooks/useWallet";
import { useState, useEffect } from "react";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Connex and ABI
import Connex from "../api/connex";
import { ABICombined } from "../Vechain/abicombined";

export default function VotePage() {
    const axiosPrivate = useAxiosPrivate();
    const connex = Connex();

    const [contracts, setContracts] = useState([]);
    const [contractNames, setContractNames] = useState([]);

    useEffect(() => {
        const getContractNames = async () => {
            const getNameABI = ABICombined[1].find(
                ({ name }) => name === "getName"
            );
            const contractNames = [];
            for (const contract of contracts) {
                const result = await connex.thor
                    .account(contract)
                    .method(getNameABI)
                    .call();
                if (result) {
                    contractNames.push(result.decoded[0]);
                } else {
                    contractNames.push("");
                }
            }
            setContractNames(contractNames);
        };
        getContractNames();
        // eslint-disable-next-line
    }, [contracts]);

    const { wallet } = useWallet();
    const [selectedContract, setSelectedContract] = useState("");
    const handleChangeContract = (e) => {
        setSelectedContract(e.target.value);
        // handleGetChangedClause(e.target.value);
        // handleGetProposal(e.target.value);
        // handleGetProposer(e.target.value);
        // handleGetAllEditors(e.target.value);
        // CheckYesNOResults(e.target.value);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getContracts = async () => {
            if (wallet === "") {
                console.log("no wallet selected");
                return;
            }
            try {
                const response = await axiosPrivate.get(
                    `/wallet/contracts/${wallet}`,
                    {
                        signal: controller.signal,
                    }
                );
                console.log(response.data);
                const contracts = response.data.owned.concat(
                    response.data.editor
                );
                isMounted && setContracts(contracts);
            } catch (err) {
                console.error(err);
                // if (err.response?.status === 403) {
                //     navigate("/login", {
                //         state: { from: location },
                //         replace: true,
                //     });
                // }
            }
        };
        getContracts();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet]);

    return (
        <>
            <Helmet>
                <title> Vote | Cyfer </title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <Typography variant="h5">
                        Vote on the contract proposals here!
                    </Typography>
                    <Chip
                        label={`Wallet: ${wallet}`}
                        sx={{
                            p: 2,
                            bgcolor: (theme) => theme.palette.primary.darker,
                            width: "100%",
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="contract-select-label">
                            Contract (Contract Name)
                        </InputLabel>
                        <Select
                            labelId="contract-select-label"
                            id="contract-select"
                            value={selectedContract}
                            label="Contract (Conract Name)"
                            onChange={handleChangeContract}
                            inputProps={{
                                MenuProps: {
                                    MenuListProps: {
                                        sx: {
                                            backgroundColor: (theme) =>
                                                theme.palette.background
                                                    .default,
                                        },
                                    },
                                },
                            }}
                        >
                            {contracts?.map((currentcontract, index) => (
                                <MenuItem
                                    value={currentcontract}
                                    divider="true"
                                >
                                    <Stack>
                                        {contractNames[index]}
                                        {`                 `}
                                        <Typography variant="subtitle2">
                                            {currentcontract}
                                        </Typography>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {selectedContract === "" ? (
                        <Typography variant="Subtitle2">
                            Please Select a Contract
                        </Typography>
                    ) : (
                        <ProoposedChangeSection />
                    )}
                </Stack>
            </Container>
        </>
    );
}
