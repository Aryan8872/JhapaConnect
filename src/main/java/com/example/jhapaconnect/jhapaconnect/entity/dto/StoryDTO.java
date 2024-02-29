package com.example.jhapaconnect.jhapaconnect.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoryDTO {

    private Integer id;

    private  String imageName;
    private  String content;

    private UserDTO user;

}
