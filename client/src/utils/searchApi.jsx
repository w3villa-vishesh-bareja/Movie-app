// searchApi.js
import { setSearchResults } from "../reducer/movieSlice";

const searchMovies = async (query, dispatch) => {
  if (!query.trim()) return;  
  console.log("api called")
  try {
    console.log("🔍 Searching movies for:", query);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e9281f8478a8b35166534a08e6ce7834&query=${query}`
    );
    const data = await response.json();
    dispatch(setSearchResults(data.results || [])); // ✅ Results ko Redux store mein set karega
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
  }
};

export default searchMovies;
