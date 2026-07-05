import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
} from "@mui/material";

export default function RiskTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const severityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "error";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Open":
        return "error";
      case "Mitigated":
        return "warning";
      case "Closed":
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
              <TableCell><b>Risk ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Owner</b></TableCell>
              <TableCell><b>Severity</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((risk) => (
                <TableRow key={risk.id} hover>
                  <TableCell>{risk.id}</TableCell>
                  <TableCell>{risk.title}</TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>{risk.owner}</TableCell>

                  <TableCell>
                    <Chip
                      label={risk.severity}
                      color={severityColor(risk.severity)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={risk.status}
                      color={statusColor(risk.status)}
                      size="small"
                    />
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