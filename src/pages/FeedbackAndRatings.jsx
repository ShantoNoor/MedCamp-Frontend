import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";
import useTitle from "../hooks/useTitle";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import useDialog from "../hooks/useDialog";
import { useEffect, useState } from "react";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import toast from "react-hot-toast";
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

const FeedbackAndRatings = () => {
  useTitle("Feedback And Ratings");
  const { user } = useAuth();

  const [update, setUpdate] = useState(null);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: [
      "/registrations",
      `user_id=${user._id}`,
      `payment_status=paid`,
      `confirmation_status=confirmed`,
    ],
    queryFn: async () => {
      try {
        const res = await axiosn.get(
          `/registrations?user_id=${user._id}&payment_status=paid&confirmation_status=confirmed`
        );
        return res.data.filter((item) => item.camp_status === "complete");
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { register, handleSubmit, setValue, control } = useForm({});

  useEffect(() => {
    if (update) {
      setValue("_id", update._id);
      setValue("review", update.review);
      setValue("rating", update.rating);
    }
  }, [update, setValue]);

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
      const { photos, ...data } = all_data;

      if (photos.length) {
        let review_photos = "";
        for (let i = 0; i < photos.length; ++i) {
          review_photos += await uploadPhoto(photos[i]);
          if (i !== photos.length - 1) review_photos += "|";
        }
        data.review_photos = review_photos;
      }

      await axiosn.put("/registrations", data);
      toast.dismiss(id);
      toast.success("Review Update Successful");
      refetch();
    } catch (err) {
      console.error(err);
      toast.dismiss(id);
      toast.error("Unable to update review");
    }
  };

  const { openDialog, ...dialog } = useDialog(async () => {
    handleSubmit(formSubmit)();
  }, "Leave a Review");

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.camp_name,
      sortable: true,
    },
    {
      name: "Camp Fees",
      selector: (row) => row.camp_fees,
      sortable: true,
      width: "110px",
    },
    {
      name: "Scheduled Date and Time",
      width: "190px",
      selector: (row) => (
        <DateTimePicker
          slotProps={{
            textField: {
              variant: "standard",
              readOnly: true,
            },
          }}
          defaultValue={moment(row.camp_date_and_time)}
          readOnly={true}
        />
      ),
    },
    {
      name: "Venue Location",
      selector: (row) => row.camp_venue,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status.toUpperCase(),
    },
    {
      name: "Confirmation Status",
      selector: (row) => row.confirmation_status.toUpperCase(),
    },
    {
      name: "Camp Status",
      selector: (row) => row.camp_status.toUpperCase(),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setUpdate(row);
              openDialog();
            }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <DataTable highlightOnHover pagination data={data} columns={columns} />
      <AlertDialogSlide {...dialog}>
        <Box
          component="form"
          onSubmit={handleSubmit(formSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack direction={{ xs: "column", md: "column" }} spacing={2}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Pictures
              <VisuallyHiddenInput
                type="file"
                multiple
                {...register("photos")}
              />
            </Button>
            <Box textAlign={"center"} pt={2} flex={1}>
              <Controller
                name="rating"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Rating
                      value={field.value}
                      size="large"
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                )}
              />
              <Divider sx={{ borderColor: "gray" }} />
            </Box>
            <Box flex={1}>
              <TextField
                id="standard-multiline-static"
                label="Review"
                multiline
                fullWidth
                rows={3}
                variant="standard"
                {...register("review")}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Stack>
        </Box>
      </AlertDialogSlide>
    </>
  );
};

export default FeedbackAndRatings;
