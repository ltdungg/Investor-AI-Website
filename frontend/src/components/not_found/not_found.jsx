import { useNavigate } from "react-router-dom";
import "./not_found.scss";

function NotFound404() {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>404 Không tìm thấy trang</h1>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
      <div className="link-container">
        <div onClick={() => navigate("/")} className="more-link">
          Về trang chủ
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
