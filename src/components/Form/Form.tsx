import React, { useState } from "react";
import "./Form.css";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import FormImg from "../../assets/images/logo.png";
import checkmark from "../../assets/images/checkmark.png";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="form-container">
      <div className="form-content-left">
        <img className="form-img" src={FormImg} alt="spaceship" />
      </div>
      {isSubmitted == false ? (
        <FormSignup submitForm={submitForm} />
      ) : (
        <div className="form-content-right">
          <div>
            <h1 className="form-success">We have received your request!</h1>
            <img className="form-img-2" src={checkmark} alt="success-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
