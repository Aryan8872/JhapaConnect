package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //user crud operation
    public UserDTO updateUser(Integer id,UserDTO user);

    public ResponseEntity<String> deleteUser(Integer userid);


    public List<UserDTO> getAlluser();
    public UserDTO getById(Integer id);
    public UserDTO getUserdetailByUsername(String username) throws UsernameNotFoundException;

    }
