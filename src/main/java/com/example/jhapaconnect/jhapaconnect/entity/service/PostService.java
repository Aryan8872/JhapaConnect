package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService{
    PostDTO createPost(PostDTO postdto,Integer userId, Integer catId );
    List <PostDTO> getAllPost();
    PostDTO getPostbyId(Integer postid);

    List<Post> getPostbyCategory(Integer catID);
    List <Post> getPostbyUser(UserEntity user);

    List <Post> searchPost(String keyword);

    Post updatePost(PostDTO postdto , Integer postId);
    void deletePost(Integer postid);


    String savePostImage(String path,MultipartFile file) throws IOException;

}
