import { memo } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import {
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

function ProcurementApprovalHistoryTab({ approvalHistory }) {
  if (!approvalHistory || approvalHistory.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">
          No approval history available
        </Typography>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Timeline position="alternate">
      {approvalHistory.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="textSecondary">
            Level {item.level}
            <br />
            {item.date || "Pending"}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor:
                  item.status === "Approved"
                    ? "success.main"
                    : "warning.main",
              }}
            >
              {item.status === "Approved" ? (
                <CheckCircleIcon />
              ) : (
                <PendingIcon />
              )}
            </TimelineDot>
            {index < approvalHistory.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">
                {item.approver}
              </Typography>
              <Chip
                label={item.status}
                color={getStatusColor(item.status)}
                size="small"
                sx={{ mt: 1 }}
              />
              {item.comments && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {item.comments}
                </Typography>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default memo(ProcurementApprovalHistoryTab);
