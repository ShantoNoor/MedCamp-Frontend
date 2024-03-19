import moment from "moment";

const isPast = (date_and_time) => {
  return moment(new Date()) > moment(date_and_time);
};

export default isPast;
