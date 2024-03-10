package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CommentDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.service.Commentservice;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/comment")
@RequiredArgsConstructor
@CrossOrigin(origins =  "http://localhost:5173")
public class CommentController {
    private final Commentservice commentservice;
    private final PostService postservice;

    @PostMapping("/post/{postId}/{userId}/comments")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO comment, @PathVariable("postId") Integer postId,@PathVariable("userId")Integer userId){
        CommentDTO commentDto = commentservice.createComment(comment,postId,userId);
        return  new ResponseEntity<CommentDTO>(commentDto, HttpStatus.CREATED);

    }

    @DeleteMapping("/comments/delete/{commentId}")
    public ResponseEntity<String> deleteComment( @PathVariable Integer commentId){
         commentservice.deleteComment(commentId);
        return  new ResponseEntity<String>("deleted sucessfuully",HttpStatus.OK);

    }



}
