package services;

import java.sql.*;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.User;

@Startup
@Singleton
public class UserServices {
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public void createUser(User user) throws SQLException {

		entitymanager.persist( user );
		entitymanager.flush();
		
	}

	public void editUser(User user) throws SQLException {

		User newUser = entitymanager.find(User.class, user.getUserID());
		
		newUser.setPassword(user.getPassword());
		newUser.setFullName(user.getFullName());
		newUser.setRole(user.getRole());
		
		 
	}

	public void deleteUser(User user) throws SQLException {

		User newUser = entitymanager.find(User.class, user.getUserID());
		
		entitymanager.remove(newUser);
		
	}
}
