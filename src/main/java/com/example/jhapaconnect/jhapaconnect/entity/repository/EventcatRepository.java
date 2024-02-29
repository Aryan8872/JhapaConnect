package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventcatRepository extends JpaRepository<EventCategory,Integer> {

}
