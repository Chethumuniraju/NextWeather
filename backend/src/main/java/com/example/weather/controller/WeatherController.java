package com.example.weather.controller;

import com.example.weather.service.WeatherService;
import io.jsonwebtoken.JwtException;
import com.example.weather.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class WeatherController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather")
    public ResponseEntity<String> getCurrentWeather(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam double lat,
        @RequestParam double lon
    ) {
        // Check if Authorization header is valid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization header missing or incorrect");
        }

        // Extract the token from the header
        String token = authHeader.substring(7);

        // Extract email from the token
        String email;
        try {
            email = jwtService.extractEmail(token);
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // Validate the token with the extracted email
        if (!jwtService.isTokenValid(token, email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        // Fetch the weather data from the WeatherService
        String weather = weatherService.fetchCurrentWeather(lat, lon);

        // Return the weather response
        return ResponseEntity.ok(weather);
    }

    @GetMapping("/air-pollution")
    public ResponseEntity<String> getAirPollution(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam double lat,
        @RequestParam double lon
    ) {
        // Check if Authorization header is valid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization header missing or incorrect");
        }

        // Extract the token from the header
        String token = authHeader.substring(7);

        // Extract email from the token
        String email;
        try {
            email = jwtService.extractEmail(token);
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        // Validate the token with the extracted email
        if (!jwtService.isTokenValid(token, email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        // Fetch the air pollution data from the WeatherService
        String airPollution = weatherService.fetchAirPollution(lat, lon);

        // Return the air pollution response
        return ResponseEntity.ok(airPollution);
    }
}
