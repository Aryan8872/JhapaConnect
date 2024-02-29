package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.LikeDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Likes;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.LikeRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final UserRepository userrepo;
    private final PostRepository postrepo;
    private final ModelMapper mapper;

    @Override
    public LikeDTO likePost(Integer postId, Integer userId) {

        Likes existingLike = likeRepository.findLikesByPostId(postId);

        if (existingLike != null) {
            existingLike.setLikeCount(existingLike.getLikeCount() + 1);
            likeRepository.save(existingLike);
            return mapper.map(existingLike, LikeDTO.class);
        } else {
            Post post = postrepo.findById(postId)
                    .orElseThrow(() -> new IllegalArgumentException("Post not found"));
            UserEntity user = userrepo.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Likes newLike = new Likes();
            newLike.setPost(post);
            newLike.setUser(user);
            newLike.setLikeCount(1);
            likeRepository.save(newLike);

            return mapper.map(newLike, LikeDTO.class);
        }
    }

    @Override
    public LikeDTO dislike(Integer postId, Integer userId) {

        Likes like = likeRepository.findLikesByPostId(postId);
        like.setLikeCount(like.getLikeCount() - 1);
        likeRepository.save(like);

        LikeDTO likeDto = mapper.map(like, LikeDTO.class);
        return likeDto;
    }
    @Override
    public int sumLikesByPostId(int postId) {
        List<Likes> likesList = likeRepository.findAllByPostId(postId);
        int sum = 0;
        for (Likes like : likesList) {
            sum += like.getLikeCount();
        }
        return sum;
    }
}



