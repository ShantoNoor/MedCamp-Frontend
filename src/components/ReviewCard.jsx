import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { Stack } from "@mui/material";

export default function ReviewCard({ data }) {
  console.log(data);
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} alt={data.name} src={data.name} />
        }
        action={
          <Stack
            direction={"row"}
            spacing={0.5}
            justifyContent="center"
            alignContent="center"
          >
            <StarIcon color="warning" />
            <Typography component="span" variant="body1" fontSize={"18px"}>
              {data.rating}
            </Typography>
          </Stack>
        }
        title={data.name}
        subheader={moment(data.updatedAt).format("MMMM DD, YYYY")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.review}
        </Typography>
      </CardContent>
    </Card>
  );
}
