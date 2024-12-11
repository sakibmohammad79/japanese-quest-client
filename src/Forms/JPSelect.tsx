import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ISelectOption {
  value: string | number;
  label: string;
}

interface ISelectProps {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  options: ISelectOption[];
  required?: boolean;
}

const JPSelect = ({
  name,
  label,
  size = "small",
  fullWidth = true,
  options,
  sx,
  required,
}: ISelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          size={size}
          sx={{ ...sx }}
          error={!!error?.message}
        >
          {label && <InputLabel>{label}</InputLabel>}
          <Select {...field} label={label}>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
export default JPSelect;
