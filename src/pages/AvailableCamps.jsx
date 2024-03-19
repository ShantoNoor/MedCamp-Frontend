import { DateTimePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import DataTable from "react-data-table-component";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AvailableCamps = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["/available-camps"],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/available-camps`);
        setFilteredData(res.data);
        return res.data;
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
      sortable: true,
    },
    {
      name: "Healthcare Professionals in Attendance",
      selector: (row) => row.pros.join(", "),
    },
    {
      name: "Participants Count",
      selector: (row) => row.count,
      sortable: true,
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
