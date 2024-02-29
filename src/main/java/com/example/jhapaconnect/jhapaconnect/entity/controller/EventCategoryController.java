package com.example.jhapaconnect.jhapaconnect.entity.controller;
import com.example.jhapaconnect.jhapaconnect.entity.dto.CategoryDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.EventCatDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.CategoryService;
import com.example.jhapaconnect.jhapaconnect.entity.service.EventcatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/eventcategories")
public class EventCategoryController {

    private final EventcatService service;

    @PostMapping("/create")
    public ResponseEntity<EventCatDTO> createCategory(@RequestBody EventCatDTO dto){
        EventCatDTO newcat = service.createCategory(dto);
        return  new ResponseEntity<EventCatDTO>(newcat, HttpStatus.CREATED);
    }
    @PutMapping("/{catID}")
    public ResponseEntity<EventCatDTO> updateCategory(@RequestBody EventCatDTO dto ,@PathVariable Integer catID){
        EventCatDTO newcat = service.updateCategory(dto,catID);
        return  new ResponseEntity<EventCatDTO>(newcat, HttpStatus.OK);
    }

    @DeleteMapping("/{catID}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer catID){
        service.deleteCategory(catID);
        return  new ResponseEntity<String>("deleted", HttpStatus.OK);

    }

    @GetMapping("/{catID}")
    public ResponseEntity<EventCatDTO> getCategory(@PathVariable Integer catID){
        EventCatDTO getCat = service.getCategory(catID);
        return new ResponseEntity<EventCatDTO>(getCat, HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<List<EventCatDTO>> getallCategory(){
        List <EventCatDTO> allcat= service.getAllCategory();
        return ResponseEntity.ok(allcat);

    }





}
