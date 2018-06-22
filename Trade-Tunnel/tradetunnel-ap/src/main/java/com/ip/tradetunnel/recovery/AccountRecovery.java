package com.ip.tradetunnel.recovery;

import org.springframework.context.annotation.ComponentScan;

/*
 * Account recovery component to update users password.
 */

@ComponentScan
public class AccountRecovery {

	String userEmailId;
	String newPassword;

	public String getUserEmailId() {
		return userEmailId;
	}

	public void setUserEmailId(String userEmailId) {
		this.userEmailId = userEmailId;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}


}
