import { FaLinkedinIn } from "react-icons/fa";
import "./MyTeam.scss";
import { memo } from "react";

function MyTeam() {
    const members = [
        {
            name: "Hồ Việt Tùng",
            linkedin: "./1",
            description:
                "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
        },
        {
            name: "Nguyễn Hải Hiếu",
            linkedin: "./2",
            description:
                "7+ years of experience in project management and team leadership. Strong organizational and communication skills",
        },
        {
            name: "Trần Tiến Sơn",
            linkedin: "./3",
            description:
                "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",
        },
        {
            name: "Lương Tiến Dũng",
            linkedin: "./4",
            description:
                "3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis",
        },
        {
            name: "Bùi Hải Đức",
            linkedin: "./5",
            description:
                "4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement",
        },
    ];

    return (
        <div className="introducing-members">
            <h2  id="about-section">Innovative</h2>
            <h1>MEET OUR TEAM</h1>
            <div className="members">
                {members.map((item) => {
                    return (
                        <Card
                            name={item.name}
                            linkedin={item.linkedin}
                            key={item.linkedin}
                        >
                            {item.description}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

function Card(props) {
    return (
        <div className={`member-card ${props.className}`}>
            <h3 className="member-name">
                <span>{props.name}</span>
                <a href={props.linkedin} className="linkedin-link">
                    <FaLinkedinIn />
                </a>
            </h3>
            <hr />
            <p className="member-description">{props.children}</p>
        </div>
    );
}

export default memo(MyTeam);
