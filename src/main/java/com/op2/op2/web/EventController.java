package com.op2.op2.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op2.op2.domain.Event;
import com.op2.op2.domain.EventRepository;
// import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    // List all Events
    @RequestMapping(path = "/eventlist", method = RequestMethod.GET)
    public String eventList(Model model) {
        List<Event> events = (List<Event>) eventRepository.findAll();
        model.addAttribute("events", events);
        return "eventlist";
    }

    //Add event
    @GetMapping("/addEvent")
    public String addEvent(Model model) {
        model.addAttribute("newevent", new Event());
        return "addevent";
    }

    //Edit event
    @GetMapping("/editEvent/{id}")
    public String editEvent(@PathVariable("id") Long eventId, Model model) {
        model.addAttribute("editEvent", eventRepository.findById(eventId));
        return "editevent";
    }
    
    //Save event
    @PostMapping("/saveEvent")
    public String saveEvent(Event event) {
        eventRepository.save(event);
        return "redirect:eventlist";
    }

    @RequestMapping(value="/delete/{eventId}", method=RequestMethod.GET)
    public String deleteEvent(@PathVariable("eventId") Long eventId)  {
        eventRepository.deleteById(eventId);
        return "redirect:/eventlist";
    }
    
}
