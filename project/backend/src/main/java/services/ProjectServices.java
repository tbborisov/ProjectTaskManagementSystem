package services;

import java.sql.SQLException;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Project;
import entities.User;


@Startup
@Singleton
public class ProjectServices {
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public void createProject(Project project) throws SQLException {
		
		
		entitymanager.persist( project );
		entitymanager.flush();
		
		
	}

	public void editProject(Project project) throws SQLException {
		
		Project newProject = entitymanager.find(Project.class, project.getProjectID());
		
		
		newProject.setProjectKey(project.getProjectKey());
		newProject.setProjectTitle(project.getProjectTitle());
		newProject.setMeeintgs(project.getMeetings());
		
		
	}

	public void deleteProject(Project project) throws SQLException {

		Project newProject = entitymanager.find(Project.class, project.getProjectID());
		
		
		entitymanager.remove(newProject);
		
	}

	public void assignUsersToProject(Project project, User user) throws SQLException {

		User assignUser = entitymanager.find(User.class, user.getUserID());
		Project assignProject = entitymanager.find(Project.class, project.getProjectID());
		
		assignProject.addUser(assignUser);
		
	}
}
