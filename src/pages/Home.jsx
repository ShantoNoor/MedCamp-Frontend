import Box from "@mui/material/Box";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";
import { axiosn } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Slider from "../components/Slider";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import FeatureStats from "../components/FeatureStats";

const Home = () => {
  useTitle("Home");

  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["/home"],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/home`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Camp Image",
      selector: (row) => (
        <img height={"120px"} width={"120px"} src={row.photo} />
      ),
      width: "150px",
    },
    {
      name: "Scheduled Date and Time",
      selector: (row) => (
        <DateTimePicker
          slotProps={{
            textField: {
              variant: "standard",
            },
          }}
          defaultValue={moment(row.date_and_time)}
          readOnly={true}
        />
      ),
      width: "250px",
    },
    {
      name: "Venue Location",
      selector: (row) => row.venue,
      width: "250px",
    },
    {
      name: "Specialized Services Provided",
      selector: (row) => row.services,
      width: "250px",
    },
    {
      name: "Comprehensive Description",
      selector: (row) => row.details,
      width: "250px",
    },
    {
      name: "Target Audience",
      selector: (row) => row.target_audience,
      sortable: true,
      width: "250px",
    },
    {
      name: "Healthcare Professionals in Attendance",
      selector: (row) => row.pros.join(", "),
      width: "250px",
    },
    {
      name: "Participants Count",
      selector: (row) => row.count,
      sortable: true,
      width: "250px",
    },
  ];

  const columnsOrganizer = [
    {
      name: "Organizer Name",
      selector: (row) => row.organizerName,
      sortable: true,
    },
    {
      name: "Total Camp Organizered",
      selector: (row) => row.totalRegistrations,
      sortable: true,
    },
  ];

  const columnsParticipant = [
    {
      name: "Participant Name",
      selector: (row) => row.participantName,
      sortable: true,
    },
    {
      name: "Total Participants",
      selector: (row) => row.totalRegistrations,
      sortable: true,
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      <Slider imgList={data.imgs} />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4, mb: 1 }}>
        Popular Medical Camps
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={data.camps}
        columns={columns}
        fixedHeader
        subHeaderAlign="center"
      />
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/available-camps")}
        >
          See All Camps
        </Button>
      </Box>

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Testimonials
      </Typography>
      <Divider />
      <Grid container spacing={2} mt={1}>
        {data?.letest_reviews?.map((review, idx) => (
          <Grid item key={idx} sm={12} md={6} lg={4}>
            <ReviewCard data={review} />
          </Grid>
        ))}
      </Grid>

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Statistics
      </Typography>
      <Divider />
      <FeatureStats
        data={{
          tu: data.totalUsers,
          tc: data.totalCamps,
          tr: data.totalRegistrations,
        }}
      />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Top Organizer
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={data.topOrganizers}
        columns={columnsOrganizer}
        fixedHeader
        subHeaderAlign="center"
      />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Top Participant
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={data.topParticipants}
        columns={columnsParticipant}
        fixedHeader
        subHeaderAlign="center"
      />
    </Container>
  );
};

export default Home;
