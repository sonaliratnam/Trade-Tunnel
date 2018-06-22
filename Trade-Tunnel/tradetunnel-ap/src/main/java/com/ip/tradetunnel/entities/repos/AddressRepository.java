package com.ip.tradetunnel.entities.repos;
/**
 * Address Repository Interface to perform CRUD operations on DB , mainly on address table
 * Implementation is generated on Fly by Spring to provide CRUD Services
 */
import org.springframework.data.repository.CrudRepository;

import com.ip.tradetunnel.entities.Address;
import java.lang.String;
import java.util.Set;

public interface AddressRepository extends CrudRepository<Address, Long> {
			Set<Address> findByCity(String city);
}
