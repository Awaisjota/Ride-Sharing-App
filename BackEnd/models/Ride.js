import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    // 👤 Who created ride
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📍 From - To
    from: {
      type: String,
      enum: [
        "Islamabad",
        "Murree",
        "Muzaffarabad",
        "Bagh",
        "Haveli",
        "Abbaspur",
        "Rawalakot",
        "Hajira",
        "Kotli",
        "Azad Pattan",
        "Jhelum",
        "Mirpur"
      ],

      required: true,
    },
    to: {
      type: String,
      enum: [
        "Islamabad",
        "Murree",
        "Muzaffarabad",
        "Bagh",
        "Haveli",
        "Abbaspur",
        "Rawalakot",
        "Hajira",
        "Kotli",
        "Azad Pattan",
        "Jhelum",
        "Mirpur"
      ],
      required: true,
      trim: true,
    },

    // 📅 Date & Time
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // "10:30 AM"
      required: true,
    },

    // 🚗 Vehicle
    vehicleType: {
      type: String,
      enum: ["bike", "car", "van"],
      required: true,
    },

    // 💺 Seats
    availableSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    // 💰 Price (optional)
    price: {
      type: Number,
      default: 0,
    },

    // 📝 Description
    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    // 📞 Contact (optional)
    contact: {
      type: String,
    },

    // 📌 Status
    status: {
      type: String,
      enum: ["active", "full", "cancelled"],
      default: "active",
    },

    // 👥 Joined Users
    passengers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);