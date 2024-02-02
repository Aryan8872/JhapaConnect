package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //user crud operation
    public String createUser(UserDTO user);

    public boolean deleteUser(Long userid);

    public List<UserEntity> getAlluser();
    Optional <UserEntity> getById(Integer id);
}
