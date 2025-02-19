import React from "react";

const TopRatedMovies = () => {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e9281f8478a8b35166534a08e6ce7834`)
    .then(response => response.json())
    .then(data => {
      console.log("Full API Response:", data); 
      console.log("Results:", data.results); 
    })
    .catch(error => console.error("Error fetching movies:", error));
    }, []);
}
const MovieCard = ({ title, year, rating, image, type }) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden ${
        type === "trending" ? "w-[300px] h-[180px]" : "w-[150px] h-[220px]"
      }`}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{year}</p>
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded">
            IMDb {rating}
          </span>
          {type === "trending" && (
            <button className="bg-red-500 px-3 py-1 rounded text-xs">
              Watch now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
