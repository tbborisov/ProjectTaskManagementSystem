package services;

import java.sql.SQLException;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Meeting;
import entities.Project;

@Startup
@Singleton
public class MeetingServices {
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public void createMeeting(Meeting meeting) throws SQLException {
		
		entitymanager.persist( meeting );
		entitymanager.flush();
		
	}

	public void editMeeting(Meeting meeting) throws SQLException {

		Meeting newMeeting = entitymanager.find(Meeting.class, meeting.getMeetingID());
		
		newMeeting.setName(meeting.getName());
		newMeeting.setDate(meeting.getDate());
	}

	public void deleteMeeting(Meeting meeting) throws SQLException {
		
		Meeting meet = entitymanager.find(Meeting.class, meeting.getMeetingID());
		
		Project project = entitymanager.find(Project.class, meeting.getProject().getProjectID());
		project.removeMeeting(meet);
		
	}
}
