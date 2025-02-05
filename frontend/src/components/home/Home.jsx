import { memo } from "react";
import "./Home.scss";
import MyTeam from "./MyTeam/MyTeam";
import Feature from "./Feature/Feature";
import Introduce from "./Introduce/Introduce";
import OurView from "./OurView/OurView";
import FAQS from "./FAQS/FAQS";

function Home() {
    return (
        <>
            <Feature />
            <MyTeam />
            <Introduce />
            <OurView />
            <FAQS />
        </>
    );
}

export default memo(Home);
