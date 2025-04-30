import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { memo, useState } from "react";
import "./FAQS.scss";
import { useNavigate } from 'react-router-dom';

function FAQS() {
    const navigate = useNavigate();
    const contactClick = () => {
        navigate('/contact');
    };
    const faqsList = [
        {
            question: "InvestorAI dự đoán giá chứng khoán hoạt động như thế nào?",
            ans: "Website dự đoán giá chứng khoán thường thu thập dữ liệu từ nhiều nguồn như lịch sử giá cổ phiếu, báo cáo tài chính, tin tức kinh tế và thông tin thị trường, sau đó sử dụng công nghệ Big Data, trí tuệ nhân tạo (AI) và học máy (Machine Learning) để phân tích, nhận diện xu hướng và đưa ra các dự báo về giá cổ phiếu trong tương lai.",
        },
        {
            question: "Những tính năng nổi bật của website dự đoán giá chứng khoán là gì?",
            ans: "Các website này thường cung cấp các tính năng như phân tích dữ liệu lớn, dự đoán xu hướng giá cổ phiếu, phân tích kỹ thuật (biểu đồ nến, Bollinger Bands, RSI, MACD…), phân tích cơ bản tự động (P/E, EPS, ROE), cảnh báo rủi ro và cơ hội, quản lý danh mục đầu tư, cũng như báo cáo hiệu suất chi tiết cho từng cổ phiếu.",
        },
        {
            question: "Website dự đoán giá chứng khoán có thể hỗ trợ nhà đầu tư như thế nào?",
            ans: "Website giúp nhà đầu tư dễ dàng phân tích dữ liệu, nhận diện các tín hiệu quan trọng, dự báo xu hướng giá, đưa ra quyết định mua, bán hoặc giữ cổ phiếu, đồng thời đưa ra cảnh báo sớm về các biến động tiêu cực của thị trường. Ngoài ra, nhà đầu tư còn được hỗ trợ quản lý và tối ưu hóa danh mục đầu tư của mình",
        },
        {
            question: " Độ chính xác của dự đoán giá cổ phiếu trên website có cao không?",
            ans: "Độ chính xác của dự đoán phụ thuộc vào chất lượng dữ liệu đầu vào, thuật toán phân tích và các yếu tố thị trường. Các website uy tín sử dụng AI và dữ liệu lớn thường cho kết quả khá chính xác, tuy nhiên vẫn không thể đảm bảo tuyệt đối do thị trường chứng khoán chịu ảnh hưởng bởi nhiều yếu tố khó lường.",
        },
        {
            question: "InvestorAI dự đoán giá chứng khoán có miễn phí không, hay phải trả phí?",
            ans: "InvestorAI dự đoán giá chứng khoán hoàn toàn miễn phí cho người dùng. Bạn có thể truy cập và sử dụng tất cả các tính năng dự báo, phân tích mà không cần trả bất kỳ khoản phí nào.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    function setIndex(index) {
        setActiveIndex(activeIndex === index ? null : index);
    }

    return (
        <div className="contact-faqs">
            <div className="faqs__left-side">
                <h1>FAQS</h1>
                <p>
                    Nơi bạn có thể tìm được câu trả lời của những câu hỏi thường
                    gặp nhất
                </p>
                <button className="contact-btn" onClick={contactClick}>LIÊN HỆ</button>
            </div>
            <div className="faqs__right-side">
                {faqsList.map((item, index) => {
                    return (
                        <LiFAQS
                            question={item.question}
                            key={index}
                            isOpen={activeIndex === index}
                            onClick={() => setIndex(index)}
                        >
                            {item.ans}
                        </LiFAQS>
                    );
                })}
            </div>
        </div>
    );
}

function LiFAQS(props) {
    const Icon = props.isOpen ? AiOutlineClose : AiOutlinePlus;
    const className = `faqs-question ${props.isOpen ? "li-faqs-open" : ""}`;

    return (
        <div className="li-faqs">
            <h2 onClick={props.onClick} className={className}>
                {props.question}
                <Icon className="li-faqs__icon" />
            </h2>
            {props.isOpen && (
                <div className="faqs-ans">
                    <hr />
                    <p>{props.children}</p>
                </div>
            )}
        </div>
    );
}

export default memo(FAQS);
