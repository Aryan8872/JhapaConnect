package com.example.jhapaconnect.jhapaconnect.entity.dto;

import com.example.jhapaconnect.jhapaconnect.entity.entity.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PostDTO {

    private Integer id;

    private List<String> tags;

    @NotNull
    private String description;

    @NotNull
    private String location;
    private String imageName;

    private LikeDTO like;

    private String addedDate;
    private UserDTO user;

    private Set<CommentDTO> comments = new HashSet<>();


}
