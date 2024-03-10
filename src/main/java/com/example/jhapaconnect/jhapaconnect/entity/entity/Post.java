package com.example.jhapaconnect.jhapaconnect.entity.entity;


import jakarta.validation.constraints.NotNull;
import lombok.*;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.lang.reflect.Array;
import java.sql.Blob;
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

    @Column(name="description" , nullable= false ,length = 1000)
    private String description;

    @Column(name = "location" , nullable =false)
    private  String location;

    private String imageName;



    private Date addedDate;

    @ManyToOne
    private UserEntity user;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)  //post instance of comment entity
    private Set<Comment> comments = new HashSet<>();




}
