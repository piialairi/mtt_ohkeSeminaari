package com.op2.op2;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.op2.op2.domain.Event;
import com.op2.op2.domain.EventRepository;
import com.op2.op2.web.EventRestController;

@WebMvcTest(EventRestController.class)
@AutoConfigureMockMvc
public class EventRestControllerTests {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private EventRepository eventRepository;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        public void testGetEventById() throws Exception {
                Event event = new Event("Test event name", LocalDate.now(), null, "test description", 100,
                                "Mannerheimintie 1");
                given(eventRepository.findByEventId(anyLong())).willReturn(event);

                mockMvc.perform(get("/events/{id}", 1))
                                .andDo(result -> System.out.println(result.getResponse().getContentAsString()))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.eventName").value("Test event name"));
        }

        @Test
        public void testCreateEvent() throws Exception {
                Event expectedEvent = new Event("New Event", LocalDate.now(), null,
                                "New event description", 0, "");
                given(eventRepository.save(any(Event.class))).willReturn(expectedEvent);

                mockMvc.perform(post("/events")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(expectedEvent)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.eventName").value("New Event"));
        }

        @Test
        public void testUpdateEvent() throws Exception {
                Event existingEvent = new Event("Existing Event", LocalDate.now(), null, "Existing event description",
                                75,
                                "Some address");
                given(eventRepository.findByEventId(anyLong())).willReturn(existingEvent);

                Event updatedEvent = new Event("Updated Event", LocalDate.now(), null, "Updated event description", 80,
                                "Updated address");

                mockMvc.perform(put("/events/{id}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updatedEvent)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.eventName").value("Updated Event"));
        }

        @Test
        public void testDeleteEvent() throws Exception {
                Event existingEvent = new Event("Event to be deleted", LocalDate.now(), null, "Description", 60,
                                "Some address");
                given(eventRepository.findByEventId(anyLong())).willReturn(existingEvent);

                mockMvc.perform(delete("/events/{id}", 1))
                                .andExpect(status().isNoContent());
        }

}