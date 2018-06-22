package com.ip.tradetunnel.entities.controllers.exceptions;
/**
 * 
 * Custom Exception thrown to handle duplicate registration events using same email ID
 *
 */
public class UserAlreadyRegisteredException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserAlreadyRegisteredException() {
	}

	public UserAlreadyRegisteredException(String message) {
		super(message);
	}

	public UserAlreadyRegisteredException(Throwable cause) {
		super(cause);
	}

	public UserAlreadyRegisteredException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserAlreadyRegisteredException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
