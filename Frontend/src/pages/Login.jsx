import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import {
  login,
  selectAuthError,
  selectAuthStatus,
  clearError,
  clearFieldError,
} from "../features/authSlice";

import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

    const  handleFieldChange = (field) => {
    if (error?.errors?.some((e) => e.path === field)) {
      dispatch(clearFieldError(field));
    }
  };

  const getFieldError = (field) =>
    error?.errors?.find((e) => e.path === field)?.msg;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        login({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      ).unwrap();

      const role = result?.user?.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm">Login to continue</p>

        {/* ERROR */}
        {error?.message && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error.message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} onChange={()=> handleFieldChange("email")} className="space-y-4">
          {/* INPUTS (REUSABLE COMPONENTS) */}
          <Input name="email" type="email" placeholder="Email" />

          {getFieldError("email") && (
            <span className="text-red-500 text-xs mt-1 block">
              * {getFieldError("email")}
            </span>
          )}
          <Input name="password" type="password" placeholder="Password"  onChange={()=> handleFieldChange("password")}/>
          {getFieldError("password") && (
            <span className="text-red-500 text-xs mt-1 block">
              * {getFieldError("password")}
            </span>
          )}
          {/* BUTTON */}
          <Button loading={status === "loading"}>Login</Button>
        </form>

        {/* LINKS */}
        <div className="text-sm text-center space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>

          <Link to="/forgot-password" className="text-blue-600 block">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
