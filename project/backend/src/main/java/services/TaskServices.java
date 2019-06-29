package services;

import java.sql.SQLException;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Meeting;
import entities.Task;

@Startup
@Singleton
public class TaskServices {
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public void addProgress(Task task) throws SQLException {

		entitymanager.persist( task );
		entitymanager.flush();
	}

	public void editProgress(Task task) throws SQLException {

		Task newTask = entitymanager.find(Task.class, task.getTaskID());
		
		newTask.setProgress(task.getProgress());
		newTask.setStatus(task.getStatus());
		newTask.setRemainingTime(task.getRemainingTime());
		newTask.setHoursSpent(task.getHoursSpent());
		newTask.setComments(task.getComments());
	}

	public void deleteProgress(Task task) throws SQLException {
		
		Task dbtask = entitymanager.find(Task.class, task.getTaskID());
		Meeting meeting = entitymanager.find(Meeting.class, dbtask.getMeeting().getMeetingID());
	
		meeting.removeTask(dbtask);
		
	}
}
