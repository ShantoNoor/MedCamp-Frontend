import MyProfile from "../components/MyProfile";
import useTitle from "../hooks/useTitle";

const ParticipantProfile = () => {
  useTitle('Participant Profile')
  return (
    <>
      <MyProfile/>
    </>
  );
};

export default ParticipantProfile;
