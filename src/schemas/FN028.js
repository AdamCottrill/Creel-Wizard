import * as yup from "yup";

yup.addMethod(yup.array, "uniqueMode", function (message) {
  return this.test("uniqueMode", message, function (list) {
    const mapper = (x) => x.mode;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn028.[${idx}].mode`,
      message: message,
    });
  });
});

yup.addMethod(yup.array, "uniqueModeDes", function (message) {
  return this.test("uniqueMode", message, function (list) {
    const mapper = (x) => x.mode_des;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn028.[${idx}].mode_des`,
      message: message,
    });
  });
});

// TODO - refactor these three functions into a single function that
// takes field name as an argument
yup.addMethod(yup.array, "uniqueModeKeyGear", function (message) {
  return this.test("uniqueModeKeyGear", message, function (list) {
    const mapper = (x) => `${x.gear}-${x.orient}-${x.set_type}`;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn028.[${idx}].gear`,
      message: message,
    });
  });
});

yup.addMethod(yup.array, "uniqueModeKeyOrient", function (message) {
  return this.test("uniqueModeKey", message, function (list) {
    const mapper = (x) => `${x.gear}-${x.orient}-${x.set_type}`;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn028.[${idx}].orient`,
      message: message,
    });
  });
});

yup.addMethod(yup.array, "uniqueModeKeySetType", function (message) {
  return this.test("uniqueModeKey", message, function (list) {
    const mapper = (x) => `${x.gear}-${x.orient}-${x.set_type}`;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `fn028.[${idx}].set_type`,
      message: message,
    });
  });
});

const FN028schema = yup.object().shape({
  fn028: yup
    .array()
    .min(1, "At least 1 mode must be provided")
    .of(
      yup.object().shape({
        mode: yup.string().required("Mode is required"),
        mode_des: yup.string().required("Mode Description is required"),
        gear: yup.string().required("Gear is required"),
        orient: yup.string().required("Orient is required"),
        set_type: yup.string().required("Set Type is required"),
      })
    )
    .uniqueMode("Mode must be unique")
    .uniqueModeDes("Mode Description must be unique")
    .uniqueModeKeyGear("Combinations of Gear-Orient-SetType must be unique")
    .uniqueModeKeyOrient("Combinations of Gear-Orient-SetType must be unique")
    .uniqueModeKeySetType("Combinations of Gear-Orient-SetType must be unique"),
});

export default FN028schema;
