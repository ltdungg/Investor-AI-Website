import {
    FaArrowTrendUp,
    FaMagnifyingGlassChart,
    FaRegNewspaper,
} from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { TbReportAnalytics } from "react-icons/tb";
import "./Feature.scss";
import { memo, useEffect, useState } from "react";
import TypingEffect from "../../../utils/TypingEffect";

function Feature() {
    const features = [
        {
            link: "./1",
            icon: FaArrowTrendUp,
            feature: "Cổ phiếu",
        },
        {
            link: "./2",
            icon: FaMagnifyingGlassChart,
            feature: "Cổ phiếu",
        },
        {
            link: "./3",
            icon: TiGroup,
            feature: "Nhóm ngành",
        },
        {
            link: "./5",
            icon: FaRegNewspaper,
            feature: "Tin tức",
        },
        {
            link: "./6",
            icon: TbReportAnalytics,
            feature: "Báo cáo",
        },
    ];
    return (
        <div className="introducing-features">
            <h2>Feature</h2>
            <h1>CÁC TÍNH NĂNG NỔI BẬT</h1>
            <div className="features">
                {features.map((feature) => {
                    return (
                        <FeatureBtn
                            href={feature.link}
                            key={feature.link}
                            icon={feature.icon}
                        >
                            <span>{feature.feature}</span>
                        </FeatureBtn>
                    );
                })}
            </div>
            <Introduce />
        </div>
    );
}

function FeatureBtn(props) {
    return (
        <a href={props.href} className="feature-item">
            <props.icon className="feature-item__icon" />
            {props.children}
        </a>
    );
}

function Introduce() {
    const listWord = [
        "Quản trị rủi ro tối ưu",
        "Đón đầu cơ hội đầu tư",
        "Giao dịch thuật toán",
        "Tín hiệu giao dịch chủ động",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % listWord.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [listWord.length]);

    return (
        <div className="introduce">
            <h3>
                Tự Động Hóa Dữ Liệu
                <div className="typing-area">
                    <TypingEffect text={listWord[index]} />
                </div>
            </h3>
            <p>Giải pháp tự động hóa phân tích & làm chủ sự thay đổi.</p>
        </div>
    );
}

export default memo(Feature);
