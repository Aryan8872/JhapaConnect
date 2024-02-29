package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Likes;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Likes,Integer> {
    Likes findLikesByPostId(Integer id);
    List<Likes> findAllByPostId(Integer  postId);

}
