package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.EventCategory;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventcatRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;


import java.util.Optional;
import org.assertj.core.api.Assertions;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EventCategoryRepoTest {
    @Autowired
    private EventcatRepository eventcatRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveCategoryTest() {
        EventCategory category = new EventCategory();
        category.setCategoryTitle("Test Category");

        EventCategory savedCategory = eventcatRepository.save(category);

        Assertions.assertThat(savedCategory.getCategoryId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findByIdTest() {
        Optional<EventCategory> categoryOptional = eventcatRepository.findById(1);
        Assertions.assertThat(categoryOptional).isPresent();
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void updateCategoryTest() {
        Optional<EventCategory> optionalCategory = eventcatRepository.findById(1);
        Assertions.assertThat(optionalCategory).isPresent();

        EventCategory category = optionalCategory.get();
        category.setCategoryTitle("Updated Test Category");

        eventcatRepository.save(category);

        Optional<EventCategory> updatedCategoryOptional = eventcatRepository.findById(1);
        Assertions.assertThat(updatedCategoryOptional).isPresent();

        EventCategory updatedCategory = updatedCategoryOptional.get();
        Assertions.assertThat(updatedCategory.getCategoryTitle()).isEqualTo("Updated Test Category");
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void deleteCategoryTest() {
        Optional<EventCategory> optionalCategory = eventcatRepository.findById(1);
        Assertions.assertThat(optionalCategory).isPresent();

        EventCategory category = optionalCategory.get();
        eventcatRepository.delete(category);

        Optional<EventCategory> deletedCategoryOptional = eventcatRepository.findById(1);
        Assertions.assertThat(deletedCategoryOptional).isNotPresent();
    }
}
