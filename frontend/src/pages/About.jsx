import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen px-6 py-10">

      {/* TOP BAR */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-black transition"
      >
        <span className="text-xl">←</span>
        <span className="font-medium">Back to Home</span>
      </button>

      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          About Pixora
        </h1>
        <p className="text-gray-600 text-lg">
          Discover, save, and organize visual inspiration — all in one place.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-[#e60023]">
            What is Pixora?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Pixora is a visual discovery platform where you can explore photos,
            videos, and GIFs, then save them into collections for inspiration,
            learning, and creativity.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-[#e60023]">
            Why Pixora?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Instead of losing bookmarks or screenshots, Pixora helps you
            organize everything neatly into collections — accessible anywhere,
            anytime.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-[#e60023]">
            Built For Creators
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Designers, developers, students, and creators use Pixora to gather
            inspiration, references, and ideas for their next big project.
          </p>
        </div>

      </div>

      {/* MISSION */}
      <div className="max-w-4xl mx-auto mt-26 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our mission is simple — to make discovering and organizing visual
          inspiration effortless, beautiful, and personal.
        </p>
      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/explore")}
          className="bg-[#e60023] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Start Exploring
        </button>
      </div>

    </div>
  );
};

export default About;
