import { Divider, Typography } from "@mui/material";
import MyProfile from "../components/MyProfile";
import { useEffect, useState } from "react";
import { axiosn } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const OrganizerProfile = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await axiosn.get(`/organizer-profile?_id=${user._id}`);
      setData(res.data);

      console.log(res.data);
    })();
  }, [user]);
  return (
    <>
      <MyProfile />
      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Organized Camps
      </Typography>
      <Divider />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Success Stories
      </Typography>
      <Divider />

      <Typography component={"h2"} variant="h3" sx={{ mt: 4 }}>
        Participant Feedback
      </Typography>
      <Divider />
    </>
  );
};

export default OrganizerProfile;
