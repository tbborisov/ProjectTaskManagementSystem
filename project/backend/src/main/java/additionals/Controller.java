package additionals;

import java.io.Console;
import java.sql.*;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import entities.Meeting;
import entities.Project;
import entities.Task;
import entities.User;
import services.MeetingServices;
import services.ProjectServices;
import services.TaskServices;
import services.UserServices;


public class Controller {
	public static final String DATABASE_URL = "jdbc:postgresql://127.0.0.1:5432/TaskReportJPA";
	public static final int USER_MENU_NUMBER = 1;
	public static final int PROJECT_MENU_NUMBER = 2;
	public static final int MEETING_MENU_NUMBER = 3;
	public static final int TASK_MENU_NUMBER = 4;
	public static EntityManagerFactory factory = Persistence.createEntityManagerFactory("Services");
	
	private User currentUser;
	private UserServices US;
	private ProjectServices PS;
	private MeetingServices MS;
	private TaskServices TS;

	public Controller() {

		this.currentUser = new User();
		this.US = new UserServices();
		this.PS = new ProjectServices();
		this.MS = new MeetingServices();
		this.TS = new TaskServices();
	}

	public void start() throws SQLException {
		Console console = System.console();
		if (console == null) {
			System.out.print("No console available");
			return;
		}

		ValidateUser vu = new ValidateUser();
		String loginName = console.readLine("User: ");
		String password = String.valueOf(console.readPassword("Password: "));
		while (!vu.checkIfValid(loginName, password, currentUser)) {
			System.out.println("Error! Incorrect credentials, please try again!");
			loginName = console.readLine("User: ");
			password = String.valueOf(console.readPassword("Password: "));
		}

		System.out.println("Welcome, " + currentUser.getFullName());
		startingMenu(console);
	}

	public void startingMenu(Console console) throws SQLException {
		System.out.println("Please Select: \n" + "0) exit \n" + "1) user management \n" + "2) project management \n"
				+ "3) meeting managemnet \n" + "4) progress reporting");

		boolean flag = false;
		int selection;
		while (!flag) {
			selection = Integer.parseInt(console.readLine());

			switch (selection) {
			case 0:
				System.out.println("Goodbye, " + currentUser.getFullName() + " !");
				flag = true;
				break;
			case 1:
				userManagement(console, currentUser);
				flag = true;
				break;
			case 2:
				projectManagement(console, currentUser);
				flag = true;
				break;
			case 3:
				meetingManagement(console, currentUser);
				flag = true;
				break;
			case 4:
				progressReporting(console, currentUser);
				flag = true;
				break;
			default:
				System.out.println("This is not a valid option, please select again: ");
			}
		}
	}

	public void userManagement(Console console, User currentUser) throws SQLException {
		System.out.println("User manegement. Please select: \n" + "1.0) return to previous menu \n"
				+ "1.1) create user \n" + "1.2) edit user \n" + "1.3) delete user");

		boolean flag = false;
		int selection;
		while (!flag) {
			selection = Integer.parseInt(console.readLine());

			switch (selection) {
			case 0:
				startingMenu(console);
				flag = true;
				break;
			case 1:
				createUser(console);
				flag = true;
				break;
			case 2:
				editUser(console);
				flag = true;
				break;
			case 3:
				deleteUser(console);
				flag = true;
				break;
			default:
				System.out.println("This is not a valid option, please select again: ");
			}
		}
	}

	public void projectManagement(Console console, User currentUser) throws SQLException {
		System.out.println(
				"Project manegement. Please select: \n" + "2.0) return to previous menu \n" + "2.1) create project \n"
						+ "2.2) edit project \n" + "2.3) delete project \n" + "2.4) assign users to project");

		boolean flag = false;
		int selection;
		while (!flag) {
			selection = Integer.parseInt(console.readLine());

			switch (selection) {
			case 0:
				startingMenu(console);
				flag = true;
				break;
			case 1:
				createProject(console);
				flag = true;
				break;
			case 2:
				editProject(console);
				flag = true;
				break;
			case 3:
				deleteProject(console);
				flag = true;
				break;
			case 4:
				assignUsersToProject(console);
				flag = true;
				break;
			default:
				System.out.println("This is not a valid option, please select again: ");
			}
		}
	}

