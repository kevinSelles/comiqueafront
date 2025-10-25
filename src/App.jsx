import "./App.css";
import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Footer from "./components/footer/Footer";
import ComiqueaRouter from "./router/ComiqueaRouter";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-main">
        <Aside />
        <section className="app-content">
          <ComiqueaRouter />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;