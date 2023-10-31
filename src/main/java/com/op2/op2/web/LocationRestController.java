package com.op2.op2.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.op2.op2.domain.Location;
import com.op2.op2.domain.LocationRepository;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;

@RestController
@CrossOrigin("http://localhost:5173")
@Tag(name="Location REST", description="Information on locations")
public class LocationRestController {
    private final Logger log = LoggerFactory.getLogger(LocationRestController.class);

    @Autowired
    private LocationRepository locationRepo;

    //get all locations json
    @GetMapping({ "/locations" })
    public @ResponseBody List<Location> findAllLocations() {
        log.info("Fetch all locations");
        try {
            return (List<Location>) locationRepo.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No locations found");
        }
    }

    //get location by id json
    @GetMapping({ "/locations/{id}" })
    public @ResponseBody Optional<Location> getLocationById(@PathVariable("id") Long locationId) {
        log.info("Fetch location by id");
        try{
            return locationRepo.findById(locationId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find a location");
        }
    }

    //save new location
    @PostMapping({ "/locations" })
    public @ResponseBody Location saveLocationRest(@RequestBody Location location) {
        return locationRepo.save(location);
    }


    //delete location
    @Transactional
    @DeleteMapping("/locations/{id}")
    public ResponseEntity<Iterable<Location>> deleteLocation(@PathVariable("id") Long locationId) {
        long affected = locationRepo.deleteByLocationId(locationId);
        boolean isRemoved = affected > 0;

        if (isRemoved) {
            Iterable<Location> locations = locationRepo.findAll();
            return new ResponseEntity<>(locations, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location with id " + locationId + " not found");
        }
    }

    @PutMapping({ "locations/{id} "})
    public Location updateLocation(@RequestBody Location updatedLocation, @PathVariable("id") Long locationId) {
        Location updated = locationRepo.findByLocationId(locationId);
        if (updated != null){
            updated.setZipcode(updatedLocation.getZipcode());
            updated.setCity(updatedLocation.getCity());

            return locationRepo.save(updated);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location with id not found");
        }

    }
}
