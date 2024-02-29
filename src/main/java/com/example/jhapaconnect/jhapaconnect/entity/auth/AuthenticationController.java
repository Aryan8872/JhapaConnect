package com.example.jhapaconnect.jhapaconnect.entity.auth;


import com.example.jhapaconnect.jhapaconnect.entity.config.JwtService;
import com.example.jhapaconnect.jhapaconnect.entity.entity.UserEntity;
import com.example.jhapaconnect.jhapaconnect.entity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){

        return  ResponseEntity.ok(service.register(request));

    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return  ResponseEntity.ok(service.authenticate(request));

    }

    @GetMapping("/mess")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("heelo");
    }


}
