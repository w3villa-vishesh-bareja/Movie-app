import React from "react";
import { FaBell, FaTh, FaWifi } from "react-icons/fa"; // Icons for right section

function Navbar() {
  return (
    <div className="flex items-center justify-between bg-black text-white p-4 border-b border-b-gray-500">
      <div className="flex gap-6 text-gray-400 text-lg">
        <p className="cursor-pointer hover:text-white font-semibold">Movies</p>
        <p className="cursor-pointer hover:text-white">Series</p>
        <p className="cursor-pointer hover:text-white">TV Shows</p>
      </div>

      <div className="flex-grow flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white p-2 rounded-md w-64 outline-none"
        />
      </div>

      <div className="flex gap-4 items-center text-gray-400 text-lg">
        <FaWifi className="cursor-pointer hover:text-white" />
        <FaBell className="cursor-pointer hover:text-white" />
        <FaTh className="cursor-pointer hover:text-white" />
      </div>
    </div>
  );
}

export default Navbar;
