package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.assertj.core.api.Assertions;

import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CategoryRepoTest {
        @Autowired
        private CategoryRepository categoryRepository;

        @Test
        @Order(1)
        @Rollback(value = false)
        public void saveCategoryTest() {
            Category category = new Category();
            category.setCategoryTitle("Test Category");

            Category savedCategory = categoryRepository.save(category);

            Assertions.assertThat(savedCategory.getCategoryId()).isGreaterThan(0);
        }

        @Test
        @Order(2)
        public void findByIdTest() {
            Optional<Category> categoryOptional = categoryRepository.findById(1);
            Assertions.assertThat(categoryOptional).isPresent();
        }

        @Test
        @Order(3)
        @Rollback(value = false)
        public void updateCategoryTest() {
            Optional<Category> optionalCategory = categoryRepository.findById(1);
            Assertions.assertThat(optionalCategory).isPresent();

            Category category = optionalCategory.get();
            category.setCategoryTitle("Updated Test Category");

            categoryRepository.save(category);

            Optional<Category> updatedCategoryOptional = categoryRepository.findById(1);
            Assertions.assertThat(updatedCategoryOptional).isPresent();

            Category updatedCategory = updatedCategoryOptional.get();
            Assertions.assertThat(updatedCategory.getCategoryTitle()).isEqualTo("Updated Test Category");
        }

        @Test
        @Order(4)
        @Rollback(value = false)
        public void deleteCategoryTest() {
            Optional<Category> optionalCategory = categoryRepository.findById(1);
            Assertions.assertThat(optionalCategory).isPresent();

            Category category = optionalCategory.get();
            categoryRepository.delete(category);

            Optional<Category> deletedCategoryOptional = categoryRepository.findById(1);
            Assertions.assertThat(deletedCategoryOptional).isNotPresent();
        }
}
