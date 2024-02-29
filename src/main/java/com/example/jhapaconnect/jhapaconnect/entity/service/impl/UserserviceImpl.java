package com.example.jhapaconnect.jhapaconnect.entity.service.impl;
import com.example.jhapaconnect.jhapaconnect.entity.dto.PostDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Roles;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import  com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class UserserviceImpl implements UserDetailsService , UserService {
    private final UserRepository repository;
    private final ModelMapper mapper;
    private  final PasswordEncoder passwordEncoder;

    private final static String USER_NOT_FOUND = "user with email %s not found";
    UserEntity user = new UserEntity();

    public UserDTO updateUser(Integer id,UserDTO dto) {
        System.out.println(id);

        if(id!=null){
            user= (repository.findById(id).orElseThrow(()-> new NullPointerException("user not found")));

        }
        user.setId(id);
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneno(dto.getPhoneNo());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Roles.User);
        repository.save(user);
        return mapper.map(user,UserDTO.class);
    }

    public ResponseEntity<String> deleteUser(Integer userid) {
        repository.deleteById(userid);
        return ResponseEntity.ok("deleted sucessfully");
    }




    public List<UserDTO> getAlluser() {

        List <UserEntity> users = repository.findAll();
        List<UserDTO> dto = users.stream().map((user)->mapper.map(user,UserDTO.class)).collect(Collectors.toList());
        return dto;

    }

    public UserDTO getById(Integer id) {

       Optional< UserEntity> user =  repository.findById(id);
        return (mapper.map(user,UserDTO.class));
    }

    @Override
    public UserDTO getUserdetailByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = repository.getUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND,username)));
        return mapper.map (user,UserDTO.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
