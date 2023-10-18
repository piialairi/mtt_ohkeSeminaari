package com.op2.op2.domain;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eventId;
    @Size(min = 1, max = 30, message = "Name must be between 1 and 30 characters")
    @NotEmpty(message = "Name cannot be empty")
    private String eventName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Date is required")
    private LocalDate date;
    private String description;
    private double price;
    private String streetAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "locationId")
    private Location location;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryName")
    private Category category;

    public Event() {

    }

    public Event(String eventName, LocalDate date, String description, double price, String streetAddress) {
        super();
        this.eventName = eventName;
        this.date = date;
        this.description = description;
        this.price = price;
        this.streetAddress = streetAddress;
    }

    public Event(String eventName, LocalDate date, String description, double price, String streetAddress, Location location) {
        super();
        this.eventName = eventName;
        this.date = date;
        this.description = description;
        this.price = price;
        this.streetAddress = streetAddress;
        this.location = location;
    }

    public Event(String eventName, LocalDate date, String description, double price, String streetAddress, Location location,
            Category category) {
        super();
        this.eventName = eventName;
        this.date = date;
        this.description = description;
        this.price = price;
        this.streetAddress = streetAddress;
        this.location = location;
        this.category = category;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
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
    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }
    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    /*
     * @Override
     * public String toString() {
     * return "Event [eventId = " + eventId + " eventName = " + eventName +
     * " date = " + date + " description = " + description + " price = " + price +
     * "]";
     * }
     
    * @Override
    * public String toString() {
    *     return "Event [eventId = " + eventId + " eventName = " + eventName + " date = " + date + " description = "
    *             + description + " price = " + price + ", location=" + location + "]";
    * }
    */
    @Override
    public String toString() {
        return "Event [eventId = " + eventId + " eventName = " + eventName + " date = " + date + " description = "
                + description + " price = " + price + " streetaddress =" + streetAddress+ " location=" + location + " category = " + category + "]";
    }
}
