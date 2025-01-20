
import { FaAnglesDown } from "react-icons/fa6";

import Navbar from "../navbar/Navbar";
import "./Header.scss";

function Header() {
    function scrollToContent() {
        const content = document.querySelector(".content");
        if (content) {
            window.scrollTo({
                top: content.offsetTop,
                behavior: "smooth",
            });
        }
    }

    return (
        <>
            <header className="header">
                <Navbar />
                <div className="slogan">
                    <h1>TECHNOLOGY</h1>
                    <p>Where your financial future is shaped.</p>
                </div>
                <button className="start-btn" onClick={scrollToContent}>
                    <div>Bắt đầu</div>
                    <div className="start-btn__arrow">
                        <FaAnglesDown />
                    </div>
                </button>
            </header>
        </>
    );
}

export default Header;
