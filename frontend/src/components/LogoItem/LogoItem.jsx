import logo from "../../assets/icons/Logo.png";
import LogoStyle from "./LogoItem.module.scss";

function LogoItem(props) {
    return (
        <div className={`${LogoStyle.LogoItem} ${props.className}`}>
            <img src={logo} alt="logo" />
            <div>INVESTORAI</div>
        </div>
    );
}

export default LogoItem;
