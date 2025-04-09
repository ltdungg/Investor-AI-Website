package com.stockai.backend.entity.stock;

import com.stockai.backend.entity.stock.customId.FinanceId;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "finance_cash_flow", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceCashFlow {
    @EmbeddedId
    FinanceId financeId;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    StockInformation stockInformation;

    @Column(name = "invest_cost")
    Integer investCost;  // Chi đầu tư

    @Column(name = "from_invest")
    Integer fromInvest;  // Lưu chuyển tiền thuần từ hoạt động đầu tư

    @Column(name = "from_financial")
    Integer fromFinancial;  // Lưu chuyển tiền thuần từ hoạt động tài chính

    @Column(name = "from_sale")
    Integer fromSale;  // Lưu chuyển tiền thuần từ hoạt động kinh doanh

    @Column(name = "free_cash_flow")
    Double freeCashFlow;  // Dòng tiền tự do
}
