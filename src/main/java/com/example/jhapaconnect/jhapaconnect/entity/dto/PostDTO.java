package com.example.jhapaconnect.jhapaconnect.entity.dto;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Comment;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
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
    private String addedDate;
    private UserDTO user;
    private CategoryDTO category;
    private Set<CommentDTO> comments = new HashSet<>();


}
