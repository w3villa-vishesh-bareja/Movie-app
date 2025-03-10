import React, { useEffect, useState } from "react";
import { FaBell, FaTh, FaWifi } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setIsClicked } from "../reducer/authSlice.js";
import searchMovies from "../utils/searchApi";
import useDebounce from "../customHooks/useDebounce.js";

function Navbar({ selectedCategory, setSelectedCategory }) {
  const [search, setSearch] = useState("");
  const { debounceValue } = useDebounce(search);
  const dispatch = useDispatch();
  const { isClicked } = useSelector((state) => state.auth);
  const { searchResults } = useSelector((state) => state.movie);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (debounceValue) {
      searchMovies(debounceValue, dispatch);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debounceValue]);

  const handleUserinfo = () => {
    dispatch(setIsClicked(true));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectMovie = (title) => {
    setSearch(title);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex items-center justify-between bg-black text-white p-4 border-b border-b-gray-500">
      <div className="flex gap-6 text-gray-400 text-lg">
        <p
          className={`cursor-pointer hover:text-white font-semibold ${
            selectedCategory === "movies" ? "text-white" : ""
          }`}
          onClick={() => setSelectedCategory("movies")}
        >
          Movies
        </p>
        <p
          className={`cursor-pointer hover:text-white ${
            selectedCategory === "series" ? "text-white" : ""
          }`}
          onClick={() => setSelectedCategory("series")}
        >
          Series
        </p>
      </div>

      <div className="relative flex-grow flex justify-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="bg-gray-800 text-white p-2 rounded-md w-full outline-none"
          />
          {showDropdown && searchResults?.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-gray-900 text-white shadow-lg rounded-md mt-1 overflow-hidden z-50">
              {searchResults.slice(0, 5).map((movie, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSelectMovie(movie.title)}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center text-gray-400 text-lg">
        <FaWifi className="cursor-pointer hover:text-white" />
        <FaBell className="cursor-pointer hover:text-white" />
        <FaTh className="cursor-pointer hover:text-white" onClick={handleUserinfo} />
      </div>
    </div>
  );
}

export default Navbar;
