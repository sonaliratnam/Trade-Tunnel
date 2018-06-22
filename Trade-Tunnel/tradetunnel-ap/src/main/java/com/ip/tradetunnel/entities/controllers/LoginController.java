package com.ip.tradetunnel.entities.controllers;

/**
 * User Login Controller
 *
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ip.tradetunnel.entities.UserProfile;
import com.ip.tradetunnel.entities.controllers.exceptions.InvalidPasswordException;
import com.ip.tradetunnel.entities.controllers.exceptions.UserNotFoundException;
import com.ip.tradetunnel.entities.repos.UserProfileRepository;

/*
 * @username - username provided in the http request.
 * @password - password provided in the http request.
 * Returns Http Ok on a successful login or an appropriate exception is propagated with the message
 */
@RepositoryRestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	UserProfileRepository userRepo;

	@PostMapping("/user/{username}/{password}")
	public  ResponseEntity<PersistentEntityResource> loginUser(@PathVariable String username, @PathVariable String password , PersistentEntityResourceAssembler assembler){
		System.out.println("Login User event triggered");
			
		List<UserProfile> userProfile = userRepo.findByEmailId(username);
		if(userProfile == null || userProfile.size() <= 0) 
			throw new UserNotFoundException("No user found with username : " + username);
			
		UserProfile user = userProfile.get(0);
		if(user.getPassWord().equals(password)) 
			return ResponseEntity.ok(assembler.toResource(user)) ;
		
			throw new InvalidPasswordException("Username or Password is incorrect");
	}
}
