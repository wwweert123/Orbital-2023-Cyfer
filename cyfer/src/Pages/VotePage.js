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
    Card,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    Tooltip,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Components
import ClauseAccordion from "../sections/viewsections/ClauseAccordion";

// Hooks
import useWallet from "../hooks/useWallet";
import { useState, useEffect } from "react";

// Axios
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Connex and ABI
import Connex from "../api/connex";
import { ABICombined } from "../Vechain/abicombined";

const NUMCLAUSES = 10;

export default function VotePage() {
    const axiosPrivate = useAxiosPrivate();
    const connex = Connex();

    const [contracts, setContracts] = useState([]);
    const [contractNames, setContractNames] = useState([]);

    const [changedClause, setChangedClause] = useState();
    const [proposedClauseText, setProposedClauseText] = useState();
    const [currentClauseText, setCurrentClauseText] = useState();
    const [proposer, setProposer] = useState();

    const handleGetChangedClause = async (selectedContract) => {
        const indexABI = ABICombined[2].find(
            ({ name }) => name === "getProposalIndex"
        );
        const clauseNo = await connex.thor
            .account("0x6C10D347cc575b8e03463d5dB60985e8636c96F3")
            .method(indexABI)
            .call();
        setChangedClause(clauseNo.decoded[0]);
        console.log(clauseNo.decoded[0]);
        handleGetCurrentClause(clauseNo.decoded[0], selectedContract);
    };

    const handleGetCurrentClause = async (clauseNo, selectedContract) => {
        const readABI = ABICombined[2].find(({ name }) => name === "retrieve");
        const currentText = await connex.thor
            .account("0x6C10D347cc575b8e03463d5dB60985e8636c96F3")
            .method(readABI)
            .call(0);
        setCurrentClauseText(currentText.decoded[0]);
        console.log(currentText.decoded[0]);
    };

    const handleGetProposal = async (selectedContract) => {
        const contentABI = ABICombined[2].find(
            ({ name }) => name === "getProposal"
        );
        const clauseText = await connex.thor
            .account("0x6C10D347cc575b8e03463d5dB60985e8636c96F3")
            .method(contentABI)
            .call();
        setProposedClauseText(clauseText.decoded[0]);
        console.log(clauseText.decoded[0]);
    };

    const handleGetProposer = async (selectedContract) => {
        const proposerABI = ABICombined[2].find(
            ({ name }) => name === "getProposer"
        );
        const proposer = await connex.thor
            .account("0x6C10D347cc575b8e03463d5dB60985e8636c96F3")
            .method(proposerABI)
            .call();
        setProposer(proposer.decoded[0]);
        console.log(proposer.decoded[0]);
    };

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

    const [contractUsers, setContractUsers] = useState();

    const checkVoteStatus = async (Users, contract) => {
        const checkVotedABI = ABICombined[2].find(
            ({ name }) => name === "hasVoted"
        );
        const updated = await Promise.all(
            Users.map(async (user) => {
                const checkVoteResult = await connex.thor
                    .account("0x6C10D347cc575b8e03463d5dB60985e8636c96F3")
                    .method(checkVotedABI)
                    .call(user.walletAddress);
                user.voted = checkVoteResult.decoded[0];
                return user;
            })
        );
        setContractUsers(updated);
        console.log(updated);
    };

    const handleGetAllEditors = async (contract) => {
        if (contract === "") {
            console.log("no contract selected");
            return;
        }
        try {
            const response = await axiosPrivate.get(
                `/wallet/getcontractusers/0x6C10D347cc575b8e03463d5dB60985e8636c96F3`
            );
            checkVoteStatus(response.data, contract);
        } catch (err) {
            console.log(err);
        }
    };

    const { wallet } = useWallet();
    const [selectedContract, setSelectedContract] = useState("");
    const handleChangeContract = (e) => {
        setSelectedContract(e.target.value);
        handleGetChangedClause(e.target.value);
        handleGetProposal(e.target.value);
        handleGetProposer(e.target.value);
        handleGetAllEditors(e.target.value);
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

    // For the Accordian Clauses
    const [expanded, setExpanded] = useState(0);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const clauseItems = [];
    for (let i = 0; i < NUMCLAUSES; i++) {
        clauseItems.push(
            <ClauseAccordion
                expanded={expanded}
                handleChange={handleChange}
                clauseNum={i}
                contractAddress={selectedContract}
            />
        );
    }
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
                            {contracts.map((currentcontract, index) => (
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
                    <Typography>Proposed Change</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {" "}
                            <Card
                                sx={{
                                    py: 5,
                                    px: 3,
                                    boxShadow: 0,
                                    textAlign: "left",
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                    bgcolor: "transparent",
                                    border: 2,
                                    borderColor: (theme) =>
                                        theme.palette.success.dark,
                                }}
                            >
                                Current Clause #{Number(changedClause) + 1}
                                <Divider sx={{ m: 1 }} />
                                {currentClauseText}
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                sx={{
                                    py: 5,
                                    px: 3,
                                    boxShadow: 0,
                                    textAlign: "left",
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                    bgcolor: "transparent",
                                    border: 2,
                                    borderColor: (theme) =>
                                        theme.palette.warning.dark,
                                }}
                            >
                                Proposed Clause #{Number(changedClause) + 1}{" "}
                                Change by {proposer}
                                <Divider sx={{ m: 1 }} />
                                {proposedClauseText}
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography>Proposed Contract Preview</Typography>
                    <Card
                        sx={{
                            py: 5,
                            px: 3,
                            boxShadow: 0,
                            textAlign: "left",
                            color: (theme) => theme.palette.text.primary,
                            bgcolor: (theme) =>
                                theme.palette.background.neutral,
                            border: 1,
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography variant="h5">
                                    Contract Name
                                </Typography>
                                <Typography variant="subtitle2">
                                    Contract Address
                                </Typography>
                            </Stack>
                            <Typography>
                                Lorem ipsum dolor sit amet. Ut aliquam ullam ut
                                perferendis quam aut nisi dignissimos ut ipsa
                                harum sed quos porro. 33 quia autem non illo
                                nisi et sunt illo vel molestiae obcaecati.
                            </Typography>
                            {clauseItems}
                        </Stack>
                    </Card>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Editors List</Typography>
                            <List dense="false">
                                {contractUsers.map((user, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {user.voted ? (
                                                <Tooltip title="Voted">
                                                    <DoneAllIcon
                                                        sx={{
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .primary
                                                                    .light,
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Yet to vote">
                                                    <QuestionMarkIcon
                                                        sx={{
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .warning
                                                                    .light,
                                                        }}
                                                    />
                                                </Tooltip>
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={user.username}
                                            secondary={user.walletAddress}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={5}>
                            <Typography>Vote</Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={3}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: (theme) =>
                                            theme.palette.success.darker,
                                    }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: (theme) =>
                                            theme.palette.error.darker,
                                    }}
                                >
                                    Against
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </>
    );
}
