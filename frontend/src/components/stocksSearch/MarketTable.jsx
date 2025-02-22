import React, { Component } from 'react'
import "./MarketTable.css"
class MarketStocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: [
        { id: "VNM", price_change: "13.33%", KLGD: "100,000"},
        { id: "KNM", price_change: "13.33%", KLGD: "100,000"},
        { id: "VKM", price_change: "13.33%", KLGD: "100,000"},
        { id: "VLM", price_change: "13.33%", KLGD: "100,000"},
        { id: "VNA", price_change: "13.33%", KLGD: "100,000"},

      ],
    }
  }

  renderTableData() {
    return this.state.stocks.map((stock, index) => {
      const { id, price_change, KLGD } = stock
      return (
        <tr key={id}>
          <td>{id}</td>
          <td style={{ color: this.props.textColor }}>{price_change}</td>
          <td>{KLGD}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    const header = Object.keys(this.state.stocks[0])
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>)
  }

  render() {
    return (
      <table className="market-table">
        <thead>
          <tr>
            <th colSpan="3">
              <h1 className="Top" style={{ color: this.props.textColor }}>{this.props.title}</h1>
            </th>
          </tr>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </table>
    )
  }
}

export default MarketStocks

