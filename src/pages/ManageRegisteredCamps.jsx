import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import { axiosn } from "../hooks/useAxios";
import moment from "moment";
import DataTable from "react-data-table-component";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import useDialog from "../hooks/useDialog";
import toast from "react-hot-toast";
import { useState } from "react";
import AlertDialogSlide from "../components/AlertDialogSlide";
import isPast from "../utils/isPast";
import useTitle from "../hooks/useTitle";

const ManageRegisteredCamps = () => {
  useTitle("Manage Registered Camps");
  const { user } = useAuth();
  const [update, setUpdate] = useState(null);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["/registrations", `organizer_id=${user._id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/registrations?organizer_id=${user._id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { openDialog, ...dialog } = useDialog(async () => {
    const id = toast.loading("Updating, wait ....");
    try {
      const reqBody = {
        _id: update._id,
        confirmation_status: "confirmed",
      };

      await axiosn.put("/registrations", reqBody);
      toast.dismiss(id);
      toast.success("Update Successful");
      refetch();
    } catch (err) {
      console.error(err);
      toast.dismiss(id);
      toast.error("Unable to update");
    }
  }, "Are you sure you want to confirm?");

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
    {
      name: "Payment Status",
      selector: (row) => row.payment_status.toUpperCase(),
    },
    {
      name: "Confirmation Status",
      width: "150px",
      selector: (row) => (
        <>
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            size="small"
            disabled={
              row.confirmation_status === "confirmed" ||
              row.payment_status === "unpaid" ||
              isPast(row.camp_date_and_time)
            }
            onClick={() => {
              setUpdate(row);
              openDialog();
            }}
          >
            {row.confirmation_status.toUpperCase()}
          </Button>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Button
            variant="contained"
            size="small"
            disabled={
              row.payment_status === "unpaid" || isPast(row.camp_date_and_time)
            }
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
      <DataTable highlightOnHover pagination data={data} columns={columns} />
      <AlertDialogSlide {...dialog} />
      <AlertDialogSlide {...cancelDialog} />
    </>
  );
};

export default ManageRegisteredCamps;
