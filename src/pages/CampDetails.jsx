import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import useDialog from "../hooks/useDialog";
import AlertDialogSlide from "../components/AlertDialogSlide";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectFormField from "../components/SelectFormField";
import { useEffect } from "react";

const CampDetails = () => {
  const { user } = useAuth();
  const { _id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["/camp-details", `_id=${_id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/camp-details/${_id}`);
        return res.data[0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({});

  useEffect(() => {
    if (data && user) {
      setValue("user_id", user._id);
      setValue("camp_id", data._id);
      setValue("organizer_id", data.organizer_id);

      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("age", user.age);
      setValue("gender", user.gender);
      setValue("address", user.address);

      setValue("camp_fees", data.fees);
      setValue("camp_name", data.name);
      setValue("camp_date_and_time", data.date_and_time);
      setValue("camp_venue", data.venue);
    }
  }, [data, user, setValue]);

  const { openDialog, handleClose, ...dialog } = useDialog(
    async () => {
      await handleSubmit(formSubmit)();
    },
    "Are you sure you want to Register?",
    false,
    true
  );

  const formSubmit = async (all_data) => {
    handleClose();
    const id = toast.loading("Please, wait ....");
    try {
      const res = await axiosn.post("/register", all_data);
      if (res.status === 201) {
        toast.dismiss(id);
        toast.success("Registration Successful");
      }
    } catch (err) {
      toast.dismiss(id);
      toast.error(err.response.data);
    }
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Box align="center">
          <img
            style={{ objectFit: "cover" }}
            width={"40%"}
            height={"40%"}
            src={data.photo}
          />
        </Box>
        <Box>
          <Typography variant="h3" component="h1">
            {data.name}
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          divider={<Divider color="black" orientation="vertical" flexItem />}
          spacing={1}
          my={2}
        >
          <Typography variant="h6" component="p">
            Date and Time:{" "}
            {moment(data.date_and_time).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography variant="h6" component="p">
            Fees: ${data.fees}
          </Typography>
          <Typography variant="h6" component="p">
            Venue: {data.venue}
          </Typography>
          <Typography variant="h6" component="p">
            Audience: {data.target_audience}
          </Typography>
          <Box>
            <Button
              disabled={user.status !== "participant"}
              variant="outlined"
              onClick={openDialog}
            >
              Join Camp
            </Button>
          </Box>
        </Stack>
        <Box mb={3}>
          <Typography variant="h6" component="p">
            Purpose
          </Typography>
          <Divider />
          <Typography variant="body1">{data.purpose}</Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="h6" component="p">
            Details
          </Typography>
          <Divider />
          <Typography variant="body1">{data.details}</Typography>
        </Box>
      </Container>

      <AlertDialogSlide {...dialog} handleClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Name"
                  autoFocus
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name shoud have at least 3 characters",
                    },
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
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  {...register("phone", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^\d{6,14}$/,
                      message: "Enter a valid phone number.",
                    },
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.phone?.message}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <SelectFormField
                    control={control}
                    name={"gender"}
                    label={"Gender"}
                    variant="outlined"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    required={true}
                  />
                  <Typography
                    component={"p"}
                    color={"error"}
                    role="alert"
                    fontSize={"14px"}
                  >
                    {errors?.gender?.message}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number" // Assuming age is a number
                    {...register("age", {
                      required: "Age is required",
                      min: {
                        value: 18,
                        message: "You must be at least 18 years old",
                      },
                      max: {
                        value: 120,
                        message: "Age cannot exceed 120 years",
                      },
                    })}
                  />
                  <Typography
                    component={"p"}
                    color={"error"}
                    role="alert"
                    fontSize={"14px"}
                  >
                    {errors?.age?.message}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Box flex={1}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={4} // Adjust the number of rows as needed
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address should have at least 5 characters",
                  },
                })}
              />
              <Typography
                component={"p"}
                color={"error"}
                role="alert"
                fontSize={"14px"}
              >
                {errors?.address?.message}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Camp Fees"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ readOnly: true }}
                  {...register("camp_fees", {
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
                  {errors?.camp_fees?.message}
                </Typography>
              </Box>
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  type="tel"
                  {...register("emergency_contact", {
                    required: "Emergency Contact is required",
                    pattern: {
                      value: /^\d{6,14}$/,
                      message: "Enter a valid emergency contact.",
                    },
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.emergency_contact?.message}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Weight"
                  type="number"
                  {...register("weight", {
                    required: "Weight is required",
                    min: {
                      value: 0,
                      message: "Your weight must be at least 0",
                    },
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.weight?.message}
                </Typography>
              </Box>
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Height"
                  type="number"
                  {...register("height", {
                    required: "Height is required",
                    min: {
                      value: 0,
                      message: "Your height must be at least 0",
                    },
                  })}
                />
                <Typography
                  component={"p"}
                  color={"error"}
                  role="alert"
                  fontSize={"14px"}
                >
                  {errors?.height?.message}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </AlertDialogSlide>
    </>
  );
};

export default CampDetails;
