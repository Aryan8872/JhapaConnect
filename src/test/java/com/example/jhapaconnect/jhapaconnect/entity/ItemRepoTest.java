package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.Category;
import com.example.jhapaconnect.jhapaconnect.entity.entity.Item;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.ItemRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ItemRepoTest {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;


    @Test
    @Order(1)
    @Rollback(value = false)
    public void testCreateItem() {
        UserEntity user = new UserEntity();
        user.setId(1);
        user.setFirstName("test");
        user.setLastName("user");
        user.setEmail("test@gmail.com");
        user.setPassword("test123");
        user.setPhoneno("98157282");
        userRepository.save(user);

        Category category = new Category();
        category.setCategoryId(1);
        category.setCategoryTitle("category");
        categoryRepository.save(category);



        Item item = new Item();
        item.setId(1);
        item.setLocation("testloc");
        item.setPrice("2000");
        item.setTitle("Test Item");
        item.setAddedDate(new Date());
        item.setUser(user);
        item.setCategory(category);

        item = itemRepository.save(item);

        Assertions.assertThat(item.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void getItemByIdTest() {
        Optional<Item> optionalItem = itemRepository.findById(1);
        Assertions.assertThat(optionalItem).isPresent();
    }

    @Test
    @Order(3)
    public void getAllItemsTest() {
        List<Item> items = itemRepository.findAll();
        Assertions.assertThat(items.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateItemTest() {
        Optional<Item> optionalItem = itemRepository.findById(1);
        Assertions.assertThat(optionalItem).isPresent();

        Item item = optionalItem.get();
        item.setTitle("Updated Item Name");

        itemRepository.save(item);

        Optional<Item> updatedItemOptional = itemRepository.findById(1);
        Assertions.assertThat(updatedItemOptional).isPresent();

        Item updatedItem = updatedItemOptional.get();
        Assertions.assertThat(updatedItem.getTitle()).isEqualTo("Updated Item Name");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteItemTest() {
        Optional<Item> optionalItem = itemRepository.findById(1);
        Assertions.assertThat(optionalItem).isPresent();

        Item item = optionalItem.get();
        itemRepository.delete(item);

        Optional<Item> deletedItemOptional = itemRepository.findById(1);
        Assertions.assertThat(deletedItemOptional).isNotPresent();
    }
}
