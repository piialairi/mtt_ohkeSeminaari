package com.op2.op2.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op2.op2.domain.Event;
import com.op2.op2.domain.EventRepository;

@Controller
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    // List all Events
    @RequestMapping(value = "/eventlist", method = RequestMethod.GET)
    public String eventList(Model model) {
        List<Event> events = (List<Event>) eventRepository.findAll();
        model.addAttribute("events", events);
        return "eventlist";
    }
}
