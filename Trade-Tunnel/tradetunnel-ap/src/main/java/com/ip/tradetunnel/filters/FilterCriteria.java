package com.ip.tradetunnel.filters;
/**
 * Custom Filter Support
 */
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;

/*
 * Customizable filter criteria.
 * Design allows to add additional filter criteria.
 */
@ComponentScan
public class FilterCriteria {

	private Set<String> categories;
	private Set<String> subcategories;
	@Autowired
	private Price range;
	private String city;

	public Set<String> getCategories() {
		return categories;
	}

	public void setCategories(Set<String> categories) {
		this.categories = categories;
	}

	public Set<String> getSubcategories() {
		return subcategories;
	}

	public void setSubcategories(Set<String> subcategories) {
		this.subcategories = subcategories;
	}

	public Price getRange() {
		return range;
	}

	public void setRange(Price range) {
		this.range = range;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
