package com.stockai.backend.entity.stock;

import com.stockai.backend.entity.stock.Enum.FavouriteStockListMode;
import com.stockai.backend.entity.user.User;
import com.stockai.backend.utils.FavouriteStockListModeConverter;
import com.stockai.backend.utils.StringArrayConverter;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnTransformer;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favourite_stock_list", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class) // Bật Auditing
public class FavouriteStockList {
    @Id
    @Column(name = "list_id", updatable = false, nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stock.favourite_stock_list_list_id_seq")
    @SequenceGenerator(name = "stock.favourite_stock_list_list_id_seq",
            sequenceName = "stock.favourite_stock_list_list_id_seq", allocationSize = 1)
    Long listId;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "mode", nullable = false)
    @ColumnTransformer(read = "mode::TEXT", write = "?::favourite_stock_list_mode_dt")
    @Convert(converter = FavouriteStockListModeConverter.class)
    FavouriteStockListMode mode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author", referencedColumnName = "user_id")
    User author;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    Date updateAt;

    @Column(name = "symbols", columnDefinition = "TEXT[]")
    @Convert(converter = StringArrayConverter.class)
    List<String> symbols;
}
