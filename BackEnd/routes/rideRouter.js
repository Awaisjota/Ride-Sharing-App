import express from "express";
import {
  createRide,
  deleteRide,
  getRides,
  getSingleRide,
  joinRide,
  updateRide,
  leaveRide,
  cancelRide,
  getMyRides,
  getJoinedRides,
} from "../controllers/rideController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL RIDES
router.get("/rides", getRides);

// GET SINGLE RIDE
router.get("/rides/single-ride/:id", getSingleRide);


// CREATE RIDE
router.post("/rides/create-ride", protect, createRide);

// UPDATE RIDE
router.put("/rides/update-ride/:id", protect, updateRide);

// DELETE RIDE
router.delete("/rides/delete-ride/:id", protect, deleteRide);


// JOIN RIDE
router.post("/rides/join-ride/:id", protect, joinRide);

// LEAVE RIDE
router.post("/rides/leave-ride/:id", protect, leaveRide);

// CANCEL RIDE
router.put("/rides/cancel-ride/:id", protect, cancelRide);


// MY CREATED RIDES
router.get("/rides/my-rides", protect, getMyRides);

// JOINED RIDES
router.get("/rides/joined-rides", protect, getJoinedRides);

export default router;