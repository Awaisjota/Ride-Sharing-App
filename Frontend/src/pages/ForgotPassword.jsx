import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  forgotPassword,
  selectAuthError,
  selectAuthStatus,
} from "../features/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword(email)).unwrap();
      navigate("/reset-password");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

        {error?.message && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full p-3 border rounded-lg"
        />

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send OTP"}
        </button>

        {/* LINKS */}
        <p className="text-center text-sm">
          Remember password?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;