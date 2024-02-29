package com.example.jhapaconnect.jhapaconnect.entity.controller;


import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class UserController {
    private final UserService userService;


    @GetMapping("/all")
    public List<UserDTO> getAllusers(){
        return userService.getAlluser();
    }

    @GetMapping("/{id}/details")
    public UserDTO getUserdetbyid(@PathVariable("id") Integer userId){
        return userService.getById(userId);

    }

    @PostMapping("{id}/update")
    public UserDTO updateUser(@PathVariable("id") Integer userid, @RequestBody UserDTO dto){
        return userService.updateUser(userid,dto);
    }

    @DeleteMapping("/delete/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable("userid") Integer userid) {
        userService.deleteUser(userid);
        return ResponseEntity.ok("deleted sucessfully");
    }
}


