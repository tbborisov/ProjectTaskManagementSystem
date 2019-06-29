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
import additionals.ReworkUserList;
import additionals.UserNg;
import additionals.ValidateUser;
import entities.Project;
import entities.User;

import services.UserServices;

@Path("/userResources")
public class UserResources {
	
	
	@EJB
	private ValidateUser vu;
	@EJB
	private UserServices us;
	@EJB
	private GetWhatever gw;
	
	@GET
	@Produces("application/json")
	@Path("/isUserWorkingOnProject/{username}/{projectKey}")
	public Response isUserWorkingOnProject(@PathParam("username") String username,
			@PathParam("projectKey") String projectKey) throws SQLException {
		
		String usern = username.substring(1, username.length() - 1);
		System.out.println(usern);
		
		List<User> userList = gw.getUsers();
		int selected = 0;
		for(int i=0 ; i<userList.size(); i++) {
			if(userList.get(i).getLoginName().equals(usern)) {
				selected = i;
				break;
			}
		}
		
		User user = userList.get(selected);
		
		List<Project> projectList = gw.getProjects();
		int selectedproject = 0;
		for(int i=0 ; i< projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selectedproject = i;
				break;
			}
		}
		
		Project project = projectList.get(selectedproject);
		
		boolean workingOn = gw.isUserWorkingOnProject(user, project);
		
		return Response.ok(workingOn).build();
	}
	
	@GET
	@Produces("application/json")
	@Path("/validation/{userNameLogin}/{userPasswordLogin}")
	public Response isUserValid(@PathParam("userNameLogin") String userNameLogin,
			@PathParam("userPasswordLogin") String userPasswordLogin) throws SQLException {
		
		
		User currentUser = new User();
		if (vu.checkIfValid(userNameLogin, userPasswordLogin, currentUser)) {
			UserNg userNg = new UserNg();
			userNg.setUsername(currentUser.getLoginName());
			userNg.setRole(currentUser.getRole());
			GenericEntity<UserNg> ge = new GenericEntity<UserNg>(userNg) {}; 
			return Response.ok(ge).build();
		}
		return Response.status(400).build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/createUser")
	public Response createUser(UserNg userNg) throws SQLException {
				List<User> userList = gw.getUsers();
				for(int i=0 ; i<userList.size(); i++) {
					if(userList.get(i).getLoginName().equals(userNg.getUsername())) {
						return Response.status(400).build();
					}
				}
				
				User newUser = new User();
				newUser.setLoginName(userNg.getUsername());
				newUser.setPassword(userNg.getPassword());
				newUser.setFullName(userNg.getFullName());
				newUser.setRole(userNg.getRole());
				us.createUser(newUser);
				return Response.status(200).build();
	}
		
	@GET
	@Produces("application/json")
	@Path("/getUserListFull")
	public Response getUserListFull(@PathParam("projectKey") String userNameLogin) throws SQLException {
		List<User> user = gw.getUsers();
		List<UserNg> listUNg = ReworkUserList.reworkFull(user);
		GenericEntity<List<UserNg>> ge = new GenericEntity<List<UserNg>>(listUNg) {};
		return Response.ok(ge).build();
	} 
	
	@GET
	@Produces("application/json")
	@Path("/getUserListAssignFull/{projectKey}")
	public Response getUserListFullAssign(@PathParam("projectKey") String projectKey) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		List<User> user = gw.getUsers();
		List<User> newUserList = new ArrayList<>();
		for( User currUser : user) {
			if(!gw.isUserWorkingOnProject(currUser, project)){
				newUserList.add(currUser);
			}
		}
		
		GenericEntity<List<UserNg>> ge = new GenericEntity<List<UserNg>>(ReworkUserList.reworkFull(newUserList)) {};
		return Response.ok(ge).build();
	} 
	
	@GET
	@Produces("application/json")
	@Path("/getUserListAssignFullAssigned/{projectKey}")
	public Response getUserListFullAssignAssigned(@PathParam("projectKey") String projectKey) throws SQLException {
		List<Project> projectList = gw.getProjects();
		int selected = 0;
		for(int i=0 ; i<projectList.size(); i++) {
			if(projectList.get(i).getProjectKey().equals(projectKey)) {
				selected = i;
				break;
			}
		}
		Project project = projectList.get(selected);
		
		List<User> user = gw.getUsers();
		List<User> newUserList = new ArrayList<>();
		for( User currUser : user) {
			if(gw.isUserWorkingOnProject(currUser, project)){
				newUserList.add(currUser);
			}
		}
		
		GenericEntity<List<UserNg>> ge = new GenericEntity<List<UserNg>>(ReworkUserList.reworkFull(newUserList)) {};
		return Response.ok(ge).build();
	} 
	
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/editUser")
	public Response editUser(UserNg userNg) throws SQLException {
		List<User> userList = gw.getUsers();
		int selected = 0;
		for(int i=0 ; i<userList.size(); i++) {
			if(userList.get(i).getLoginName().equals(userNg.getUsername())) {
				selected = i;
				break;
			}
		}
		User user = userList.get(selected);
		user.setPassword(userNg.getPassword());
		user.setFullName(userNg.getFullName());
		user.setRole(userNg.getRole());
		us.editUser(user);
		return Response.status(200).build();
	}
	
	@GET
	@Consumes("application/json")
	@Produces("application/json")
	@Path("/deleteUser/{username}")
	public Response deleteUser(@PathParam("username") String username) throws SQLException {
		
		List<User> userList = gw.getUsers();
		int selected = 0;
		for(int i=0 ; i<userList.size(); i++) {
			if(userList.get(i).getLoginName().equals(username)) {
				selected = i;
				break;
			}
		}
		User user = userList.get(selected);
		us.deleteUser(user);
		return Response.status(200).build();
	}
	
}
