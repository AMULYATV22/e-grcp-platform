import { memo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
} from "../../app/approvalSlice";

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Chip,
  Button,
  Stack,
} from "@mui/material";

function ApprovalTable({ rows }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Escalated":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
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

              <TableCell><b>Approval ID</b></TableCell>

              <TableCell><b>Request ID</b></TableCell>

              <TableCell><b>Department</b></TableCell>

              <TableCell><b>Requester</b></TableCell>

              <TableCell><b>Item</b></TableCell>

              <TableCell><b>Priority</b></TableCell>

              <TableCell><b>Status</b></TableCell>

              <TableCell align="right">
                <b>Amount ($)</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {rows
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((row) => (
                <TableRow key={row.id} hover>

                  <TableCell>{row.id}</TableCell>

                  <TableCell>{row.requestId}</TableCell>

                  <TableCell>{row.department}</TableCell>

                  <TableCell>{row.requester}</TableCell>

                  <TableCell>{row.item}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.priority}
                      color={getPriorityColor(row.priority)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    {Number(row.amount).toLocaleString()}
                  </TableCell>

                  <TableCell align="center">

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", justifyContent: "center" }}
                    >                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        disabled={row.status === "Approved"}
                        onClick={() =>
                          dispatch(approveRequest(row.id))
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        disabled={row.status === "Rejected"}
                        onClick={() =>
                          dispatch(rejectRequest(row.id))
                        }
                      >
                        Reject
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        disabled={row.status === "Pending"}
                        onClick={() =>
                          dispatch(sendBackRequest(row.id))
                        }
                      >
                        Send Back
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="info"
                        disabled={row.status === "Escalated"}
                        onClick={() =>
                          dispatch(delegateRequest(row.id))
                        }
                      >
                        Delegate
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

export default memo(ApprovalTable);