import logo from "../../assets/icons/Logo.png";
import LogoStyle from "./LogoItem.module.scss";

function LogoItem(props) {
    return (
        <div className={`${LogoStyle.LogoItem} ${props.className}`}>
            <img src={logo} alt="logo" />
            INVESTORAI
        </div>
    );
}

export default LogoItem;
