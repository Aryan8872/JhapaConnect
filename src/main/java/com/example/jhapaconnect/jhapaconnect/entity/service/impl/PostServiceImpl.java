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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
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
    public PostDTO createPost(PostDTO postdto, Integer userId) {
        UserEntity user = userrepo.findById(userId).orElseThrow(()-> new NullPointerException("user notfound" + userId));
        Post post = mapper.map(postdto,Post.class);
        post.setAddedDate(new Date());
        post.setUser(user);

        Post newPost = postrepo.save(post);
        return mapper.map(newPost,PostDTO.class );



    }

    @Override
    public List<PostDTO> getAllPost(String sortby,String sortDirect) {
            List<Post> allPosts;

            Sort sort = null;
            if(sortDirect.equalsIgnoreCase("asc")){
                sort=Sort.by(sortby).ascending();
            }
            else{
                sort = Sort.by(sortby).descending();
            }

            if (sortby != null && !sortby.isEmpty()) {
                allPosts = postrepo.findAll(sort); // Retrieve all data sorted
            } else {
                allPosts = postrepo.findAll(); // Retrieve all data without sorting
            }

            List<PostDTO> postDTOs = allPosts.stream()
                    .map(post -> mapper.map(post, PostDTO.class))
                    .collect(Collectors.toList());

            return postDTOs;


    }

    @Override
    public PostDTO getPostbyId(Integer postid) {
        Post post = postrepo.findById(postid).orElseThrow(() -> new NullPointerException("post of" + postid + "not found"));
        PostDTO postdto = mapper.map(post, PostDTO.class);
        return postdto;
    }

    @Override
    public List<PostDTO> getPostbyUser(Integer userId) {
        UserEntity user = userrepo.findById(userId).orElseThrow(()-> new NullPointerException("user with" + userId + "doesnot exist"));
        List<Post> posts = postrepo.findByUser(user);
        List<PostDTO> postdto = posts.stream().map((post->mapper.map(post, PostDTO.class))).collect(Collectors.toList());
        return  postdto;

    }

    @Override
    public List<PostDTO> searchPost(String keyword) {
        List<Post> posts = postrepo.findByDescriptionContaining(keyword);
        List<PostDTO> postdto = posts.stream().map((post)->mapper.map(post,PostDTO.class)).collect(Collectors.toList());
        return postdto;
    }

    @Override
    public PostDTO updatePost(PostDTO postdto, Integer postId) {
        Post post = postrepo.findById(postId).orElseThrow(()-> new NullPointerException());
        post.setDescription(postdto.getDescription());
        post.setLocation(postdto.getLocation());
        post.setTags(postdto.getTags());
        post.setAddedDate( new Date());
        post.setImageName(postdto.getImageName());
        Post updatedPost = postrepo.save(post);
        return mapper.map(updatedPost,PostDTO.class);

    }

    @Override
    public void deletePost(Integer postid) {
       Post post =  postrepo.findById(postid).orElseThrow(()->new NullPointerException());
        System.out.println(post);
        postrepo.delete(post);

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
