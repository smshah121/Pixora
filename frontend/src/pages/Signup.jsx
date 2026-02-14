import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { FaUser, FaGoogle } from "react-icons/fa";
import { useSignupMutation } from "../feature/auth/authApi";
import { toast } from "react-toastify";


const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, { isLoading, error }] = useSignupMutation();

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await signup({ name, email, password }).unwrap();
      localStorage.setItem("token", res.access_token);
      toast.success("🎉 Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Signup failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
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
          <p className="text-[#555] text-lg">Create your account 🚀</p>
        </div>

 
        <form onSubmit={handleSubmit} className="space-y-4">

   
          <div className="relative">
            <label className="block text-sm font-medium text-[#333] mb-2">
    
            </label>
            <div className="relative">
              <FaUser size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-red-100 rounded-xl bg-white focus:outline-none focus:border-[#e60023] transition-colors text-[#111]"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Email Address
            </label>
            <div className="relative">
              <CiMail size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
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
                placeholder="Create a password (min. 6 characters)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-red-100 rounded-xl bg-white focus:outline-none focus:border-[#e60023] transition-colors text-[#111]"
              />
            </div>
            {password && password.length < 6 && (
              <p className="text-xs text-red-600 mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <CiLock size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="password"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-red-100 rounded-xl bg-white focus:outline-none focus:border-[#e60023] transition-colors text-[#111]"
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

   
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700 text-center font-medium">
                ❌ {error?.data?.message || "Signup failed. Please try again."}
              </p>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-[#555]">
            <input 
              type="checkbox" 
              required 
              className="mt-0.5 accent-[#e60023]"
            />
            <label>
              I agree to the{" "}
              <button type="button" className="text-[#e60023] hover:underline">
                Terms of Service
              </button>
              {" "}and{" "}
              <button type="button" className="text-[#e60023] hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>

  
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e60023] text-white py-3.5 rounded-xl font-semibold hover:bg-[#d01f1f] hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-red-100"></div>
          <span className="text-sm text-[#999] font-medium">OR</span>
          <div className="flex-1 h-px bg-red-100"></div>
        </div>


        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white border-2 border-red-100 text-[#333] px-5 py-3.5 rounded-xl font-semibold hover:bg-red-50 hover:border-[#e60023] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
        >
          <FaGoogle className="text-[#e60023] text-xl" />
          <span>Continue with Google</span>
        </button>


        <div className="text-center mt-8 text-[#555]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#e60023] font-semibold hover:text-[#d01f1f] hover:underline transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>


      <div className="flex flex-col md:flex-row items-center gap-6 mt-8 text-sm text-[#555] relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-[#e60023]">✓</span>
          </div>
          <span>Free Forever</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-[#e60023]">✓</span>
          </div>
          <span>No Credit Card Required</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-[#e60023]">✓</span>
          </div>
          <span>Unlimited Collections</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;