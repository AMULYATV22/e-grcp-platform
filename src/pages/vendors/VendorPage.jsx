import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addVendor,
  fetchVendors,
  setVendorFilters,
  setVendorSorting,
  selectAllVendors,
  selectVendorLoading,
  selectVendorFilters,
  selectVendorSorting,
} from "../../app/vendorSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Pagination,
  Box,
  Paper,
} from "@mui/material";

import SearchBar from "../../components/vendor/SearchBar";
import VendorDialog from "../../components/vendor/VendorDialog";
import VendorTable from "../../components/vendor/VendorTable";
import { exportVendorsToCSV } from "../../services/vendorService";

const ITEMS_PER_PAGE = 10;

export default function VendorPage() {
  const dispatch = useDispatch();

  const vendors = useSelector(selectAllVendors);
  const loading = useSelector(selectVendorLoading);
  const filters = useSelector(selectVendorFilters);
  const sorting = useSelector(selectVendorSorting);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const filteredVendors = useMemo(() => {
    let data = [...vendors];

    // Search
    data = data.filter((vendor) =>
      `${vendor.name} ${vendor.category} ${vendor.contact} ${vendor.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // Category Filter
    if (filters.category) {
      data = data.filter(
        (vendor) => vendor.category === filters.category
      );
    }

    // Risk Filter
    if (filters.risk) {
      data = data.filter(
        (vendor) => vendor.risk === filters.risk
      );
    }

    // Status Filter
    if (filters.status) {
      data = data.filter(
        (vendor) => vendor.status === filters.status
      );
    }

    // Sorting
    data.sort((a, b) => {
      let compareValue = 0;

      switch (sorting.field) {
        case "rating":
          compareValue =
            a.performanceRating - b.performanceRating;
          break;
        case "riskScore":
          compareValue = a.riskScore - b.riskScore;
          break;
        case "registrationDate":
          compareValue = a.registrationDate.localeCompare(
            b.registrationDate
          );
          break;
        case "name":
        default:
          compareValue = a.name.localeCompare(b.name);
      }

      return sorting.order === "desc"
        ? -compareValue
        : compareValue;
    });

    return data;
  }, [vendors, search, filters, sorting]);

  const paginatedVendors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredVendors.slice(startIndex, endIndex);
  }, [filteredVendors, currentPage]);

  const totalPages = Math.ceil(
    filteredVendors.length / ITEMS_PER_PAGE
  );

  const handleAddVendor = useCallback(
    (vendor) => {
      dispatch(addVendor(vendor));
      setOpenDialog(false);
      setSnackbarMessage(
        "Vendor added successfully!"
      );
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setVendorFilters(newFilters));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (field, order) => {
      dispatch(setVendorSorting({ field, order }));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleExportCSV = useCallback(() => {
    if (filteredVendors.length === 0) {
      setSnackbarMessage("No vendor records to export.");
      setOpenSnackbar(true);
      return;
    }

    const blob = exportVendorsToCSV(filteredVendors);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Vendors_${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSnackbarMessage("Vendor data exported successfully!");
    setOpenSnackbar(true);
  }, [filteredVendors]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5">
          Loading Vendor Data...
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
        Vendor Management
      </Typography>

      <SearchBar
        search={search}
        setSearch={handleSearchChange}
        category={filters.category}
        setCategory={(val) =>
          handleFilterChange({ category: val })
        }
        risk={filters.risk}
        setRisk={(val) =>
          handleFilterChange({ risk: val })
        }
        status={filters.status}
        setStatus={(val) =>
          handleFilterChange({ status: val })
        }
        sort={sorting.field}
        setSort={(field) =>
          handleSortChange(field, sorting.order)
        }
        onExport={handleExportCSV}
        onAddClick={() => setOpenDialog(true)}
      />

      <VendorTable rows={paginatedVendors} />

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
          Showing {paginatedVendors.length} of{" "}
          {filteredVendors.length} vendors
        </Typography>
      </Box>

      <VendorDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddVendor}
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