package com.ip.tradetunnel.entities.repos;
/**
 * Categories Repository Interface to perform CRUD operations on DB , mainly on Categories table
 * Implementation is generated on Fly by Spring to provide CRUD Services
 */
import org.springframework.data.repository.CrudRepository;
import com.ip.tradetunnel.entities.Categories;
import java.lang.String;
import java.util.List;

public interface CategoriesRepository extends CrudRepository<Categories, Long> {
			List<Categories> findByCategoryName(String categoryname);
}
