import {
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

export default function ApprovalSearchBar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  onAddClick,
  onExport,
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search Approval"
        placeholder="Search by Request ID, Department or Requester"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
        <MenuItem value="Escalated">Escalated</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Priorities</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        color="success"
        startIcon={<DownloadIcon />}
        onClick={onExport}
      >
        Export CSV
      </Button>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        New Approval
      </Button>
    </Stack>
  );
}