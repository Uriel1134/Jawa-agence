import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ServicesManager from "./pages/admin/ServicesManager";
import PortfolioManager from "./pages/admin/PortfolioManager";
import PricingManager from "./pages/admin/PricingManager";
import AboutManager from "./pages/admin/AboutManager";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

import ProjectDetails from "./pages/ProjectDetails";
import ServiceDetails from "./pages/ServiceDetails";

const Home: React.FC = () => {
  return (
    <div className="bg-jawaWhite text-jawaBlack dark:bg-jawaBlack dark:text-white transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />

            {/* Routes Admin Protégées */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="portfolio" element={<PortfolioManager />} />
                <Route path="pricing" element={<PricingManager />} />
                <Route path="about" element={<AboutManager />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
