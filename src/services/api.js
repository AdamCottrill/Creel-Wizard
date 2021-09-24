import axios from "axios";

let api;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  api = axios.create({
    baseURL: "/fn_portal/api/v1",
  });
} else {
  api = axios.create({
    baseURL: "/fn_portal/api/v1",
  });
}

export const getProjectLeads = async () => {
  const response = await api.get("/prj_ldr");
  const data = response.data;
  return data.map((x) => {
    return { value: x.username, label: `${x.first_name} ${x.last_name}` };
  });
};

export const getProtocols = async () => {
  const response = await api.get("/protocols");
  const data = response.data;
  return data.map((x) => {
    return { value: x.abbrev, label: `${x.label} (${x.abbrev})` };
  });
};

// get our gears and group the process types down to unique values the
// response contains one element for each effort - we just need to
// know how many unique process types there are for each gear:
export const getGears = async () => {
  const response = await api.get("/gear");
  const data = response.data;
  return data.map((x) => {
    // first get the unique set of process types
    const ptypes = [...new Set(x.process_types.map((s) => s.process_type))];
    // match them up with a label:
    const process_types = ptypes.map((y) => {
      return {
        process_type: y,
        label: x.process_types.find((s) => s.process_type === y).label,
      };
    });
    const label = `${x.gr_code} - ${x.gr_label}`;
    return { value: x.gr_code, label: label, process_types: process_types };
  });
};

export const getLakes = async () => {
  const response = await api.get("/lakes");
  const data = response.data;
  return data.map((x) => {
    return {
      value: x.abbrev,
      label: `${x.lake_name} (${x.abbrev})`,
      extent: x.extent,
    };
  });
};
