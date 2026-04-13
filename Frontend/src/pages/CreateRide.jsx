import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import { createRide } from "../features/rideSlice";
import {useNavigate} from "react-router-dom";
const CreateRide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.rides);

  // ✅ FIXED loading
  const loading = status?.createRide === "loading";
  const success = status?.createRide === "succeeded";
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    vehicleType: "car",
    availableSeats: "",
    price: "",
    contact: "",
    description: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ required fields
  if (!form.from || !form.to || !form.date || !form.time) {
    return alert("Please fill all required fields");
  }

  // ✅ same city check
  if (form.from === form.to) {
    return alert("From & To cannot be same");
  }

  // ✅ seats validation
  if (!form.availableSeats || Number(form.availableSeats) < 1) {
    return alert("Seats must be at least 1");
  }

  // ✅ price validation
  if (form.price && Number(form.price) < 0) {
    return alert("Price cannot be negative");
  }

  // ✅ FINAL DATA
  const finalData = {
    ...form,
    date: new Date(form.date), // ⭐ IMPORTANT FIX
    availableSeats: Number(form.availableSeats),
    price: Number(form.price) || 0,
  };

  console.log("SENDING:", finalData); // 🔥 debug

  dispatch(createRide(finalData)).then((res) => {
    if (res.error) {
      console.log("ERROR:", res.error);
      alert(res.error.message || "Failed to create ride");
    } else {
      alert("Ride created successfully!");
      navigate("/");
    }
  });
};

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Ride</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* <Input name="from" placeholder="From" onChange={handleChange} /> */}
        <select
  name="from"
  onChange={handleChange}
  className="w-full border p-2 rounded"
>
  <option value="">From</option>
  <option value="Islamabad">Islamabad</option>
  <option value="Murree">Murree</option>
  <option value="Muzaffarabad">Muzaffarabad</option>
  <option value="Bagh">Bagh</option>
  <option value="Haveli">Haveli</option>
  <option value="Abbaspur">Abbaspur</option>
  <option value="Rawalakot">Rawalakot</option>
  <option value="Hajira">Hajira</option>
  <option value="Kotli">Kotli</option>
  <option value="Azad Pattan">Azad Pattan</option>
  <option value="Jhelum">Jhelum</option>
  <option value="Mirpur">Mirpur</option>
</select>

        {/* <Input name="to" placeholder="To" onChange={handleChange} /> */}
         <select
  name="to"
  onChange={handleChange}
  className="w-full border p-2 rounded"
>
  <option value="">To</option>
  <option value="Islamabad">Islamabad</option>
  <option value="Murree">Murree</option>
  <option value="Muzaffarabad">Muzaffarabad</option>
  <option value="Bagh">Bagh</option>
  <option value="Haveli">Haveli</option>
  <option value="Abbaspur">Abbaspur</option>
  <option value="Rawalakot">Rawalakot</option>
  <option value="Hajira">Hajira</option>
  <option value="Kotli">Kotli</option>
  <option value="Azad Pattan">Azad Pattan</option>
  <option value="Jhelum">Jhelum</option>
  <option value="Mirpur">Mirpur</option>
</select>
        <Input type="date" name="date" onChange={handleChange} />
        <Input type="time" name="time" onChange={handleChange} />

        <select
          name="vehicleType"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="van">Van</option>
        </select>

        <Input name="availableSeats" placeholder="Seats" onChange={handleChange} />
        <Input name="price" placeholder="Price" onChange={handleChange} />
        <Input name="contact" placeholder="Contact Number" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Ride Description (optional)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <Button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl"
        >
          {loading ? "Creating..." : "Create Ride"}
        </Button>
      </form>
    </div>
  );
};

export default CreateRide;