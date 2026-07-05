import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function AuditTimeline({ auditLogs }) {
  if (!auditLogs || auditLogs.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">
          No audit logs available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Audit Timeline
      </Typography>
      <Timeline>
        {auditLogs.map((log, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "primary.main" }}>
                <AccessTimeIcon />
              </TimelineDot>
              {index < auditLogs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">{log.activity}</Typography>
              <Typography variant="body2" color="textSecondary">
                {log.user} • {log.date} {log.time}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {log.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}

export default memo(AuditTimeline);
