import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { getSingleRide, joinRide, leaveRide } from "../features/rideSlice";

const RideDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleRide, status } = useSelector((state) => state.rides);

  const loading = status?.getSingleRide === "loading";
  const loadingJoin = status?.joinRide === "loading";
  const loadingLeave = status?.leaveRide === "loading";

  useEffect(() => {
    dispatch(getSingleRide(id));
  }, [dispatch, id]);

  const seatsLeft =
    singleRide?.availableSeats - (singleRide?.passengers?.length || 0);

  const isFull = seatsLeft <= 0;

  const handleJoin = () => {
    dispatch(joinRide(id)).then(() => {
      alert(`You joined the ride from ${singleRide.from} to ${singleRide.to}`);
      dispatch(getSingleRide(id));
    });
  };

  const handleLeave = () => {
    dispatch(leaveRide(id)).then(() => {
      alert("You left the ride");
      dispatch(getSingleRide(id));
    });
  };

  if (loading || !singleRide)
    return <p className="p-6 text-center">Loading...</p>;

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

    <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* HEADER GRADIENT */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          {singleRide.from} → {singleRide.to}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
          <span>🚗 {singleRide.vehicleType}</span>
          <span>•</span>
          <span>💰 Rs {singleRide.price}</span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6">

        {/* STATUS + SEATS */}
        <div className="flex justify-between items-center mb-6">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              isFull
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {isFull ? "Full" : "Seats Available"}
          </span>

          <span className="text-sm text-gray-600">
            💺 {seatsLeft} seats left
          </span>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            📅 {new Date(singleRide.date).toLocaleDateString()}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            ⏰ {singleRide.time}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            🚗 {singleRide.vehicleType}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            💰 Rs {singleRide.price}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            📞 {singleRide.contact || "N/A"}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl hover:shadow transition">
            👥 {singleRide.passengers?.length || 0} joined
          </div>

        </div>

        {/* DESCRIPTION */}
        {singleRide.description && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Ride Notes</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
              {singleRide.description}
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleJoin}
            disabled={isFull || loadingJoin}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loadingJoin ? "Joining..." : "Join Ride"}
          </button>

          <button
            onClick={handleLeave}
            disabled={loadingLeave}
            className="flex-1 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loadingLeave ? "Leaving..." : "Cancel Ride"}
          </button>

        </div>

      </div>
    </div>
  </div>
);
};

export default RideDetail;