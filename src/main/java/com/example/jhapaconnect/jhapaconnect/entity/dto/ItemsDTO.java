package com.example.jhapaconnect.jhapaconnect.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemsDTO {

    private Integer id;
    private String title;
    @NotNull
    private String description;
    private String price;
    @NotNull
    private String location;
    private String imageName;
    private String addedDate;
    private UserDTO user;
    private CategoryDTO category;
}
