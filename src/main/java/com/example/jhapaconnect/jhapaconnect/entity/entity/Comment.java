package com.example.jhapaconnect.jhapaconnect.entity.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "comments")

public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String content;

    @ManyToOne
    private Post post;

    @ManyToOne
    private UserEntity user;

}
