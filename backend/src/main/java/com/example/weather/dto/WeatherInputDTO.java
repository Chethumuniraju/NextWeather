package com.example.weather.dto;

public class WeatherInputDTO {
    private double date_month;
    private double precipitation;
    private double temp_max;
    private double temp_min;
    private double wind;

    // Getters and Setters
    public double getDate_month() {
        return date_month;
    }

    public void setDate_month(double date_month) {
        this.date_month = date_month;
    }

    public double getPrecipitation() {
        return precipitation;
    }

    public void setPrecipitation(double precipitation) {
        this.precipitation = precipitation;
    }

    public double getTemp_max() {
        return temp_max;
    }

    public void setTemp_max(double temp_max) {
        this.temp_max = temp_max;
    }

    public double getTemp_min() {
        return temp_min;
    }

    public void setTemp_min(double temp_min) {
        this.temp_min = temp_min;
    }

    public double getWind() {
        return wind;
    }

    public void setWind(double wind) {
        this.wind = wind;
    }
}
