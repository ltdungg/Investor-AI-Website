import { memo } from "react";
import style from "./UtilButton.module.scss";

function UtilButton(props) {
    return (
        <button
            className={`${style["util-btn"]} ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default memo(UtilButton);
