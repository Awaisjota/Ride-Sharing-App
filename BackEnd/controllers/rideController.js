// Ride Controllers:

// ✔ createRide
// ✔ getRides
// ✔ getSingleRide
// ✔ updateRide
// ✔ deleteRide

// 🔥 joinRide
// 🔥 leaveRide
// 🔥 getMyRides
// 🔥 getJoinedRides
// 🔥 cancelRide
import Ride from "../models/Ride.js";

// CREATE RIDE
export const createRide = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const ride = await Ride.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Ride created successfully",
      ride,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL RIDES
export const getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate("user", "name email");

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE RIDE
export const getSingleRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RIDE
export const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedRide = await Ride.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE RIDE
export const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await ride.deleteOne();

    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // can't join own ride
    if (ride.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You can't join your own ride" });
    }

    ride.passengers = ride.passengers || [];

    const alreadyJoined = ride.passengers.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: "Already joined this ride" });
    }

    if (ride.passengers.length >= ride.availableSeats) {
      return res.status(400).json({ message: "Ride is full" });
    }

    ride.passengers.push({ user: req.user._id });

    if (ride.passengers.length >= ride.availableSeats) {
      ride.status = "full";
    }

    await ride.save();

    res.status(200).json({
      message: "Joined ride successfully",
      ride,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const leaveRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    ride.passengers = (ride.passengers || []).filter(
      (p) => p.user.toString() !== req.user._id.toString()
    );

    ride.status = "active";

    await ride.save();

    res.status(200).json({
      message: "Left ride successfully",
      ride,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user._id }).populate("passengers.user", "name email");

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getJoinedRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      "passengers.user": req.user._id,
    }).populate({ path:"user", select: "name email" }).populate({ path:"passengers.user", select: "name email" });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const cancelRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // only owner
    if (ride.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    ride.status = "cancelled";

    await ride.save();

    res.status(200).json({ message: "Ride cancelled", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};