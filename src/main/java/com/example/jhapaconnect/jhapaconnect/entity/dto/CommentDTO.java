package com.example.jhapaconnect.jhapaconnect.entity.dto;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private int id;
    private String content;
    private UserDTO user;


}
