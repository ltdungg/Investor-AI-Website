import { IoMdSearch } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoItem from "../LogoItem/LogoItem";
import Tool from "./tool/Tool";
import Search from "./search/Search";
import "./Navbar.scss";
import userImage from "../../assets/images/user.png";
import { jwtTagStorage, urlBackend } from "../../utils/const/Global";
import axios from "axios";

function Navbar() {
    const breakPoint = 768;

    const [activeMenu, setActiveMenu] = useState(""); // State để quản lý menu đang mở
    const [isVisible, setVisible] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth > breakPoint
    );
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    const handleLogout = () => {
        const token = window.localStorage.getItem(jwtTagStorage);
        axios
            .post(
                `${urlBackend}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Lỗi khi đăng xuất:", error);
            });
    };

    useEffect(() => {
        function checkLoginStatus() {
            const token = window.localStorage.getItem(jwtTagStorage);
            if (!token) {
                setIsLoggedIn(false);
                return;
            }
            axios
                .get(`${urlBackend}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setIsLoggedIn(true);
                    setUserName(response.data.name);
                })
                .catch(() => setIsLoggedIn(false));
        }
        checkLoginStatus();
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth > breakPoint);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`nav-containter ${isScrolled ? "scrolled" : ""}`}>
            <LogoItem className="nav__logo" />
            <div className="nav__menu-btn">
                <div className="nav-mob-btn__search nav__item">
                    <IoMdSearch
                        onClick={() =>
                            setActiveMenu(activeMenu === "search" ? "" : "search")
                        }
                        className="search-icon"
                    />
                </div>
                <div className="nav-mob-btn__func nav__item">
                    <GiHamburgerMenu
                        className="search-icon"
                        onClick={() => {
                            setVisible(!isVisible);
                            setActiveMenu(""); // Đóng các menu khác
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
                        <Link to="/about-us">Về chúng tôi</Link>
                    </div>
                    <div
                        className="nav__item nav__tool"
                        onMouseEnter={() => {
                            if (window.innerWidth >= breakPoint)
                                setActiveMenu("tool");
                        }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= breakPoint)
                                setActiveMenu("");
                        }}
                        onClick={() =>
                            setActiveMenu(activeMenu === "tool" ? "" : "tool")
                        }
                    >
                        <span className="span-tool">Công cụ</span>
                        <FaAngleDown />
                        <Tool
                            isToolopen={activeMenu === "tool"}
                            className="nav__tool-container"
                        />
                    </div>
                    <div className="nav__item">
                        <Link to="/contact">Liên hệ</Link>
                    </div>
                    <div className="nav__item nav__search">
                        <IoMdSearch
                            onClick={() =>
                                setActiveMenu(activeMenu === "search" ? "" : "search")
                            }
                            className="search-icon"
                        />
                    </div>
                    {isLoggedIn ? (
                        <div
                            className="nav__item nav__user"
                            onMouseEnter={() => setActiveMenu("userMenu")}
                            onMouseLeave={() => setActiveMenu("")}
                        >
                            <img
                                src={userImage}
                                alt="User"
                                className="nav__user-image"
                                onClick={() =>
                                    setActiveMenu(
                                        activeMenu === "userMenu" ? "" : "userMenu"
                                    )
                                }
                            />
                            {activeMenu === "userMenu" && (
                                <div className="user-menu">
                                    <div className="user-menu__item-container user-menu__username">
                                        <div className="user-menu__item">
                                            {userName || "Tên người dùng"}
                                        </div>
                                    </div>
                                    <div className="user-menu__item-container">
                                        <Link
                                            to="/favorite-list"
                                            className="user-menu__item"
                                            onClick={() => setActiveMenu("")}
                                        >
                                            Cổ phiếu yêu thích
                                        </Link>
                                    </div>
                                    <div className="user-menu__item-container user-menu__item-container--logout">
                                        <div
                                            className="user-menu__item user-menu__logout"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="nav__item sign-in nav__sign-btn">
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                            <div className="nav__item register nav__sign-btn">
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        </>
                    )}
                </div>
            )}
            <Search
                isvisible={activeMenu === "search"}
                onClose={() => setActiveMenu("")}
                className="nav__search-container"
            />
        </nav>
    );
}

export default memo(Navbar);