package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CommentDTO;

public interface Commentservice {
    CommentDTO createComment(CommentDTO commentdto , Integer postId, Integer userId);
    void deleteComment(Integer commentId);

}
