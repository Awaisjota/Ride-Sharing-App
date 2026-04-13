import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearFieldError,
  register,
  selectAuthError,
  selectAuthStatus,
} from "../features/authSlice";
import { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const  handleFieldChange = (field) => {
    if (error?.errors?.some((e) => e.path === field)) {
      dispatch(clearFieldError(field));
    }
  };


  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const getFieldError = (field) =>
    error?.errors?.find((e) => e.path === field)?.msg;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.password.value !== form.confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await dispatch(
        register({
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
          contactNumber: form.contactNumber.value,
          city: form.city.value,
          vehicleType: form.vehicleType.value,
        })
      ).unwrap();

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        {/* GLOBAL ERROR */}
        {error?.message && (
          <p className="text-red-500 text-sm text-center">
            {error.message}
          </p>
        )}

        {/* NAME */}
        <Input
          name="name"
          placeholder="Full Name"
          onChange={() => handleFieldChange("name")}
        />
        {getFieldError("name") && (
          <p className="text-red-500 text-sm">{getFieldError("name")}</p>
        )}

        {/* EMAIL */}
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={() => handleFieldChange("email")}
        />
        {getFieldError("email") && (
          <p className="text-red-500 text-sm">{getFieldError("email")}</p>
        )}

        {/* PASSWORD */}
        <Input name="password" type="password" placeholder="Password" onChange={() => handleFieldChange("password")} />
        {getFieldError("password") && (
          <p className="text-red-500 text-sm">{getFieldError("password")}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <Input

          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={() => handleFieldChange("confirmPassword")}
        />

        {/* CONTACT */}
        <Input name="contactNumber" placeholder="Contact Number" onChange={() => handleFieldChange("contactNumber")}  />
        {getFieldError("contactNumber") && (
          <p className="text-red-500 text-sm">
            {getFieldError("contactNumber")}
          </p>
        )}

        {/* CITY */}
        <Input name="city" placeholder="City" onChange={() => handleFieldChange("city")} />
        {getFieldError("city") && (
          <p className="text-red-500 text-sm">{getFieldError("city")}</p>
        )}

        {/* VEHICLE */}
        <select
          name="vehicleType"
          onChange={() => handleFieldChange("vehicleType")}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Vehicle</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
        </select>
        {getFieldError("vehicleType") && (
          <p className="text-red-500 text-sm">
            {getFieldError("vehicleType")}
          </p>
        )}

        {/* BUTTON */}
        <Button disabled={status === "loading"}>
          {status === "loading" ? "Creating..." : "Register"}
        </Button>

        <p className="text-center text-sm">
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;