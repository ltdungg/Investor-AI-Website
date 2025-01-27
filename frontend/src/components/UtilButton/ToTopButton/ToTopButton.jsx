import { FaArrowUp } from "react-icons/fa6";
import UtilButton from "../UtilButton";

import ScrollTo from "../../../utils/ScrollTo";

function ToTopButton() {
    return (
        <UtilButton
            onClick={() => {
                ScrollTo('.header');
            }}
        >
            <FaArrowUp />
        </UtilButton>
    );
}

export default ToTopButton;
