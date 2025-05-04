import { useNavigate } from "react-router-dom";
import "./favorite_table.scss";
import FluctuationFormat from "../../../utils/FluctuationFormat";
import { MdMoreVert } from "react-icons/md";
import { useState } from "react";
import api from "../../../utils/api/Api";
import Modal from "../../../components/Modal/Modal";

function FavoriteTable({
    listID,
    lists = [],
    setStocks,
    setDisplayConfirm = () => {},
    callbackOnOKRef,
    setTitle = () => {},
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);

    const handleClick = (e, symbol) => {
        e.stopPropagation();
        setOpen(symbol === open ? undefined : symbol);
    };
    const handleAddStock = (newStocks) => {
      setStocks((prevStocks) => [...prevStocks, ...newStocks]);
  };

    function handleDeleteStock(symbol, index) {
        setTitle("Bạn xác nhận muốn xóa cổ phiếu khỏi danh sách?");
        setDisplayConfirm(true);

        callbackOnOKRef.current = () => {
            const reqBody = { listId: listID, stocks: [symbol] };
            api.delete("/favourite/stock/delete", {
                data: reqBody,
            }).then((response) => {
                console.log(response.data);
                setStocks(lists.filter((_, ind) => ind !== index));
            });
        };
    }

    function renderLists() {
        return lists.map((stock, index) => {
            if (!stock) return;

            const { symbol, companyName, close, priceChange } = stock;
            return (
                <tr key={symbol} onClick={() => navigate(`/stocks/${symbol}`)}>
                    <td children={symbol} />
                    <td className="company-name" children={companyName} />
                    <td children={close} />
                    <td children={FluctuationFormat(priceChange, "%")} />
                    <td
                        className="more-area"
                        onClick={(e) => handleClick(e, symbol)}
                    >
                        <button
                            className="fa-stock-btn"
                            children={<MdMoreVert />}
                        />
                        {open === symbol && (
                            <div className="more-box">
                                <div
                                    className="delete-stock"
                                    children="Xóa cổ phiếu"
                                    onClick={() =>
                                        handleDeleteStock(symbol, index)
                                    }
                                />
                            </div>
                        )}
                    </td>
                </tr>
            );
        });
    }

    return (
      <>
          <button className="add-stock-btn" onClick={handleOpenModal}>
              Thêm cổ phiếu
          </button>
          <table className="favorite-list-table">
              <thead>
                  <tr>
                      <th>Mã</th>
                      <th>Công ty</th>
                      <th>Giá hiện tại</th>
                      <th>Biến động</th>
                  </tr>
              </thead>
              <tbody>{renderLists()}</tbody>
          </table>
          {isModalOpen && <Modal onClose={handleCloseModal} onAddStock={handleAddStock} />}
      </>
  );
}

export default FavoriteTable;
