package additionals;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import entities.Meeting;
import entities.Project;
import entities.Task;
import entities.User;

@Startup
@Singleton
public class GetWhatever {
	
	@PersistenceContext(unitName = "Eclipselink_JPA")
	EntityManager entitymanager;
	
	public static String getTaskStatus(String status) {
		switch (status) {
		case "D":
			return "done";
		case "I":
			return "in progress";
		case "R":
			return "reopened";
		case "O":
			return "open";
		default:
			return "invalid input";
		}
	}

	public static String getFullRole(String role) {
		switch (role) {
		case "A":
			return "admin";
		case "U":
			return "user";
		default:
			return "WTF";
		}
	}

	public List<User> getUsers() throws SQLException {

		TypedQuery<User> query = entitymanager.createQuery("SELECT u FROM users u", User.class);
		List<User> users = query.getResultList();

		return users;
		
		/*String menu = sb.toString();

		selection = Controller.printMenuAndChoose(menu, console);

		if (selection != 0) {
			user.setLoginName(users.get(selection - 1).getLoginName());
			user.setUserID(users.get(selection - 1).getUserID());
			user.setRole(users.get(selection - 1).getRole());
		}
		*/
	}

	public List<Project> getProjects() throws SQLException {

		TypedQuery<Project> query = entitymanager.createQuery("SELECT p FROM projects p", Project.class);
		List<Project> projects = query.getResultList();

		return projects;
		/*
		String menu = sb.toString();
		
		selection = Controller.printMenuAndChoose(menu, console);

		if (selection != 0) {
			project.setProjectKey(projects.get(selection - 1).getProjectKey());
			project.setProjectTitle(projects.get(selection - 1).getProjectTitle());
			project.setProjectID(projects.get(selection - 1).getProjectID());
		}
		*/
	}

	public boolean isUserWorkingOnProject(User currentUser, Project project) throws SQLException {

		TypedQuery<Project> query = entitymanager.createQuery("SELECT p FROM projects p WHERE p.projectID = :projectid", Project.class);
		query.setParameter("projectid", project.getProjectID());
		List<Project> projects = query.getResultList();

		for(Project proj : projects) {
			for(User user : proj.getUsers()) {
				if(user.getUserID() == currentUser.getUserID())
					return true;
			}
		}
		return false;
	}

	public List<Meeting> getMeetings(Project project) throws SQLException {

		/*TypedQuery<Meeting> query = entitymanager
				.createQuery("SELECT m FROM meetings m WHERE m.name " + "LIKE :meetingname", Meeting.class);
		query.setParameter("meetingname", project.getProjectKey() + "%");
		List<Meeting> meetings = query.getResultList();
		*/
		
		TypedQuery<Meeting> query = entitymanager
				.createQuery("SELECT m FROM meetings m WHERE m.project.projectID = :projectid", Meeting.class);
		query.setParameter("projectid", project.getProjectID());
		List<Meeting> meetings = query.getResultList();

		return meetings;
		
		/*
		String menu = sb.toString();

		selection = Controller.printMenuAndChoose(menu, console);

		if (selection != 0) {
			meeting.setMeetingID(meetings.get(selection - 1).getMeetingID());
			meeting.setName(meetings.get(selection - 1).getName());
			meeting.setDate(meetings.get(selection - 1).getDate());
		}
		*/
	}

	public String getMeetingName(Project project) throws SQLException {
		String meetingName = "";

		TypedQuery<Meeting> query = entitymanager
				.createQuery("SELECT mn FROM meetings mn", Meeting.class);
		List<Meeting> meetings = new ArrayList<>(query.getResultList());
		
		for (Iterator<Meeting> it = meetings.iterator(); it.hasNext();) {
			if (it.next().getProject().getProjectID() != project.getProjectID()) {
				it.remove();
			}
		}


		if (!meetings.isEmpty()) {
			meetingName = meetings.get(meetings.size() - 1).getName();
			int nextMeetingNumber = Integer.parseInt(meetingName.substring(meetingName.length() - 1)) + 1;
			meetingName = meetingName.substring(0, meetingName.length() - 1) + nextMeetingNumber;

		} else {
			meetingName = project.getProjectKey() + "#1";
		}
		return meetingName;
	}

	public List<Task> getTasks(Meeting meeting) throws SQLException {

		TypedQuery<Task> query = entitymanager.createQuery("SELECT t FROM tasks t", Task.class);
		List<Task> tasks = new ArrayList<>(query.getResultList());

		for (Iterator<Task> it = tasks.iterator(); it.hasNext();) {
			if (it.next().getMeeting().getMeetingID() != meeting.getMeetingID()) {
				it.remove();
			}
		}

		
		return tasks;
		/*
		String menu = sb.toString();

		selection = Controller.printMenuAndChoose(menu, console);

		if (selection != 0) {
			task.setTaskID(tasks.get(selection - 1).getTaskID());
			task.setTaskKey(tasks.get(selection - 1).getkey());
			task.setProgress(tasks.get(selection - 1).getProgress());
			task.setStatus(tasks.get(selection - 1).getStatus());
			task.setInitialEstimation(tasks.get(selection - 1).getInitialEstimation());
			task.setRemainingTime(tasks.get(selection - 1).getRemainingTime());
			task.setHoursSpent(tasks.get(selection - 1).getHoursSpent());
			task.setComments(tasks.get(selection - 1).getComments());
		}
		*/
	}
}
