package com.example.jhapaconnect.jhapaconnect.entity.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Item {

    @Id
    @GeneratedValue
    private  Integer id;
    @Column(name="Title" , nullable= false ,length = 1000)
    private String title;
    @Column(name = "Price" , nullable =false)
    private  String price;

    @Column(name = "description")
    private String description;

    @Column(name = "location" , nullable =false)
    private  String location;

    private String imageName;

    private Date addedDate;


    @ManyToOne
    private Category category;

    @ManyToOne
    private UserEntity user;


}
