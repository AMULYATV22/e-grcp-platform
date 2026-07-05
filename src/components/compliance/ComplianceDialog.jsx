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

const departments = [
  "IT",
  "Finance",
  "Operations",
  "Legal",
  "HR",
];

const schema = yup.object({
  document: yup.string().required("Document is required"),

  department: yup.string().required("Department is required"),

  owner: yup.string().required("Owner is required"),

  status: yup.string().required("Status is required"),

  expiry: yup.string().required("Expiry Date is required"),
});

export default function ComplianceDialog({
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
      document: "",
      department: "",
      owner: "",
      status: "Pending",
      expiry: "",
    },
  });

  const onSubmit = (data) => {
    onSave({
      id: `CMP-${Date.now()}`,
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
      <DialogTitle>Add Compliance Record</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <Controller
            name="document"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Document"
                fullWidth
                error={!!errors.document}
                helperText={errors.document?.message}
              />
            )}
          />

          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Department"
                fullWidth
                error={!!errors.department}
                helperText={errors.department?.message}
              >
                {departments.map((dept) => (
                  <MenuItem
                    key={dept}
                    value={dept}
                  >
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="owner"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner"
                fullWidth
                error={!!errors.owner}
                helperText={errors.owner?.message}
              />
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
                <MenuItem value="Compliant">Compliant</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="expiry"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Expiry Date"
                fullWidth
                error={!!errors.expiry}
                helperText={errors.expiry?.message}
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