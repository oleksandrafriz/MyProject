import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from "./components/Write";
import Read from "./components/Read";
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CartoonDetails from "./components/CartoonDetails";

function App() {
  return (
    <>
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
