import "./Register.css";
import LogoItem from "../LogoItem/LogoItem";
import { useEffect, useRef, useState } from "react";
import authenticationApi from "../../utils/api/AccountApi";
import { registerValid } from "../../utils/validate/Validate";
import { useNavigate } from 'react-router-dom';

function Register() {
    const nameRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const loginClick = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registerValid(e.target)) {
            return;
        }
        authenticationApi({
            url: "/sign-up",
            data: {
                name,
                email,
                phone,
                password,
            },
        });

        console.log("handle submit!");
    };

    return (
        <div className="register_container">
            <div className="register_page">
                <h1>Đăng ký tài khoản</h1>
                <form onSubmit={handleSubmit} className="form_container">
                    <label htmlFor="name">Họ và tên</label>
                    <br />
                    <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />{" "}
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />{" "}
                    <br />
                    <label htmlFor="phone">Số điện thoại</label>
                    <br />
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="+84"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />{" "}
                    <br />
                    <div className="row">
                        <div>
                            <label htmlFor="passworkd">Mật khẩu</label> <br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="repassword">Nhập lại mật khẩu</label>{" "}
                            <br />
                            <input
                                type="password"
                                id="repassword"
                                name="repassword"
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="register_button">Đăng ký</button>
                </form>
                <p>
                    Đã có tài khoản?
                    <b className="login_button" onClick={loginClick}> Đăng nhập ngay</b>
                </p>
            </div>
            <div className="register_content">
            </div>
        </div>
    );
}

export default Register;
