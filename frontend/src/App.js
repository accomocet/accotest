import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHouses from "./screens/MyHouses/MyHouses";
import AllHouses from "./screens/AllHouses/AllHouses"; // Import AllHouses component
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateHouse from "./screens/CreateHouse/CreateHouse";
import SingleHouse from "./screens/SingleHouse/SingleHouse";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createhouse" element={<CreateHouse />} />
          <Route path="/house/:id" element={<SingleHouse />} />
          <Route path="/myhouses" element={<MyHouses search={search} />} />
          <Route
            path="/allhouses"
            element={<AllHouses search={search} />}
          />{" "}
          {/* Add AllHouses route */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
