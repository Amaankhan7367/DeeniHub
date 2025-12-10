import React from "react";
import "./Container.css";

function Container({ children }) {
  return <div className="deeni-container">{children}</div>;
}

export default Container;