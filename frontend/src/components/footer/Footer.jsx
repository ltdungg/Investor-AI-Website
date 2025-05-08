import { memo } from "react";
import LogoItem from "../LogoItem/LogoItem";
import "./Footer.scss";

import { IoIosMail } from "react-icons/io";
function Footer() {
    return (
        <footer className="footer">

            <section>
                <div className="left-side">
                    <div className="logo">
                        <LogoItem className="Logo" />
                        <p>Nơi tương lai tài chính của bạn được định hình.</p>
                    </div>
                    <div className="contact-informations">
                        <div className="infor">
                            <div>
                                <p className="p1">Phone:</p>
                                <p className="p2"> 0123456789</p>
                            </div>
                            <div>
                                <p className="p1">Address:</p>
                                <p className="p2"> Số 3 đường Cầu Giấy - Trường đại học Giao Thông Vận Tải</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="right-side">
                    <div className="item-list">
                        <div className="item">
                            <h3>Sản phẩm</h3>
                            <a href="./">Danh sách cổ phiếu</a>
                            <a href="./">Phân tích cổ phiếu</a>
                            <a href="./">Bộ lọc cổ phiếu</a>
                        </div>
                        <div className="item">
                            <h3>Công ty</h3>
                            <a href="./">Chính sách</a>
                            <a href="./">Điều khoản sử dụng</a>
                            <a href="./">Về chúng tôi</a>
                        </div>
                        <div className="item">
                            <h3>Hỗ trợ</h3>
                            <a href="./">Email</a>
                            <a href="./">Live chat</a>
                            <a href="./">Liên hệ</a>
                        </div>
                        <div className="item">
                            <h3>Mạng xã hội</h3>
                            <a href="./">Facebook</a>
                            <a href="./">Youtube</a>
                            <a href="./">Instagram</a>
                        </div>
                    </div>
                    <div className="subcribe">
                        <label htmlFor="sub">
                            <div className="mail-icon">
                                <IoIosMail />
                            </div>
                            <div className="title">
                                <h3>Đăng ký</h3>
                                <p>Nhận thông tin mới nhất</p>
                            </div>
                        </label>
                        <form action="">
                            <input
                                type="text"
                                name="subcribe"
                                id="sub"
                                placeholder="Email..."
                            />
                            <button type="submit">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </section>
            <hr />
            <footer>&#9400; InvestorAI</footer>
        </footer>
    );
}

export default memo(Footer);
