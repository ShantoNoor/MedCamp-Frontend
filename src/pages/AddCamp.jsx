import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

// import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { axiosn } from "../hooks/useAxios";
import toast from "react-hot-toast";
import moment from "moment";
import useTitle from "../hooks/useTitle";
import styled from "@emotion/styled";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SelectFormField from "../components/SelectFormField";
import axios from "axios";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddCamp = () => {
  useTitle("Add Camp");
  const { user } = useAuth();
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosn.get("/professionals");
        const options = res.data.map((item) => {
          return { label: item.name, value: item._id };
        });
        setProfessionals(options);
        if (res.status === 200) {
          toast.success("Professionals list Successfully Acquired");
        }
      } catch (err) {
        toast.error("Unable to get Professionals list");
        console.error(err);
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      organizer_id: user._id,
      date_and_time: moment(Date.now()).utc(),
    },
  });

  // console.log(moment(Date.now()).format("DD-MM-YY hh-mm-ss"));

  const uploadPhoto = (photo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", photo);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_apiKey_imagebb
          }`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            const photoUrl = response.data.data.url;
            return resolve(photoUrl);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          return reject(error);
        });
    });
  };

  const formSubmit = async (all_data) => {
    const id = toast.loading("Please, wait ....");
    try {
      const { photo, ...data } = all_data;

      let photoUrl = "";
      if (photo.length) {
        photoUrl = await uploadPhoto(photo[0]);
      }
      data.photo = photoUrl;

      const res = await axiosn.post("/add-camp", data);
      if (res.status === 201) {
        toast.dismiss(id);
        toast.success("Camp Added Successfully");
        reset();
      }
    } catch (err) {
      toast.dismiss(id);
      toast.error("Unable to Add Camp");
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* Camp Name */}
          <Box flex={1}>
            <TextField
              variant="standard"
              fullWidth
              label="Camp Name"
              autoFocus
              type="text"
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
          <Box flex={2}>
            <TextField
              variant="standard"
              fullWidth
              label="Camp Purpose"
              {...register("purpose", {
                required: "Camp Purpose is required",
              })}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.purpose?.message}
            </Typography>
          </Box>

          <Box flex={1}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Picture about Camp
              <VisuallyHiddenInput
                type="file"
                {...register("photo", {
                  required: "Photo is required",
                })}
              />
            </Button>
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.photo?.message}
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
              rows={4}
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
              rows={4}
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
              rows={4}
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

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flex={1}>
            <Controller
              name="date_and_time"
              control={control}
              defaultValue={null}
              rules={{
                required: "Camp Date and Time is required",
              }}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      helperText: "MM/DD/YYYY",
                    },
                  }}
                  label="Camp Date and Time"
                  render={(params) => <TextField {...params} />}
                  disablePast={true}
                />
              )}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.date_and_time?.message}
            </Typography>
          </Box>
        </Stack>

        <Box flex={1}>
          <SelectFormField
            control={control}
            name={"professionals"}
            label={"Professionals"}
            variant="outlined"
            options={professionals}
            required={true}
            multiple={true}
            defaultValue={[]}
          />
          <Typography
            component={"p"}
            color={"error"}
            role="alert"
            fontSize={"14px"}
          >
            {errors?.professionals?.message}
          </Typography>
        </Box>
      </Stack>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Camp
      </Button>
    </Box>
  );
};

export default AddCamp;
