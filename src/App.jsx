import "./App.css";
import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Footer from "./components/footer/Footer";
import ComiqueaRouter from "./router/ComiqueaRouter";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import AlertModal from "./components/modalAlertConfirm/AlertModal";
import ConfirmModal from "./components/modalAlertConfirm/ConfirmModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useAuth();

  const handleResetSearch = () => setSearchTerm("");

  if (loading) return null;

  return (
    <div className="app-container">
      <AlertModal />
      <ConfirmModal />
      <Header onSearch={setSearchTerm} />
      <div className="app-main">
        <Aside onResetSearch={handleResetSearch} />
        <section className="app-content">
          <ComiqueaRouter 
            searchTerm={searchTerm}
            onResetSearch={handleResetSearch}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;