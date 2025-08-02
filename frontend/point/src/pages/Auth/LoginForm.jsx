import React, { useContext, useState } from "react";
import AuthLayout from "../../component/layout/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";
import Authinput from "../../input/Authinput.jsx";
import { Link } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";



const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please enter a valid Email Adresse.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError("");

    // Login api

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error){
    if(error.response && error.response.data.message){
      setError(error.response.data.message);
    } else{
      setError("something went wrong. please try again.");
    }
    }
    
  };

  
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center lg:w-[70%] h-3/4 md:h-full">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <Authinput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@exemple.com"
            type="text"
          />
          <Authinput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-rose-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="p-[10px] rounded-md my-1 hover:text-blue-500 text-white font-medium shadow-lg w-full text-sm bg-blue-400 "
          >
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 ">
            Don't have An Account ?{" "}
            <Link className="font-medium text-blue-400 underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
