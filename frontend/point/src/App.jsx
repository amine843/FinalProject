import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginForm from "./pages/Auth/LoginForm.jsx";
import SignUpForm from "./pages/Auth/SignUpForm.jsx";
import Home from "./pages/dashboard/Home.jsx";
import CreatePoll from "./pages/dashboard/CreatePoll.jsx";
import MyPolis from "./pages/dashboard/MyPolis.jsx";
import VotedPolls from "./pages/dashboard/VotedPolls.jsx";
import Bookmarks from "./pages/dashboard/Bookmarks.jsx";
import Data from "./component/Data.jsx";
import UserProvider from "./context/UserContext.jsx";

const App = () => {
  return (
    <div>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/hello" exact element={<Data />} />
          <Route path="/signup" exact element={<SignUpForm />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/create-poll" exact element={<CreatePoll />} />
          <Route path="/my-polls" exact element={<MyPolis />} />
          <Route path="/voted-polls" exact element={<VotedPolls />} />
          <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
        </Routes>
      </Router>
    </UserProvider>
    </div>
  );
};

export default App;

const Root = () => {
  // check token exists
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/Login" />
  );
};
