import React from "react";

import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");

const CSRFToken = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return <></>;
  } else {
    return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
  }
};
export default CSRFToken;
