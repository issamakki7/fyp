import { useState, useEffect } from "react";
import axios from "axios";

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

type FormCallback = () => void;

const useForm = (
  callback: FormCallback,
  validate: (values: FormValues) => FormErrors,
) => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    isAdmin: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.username !== "" &&
      values.password !== "" &&
      values.email !== "" &&
      values.mobileNo !== ""
    ) {
      axios
      .post("https://localhost:7256/api/User/SignUp", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        mobileNo: values.mobileNo,
        isAdmin: values.isAdmin
      
      })
      .then(response => {
        setErrors(validate(values));
        setIsSubmitting(true);
        console.log(response)
        alert(response.data.response)
      
      })
      .catch(error =>{
        console.log(error)
        alert(error.response.data);
        setErrorPresent(true);
      
      })
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      isSubmitting &&
      errorPresent === false
    ) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
