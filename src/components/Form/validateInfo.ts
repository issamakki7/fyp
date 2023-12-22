interface FormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNo: string;
  isAdmin: boolean;
}

interface FormErrors {
  fields?: string;
  password?: string;
  email?: string;
}

export default function validateInfo(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.username.trim() || !values.firstName.trim() || !values.lastName.trim()) {
    errors.fields = "All fields are required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  return errors;
}
