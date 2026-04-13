import api from "../api/api.js";

// CREATE RIDE
export const createRideService = (data) =>
  api.post("/rides/create-ride", data);

// GET ALL RIDES
export const getRidesService = () =>
  api.get("/rides");

// GET SINGLE RIDE
export const getSingleRideService = (id) =>
  api.get(`/rides/single-ride/${id}`);

// UPDATE RIDE
export const updateRideService = (id, data) =>
  api.put(`/rides/update-ride/${id}`, data);

// DELETE RIDE
export const deleteRideService = (id) =>
  api.delete(`/rides/delete-ride/${id}`);

// JOIN RIDE
export const joinRideService = (id) =>
  api.post(`/rides/join-ride/${id}`);

// LEAVE RIDE
export const leaveRideService = (id) =>
  api.post(`/rides/leave-ride/${id}`);

// CANCEL RIDE
export const cancelRideService = (id) =>
  api.put(`/rides/cancel-ride/${id}`);

// MY RIDES
export const getMyRidesService = () =>
  api.get("/rides/my-rides");

// JOINED RIDES
export const getJoinedRidesService = () =>
  api.get("/rides/joined-rides");