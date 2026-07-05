import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addRequest,
  fetchRequests,
  setFilters,
  setSorting,
  selectAllRequests,
  selectProcurementLoading,
  selectProcurementFilters,
  selectProcurementSorting,
} from "../../app/procurementSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Pagination,
  Box,
  Paper,
} from "@mui/material";

import SearchBar from "../../components/procurement/SearchBar";
import RequestDialog from "../../components/procurement/RequestDialog";
import ProcurementTable from "../../components/procurement/ProcurementTable";
import { exportProcurementToCSV } from "../../services/procurementService";

const ITEMS_PER_PAGE = 10;

const getComparableValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "\uffff";
  }

  return String(value).toLowerCase();
};

export const sortRequests = (requests, sorting) => {
  const data = [...requests];

  data.sort((a, b) => {
    let compareValue = 0;

    switch (sorting.field) {
      case "amount":
        compareValue = Number(a.amount) - Number(b.amount);
        break;
      case "department":
        compareValue = getComparableValue(a.department).localeCompare(
          getComparableValue(b.department)
        );
        break;
      case "status":
        compareValue = getComparableValue(a.status).localeCompare(
          getComparableValue(b.status)
        );
        break;
      case "dateCreated":
      default:
        compareValue = getComparableValue(a.dateCreated).localeCompare(
          getComparableValue(b.dateCreated)
        );
    }

    return sorting.order === "desc" ? -compareValue : compareValue;
  });

  return data;
};

export default function ProcurementPage() {
  const dispatch = useDispatch();

  const requests = useSelector(selectAllRequests);
  const loading = useSelector(selectProcurementLoading);
  const filters = useSelector(selectProcurementFilters);
  const sorting = useSelector(selectProcurementSorting);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const filteredRequests = useMemo(() => {
    let data = [...requests];

    // Search
    data = data.filter((request) =>
      `${request.id} ${request.department} ${request.item} ${request.requestedBy}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // Department Filter
    if (filters.department) {
      data = data.filter(
        (request) => request.department === filters.department
      );
    }

    // Status Filter
    if (filters.status) {
      data = data.filter(
        (request) => request.status === filters.status
      );
    }

    return sortRequests(data, sorting);
  }, [requests, search, filters, sorting]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage]);

  const totalPages = Math.ceil(
    filteredRequests.length / ITEMS_PER_PAGE
  );

  const handleAddRequest = useCallback(
    (request) => {
      dispatch(addRequest(request));
      setOpenDialog(false);
      setSnackbarMessage(
        "Procurement request created successfully!"
      );
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (field, order) => {
      dispatch(setSorting({ field, order }));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleExportCSV = useCallback(() => {
    if (filteredRequests.length === 0) {
      setSnackbarMessage("No procurement records to export.");
      setOpenSnackbar(true);
      return;
    }

    const blob = exportProcurementToCSV(filteredRequests);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Procurement_${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSnackbarMessage("Procurement data exported successfully!");
    setOpenSnackbar(true);
  }, [filteredRequests]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5">
          Loading Procurement Data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Procurement Workspace
      </Typography>

      <SearchBar
        search={search}
        setSearch={handleSearchChange}
        department={filters.department}
        setDepartment={(val) =>
          handleFilterChange({ department: val })
        }
        status={filters.status}
        setStatus={(val) =>
          handleFilterChange({ status: val })
        }
        sort={sorting.field}
        setSort={(field) => handleSortChange(field, sorting.order)}
        onExport={handleExportCSV}
        onAddClick={() => setOpenDialog(true)}
      />

      <ProcurementTable rows={paginatedRequests} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Paper
          sx={{
            p: 2,
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Paper>
      )}

      {/* Info */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography color="text.secondary" variant="body2">
          Showing {paginatedRequests.length} of{" "}
          {filteredRequests.length} requests
        </Typography>
      </Box>

      <RequestDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddRequest}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}