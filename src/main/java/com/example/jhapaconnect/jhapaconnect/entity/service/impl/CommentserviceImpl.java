package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CommentDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Comment;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CommentRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.Commentservice;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentserviceImpl implements Commentservice {

    private final PostRepository postrepo;
    private final CommentRepository commentrepo;
    private final ModelMapper mapper;
    @Override
    public CommentDTO createComment(CommentDTO commentdto, Integer postId) {
        Post post = postrepo.findById(postId).orElseThrow(()->new NullPointerException("post with " + postId + "nnot found"));
        Comment comment = mapper.map(commentdto, Comment.class);
        comment.setPost(post);
        Comment savedComment = commentrepo.save(comment);
        return mapper.map(savedComment,CommentDTO.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = commentrepo.findById(commentId).orElseThrow(()-> new NullPointerException("comment doesnot exist"));
        commentrepo.delete(comment);

    }
}
