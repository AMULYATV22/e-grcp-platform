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

const categories = [
  "IT",
  "Finance",
  "Vendor",
  "Legal",
  "Operations",
];

const schema = yup.object({
  title: yup.string().required("Risk Title is required"),

  category: yup.string().required("Category is required"),

  owner: yup.string().required("Owner is required"),

  severity: yup.string().required("Severity is required"),
});

export default function RiskDialog({
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
      title: "",
      category: "",
      owner: "",
      severity: "Medium",
    },
  });

  const onSubmit = (data) => {
    onSave({
      id: `RSK-${Date.now()}`,
      ...data,
      status: "Open",
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
      <DialogTitle>Add Risk</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Risk Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
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
            name="severity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Severity"
                fullWidth
                error={!!errors.severity}
                helperText={errors.severity?.message}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
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