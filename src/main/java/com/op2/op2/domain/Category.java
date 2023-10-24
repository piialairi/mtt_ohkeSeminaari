package com.op2.op2.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Category {

    @Id
    @NotEmpty(message = "Category name cannot be empty")
    @Size(min = 1, max = 30, message = "Category name must be between 1 and 30 characters")
    private String categoryName;

    @NotEmpty(message = "Description cannot be empty")
    private String description;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Event> events;

    public Category() {

    }

    public Category(String categoryName, String description) {
        super();
        this.categoryName = categoryName;
        this.description = description;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    @Override
    public String toString() {
        return "Category [categoryName = " + categoryName + " description = " + description + "]";
    }
}
