import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import DisplayMovies from "./component/DisplayMovies";
import DisplaySeries from "./component/DisplaySeries.jsx";
import AuthPage from "./component/AuthPage";
import { useSelector, useDispatch } from "react-redux";
import {setToken} from './reducer/authSlice'
import UserInfo from "./component/UserInfo";
function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [selectedCategory, setSelectedCategory] = useState("movies"); 


  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    console.log("in useEffect")
    if (storedToken) {
      console.log("setting true..")
      dispatch(setToken(true));
    } else {
      dispatch(setToken(false)); 
    }
  }, []);
  

  const ProtectedRoute = ({ children }) => {
    console.log(token)
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage type="register" />} />

        <Route path="/login" element={<AuthPage setToken={setToken} token={token} type="login" />} />

        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="grid grid-cols-[280px_1fr] h-screen">
              <div className="border-r border-r-red-800">
                <Sidebar />
              </div>
              <div className="bg-black flex flex-col h-screen text-white border-l border-l-gray-500 transition-all duration-300">
                <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                {selectedCategory === "movies" ? <DisplayMovies /> : <DisplaySeries />}
              </div>
              <UserInfo />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  );
}

export default App;
