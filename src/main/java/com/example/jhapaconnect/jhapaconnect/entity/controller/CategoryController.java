package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/categories")
public class CategoryController {
    private final CategoryService service;

    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO dto){
        CategoryDTO newcat = service.createCategory(dto);
        return  new ResponseEntity<CategoryDTO>(newcat, HttpStatus.CREATED);
    }
    @PutMapping("/{catID}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO dto ,@PathVariable Integer catID){
        CategoryDTO newcat = service.updateCategory(dto,catID);
        return  new ResponseEntity<CategoryDTO>(newcat, HttpStatus.OK);
    }

    @DeleteMapping("/{catID}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer catID){
        service.deleteCategory(catID);
        return  new ResponseEntity<String>("deleted", HttpStatus.OK);

    }

    @GetMapping("/{catID}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable Integer catID){
        CategoryDTO getCat = service.getCategory(catID);
        return new ResponseEntity<CategoryDTO>(getCat, HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> getallCategory(){
        List <CategoryDTO> allcat= service.getAllCategory();
        return ResponseEntity.ok(allcat);

    }






}
