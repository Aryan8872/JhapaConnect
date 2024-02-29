package com.example.jhapaconnect.jhapaconnect.entity.auth;

import com.example.jhapaconnect.jhapaconnect.entity.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private UserDTO user;
}
