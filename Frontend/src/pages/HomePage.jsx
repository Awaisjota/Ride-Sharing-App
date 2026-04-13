import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideCard from "../components/RideCard";
import Input from "../components/Input";
import { getRides, joinRide } from "../features/rideSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { rides, status } = useSelector((state) => state.rides);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getRides());
  }, [dispatch]);

  const handleJoin = (id) => {
    dispatch(joinRide(id));
  };

  // 🔥 SEARCH LOGIC (from + to)
const filteredRides = rides?.filter((ride) =>
  (ride.from || "").toLowerCase().includes(search.toLowerCase()) ||
  (ride.to || "").toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="p-6">

      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl mb-6">
        <h1 className="text-2xl text-center font-bold">
          Find Your Perfect Ride 🚗
        </h1>
        <p className="text-sm text-center mt-1">
          سفر آسان، سستا اور محفوظ
        </p>
      </div>

      {/* Search Bar */}
      <section className="mb-6 w-100 flex justify-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rides by from or to..."
        />
      </section>

      {/* Ride List */}
      {status.getRides === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRides?.length > 0 ? (
            filteredRides.map((ride) => (
              <RideCard
                key={ride._id}
                ride={ride}
                onJoin={handleJoin}
              />
            ))
          ) : (
            <p className="text-center col-span-3">
              No rides found 😕
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;