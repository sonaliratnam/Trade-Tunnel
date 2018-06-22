package com.ip.tradetunnel.entities.repos;
/**
 * Image Repository Interface to perform CRUD operations on DB , mainly on image table
 * Implementation is generated on Fly by Spring to provide CRUD Services.
 */
import org.springframework.data.repository.CrudRepository;
import com.ip.tradetunnel.entities.Image;

public interface ImageRepository extends CrudRepository<Image, Long> {

}
