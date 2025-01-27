import { IoMdSearch } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import LogoItem from "../LogoItem/LogoItem";
import Tool from "./tool/Tool";
import Search from "./search/Search";
import "./Navbar.scss";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const breakPoint = 768;

    const [isSearch, setSearch] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isToolOpen, setToolOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= breakPoint
    );

    function handleSearch() {
        setSearch(!isSearch);
    }

    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth >= breakPoint);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="nav-containter">
            <LogoItem className="nav__logo" />
            <div className="nav__menu-btn">
                <div className="nav-mob-btn__search nav__item">
                    <IoMdSearch
                        onClick={handleSearch}
                        className="search-icon"
                    />
                </div>
                <div className="nav-mob-btn__func nav__item">
                    <GiHamburgerMenu
                        className="search-icon"
                        onClick={() => {
                            setVisible(!isVisible);
                        }}
                    />
                </div>
            </div>
            {(isLargeScreen || isVisible) && (
                <div className="nav__list">
                    <div className="nav__item">
                        <Link to="/">Trang chủ</Link>
                    </div>
                    <div className="nav__item">
                        <a href="./">Về chúng tôi</a>
                    </div>
                    <div
                        className="nav__item nav__tool"
                        onMouseEnter={() => {
                            if (window.innerWidth >= breakPoint) setToolOpen(true);
                        }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= breakPoint) setToolOpen(false);
                        }}
                        onClick={() => setToolOpen(!isToolOpen)}
                    >
                        <span>Công cụ</span>
                        <FaAngleDown />
                        <Tool
                            isToolopen={isToolOpen}
                            className="nav__tool-container"
                        />
                    </div>
                    <div className="nav__item">
                        <Link to="/contact">Liên hệ</Link>
                    </div>
                    <div className="nav__item nav__search">
                        <IoMdSearch
                            onClick={handleSearch}
                            className="search-icon"
                        />
                    </div>
                    <div className="nav__item sign-in nav__sign-btn">
                        <a href="./">Đăng nhập</a>
                    </div>
                    <div className="nav__item register nav__sign-btn">
                        <a href="./">Đăng ký</a>
                    </div>
                </div>
            )}
            <Search
                isvisible={isSearch}
                onClose={setSearch}
                className="nav__search-container"
            />
        </nav>
    );
}

export default memo(Navbar);
