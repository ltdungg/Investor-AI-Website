import LogoItem from "../LogoItem/LogoItem";
import "./Login.css";
import { useState, useEffect, useRef } from "react";
import authenticationApi from "../../utils/api/AccountApi";

function Login() {
    const emailOrPhoneRef = useRef();
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    // const navigator = useNavigate();

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
            <div className="login_content">
                <LogoItem className="login_logo" />
                <h1>Đăng nhập</h1>
                <p className="tablet_change">Đăng nhập để tiếp tục sử dụng.</p>
                <p>
                    Chưa có tài khoản?{" "}
                    <b className="register_button"> Đăng ký ngay</b>
                </p>
                <div className="block tablet_change"></div>
                <p className="">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
                <button>Tìm hiểu ngay</button>
            </div>
            <div className="login_page">
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
                </form>
            </div>
        </div>
    );
}

export default Login;
