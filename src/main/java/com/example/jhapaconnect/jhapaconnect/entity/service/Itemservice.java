package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface Itemservice {
    ItemsDTO createItem(ItemsDTO itemdto, Integer userId, Integer catId );
    List<ItemsDTO> getAllItems(String sortBy , String sortDirect);
    ItemsDTO getItembyId(Integer itemid);

    List<ItemsDTO> getItembyCategory(String title);
    List <ItemsDTO> getItembyUser(Integer userId);

    List <ItemsDTO> searchItem(String keyword);

    ItemsDTO updateItem(ItemsDTO itemdto , Integer itemId , Integer catId);
    void deleteItem(Integer postid);



}
