import React, { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TiStar } from "react-icons/ti";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setDetails, setTopratedMovies, setTrendingMoves ,  setTopratedShows } from "../reducer/movieSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/swiper.css";
SwiperCore.use([Navigation, Pagination]);

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const TrendingCard = ({ show }) => {
  const [details, setDetails] = useState(null);
  console.log(details)
  useEffect(() => {
    fetch(
      `${BASE_URL}/tv/${show.id}?api_key=e9281f8478a8b35166534a08e6ce7834`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, []);
  return (
    <div className="relative h-[600px] w-full">
      <img
        src={`${IMAGE_BASE_URL}${show.backdrop_path}`}
        alt={show.name}
        className="w-full h-auto rounded-lg object-cover"
      />
      <div className="bg-gradient-to-tr from-black/50 to-transparent absolute inset-0"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <div className=" flex flex-col items-start ml-4">
          <h2 className="text-2xl font-bold">{show.name}</h2>
          <p className="text-sm ">{show.first_air_date?.split("-")[0]}</p>
          <p className="text-sm mt-2 max-w-xl text-white text-left">
            {show.overview}
          </p>
          <div className="flex flex-row gap-2">
            <button
              className="mt-2 flex flex-row items-center gap-2 w-fit rounded-full border bg-white border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <BsPlayFill />
              Watch now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopRatedCard = ({ movie }) => {
    const handleBookemark = () =>{

    }
    return (
  <div className="w-[250px] h-[300px] mb-[30px] relative">
    <img
      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-full object-cover rounded-lg"
    />
    <div className="flex flex-row absolute top-1 left-1 bg-black text rounded-lg px-2 text-sm items-center gap-1">
      <div>
        <TiStar className="text-yellow-200 " />
      </div>
      <p>{movie.vote_average}</p>
    </div>
    <div className="absolute bottom-2 left-2">
      <button
        className="mt-2 flex flex-row items-center gap-2 w-fit rounded-full border py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg  hover:text-white  border-slate-800 text-white bg-slate-800 opacity-90 disabled:shadow-none"
        type="button"
        onClick={handleBookemark()}
      >
        <FaBookmark />
        BookMark 
      </button>
    </div>
  </div>
    )
};


const TrendingShows = () => {
  const dispatch = useDispatch();
  const { trendingMovies } = useSelector((state) => state.movie);

  useEffect(() => {
    fetch(`${BASE_URL}/tv/popular?api_key=e9281f8478a8b35166534a08e6ce7834`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch(setTrendingMoves(data.results.slice(0, 10)));
      });
  }, []);

  return (
    <div className="mb-8 relative">
      <h2 className="text-white text-3xl font-bold mb-4">Trending TV Shows</h2>
      <div className="absolute w-full">
        <Swiper spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }}>
          {trendingMovies?.map((show) => (
            <SwiperSlide key={show.id}>
              <TrendingCard show={show} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const TopRatedMovies = () => {
    const dispatch = useDispatch();
    const {topratedShows} = useSelector((state)=> state.movie)

useEffect(() => {
    if (!topratedShows.length) { 
      const fetchTopRated = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=e9281f8478a8b35166534a08e6ce7834`
        );
        const data = await response.json();
        // console.log(data)
        dispatch(setTopratedShows(data.results.slice(0, 20)));
      };

      fetchTopRated();
    }
  }, [dispatch, topratedShows.length]);

  return (
    <div>
      <h2 className="text-white text-3xl font-bold mb-4 mt-[700px]">
        Top Rated Movies
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {topratedShows.map((movie) => (
          <TopRatedCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const DisplaySeries = () => (
  <div className="p-8 bg-black overflow-y-auto">
    <TrendingShows/>
    <TopRatedMovies/>
  </div>
);

export default DisplaySeries;
