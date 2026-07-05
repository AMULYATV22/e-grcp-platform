import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { approveRequest, rejectRequest } from "../../app/procurementSlice";

import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

function ProcurementTable({ rows }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getChipColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      case "In Review":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Request ID</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Requested By</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="right"><b>Amount ($)</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <RouterLink
                    to={`/procurement/${row.id}`}
                    style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}
                  >
                    {row.id}
                  </RouterLink>
                </TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.requestedBy}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={getChipColor(row.status)} size="small" />
                </TableCell>
                <TableCell align="right">{Number(row.amount).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      disabled={row.status === "Approved"}
                      onClick={() => dispatch(approveRequest(row.id))}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      disabled={row.status === "Rejected"}
                      onClick={() => dispatch(rejectRequest(row.id))}
                    >
                      Reject
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default memo(ProcurementTable);