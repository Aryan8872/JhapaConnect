package com.example.jhapaconnect.jhapaconnect.entity;


import com.example.jhapaconnect.jhapaconnect.entity.entity.Likes;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.repository.LikeRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.assertj.core.api.Assertions;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LikeRepoTest {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveLikeTest() {
        Likes like = new Likes();

        like.setLikeId(1);
        like.setLikeCount(1);

        Post post  = new Post();
        post.setId(1);
        post.setDescription("like post");
        post.setLocation("like location");
        postRepo.save(post);
        like.setPost(post);

        Likes savedLike = likeRepository.save(like);



        Assertions.assertThat(savedLike.getLikeId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findLikesByPostIdTest() {
        Likes foundLike = likeRepository.findLikesByPostId(1);
        Integer likecount = foundLike.getLikeCount();
        Assertions.assertThat(likecount).isGreaterThan(0);
        Assertions.assertThat(foundLike).isNotNull();
    }

    @Test
    @Order(3)
    public void findAllByPostIdTest() {
        Post post = postRepo.findById(1).orElseThrow(()-> new NullPointerException("post not found"));

        Likes like2 = new Likes();
        like2.setLikeId(2);
        like2.setPost(post);
        like2.setLikeCount(3);

        likeRepository.save(like2);

        List<Likes> likesList = likeRepository.findAllByPostId(1);
        Assertions.assertThat(likesList.size()).isEqualTo(2);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateLikeTest() {
        Optional<Likes> optionalLike = likeRepository.findById(1);
        Assertions.assertThat(optionalLike).isPresent();

        Likes like = optionalLike.get();
        like.setLikeCount(5);

        likeRepository.save(like);

        Optional<Likes> updatedLikeOptional = likeRepository.findById(1);
        Assertions.assertThat(updatedLikeOptional).isPresent();

        Likes updatedLike = updatedLikeOptional.get();
        Assertions.assertThat(updatedLike.getLikeCount()).isEqualTo(5);
    }

}
