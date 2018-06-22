package com.ip.tradetunnel.entities;

import java.util.Date;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.ip.tradetunnel.entities.enumerations.Status;

/**
 * Product Entity class, using Spring ORM to map to the relational database system
 */

@Entity
@Table(name = "Product")
public class Product extends AbstractEntity {
	private String productName;
	private String productDescription;
	private float price;

	@Temporal(TemporalType.DATE)
	@Column(name = "create_date")
	@CreationTimestamp
	private Date createDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "stat")
	private Status stat;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserProfile userProfile;

	@ManyToOne
	@JoinColumn(name = "cat_id", nullable = false)
	private Categories category;

	@ManyToOne
	@JoinColumn(name = "subcat_id", nullable = false)
	private SubCategories subcategory;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	private Set<Image> image;
	
	public Long getResourceID() {
		return id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Status getStat() {
		return stat;
	}

	public void setStat(Status stat) {
		this.stat = stat;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public Set<Image> getImage() {
		return image;
	}

	public void setImage(Set<Image> image) {
		this.image = image;
	}

	public Categories getCategory() {
		return category;
	}

	public void setCategory(Categories category) {
		this.category = category;
	}

	public SubCategories getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(SubCategories subcategory) {
		this.subcategory = subcategory;
	}

	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this.getId(), ((Product) obj).getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.getId());
	}

}
