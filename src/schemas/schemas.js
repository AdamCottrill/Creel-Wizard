import * as yup from "yup";

const PRJ_CD_REGEX = /^[A-Z0-9]{3}_[A-Z]{2}\d{2}_([A-Z]|\d){3}$/;

export const FN011schema = yup.object().shape({
  prj_cd: yup
    .string()
    .required("Project Code is required")
    .matches(PRJ_CD_REGEX, { message: "Invalid Project Code" }),
  prj_nm: yup.string().required("Project name in require").min(15).max(60),
  prj_ldr: yup.string().required("Project lead is required"),
  prj_date0: yup.string().required("Start date is required"),
  prj_date1: yup
    .string()
    .required("End date is required")
    .min(yup.ref("prj_date0"), "Project end can't be before start date."),
  lake: yup.string().required(),
  protocol: yup.string().required(),
  comment0: yup.string().required("A Project Description is required."),
});
