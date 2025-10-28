import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Comics from "../pages/comics/Comics";
import News from "../pages/news/News";
import Contact from "../pages/contact/Contact";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Profile from "../pages/users/Profile";

export default function ComiqueaRouter({ searchTerm }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comics" element={<Comics searchTerm={searchTerm} />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}