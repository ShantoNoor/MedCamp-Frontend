import MyProfile from "../components/MyProfile";
import useTitle from "../hooks/useTitle";

const ProfessionalProfile = () => {
  useTitle("ProfessionalProfile");
  return (
    <>
      <MyProfile />
    </>
  );
};

export default ProfessionalProfile;
