import { memo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

function SecurityCard({ security }) {
  const [twoFactor, setTwoFactor] = useState(security.twoFactor);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleTwoFactorChange = (e) => {
    setTwoFactor(e.target.checked);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    setPasswordError("");
  };

  const handlePasswordSave = () => {
    if (
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Security
        </Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={twoFactor}
                onChange={handleTwoFactorChange}
              />
            }
            label="Two Factor Authentication"
          />

          <Typography variant="body2" color="textSecondary">
            <b>Session Timeout:</b> {security.sessionTimeout} minutes
          </Typography>

          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => setOpenPasswordDialog(true)}
            fullWidth
          >
            Change Password
          </Button>
        </Stack>
      </CardContent>

      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {passwordError && (
              <Alert severity="error">{passwordError}</Alert>
            )}
            <TextField
              type="password"
              label="Current Password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              type="password"
              label="New Password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePasswordSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default memo(SecurityCard);