package com.example.jhapaconnect.jhapaconnect.entity.service.impl;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import  com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserserviceImpl implements UserDetailsService , UserService {
    private final UserRepository repository;
    UserEntity user = new UserEntity();

    public String createUser(UserDTO dto) {
        /** suppose a user sends his data from frontend, here the data comes if the id is not null it checks if the data with
        that data id exists or not if exists it sets the entity object with that data and the entity will have the data from the database now if the data sent by user
         contains the changes, then it sets the dtaa of entity with the stored data from frontend in dto in this way it will update the data**/
        if(dto.getId()!=null){
            user= (repository.findById(dto.getId()).orElseThrow(()-> new NullPointerException("user not found")));

        }


        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneno(dto.getPhoneNo());
        user.setPassword(dto.getPassword());
        repository.save(user);
        return "created";



    }



    public ResponseEntity<String> deleteUser(Integer userid) {
        repository.deleteById(userid);
        return ResponseEntity.ok("deleted sucessfully");
    }



    public ResponseEntity<List<UserEntity>> getAlluser() {

        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("userData/{id}")
    public Optional<UserEntity> getById(@PathVariable("id") Integer id) {
        return repository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return  this.repository.getUserByEmail(username).orElseThrow(() -> new EntityNotFoundException("user not found"));
    }
}
