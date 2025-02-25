import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CartoonDetails from "./components/CartoonDetails";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Зрозуміло"
        cookieName="myCookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          color: "#4e503b",
          fontSize: "15px",
          fontWeight: "bold",
          borderRadius: "2px",
        }}
        expires={1}
      >
        Цей сайт використовує cookies для покращення вашого досвіду. Продовжуючи
        використовувати сайт, ви погоджуєтесь з нашою{" "}
        <a href="/privacy-policy" style={{ color: "#fff" }}>
          Політикою конфіденційності
        </a>
        .
      </CookieConsent>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/cartoon/:id" element={<CartoonDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
