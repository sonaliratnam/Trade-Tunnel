package com.ip.tradetunnel.entities;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * SubCategories Entity class, using Spring ORM to map to the relational database system
 */

@Entity
@Table(name = "Subcategories")
public class SubCategories extends AbstractEntity {
	private String subcategoryName;

	@OneToMany(mappedBy = "subcategory")
	private Set<Product> product;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Categories category;

	public Long getResourceID() {
		return id;
	}
	
	public String getSubcategoryName() {
		return subcategoryName;
	}

	public void setSubcategoryName(String subcategoryName) {
		this.subcategoryName = subcategoryName;
	}

	public Categories getCategory() {
		return category;
	}

	public void setCategory(Categories category) {
		this.category = category;
	}

	public Set<Product> getProduct() {
		return product;
	}

	public void setProduct(Set<Product> product) {
		this.product = product;
	}

	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this.getId(), ((SubCategories) obj).getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.getId());
	}

}
