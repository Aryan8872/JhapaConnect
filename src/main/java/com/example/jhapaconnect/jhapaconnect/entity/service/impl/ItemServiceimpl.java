package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Item;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.ItemRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.PostRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.Itemservice;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
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
public class ItemServiceimpl implements Itemservice {
    private final ItemRepository itemrepo;
    private final ModelMapper mapper;
    private final UserRepository userrepo;
    private final CategoryRepository catrepo;




    @Override
    public ItemsDTO createItem(ItemsDTO itemdto, Integer userId, Integer catId) {
        UserEntity user = userrepo.findById(userId).orElseThrow(()-> new NullPointerException("user notfound" + userId));
        Category category = catrepo.findById(catId).orElseThrow(()->new NullPointerException("category not found" + catId));
        Item item = mapper.map(itemdto,Item.class);
        item.setAddedDate(new Date());
        item.setUser(user);
        item.setCategory(category);

        Item newItem = itemrepo.save(item);
        return mapper.map(newItem,ItemsDTO.class );
    }

    @Override
    public List<ItemsDTO> getAllItems(String sortBy, String sortDirect) {
        List<Item> allItems;

        Sort sort = null;
        if(sortDirect.equalsIgnoreCase("asc")){
            sort=Sort.by(sortBy).ascending();
        }
        else{
            sort = Sort.by(sortBy).descending();
        }

        if (sortBy != null && !sortBy.isEmpty()) {
            allItems = itemrepo.findAll(sort); // Retrieve all data sorted
        } else {
            allItems = itemrepo.findAll(); // Retrieve all data without sorting
        }

        List<ItemsDTO> itemDTOs = allItems.stream()
                .map(item -> mapper.map(item, ItemsDTO.class))
                .collect(Collectors.toList());

        return itemDTOs;    }

    @Override
    public ItemsDTO getItembyId(Integer itemid) {

        Item item = itemrepo.findById(itemid).orElseThrow(()-> new NullPointerException("post of" + itemid +"not found"));
        ItemsDTO itemdto = mapper.map(item,ItemsDTO.class);
        return itemdto;
    }

    @Override
    public List<ItemsDTO> getItembyCategory(String title) {
            List <Item> items = itemrepo.findItemByCategoryCategoryTitleContaining(title);
            List <ItemsDTO> dto = items.stream().map((item)->mapper.map(item,ItemsDTO.class)).collect(Collectors.toList());
            return  dto;
    }

    @Override
    public List<ItemsDTO> getItembyUser(Integer userId) {
        return null;
    }

    @Override
    public List<ItemsDTO> searchItem(String keyword) {
        List<Item> items = itemrepo.findByTitleContaining(keyword);
        List<ItemsDTO> itemdto = items.stream().map((item)->mapper.map(item,ItemsDTO.class)).collect(Collectors.toList());
        return itemdto;    }

    @Override
    public ItemsDTO updateItem(ItemsDTO itemdto, Integer itemId , Integer catId) {
        Item item = itemrepo.findById(itemId).orElseThrow(()-> new NullPointerException());
        Category cat = catrepo.findById(catId).orElseThrow(()->new NullPointerException("category not found"));
        item.setDescription(itemdto.getDescription());
        item.setLocation(itemdto.getLocation());
        item.setAddedDate( new Date());
        item.setTitle(itemdto.getTitle());
        item.setImageName(itemdto.getImageName());
        item.setCategory(cat);
        Item updatedItem = itemrepo.save(item);
        return mapper.map(updatedItem,ItemsDTO.class);
    }

    @Override
    public void deleteItem(Integer postid) {
        Item item =  itemrepo.findById(postid).orElseThrow(()->new NullPointerException());
        itemrepo.delete(item);

    }


}
