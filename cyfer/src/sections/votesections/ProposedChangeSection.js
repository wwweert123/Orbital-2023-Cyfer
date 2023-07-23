import { useState, useEffect } from "react";

// mui
import {
    Stack,
    Typography,
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
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// Hooks
import useWallet from "../../hooks/useWallet";

// Connex and ABI
import Connex from "../../api/connex";
import { ABICombined } from "../../Vechain/abicombined";

// Axios
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Components
import ClauseAccordion from "../../sections/viewsections/ClauseAccordion";

const NUMCLAUSES = 10;

export default function ProoposedChangeSection({ selectedContract }) {
    const axiosPrivate = useAxiosPrivate();
    const connex = Connex();

    const { wallet } = useWallet();

    const [changedClause, setChangedClause] = useState();
    const [currentClauseText, setCurrentClauseText] = useState();
    const [proposedClauseText, setProposedClauseText] = useState();
    const [proposer, setProposer] = useState();

    const [contractUsers, setContractUsers] = useState();

    const [yes, setYes] = useState();
    const [no, setNo] = useState();

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (vote) => {
        const voteYesABI = ABICombined[2].find(
            ({ name }) => name === "voteFor"
        );
        const voteNoABI = ABICombined[2].find(({ name }) => name === "voteNo");
        try {
            const clause = connex.thor
                .account(selectedContract)
                .method(vote === 1 ? voteYesABI : voteNoABI)
                .asClause();
            const result = await connex.vendor
                .sign("tx", [clause])
                .signer(wallet)
                .comment(`voting ${vote} for this proposal`)
                .request();
            if (result) {
                console.log(`Vote ${vote} successful`);
                setSubmitted(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetChangedClause = async () => {
        const indexABI = ABICombined[2].find(
            ({ name }) => name === "getProposalIndex"
        );
        const clauseNo = await connex.thor
            .account(selectedContract)
            .method(indexABI)
            .call();
        setChangedClause(clauseNo.decoded[0] ? clauseNo.decoded[0] : "100");
        console.log(clauseNo.decoded[0]);
        handleGetCurrentClause(
            clauseNo.decoded[0] ? clauseNo.decoded[0] : "100"
        );
        return clauseNo.decoded[0] ? clauseNo.decoded[0] : "100";
    };

    const handleGetCurrentClause = async (clauseNo) => {
        const readABI = ABICombined[2].find(({ name }) => name === "retrieve");
        const currentText = await connex.thor
            .account(selectedContract)
            .method(readABI)
            .call(clauseNo);
        setCurrentClauseText(currentText.decoded[0]);
        console.log(currentText.decoded[0]);
    };

    const handleGetProposal = async () => {
        const contentABI = ABICombined[2].find(
            ({ name }) => name === "getProposal"
        );
        const clauseText = await connex.thor
            .account(selectedContract)
            .method(contentABI)
            .call();
        setProposedClauseText(clauseText.decoded[0]);
        console.log(clauseText.decoded[0]);
    };

    const handleGetProposer = async () => {
        const proposerABI = ABICombined[2].find(
            ({ name }) => name === "getProposer"
        );
        const proposer = await connex.thor
            .account(selectedContract)
            .method(proposerABI)
            .call();
        setProposer(proposer.decoded[0]);
        console.log(proposer.decoded[0]);
    };

    const checkVoteStatus = async (Users) => {
        const checkVotedABI = ABICombined[2].find(
            ({ name }) => name === "hasVoted"
        );
        const updated = await Promise.all(
            Users.map(async (user) => {
                const checkVoteResult = await connex.thor
                    .account(selectedContract)
                    .method(checkVotedABI)
                    .call(user.walletAddress);
                user.voted = checkVoteResult.decoded[0];
                return user;
            })
        );
        setContractUsers(updated);
        console.log(updated);
    };

    const handleGetAllEditors = async () => {
        if (selectedContract === "") {
            console.log("no contract selected");
            return;
        }
        try {
            const response = await axiosPrivate.get(
                `/wallet/getcontractusers/${selectedContract}`
            );
            checkVoteStatus(response.data, selectedContract);
        } catch (err) {
            console.log(err);
        }
    };

    const CheckYesNOResults = async () => {
        const yesABI = ABICombined[2].find(
            ({ name }) => name === "getForVotes"
        );
        const noABI = ABICombined[2].find(({ name }) => name === "getNoVotes");
        const yesResult = await connex.thor
            .account(selectedContract)
            .method(yesABI)
            .call();
        const noResult = await connex.thor
            .account(selectedContract)
            .method(noABI)
            .call();
        setYes(yesResult.decoded[0]);
        setNo(noResult.decoded[0]);
    };

    useEffect(() => {
        const clauseCode = handleGetChangedClause();
        if (clauseCode !== "100") {
            handleGetProposal();
            handleGetProposer();
            handleGetAllEditors();
            CheckYesNOResults();
        }
    }, [selectedContract, submitted]);

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
            {changedClause === "100" ? (
                <Typography variant="subtitle2">
                    This contract has no Proposed Change
                </Typography>
            ) : (
                <>
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
                                {contractUsers?.map((user, index) => (
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
                            <Typography>Yes Votes: {yes}</Typography>
                            <Typography>No Votes: {no}</Typography>
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
                                {contractUsers?.filter(
                                    (user) =>
                                        user.walletAddress === wallet &&
                                        user.voted === true
                                ) ? (
                                    <>
                                        <TaskAltIcon
                                            fontSize="large"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.success
                                                        .darker,
                                            }}
                                        />
                                        <Typography>
                                            Voted Recorded Successfully!
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: (theme) =>
                                                    theme.palette.success
                                                        .darker,
                                            }}
                                            onClick={() => handleSubmit(1)}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: (theme) =>
                                                    theme.palette.error.darker,
                                            }}
                                            onClick={() => handleSubmit(0)}
                                        >
                                            Against
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
