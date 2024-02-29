package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.StoryDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface Storyservice {

    public List<StoryDTO> getAllstories();
    public String saveStoryImage(String path , MultipartFile file) throws IOException;
}
