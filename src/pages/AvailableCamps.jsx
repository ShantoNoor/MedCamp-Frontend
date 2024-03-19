import { DateTimePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import DataTable from "react-data-table-component";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import isPast from "../utils/isPast";

const AvailableCamps = () => {
  useTitle("Available Camps");

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["/available-camps"],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/available-camps`);
        const fd = res.data.filter((d) => !isPast(d.date_and_time));
        setFilteredData(fd);
        return fd;
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    setFilteredData(
      data?.filter((item) =>
        item.name.toLowerCase().match(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

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
    {
      name: "Acion",
      selector: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/camp-details/${row._id}`)}
        >
          Join Camp
        </Button>
      ),
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <DataTable
        highlightOnHover
        pagination
        data={filteredData}
        columns={columns}
        fixedHeader
        subHeader={true}
        subHeaderComponent={
          <Input
            sx={{ width: "300px", mt: 2 }}
            type="search"
            placeholder="Search here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        }
        subHeaderAlign="center"
      />
    </>
  );
};

export default AvailableCamps;
