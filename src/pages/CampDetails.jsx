import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosn } from "../hooks/useAxios";
import Spinner from "../components/Spinner";

const CampDetails = () => {
  const { _id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["/camp-details", `_id=${_id}`],
    queryFn: async () => {
      try {
        const res = await axiosn.get(`/camp-details/${_id}`);
        return res.data[0];
      } catch (err) {
        console.error(err);
      }
    },
  });

  console.log(data);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div>CampDetails</div>
    </>
  );
};

export default CampDetails;
