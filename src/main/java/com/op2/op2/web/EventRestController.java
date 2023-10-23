package com.op2.op2.web;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.op2.op2.domain.EventRepository;
import com.op2.op2.domain.Event;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EventRestController {
    private final Logger log = LoggerFactory.getLogger(EventRestController.class);

    @Autowired
    private EventRepository eventRepository;

    @GetMapping({ "/events" })
    public @ResponseBody List<Event> findAllEvents() {
        log.info("Fetching all events");
        try {
            return (List<Event>) eventRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No events found");
        }
    }
}