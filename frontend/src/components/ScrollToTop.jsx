import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Thêm hiệu ứng cuộn mượt
    });
  }, [pathname]); // Chạy lại khi pathname thay đổi

  return null;
}

export default ScrollToTop;
