package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryrepository;
    private final ModelMapper modelMapper;
    @Override
    public CategoryDTO createCategory(CategoryDTO categorydto) {
        Category category = modelMapper.map(categorydto, Category.class);
        Category createdcat = categoryrepository.save(category);
        return modelMapper.map(createdcat,CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categorydto, Integer categoryId) {
        Category category = categoryrepository.findById(categoryId).orElseThrow(()-> new NullPointerException("category not found" + categoryId));
        category.setCategoryTitle(categorydto.getCategoryTitle());
        Category updatedCategory = categoryrepository.save(category);
        return  modelMapper.map(category,CategoryDTO.class);

    }

    @Override
    public void deleteCategory(Integer categoryId) {

        Category category = categoryrepository.findById(categoryId).orElseThrow(()->new NullPointerException("category not dounf" + categoryId));
        categoryrepository.delete(category);
    }

    @Override
    public CategoryDTO getCategory(Integer categoryId) {
        Category category = categoryrepository.findById(categoryId).orElseThrow(()-> new NullPointerException("category not found while getting"));

        return modelMapper.map(category , CategoryDTO.class);
    }


    @Override
    public List<CategoryDTO> getAllCategory() {

        List <Category> category  = categoryrepository.findAll();
        List<CategoryDTO> catdto =category.stream().map(
                (cat)->modelMapper.map(cat,CategoryDTO.class)).collect(Collectors.toList());

        return  catdto;
    }
}
