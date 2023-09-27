package com.op2.op2.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Category {

    @Id
    private String categoryName;
    private String description;

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

    @Override
    public String toString() {
        return "Category [categoryName = " + categoryName + " description = " + description + "]";
    }
}
