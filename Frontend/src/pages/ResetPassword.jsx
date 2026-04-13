import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  resetPassword,
  selectAuthError,
  selectAuthStatus,
} from "../features/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(resetPassword(form)).unwrap();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        {error?.message && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="otp"
          value={form.otp}
          onChange={handleChange}
          placeholder="OTP"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full p-3 border rounded-lg"
        />

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Resetting..." : "Reset Password"}
        </button>

        {/* LINKS */}
        <p className="text-center text-sm">
          Back to{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;