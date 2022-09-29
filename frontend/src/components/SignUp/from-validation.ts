import * as yup from "yup";
export const signUpFormSchema = yup.object().shape(
  {
    username: yup.string().min(3).max(20).required("Username is required"),
    password: yup.string().min(8).max(64).required("Password is required"),
    "confirm password": yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    "first name": yup.string().when("first name", (value) => {
      if (value) {
        if (value.length > 0) {
          return yup.string().max(20).min(3).required("Required");
        } else {
          return yup.string().notRequired();
        }
      } else {
        return yup.string().notRequired();
      }
    }),
    "last name": yup.string().when("last name", (value) => {
      if (value) {
        if (value.length > 0) {
          return yup.string().max(20).min(3).required("Required");
        } else {
          return yup.string().notRequired();
        }
      } else {
        return yup.string().notRequired();
      }
    }),
  },
  [
    ["first name", "first name"],
    ["last name", "last name"],
  ]
);
