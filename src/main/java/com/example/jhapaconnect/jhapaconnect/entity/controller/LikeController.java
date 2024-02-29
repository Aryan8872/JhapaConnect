package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.LikeDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Likes;
import com.example.jhapaconnect.jhapaconnect.entity.repository.LikeRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins =  "http://localhost:5173")

public class LikeController {
    private final LikeService service;
    private final LikeRepository likerepo;
    private final ModelMapper mapper;

    @PostMapping("/like/{postId}/{userId}")
    public ResponseEntity<LikeDTO> likePost(@PathVariable("postId") Integer postId , @PathVariable("userId") Integer userId) {
        LikeDTO dto = service.likePost(postId , userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @PutMapping("/dislike/{postId}/{userId}")
    public ResponseEntity<LikeDTO> dislikePost (@PathVariable("postId") Integer postId, @PathVariable("userId") Integer userId){
        LikeDTO dto = service.dislike(postId, userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @GetMapping("/getlikes/{postId}")
    public ResponseEntity<Integer> getLikebyid(@PathVariable("postId")Integer postId){
        int likecount =service.sumLikesByPostId(postId);
        return new ResponseEntity<>(likecount,HttpStatus.OK);
    }


}
