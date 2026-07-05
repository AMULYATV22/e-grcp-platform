import { Stack, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function SearchBar({
  search,
  setSearch,
  onAddClick,
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
        label="Search Audit"
        placeholder="Search by Activity, User or Module"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        Add Audit
      </Button>
    </Stack>
  );
}