package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Item;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Post;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {
    List<Item> findByUser(UserEntity user);
    List <Item> findByCategory(Category category);
    List <Item> findByDescriptionContaining(String title);

}
