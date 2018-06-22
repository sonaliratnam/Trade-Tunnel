package com.ip.tradetunnel.entities;

import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * Categories Entity class, using Spring ORM to map to the relational database s
 */

@Entity
@Table(name = "Categories")
public class Categories extends AbstractEntity {

	private String categoryName;

	@OneToMany(mappedBy = "category")
	private Set<Product> product;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private Set<SubCategories> subCategory;

	public Long getResourceID() {
		return id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Set<SubCategories> getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(Set<SubCategories> subCategory) {
		this.subCategory = subCategory;
	}

	public Set<Product> getProduct() {
		return product;
	}

	public void setProduct(Set<Product> product) {
		this.product = product;
	}

	@Override
	public boolean equals(Object obj) {
		return Objects.equals(this.getId(), ((Categories) obj).getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.getId());
	}
}
