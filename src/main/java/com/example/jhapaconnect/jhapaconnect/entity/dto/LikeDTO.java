package com.example.jhapaconnect.jhapaconnect.entity.dto;

import lombok.*;

@Getter
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikeDTO {
    private Integer likeId;
    private Integer userId;
    private Integer postId;
    private Integer likeCount;


}
