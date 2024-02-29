package com.example.jhapaconnect.jhapaconnect.entity;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRepoTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUserTest() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("whakdjaw");
        user.setPhoneno("28182912");

        UserEntity savedUser = userRepository.save(user);

        assertThat(savedUser.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findByIdTest() {
        Optional<UserEntity> userOptional = userRepository.findById(1);
        assertThat(userOptional).isPresent();
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void updateUserTest() {
        Optional<UserEntity> optionalUser = userRepository.findById(1);
        assertThat(optionalUser).isPresent();
        UserEntity user = optionalUser.get();

        user.setLastName("Smith");

        userRepository.save(user);

        Optional<UserEntity> updatedUserOptional = userRepository.findById(1);
        assertThat(updatedUserOptional).isPresent();
        UserEntity updatedUser = updatedUserOptional.get();

        assertThat(updatedUser.getLastName()).isEqualTo("Smith");
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void deleteUserTest() {
        Optional<UserEntity> optionalUser = userRepository.findById(1);
        assertThat(optionalUser).isPresent();
        UserEntity user = optionalUser.get();

        userRepository.delete(user);

        Optional<UserEntity> deletedUserOptional = userRepository.findById(1);

        assertThat(deletedUserOptional).isNotPresent();
    }
    @Test
    @Order(5)
    @Rollback(value = false)
    public void findByEmailTest() {
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setFirstName("John");
        user.setPassword("kjjdjjd");
        user.setPhoneno("8787727");
        user.setLastName("Doe");

        userRepository.save(user);

        Optional<UserEntity> foundUser = userRepository.findByEmail("test@example.com");

        assertThat(foundUser).isPresent();
    }

    @Test
    @Order(6)
    @Rollback(value = false)
    public void getUserByEmailTest() {
        UserEntity user = new UserEntity();
        user.setEmail("test2@example.com");
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setPassword("kjjdjjd");
        user.setPhoneno("8787727");

        userRepository.save(user);

        Optional<UserEntity> foundUser = userRepository.getUserByEmail("test2@example.com");

        assertThat(foundUser).isPresent();
    }
}
