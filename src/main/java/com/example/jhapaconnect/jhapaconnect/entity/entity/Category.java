package com.example.jhapaconnect.jhapaconnect.entity.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue
    private Integer categoryId;
    @Column(name="title" , nullable = false)
    private String categoryTitle;





}
