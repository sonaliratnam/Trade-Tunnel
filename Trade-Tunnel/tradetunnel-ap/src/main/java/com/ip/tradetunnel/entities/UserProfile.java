package com.ip.tradetunnel.entities;

import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.ip.tradetunnel.entities.Address;

/**
 * UserProfile Entity class, using Spring ORM to map to the relational database system
 */

@Entity
@Table(name = "Userprofile")
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String firstName;
	private String lastName;
	private String emailId;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String passWord;
	private String phoneNumber;


	@OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
	private Set<Address> address;

	@OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
	private Set<Product> product;

	public Long getResourceID() {
		return id;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<Address> getAddress() {
		return address;
	}

	public void setAddress(Set<Address> address) {
		this.address = address;
	}

	public Set<Product> getProduct() {
		return product;
	}

	public void setProduct(Set<Product> product) {
		this.product = product;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	
	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this.getId(), ((UserProfile) obj).getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.getId());
	}

}
