import * as yup from "yup";

yup.addMethod(yup.array, "uniqueGear", function (message) {
  return this.test("uniqueGear", message, function (list) {
    const mapper = (x) => x.gear;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `gear_array.[${idx}].gear`,
      message: message,
    });
  });
});

const GearSchema = yup.object().shape({
  gear_array: yup
    .array()
    .min(1, "At least 1 gear must be provided")
    .of(
      yup.object().shape({
        gear: yup.string().required("Please select a gear."),
        process_types: yup
          .array()
          .min(1, "At least 1 process type must be selected.")
          .of(
            yup.object().shape({
              process_type: yup.string().required(),
              label: yup.string().required(),
            })
          ),
      })
    )
    .uniqueGear("Each gear can only be selected once."),
});

export default GearSchema;
