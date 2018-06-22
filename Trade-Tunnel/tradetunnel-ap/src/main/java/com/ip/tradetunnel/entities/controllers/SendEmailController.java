package com.ip.tradetunnel.entities.controllers;
/**
 *  Send Email Controller
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ip.tradetunnel.entities.UserProfile;
import com.ip.tradetunnel.entities.controllers.exceptions.UserNotFoundException;
import com.ip.tradetunnel.entities.repos.UserProfileRepository;
import com.ip.tradetunnel.recovery.AccountRecovery;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/*
 * The controller assists in sending the account recovery link on request
 *
 */

@RepositoryRestController
@RequestMapping("/sendEmail")
public class SendEmailController {

	@Autowired
	UserProfileRepository userRepo;

	@PostMapping()
	public @ResponseBody ResponseEntity<?> sendEmailToUser(@RequestBody AccountRecovery recover,
			PersistentEntityResourceAssembler assembler) {

		List<UserProfile> users = userRepo.findByEmailId(recover.getUserEmailId());
		if (users != null && !users.isEmpty()) {

			boolean status = sendEmail(recover.getUserEmailId());

			if(status)
			{
				return new ResponseEntity<>(HttpStatus.ACCEPTED); 
			}
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

			}

		} else {
			throw new UserNotFoundException("User Does Not Exist , Please check the email");
		}

	}

	private boolean sendEmail(String to) {
		to = to.trim();
		final String username = "ipproject2018@gmail.com";
		final String password = "Jaimatadi123";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("ipproject2018@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(to));
			message.setSubject("Reset Password for TradeTunnel");
			message.setText("Hello, You have received this mail for resetting your password for Trade tunnel website. \nFollow the link to reset the password - http://localhost:8080/main/frontend/resetPassword.html");
			System.out.println("before sending");
			message.saveChanges();
			Transport.send(message);
			return true;

		} 

		catch (MessagingException e) 
		{
			System.out.println(e.getStackTrace());			
			return false;
		}
	}

}
