import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; //import the hook
import { useNavigate, useLocation } from "react-router-dom";

// @mui
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    Stack,
    Avatar,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from "@mui/material";

// Components
import Label from "../Components/label";
import Iconify from "../Components/iconify";
import UserListHead from "../sections/user/UserListHead";
import Scrollbar from "./scrollbar/Scrollbar";

const avatarUrl = "/assets/images/avatars/avatar_1.jpg";

const TABLE_HEAD = [
    { id: "name", label: "Name", alignRight: false },
    { id: "company", label: "Company", alignRight: false },
    { id: "role", label: "Role", alignRight: false },
    { id: "isVerified", label: "Verified", alignRight: false },
    { id: "status", label: "Status", alignRight: false },
    { id: "" },
];

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation(); //current location

    // Table States
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // cancel any pending request if the component unmounts

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                const userNames = response.data.map((user) => user.username);
                console.log(response.data);
                isMounted && setUsers(userNames);
            } catch (err) {
                console.error(err);
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getUsers();
        return () => {
            isMounted = false;
            controller.abort(); // abort request
        };
        // return statement performs the cleanup when the component unmount or after the previous render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {users?.length ? (
                <>
                    <Scrollbar>
                        <TableContainer
                            sx={{
                                minWidth: 800,
                                bgcolor: "background.neutral",
                            }}
                        >
                            <Table>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                    rowCount={users.length}
                                ></UserListHead>
                                <TableBody>
                                    {users
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, i) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={i}
                                                    tabIndex={-1}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <Avatar
                                                                alt={row}
                                                                src={avatarUrl}
                                                            />
                                                            <Typography
                                                                variant="subtitle2"
                                                                noWrap
                                                            >
                                                                {row}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {"Yes"}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            color={"success"}
                                                        >
                                                            Banned
                                                        </Label>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton
                                                            size="large"
                                                            color="inherit"
                                                            // onClick={handleOpenMenu}
                                                        >
                                                            <Iconify
                                                                icon={
                                                                    "eva:more-vertical-fill"
                                                                }
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            ) : (
                <p>No users to display</p>
            )}
        </>
    );
};

export default Users;
