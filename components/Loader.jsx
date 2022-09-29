import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = ({ message }) => {
  return (
    <div className="loader-info">
      <p className="loading pacifico">Loading</p>
      <div className="loader-div">
        <CgSpinner className="loader" />
      </div>
      {message && <p className="loading">{message}</p>}
    </div>
  );
};

export default Loader;
