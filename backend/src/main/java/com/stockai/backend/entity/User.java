package com.stockai.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnTransformer;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class) // Bật Auditing
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stock.user_user_id_seq")
    @SequenceGenerator(name = "stock.user_user_id_seq", sequenceName = "stock.user_user_id_seq", allocationSize = 1)
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, updatable = false, nullable = false)
    Integer userId;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "email", nullable = false, unique = true)
    String email;

    @Column(name = "phone", nullable = false, unique = true)
    String phone;

    @Column(name = "password", nullable = false)
    String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @ColumnTransformer(write = "?::user_role_dt")
    UserRole role;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    @Column(name = "created_at", nullable = false, updatable = false)
    Date createdAt;

    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    @Column(name = "updated_at")
    Date updatedAt;
}
