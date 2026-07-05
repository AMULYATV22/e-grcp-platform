import {
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  risk,
  setRisk,
  status,
  setStatus,
  sort,
  setSort,
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
        label="Search Vendor"
        placeholder="Search by Vendor, Category or Contact"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <TextField
        select
        size="small"
        label="Category"
        value={category || ""}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="IT">IT</MenuItem>
        <MenuItem value="Office Supplies">
          Office Supplies
        </MenuItem>
        <MenuItem value="Logistics">Logistics</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Furniture">Furniture</MenuItem>
      </TextField>

      {/* Risk Filter */}
      <TextField
        select
        size="small"
        label="Risk Level"
        value={risk || ""}
        onChange={(e) => setRisk(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">All Risks</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>

      {/* Status Filter */}
      <TextField
        select
        size="small"
        label="Status"
        value={status || ""}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>

      {/* Sorting */}
      <TextField
        select
        size="small"
        label="Sort By"
        value={sort || "name"}
        onChange={(e) => setSort(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="riskScore">Risk Score</MenuItem>
        <MenuItem value="registrationDate">
          Registration Date
        </MenuItem>
      </TextField>

      {/* Export */}
      <Button
        variant="outlined"
        color="success"
        startIcon={<DownloadIcon />}
        onClick={onExport}
      >
        Export CSV
      </Button>

      {/* Add */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        Add Vendor
      </Button>
    </Stack>
  );
}