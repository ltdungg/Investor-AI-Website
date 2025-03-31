# Spring Boot API - Finance and Stock Information

## Api auto generated

- [API doc có ui trực quan (swagger)](http://localhost:8000/swagger-ui)
- [API doc bằng json (chuẩn OpenAPI)](http://localhost:8000/api-doc)

Lưu ý: hãy chạy dự án trước mới có thể mở được api doc tự sinh

## Cấu Hình

Ứng dụng Spring Boot này cung cấp các endpoint để truy vấn thông tin tài chính và cổ phiếu. Các endpoint này có thể được
truy cập thông qua địa chỉ `localhost:8000`.

### Địa chỉ API

- Base URL: `http://localhost:8000`

### Các Stock Endpoint Public

Dưới đây là danh sách các endpoint public với phương thức `GET`. Các endpoint này yêu cầu tham số `symbol` trong URL để
tra cứu thông tin cho một mã cổ phiếu cụ thể.

#### 1. `/finance-balance-sheet/{symbol}`

Trả về thông tin **Bảng Cân Đối Kế Toán** cho mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class FinanceBalanceSheetResponse {
    int quarter;
    int year;
    Integer shortAsset;
    Integer cash;
    Integer shortInvest;
    Integer shortReceivable;
    Integer inventory;
    Integer longAsset;
    Integer fixedAsset;
    Integer asset;
    Integer debt;
    Integer shortDebt;
    Integer longDebt;
    Integer equity;
    Integer capital;
    Integer otherDebt;
    Double unDistributedIncome;
    Integer minorShareHolderProfit;
    Integer payable;
}
```

#### 2. `/finance-cash-flow/{symbol}`

Trả về thông tin **Báo Cáo Lưu Chuyển Tiền Tệ** cho mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class FinanceCashFlowResponse {
    int quarter;
    int year;
    Integer investCost;
    Integer fromInvest;
    Integer fromFinancial;
    Integer fromSale;
    Double freeCashFlow;
}
```

#### 3. `/finance-income-statement/{symbol}`

Trả về thông tin ** Danh Sách Báo Cáo Kết Quả Hoạt Động Kinh Doanh** cho mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class FinanceIncomeStatementResponse {
    int quarter;
    int year;
    Integer revenue;
    Double yearRevenueGrowth;
    Double quarterRevenueGrowth;
    Integer costOfGoodSold;
    Integer grossProfit;
    Integer operationExpense;
    Integer operationProfit;
    Double yearOperationProfitGrowth;
    Double quarterOperationProfitGrowth;
    Integer interestExpense;
    Integer preTaxProfit;
    Integer postTaxProfit;
    Integer shareHolderIncome;
    Double yearShareHolderIncomeGrowth;
    Double quarterShareHolderIncomeGrowth;
    Double ebitda;
}
```

#### 4. `/finance-ratio/{symbol}`

Trả về các **Chỉ Số Tài Chính** cho mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class FinanceRatioResponse {
    int quarter;
    int year;
    Double priceToEarning;
    Double priceToBook;
    Double valueBeforeEbitda;
    Double roe;
    Double roa;
    Integer daysReceivable;
    Integer daysInventory;
    Integer daysPayable;
    Double ebitOnInterest;
    Integer earningPerShare;
    Integer bookValuePerShare;
    Double equityOnTotalAsset;
    Double equityOnLiability;
    Double currentPayment;
    Double quickPayment;
    Double epsChange;
    Double ebitdaOnStock;
    Double grossProfitMargin;
    Double operatingProfitMargin;
    Double postTaxMargin;
    Double debtOnEquity;
    Double debtOnAsset;
    Double debtOnEbitda;
    Double shortOnLongDebt;
    Double assetOnEquity;
    Integer capitalBalance;
    Double cashOnEquity;
    Double cashOnCapitalize;
    Integer cashCirculation;
    Double revenueOnWorkCapital;
    Double capexOnFixedAsset;
    Double revenueOnAsset;
    Double postTaxOnPreTax;
    Double ebitOnRevenue;
    Double preTaxOnEbit;
    Double payableOnEquity;
    Double ebitdaOnStockChange;
    Double bookValuePerShareChange;
}
```

#### 5. `/stock/{symbol}`

Trả về thông tin **Cổ Phiếu** cho mã cổ phiếu.

```java
public class StockInformationResponse {
    String symbol;
    String companyName;
    String description;
    Integer icb1;
    Integer icb2;
    Integer icb3;
    Integer icb4;
    Exchange exchange;
    String historyDev;
    String companyPromise;
    String businessRisk;
    String keyDevelopments;
    String businessStrategies;
}
```

nếu không truyền symbol vào thì sẽ trả về toàn bộ cổ phiếu với mỗi cổ phiếu sẽ là như thế này:

```java
public class SimpleStockInformationDTO {
    String symbol;
    String companyName;
    Integer icb1;
    Integer icb2;
    Integer icb3;
    Integer icb4;
    Exchange exchange;
    Double close; //giá hiện tại
    Double priceChange;//biến động giá
}
```

#### 6. `/stock-price/{symbol}`

Trả về thông tin **Giá Cổ Phiếu** cho mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class StockPriceResponse {
    Date tradingDate;
    Exchange exchange;
    Double open;
    Double high;
    Double low;
    Double close;
    Double volume;
    Double value;
}
```

#### 7. `/industries`

Trả về thông tin về các **Ngành** của công ty phát hành mã cổ phiếu.

```java
// mỗi báo cáo của một quý sẽ có kiểu dữ liệu này
public class IndustriesResponse {
    Integer icbId;
    String icbName;
    Integer level;
    String en_icbName;
}
```

---

### Các Public Endpoint Login/SignIn

tạo hoặc đăng nhập với POST method

#### 1. `/auth/login`

Yêu cầu request body:

```java
public class LoginRequest {
    String emailOrPhone; //không được trống
    String password;// không được trống
}
```

Đăng nhập tài khoản và trả về 1 `jwt` token.

#### 2. `/auth/sign-up`

Yêu cầu request body:

```java
public class CreateUserRequest {
    String name; //không được trống
    String email; //theo email format và không đc trống
    String phone; //10 số và bắt đầu là số 0
    String password;// phải ít nhất 8 ký tự chứa cả hoa, thường, số và kí tự đặc biệt
}
```

Tạo tài khoản và trả về `jwt` token

### Các Endpoint xem danh sách cổ phiếu yêu thích

Bắt buộc phải đăng nhập

#### 1. /favourite?author=...&id=...

method: GET.
Tìm một danh sách đã tồn tại

truyền id tài khoản của người muốn xem vào author (có thể không truyền)
truyền id của danh sách (có thể không truyền)
không truyền gì thì trả về các danh sách bạn đang sở hữu

nếu tìm id của danh sách trả về 1 danh sánh
còn lại trả về một mảng các danh sách

```java
public class FavouriteStockListResponse {
    Long listId;
    String name;
    FavouriteStockListMode mode;
    Integer author;
    List<String> symbols;
}
```

#### 2. /favourite/

method: POST.

yêu cầu request body:

```java
public class NewFavouriteStockListRequest {
    String name;
}
```

trả về id của danh sách.

#### 3. /favourite/rename

method: PUT.

yêu cầu request body:

```java
public class RenameFavouriteStockRequest {
    Long listId;
    String name;
}
```

#### 3. /favourite/delete/{listId}

method: DELETE.

xóa một danh sách

#### 4. /favourite/

method: PATCH.

thay đổi là public hay private (chấp nhận cả hoa cả thường)

#### 5. /favourite/stock/add

method: POST.

thêm cổ phiếu vào danh sách

```java
// request body
Long listId;
List<String> stocks;
```

#### 6. /favourite/stock/delete

method: DELETE.

xóa cổ phiếu vào danh sách

```java
// request body
Long listId;
List<String> stocks;
```