import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const ManageRegisteredCamps = () => {
  const { user } = useAuth();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/manage-registered-camps", `_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/manage-camps?_id=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  // const columns = [
  //   {
  //     name: "Camp Name",
  //     selector: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Camp Fees",
  //     selector: (row) => row.fees,
  //     sortable: true,
  //     width: "110px",
  //   },
  //   {
  //     name: "Scheduled Date and Time",
  //     selector: (row) => (
  //       <DateTimePicker
  //         slotProps={{
  //           textField: {
  //             variant: "standard",
  //             readOnly: true,
  //           },
  //         }}
  //         defaultValue={moment(row.date_and_time).utc()}
  //         readOnly={true}
  //       />
  //     ),
  //   },
  //   {
  //     name: "Camp Status",
  //     selector: (row) => row.status.toUpperCase(),
  //     width: "130px",
  //   },
  //   {
  //     name: "Venue Location",
  //     selector: (row) => row.venue,
  //   },
  //   {
  //     name: "Specialized Services Provided",
  //     selector: (row) => row.services,
  //   },
  //   {
  //     name: "Comprehensive Description",
  //     selector: (row) => row.details.slice(0, 80),
  //   },
  //   {
  //     name: "Target Audience",
  //     selector: (row) => row.target_audience,
  //   },
  //   {
  //     name: "Healthcare Professionals in Attendance",
  //     selector: (row) => row.pros.join(", "),
  //   },

  //   {
  //     name: "Action",
  //     selector: (row) => (
  //       <>
  //         <Button
  //           variant="contained"
  //           size="small"
  //           onClick={() => {
  //             setUpdate(row);
  //             openDialog();
  //           }}
  //         >
  //           Update
  //         </Button>

  //         <Button
  //           sx={{ ml: 1 }}
  //           variant="outlined"
  //           size="small"
  //           onClick={() => {
  //             setUpdate(row);
  //             openDeleteDialog();
  //           }}
  //         >
  //           Delete
  //         </Button>
  //       </>
  //     ),
  //   },
  // ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <div>ManageRegisteredCamps</div>
    </>
  );
};

export default ManageRegisteredCamps;
