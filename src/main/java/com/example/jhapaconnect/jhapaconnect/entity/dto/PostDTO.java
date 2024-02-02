package com.example.jhapaconnect.jhapaconnect.entity.dto;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PostDTO {

    private Integer id;


    private List<String> tags;

    @NotNull
    private String description;

    @NotNull
    private String caption;

    @NotNull
    private String location;


}
