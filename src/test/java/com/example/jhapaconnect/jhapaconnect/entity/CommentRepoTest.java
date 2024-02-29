package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Comment;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CommentRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CommentRepoTest {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveCommentTest() {
        Comment comment = new Comment();
        comment.setContent("Test Comment");
        comment.setPost(postRepository.findById(1).orElse(null));
        comment.setUser(userRepository.findById(1).orElse(null));

        Comment savedComment = commentRepository.save(comment);

        Assertions.assertThat(savedComment.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findByIdTest() {
        Optional<Comment> commentOptional = commentRepository.findById(1);
        Assertions.assertThat(commentOptional).isPresent();
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void updateCommentTest() {
        Optional<Comment> optionalComment = commentRepository.findById(1);
        Assertions.assertThat(optionalComment).isPresent();

        Comment comment = optionalComment.get();
        comment.setContent("Updated Test Comment");

        commentRepository.save(comment);

        Optional<Comment> updatedCommentOptional = commentRepository.findById(1);
        Assertions.assertThat(updatedCommentOptional).isPresent();

        Comment updatedComment = updatedCommentOptional.get();
        Assertions.assertThat(updatedComment.getContent()).isEqualTo("Updated Test Comment");
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void deleteCommentTest() {
        Optional<Comment> optionalComment = commentRepository.findById(1);
        Assertions.assertThat(optionalComment).isPresent();

        Comment comment = optionalComment.get();
        commentRepository.delete(comment);

        Optional<Comment> deletedCommentOptional = commentRepository.findById(1);
        Assertions.assertThat(deletedCommentOptional).isNotPresent();
    }
}
