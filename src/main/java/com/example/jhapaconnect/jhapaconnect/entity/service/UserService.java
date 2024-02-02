package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //user crud operation
    public String createUser(UserDTO user);

    public ResponseEntity<String> deleteUser(Integer userid);

    public ResponseEntity<List<UserEntity>> getAlluser();
    public Optional<UserEntity> getById(Integer id);
}
