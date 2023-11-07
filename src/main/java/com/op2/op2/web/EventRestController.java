package com.op2.op2.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.op2.op2.domain.EventRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.op2.op2.domain.Event;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name="Event REST", description="Information about events")
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
    //fetch event by id
    @GetMapping({ "/events/{id}" })
    public @ResponseBody Event findByEventId(@PathVariable("id") Long eventId){
        log.info("Fetch event by id");
        try{
            return eventRepository.findByEventId(eventId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find an event");
        }
    }
    @PostMapping({ "/events" })
    public Event newEvent (@RequestBody Event newEvent){
        log.info("Save new event " + newEvent);
        try{
        return eventRepository.save(newEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Couldn't create new event");
        }
    }

    @DeleteMapping({"/events/delete/{id}"})
    void deleteEvent(@PathVariable Long eventId) {
        try{
            eventRepository.deleteById(eventId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }
    }
}