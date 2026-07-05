import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

const departments = [
  "Finance",
  "HR",
  "IT",
  "Operations",
  "Legal",
];

const schema = yup.object({
  department: yup.string().required("Department is required"),

  item: yup.string().required("Item is required"),

  requestedBy: yup.string().required("Requested By is required"),

  amount: yup
    .number()
    .typeError("Amount is required")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

export default function RequestDialog({
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
      department: "",
      item: "",
      requestedBy: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    onSave({
      id: `REQ-${Date.now()}`,
      ...data,
      status: "Pending",
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
      <DialogTitle>
        New Procurement Request
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

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
            name="item"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item"
                fullWidth
                error={!!errors.item}
                helperText={errors.item?.message}
              />
            )}
          />

          <Controller
            name="requestedBy"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Requested By"
                fullWidth
                error={!!errors.requestedBy}
                helperText={errors.requestedBy?.message}
              />
            )}
          />

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
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