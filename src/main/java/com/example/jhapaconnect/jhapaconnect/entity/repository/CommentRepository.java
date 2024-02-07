package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository <Comment,Integer> {
}
