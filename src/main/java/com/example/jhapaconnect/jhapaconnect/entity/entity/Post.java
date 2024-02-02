package com.example.jhapaconnect.jhapaconnect.entity.entity;


import lombok.*;
import jakarta.persistence.*;

import java.awt.*;
import java.lang.reflect.Array;
import java.sql.Blob;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Post", uniqueConstraints = {
        @UniqueConstraint(name="unique_post_id", columnNames = "id")
})

public class Post {

    @Id
    @SequenceGenerator(name = "post_seq_gen",sequenceName = "post_seq", allocationSize = 1)
    @GeneratedValue(generator = "post_seq_gen", strategy = GenerationType.SEQUENCE)
    private  Integer id;

    @ElementCollection
    @Column(name = "tags", nullable = true)
    private List<String> tags;

    @Column(name= "caption" , nullable = false)
    private String caption;

    @Column(name="description" , nullable= true)
    private String description;

    @Column(name = "location" , nullable = true)
    private  String location;



}
