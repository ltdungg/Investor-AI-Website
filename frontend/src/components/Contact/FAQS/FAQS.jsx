import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { memo, useState } from "react";
import "./FAQS.scss";

function FAQS() {
    const faqsList = [
        {
            question: "Nền tảng này hoạt động như thế nào?",
            ans: "Giải thích ngắn gọn về quy trình dự đoán, từ việc thu thập dữ liệu đến việc đưa ra kết quả.",
        },
        {
            question: "Nền tảng này hoạt động như thế nào?",
            ans: "Giải thích ngắn gọn về quy trình dự đoán, từ việc thu thập dữ liệu đến việc đưa ra kết quả.",
        },
        {
            question: "Nền tảng này hoạt động như thế nào?",
            ans: "Giải thích ngắn gọn về quy trình dự đoán, từ việc thu thập dữ liệu đến việc đưa ra kết quả.",
        },
        {
            question: "Nền tảng này hoạt động như thế nào?",
            ans: "Giải thích ngắn gọn về quy trình dự đoán, từ việc thu thập dữ liệu đến việc đưa ra kết quả.",
        },
        {
            question: "Nền tảng này hoạt động như thế nào?",
            ans: "Giải thích ngắn gọn về quy trình dự đoán, từ việc thu thập dữ liệu đến việc đưa ra kết quả.",
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
                <button className="contact-btn">LIÊN HỆ</button>
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
