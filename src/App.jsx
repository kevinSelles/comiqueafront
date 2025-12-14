import "./App.css";
import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Footer from "./components/footer/Footer";
import ComiqueaRouter from "./router/ComiqueaRouter";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useAuth();

  const handleResetSearch = () => setSearchTerm("");

  if (loading) return null;

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