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

function Tool(props) {
    const toolItems = [
        {
            link: "./1",
            icon: FaArrowTrendUp,
            tool: "Cổ phiếu",
        },
        {
            link: "./2",
            icon: FaMagnifyingGlassChart,
            tool: "Phân tích cổ phiếu",
        },
        {
            link: "./3",
            icon: TiGroup,
            tool: "Nhóm ngành",
        },
        {
            link: "./4",
            icon: FaFilterCircleDollar,
            tool: "Bộ lọc cổ phiếu",
        },
        {
            link: "./5",
            icon: FaRegNewspaper,
            tool: "Tin tức",
        },
        {
            link: "./6",
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
                        <a
                            href={item.link}
                            className="tool-item"
                            key={item.link}
                        >
                            <item.icon className="tool__icon" />
                            {item.tool}
                        </a>
                    );
                })}
            </div>
        </PopupContainer>
    );
}

export default memo(Tool);
