package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.EventCatDTO;

import java.util.List;

public interface EventcatService {
    public EventCatDTO createCategory(EventCatDTO categorydto);

    public EventCatDTO updateCategory(EventCatDTO categorydto,Integer categoryId);

    public void deleteCategory(Integer categoryId);

    public EventCatDTO getCategory(Integer categoryId);

//    public CategoryDTO getCategorybyname(String name);

    public List<EventCatDTO> getAllCategory();

}
