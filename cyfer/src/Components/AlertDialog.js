// Mui
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
} from "@mui/material";

// Proptypes
import PropTypes from "prop-types";

AlertDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    errtitle: PropTypes.string.isRequired,
    errmsg: PropTypes.string.isRequired,
};

export default function AlertDialog({ open, handleClose, errtitle, errmsg }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.background.default,
                }}
            >
                {errtitle}
            </DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.background.default,
                }}
            >
                <DialogContentText id="alert-dialog-description">
                    {errmsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.background.default,
                }}
            >
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
