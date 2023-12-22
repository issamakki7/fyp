import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import Credit from "../pages/Credit";
import LoginPage from "../pages/LoginPage/LoginPage";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";

import Profile from "../pages/Profile/Profile";
import NotFound404 from "../components/NotFound404/NotFound404";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import Menu from "../pages/Menu/Menu";
import { useEffect, useState } from "react";

function RouterProvider() {
  const [currentUser,setCurrentUser] = useState(localStorage.getItem("currentUser"))


  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"))
    
  }, [localStorage.getItem("currentUser")]);

  
  return (
    <div className="content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<BookingPage />} />

        {currentUser ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/menu" element={<Menu />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/review" element={<Navigate to="/login" />} />
            <Route path="/book" element={<Navigate to="/login" />} />
            <Route path="/menu" element={<Menu />} />
          </>
        )}
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RouterProvider;
