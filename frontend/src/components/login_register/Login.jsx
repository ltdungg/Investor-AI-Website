import "./Login.css"
import logo from "../../assets/icons/Logo.png";
import UtilButtonContainer from "../UtilButton/UtilButtonContainer"
import ContactButton from "../UtilButton/ContactButton/ContactButton";
function Login(){
    return(
        <>
            <div className="login_container">
                <div className="login_content">
                    <div className="login_logo">
                        <img src={logo} alt="logo" />
                        <p className="logo_name">INVESTORAI</p>
                    </div>
                    <h1>Đăng nhập</h1>
                    <p className="tablet_change">Đăng nhập để tiếp tục sử dụng.</p>
                    <p>Chưa có tài khoản? <b className="register_button"> Đăng ký ngay</b></p>
                    <div className="block tablet_change">

                    </div>
                    <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button>Tìm hiểu ngay</button>
                </div>
                <div className="login_page">
                    <form action="" className="form_container">
                        <label htmlFor="email">Email hoặc Số điện thoại</label><br></br>
                        <input type="text" id="email" name="email" /> <br></br>
                        <label htmlFor="passworkd">Mật khẩu</label> <br></br>
                        <input type="text" id="password" name="password" />
                        <p>Quên mật khẩu?</p>
                        <button className="login_button">Đăng nhập</button>
                    </form>
                    
                </div>
                <UtilButtonContainer>
                    <ContactButton />
                </UtilButtonContainer>
            </div>
        </>
    );
}

export default Login;