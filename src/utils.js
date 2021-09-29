// if value is a date-time, strip off the timestamp and time zone
// information
export const prepDate = (val) => {
  if (val instanceof Date) {
    return val.toISOString().split("T")[0];
  } else {
    return val.split("T")[0];
  }
};
