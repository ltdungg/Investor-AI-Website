import "./loading.scss";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="loading-text">Đang tải...</div>
    </div>
  );
}

export default Loading;
