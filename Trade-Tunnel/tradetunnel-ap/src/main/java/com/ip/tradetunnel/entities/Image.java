package com.ip.tradetunnel.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Image Entity class, using Spring ORM to map to the relational database system
 */

@Entity
@Table(name = "Image")
public class Image extends AbstractEntity {

	private String imageName;
	@Lob
	private byte[] imageData;

	@ManyToOne
	@JoinColumn(name = "prod_id", nullable = false)
	private Product product;

	public Long getResourceID() {
		return id;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public byte[] getData() {
		return imageData;
	}

	public void setData(byte[] imageData) {
		this.imageData = imageData;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}
