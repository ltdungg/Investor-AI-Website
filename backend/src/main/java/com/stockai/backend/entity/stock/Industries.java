package com.stockai.backend.entity.stock;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "industries", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Industries {
    @Id
    @Column(name = "icb_id", nullable = false, updatable = false, unique = true)
    Integer icbId;

    @Column(name = "icb_name")
    String icbName;

    @Column(name = "en_icb_name")
    String en_icbName;

    @Column(name = "level")
    Integer level;
}
