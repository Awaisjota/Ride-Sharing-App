import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import HomePage from "./pages/HomePage";
import CreateRide from "./pages/CreateRide";
import RideDetail from "./pages/RideDetails";
import MyRides from "./pages/MyRides";
import JoinedRides from "./pages/JoinedRide";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/create-ride" element={<CreateRide />} />
        <Route path="/ride-detail/:id" element={<RideDetail />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER */}
        <Route
          path="/my-rides"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MyRides />
            </ProtectedRoute>
          }
        />

         <Route
          path="/joined-rides"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <JoinedRides />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;