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
  "Electronics",
  "Office Supplies",
  "Furniture",
  "Logistics",
];

const schema = yup.object({
  name: yup.string().required("Vendor Name is required"),

  category: yup.string().required("Category is required"),

  contact: yup.string().required("Contact Person is required"),

  risk: yup.string().required("Risk is required"),
});

export default function VendorDialog({
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
      name: "",
      category: "",
      contact: "",
      risk: "Low",
    },
  });

  const onSubmit = (data) => {
    onSave({
      id: `VND-${Date.now()}`,
      ...data,
      status: "Active",
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
      <DialogTitle>Add Vendor</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Vendor Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
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
            name="contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Person"
                fullWidth
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          />

          <Controller
            name="risk"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Risk"
                fullWidth
                error={!!errors.risk}
                helperText={errors.risk?.message}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
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