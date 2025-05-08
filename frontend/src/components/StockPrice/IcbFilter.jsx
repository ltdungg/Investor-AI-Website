import { FaCheck, FaChevronDown } from "react-icons/fa6";
import "./ToggleDropdown/Filter.scss";
import { useState } from "react";

function IcbFilter({
  filterName,
  industries = [],
  curIcb = [],
  icbId = [],
  setCurrentCondition = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  function aCondition(id) {
    console.log(id, industries[id]);

    if (!id) return undefined;

    return (
      <button
        onClick={() => {
          if (curIcb.includes(id)) {
            setCurrentCondition(curIcb.filter((i) => i !== id));
          } else {
            setCurrentCondition([...curIcb, id]);
          }
        }}
        key={id}
      >
        {/* hiển thị tick */}
        <div className="ticked">{curIcb.includes(id) && <FaCheck />}</div>
        <div className="filter-name">
          {industries[id] ? industries[id].icbName : null}
        </div>
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
        <div className="dropdown-menu">{icbId.map((id) => aCondition(id))}</div>
      )}
    </div>
  );
}

export default IcbFilter;
