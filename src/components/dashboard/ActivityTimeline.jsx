import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
} from "@mui/material";

import { recentActivities } from "../../mocks/dashboardData";

export default function ActivityTimeline() {
  return (
    <List>

      {recentActivities.map((activity, index) => (
        <Box key={index}>

          <ListItem>

            <Chip
              label={activity.time}
              color="primary"
              size="small"
              sx={{ mr: 2, minWidth: 80 }}
            />

            <ListItemText
              primary={activity.activity}
            />

          </ListItem>

          {index !== recentActivities.length - 1 && (
            <Divider />
          )}

        </Box>
      ))}

    </List>
  );
}