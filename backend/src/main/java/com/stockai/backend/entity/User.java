package com.stockai.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 1)
    @Column(name = "user_id", unique = true, updatable = false, nullable = false)
    Integer userId;

    @Column(name = "name", nullable = false, updatable = false, unique = true)
    String name;

    @Column(name = "email", nullable = false, updatable = false, unique = true)
    String email;

    @Column(name = "phone", nullable = false, updatable = false, unique = true)
    String phone;

    @Column(name = "password", nullable = false)
    String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
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
