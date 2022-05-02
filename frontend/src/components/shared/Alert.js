import React from "react";

function Alert(props) {
  const { variation, child } = props;

  return (
    <div className={`alert alert-${variation}`} role="alert">
      {child}
    </div>
  );
}

export default Alert;
