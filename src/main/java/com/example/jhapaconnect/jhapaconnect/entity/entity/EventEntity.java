package com.example.jhapaconnect.jhapaconnect.entity.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Events")
public class EventEntity {


    @Id
    @GeneratedValue
    private  Integer id;
    @Column(name="Title" , nullable= false ,length = 1000)
    private String title;


    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "location" , nullable =false)
    private  String location;

    private String imageName;

    @NotNull
    private Date addedDate;

    @Column(name = "Start_Date" )
    private Date StartDate;

    @Column(name = "End_Date")
    private Date EndDate;

    @ManyToOne
    private EventCategory category;

    private String hostName;

    private Integer interested = 0;

    private Integer going =0;

    private String invitationType;

    @ManyToOne
    private UserEntity user;
}
