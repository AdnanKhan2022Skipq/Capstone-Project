import React from "react";

export const Alert = ({ alert }) => {
  return (
    alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      <strong>{alert.message}</strong>
    </div>
  );
};
