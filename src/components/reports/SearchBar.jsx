import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

export default function SearchBar({
  search,
  setSearch,
  onAddClick,
  onExport,
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search Reports"
        placeholder="Search by Report, Type or User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
        Generate Report
      </Button>
    </Stack>
  );
}