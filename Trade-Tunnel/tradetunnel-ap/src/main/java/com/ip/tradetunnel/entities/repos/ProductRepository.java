package com.ip.tradetunnel.entities.repos;
/**
 * Product Repository Interface to perform CRUD operations on DB , mainly on Product table
 * Implementation is generated on Fly by Spring to provide CRUD Services
 */
import org.springframework.data.repository.CrudRepository;

import com.ip.tradetunnel.entities.Product;

import java.lang.String;
import java.util.List;
import com.ip.tradetunnel.entities.SubCategories;
import com.ip.tradetunnel.entities.Categories;
import com.ip.tradetunnel.entities.UserProfile;
import org.springframework.data.rest.core.annotation.RestResource;

public interface ProductRepository extends CrudRepository<Product, Long> {
	@RestResource
	List<Product> findByProductNameLikeOrProductDescriptionLike(String productname,String productDescrip);
	List<Product> findByCategory(Categories category);
	List<Product> findBySubcategory(SubCategories subcategory);
	List<Product> findByPriceBetween(Float from, Float to);
	List<Product> findByUserProfile(UserProfile userprofile);
}
	