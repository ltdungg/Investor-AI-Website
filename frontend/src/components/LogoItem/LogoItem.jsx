import logo from "../../assets/icons/Logo.png";
import LogoStyle from "./LogoItem.module.scss";

// chỉnh kích cỡ thì chỉnh font-size với height là được
function LogoItem({ className, onClick = () => {} }) {
  return (
    <div className={`${LogoStyle.LogoItem} ${className}`} onClick={onClick}>
      <img src={logo} alt="logo" />
      <div>INVESTORAI</div>
    </div>
  );
}

export default LogoItem;
