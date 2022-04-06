import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./sSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const SellSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Request is generated Successfully Please Check Your Mail for more details </Typography>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default SellSuccess;
