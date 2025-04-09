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
@Table(name = "finance_balance_sheet", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceBalanceSheet {
    @EmbeddedId
    FinanceId financeId;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    StockInformation stockInformation;

    @Column(name = "short_asset")
    Integer shortAsset;

    @Column(name = "cash")
    Integer cash;

    @Column(name = "short_invest")
    Integer shortInvest;

    @Column(name = "short_receivable")
    Integer shortReceivable;

    @Column(name = "inventory")
    Integer inventory;

    @Column(name = "long_asset")
    Integer longAsset;

    @Column(name = "fixed_asset")
    Integer fixedAsset;

    @Column(name = "asset")
    Integer asset;  // Tổng tài sản

    @Column(name = "debt")
    Integer debt;  // Tổng nợ phải trả

    @Column(name = "short_debt")
    Integer shortDebt;  // Nợ ngắn hạn

    @Column(name = "long_debt")
    Integer longDebt;  // Nợ dài hạn

    @Column(name = "equity")
    Integer equity;  // Vốn chủ sở hữu

    @Column(name = "capital")
    Integer capital;  // Vốn góp của chủ sở hữu

    @Column(name = "other_debt")
    Integer otherDebt;  // Nợ khác

    @Column(name = "un_distributed_income")
    Double unDistributedIncome;  // Lợi nhuận sau thuế chưa phân phối

    @Column(name = "minor_share_holder_profit")
    Integer minorShareHolderProfit;  // Lợi ích cổ đông thiểu số

    @Column(name = "payable")
    Integer payable;  // Phải trả người bán
}
