import { useState } from "react";
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
} from "@mui/material";

export default function ComplianceTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getColor = (status) => {
    switch (status) {
      case "Compliant":
        return "success";
      case "Pending":
        return "warning";
      case "Expired":
        return "error";
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
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Document</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell><b>Owner</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Expiry</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.document}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.owner}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getColor(row.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{row.expiry}</TableCell>
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
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}