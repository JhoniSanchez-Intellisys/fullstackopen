export const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type == "e") {
    return <div className="error">{message}</div>;
  }
  return <div className="notification">{message}</div>;
};
