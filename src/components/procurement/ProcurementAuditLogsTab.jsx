import { memo } from "react";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function ProcurementAuditLogsTab({ auditLogs }) {
  if (!auditLogs || auditLogs.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">No audit logs available</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>Timestamp</b></TableCell>
            <TableCell><b>User</b></TableCell>
            <TableCell><b>Action</b></TableCell>
            <TableCell><b>Module</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auditLogs.map((log, index) => (
            <TableRow key={`${log.action}-${index}`} hover>
              <TableCell>{log.timestamp || log.date || "N/A"}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>
                <Chip label={log.action} size="small" />
              </TableCell>
              <TableCell>{log.module || "Procurement"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default memo(ProcurementAuditLogsTab);
