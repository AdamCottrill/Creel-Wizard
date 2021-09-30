import * as yup from "yup";

yup.addMethod(yup.array, "uniqueSpace", function (message) {
  return this.test("uniqueSpace", message, function (list) {
    const mapper = (x) => x.space;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn026.[${idx}].space`,
      message: message,
    });
  });
});

yup.addMethod(yup.array, "uniqueSpaceDes", function (message) {
  return this.test("uniqueSpace", message, function (list) {
    const mapper = (x) => x.space_des;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn026.[${idx}].space_des`,
      message: message,
    });
  });
});

const FN026schema = yup.object().shape({
  fn026: yup
    .array()
    .min(1, "At least 1 space must be provided")
    .of(
      yup.object().shape({
        space: yup.string().required("Space is required"),
        space_des: yup.string().required("Space Description is required"),
        dd_lon: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Longitude is required.")
          .test("longitude-range", (value, { options, createError, path }) => {
            const { minLon, maxLon } = options;
            const isValid = minLon <= value && value <= maxLon;
            if (!isValid) {
              const minF = minLon.toFixed(3);
              const maxF = maxLon.toFixed(3);
              const msg = `Longitude outside bounds of lake (${maxF}, ${minF})`;
              return createError({ path, message: msg });
            } else {
              return true;
            }
          }),

        dd_lat: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Latitude is required.")
          .test("latitude-range", (value, { options, createError, path }) => {
            const { minLat, maxLat } = options;
            const isValid = minLat <= value && value <= maxLat;
            if (!isValid) {
              const minF = minLat.toFixed(3);
              const maxF = maxLat.toFixed(3);
              const msg = `Latitude outside bounds of lake (${minF}, ${maxF})`;
              return createError({ path, message: msg });
            } else {
              return true;
            }
          }),
      })
    )
    .uniqueSpace("Space must be unique")
    .uniqueSpaceDes("Space Description must be unique"),
});

export default FN026schema;
