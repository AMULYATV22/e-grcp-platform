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
  department,
  setDepartment,
  status,
  setStatus,
  sort,
  setSort,
  onAddClick,
  onExport,
}) {
  const selectedSortValue = sort === "dateCreated" ? "latest" : sort || "latest";

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search Request"
        placeholder="Search by Item, Department or Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Department Filter */}

      <TextField
        select
        size="small"
        label="Department"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">
          All Departments
        </MenuItem>

        <MenuItem value="Finance">
          Finance
        </MenuItem>

        <MenuItem value="HR">
          HR
        </MenuItem>

        <MenuItem value="IT">
          IT
        </MenuItem>

        <MenuItem value="Operations">
          Operations
        </MenuItem>

        <MenuItem value="Legal">
          Legal
        </MenuItem>
      </TextField>

      {/* Status Filter */}

      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">
          All Status
        </MenuItem>

        <MenuItem value="Pending">
          Pending
        </MenuItem>

        <MenuItem value="Approved">
          Approved
        </MenuItem>

        <MenuItem value="Rejected">
          Rejected
        </MenuItem>

        <MenuItem value="In Review">
          In Review
        </MenuItem>
      </TextField>

      {/* Sorting */}

      <TextField
        select
        size="small"
        label="Sort By"
        value={selectedSortValue}
        onChange={(e) =>
          setSort(e.target.value === "latest" ? "dateCreated" : e.target.value)
        }
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="latest">
          Latest
        </MenuItem>

        <MenuItem value="amountHigh">
          Amount High → Low
        </MenuItem>

        <MenuItem value="amountLow">
          Amount Low → High
        </MenuItem>

        <MenuItem value="department">
          Department
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
        New Request
      </Button>
    </Stack>
  );
}