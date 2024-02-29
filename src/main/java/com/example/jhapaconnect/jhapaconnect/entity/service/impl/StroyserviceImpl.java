package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.StoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Story;
import com.example.jhapaconnect.jhapaconnect.entity.repository.StoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.Storyservice;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StroyserviceImpl implements Storyservice {
    private final StoryRepository storyrepo;
    private final ModelMapper mapper;
    @Override
    public List<StoryDTO> getAllstories() {
        List<Story> stories = storyrepo.findAll();
        List<StoryDTO> dto = stories.stream().map((story->mapper.map(story, StoryDTO.class))).collect(Collectors.toList());
        return  dto;
    }

    @Override
    public String saveStoryImage(String path , MultipartFile file)  throws IOException {

        // get file name
        String name = file.getOriginalFilename();  //name of the uploaded file without any changes(original)

        //create full path
        String filePath = path + File.separator + name;

        //create images folder images if not

        File f = new File(path);  //path upto images folder
        if(!f.exists()){   //check if folder with the path exists
            f.mkdir();
        }
        //file copy

        Files.copy(file.getInputStream(), Paths.get(filePath));  //source,target

        return  name ; //return file name
    }
}
