import { memo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function ProcurementAttachmentsTab({ attachments }) {
  if (!attachments || attachments.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">
          No attachments available
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>File Name</b></TableCell>
            <TableCell><b>Type</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attachments.map((attachment, index) => (
            <TableRow key={index} hover>
              <TableCell>{attachment}</TableCell>
              <TableCell>
                {attachment.split(".").pop().toUpperCase()}
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                  >
                    Download
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default memo(ProcurementAttachmentsTab);
