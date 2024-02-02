package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/post")
@RequiredArgsConstructor

public class PostController {
    private final PostService service;

    @PostMapping("/newPost")
    public String createPost(@RequestBody PostDTO dto){
        service.createPost(dto);
        return "post created";
    }

    @GetMapping("/posts")
    public List<Post> getallPosts(){
        return service.getAllPost();
    }


    @DeleteMapping("/delete/{id}")
    public void deltePost(@RequestParam("id") Integer id){
        service.deletePost(id);
    }




}
