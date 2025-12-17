import { Routes, Route } from "react-router-dom";
import RequireAuth from "../context/RequireAuth";
import Home from "../pages/home/Home";
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
import NewComic from "../pages/newComic/NewComic";

export default function ComiqueaRouter({ searchTerm, onResetSearch }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comics" element={<Comics searchTerm={searchTerm} onResetSearch={onResetSearch} />} />
      <Route path="/comics/new" element={<NewComic />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>} />
      <Route path="/mycomics" element={
        <RequireAuth>
          <MyComics />
        </RequireAuth>} />
      <Route path="/favourites" element={
        <RequireAuth>  
          <Favourites />
        </RequireAuth>} />
      <Route path="/readed" element={
        <RequireAuth>
          <Readed />
        </RequireAuth>} />
      <Route path="/wanted" element={
        <RequireAuth>
          <Wanted />
        </RequireAuth>} />
    </Routes>
  );
}