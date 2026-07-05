import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

const modules = [
  "Dashboard",
  "Procurement",
  "Vendor",
  "Risk",
  "Compliance",
  "Reports",
];

const schema = yup.object({
  activity: yup.string().required("Activity is required"),
  user: yup.string().required("User is required"),
  module: yup.string().required("Module is required"),
  status: yup.string().required("Status is required"),
  date: yup.string().required("Date is required"),
});

export default function AuditDialog({
  open,
  onClose,
  onSave,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      activity: "",
      user: "",
      module: "",
      status: "Completed",
      date: "",
    },
  });

  const onSubmit = (data) => {
    onSave({
      id: `AUD-${Date.now()}`,
      ...data,
    });

    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Audit Record</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <Controller
            name="activity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Activity"
                fullWidth
                error={!!errors.activity}
                helperText={errors.activity?.message}
              />
            )}
          />

          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User"
                fullWidth
                error={!!errors.user}
                helperText={errors.user?.message}
              />
            )}
          />

          <Controller
            name="module"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Module"
                fullWidth
                error={!!errors.module}
                helperText={errors.module?.message}
              >
                {modules.map((module) => (
                  <MenuItem
                    key={module}
                    value={module}
                  >
                    {module}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="Completed">
                  Completed
                </MenuItem>
                <MenuItem value="Pending">
                  Pending
                </MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Date"
                fullWidth
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}