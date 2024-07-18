import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(50, "First Name must be less than 50 characters")
    .matches(/^[A-Za-z]+$/, "First Name cannot contain numbers"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(50, "Last Name must be less than 50 characters")
    .matches(/^[A-Za-z]+$/, "First Name cannot contain numbers"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than 100"),
  gender: Yup.string().required("Gender is required"),
  status: Yup.string().required("Status is required"),
  roleName: Yup.string().required("Role is required"),
});
