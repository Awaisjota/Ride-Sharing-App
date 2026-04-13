import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getRides,
  deleteRide,
  cancelRide,
  selectRides,
  selectRideStatus,
  selectRideError,
  selectRideMessage,
  clearRideMessage,
  clearRideError,
} from "../features/rideSlice";
import { selectAllUsers } from "../features/authSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const rides = useSelector(selectRides);
  const status = useSelector(selectRideStatus);
  const error = useSelector(selectRideError);
  const message = useSelector(selectRideMessage);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getRides());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error);
      dispatch(clearRideError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearRideMessage());
    }
  }, [error, message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this ride?")) {
      dispatch(deleteRide(id));
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Cancel this ride?")) {
      dispatch(cancelRide(id));
    }
  };

  const filteredRides = rides?.filter((r) => {
    const from = r?.from?.toLowerCase() || "";
    const to = r?.to?.toLowerCase() || "";
    return (
      from.includes(search.toLowerCase()) ||
      to.includes(search.toLowerCase())
    );
  });

  const activeRides = rides?.filter((r) => r.status !== "cancelled");
  const cancelledRides = rides?.filter((r) => r.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
<header className="bg-blue-600 text-white p-4 shadow flex justify-center items-center">
  <h1 className="text-xl md:text-2xl font-bold">
    Admin Dashboard 🚀
  </h1>
</header>

      <main className="p-3 md:p-6">

        {/* STATS CARDS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6">

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Total Rides</p>
            <h2 className="text-xl font-bold">{rides?.length || 0}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-xl font-bold text-green-600">
              {activeRides?.length || 0}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Cancelled</p>
            <h2 className="text-xl font-bold text-red-600">
              {cancelledRides?.length || 0}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Users</p>
            <h2 className="text-xl font-bold">{users?.length || 0}</h2>
          </div>

        </section>

        {/* SEARCH */}
        <section className="mb-5">
          <input
            type="text"
            placeholder="Search rides (from / to)"
            className="w-full md:w-1/3 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        {/* RIDES CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {status === "loading" ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : filteredRides?.length === 0 ? (
            <p className="col-span-full text-center">No rides found 😕</p>
          ) : (
            filteredRides?.map((ride) => (
              <div
                key={ride._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition"
              >

                {/* ROUTE */}
                <div className="text-lg font-bold">
                  {ride.from} → {ride.to}
                </div>

                {/* DETAILS */}
                <div className="text-sm text-gray-600">
                  Date: {new Date(ride.date).toLocaleDateString()}
                </div>

                <div className="text-sm text-gray-600">
                  Seats: {ride.seats}
                </div>

                {/* STATUS */}
                <span
                  className={`w-fit px-2 py-1 rounded text-xs text-white ${
                    ride.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {ride.status || "active"}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => handleCancel(ride._id)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleDelete(ride._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </section>

      </main>
    </div>
  );
};

export default AdminPage;