package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService{
    PostDTO createPost(PostDTO postdto,Integer userId);
    List <PostDTO> getAllPost(String sortBy ,String sortDirect);
    PostDTO getPostbyId(Integer postid);

    List <PostDTO> getPostbyUser(Integer userId);

    List <PostDTO> searchPost(String keyword);

    PostDTO updatePost(PostDTO postdto , Integer postId);
    void deletePost(Integer postid);



    String savePostImage(String path,MultipartFile file) throws IOException;

}
