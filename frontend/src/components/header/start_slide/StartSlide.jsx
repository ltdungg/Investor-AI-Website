import { FaCirclePlay } from "react-icons/fa6";
import { scroller } from "react-scroll";
import "./StartSlide.scss";

function StartSlide() {
  return (
    <div className="start-slider">
      <button
        className="start-btn"
        onClick={() => {
          scroller.scrollTo("content", {
            duration: 800, // thời gian hiệu ứng (ms)
            delay: 0,
            smooth: "easeInOutQuart", // kiểu hiệu ứng
            offset: -20, // nếu muốn căn chỉnh vị trí scroll
          });
        }}
      >
        <div className="start-btn__arrow">
          <FaCirclePlay className="start-icon" />
          <h2>Start now</h2>
        </div>
      </button>
    </div>
  );
}

export default StartSlide;
