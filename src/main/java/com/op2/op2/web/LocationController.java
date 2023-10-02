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
// import org.springframework.web.bind.annotation.PathVariable;

import com.op2.op2.domain.Location;
import com.op2.op2.domain.LocationRepository;;

@Controller
public class LocationController {
    
    @Autowired
    private LocationRepository locationRepository;

    //List all locations
    @RequestMapping(value = "/locationlist", method = RequestMethod.GET)
    public String locationList(Model model) {
        List<Location> locations = (List<Location>) locationRepository.findAll();
        model.addAttribute("locations", locations);
        return "locationlist";
    }

    //Add new location
    @GetMapping("/addLocation")
    public String addLocation(Model model) {
        model.addAttribute("newlocation", new Location());
        return "addlocation";
    }
 /*
    //Edit location
    @GetMapping("/editLocation/{id}")
    public String editLocation(@PathVariable("id") Long locationId, Model model){
        model.addAttribute("editLocation", locationRepository.findById(locationId));
        return "addlocation";
    }
*/
    @PostMapping("/saveLocation")
    public String saveLocation(Location location){
        locationRepository.save(location);
        return "redirect:locationlist";
    }

    @RequestMapping(value = "/deleteLocation/{locationId}", method = RequestMethod.GET)
    public String deleteLocation(@PathVariable("locationId") Long locationId) {
        locationRepository.deleteById(locationId);
        return "redirect:/locationlist";
    }

}
