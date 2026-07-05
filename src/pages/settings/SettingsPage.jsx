import { Container, Typography, Grid } from "@mui/material";

import settingsData from "../../mocks/settingsData";

import ProfileCard from "../../components/settings/ProfileCard";
import PreferencesCard from "../../components/settings/PreferencesCard";
import SecurityCard from "../../components/settings/SecurityCard";

export default function SettingsPage() {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileCard profile={settingsData.profile} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <PreferencesCard preferences={settingsData.preferences} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SecurityCard security={settingsData.security} />
        </Grid>
      </Grid>
    </Container>
  );
}