import "./Header.scss";
import StartSlide from "./start_slide/StartSlide";

function Header() {
  return (
    <>
      <header className="header">
        <div className="slogan">
          <h1>Mastering the Stock Market</h1>
          <p>A Data-Driven Guide to Smarter Investing</p>
        </div>
        <StartSlide />
      </header>
    </>
  );
}

export default Header;
