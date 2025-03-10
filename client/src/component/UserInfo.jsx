import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsClicked, setUser } from "../reducer/authSlice";
import {setTopratedMovies} from "../reducer/movieSlice"
import avatar from "../assets/avatar.png"

function UserInfo() {
  const dispatch = useDispatch();
  const { isClicked, user } = useSelector((state) => state.auth);
  const { topratedMovies } = useSelector((state) => state.movie);

  const [genres, setGenres] = useState([]);
  
  console.log(user);
  const handleClose = () => {
    console.log("closed")
    dispatch(setIsClicked(false));
  };
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=e9281f8478a8b35166534a08e6ce7834"
        );
        const data = await response.json();
        console.log(data.genres);
        setGenres(data.genres.slice(0, 5));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);
  const handleGenreClick = async (genreId) => {
    try {
        console.log(genreId)
        console.log("inside")
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=e9281f8478a8b35166534a08e6ce7834&with_genres=${genreId}`
      );
      const data = await response.json();
      console.log(data.results)
      dispatch(setTopratedMovies(data.results.slice(0, 20))); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <>
      {isClicked && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 backdrop-blur-sm cursor-pointer"
            onClick={handleClose}
          ></div>
          <div
            className={`w-80 bg-gray-900 text-white p-6 shadow-2xl transform transition-transform duration-300 ${
              isClicked ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="User"
                className="w-12 h-16 rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold">{user.name}</h4>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <hr className="my-4 border-gray-600" />

            <div className="space-y-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className="w-full py-2 px-4 rounded-lg bg-gray-700 hover:bg-red-500 transition duration-200"
                  onClick={() => {
                    handleGenreClick(genre.id);
                    if (isClicked) handleClose();  
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;
