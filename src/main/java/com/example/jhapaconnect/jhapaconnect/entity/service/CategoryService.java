package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {

    public CategoryDTO createCategory(CategoryDTO categorydto);

    public CategoryDTO updateCategory(CategoryDTO categorydto,Integer categoryId);

    public void deleteCategory(Integer categoryId);

    public CategoryDTO getCategory(Integer categoryId);

//    public CategoryDTO getCategorybyname(String name);

    public List<CategoryDTO> getAllCategory();




}
