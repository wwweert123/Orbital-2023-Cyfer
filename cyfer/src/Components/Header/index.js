import { styled } from "@mui/material/styles";

// utils
import { bgBlur } from "../../utils/cssStyles";

import {
    Box,
    Stack,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from "@mui/material";
//
import AccountPopover from "./AccountPopover";
import Searchbar from "./Searchbar";
import Iconify from "../iconify";
import LanguagePopover from "./LanguagePopover";
import WalletSelect from "./WalletSelect";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: "none",
    [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up("lg")]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

export default function Header({ onOpenNav }) {
    return (
        <StyledRoot>
            <StyledToolbar>
                <IconButton
                    onClick={onOpenNav}
                    sx={{
                        mr: 1,
                        color: "text.primary",
                        display: { lg: "none" },
                    }}
                >
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>

                <Searchbar />
                <Box sx={{ flexGrow: 1 }} />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <Typography variant="subtitle2" sx={{ mx: 1 }}>
                        Select your wallet here!
                    </Typography>
                    <WalletSelect />
                    <LanguagePopover />
                    <AccountPopover />
                </Stack>
            </StyledToolbar>
        </StyledRoot>
    );
}
