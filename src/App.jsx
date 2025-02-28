import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CartoonDetails from "./components/CartoonDetails";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LicenseFile from "./components/LicenseFile";
import CardItem from "./components/CardItem";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/**
 * Головний компонент застосунку.
 * Налаштовує маршрутизацію, відображає навігацію, основний контент та cookie popup.
 *
 * @returns {JSX.Element} Головний компонент React-додатка.
 */
function App() {
  /**
   * Стан для збереження інформації про прийняття cookies.
   * @type {boolean}
   */
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  /**
   * Обробник прийняття cookies.
   * Зберігає cookies у браузері та оновлює стан.
   *
   * @returns {void}
   */
  const handleAccept = () => {
    setCookiesAccepted(true);

    // Збереження cookies
    Cookies.set("necessaryCookies", "true", { expires: 1 });

    console.log("Cookies прийняті та збережені.");
  };

  /**
   * Обробник відхилення cookies.
   * Видаляє cookies з браузера та оновлює стан.
   *
   * @returns {void}
   */
  const handleDecline = () => {
    setCookiesAccepted(false);

    // Видалення cookies
    Cookies.remove("necessaryCookies");
    console.log("Cookies видалені.");
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/cartoon/:id" element={<CartoonDetails />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<LicenseFile />} />
          <Route path="/card_item" element={<CardItem />} />
          <Route
            path="/swagger"
            element={<SwaggerUI url="./swagger/swagger.json" />}
          />
        </Routes>

        <CookieConsent
          location="bottom"
          buttonText="Прийняти всі"
          declineButtonText="Відхилити всі"
          enableDeclineButton
          onAccept={handleAccept}
          onDecline={handleDecline}
          cookieName="myCookieConsent"
          style={{ background: "#2B373B" }}
          buttonStyle={{
            color: "#4e503b",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "2px",
          }}
          declineButtonStyle={{
            color: "#fff",
            fontSize: "15px",
            background: "#655317",
            fontWeight: "bold",
            borderRadius: "2px",
          }}
          expires={1}
        >
          Цей сайт використовує cookies для покращення вашого досвіду.
          Продовжуючи використовувати сайт, ви погоджуєтесь з нашою{" "}
          <Link to="/privacy_policy" style={{ color: "#fff" }}>
            Політикою конфіденційності
          </Link>
          .
        </CookieConsent>
      </Router>
    </>
  );
}

export default App;
