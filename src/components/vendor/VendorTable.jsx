import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Tooltip,
} from "@mui/material";

export default function VendorTable({ rows }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
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
              <TableCell>
                <b>Vendor ID</b>
              </TableCell>

              <TableCell>
                <b>Vendor Name</b>
              </TableCell>

              <TableCell>
                <b>Category</b>
              </TableCell>

              <TableCell>
                <b>Contact</b>
              </TableCell>

              <TableCell>
                <b>Risk</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {rows
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((vendor) => (
                <Tooltip
                  key={vendor.id}
                  title="Click to view Vendor Profile"
                  arrow
                >
                  <TableRow
                    hover
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/vendors/${vendor.id}`)
                    }
                  >
                    <TableCell>{vendor.id}</TableCell>

                    <TableCell>
                      {vendor.name}
                    </TableCell>

                    <TableCell>
                      {vendor.category}
                    </TableCell>

                    <TableCell>
                      {vendor.contact}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={vendor.risk}
                        color={getRiskColor(vendor.risk)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={vendor.status}
                        color={
                          vendor.status === "Active"
                            ? "success"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                </Tooltip>
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