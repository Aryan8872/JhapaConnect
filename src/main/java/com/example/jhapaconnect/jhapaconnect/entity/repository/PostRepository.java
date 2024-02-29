package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    List <Post> findByUser(UserEntity user);
    List <Post> findByDescriptionContaining(String title);
    Post findPostById(Integer id);

}
