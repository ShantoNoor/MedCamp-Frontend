import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import DataTable from "react-data-table-component";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useDialog from "../hooks/useDialog";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SelectFormField from "../components/SelectFormField";
import isPast from "../utils/isPast";

const ManageCamps = () => {
  const { user } = useAuth();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/manage-camps", `_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/manage-camps?_id=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const [update, setUpdate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({});

  const { openDialog, ...dialog } = useDialog(async () => {
    await handleSubmit(formSubmit)();
  }, "Are you sure you wnat to update?");

  const { openDialog: openDeleteDialog, ...deleteDialog } = useDialog(
    async () => {
      const id = toast.loading("Please, wait ....");
      try {
        await axiosn.delete(`/delete-camp/${update._id}`);
        toast.dismiss(id);
        toast.success("Camp Deleted Successfully");
        refetch();
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        toast.error("Unable to Delete Camp");
      }
    },
    "Are you sure you wnat to delete?"
  );

  useEffect(() => {
    if (update) {
      setValue("_id", update._id);

      if (isPast(update.date_and_time)) {
        setValue("status", "complete");
      } else {
        setValue("status", "publish");
        setValue("name", update.name);
        setValue("fees", update.fees);
        setValue("details", update.details);
        setValue("venue", update.venue);
        setValue("services", update.services);
      }
    }
  }, [update, setValue]);

  const formSubmit = async (all_data) => {
    const id = toast.loading("Please, wait ....");
    try {
      const res = await axiosn.put(
        "/update-camp",
        isPast(update?.date_and_time)
          ? { _id: all_data._id, status: all_data.status }
          : all_data
      );
      if (res.status === 200) {
        toast.dismiss(id);
        toast.success("Camp Updated Successfully");
        refetch();
      }
    } catch (err) {
      toast.dismiss(id);
      toast.error("Unable to Update Camp");
      console.error(err);
    }
  };

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Camp Fees",
      selector: (row) => row.fees,
      sortable: true,
      width: "110px",
    },
    {
      name: "Scheduled Date and Time",
      selector: (row) => (
        <DateTimePicker
          slotProps={{
            textField: {
              variant: "standard",
              readOnly: true,
            },
          }}
          defaultValue={moment(row.date_and_time)}
          readOnly={true}
        />
      ),
    },
    {
      name: "Camp Status",
      selector: (row) => row.status.toUpperCase(),
      width: "130px",
    },
    {
      name: "Venue Location",
      selector: (row) => row.venue,
    },
    {
      name: "Specialized Services Provided",
      selector: (row) => row.services,
    },
    {
      name: "Comprehensive Description",
      selector: (row) => row.details.slice(0, 80),
    },
    {
      name: "Target Audience",
      selector: (row) => row.target_audience,
    },
    {
      name: "Healthcare Professionals in Attendance",
      selector: (row) => row.pros.join(", "),
    },

    {
      name: "Action",
      width: "200px",
      selector: (row) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setUpdate(row);
              openDialog();
            }}
            disabled={row.status === "complete"}
          >
            {isPast(row.date_and_time) ? "Complete" : "Update"}
          </Button>

          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            size="small"
            disabled={isPast(row.date_and_time)}
            onClick={() => {
              setUpdate(row);
              openDeleteDialog();
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <DataTable data={data} columns={columns} />
      <AlertDialogSlide {...dialog}>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={2}>
            {!isPast(update?.date_and_time) && (
              <>
                {" "}
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  {/* Camp Name */}
                  <Box flex={1}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Camp Name"
                      autoFocus
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("name", {
                        required: "Camp Name is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.name?.message}
                    </Typography>
                  </Box>
                  {/* Camp Fees */}
                  <Box flex={1}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Camp Fees"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("fees", {
                        required: "Camp Fees is required",
                        min: {
                          value: 0,
                          message: "Camp Fees must be greater than 0",
                        },
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.fees?.message}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  {/* Camp Details */}
                  <Box flex={1}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Camp Details"
                      type="text"
                      multiline
                      rows={3}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("details", {
                        required: "Camp Details is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.details?.message}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  {/* Camp Venue */}
                  <Box flex={1}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Camp Venue"
                      type="text"
                      multiline
                      rows={3}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("venue", {
                        required: "Camp Venue is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.venue?.message}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  {/* Camp Services */}
                  <Box flex={1}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Camp Services"
                      type="text"
                      multiline
                      InputLabelProps={{
                        shrink: true,
                      }}
                      rows={3}
                      {...register("services", {
                        required: "Camp Services is required",
                      })}
                    />
                    <Typography
                      component={"p"}
                      color={"error"}
                      role="alert"
                      fontSize={"14px"}
                    >
                      {errors?.services?.message}
                    </Typography>
                  </Box>
                </Stack>
              </>
            )}
            <Box flex={1}>
              <SelectFormField
                control={control}
                name={"status"}
                label={"Status"}
                variant="outlined"
                options={[
                  { value: "publish", label: "Publish" },
                  { value: "complete", label: "Complete" },
                ]}
                required={true}
                readOnly={true}
              />
              <Typography
                component={"p"}
                color={"error"}
                role="alert"
                fontSize={"14px"}
              >
                {errors?.status?.message}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </AlertDialogSlide>
      <AlertDialogSlide {...deleteDialog} />
    </>
  );
};

export default ManageCamps;
