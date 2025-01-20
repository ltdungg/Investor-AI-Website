import "./PopupContainer.scss";

function PopupContainer(props) {
    return (
        props.isVisible && (
            <div
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                className={`popup-container ${props.className}`}
            >
                {props.children}
            </div>
        )
    );
}

export default PopupContainer;
