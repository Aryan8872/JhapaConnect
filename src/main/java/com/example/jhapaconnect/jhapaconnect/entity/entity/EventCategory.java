package com.example.jhapaconnect.jhapaconnect.entity.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Eventcategories")
@NoArgsConstructor
@Getter
@Setter
public class EventCategory {
    @Id
    @GeneratedValue
    private Integer categoryId;
    @Column(name="title" , nullable = false)
    private String categoryTitle;

}
