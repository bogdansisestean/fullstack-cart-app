import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
//Components
import NavBar from "./components/Navbar";
import BackDrop from "./components/BackDrop";
import SideDrawer from "./components/SideDrawer";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const sideDropShowHandler = () => {
    setSideToggle(true);
  };
  const sideDropHideHandler = () => {
    setSideToggle(false);
  };

  return (
    <Router>
      <NavBar click={sideDropShowHandler} />
      <SideDrawer show={sideToggle} click={sideDropHideHandler} />
      <BackDrop show={sideToggle} click={sideDropHideHandler} />
      <main>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/product/:id" element={<ProductScreen />} />
          <Route exact path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
