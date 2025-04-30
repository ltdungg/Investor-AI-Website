import LogoItem from "../LogoItem/LogoItem";
import "./Login.css";
import { useState, useEffect, useRef } from "react";
import authenticationApi from "../../utils/api/AccountApi";
import {useNavigate} from "react-router-dom";

function Login() {
    const emailOrPhoneRef = useRef();
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerClick = () => {
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        authenticationApi({
            url: "/login",
            data: {
                emailOrPhone,
                password,
            },
        });

        console.log("handle submit");
    };

    useEffect(() => {
        emailOrPhoneRef.current.focus();
    }, []);

    return (
        <div className="login_container">

            <div className="login_page">
                <h1>Đăng nhập</h1>
                <form onSubmit={handleSubmit} className="form_container">
                    <label htmlFor="email">Email hoặc Số điện thoại</label>
                    <br />
                    <input
                        ref={emailOrPhoneRef}
                        type="text"
                        value={emailOrPhone}
                        id="email"
                        name="email"
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password">Mật khẩu</label> <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>Quên mật khẩu?</p>
                    <button className="login_button">Đăng nhập</button>
                    <div className="register">
                        <p className="register-text">
                            Chưa có tài khoản?
                            <b onClick={registerClick}> Đăng ký ngay</b>
                        </p>
                    </div>
                </form>
            </div>
            <div className="login_content">
            </div>
        </div>
    );
}

export default Login;
