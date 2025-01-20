import { IoMdSearch, IoIosArrowBack } from "react-icons/io";
import { PiMicrophoneLight } from "react-icons/pi";
import { FaHistory, FaFire } from "react-icons/fa";

import PopupContainer from "../PopupContainer/PobupContainer";
import "./Search.scss";
import { memo } from "react";


function Search(props) {
    const trendingStocks = [
        {
            id: "1",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "2",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "3",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "4",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
    ];

    const searchedStocks = [
        {
            id: "1",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "2",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "3",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
        {
            id: "4",
            symbol: "VNM",
            complanyName: "Công ty cổ phần sữa Việt Nam",
        },
    ];

    return (
        <PopupContainer
            className={`search-container ${props.className}`}
            isVisible={props.isvisible}
        >
            <div className="search-bar">
                <IoIosArrowBack
                    className="exit-search"
                    onClick={() => props.onClose(false)}
                />
                <label htmlFor="search" className="search-box">
                    <IoMdSearch />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Tìm kiếm theo mã cổ phiếu hoặc từ khóa..."
                    />
                    <PiMicrophoneLight />
                </label>
            </div>

            <div className="search__category">
                <button className="search__category-item search__category-item-current">
                    Tất cả
                </button>
                <button className="search__category-item">Cổ phiếu</button>
            </div>
            <div className="search__suggest-stocks-container">
                <div className="search__trend">
                    <p className="search__suggest-title">
                        Cổ phiếu trending
                        <FaFire className="title-icon" />
                    </p>
                    <div className="search__stocks-trending">
                        {trendingStocks.map((item) => (
                            <a
                                href="./"
                                key={item.id}
                                className="search__suggest-stock-item"
                            >
                                <h6>{item.symbol}</h6>
                                <p>{item.complanyName}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="search__searched">
                    <p className="search__suggest-title">
                        Tìm kiếm gần đây
                        <FaHistory className="title-icon" />
                    </p>
                    <div className="search__searched-stocks">
                        {searchedStocks.map((item) => (
                            <a
                                href="./"
                                key={item.id}
                                className="search__suggest-stock-item"
                            >
                                <h6>{item.symbol}</h6>
                                <p>{item.complanyName}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </PopupContainer>
    );
}

export default memo(Search);
