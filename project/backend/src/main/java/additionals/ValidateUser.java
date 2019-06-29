package additionals;

import java.sql.SQLException;
import java.util.List;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import entities.User;

@Startup
@Singleton
public class ValidateUser {
	
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public boolean checkIfValid(String loginName, String password, User currentUser) throws SQLException {
		
		TypedQuery<User> query = entitymanager.createQuery("SELECT u FROM users u", User.class);
		List<User> users = query.getResultList();
		
		for(User user : users) {
			if(credentialValidator(loginName, password, user.getLoginName(), user.getPassword())) {
				currentUser.setUserID(user.getUserID());
				currentUser.setLoginName(user.getLoginName());
				currentUser.setFullName(user.getFullName());
				currentUser.setRole(user.getRole());
				return true;
			}
		}
		
		return false;
		}
	
		private boolean credentialValidator(String login, String pass, String dbLoginName, String dbPassword) {
			return login.equals(dbLoginName) && pass.equals(dbPassword);
		}
	}
