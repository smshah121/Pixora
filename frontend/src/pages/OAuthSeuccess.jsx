import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../feature/auth/authSlice"; // your slice action

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
 
      dispatch(setToken(token));


      localStorage.setItem("access_token", token);


      navigate("/user-dashboard");
    } else {
      navigate("/"); 
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging you in...</p>
    </div>
  );
};

export default OAuthSuccess;
