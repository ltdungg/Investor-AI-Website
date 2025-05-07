import { memo, useEffect, useState } from "react";

import StockPriceTable from "./StockPriceTable/StockPriceTable";
import StockPriceTr from "./StockPriceTable/StockPriceTr";
import Filter from "./ToggleDropdown/Filter";
import IncludesIgnoreCase from "../../utils/IncludesIgnoreCase";
import CompareToIgnoreCase from "../../utils/CompareToIgnoreCase";
import getAllStock from "../../utils/api/stock_api_utils/GetAllStock";
import getAllIndustries from "../../utils/api/stock_api_utils/GetAllIndustries";
import "./StockPrice.scss";
import { useRef } from "react";
import Loading from "../loading/loading";

function StockPrice() {
  const platformConditionTemplate = ["UPCOM", "HNX", "HOSE"];
  const [stocks, setStocks] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [platformCondition, setPlatformCondition] = useState(
    platformConditionTemplate
  );
  const [industryCondition, setIndustryCondition] = useState([]);
  const [curFilter, setCurFilter] = useState(null);
  const condition = useRef([]);
  const filters = [
    {
      filterName: "Sàn",
      conditions: platformConditionTemplate,
      onClick: (condition) => setCondition(condition),
      initialArray: platformCondition,
      tickAll: true,
    },
    {
      filterName: "Nhóm ngành",
      conditions: condition.current,
      onClick: (condition) => industry(condition),
      tickAll: false,
    },
  ];

  useEffect(() => {
    getAllStock().then((response) => {
      const responseData = response.data;
      setStocks(responseData);
    });

    getAllIndustries().then((response) => {
      const responseData = response.data;
      const data = {};
      responseData.forEach((element) => {
        data[element.icbId] = element;
      });
      condition.current = Array.from(
        new Set(Object.values(data).map((val) => val.icbName))
      );
      setIndustries(data);
    });
  }, []);

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
      arr = industryCondition.filter((a) => CompareToIgnoreCase(a, condition));
    else arr = [...industryCondition, condition];

    setIndustryCondition(arr);
  }

  //trả lại dữ liệu sau khi được lọc
  function stockAfterFilter() {
    // return stocks;
    return stocks.filter(
      (stock) =>
        platformCondition.includes(stock.exchange) &&
        (industryCondition.length === 0 ||
          IncludesIgnoreCase(
            industryCondition,
            industries[stock.icb1] ? industries[stock.icb1].icbName : undefined
          ))
    );
  }

  //đièu khiển đóng mở filter
  function setOpen(filterName) {
    setCurFilter(curFilter === filterName ? null : filterName);
  }

  return (
    <div className="stock-price-container">
      <header className="stock-price__header">
        <h1>Bảng giá cổ phiếu</h1>
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
                key={stock.symbol}
                id={stock.symbol}
                name={stock.companyName}
                price={stock.close}
                fluctuation={stock.priceChange}
                platform={stock.exchange}
                industry={
                  industries[stock.icb1]
                    ? industries[stock.icb1].icbName
                    : undefined
                }
              />
            );
          })}
        </StockPriceTable>
      </div>
    </div>
  );
}

export default memo(StockPrice);
