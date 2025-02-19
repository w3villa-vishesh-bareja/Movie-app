import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setErrors, setToken } from "../reducer/authSlice";

const AuthPage = ({ type }) => {
  const dispatch = useDispatch();
  const { token, loading, errors } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    console.log(token)
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (type === "register" && !formData.name) {
      tempErrors.name = "Name is required";
    }
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one uppercase letter";
    }
    dispatch(setErrors(tempErrors));
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(setLoading(true));

    try {
      const endpoint = type === "register" ? "http://localhost:5000/register" : "http://localhost:5000/login";
      const response = await axios.post(endpoint, formData);

      if (response.status === 201) {
        navigate("/login");
      }
      if (response.data.token) {
        sessionStorage.setItem('token',response.data.token)
        dispatch(setToken(true));
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(setErrors({ api: error.response?.data || "Something went wrong" }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/google");
      console.log("Google Auth Response:", response.data);
    } catch (error) {
      console.error("Google Auth Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-500">{type === "register" ? "Register" : "Login"}</h2>
        <button className="w-full px-4 py-2 text-black bg-white rounded-md" onClick={handleGoogleAuth}>
          {type === "register" ? "Sign Up with Google" : "Login with Google"}
        </button>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === "register" && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" disabled={loading}>
            {loading ? "Processing..." : type === "register" ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
