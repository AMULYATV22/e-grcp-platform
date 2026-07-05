import { memo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateProfile } from "../../app/authSlice";

function ProfileCard({ profile }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            Profile
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Stack>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully
          </Alert>
        )}

        <Stack spacing={2}>
          {isEditing ? (
            <>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </>
          ) : (
            <>
              <Typography>
                <b>Name:</b> {formData.name}
              </Typography>
              <Typography>
                <b>Email:</b> {formData.email}
              </Typography>
              <Typography>
                <b>Role:</b> {formData.role}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default memo(ProfileCard);