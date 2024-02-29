package com.example.jhapaconnect.jhapaconnect.entity.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

   @Column
    private String imageName;

   @Column(nullable = true)
   private String content;

   @ManyToOne
   private UserEntity user;




}
