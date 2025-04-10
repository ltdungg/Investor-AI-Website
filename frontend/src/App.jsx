import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ContactButton from "./components/UtilButton/ContactButton/ContactButton";
import ToTopButton from "./components/UtilButton/ToTopButton/ToTopButton";
import UtilButtonContainer from "./components/UtilButton/UtilButtonContainer";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import Stock from "./components/stocksSearch/Stock";
import StockInfor from "./components/stock_information/stock_information";

function App() {
    return (
        <div className="App">
            {/* navbar ở đây này */}
            <Navbar />

            {/* đây là phần header */}
            <Routes>
                <Route index element={<Header />} />
                <Route path="*" element={<div className="header"></div>} />
            </Routes>

            {/* ghi nội dung chính vào đây */}
            <div className="content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/stocks" element={<Stock />} />
                    <Route path="/stocks/*" element={<StockInfor />} />
                </Routes>
            </div>

            {/* đây là footer */}
            <Footer />

            {/* mấy cái nút ở đây */}
            <UtilButtonContainer>
                <ToTopButton />
                <ContactButton />
            </UtilButtonContainer>
        </div>
    );
}

export default App;
