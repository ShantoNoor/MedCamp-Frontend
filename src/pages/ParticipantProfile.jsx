import { Divider, Typography } from "@mui/material";
import MyProfile from "../components/MyProfile";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";

const ParticipantProfile = () => {
  useTitle("Participant Profile");

  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
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
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <MyProfile />
      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Attended Camps
      </Typography>
      <Divider />
      <DataTable highlightOnHover pagination data={data} columns={columns} />
    </>
  );
};

export default ParticipantProfile;
