package resources;

import java.sql.SQLException;
import java.util.ArrayList;
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
import additionals.ProjectNg;
import additionals.ReworkProjectList;
import entities.Project;
import entities.User;
import services.ProjectServices;
import services.UserServices;

@Path("/projectResources")
public class ProjectResources {
	
	@EJB
	private GetWhatever gw;
	@EJB
	private ProjectServices ps;
	@EJB
	private UserServices us;
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/createProject")
	public Response createProject(ProjectNg project) throws SQLException {
		
		List<Project> projectList = gw.getProjects();
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(project.getProjectKey())) {
				return Response.status(400).build();
			}
		}
		
		Project projecte = new Project();
		projecte.setProjectKey(project.getProjectKey());
		projecte.setProjectTitle(project.getProjectTitle());
		ps.createProject(projecte);
		return Response.status(200).build();
	}
	
	@GET
	@Produces("application/json")
	@Path("/getProjectList")
	public Response editProjectList() throws SQLException {
		List<Project> project = gw.getProjects();
		List<ProjectNg> projectUNg = ReworkProjectList.rework(project);
		GenericEntity<List<ProjectNg>> ge = new GenericEntity<List<ProjectNg>>(projectUNg) {};
		return Response.ok(ge).build();
	} 
	
	@GET
	@Produces("application/json")
	@Path("/getUserProjectList/{username}")
	public Response getUserProjectList(@PathParam("username") String username) throws SQLException {
		List<Project> project = gw.getProjects();
		
		List<User> userList = gw.getUsers();
		int selected = 0;
		for(int i=0 ; i<userList.size(); i++) {
			if(userList.get(i).getLoginName().equals(username)) {
				selected = i;
				break;
			}
		}
		User user = userList.get(selected);
		
		List<Project> newProjectList = new ArrayList<>();
		for(Project currProject: project) {
			if(gw.isUserWorkingOnProject(user, currProject)) {
				newProjectList.add(currProject);
			}
		}
		
		GenericEntity<List<ProjectNg>> ge = new GenericEntity<List<ProjectNg>>(ReworkProjectList.rework(newProjectList)) {};
		return Response.ok(ge).build();
	} 
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/editProject/{prevProjectKey}")
	public Response editProject(@PathParam("prevProjectKey") String prevProjectKey, ProjectNg projectNg) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(prevProjectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		project.setProjectKey(projectNg.getProjectKey());
		project.setProjectTitle(projectNg.getProjectTitle());
		ps.editProject(project);
		return Response.status(200).build();
	}
	
	@GET
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/deleteProject/{projectKey}")
	public Response deleteProject(@PathParam("projectKey") String projectKey) throws SQLException {
		
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		ps.deleteProject(project);
		return Response.status(200).build();
	}
	
	@GET
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/assignUsersToProject/{projectKey}/{username}")
	public Response assignUsersToProject(@PathParam("projectKey") String projectKey, @PathParam("username") String username) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selectedProj = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selectedProj = i;
				break;
			}
		}
		Project project = projectList.get(selectedProj);
		
		List<User> userList = gw.getUsers();
		int selectedUser = 0;
		for(int i=0 ; i<userList.size(); i++) {
			if(userList.get(i).getLoginName().equals(username)) {
				selectedUser = i;
				break;
			}
		}
		User user = userList.get(selectedUser);
		
		ps.assignUsersToProject(project, user);
		return Response.status(200).build();
	}
}
