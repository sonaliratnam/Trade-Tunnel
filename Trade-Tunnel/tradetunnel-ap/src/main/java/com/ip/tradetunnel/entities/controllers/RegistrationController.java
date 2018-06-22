package com.ip.tradetunnel.entities.controllers;

/**
 * User Registration controller.
 * 
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ip.tradetunnel.entities.UserProfile;
import com.ip.tradetunnel.entities.controllers.exceptions.MalFormedUserException;
import com.ip.tradetunnel.entities.controllers.exceptions.UserAlreadyRegisteredException;
import com.ip.tradetunnel.entities.repos.UserProfileRepository;

/*
 * @UserPorfile is created in the relational Db and the persisted entity is returned as successful response.
 * If the User profile already exists then the user object from the database is returned
 */
@RepositoryRestController
@RequestMapping("/register")
public class RegistrationController {

	@Autowired
	UserProfileRepository userRepo;

	@PostMapping
	private ResponseEntity<PersistentEntityResource> userRegistration(@RequestBody UserProfile user,
			PersistentEntityResourceAssembler assembler) {

		if (user.getFirstName() != null && !user.getFirstName().isEmpty() && user.getLastName() != null
				&& !user.getLastName().isEmpty() && user.getEmailId() != null && !user.getEmailId().isEmpty()
				&& user.getPassWord() != null && !user.getPassWord().isEmpty()) {

			if (userRepo.findByEmailId(user.getEmailId()).isEmpty()) {
				userRepo.save(user);
				return ResponseEntity.ok(assembler.toResource(user));
			} else {
				throw new UserAlreadyRegisteredException("Email Already in use, Please Register with a new Email ID");
			}
		} else {
			throw new MalFormedUserException("Missing Mandatory Fileds");
		}
	}
}
