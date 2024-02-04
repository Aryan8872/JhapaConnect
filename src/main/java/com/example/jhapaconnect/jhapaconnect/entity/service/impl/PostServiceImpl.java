package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postrepo;
    private final ModelMapper mapper;
    private final UserRepository userrepo;
    private final CategoryRepository catrepo;


    @Override
    public PostDTO createPost(PostDTO postdto, Integer userId, Integer catId) {
        UserEntity user = userrepo.findById(userId).orElseThrow(()-> new NullPointerException("user notfound" + userId));
        Category category = catrepo.findById(catId).orElseThrow(()->new NullPointerException("category not found" + catId));
        Post post = mapper.map(postdto,Post.class);
        post.setImageName("default.png");
        post.setAddedDate(new Date());
        post.setUser(user);
        post.setCategory(category);

        Post newPost = postrepo.save(post);
        return mapper.map(newPost,PostDTO.class );



    }

    @Override
    public List<PostDTO> getAllPost() {
        List <Post> post  = postrepo.findAll();
        List<PostDTO> postdto =post.stream().map(
                (pos)->mapper.map(pos,PostDTO.class)).collect(Collectors.toList());

        return  postdto;

    }

    @Override
    public PostDTO getPostbyId(Integer postid) {
        return null;
    }

    @Override
    public List<Post> getPostbyCategory(Integer catID) {
        return null;
    }

    @Override
    public List<Post> getPostbyUser(UserEntity user) {
        return null;
    }

    @Override
    public List<Post> searchPost(String keyword) {
        return null;
    }

    @Override
    public Post updatePost(PostDTO postdto, Integer postId) {
        return null;
    }

    @Override
    public void deletePost(Integer id) {

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
