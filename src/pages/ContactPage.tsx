import React from "react";
import Header from "../components/Header";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
    return (
        <div className="bg-jawaWhite text-jawaBlack dark:bg-jawaBlack dark:text-white transition-colors duration-300">
            <Header />
            <main className="min-h-screen pt-20">
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
