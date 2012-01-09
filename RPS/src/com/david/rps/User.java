package com.david.rps;

import java.util.Date;

public class User {

	private final String id;
	private final String name;
	private Date lastAliveTime;
	
	public User(String id, String name, Date lastAlivePing) {
		this.id = id;
		this.name = name;
		this.setLastAliveTime(lastAlivePing);
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Date getLastAliveTime() {
		return lastAliveTime;
	}
	public void setLastAliveTime(Date lastAliveTime) {
		this.lastAliveTime = lastAliveTime;
	}
	
}
