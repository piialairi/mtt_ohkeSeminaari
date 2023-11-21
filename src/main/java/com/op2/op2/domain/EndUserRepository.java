package com.op2.op2.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EndUserRepository extends CrudRepository<EndUser, Long> {

    EndUser findByUsername(String username);
    List<EndUser> findByUserId(Long userId);

}
