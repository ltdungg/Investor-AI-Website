import { memo, useState } from "react";

import StockPriceTable from "./StockPriceTable/StockPriceTable";
import StockPriceTr from "./StockPriceTable/StockPriceTr";
import Filter from "./ToggleDropdown/Filter";

import IncludesIgnoreCase from "../../utils/IncludesIgnoreCase";
import CompareToIgnoreCase from "../../utils/CompareToIgnoreCase";
import "./StockPrice.scss";

function StockPrice() {
    const stockPrice = [
        {
            id: "VCB",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: -0.54,
            platform: "HOSE",
            industry: "Tài chính",
        },
        {
            id: "SCB",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0.54,
            platform: "UPCOM",
            industry: "Tài chính",
        },
        {
            id: "VDM",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0,
            platform: "HNX",
            industry: "Công nghệ",
        },
        {
            id: "LNM",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0,
            platform: "HNX",
            industry: "Công nghệ",
        },
        {
            id: "VMM",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0,
            platform: "UPCOM",
            industry: "Công nghệ",
        },
        {
            id: "KMM",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0,
            platform: "HOSE",
            industry: "Công nghiệp",
        },
        {
            id: "KJH",
            name: "công ty cổ phần vietcombank",
            capitalization: 513637,
            price: 91900,
            fluctuation: 0,
            platform: "HNX",
            industry: "Công nghệ",
        },
    ];

    const [platformCondition, setPlatformCondition] = useState([
        "UPCOM",
        "HNX",
        "HOSE",
    ]);
    const [industryCondition, setIndustryCondition] = useState([]);
    const [curFilter, setCurFilter] = useState(null);

    const filters = [
        {
            filterName: "Sàn",
            conditions: ["UPCOM", "HNX", "HOSE"],
            onClick: (condition) => setCondition(condition),
            initialArray: platformCondition,
            tickAll: true,
        },
        {
            filterName: "Nhóm ngành",
            conditions: [
                "Tài chính",
                "Công nghệ",
                "Công nghiệp",
                "Năng lượng",
                "Hàng hóa không thiết yếu",
                "Hàng hóa thiết yếu",
                "Tiện ích",
                "Bất động sản",
                "Học thuật và giáo dục",
            ],
            onClick: (condition) => industry(condition),
            tickAll: false,
        },
    ];

    //thàm thêm bớt điều kiện cho sàn
    function setCondition(condition) {
        let arr;
        if (platformCondition.includes(condition))
            arr = platformCondition.filter((a) => a !== condition);
        else arr = [...platformCondition, condition];

        setPlatformCondition(arr);
    }

    //hàm thêm bớt điều kiện cho nhóm ngành
    function industry(condition) {
        let arr;
        if (IncludesIgnoreCase(industryCondition, condition))
            arr = industryCondition.filter((a) =>
                CompareToIgnoreCase(a, condition)
            );
        else arr = [...industryCondition, condition];

        setIndustryCondition(arr);
    }

    //trả lại dữ liệu sau khi được lọc
    function stockAfterFilter() {
        return stockPrice.filter(
            (stock) =>
                platformCondition.includes(stock.platform) &&
                (industryCondition.length === 0 ||
                    IncludesIgnoreCase(industryCondition, stock.industry))
        );
    }

    //đièu khiển đóng mở filter
    function setOpen(filterName) {
        setCurFilter(curFilter === filterName ? null : filterName);
    }

    return (
        <div className="stock-price-container">
            <header className="stock-price__header">
                <h2>Bảng giá cổ phiếu</h2>
                <div className="stock-price__filters">
                    {filters.map((filter) => (
                        <Filter
                            key={filter.filterName}
                            filterName={filter.filterName}
                            conditions={filter.conditions}
                            onClick={filter.onClick}
                            tickAll={filter.tickAll}
                            initialArray={filter.initialArray}
                            isOpen={curFilter === filter.filterName}
                            setOpen={() => setOpen(filter.filterName)}
                        />
                    ))}
                </div>
            </header>
            <div className="table">
                <StockPriceTable>
                    {stockAfterFilter().map((stock) => {
                        return (
                            <StockPriceTr
                                key={stock.id}
                                id={stock.id}
                                name={stock.name}
                                capitalization={stock.capitalization}
                                price={stock.price}
                                fluctuation={stock.fluctuation}
                                platform={stock.platform}
                                industry={stock.industry}
                            />
                        );
                    })}
                </StockPriceTable>
            </div>
        </div>
    );
}

export default memo(StockPrice);
