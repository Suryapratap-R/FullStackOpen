import { useSelector } from 'react-redux';
import React from 'react';

const NotificationBanner = () => {
  const notification = useSelector((notification) => notification);
    const color = notification.isError ? "Crimson" : "green";
  return notification.message !== null ? (
    <div
      style={{
        border: `4px solid ${color}`,
        borderRadius: "8px",
        padding: "10px",
        maxWidth: "700px",
        margin: "18px 0",
        color: color,
        backgroundColor: "WhiteSmoke",
      }}
    >
      {notification.message}       
    </div>
  ) : null;
};

export default NotificationBanner;
