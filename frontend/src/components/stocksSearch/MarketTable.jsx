import "./MarketTable.scss";
import ColorForData from "../../utils/ColorForData";
import NumberFormat from "../../utils/NumberFormat";
function MarketStocks({ stocks = [], title = "" }) {
  function renderTableData() {
    return stocks.map((stock) => {
      if (!stock) {
        return;
      }
      const {
        symbol: symbol,
        close: close,
        priceChange: priceChange,
        companyName: companyName,
      } = stock;
      return (
        <tr key={symbol}>
          <td className="symbol">{symbol}</td>
          <td
            className="company-name"
            title={companyName}
            children={companyName}
          />
          <td className="price">{NumberFormat(close)}</td>
          <td className="price-change">
            {ColorForData(priceChange, undefined, "%")}
          </td>
        </tr>
      );
    });
  }

  function renderTableHeader() {
    return (
      <thead>
        <tr>
          <th children="Mã" />
          <th children="Công ty" />
          <th children="Giá" />
          <th children="Biến động" />
        </tr>
      </thead>
    );
  }

  return (
    <div className="top-stocks">
      <h2 children={title} />
      <table className="market-table">
        {renderTableHeader()}
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
}

export default MarketStocks;
