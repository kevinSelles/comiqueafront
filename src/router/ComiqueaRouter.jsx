import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Comics from "../pages/comics/Comics";
import News from "../pages/news/News";
import Contact from "../pages/contact/Contact";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Profile from "../pages/users/Profile";
import MyComics from "../pages/myLists/MyComics";
import Favourites from "../pages/myLists/Favourites";
import Readed from "../pages/myLists/Readed";
import Wanted from "../pages/myLists/Wanted";

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
      <Route path="/mycomics" element={<MyComics />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/readed" element={<Readed />} />
      <Route path="/wanted" element={<Wanted />} />
    </Routes>
  );
}