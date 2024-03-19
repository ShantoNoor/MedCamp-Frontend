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
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import isPast from "../utils/isPast";
const stripePromise = loadStripe(import.meta.env.VITE_apiKey_stripe);

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [update, setUpdate] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [gettingIntent, setGettingIntent] = useState(false);
  const payRef = useRef(null);

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

  const {
    openDialog: openPaymentDialog,
    handleClose: payClose,
    ...paymentDialog
  } = useDialog(
    async () => {
      payRef.current.querySelector('button[type="submit"]').click();
    },
    "Are you sure you want to pay ?",
    false
  );

  const { openDialog: openCancelDialog, ...cancelDialog } = useDialog(
    async () => {
      const id = toast.loading("Please, wait ....");
      try {
        await axiosn.delete(`/registrations/${update._id}`);
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
      selector: (row) => row.camp_fees,
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
          defaultValue={moment(row.camp_date_and_time)}
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

    {
      name: "Action",
      width: "180px",
      selector: (row) => (
        <>
          <Button
            disabled={row.payment_status === "paid" || isPast(row.camp_date_and_time)}
            variant="contained"
            size="small"
            onClick={async () => {
              setGettingIntent(true);
              setUpdate(row);
              openPaymentDialog();

              const res = await axiosn.post("/create-payment-intent", {
                fees: row.camp_fees,
              });
              setClientSecret(res.data.clientSecret);
              setGettingIntent(false);
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
      <AlertDialogSlide {...cancelDialog} />
      <AlertDialogSlide {...paymentDialog} handleClose={payClose}>
        {gettingIntent === false && clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <CheckoutForm
              payRef={payRef}
              payClose={payClose}
              update={update}
              refetch={refetch}
            />
          </Elements>
        ) : (
          <Spinner />
        )}
      </AlertDialogSlide>
    </>
  );
};

export default RegisteredCamps;
