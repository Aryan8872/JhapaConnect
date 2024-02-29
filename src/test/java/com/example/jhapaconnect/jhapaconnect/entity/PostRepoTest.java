package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.annotation.Rollback;
import org.assertj.core.api.Assertions;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostRepoTest {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void savePostTest() {
        UserEntity user = new UserEntity();
        user.setId(1);
        user.setFirstName("test");
        user.setLastName("user");
        user.setEmail("useremail");
        user.setPassword("password");
        user.setPhoneno("978187721");
        userRepository.save(user);

        Post post = new Post();
        post.setDescription("Test Description");
        post.setLocation("test loc");
        post.setAddedDate(new Date());
        post.setUser(user);

        Post savedPost = postRepository.save(post);

        Assertions.assertThat(savedPost.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void getPostByIdTest() {
        Optional<Post> optionalPost = postRepository.findById(1);
        Assertions.assertThat(optionalPost).isPresent();
    }

    @Test
    @Order(3)
    public void getAllPostsTest() {
        List<Post> posts = postRepository.findAll();
        Assertions.assertThat(posts.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updatePostTest() {
        Optional<Post> optionalPost = postRepository.findById(1);
        Assertions.assertThat(optionalPost).isPresent();

        Post post = optionalPost.get();
        post.setDescription("Updated Description");

        postRepository.save(post);

        Optional<Post> updatedPostOptional = postRepository.findById(1);
        Assertions.assertThat(updatedPostOptional).isPresent();

        Post updatedPost = updatedPostOptional.get();
        Assertions.assertThat(updatedPost.getDescription()).isEqualTo("Updated Description");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deletePostTest() {
        Optional<Post> optionalPost = postRepository.findById(1);
        Assertions.assertThat(optionalPost).isPresent();

        Post post = optionalPost.get();
        postRepository.delete(post);

        Optional<Post> deletedPostOptional = postRepository.findById(1);
        Assertions.assertThat(deletedPostOptional).isNotPresent();
    }

    @Test
    @Order(6)
    public void findByUserTest() {
        UserEntity user = new UserEntity();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setPassword("ahjwdawhjd");
        user.setPhoneno("782781278");

        userRepository.save(user);

        Post post = new Post();
        post.setDescription("This is a sample post");
        post.setUser(user);
        post.setLocation("testLoc");

        postRepository.save(post);

        List<Post> postsByUser = postRepository.findByUser(user);

        Assertions.assertThat(postsByUser).isNotEmpty();
    }

    @Test
    @Order(7)
    public void findByDescriptionContainingTest() {
        Post post = new Post();
        post.setDescription("This is a sample description containing keyword");
        post.setLocation("location");

        postRepository.save(post);

        List<Post> postsContainingKeyword = postRepository.findByDescriptionContaining("keyword");

        Assertions.assertThat(postsContainingKeyword).isNotEmpty();
    }
}
