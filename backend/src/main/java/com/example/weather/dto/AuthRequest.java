package com.example.weather.dto;

public class AuthRequest {
    private String email;
    private String password;
    private String username;
    // Getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
