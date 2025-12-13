import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Process from "./components/Process";
import TrustedBy from "./components/TrustedBy";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ServicesManager from "./pages/admin/ServicesManager";
import PortfolioManager from "./pages/admin/PortfolioManager";
import PricingManager from "./pages/admin/PricingManager";
import AboutManager from "./pages/admin/AboutManager";
import TrustedManager from "./pages/admin/TrustedManager";
import ProcessManager from "./pages/admin/ProcessManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

import ProjectDetails from "./pages/ProjectDetails";
import ServiceDetails from "./pages/ServiceDetails";
import ContactPage from "./pages/ContactPage";
import TeamMemberDetails from "./pages/TeamMemberDetails";
import TeamPage from "./pages/TeamPage";
import TeamManager from "./pages/admin/TeamManager";
import NewsletterManager from "./pages/admin/NewsletterManager";
import FAQManager from "./pages/admin/FAQManager";
import FooterManager from "./pages/admin/FooterManager";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import CommentsManager from "./pages/admin/CommentsManager";

import ScrollBackground from "./components/ScrollBackground";
import StructuredData from "./components/StructuredData";

const Home: React.FC = () => {
  return (
    <div className="bg-transparent text-jawaBlack dark:text-white transition-colors duration-300 relative min-h-screen">
      <StructuredData type="website" />
      <ScrollBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <TrustedBy />
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:id" element={<TeamMemberDetails />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />

            {/* Routes Admin Protégées */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="portfolio" element={<PortfolioManager />} />
                <Route path="pricing" element={<PricingManager />} />
                <Route path="about" element={<AboutManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="newsletter" element={<NewsletterManager />} />
                <Route path="faq" element={<FAQManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="trusted" element={<TrustedManager />} />
                <Route path="process" element={<ProcessManager />} />
                <Route path="process" element={<ProcessManager />} />
                <Route path="footer" element={<FooterManager />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="blog/new" element={<BlogEditor />} />
                <Route path="blog/edit/:id" element={<BlogEditor />} />
                <Route path="comments" element={<CommentsManager />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
