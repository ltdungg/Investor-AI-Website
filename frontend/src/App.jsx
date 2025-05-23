import { Route, Routes, useLocation } from "react-router-dom";
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
import Favorite from "./containers/favorite_stock/favorite";
import NotFound404 from "./components/not_found/not_found";
import AnalysisReport from "./components/analysis_report/analysis_report";
import IndustrySectors from "./components/industrySectors/industrySectors";
import News from "./components/news/news";
import ScrollToTop from "./components/ScrollToTop";
import AnalysisTemplate from "./components/analysis_report/analysis/AnalysisTemplate";
import StockOverview from "./components/stock_information/StockOverview";
import StockFinancial from "./components/stock_information/StockFinancial";
import StockPriceHistory from "./components/stock_information/StockPriceHistory";
import ScrollToAnchor from "./components/UtilButton/ScrollToAnchor.jsx";

function App() {
    const location = useLocation();
    const isAuthRoute = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="App">
            <ScrollToTop />
            <ScrollToAnchor />
            {/* Navbar chỉ hiển thị nếu không phải trang login/register */}
            {!isAuthRoute && <Navbar />}

            {/* Header chỉ hiển thị nếu không phải trang login/register */}
            {!isAuthRoute && (
                <Routes>
                    <Route index element={<Header />} />
                    <Route path="*" element={<div className="header"></div>} />
                </Routes>
            )}

            {/* Nội dung chính */}
            <div className="content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/stocks" element={<Stock />} />
                    <Route path="/stocks/:symbol" element={<StockInfor />} />
                    <Route path="/favorite-list/*" element={<Favorite />} />
                    <Route path="/analysis-report" element={<AnalysisReport />} />
                    <Route path="/analysis/:symbol" element={<AnalysisTemplate />} />
                    <Route path="/industrySectors" element={<IndustrySectors />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/*" element={<NotFound404 />} />
                    <Route path="/stocks/:symbol/financial" element={<StockFinancial />} />
                    <Route path="/stocks/:symbol/priceHistory" element={<StockPriceHistory />} />
                </Routes>
            </div>

            {/* Footer và nút chỉ hiển thị nếu không phải trang login/register */}
            {!isAuthRoute && <Footer />}
            {!isAuthRoute && (
                <UtilButtonContainer>
                    <ToTopButton />
                    <ContactButton />
                </UtilButtonContainer>
            )}
        </div>
    );
}

export default App;
