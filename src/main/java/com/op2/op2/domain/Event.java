package com.op2.op2.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long eventId;
    private String eventName;
    private String date;
    private String description;
    private double price;

    public Event() {

    }

    public Event(String eventName, String date, String description, double price) {
        super();
        this.eventName = eventName;
        this.date = date;
        this.description = description;
        this.price = price;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Event [eventId = " + eventId + " eventName = " + eventName + " date = " + date + " description = " + description + " price = " + price + "]";
    }

}
