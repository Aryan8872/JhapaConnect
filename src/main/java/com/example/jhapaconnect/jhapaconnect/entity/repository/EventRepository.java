package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity,Integer> {

    List <EventEntity> findByTitleContaining(String title);
    List<EventEntity> findByCategoryCategoryTitle(String title);



}
