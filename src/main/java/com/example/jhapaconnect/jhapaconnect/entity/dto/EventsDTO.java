package com.example.jhapaconnect.jhapaconnect.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventsDTO {

    private Integer id;
    private String title;
    private String description;
    private Date addedDate;
    private Date startDate;
    private Date endDate;
    private String imageName;
    private String location;
    private UserDTO user;
    private String hostName;
    private String invitationType;
    private EventCatDTO category;
    private Integer interested;
    private  Integer going;



}
