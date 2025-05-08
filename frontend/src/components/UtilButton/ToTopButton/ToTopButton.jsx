import { FaArrowUp } from "react-icons/fa6";
import UtilButton from "../UtilButton";
import { scroller, animateScroll } from "react-scroll";

function ToTopButton() {
    return (
        <UtilButton
            onClick={() => {
                // Scroll tới phần tử có class 'header' nếu có, nếu không thì về đầu trang
                const header = document.querySelector('.header');
                if (header && header.id) {
                    scroller.scrollTo(header.id, {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: -10, // chỉnh lại nếu header bị che
                    });
                } else {
                    animateScroll.scrollToTop({ duration: 600, smooth: true });
                }
            }}
        >
            <FaArrowUp />
        </UtilButton>
    );
}

export default ToTopButton;
