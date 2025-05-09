import { IoLogoFacebook } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import "./Contact.scss";

function Contact() {
    return (
        <div className="contact">
            <div className="contact__left-side">
                <h1>Liên hệ</h1>
                <h2>với InvestorAI Team</h2>
                <p>
                    InvestorAI luôn sẵn sàng hỗ trợ và giải đáp vấn đề của bạn
                    bất cứ lúc nào. Bạn có thể liên hệ với InvestorAI thông qua
                    biểu mẫu bên cạnh...
                </p>
                <div className="contact-by-social-media">
                    <div>
                        ...hoặc liên hệ trực tiếp với InvestorAI ngay tại đây:
                    </div>
                    <a href="./" className="icon">
                        <IoLogoFacebook />
                    </a>
                    <a href="./" className="icon">
                        <IoIosMail />
                    </a>
                </div>
                <p>
                    Hotline: <strong>+84 97 679 51 13</strong>
                </p>
            </div>
            <div className="contact__right-side">
                <h3>Bạn cần hỗ trợ? Để lại lời nhắn tại đây!</h3>
                <form action="" className="contact__form">
                    <div className="user-infor">
                        <Field id="fullname" label="Họ và tên">
                            Vui lòng nhập tên của bạn
                        </Field>
                        <Field type="email" id="email" label="Email">
                            Vui lòng nhận email của bạn...
                        </Field>
                    </div>

                    <Field id="topic" label="Chủ đề">
                        Bạn cần hỗ trợ vấn đề gì?
                    </Field>
                    <div className="contact__field">
                        <label htmlFor="problem">Lời nhắn của bạn</label>
                        <textarea
                            name="problem"
                            id="problem"
                            placeholder="Hãy nhắn cụ thể vấn đề bạn cần hỗ trợ..."
                        ></textarea>
                    </div>
                    <input type="submit" value="Gửi tin nhắn" />
                </form>
            </div>
        </div>
    );
}

function Field({ type = "text", id, children, label }) {
    return (
        <div className="contact__field">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={id} id={id} placeholder={children} />
        </div>
    );
}

export default Contact;
