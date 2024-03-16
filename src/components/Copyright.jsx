import Typography from "@mui/material/Typography";
import Link from "./Link";

function Copyright(props) {
  return (
    <Typography variant="body2" color="gray" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        MedCamp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
