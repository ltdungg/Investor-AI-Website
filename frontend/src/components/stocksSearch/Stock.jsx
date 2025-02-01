import SearchBar from "./SearchBar";
import "./Stock.css"
import MarketStocks from "./MarketTable";
function Stock(){
    return (
        <>  
            
            <div className="stocks_page">
                <div className="flex_container">
                    <div className="search_container">
                        <h1>Tìm kiếm một cổ phiếu để bắt đầu phân tích của bạn</h1>
                        <p>Thông tin chính xác về gần 2000 cổ phiếu. Xem giá cổ phiếu, tin tức, tài chính, dự báo, biểu đồ và nhiều thông tin khác.</p>
                        <SearchBar />
                    </div>
                </div>
                <div className="flex_container">

                    <div className="Market_volatility">
                        <h1 >Diễn biến thị trường</h1>
                        <div className="market_container">
                            <MarketStocks textColor="#00BF63" title="Top Tăng Giá" />
                            <MarketStocks textColor="#FF3131" title="Top Giảm Giá" />
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Stock;