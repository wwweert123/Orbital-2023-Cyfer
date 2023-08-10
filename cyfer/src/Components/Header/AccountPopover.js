import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
    Box,
    Divider,
    Typography,
    Stack,
    MenuItem,
    Avatar,
    IconButton,
    Popover,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";

import useLogout from "../../hooks/useLogout";

// mocks_
// import account from "../../../_mock/account";
const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
};

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: "Home (TODO)",
        icon: "eva:home-fill",
    },
    {
        label: "Profile (TODO)",
        icon: "eva:person-fill",
    },
    {
        label: "Settings (TODO)",
        icon: "eva:settings-2-fill",
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const [open, setOpen] = useState(null);

    const [username] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const logout = useLogout();

    const signOut = async () => {
        handleClose();
        await logout();
        navigate("/login");
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        "&:before": {
                            zIndex: 1,
                            content: "''",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            position: "absolute",
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
                        "& .MuiMenuItem-root": {
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {username}
                    </Typography>
                    {/* <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                    >
                        {account.email}
                    </Typography> */}
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={handleClose}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={signOut} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
