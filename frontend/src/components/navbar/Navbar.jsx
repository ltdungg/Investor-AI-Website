import { IoMdSearch } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoItem from "../LogoItem/LogoItem";
import Tool from "./tool/Tool";
import Search from "./search/Search";
import "./Navbar.scss";
import userImage from "../../assets/images/user.jpg";
import { jwtTagStorage, urlBackend } from "../../utils/const/Global";
import axios from "axios";

function Navbar() {
    const breakPoint = 768;

    const [isSearch, setSearch] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isToolOpen, setToolOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth > breakPoint
    );
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // const handleLogout = () => {
    //     window.localStorage.removeItem(jwtTagStorage);
    //     window.location.reload();
    // };
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userName, setUserName] = useState("");

    function handleSearch() {
        setSearch(!isSearch);
    }

    useEffect(() => {
        function checkLoginStatus() {
            const token = window.localStorage.getItem(jwtTagStorage);
            if (!token) {
                setIsLoggedIn(false);
                return;
            }
            // const response = api.get("/user/1").then(()=>{setIsLoggedIn(true)}).catch(()=>{setIsLoggedIn(false)})
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
                        <Link to="/about-us">Về chúng tôi</Link>
                    </div>
                    <div
                        className="nav__item nav__tool"
                        onMouseEnter={() => {
                            if (window.innerWidth >= breakPoint)
                                setToolOpen(true);
                        }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= breakPoint)
                                setToolOpen(false);
                        }}
                        onClick={() => setToolOpen(!isToolOpen)}
                    >
                        <span className="span-tool">Công cụ</span>
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
                    {isLoggedIn ? (
                        <div className="nav__item nav__user">
                            <img
                                src={userImage}
                                alt="User"
                                className="nav__user-image"
                                onClick={handleUserMenuToggle}
                            />
                            {isUserMenuOpen && (
                                <div className="user-menu">
                                <div className="user-menu__item-container user-menu__username">
                                    <div className="user-menu__item">
                                        {userName || "Tên người dùng"}
                                    </div>
                                </div>
                                <div className="user-menu__item-container">
                                    <Link to="/favorite-list" className="user-menu__item">
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
                isvisible={isSearch}
                onClose={setSearch}
                className="nav__search-container"
            />
        </nav>
    );
}

export default memo(Navbar);
