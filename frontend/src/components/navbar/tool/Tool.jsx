import {
    FaArrowTrendUp,
    FaMagnifyingGlassChart,
    FaFilterCircleDollar,
    FaRegNewspaper,
} from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { TbReportAnalytics } from "react-icons/tb";

import PopupContainer from "../PopupContainer/PobupContainer";
import "./Tool.scss";
import { memo } from "react";
import { Link } from "react-router-dom";

function Tool(props) {
    const toolItems = [
        {
            link: "/stocks",
            icon: FaArrowTrendUp,
            tool: "Cổ phiếu",
        },
        {
            link: "/analysis-report",
            icon: FaMagnifyingGlassChart,
            tool: "Phân tích cổ phiếu",
        },
        {
            link: "/industrySectors",
            icon: TiGroup,
            tool: "Nhóm ngành",
        },
        {
            link: "/4",
            icon: FaFilterCircleDollar,
            tool: "Bộ lọc cổ phiếu",
        },
        {
            link: "/news",
            icon: FaRegNewspaper,
            tool: "Tin tức",
        },
        {
            link: "/6",
            icon: TbReportAnalytics,
            tool: "Báo cáo phân tích",
        },
    ];

    return (
        <PopupContainer
            className={`tool-container ${props.className}`}
            isVisible={props.isToolopen}
        >
            <h3 className="tool-title">Công cụ</h3>
            <div className="tool-list">
                {toolItems.map((item) => {
                    return (
                        <Link
                            to={item.link}
                            className="tool-item"
                            key={item.link}
                        >
                            <item.icon className="tool__icon" />
                            {item.tool}
                        </Link>
                    );
                })}
            </div>
        </PopupContainer>
    );
}

export default memo(Tool);
