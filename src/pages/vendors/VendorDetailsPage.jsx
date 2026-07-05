import { memo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Box,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import vendorData from "../../mocks/vendorData";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function VendorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const vendor = vendorData.find((item) => item.id === id);

  if (!vendor) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Vendor Not Found
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/vendors")}
        >
          Back to Vendors
        </Button>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: "center" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/vendors")}
        >
          Back
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Vendor Profile: {vendor.name}
        </Typography>
      </Stack>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Basic Details" id="tab-0" />
          <Tab label="Contacts" id="tab-1" />
          <Tab label="Documents" id="tab-2" />
          <Tab label="Risk Information" id="tab-3" />
          <Tab label="History" id="tab-4" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Tab 1: Basic Details */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Vendor ID
                  </Typography>
                  <Typography variant="h6">{vendor.id}</Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Vendor Name
                  </Typography>
                  <Typography variant="h6">{vendor.name}</Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Category
                  </Typography>
                  <Typography variant="h6">{vendor.category}</Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Registration Date
                  </Typography>
                  <Typography variant="h6">
                    {vendor.registrationDate}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Level
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={vendor.risk}
                      color={getRiskColor(vendor.risk)}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={vendor.status}
                      color={vendor.status === "Active" ? "success" : "default"}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Performance Rating
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Rating
                      value={vendor.performanceRating}
                      readOnly
                      precision={0.1}
                    />
                    <Typography variant="body2">
                      {vendor.performanceRating} / 5
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Score
                  </Typography>
                  <Typography
                    variant="h6"
                    color={
                      vendor.riskScore > 7 ? "error" : "success"
                    }
                  >
                    {vendor.riskScore} / 10
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 2: Contacts */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Contact Person
                  </Typography>
                  <Typography variant="h6">{vendor.contact}</Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body2">
                    <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">
                    <a href={`tel:${vendor.phone}`}>{vendor.phone}</a>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 3: Documents */}
          <TabPanel value={tabValue} index={2}>
            {vendor.documents && vendor.documents.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><b>Document Name</b></TableCell>
                    <TableCell><b>Type</b></TableCell>
                    <TableCell><b>Upload Date</b></TableCell>
                    <TableCell align="center"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendor.documents.map((doc, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type.toUpperCase()}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          startIcon={<FileDownloadIcon />}
                          variant="outlined"
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography color="textSecondary">
                No documents available
              </Typography>
            )}
          </TabPanel>

          {/* Tab 4: Risk Information */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Level
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={vendor.risk}
                      color={getRiskColor(vendor.risk)}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Score
                  </Typography>
                  <Typography
                    variant="h6"
                    color={vendor.riskScore > 7 ? "error" : "success"}
                  >
                    {vendor.riskScore} / 10
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Risk Assessment
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    {vendor.risk === "High"
                      ? "This vendor has a high risk profile. Regular monitoring and compliance checks are recommended."
                      : vendor.risk === "Medium"
                      ? "This vendor has a medium risk profile. Standard monitoring procedures should be followed."
                      : "This vendor has a low risk profile. Routine checks are sufficient."}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 5: History */}
          <TabPanel value={tabValue} index={4}>
            {vendor.history && vendor.history.length > 0 ? (
              <Stack spacing={2}>
                {vendor.history.map((historyItem, index) => (
                  <Paper key={index} sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {historyItem.action}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {historyItem.details || historyItem.amount}
                        </Typography>
                      </Box>
                      <Typography variant="caption">
                        {historyItem.date}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Typography color="textSecondary">
                No history available
              </Typography>
            )}
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}

export default memo(VendorDetailsPage);