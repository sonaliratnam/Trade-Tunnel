package com.ip.tradetunnel.filters;
/**
 * Price filter
 */
import org.springframework.context.annotation.ComponentScan;

/*
 * Price filter , supports filter operations based on the price ranges as requested by the client application
 */
@ComponentScan
public class Price {
	private Float from;
	private Float to;

	public Float getFrom() {
		return from;
	}

	public void setFrom(Float from) {
		this.from = from;
	}

	public Float getTo() {
		return to;
	}

	public void setTo(Float to) {
		this.to = to;
	}

}
