import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import DataTable from "react-data-table-component";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

const ManageCamps = () => {
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
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

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

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
          defaultValue={moment(row.date_and_time).utc()}
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
    },
    {
      name: "Healthcare Professionals in Attendance",
      selector: (row) => row.pros.join(", "),
    },
  ];

  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};

export default ManageCamps;
