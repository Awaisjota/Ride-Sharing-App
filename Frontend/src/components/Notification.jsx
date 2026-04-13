import React from "react";
import Button from "./Button";

const Notification = ({ notification, onAccept, onReject }) => {
  return (
    <div className="bg-white border shadow-md rounded-xl p-4 flex justify-between items-center mb-3">

      {/* Text */}
      <p className="text-gray-700">
        <span className="font-semibold">
          {notification.user}
        </span>{" "}
        joined your ride
      </p>

      {/* Actions */}
      <div className="flex gap-2">

        <Button
          onClick={() => onAccept(notification.id)}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
        >
          Accept
        </Button>

        <Button
          onClick={() => onReject(notification.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Reject
        </Button>

      </div>

    </div>
  );
};

export default Notification;