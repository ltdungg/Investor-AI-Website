import { memo } from "react";
import "./Contact.scss";
import Introduce from "./Introduce/Introduce";
import OurView from "./OurView/OurView";
import FAQS from "./FAQS/FAQS";

function Contact() {
    return (
        <>
            <Introduce />
            <OurView />
            <FAQS />
        </>
    );
}

export default memo(Contact);
