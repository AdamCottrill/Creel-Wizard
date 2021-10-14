import { api } from "../services/api";
import * as yup from "yup";

const PRJ_CD_REGEX = /^[A-Z0-9]{3}_[A-Z]{2}\d{2}_([A-Z]|\d){3}$/;

const LAKE_PREFIX_MAP = {
  SU: ["LSA"],
  HU: ["LHA", "LHR"],
  ER: ["LEA", "LEM"],
  ON: ["LOA", "LOR"],
  SC: ["LEA", "LEM"],
};

const minDate = new Date("1950-01-01");
const today = new Date();
const maxDate = new Date(
  today.getFullYear() + 1,
  today.getMonth(),
  today.getDate()
);

const FN011schema = yup.object().shape({
  prj_cd: yup
    .string()
    .required("Project Code is required")
    .matches(PRJ_CD_REGEX, { message: "Invalid Project Code" })
    .test(
      "prj_cd-exists",
      "That project code already exists.",
      async (value) => {
        try {
          const response = await api
            .get(`/fn011/${value.toLowerCase()}/`)
            .catch();
          return response.status !== 200;
        } catch (error) {
          return true;
        }
      }
    ),
  prj_nm: yup.string().required("Project name in require").min(15).max(60),
  prj_ldr: yup.string().required(),
  prj_date0: yup
    .date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Start date is required")
    .nullable()
    .min(
      minDate,
      `All new projects must start after ${minDate.toLocaleDateString()}`
    )
    .max(
      maxDate,
      `All new projects must start before ${maxDate.toLocaleDateString()}`
    )
    .test(
      "Start date is consistent with project code",
      "Start date is not consistent with year in project code.",
      (value, context) => {
        if (value) {
          const prj_cd = context.parent.prj_cd;
          const yr = value.getFullYear();
          if (prj_cd && yr) {
            return prj_cd.substr(6, 2) === yr.toString().substr(2, 2);
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    ),
  prj_date1: yup
    .date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("End date is required")
    .nullable()
    .min(yup.ref("prj_date0"), "Project end date can't be before start date.")

    .max(
      maxDate,
      `All new projects must end before ${maxDate.toLocaleDateString()}`
    )
    .test(
      "End date is consistent with project code",
      "End date is not consistent with year in project code.",
      (value, context) => {
        if (value) {
          const prj_cd = context.parent.prj_cd;
          const yr = value.getFullYear();
          if (prj_cd && yr) {
            return prj_cd.substr(6, 2) === yr.toString().substr(2, 2);
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    ),
  lake: yup
    .string()
    .required()
    .test(
      "lake-project-code-prefix",
      "Selected Lake is not consistent with project code.",
      (value, context) => {
        const prj_cd_prefix = context.parent.prj_cd;
        if (prj_cd_prefix && value) {
          const prefix = prj_cd_prefix.substr(0, 3);
          return LAKE_PREFIX_MAP[value].includes(prefix);
        } else {
          return true;
        }
      }
    ),
  protocol: yup.string().required(),
  comment0: yup.string().required("A Project Description is required."),
});

export default FN011schema;
