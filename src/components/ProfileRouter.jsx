import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileRouter = () => {
  const { user } = useAuth();

  if (user.status === "organizer") {
    return <Navigate to="/dashboard/organizer-profile" replace={true} />;
  } else if (user.status === "professional") {
    return <Navigate to="/dashboard/professional-profile" replace={true} />;
  } else {
    return <Navigate to="/dashboard/participant-profile" replace={true} />;
  }
};

export default ProfileRouter;
