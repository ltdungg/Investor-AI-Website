import { memo } from "react";
import "./StockPriceTable.scss";

function StockPriceTable({ children = "không có cổ phiếu nào" }) {
    return (
        <table className="stock-price__table">
            <thead>
                <tr>
                    <th>Mã cổ phiếu</th>
                    <th>Vốn hóa</th>
                    <th>Giá hiện tại</th>
                    <th>Biến động giá</th>
                    <th>Sàn</th>
                    <th>Ngành</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}

export default memo(StockPriceTable);
