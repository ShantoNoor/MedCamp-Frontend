import { Divider, Grid, Typography } from "@mui/material";
import MyProfile from "../components/MyProfile";
import { useState } from "react";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";
import ReviewCard from "../components/ReviewCard";

const OrganizerProfile = () => {
  useTitle("Organizer Profile");

  const { user } = useAuth();

  const [publishCamps, updatePublishCamps] = useState([]);
  const [completeCamps, updateCompleteCamps] = useState([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["/manage-camps", `organizer_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/manage-camps?organizer_id=${user._id}`);
        updatePublishCamps(
          res.data.filter((item) => item.status !== "complete")
        );
        updateCompleteCamps(
          res.data.filter((item) => item.status === "complete")
        );
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { data: review_data } = useQuery({
    queryKey: ["/registrations", `organizer_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(
          `/registrations?organizer_id=${user._id}&confirmation_status=confirmed`
        );
        return res.data.filter(
          (item) => item.camp_status === "complete" && item.rating !== 0
        );
      } catch (err) {
        console.error(err);
      }
    },
  });

  review_data?.sort((a, b) => {
    const dateA = moment(a.camp_date_and_time);
    const dateB = moment(b.camp_date_and_time);
    return dateB - dateA;
  });

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.name,
      sortable: true,
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
      name: "Target Audience",
      selector: (row) => row.target_audience,
    },
    {
      name: "Healthcare Professionals in Attendance",
      selector: (row) => row.pros.join(", "),
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <MyProfile />
      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Organized Camps
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={publishCamps}
        columns={columns}
      />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Success Stories
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={completeCamps}
        columns={columns}
      />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Participant Feedback
      </Typography>
      <Divider />
      {review_data?.length !== 0 ? (
        <Grid container spacing={2} mt={1}>
          {review_data?.map((review, idx) => (
            <Grid item key={idx} sm={12} md={6} lg={4}>
              <ReviewCard data={review} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No review data found</Typography>
      )}
    </>
  );
};

export default OrganizerProfile;
