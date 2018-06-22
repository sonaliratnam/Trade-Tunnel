package com.ip.tradetunnel.entities.controllers;
/**
 *  Account Recovery Controller
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ip.tradetunnel.entities.UserProfile;
import com.ip.tradetunnel.entities.controllers.exceptions.UserNotFoundException;
import com.ip.tradetunnel.entities.repos.UserProfileRepository;
import com.ip.tradetunnel.recovery.AccountRecovery;
/*
 * Password Recovery Mechanism , Essentially Submits a new password on request to the database,if the user exists
 *
 */
@RepositoryRestController
@RequestMapping("/userprofile")
public class AccountRecoveryContoller {

	@Autowired
	UserProfileRepository userRepo;

	@PostMapping("/recover")
	public @ResponseBody ResponseEntity<?> recoverUserAccount(@RequestBody AccountRecovery recover,
			PersistentEntityResourceAssembler assembler) {

		List<UserProfile> users = userRepo.findByEmailId(recover.getUserEmailId());
		UserProfile user;
		if (users != null && !users.isEmpty()) {
			user = users.get(0);
			user.setPassWord(recover.getNewPassword());
			userRepo.save(user);

		} else {
			throw new UserNotFoundException("User Does Not Exist");
		}

		return ResponseEntity.ok(assembler.toResource(user));
	}

}
