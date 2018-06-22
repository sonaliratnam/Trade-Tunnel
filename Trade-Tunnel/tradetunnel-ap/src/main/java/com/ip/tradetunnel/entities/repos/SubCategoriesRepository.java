package com.ip.tradetunnel.entities.repos;
/**
 * SubCategories Repository Interface to perform CRUD operations on DB , mainly on Subcategories table
 * Implementation is generated on Fly by Spring to provide CRUD Services
 */
import org.springframework.data.repository.CrudRepository;
import com.ip.tradetunnel.entities.SubCategories;
import java.lang.String;
import java.util.List;


public interface SubCategoriesRepository extends CrudRepository<SubCategories, Long> {
	
	List<SubCategories> findBySubcategoryName(String subcategoryname);
	
}
