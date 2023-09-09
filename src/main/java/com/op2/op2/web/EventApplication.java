package com.op2.op2.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.op2.op2.domain.Event;
import com.op2.op2.domain.EventRepository;

@SpringBootApplication
public class EventApplication {
    private static final Logger log = LoggerFactory.getLogger(EventApplication.class);

    @Bean
    public CommandLineRunner demoData(EventRepository eventRepository) {
        return (args) -> {

            eventRepository.save(new Event("Bloodred Hourglass", "21.10.2023",
                    "Livemusiikki Vanhalla Ylioppilastalolla klo 19 alkaen.", 29));
            eventRepository.save(new Event("Midnight Run Helsinki 2023", "9.9.2023",
                    "Midnight Run 10 km tai Midnight Run 5 km kiertää Helsingin keskustaa ja tarjoaa runsaasti ohjelmapisteitä radan varrella. Helsinki, lähtö Senaatintorilta klo 21",
                    35 - 67));
            eventRepository.save(new Event("Teemu Mäenpää: On The Wall", "11.8.2023-10.9.2023",
                    "Helsinki Contemporaryn syyskauden avaa kuvataiteilija Teemu Mäenpään yksityisnäyttely On The Wall",
                    0));

            log.info("fetch all events");
            for (Event event : eventRepository.findAll()) {
                log.info(event.toString());
            }

        };
    }
}
