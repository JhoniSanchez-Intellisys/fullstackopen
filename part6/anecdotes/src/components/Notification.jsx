import React from "react";

const stile = {
  color: "green",
  backround: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};
export const Notification = ({ mensage }) => {
  if (mensage === null) {
    return null;
  }

  return (
    <div className="notification" style={stile}>
      {mensage}
    </div>
  );
};
