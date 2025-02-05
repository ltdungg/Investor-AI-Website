import "./Register.css"
import LogoItem from "../LogoItem/LogoItem";

function Register(){
    return(
        <>
            <div className="register_container">
                <div className="register_content">
                    {/* <LogoItem className="register_logo" /> */}
                    <h1>Đăng ký</h1>
                    <h1>Tài khoản mới</h1>
                    <p>Đã có tài khoản?<b className="register_button"> Đăng nhập ngay</b></p>
                    <div className="block tablet_change">

                    </div>
                    <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button>Tìm hiểu ngay</button>
                </div>
                <div className="register_page">
                    <form action="" className="form_container">
                        <label htmlFor="name">Họ và tên</label><br></br>
                        <input type="text" id="name" name="name" /> <br></br>
                        <label htmlFor="email">Email</label><br></br>
                        <input type="text" id="email" name="email" /> <br></br>
                        <label htmlFor="phone_number">Số điện thoại</label><br></br>
                        <input type="text" id="phone_number" name="phone_number" value={"+84"} /> <br></br>
                        <div className="row">
                            <div>
                                <label htmlFor="passworkd">Mật khẩu</label> <br></br>
                                <input type="password" id="password" name="password"/>
                            </div>
                            <div>
                                <label htmlFor="passworkd">Nhập lại mật khẩu</label> <br></br>
                                <input type="password" id="password" name="password"/>
                            </div>
                        </div>
                        <p>Quên mật khẩu?</p>
                        <button className="register_button">Đăng nhập</button>
                    </form>
                    
                </div>
            </div>
        </>
    );
}

export default Register;