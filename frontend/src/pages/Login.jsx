import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setToken } from "../feature/auth/authSlice";
import { useLoginMutation } from "../feature/auth/authApi";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setToken(res.access_token));
      localStorage.setItem("token", res.access_token);
      navigate("/user-dashboard");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
      
 
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#e60023]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#e60023]/5 rounded-full blur-3xl"></div>
      </div>

   
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#e60023] hover:text-[#d01f1f] font-medium transition-colors z-10"
      >
        <span>←</span>
        <span>Back to Home</span>
      </button>

  
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border-2 border-red-100 relative z-10">

  
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#e60023] to-[#ff4458] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-4xl font-bold text-[#e60023]">Pixora</h1>
          </div>
          <p className="text-[#555] text-lg">Welcome back! 👋</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Email Address
            </label>
            <div className="relative">
              <CiMail size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-red-100 rounded-xl bg-white focus:outline-none focus:border-[#e60023] transition-colors text-[#111]"
              />
            </div>
          </div>

     
          <div className="relative">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Password
            </label>
            <div className="relative">
              <CiLock size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-red-100 rounded-xl bg-white focus:outline-none focus:border-[#e60023] transition-colors text-[#111]"
              />
            </div>
          </div>

     
          

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700 text-center font-medium">
                ❌ Invalid email or password
              </p>
            </div>
          )}

     
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e60023] text-white py-3.5 rounded-xl font-semibold hover:bg-[#d01f1f] hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-red-100"></div>
          <span className="text-sm text-[#999] font-medium">OR</span>
          <div className="flex-1 h-px bg-red-100"></div>
        </div>


        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border-2 border-red-100 text-[#333] px-5 py-3.5 rounded-xl font-semibold hover:bg-red-50 hover:border-[#e60023] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
        >
          <FaGoogle className="text-[#e60023] text-xl" />
          <span>Continue with Google</span>
        </button>

   
        <div className="text-center mt-8 text-[#555]">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#e60023] font-semibold hover:text-[#d01f1f] hover:underline transition-colors"
          >
            Create one
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-8 text-sm text-[#999] relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[#e60023]">✓</span>
          <span>Secure Login</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#e60023]">✓</span>
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#e60023]">✓</span>
          <span>Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};

export default Login;