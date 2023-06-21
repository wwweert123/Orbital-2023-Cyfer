import PropTypes from "prop-types";
// @mui
import { TableRow, TableCell, TableHead } from "@mui/material";

// ----------------------------------------------------------------------

UserListHead.propTypes = {
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
    headLabel: PropTypes.array,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
};

export default function UserListHead({ rowCount, headLabel }) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? "right" : "left"}
                    ></TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
