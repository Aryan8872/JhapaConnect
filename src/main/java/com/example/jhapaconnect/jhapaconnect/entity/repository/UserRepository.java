package com.example.jhapaconnect.jhapaconnect.entity.repository;

import jakarta.transaction.Transactional;
import  org.springframework.data.jpa.repository.JpaRepository;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{


    //fetch user using email

    Optional<UserEntity> findByEmail(String email);


    @Query(value = "select * from users where email=?1", nativeQuery = true)
    Optional<UserEntity> getUserByEmail(String email);
}
