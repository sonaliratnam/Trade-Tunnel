package com.ip.tradetunnel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Servlet Initalizer class , loads the configurations and starts the app
 * @author himanshuchhabra
 *
 */
@SpringBootApplication
public class TradetunnelApApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(TradetunnelApApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder app) {
		return app.sources(TradetunnelApApplication.class);
	}
}
