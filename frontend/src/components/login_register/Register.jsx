import "./Register.css";
import LogoItem from "../LogoItem/LogoItem";
import { useEffect, useRef, useState } from "react";
import authenticationApi from "../../utils/api/AccountApi";
import { registerValid } from "../../utils/validate/Validate";

function Register() {
    const nameRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    useEffect(() => {
        nameRef.current.focus();
    }, []);

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
            <div className="register_content">
                <LogoItem className="register_logo" />
                <h1>Đăng ký</h1>
                <h1>Tài khoản mới</h1>
                <p>
                    Đã có tài khoản?
                    <b className="register_button"> Đăng nhập ngay</b>
                </p>
                <div className="block tablet_change"></div>
                <p className="">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
                <button>Tìm hiểu ngay</button>
            </div>
            <div className="register_page">
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
                    <p>Quên mật khẩu?</p>
                    <button className="register_button">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
