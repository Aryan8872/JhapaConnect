package com.example.jhapaconnect.jhapaconnect.entity;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class JhapaConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(JhapaConnectApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();

    }

}
