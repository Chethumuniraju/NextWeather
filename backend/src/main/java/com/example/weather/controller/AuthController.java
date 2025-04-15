package com.example.weather.controller;

import com.example.weather.model.User;
import com.example.weather.security.JwtService;
import com.example.weather.service.UserService;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userService.saveUser(user);
        return "User registered successfully!";
    }

  @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    User user = userService.findByEmail(request.getEmail());
    
    if (user == null || !new BCryptPasswordEncoder().matches(request.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
    }

    String token = jwtService.generateToken(user.getEmail());
    return ResponseEntity.ok(token);
}


    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }
}
