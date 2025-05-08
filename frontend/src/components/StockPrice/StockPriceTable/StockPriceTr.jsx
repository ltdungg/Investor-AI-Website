import { memo } from "react";
import FluctuationFormat from "../../../utils/FluctuationFormat";
import NumberFormat from "../../../utils/NumberFormat";
import { useNavigate } from "react-router-dom";
import "./StockPriceTr.scss";

function StockPriceTr(props) {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/stocks/${id}`);
    }

    return (
        <tr
            className="stock-price__table-row"
            onClick={() => handleClick(props.id)}
        >
            <td>
                <h3>{props.id}</h3>
                <p>{props.name}</p>
            </td>
            {props.capitalization && <td>{NumberFormat(props.capitalization)}T</td>}
            <td>{NumberFormat(props.price)}</td>
            <td className="fluctuation">
                {FluctuationFormat(props.fluctuation, "%")}
            </td>
            <td>{props.platform}</td>
            {props.industry && <td>{props.industry}</td>}
        </tr>
    );
}

export default memo(StockPriceTr);
