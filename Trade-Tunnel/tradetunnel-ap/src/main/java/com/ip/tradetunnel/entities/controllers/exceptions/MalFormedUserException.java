package com.ip.tradetunnel.entities.controllers.exceptions;

/**
 * Custom Exception thrown during user registration , on missing manditory fields
 * @author himanshuchhabra
 *
 */
public class MalFormedUserException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public MalFormedUserException() {
	}

	public MalFormedUserException(String message) {
		super(message);
	}

	public MalFormedUserException(Throwable cause) {
		super(cause);
	}

	public MalFormedUserException(String message, Throwable cause) {
		super(message, cause);
	}

	public MalFormedUserException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
