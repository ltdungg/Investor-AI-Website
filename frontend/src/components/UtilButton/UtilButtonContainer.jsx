import style from "./UtilButtonContainer.module.scss";
import { memo } from "react";

function UtilButtonContainer(props) {
    return (
        <div className={style["utit-btn-container"]}>
            {props.children}
        </div>
    );
}

export default memo(UtilButtonContainer);
