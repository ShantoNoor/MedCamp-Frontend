import Box from "@mui/material/Box";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";
import { axiosn } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Slider from "../components/Slider";
import { Button, Container, Divider, Grid, Input, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

const Home = () => {
  useTitle("Home");

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["/home"],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/home`);
        setFilteredData(res.data.camps);
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

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      <Slider imgList={data.imgs} />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Popular Medical Camps
      </Typography>
      <Divider />
      <DataTable
        highlightOnHover
        pagination
        data={filteredData}
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
        {data.review_data?.map((review, idx) => (
          <Grid item key={idx} sm={12} md={6} lg={4}>
            <ReviewCard data={review} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default Home;
