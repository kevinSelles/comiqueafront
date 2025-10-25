import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Comics from "../pages/Comics";
import News from "../pages/News";
import Contact from "../pages/Contact";

export default function ComiqueaRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comics" element={<Comics />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}