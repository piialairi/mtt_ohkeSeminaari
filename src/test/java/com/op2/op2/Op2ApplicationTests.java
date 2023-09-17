package com.op2.op2;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.op2.op2.web.EventController;
import com.op2.op2.web.LocationController;

@SpringBootTest
class Op2ApplicationTests {
/* 
	@Test
	void contextLoads() {
	}
*/
	@Autowired
	private EventController eventController;
	@Autowired
	private LocationController locationController;
	@Test
	public void contextLoads() throws Exception {
		assertThat(eventController).isNotNull();
		assertThat(locationController).isNotNull();
	}
}
