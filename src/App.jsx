import "./App.css";
import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Footer from "./components/footer/Footer";
import ComiqueaRouter from "./router/ComiqueaRouter";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleResetSearch = () => setSearchTerm("");

  return (
    <div className="app-container">
      <Header onSearch={setSearchTerm} />
      <div className="app-main">
        <Aside onResetSearch={handleResetSearch} />
        <section className="app-content">
          <ComiqueaRouter searchTerm={searchTerm} />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;