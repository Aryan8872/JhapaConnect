package com.example.jhapaconnect.jhapaconnect.entity.repository;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {




}
