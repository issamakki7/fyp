import React from "react";
import "./Form.css";
import checkmark from "../assets/images/checkmark.png";

const FormSuccess: React.FC = () => {
  return (
    <div className="form-content-right">
      {localStorage.getItem("registerError") === "false" ? (
        <div>
          <h1 className="form-success">We have received your request!</h1>
          <img className="form-img-2" src={checkmark} alt="success-image" />
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default FormSuccess;
