import { memo } from "react";
import "./Introduce.scss";
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import { useNavigate } from 'react-router-dom';


function Introduce() {
    const navigate = useNavigate();
    const registerClick = () => {
        navigate('/register');
    };
    return (
        <div className="contact-introduce">
            <div className="introduce-side">
                <h2>DỰ ĐOÁN GIÁ CỔ PHIẾU CHÍNH XÁC, ĐẦU TƯ THÔNG MINH</h2>
                <p>
                    Dành cho những nhà đầu tư muốn tối ưu hóa lợi nhuận và giảm
                    thiểu rủi ro. Với công cụ của chúng tôi, bạn sẽ có cái nhìn
                    tổng quan về thị trường và nắm bắt cơ hội đầu tư hiệu quả.
                </p>
                <button onClick={registerClick}>Bắt đầu</button>
            </div>
            <div className="img-side">
                <img className="img1" src={image1} alt="ảnh giới thiệu" />
                <div className="circle"></div>
                <img className="img2" src={image2} alt="ảnh giới thiệu" />
            </div>
        </div>
    );
}

export default memo(Introduce);
