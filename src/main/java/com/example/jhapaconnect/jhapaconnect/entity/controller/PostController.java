package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor

public class PostController {
    private final PostService service;

    @PostMapping("/user/{userId}/category/{catId}/posts")
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO dto ,  @PathVariable Integer userId, @PathVariable Integer catId){
        PostDTO post =service.createPost(dto,userId,catId);
        return new ResponseEntity<PostDTO>(post , HttpStatus.CREATED);
    }

    @GetMapping("/posts")
    public List<PostDTO> getallPosts(){
        return service.getAllPost();
    }


    @DeleteMapping("/delete/{id}")
    public void deltePost(@RequestParam("id") Integer id){
        service.deletePost(id);
    }




}
