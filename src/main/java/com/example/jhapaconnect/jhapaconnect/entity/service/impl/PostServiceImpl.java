package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository repository;
    Post post = new Post();

    @Override
    public void createPost(PostDTO dto) {
        if(dto.getId()!=null){
            post= (repository.findById(dto.getId()).orElseThrow(()->new NullPointerException()));
        }

        post.setId(dto.getId());
        post.setTags(dto.getTags());
        post.setCaption(dto.getCaption());
        post.setLocation(dto.getLocation());
        post.setDescription(dto.getDescription());
        repository.save(post);
        System.out.println("post added");



    }

    @Override
    public List<Post> getAllPost() {
        return repository.findAll();
    }

    @Override
    public void deletePost(Integer id) {
        repository.deleteById(id);

    }

    @Override
    public String savePostImage(String path ,MultipartFile file)  throws IOException {

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
