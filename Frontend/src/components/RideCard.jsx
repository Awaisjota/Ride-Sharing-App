import React from "react";
import { Link } from "react-router-dom";

const RideCard = ({ ride, type }) => {
  const passengers = ride.passengers || [];

  const seatsLeft =
    (ride.availableSeats || 0) - passengers.length;

  const isFull = seatsLeft <= 0;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition w-full">

      {/* TYPE */}
      {type === "joined" && (
        <span className="mb-2 inline-block px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
          Joined Ride
        </span>
      )}

      {type === "created" && (
        <span className="mb-2 inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
          My Ride
        </span>
      )}

      {/* ROUTE */}
      <h2 className="text-xl font-bold mb-2">
        {ride.from} → {ride.to}
      </h2>

      {/* STATUS */}
      <span className={`inline-block px-3 py-1 text-xs rounded-full mb-3 ${
        isFull ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
      }`}>
        {isFull ? "Full" : "Available"}
      </span>

      {/* INFO */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>📅 {new Date(ride.date).toLocaleDateString()}</p>
        <p>⏰ {ride.time}</p>
        <p>💺 Seats Left: {seatsLeft}</p>
        <p>💰 Rs. {ride.price}</p>
        <p>📞 {ride.contactNumber || ride.contact || "N/A"}</p>
      </div>

      {/* JOINED USERS (ONLY FOR CREATOR) */}
      {type === "created" && passengers.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold">Joined Users</h4>

          {passengers.map((p) => (
            <p key={p._id} className="text-xs text-gray-600">
              👤 {p.user?.name || "Unknown"} ({p.user?.email || "N/A"})
            </p>
          ))}
        </div>
      )}

      {/* BUTTON */}
      <Link to={`/ride-detail/${ride._id}`}>
        <button className="w-full mt-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default RideCard;