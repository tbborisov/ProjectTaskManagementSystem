package resources;

import java.sql.SQLException;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;

import additionals.GetWhatever;
import additionals.MeetingTask;
import additionals.ReworkTaskList;
import additionals.TaskNg;
import entities.Meeting;
import entities.Project;
import entities.Task;
import services.TaskServices;

@Path("/taskResources")
public class TaskResources {
	@EJB
	private GetWhatever gw;
	@EJB
	private TaskServices ts;
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/createTask/{projectKey}")
	public Response createTask(@PathParam("projectKey") String projectKey, MeetingTask meetingtask) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selectedProject = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selectedProject = i;
				break;
			}
		}
		Project project = projectList.get(selectedProject);
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingtask.getMeetingKey())) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meeting = meetingList.get(selectedMeeting);
		
		List<Task> taskList = gw.getTasks(meeting);
		for(int i=0 ; i<taskList.size(); i++) {
			if(taskList.get(i).getkey().equals(meetingtask.getTaskKey())) {
				return Response.status(400).build();
			}
		}
		
		Task task = new Task();
		task.setMeeting(meeting);
		System.out.println(meetingtask.getTaskProgress()+ " "+ meetingtask.getTaskStatus());
		task.setTaskKey(meetingtask.getTaskKey());
		task.setProgress(meetingtask.getTaskProgress());
		task.setStatus(meetingtask.getTaskStatus());
		task.setInitialEstimation(meetingtask.getInitialEstimation());
		task.setRemainingTime(meetingtask.getRemainingTime());
		task.setHoursSpent(meetingtask.getHoursSpent());
		task.setComments(meetingtask.getComments());
		
		ts.addProgress(task);
		return Response.status(200).build();
	}
	
	@GET
	@Produces("application/json")
	@Path("/getTaskList/{projectKey}/{meetingKey}")
	public Response editTaskList(@PathParam("projectKey") String projectKey, @PathParam("meetingKey") String meetingKey) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		String meetingName = meetingKey.replace('!', '#');
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingName)) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meetinge = meetingList.get(selectedMeeting);
		
		List<Task> taskList = gw.getTasks(meetinge);
		List<TaskNg> taskUNg = ReworkTaskList.rework(taskList);
		
		GenericEntity<List<TaskNg>> ge = new GenericEntity<List<TaskNg>>(taskUNg) {};
		return Response.ok(ge).build();
	} 
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/editTask/{projectKey}")
	public Response editTask(@PathParam("projectKey") String projectKey, MeetingTask meetingtask) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selectedProject = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selectedProject = i;
				break;
			}
		}
		Project project = projectList.get(selectedProject);
		
		String meetingName = meetingtask.getMeetingKey().replace('!', '#');
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingName)) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meeting = meetingList.get(selectedMeeting);
		
		List<Task> taskList = gw.getTasks(meeting);
		int selectedTask = 0;
		for(int i=0 ; i<taskList.size(); i++) {
			if(taskList.get(i).getkey().equals(meetingtask.getTaskKey())) {
				selectedTask = i;
				break;
			}
		}
		
		Task task = taskList.get(selectedTask);
		task.setProgress(meetingtask.getTaskProgress());
		task.setStatus(meetingtask.getTaskStatus());
		task.setRemainingTime(task.getInitialEstimation() - meetingtask.getHoursSpent());
		task.setHoursSpent(meetingtask.getHoursSpent());
		task.addComment(meetingtask.getComments().toString());

		ts.editProgress(task);
		
		return Response.status(200).build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/deleteTask/{projectKey}")
	public Response deleteTask(@PathParam("projectKey") String projectKey, MeetingTask meetingtask) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selectedProject = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selectedProject = i;
				break;
			}
		}
		Project project = projectList.get(selectedProject);
		
		String meetingName = meetingtask.getMeetingKey().replace('!', '#');
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingName)) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meeting = meetingList.get(selectedMeeting);
		
		List<Task> taskList = gw.getTasks(meeting);
		int selectedTask = 0;
		for(int i=0 ; i<taskList.size(); i++) {
			if(taskList.get(i).getkey().equals(meetingtask.getTaskKey())) {
				selectedTask = i;
				break;
			}
		}
		
		Task task = taskList.get(selectedTask);
		
		ts.deleteProgress(task);
		
		return Response.status(200).build();
	}
}
