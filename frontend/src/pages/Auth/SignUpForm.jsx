import React, { useContext, useState } from "react";
import AuthLayout from "../../component/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../input/ProfilePhotoSelector";
import Authinput from "../../input/Authinput";
import { ValidateEmail } from "../../utils/helper";
import { UserRound } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";



const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  
  // Handl Sign Up function
  const HandleSignUp = async (e) => {
    e.preventDefault();

        let profileImageUrl = ""

    
    if (!fullName) {
      setError("Please enter the fullname.");
      return;
    }

    if (!ValidateEmail(email)) {
      setError("Please enter a valid Email Adresse.");
      return;
    }
    if (!username) {
      setError("Please enter Username.");
      return;
    }
    if (!password) {
      setError("Please enter teh password.");
      return;
    }
    setError("");
    
    // Sign Up api
    try {
      
      // upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        username,
        email,
        password,
        profileImageUrl
      });
      const { token , user } = response.data;
      
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message){ 
      setError(error.response.data.message);
    } else{
      setError("something went wrong. please try again.");
    }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
          <h3 className="text-xl font-semibold text-black"> Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entring your details below.
        </p>
        <form onSubmit={HandleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Authinput
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              type="text"
              placeholder="John"
            ></Authinput>
            <Authinput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@exemple.com"
              type="text"
            />
            <Authinput
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              label="Username"
              placeholder="@"
              type="text"
            />
            <Authinput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="password"
              placeholder="Min 8 characters"
              type="password"
            />
          </div>
          {error && <p className="text-rose-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="p-[10px] rounded-md my-1 hover:text-blue-500 text-white font-medium shadow-lg w-full text-sm bg-blue-400 "
          >
            Create ACCOUNT
          </button>

          <p className="text-[13px] text-slate-800 ">
            Already have an account{" "}
            <Link className="font-medium text-blue-400 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
