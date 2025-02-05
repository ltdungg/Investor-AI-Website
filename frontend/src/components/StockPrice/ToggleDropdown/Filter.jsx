import { FaChevronDown, FaCheck } from "react-icons/fa6";
import { memo, useEffect, useRef, useState } from "react";
import "./Filter.scss";

//muốn dùng phải thêm filterName, danh sách conditions, onClick
//có thể thêm tickAll và isOpen
function Filter(props) {
    const [isOpen, setOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(
        props.initialArray ? props.initialArray : []
    );

    // khi khởi tạo nếu muốn tick hết từ đầu thì set tickAll thành true
    const isTickAll = useRef(props.tickAll);
    const theConditions = useRef(props.conditions);
    useEffect(() => {        
        if (isTickAll.current) setActiveButton(theConditions.current);
    }, []);

    useEffect(() => {
        setOpen(props.isOpen ? true : false);
    }, [props.isOpen]);

    //hàm thực hiện tick hoặc bỏ tick
    function setTick(condition) {
        let arr;
        if (activeButton.includes(condition))
            arr = activeButton.filter((a) => a !== condition);
        else arr = [...activeButton, condition];

        setActiveButton(arr);
    }

    //hàm trả về một component là nút thêm bớt điều kiện
    function aCondition(condition) {
        return (
            <button
                onClick={() => {
                    props.onClick(condition); //khi click sẽ thực hiện hành động gì
                    setTick(condition); //thêm chực năng hiện đã tick hay không
                }}
                key={condition}
            >
                {/* hiển thị tick */}
                <div className="ticked">
                    {activeButton.includes(condition) && <FaCheck />}
                </div>
                <div className="filter-name">{condition}</div>
            </button>
        );
    }

    return (
        <div className="filter-dropdown">
            <button
                onClick={() => {
                    // có thể ghi đề mở mặc định
                    props.setOpen
                        ? props.setOpen(!props.isOpen)
                        : setOpen(!isOpen);
                }}
            >
                {props.filterName}
                <FaChevronDown className="arrow-down" />
            </button>
            {(isOpen || props.isOpen) && (
                <div className="dropdown-menu">
                    {props.conditions.map((condition) => aCondition(condition))}
                </div>
            )}
        </div>
    );
}

export default memo(Filter);