	public void meetingManagement(Console console, User currentUser) throws SQLException {
		System.out.println("Meeting manegement. Please select: \n" + "3.0) return to previous menu \n"
				+ "3.1) create meeting \n" + "3.2) edit meeting \n" + "3.3) delete meeting ");

		boolean flag = false;
		int selection;
		while (!flag) {
			selection = Integer.parseInt(console.readLine());

			switch (selection) {
			case 0:
				startingMenu(console);
				flag = true;
				break;
			case 1:
				createMeeting(console);
				flag = true;
				break;
			case 2:
				editMeeting(console);
				flag = true;
				break;
			case 3:
				deleteMeeting(console);
				flag = true;
				break;
			default:
				System.out.println("This is not a valid option, please select again: ");
			}
		}
	}

	public void progressReporting(Console console, User currentUser) throws SQLException {
		System.out.println("Progress manegement. Please select: \n" + "4.0) return to previous menu \n"
				+ "4.1) add progress \n" + "4.2) edit progress \n" + "4.3) delete progress ");

		boolean flag = false;
		int selection;
		while (!flag) {
			selection = Integer.parseInt(console.readLine());

			switch (selection) {
			case 0:
				startingMenu(console);
				flag = true;
				break;
			case 1:
				addProgress(console);
				flag = true;
				break;
			case 2:
				editProgress(console);
				flag = true;
				break;
			case 3:
				deleteProgress(console);
				flag = true;
				break;
			default:
				System.out.println("This is not a valid option, please select again: ");
			}
		}
	}

	public User getCurrentUser() {
		return currentUser;
	}

	private void createUser(Console console) throws SQLException {
		System.out.println("User management. Creating new user: ");
		if (getCurrentUser().getRole().equals("A")) {
			User newUser = new User();
			newUser.setLoginName(console.readLine("Login: "));
			newUser.setPassword(String.valueOf(console.readPassword("Password: ")));
			newUser.setFullName(console.readLine("Full name: "));
			newUser.setRole(console.readLine("Roles (A-admin, U-user): "));

			US.createUser(newUser);

			System.out.println("User \'" + newUser.getLoginName() + "\' created successfully");
		} else {
			System.out.println("You do not have permission to do this!");
		}
		userManagement(console, currentUser);
	}

