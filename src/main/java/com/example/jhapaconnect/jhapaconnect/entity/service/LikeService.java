package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.LikeDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LikeService {
     LikeDTO likePost(Integer postId , Integer userId);

     public LikeDTO dislike(Integer postId ,Integer userId);
     public int sumLikesByPostId(int postId);
}
