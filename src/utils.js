// if value is a date-time, strip off the timestamp and time zone
// information
export const prepDate = (val) => {
  if (val instanceof Date) {
    val.setHours(0, 0, 0, 0);
    return val.toISOString().split("T")[0];
  } else {
    if (typeof val === "undefined") {
      return val;
    } else {
      return val.split("T")[0];
    }
  }
};

export const getDate = (val) => {
  if (val instanceof Date) {
    return val;
  } else {
    return new Date(val);
  }
};
