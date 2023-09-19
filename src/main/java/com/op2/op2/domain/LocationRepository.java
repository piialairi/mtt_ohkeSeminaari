package com.op2.op2.domain;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long>{

    List<Location> findByCity(String city); 
    Location findByLocationId(Long locationId); 
}
