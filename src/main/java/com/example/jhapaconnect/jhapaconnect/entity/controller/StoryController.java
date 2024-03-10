package com.example.jhapaconnect.jhapaconnect.entity.controller;


import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.StoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Story;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.StoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.Fileservice;
import com.example.jhapaconnect.jhapaconnect.entity.service.Storyservice;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class StoryController {
    @Value("/images")
    private String path;

    private final Fileservice fileService;
    private final Storyservice service;
    private final ModelMapper mapper;
    private final StoryRepository storyrepo;
    private final UserRepository userrepo;

    @GetMapping("/stories")

    public List<StoryDTO> getAllstories(){
        return  service.getAllstories();
    }

    @GetMapping(value = "/story/image/{imageName}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException{
        InputStream resource = fileService.getResource(path,imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());

    }


    @PostMapping("/story/{userId}/upload")
    public ResponseEntity<StoryDTO> uploadStoryImage(  @ModelAttribute StoryDTO storydto, @RequestParam("image") MultipartFile image,@PathVariable("userId") Integer id
    ) throws IOException {

        UserEntity user = userrepo.findById(id).orElseThrow(()-> new NullPointerException("user notfound" + id));

        String fileName=  fileService.uploadImage(path,image);
        Story story =  new Story();
        story.setImageName(fileName);
        story.setUser(user);
        Story savestory = storyrepo.save(story);;
        StoryDTO dto = mapper.map(savestory,StoryDTO.class);
        return  new ResponseEntity<StoryDTO>(dto, HttpStatus.OK);

    }

}
