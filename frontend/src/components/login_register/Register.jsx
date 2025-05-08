import "./Register.css";
import LogoItem from "../LogoItem/LogoItem";
import { useEffect, useRef, useState } from "react";
import authenticationApi from "../../utils/api/AccountApi";
import { isValidEmail, isValidPhone, isValidPassword } from "../../utils/validate/Validate";
import { useNavigate } from "react-router-dom";

function Register() {
    const nameRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
    const navigate = useNavigate();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const loginClick = () => {
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            setErrorMessage("Họ và tên không được để trống.");
            return;
        }
        if (!email) {
            setErrorMessage("Email không được để trống.");
            return;
        }
        if (!isValidEmail(email)) {
            setErrorMessage("Email không hợp lệ.");
            return;
        }
        if (!phone) {
            setErrorMessage("Số điện thoại không được để trống.");
            return;
        }
        if (!isValidPhone(phone)) {
            setErrorMessage("Số điện thoại không hợp lệ.");
            return;
        }
        if (!password) {
            setErrorMessage("Mật khẩu không được để trống.");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.");
            return;
        }
        if (password !== repassword) {
            setErrorMessage("Mật khẩu nhập lại không khớp.");
            return;
        }

        try {
            const response = await authenticationApi({
                url: "/sign-up",
                method: "POST",
                data: {
                    name,
                    email,
                    phone,
                    password,
                },
            });

            if (response.success) {
                setErrorMessage("Đăng ký thành công!");
                navigate("/login"); 
            } else {
                setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
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
                    />
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                    />
                    <br />
                    <div className="row">
                        <div>
                            <label htmlFor="password">Mật khẩu</label>
                            <br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="repassword">Nhập lại mật khẩu</label>
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
                    {errorMessage && <p className="error_message">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
                    <button className="register_button">Đăng ký</button>
                </form>
                <p>
                    Đã có tài khoản?
                    <b className="login_button" onClick={loginClick}>
                        {" "}
                        Đăng nhập ngay
                    </b>
                </p>
            </div>
            <div className="register_content"></div>
        </div>
    );
}

export default Register;