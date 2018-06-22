package com.ip.tradetunnel.entities.repos;
/**
 * UserProfile Repository Interface to perform CRUD operations on DB , mainly on UserProfile table and its relations
 * Implementation is generated on Fly by Spring to provide CRUD Services
 */
import org.springframework.data.repository.CrudRepository;

import com.ip.tradetunnel.entities.Address;
import com.ip.tradetunnel.entities.UserProfile;
import java.lang.String;
import java.util.List;

public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {
	List<UserProfile> findByEmailId(String emailid);

	/* Support to hold set of address per user is available
	 * the method is customized to override springs default configurations to fetch single address over Set of Address
	 */
	List<UserProfile> findByAddress(Address address);
}
