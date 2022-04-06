import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
// import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const BookDetail = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography> We Are Currently Working On This</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default BookDetail;

