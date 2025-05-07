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
        <tr className="table-row" key={symbol}>
          <td className="tabel-cell">{symbol}</td>
          <td
            className="tabel-cell company-name"
            title={companyName}
            children={companyName}
          />
          <td className="tabel-cell">{NumberFormat(close)}</td>
          <td className="tabel-cell">
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
          <th children="Tên Công ty" />
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