	private void editUser(Console console) throws SQLException {
		System.out.println("User management. Edit user: ");
		if (getCurrentUser().getRole().equals("A")) {
			User user = new User();
			//new GetWhatever().getUsers(console, user, USER_MENU_NUMBER);
			if (user.hasData()) {
				user.setPassword(String.valueOf(console.readPassword("Password: ")));
				user.setFullName(console.readLine("Full name: "));
				user.setRole(console.readLine("Roles (A-admin, U-user) :"));

				US.editUser(user);

				System.out.println("User \'" + user.getLoginName() + "\' modified successfully");
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		userManagement(console, currentUser);
	}

	private void deleteUser(Console console) throws SQLException {
		System.out.println("User management. Delete user: ");
		if (getCurrentUser().getRole().equals("A")) {
			User user = new User();
			//new GetWhatever().getUsers(console, user, USER_MENU_NUMBER);
			if (user.hasData()) {

				US.deleteUser(user);

				System.out.println("User \'" + user.getLoginName() + "\' deleted successfully");
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		userManagement(console, currentUser);
	}

	private void createProject(Console console) throws SQLException {
		User currentUser = getCurrentUser();
		if (currentUser.getRole().equals("A")) {
			System.out.println("Project management. Create new project: ");
			Project project = new Project();
			project.setProjectKey(console.readLine("Project key: "));
			project.setProjectTitle(console.readLine("Project title: "));

			PS.createProject(project);

			System.out.println("Project \'" + project.getProjectKey() + "\' created succesfully");
		} else {
			System.out.println("You do not have permission to do this!");
		}
		projectManagement(console, currentUser);
	}

	private void editProject(Console console) throws SQLException {
		System.out.println("Project management. Edit project: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			//new GetWhatever().getProjects(console, project, PROJECT_MENU_NUMBER);
			if (project.hasData()) {
				project.setProjectKey(console.readLine("Project key: "));
				project.setProjectTitle(console.readLine("Project title: "));

				PS.editProject(project);

				System.out.println("Project \'" + project.getProjectKey() + "\' modified succesfully");
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		projectManagement(console, getCurrentUser());
	}

	private void deleteProject(Console console) throws SQLException {
		System.out.println("Project management. Delete project: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			//new GetWhatever().getProjects(console, project, PROJECT_MENU_NUMBER);
			if (project.hasData()) {

				PS.deleteProject(project);

				System.out.println("Project \'" + project.getProjectKey() + "\' deleted successfully");
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		projectManagement(console, getCurrentUser());
	}

	private void assignUsersToProject(Console console) throws SQLException {
		System.out.println("Project management. Assign users to project: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			User user = new User();
			//GetWhatever gw = new GetWhatever();
			//gw.getProjects(console, project, PROJECT_MENU_NUMBER);
			if (project.hasData()) {
				//gw.getUsers(console, user, PROJECT_MENU_NUMBER);
				if (user.hasData()) {

					PS.assignUsersToProject(project, user);

					System.out.println("User \'" + user.getLoginName() + "\' successfully assigned to project \'"
							+ project.getProjectKey() + "\'");
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		projectManagement(console, getCurrentUser());
	}

	private void createMeeting(Console console) throws SQLException {
		System.out.println("Meeting management. Create new meeting: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			GetWhatever gw = new GetWhatever();
			//gw.getProjects(console, project, MEETING_MENU_NUMBER);
			if (project.hasData()) {
				Meeting meeting = new Meeting();
				meeting.setName(gw.getMeetingName(project));
				meeting.setDate(console.readLine("Meeting date: "));
				meeting.setProject(project);
				
				MS.createMeeting(meeting);

				System.out.println("Meeting \'" + meeting.getName() + "\' created succesfully");
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		meetingManagement(console, getCurrentUser());
	}

	private void editMeeting(Console console) throws SQLException {
		System.out.println("Meeting management. Edit meeting: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			Meeting meeting = new Meeting();
			//GetWhatever gw = new GetWhatever();
			//gw.getProjects(console, project, MEETING_MENU_NUMBER);
			if (project.hasData()) {
				//gw.getMeetings(console, meeting, project, MEETING_MENU_NUMBER);
				if (meeting.hasData()) {
					meeting.setDate(console.readLine("Meeting date: "));

					MS.editMeeting(meeting);

					System.out.println("Meeting \'" + meeting.getName() + "\' modified successfully");
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		meetingManagement(console, getCurrentUser());
	}

	private void deleteMeeting(Console console) throws SQLException {
		System.out.println("Meeting management. Delete meeting: ");
		if (getCurrentUser().getRole().equals("A")) {
			Project project = new Project();
			Meeting meeting = new Meeting();
			//GetWhatever gw = new GetWhatever();
			//gw.getProjects(console, project, MEETING_MENU_NUMBER);
			if (project.hasData()) {
				//gw.getMeetings(console, meeting, project, MEETING_MENU_NUMBER);
				if (meeting.hasData()) {
					meeting.setProject(project);
					MS.deleteMeeting(meeting);

					System.out.println("Meeting \'" + meeting.getName() + "\' deleted successfully");
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		meetingManagement(console, getCurrentUser());
	}

	private void addProgress(Console console) throws SQLException {
		System.out.println("Progress management. Add progress: ");
		Project project = new Project();
		Meeting meeting = new Meeting();
		GetWhatever gw = new GetWhatever();
		//gw.getProjects(console, project, TASK_MENU_NUMBER);
		User currentUser = getCurrentUser();
		if (currentUser.getRole().equals("A") || gw.isUserWorkingOnProject(currentUser, project)) {
			if (project.hasData()) {
				meeting.setProject(project);
				//gw.getMeetings(console, meeting, project, TASK_MENU_NUMBER);
				if (meeting.hasData()) {
					Task task = new Task();
					task.setMeeting(meeting);
					task.setTaskKey(console.readLine("Task key: "));
					task.setProgress(console.readLine("Task progress: "));
					task.setStatus(console.readLine("Task status (D-done, I-in progress, O-open, R-reopened): "));
					task.setInitialEstimation(Integer.parseInt(console.readLine("Initial estimation (hours): ")));
					task.setRemainingTime(Integer.parseInt(console.readLine("Remainig time (hours): ")));
					task.setHoursSpent(Integer.parseInt(console.readLine("Hours spent: ")));
					task.addComment(console.readLine("Comments: "));

					TS.addProgress(task);

					System.out.println("Task \'" + task.getkey() + "\' created successfully");
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		progressReporting(console, getCurrentUser());
	}

	private void editProgress(Console console) throws SQLException {
		System.out.println("Progress management. Edit progress: ");
		Project project = new Project();
		Meeting meeting = new Meeting();
		Task task = new Task();
		GetWhatever gw = new GetWhatever();
		//gw.getProjects(console, project, TASK_MENU_NUMBER);
		User currentUser = getCurrentUser();
		if (currentUser.getRole().equals("A") || gw.isUserWorkingOnProject(currentUser, project)) {
			if (project.hasData()) {
				//gw.getMeetings(console, meeting, project, TASK_MENU_NUMBER);
				meeting.setProject(project);
				if (meeting.hasData()) {
					//gw.getTasks(console, task, meeting, TASK_MENU_NUMBER);
					if (task.hasData()) {
						task.setMeeting(meeting);
						task.setProgress(console.readLine("Task progress: "));
						task.setStatus(console.readLine("Task status: "));
						task.setRemainingTime(Integer.parseInt(console.readLine("Remaining time (hours): ")));
						task.setHoursSpent(Integer.parseInt(console.readLine("Hours spent: ")));
						task.addComment(console.readLine("Comments: "));

						TS.editProgress(task);

						System.out.println("Task \'" + task.getkey() + "\' modified successfully");
					}
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		progressReporting(console, currentUser);
	}

	private void deleteProgress(Console console) throws SQLException {
		System.out.println("Progress management. Delete progress: ");
		Project project = new Project();
		Meeting meeting = new Meeting();
		Task task = new Task();
		GetWhatever gw = new GetWhatever();
		//gw.getProjects(console, project, TASK_MENU_NUMBER);
		User currentUser = getCurrentUser();
		if (currentUser.getRole().equals("A") || gw.isUserWorkingOnProject(currentUser, project)) {
			if (project.hasData()) {
				//gw.getMeetings(console, meeting, project, TASK_MENU_NUMBER);
				if (meeting.hasData()) {
					//gw.getTasks(console, task, meeting, TASK_MENU_NUMBER);
					meeting.setProject(project);
					if (task.hasData()) {
						task.setMeeting(meeting);
						
						TS.deleteProgress(task);

						System.out.println("Task \'" + task.getkey() + "\' deleted successfully");
					}
				}
			}
		} else {
			System.out.println("You do not have permission to do this!");
		}
		progressReporting(console, currentUser);
	}
	
	public static int printMenuAndChoose(String menu, Console console) {
		
		System.out.println(menu.substring(0, menu.length() - 2));
		return Integer.parseInt(console.readLine());
	}
}

