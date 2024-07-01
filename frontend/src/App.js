import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHouses from "./screens/MyHouses/MyHouses";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateHouse from "./screens/CreateHouse/CreateHouse";
import SingleHouse from "./screens/SingleHouse/SingleHouse";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createhouse" element={<CreateHouse />} />
          <Route path="/house/:id" element={<SingleHouse />} />
          <Route path="/MyHouses" element={<MyHouses search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
