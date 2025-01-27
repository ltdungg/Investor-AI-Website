import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ContactButton from "./components/UtilButton/ContactButton/ContactButton";
import ToTopButton from "./components/UtilButton/ToTopButton/ToTopButton";
import UtilButtonContainer from "./components/UtilButton/UtilButtonContainer";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route index element={<Header />} />
                <Route path="*" element={<div className="header"></div>} />
            </Routes>
            <div className="content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
            <UtilButtonContainer>
                <ToTopButton />
                <ContactButton />
            </UtilButtonContainer>
        </div>
    );
}

export default App;
