package com.ip.tradetunnel.entities;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Address Entity class, using Spring ORM (hibernate) to map to the relational database
 */
@Entity
@Table(name = "Address")
public class Address extends AbstractEntity {

	private String streetAddress1;
	private String streetAddress2;
	private String city;
	private String state;
	private String country;
	private String postalCode;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserProfile userProfile;

	public Long getResourceID() {
		return id;
	}

	public String getStreetAddress1() {
		return streetAddress1;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setStreetAddress1(String streetAddress1) {
		this.streetAddress1 = streetAddress1;
	}

	public String getStreetAddress2() {
		return streetAddress2;
	}

	public void setStreetAddress2(String streetAddress2) {
		this.streetAddress2 = streetAddress2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile user) {
		this.userProfile = user;
	}

	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this.getId(), ((Address) obj).getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.getId());
	}

}
