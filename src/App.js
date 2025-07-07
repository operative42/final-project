import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HighLightSection from "./components/HighlightSection";
import '@fontsource-variable/markazi-text';
import "@fontsource/karla";
import Testimonial from "./components/Testimonial";
import About from "./components/About";
import Footer from "./components/Footer";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </div>
  );
}

// Ce composant représente la page d'accueil
function MainPage() {
  return (
    <>
      <Header />

      <section id="home">
        <HeroSection />
      </section>

      <section id="menu">
        <HighLightSection />
      </section>

      <section>
        <Testimonial />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="order">
        <Footer />
      </section>
    </>
  );
}
