import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectFormField = ({ control, name, label, options, defaultValue="", variant="standard", required = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: required ? "This field is required." : undefined }}
      render={({ field }) => (
        <FormControl variant={variant} sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-standard-label">
            {label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            {...field}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectFormField;
