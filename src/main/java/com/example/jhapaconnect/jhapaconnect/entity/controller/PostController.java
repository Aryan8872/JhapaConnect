package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.service.Fileservice;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@RestController
@RequestMapping(value = "/api/v1/auth" )
@RequiredArgsConstructor
@CrossOrigin(origins =  "http://localhost:5173")

public class PostController {
    private final PostService service;
    private final Fileservice fileService;

    @Value("/images")
    private String path;


        @PostMapping("/user/{userId}/createpost")
        public ResponseEntity<PostDTO> createPost(
                @RequestBody PostDTO dto,
                @PathVariable Integer userId
        ) {
            PostDTO post = service.createPost(dto, userId);

            return new ResponseEntity<>(post, HttpStatus.CREATED);
        }

    @GetMapping("/user/{userId}/posts")

    public List<PostDTO> getPostbyuser(@PathVariable Integer userId){
      return service.getPostbyUser(userId);
    }



    @GetMapping("/posts")
    public List<PostDTO> getallPosts(
            @RequestParam(value = "sortBy",
            defaultValue = "id",required = false) String sortBy,
            @RequestParam(value = "sortDirection" ,defaultValue = "asc",required = false) String sortDirect){

        return service.getAllPost(sortBy,sortDirect);
    }

    @GetMapping(value = "/post/image/{imageName}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException{
        InputStream resource = fileService.getResource(path,imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());

    }


    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity <String> deltePost(@RequestParam("id") Integer id){
        service.deletePost(id);
        return  ResponseEntity.ok("sucessfully  deleted");
    }



    @PutMapping("update/posts/{postId}")
    public ResponseEntity<PostDTO> updatepost(@RequestBody PostDTO postDTO, @PathVariable Integer postId){
        PostDTO updatedpost = service.updatePost(postDTO,postId);
        return  new ResponseEntity<>(updatedpost,HttpStatus.OK);
    }

    @GetMapping("/posts/search/{keywords}")
    public ResponseEntity<List<PostDTO>> searchPostbyDescripption(@PathVariable ("keywords") String keywords){
        List<PostDTO> searchResult = service.searchPost(keywords);
        return  new ResponseEntity<List<PostDTO>>(searchResult,HttpStatus.OK);
    }



    @PostMapping("/post/image/upload/{postId}")
    public ResponseEntity<PostDTO> uploadPostImage(@RequestParam("image") MultipartFile image, @PathVariable Integer postId
    ) throws IOException {

       String fileName=  fileService.uploadImage(path,image);
       PostDTO postDTO =  service.getPostbyId(postId);
       postDTO.setImageName(fileName);
       PostDTO updatedpost = service.updatePost(postDTO,postId);
       return  new ResponseEntity<PostDTO>(updatedpost,HttpStatus.OK);

    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostDTO> getPostbyid(@PathVariable("postId") Integer postid){
           PostDTO dto =  service.getPostbyId(postid);
            return new ResponseEntity<>(dto, HttpStatus.OK);
    }


}
