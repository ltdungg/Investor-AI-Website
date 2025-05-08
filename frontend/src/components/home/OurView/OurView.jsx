import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { BiExit } from "react-icons/bi";
import { LuCirclePlus } from "react-icons/lu";
import { memo } from "react";
import "./OurView.scss";

function OurView() {
    return (
        <div className="our-view">
            <div className="our-view__background"></div>
            <div className="our-view__content">
                <div className="our-view__container">
                    <Square bold="LỢI NHUẬN">NHÂN ĐÔI</Square>
                    <Square bold="REAL-TIME" className="bg-gray-100">
                         PHÂN TÍCH
                        <IoMdTime />
                    </Square>
                    <Rectangle
                        className="bg-yellow"
                        bold="TẦM NHÌN"
                        icon={<LuCirclePlus />}
                    >
                        Giúp nhà đầu tư đưa ra các quyết định đầu tư sáng suốt,
                        khác biệt.
                    </Rectangle>
                </div>
                <div className="our-view__container">
                    <Rectangle
                        className="bg-gray-200"
                        bold="ENTRY & EXIT"
                        icon={<BiExit />}
                    >
                        Quản trị rủi ro thua lỗ
                    </Rectangle>
                    <Square bold="X2" className="bg-gray-100">
                        CHẤT LƯỢNG
                    </Square>
                    <Square bold="CỔ PHIẾU">
                        KIẾM TIỀN TỪ <GrMoney />
                    </Square>
                </div>
            </div>
        </div>
    );
}

function Rectangle(props) {
    return (
        <div className={`${props.className} rectangle`}>
            <h3>
                {props.bold}
                {props.icon}
            </h3>
            <p>{props.children}</p>
        </div>
    );
}

function Square(props) {
    return (
        <div className={`${props.className} square`}>
            <p>{props.children}</p>
            <h3>{props.bold}</h3>
        </div>
    );
}

export default memo(OurView);
