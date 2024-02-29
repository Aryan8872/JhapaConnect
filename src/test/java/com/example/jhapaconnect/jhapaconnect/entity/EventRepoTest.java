package com.example.jhapaconnect.jhapaconnect.entity;

import com.example.jhapaconnect.jhapaconnect.entity.entity.EventCategory;
import com.example.jhapaconnect.jhapaconnect.entity.entity.EventEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventcatRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EventRepoTest {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventcatRepository eventcatRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveEventTest() {
        EventEntity event = new EventEntity();
        event.setId(1);
        event.setTitle("eventtitle");
        event.setDescription("Test Event");
        event.setLocation("Test Location");
        event.setAddedDate(new Date());

        EventCategory category = new EventCategory();
        category.setCategoryTitle("Title");
        category.setCategoryId(1);
        eventcatRepository.save(category);

        event.setUser(userRepository.findById(1).orElse(null));
        event.setCategory(eventcatRepository.findById(1).orElse(null));

        EventEntity savedEvent = eventRepository.save(event);

        Assertions.assertThat(savedEvent.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findByIdTest() {
        Optional<EventEntity> eventOptional = eventRepository.findById(1);
        Assertions.assertThat(eventOptional).isPresent();
    }

    @Test
    @Order(3)
    public void findByCategoryCategoryTitleTest() {
        List<EventEntity> events = eventRepository.findByCategoryCategoryTitle("Title");
        Assertions.assertThat(events).isNotEmpty();
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateEventTest() {
        EventCategory cat  = new EventCategory();
        cat.setCategoryId(2);
        cat.setCategoryTitle("secind cat");
        eventcatRepository.save(cat);

        Optional<EventEntity> optionalEvent = eventRepository.findById(1);
        Assertions.assertThat(optionalEvent).isPresent();

        EventEntity event = optionalEvent.get();
        event.setDescription("Updated Test Event");
        event.setTitle("updated title");
        event.setCategory(cat);

        eventRepository.save(event);

        Optional<EventEntity> updatedEventOptional = eventRepository.findById(1);
        Assertions.assertThat(updatedEventOptional).isPresent();

        EventEntity updatedEvent = updatedEventOptional.get();
        Assertions.assertThat(updatedEvent.getDescription()).isEqualTo("Updated Test Event");
    }
    @Test
    @Order(5)
    public void findByTitleContainingTest() {
        List<EventEntity> events = eventRepository.findByTitleContaining("updated title");
        Assertions.assertThat(events).isNotEmpty();
    }

    @Test
    @Order(6)
    @Rollback(value = false)
    public void deleteEventTest() {
        Optional<EventEntity> optionalEvent = eventRepository.findById(1);
        Assertions.assertThat(optionalEvent).isPresent();

        EventEntity event = optionalEvent.get();
        eventRepository.delete(event);

        Optional<EventEntity> deletedEventOptional = eventRepository.findById(1);
        Assertions.assertThat(deletedEventOptional).isNotPresent();
    }




}
