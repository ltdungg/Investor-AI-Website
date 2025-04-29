import { FaCirclePlay } from "react-icons/fa6";
import ScrollTo from "../../../utils/ScrollTo";
import "./StartSlide.scss";

function StartSlide() {
  return (
    <div className="start-slider">
      <button
        className="start-btn"
        onClick={() => {
          ScrollTo(".content");
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
