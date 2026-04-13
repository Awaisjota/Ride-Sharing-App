import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideCard from "../components/RideCard";
import {  getJoinedRides } from "../features/rideSlice";

const JoinedRides = () => {
  const dispatch = useDispatch();

  const { joinedRides, status } = useSelector(
    (state) => state.rides
  );

  const loading = status?.getJoinedRides === "loading";

  useEffect(() => {
    dispatch(getJoinedRides());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading rides...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {/* JOINED RIDES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Joined Rides</h2>

        {joinedRides?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {joinedRides.map((ride) => (
              <RideCard key={ride._id} ride={ride} type="joined" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No joined rides yet
          </p>
        )}
      </div>

    </div>
  );
};

export default JoinedRides;