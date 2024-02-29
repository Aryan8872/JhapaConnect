package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.EventCatDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.EventCategory;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventcatRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.EventcatService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventcatServiceImpl implements EventcatService {

    private final EventcatRepository categoryrepository;
    private final ModelMapper modelMapper;
    @Override
    public EventCatDTO createCategory(EventCatDTO categorydto) {
        EventCategory category = modelMapper.map(categorydto, EventCategory.class);
        EventCategory createdcat = categoryrepository.save(category);
        return modelMapper.map(createdcat,EventCatDTO.class);
    }

    @Override
    public EventCatDTO updateCategory(EventCatDTO categorydto, Integer categoryId) {
        EventCategory category = categoryrepository.findById(categoryId).orElseThrow(()-> new NullPointerException("category not found" + categoryId));
        category.setCategoryTitle(categorydto.getCategoryTitle());
        EventCategory updatedCategory = categoryrepository.save(category);
        return  modelMapper.map(category,EventCatDTO.class);

    }

    @Override
    public void deleteCategory(Integer categoryId) {

        EventCategory category = categoryrepository.findById(categoryId).orElseThrow(()->new NullPointerException("category not dounf" + categoryId));
        categoryrepository.delete(category);
    }

    @Override
    public EventCatDTO getCategory(Integer categoryId) {
        EventCategory category = categoryrepository.findById(categoryId).orElseThrow(()-> new NullPointerException("category not found while getting"));

        return modelMapper.map(category , EventCatDTO.class);
    }

//    @Override
//    public CategoryDTO getCategorybyname(String name) {
//        Category category = categoryrepository.findby
//
//        return modelMapper.map(category , CategoryDTO.class);    }

    @Override
    public List<EventCatDTO> getAllCategory() {

        List <EventCategory> category  = categoryrepository.findAll();
        List<EventCatDTO> catdto =category.stream().map(
                (cat)->modelMapper.map(cat,EventCatDTO.class)).collect(Collectors.toList());

        return  catdto;
    }
}
