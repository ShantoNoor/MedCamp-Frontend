import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";
import { DateTimePicker } from "@mui/x-date-pickers";
import Spinner from "../components/Spinner";
import DataTable from "react-data-table-component";
import moment from "moment";
import { Button } from "@mui/material";
import useDialog from "../hooks/useDialog";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [update, setUpdate] = useState(null);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/registered-camps", `_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/registered-camps?_id=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { openDialog: openPaymentDialog, ...paymentDialog } = useDialog(
    async () => {
      const id = toast.loading("Please, wait ....");
      try {
        await axiosn.put("/update-payment", {
          _id: update._id,
          payment_status: "paid",
        });
        toast.dismiss(id);
        toast.success("Payment Successful");
        refetch();
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        toast.error("Unable to pay");
      }
    },
    "Are you sure you want to pay ?"
  );

  const { openDialog: openCancelDialog, ...cancelDialog } = useDialog(
    async () => {
      const id = toast.loading("Please, wait ....");
      try {
        await axiosn.delete(`/cancel-registrasion/${update._id}`);
        toast.dismiss(id);
        toast.success("Cancel Successful");
        refetch();
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        toast.error("Unable to cancel");
      }
    },
    "Are you sure you want to cancel ?"
  );

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.camp_name,
      sortable: true,
    },
    {
      name: "Camp Fees",
      selector: (row) => row.fees,
      sortable: true,
      width: "110px",
    },
    {
      name: "Scheduled Date and Time",
      width: "200px",
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
      selector: (row) => row.camp_venue,
    },
    {
      name: "Camp Fees",
      selector: (row) => row.fees,
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
      name: "Action",
      width: "180px",
      selector: (row) => (
        <>
          <Button
            disabled={row.payment_status === "paid"}
            variant="contained"
            size="small"
            onClick={() => {
              setUpdate(row);
              openPaymentDialog();
            }}
          >
            {row.payment_status === "unpaid" ? "Pay" : "Paid"}
          </Button>

          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            size="small"
            disabled={row.payment_status === "paid"}
            onClick={() => {
              setUpdate(row);
              openCancelDialog();
            }}
          >
            Cancel
          </Button>
        </>
      ),
    },
  ];

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <DataTable data={data} columns={columns} />
      <AlertDialogSlide {...paymentDialog} />
      <AlertDialogSlide {...cancelDialog} />
    </>
  );
};

export default RegisteredCamps;
