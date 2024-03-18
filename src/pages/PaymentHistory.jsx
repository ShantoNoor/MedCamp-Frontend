import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";

const PaymentHistory = () => {
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: ["/registrations", `user_id=${user._id}`, `payment_status=paid`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(
          `/registrations?user_id=${user._id}&payment_status=paid`
        );
        return res.data;
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
          defaultValue={moment(row.camp_date_and_time).utc()}
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
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
};

export default PaymentHistory;
