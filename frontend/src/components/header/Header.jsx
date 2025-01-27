import { FaAnglesDown } from "react-icons/fa6";

import Navbar from "../navbar/Navbar";
import "./Header.scss";
import ScrollTo from "../../utils/ScrollTo";

function Header() {
    return (
        <>
            <header className="header">
                <Navbar />
                <div className="slogan">
                    <h1>TECHNOLOGY</h1>
                    <p>Where your financial future is shaped.</p>
                </div>
                <button className="start-btn" onClick={() => {ScrollTo(".content")}}>
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
