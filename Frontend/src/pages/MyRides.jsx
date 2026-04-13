import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideCard from "../components/RideCard";
import { getMyRides } from "../features/rideSlice";

const MyRides = () => {
  const dispatch = useDispatch();

  const { myRides, status } = useSelector(
    (state) => state.rides
  );

  const loading = status?.getMyRides === "loading" 

  useEffect(() => {
    dispatch(getMyRides());

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

      {/* CREATED RIDES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Rides</h2>

        {myRides?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {myRides.map((ride) => (
              <RideCard key={ride._id} ride={ride} type="created" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No rides created yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyRides;