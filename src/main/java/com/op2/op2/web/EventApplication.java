package com.op2.op2.web;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.op2.op2.domain.Event;
import com.op2.op2.domain.EventRepository;
import com.op2.op2.domain.Location;
import com.op2.op2.domain.LocationRepository;

@SpringBootApplication
public class EventApplication {
    private static final Logger log = LoggerFactory.getLogger(EventApplication.class);

    @Bean
    public CommandLineRunner demoData(EventRepository eventRepository, LocationRepository locationRepository) {
        return (args) -> {
            locationRepository.save(new Location("00100", "Helsinki"));
            locationRepository.save(new Location("00120", "Helsinki"));
            locationRepository.save(new Location("00150", "Helsinki"));
            locationRepository.save(new Location("01400", "Vantaa"));

            eventRepository.save(new Event("Bloodred Hourglass", LocalDate.of(2023, 10, 21),
                    "Livemusiikki Vanhalla Ylioppilastalolla klo 19 alkaen.", 29, locationRepository.findByCity("Vantaa").get(0)));
            eventRepository.save(new Event("Midnight Run Helsinki 2023", LocalDate.of(2023, 9, 9),
                    "Midnight Run 10 km tai Midnight Run 5 km kiertää Helsingin keskustaa ja tarjoaa runsaasti ohjelmapisteitä radan varrella. Helsinki, lähtö Senaatintorilta klo 21",
                    35, locationRepository.findByCity("Helsinki").get(0)));
            eventRepository.save(new Event("Teemu Mäenpää: On The Wall", LocalDate.of(2023, 8, 11),
                    "Helsinki Contemporaryn syyskauden avaa kuvataiteilija Teemu Mäenpään yksityisnäyttely On The Wall",
                    0, locationRepository.findByCity("Helsinki").get(1)));

            log.info("fetch all events");
            for (Event event : eventRepository.findAll()) {
                log.info(event.toString());
            }

        };
    }
}
