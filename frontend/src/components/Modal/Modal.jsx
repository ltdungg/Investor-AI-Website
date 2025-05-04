import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Modal.scss";
import api from "../../utils/api/Api";

function Modal({ onClose, onAddStock }) {
    const { listID } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [stocks, setStocks] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            api.get(`/stock/find-stock?symbol=${searchTerm}`).then(
                (response) => {
                    setStocks(response.data);
                }
            );
        }
    }, [searchTerm]);

    const handleSelectStock = (stock) => {
        setSelectedStocks((prev) =>
            prev.includes(stock)
                ? prev.filter((s) => s !== stock)
                : [...prev, stock]
        );
    };

    const handleSave = () => {
        const symbols = selectedStocks.map((stock) => stock.symbol);
        const payload = { listId: listID, stocks: symbols };

        api.post("/favourite/stock/add", payload)
            .then(() => {
                console.log("Stocks added successfully");
                onAddStock(selectedStocks);
                onClose();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding stocks:", error);
            });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
                <h2>Thêm cổ phiếu</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm cổ phiếu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="stock-list">
                    {stocks.map((stock) => (
                        <div
                            key={stock.symbol}
                            className={`stock-item ${
                                selectedStocks.includes(stock) ? "selected" : ""
                            }`}
                            onClick={() => handleSelectStock(stock)}
                        >
                            <span>{stock.symbol}</span> -{" "}
                            <span>{stock.companyName}</span>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
