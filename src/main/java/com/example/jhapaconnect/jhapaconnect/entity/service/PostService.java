package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService{
    void createPost(PostDTO post);
    List <Post> getAllPost();
    void deletePost(Integer id);

    String savePostImage(String path,MultipartFile file) throws IOException;

}
