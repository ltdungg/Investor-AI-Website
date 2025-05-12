import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Hàm easing cho hiệu ứng mượt
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Hàm scroll mượt tới vị trí mong muốn
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // Bỏ dấu #
      setTimeout(() => {
        const el = document.getElementById(lastHash.current);
        if (el) {
          const yOffset = -70; // Điều chỉnh nếu có header cố định
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          smoothScrollTo(y, 600); // Thời gian scroll 600ms
          lastHash.current = "";
        }
      }, 100); // Delay để đảm bảo phần tử đã render xong
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor;
