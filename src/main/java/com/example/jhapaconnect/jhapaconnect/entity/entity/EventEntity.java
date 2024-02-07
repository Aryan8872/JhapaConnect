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
@AllArgsConstructor
@NoArgsConstructor
public class EventEntity {


    @Id
    @GeneratedValue
    private  Integer id;
    @Column(name="Title" , nullable= false ,length = 1000)
    private String title;


    @Column(name = "description")
    private String description;

    @Column(name = "location" , nullable =false)
    private  String location;

    private String imageName;

    private Date addedDate;

    private String StartDate;
    private String EndDate;

    @ManyToOne
    private UserEntity user;
}
