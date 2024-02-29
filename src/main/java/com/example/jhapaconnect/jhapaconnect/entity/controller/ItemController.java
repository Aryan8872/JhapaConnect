package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.Fileservice;
import com.example.jhapaconnect.jhapaconnect.entity.service.Itemservice;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins =  "http://localhost:5173")

public class ItemController {
    private final Itemservice service;
    private final Fileservice fileService;



    @Value("/images")
    private String path;


    @PostMapping("/user/{userId}/category/{catId}/item")
    public ResponseEntity<ItemsDTO> createItem(
            @RequestBody ItemsDTO dto,
            @PathVariable Integer userId,
            @PathVariable Integer catId
    ) {




        ItemsDTO item = service.createItem(dto, userId, catId);

        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/items")

    public ResponseEntity<List<ItemsDTO>> getPostbyuser(@PathVariable Integer userId){
        List<ItemsDTO> posts = service.getItembyUser(userId);
        return  new ResponseEntity<List<ItemsDTO>>(posts,HttpStatus.OK);
    }

    @GetMapping("/category/{title}/items")

    public ResponseEntity<List<ItemsDTO>> getItembycategory(@PathVariable("title") String title){
        List<ItemsDTO> posts = service.getItembyCategory(title);
        return  new ResponseEntity<List<ItemsDTO>>(posts,HttpStatus.OK);
    }

    @GetMapping("/items")
    public List<ItemsDTO> getallItems(
            @RequestParam(value = "sortBy",
                    defaultValue = "id",required = false) String sortBy,
            @RequestParam(value = "sortDirection" ,defaultValue = "asc",required = false) String sortDirect){

        return service.getAllItems(sortBy,sortDirect);
    }

    @GetMapping(value = "/item/image/{imageName}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {
        InputStream resource = fileService.getResource(path,imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());

    }


    @DeleteMapping("/item/delete/{id}")
    public ResponseEntity <String> delteItem(@PathVariable("id") Integer id){
        service.deleteItem(id);
        return  ResponseEntity.ok("sucessfully  deleted");
    }

    @PutMapping("/update/item/{itemId}")
    public ResponseEntity<ItemsDTO> updateItem(@RequestBody ItemsDTO postDTO, @PathVariable Integer itemId){
        ItemsDTO updateditem = service.updateItem(postDTO,itemId);
        return  new ResponseEntity<>(updateditem,HttpStatus.OK);
    }

    @GetMapping("/items/search/{keywords}")
    public ResponseEntity<List<ItemsDTO>> searchItembyDescripption(@PathVariable ("keywords") String keywords){
        List<ItemsDTO> searchResult = service.searchItem(keywords);
        return  new ResponseEntity<List<ItemsDTO>>(searchResult,HttpStatus.OK);
    }



    @PostMapping("/item/image/upload/{itemId}")
    public ResponseEntity<ItemsDTO> uploadItemImage(@RequestParam("image") MultipartFile image, @PathVariable Integer itemId
    ) throws IOException {

        String fileName=  fileService.uploadImage(path,image);
        ItemsDTO itemDTO =  service.getItembyId(itemId);
        itemDTO.setImageName(fileName);
        ItemsDTO updateditem = service.updateItem(itemDTO,itemId);
        return  new ResponseEntity<ItemsDTO>(updateditem,HttpStatus.OK);

    }

    @GetMapping("/item/{postId}")

    public ResponseEntity<ItemsDTO> getPostbyid(@PathVariable("postId") Integer itemid){
        ItemsDTO dto =  service.getItembyId(itemid);
        return new ResponseEntity<ItemsDTO>(dto, HttpStatus.OK);
    }

}
