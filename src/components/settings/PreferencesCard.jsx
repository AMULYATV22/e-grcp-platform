import { memo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setThemeMode } from "../../app/uiSlice";
import { updatePreferences } from "../../app/authSlice";

function PreferencesCard({ preferences }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(preferences);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    dispatch(updatePreferences(formData));

    if (formData.theme === "Dark") {
      dispatch(setThemeMode(true));
    } else if (formData.theme === "Light") {
      dispatch(setThemeMode(false));
    } else if (formData.theme === "Auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dispatch(setThemeMode(prefersDark));
    }

    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            Preferences
          </Typography>
          <Stack direction="row" spacing={1}>
            {isEditing ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </Stack>
        </Stack>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Preferences updated successfully
          </Alert>
        )}

        <Stack spacing={2}>
          {isEditing ? (
            <>
              <TextField
                select
                label="Theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                fullWidth
                size="small"
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Auto">Auto</option>
              </TextField>

              <TextField
                select
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                fullWidth
                size="small"
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </TextField>

              <FormControlLabel
                control={
                  <Switch
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                }
                label="Enable Notifications"
              />
            </>
          ) : (
            <>
              <Typography>
                <b>Theme:</b> {formData.theme}
              </Typography>

              <Typography>
                <b>Language:</b> {formData.language}
              </Typography>

              <FormControlLabel
                control={
                  <Switch checked={formData.notifications} disabled />
                }
                label="Notifications"
              />
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default memo(PreferencesCard);