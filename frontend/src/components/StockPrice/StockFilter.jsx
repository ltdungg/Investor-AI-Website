import { FaCheck, FaChevronDown } from "react-icons/fa6";
import "./ToggleDropdown/Filter.scss";
import { useState } from "react";

function StockFilter({
  filterName,
  conditions = [],
  currentCondiTion = [],
  setCurrentCondition = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  function aCondition(condition = []) {
    if (!condition) return undefined;

    return (
      <button
        onClick={() => {
          if (currentCondiTion.includes(condition)) {
            setCurrentCondition(
              currentCondiTion.filter((i) => i !== condition)
            );
          } else {
            setCurrentCondition([...currentCondiTion, condition]);
          }
        }}
        key={condition}
      >
        {/* hiển thị tick */}
        <div className="ticked">
          {currentCondiTion.includes(condition) && <FaCheck />}
        </div>
        <div className="filter-name">{condition}</div>
      </button>
    );
  }
  return (
    <div className="filter-dropdown">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {filterName}
        <FaChevronDown className="arrow-down" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {conditions.map((condition) => aCondition(condition))}
        </div>
      )}
    </div>
  );
}

export default StockFilter;
