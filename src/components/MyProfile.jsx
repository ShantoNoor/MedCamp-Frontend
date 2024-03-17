import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import SelectFormField from "./SelectFormField";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { axiosn } from "../hooks/useAxios";
import axios from "axios";
import useDialog from "../hooks/useDialog";
import AlertDialogSlide from "./AlertDialogSlide";
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

const user_options = [
  { value: "participant", label: "Participant" },
  { value: "organizer", label: "Organizer" },
  {
    value: "professional",
    label: "Healthcare Professional",
  },
];

const MyProfile = () => {
  const { user, updateProfile, setUser } = useAuth();
  const { openDialog, ...dialog } = useDialog(async () => {
    await handleSubmit(formSubmit)();
  }, "Are you sure you want to update?");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

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

  const formSubmit = async (data) => {
    const { photo, ...rest } = data;
    let photoUrl = user.photo ? user.photo : "";
    if (photo.length) {
      photoUrl = await uploadPhoto(photo[0]);
    }
    rest.photo = photoUrl;
    rest._id = user._id;

    try {
      await Promise.all([
        await updateProfile(rest.name, rest.photo),
        axiosn.put(`/users`, rest),
      ]);

      setUser({ ...rest });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("status", user.status);
    setValue("age", user.age);
    setValue("gender", user.gender);
    setValue("address", user.address);
    setValue("preferences", user.preferences);
  }, [user, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{ mt: 1, width: "100%" }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box flex={1}>
            <TextField
              variant="standard"
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
              label="Age"
              variant="standard"
              InputProps={{ readOnly: true }}
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

        <Box>
          <TextField
            variant="standard"
            fullWidth
            label="Email Address"
            autoComplete="email"
            InputProps={{ readOnly: true }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                message: "Enter a valid email.",
              },
            })}
          />
          <Typography
            component={"p"}
            color={"error"}
            role="alert"
            fontSize={"14px"}
          >
            {errors?.email?.message}
          </Typography>
        </Box>

        <Box>
          <TextField
            variant="standard"
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

        <Stack direction="row" spacing={2}>
          <Box flex={1}>
            <SelectFormField
              control={control}
              name={"gender"}
              label={"Gender"}
              variant="standard"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
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
              {errors?.gender?.message}
            </Typography>
          </Box>
          <Box flex={1}>
            <SelectFormField
              control={control}
              name={"status"}
              label={"Profile Type"}
              options={user_options}
              readOnly={true}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
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

          <Box flex={1}>
            <TextField
              fullWidth
              label="Preferences"
              multiline
              rows={4} // Adjust the number of rows as needed
              {...register("preferences")}
            />
            <Typography
              component={"p"}
              color={"error"}
              role="alert"
              fontSize={"14px"}
            >
              {errors?.preferences?.message}
            </Typography>
          </Box>
        </Stack>

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload Profile Picture
          <VisuallyHiddenInput type="file" {...register("photo")} />
        </Button>

        <Button onClick={openDialog} fullWidth variant="contained">
          Update
        </Button>
      </Stack>

      <AlertDialogSlide {...dialog} />
    </Box>
  );
};

export default MyProfile;
