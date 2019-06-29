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
import additionals.MeetingNg;
import additionals.ReworkMeetingList;
import entities.Meeting;
import entities.Project;
import services.MeetingServices;

@Path("/meetingResources")
public class MeetingResources {

	@EJB
	private GetWhatever gw;
	@EJB
	private MeetingServices ms;
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/createMeeting/{projectKey}")
	public Response createMeeting(@PathParam("projectKey") String projectKey, MeetingNg meetingNg) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		Meeting meeting = new Meeting();
		meeting.setName(gw.getMeetingName(project));
		meeting.setDate(meetingNg.getMeetingDate());
		meeting.setProject(project);
			
		ms.createMeeting(meeting);
		
		return Response.status(200).build();
	}
	
	@GET
	@Produces("application/json")
	@Path("/getMeetingList/{projectKey}")
	public Response editMeetingList(@PathParam("projectKey") String projectKey) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		List<Meeting> meetingList = gw.getMeetings(project);
		List<MeetingNg> meetingUNg = ReworkMeetingList.rework(meetingList);
		GenericEntity<List<MeetingNg>> ge = new GenericEntity<List<MeetingNg>>(meetingUNg) {};
		return Response.ok(ge).build();
	} 
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("editMeeting/{prevProjectKey}")
	public Response editMeeting(MeetingNg meetingNg, 
			@PathParam("prevProjectKey") String prevProjectKey) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(prevProjectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingNg.getMeetingKey())) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meeting = meetingList.get(selectedMeeting);
		meeting.setDate(meetingNg.getMeetingDate());
		
		ms.editMeeting(meeting);
		
		return Response.status(200).build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/deleteMeeting/{projectKey}")
	public Response deleteMeeting(@PathParam("projectKey") String projectKey, MeetingNg meetingNg) throws SQLException {
		
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		List<Meeting> meetingList = gw.getMeetings(project);
		int selectedMeeting = 0;
		for(int i=0 ; i<meetingList.size(); i++) {
			if(meetingList.get(i).getName().equals(meetingNg.getMeetingKey())) {
				selectedMeeting = i;
				break;
			}
		}
		Meeting meeting = meetingList.get(selectedMeeting);
		
		ms.deleteMeeting(meeting);
		return Response.status(200).build();
	}
}
