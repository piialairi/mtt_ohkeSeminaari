package com.op2.op2.domain;

import org.springframework.data.repository.CrudRepository;
import java.util.List;


public interface CategoryRepository extends CrudRepository<Category, String> {
    
    List<Category> findByCategoryName(String categoryName);

    Category findAllByCategoryName(String categoryName);

}
