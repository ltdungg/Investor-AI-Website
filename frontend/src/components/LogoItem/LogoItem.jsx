import logo from "../../assets/icons/Logo.png";
import LogoStyle from "./LogoItem.module.scss";

// chỉnh kích cỡ thì chỉnh font-size với height là được
function LogoItem(props) {
    return (
        <div className={`${LogoStyle.LogoItem} ${props.className}`}>
            <img src={logo} alt="logo" />
            <div>INVESTORAI</div>
        </div>
    );
}

export default LogoItem;
