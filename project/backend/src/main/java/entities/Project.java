package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity(name = "projects")
@Table(name = "projects")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ProjectID")
	private int    projectID;
	@Column(name = "ProjectKey")
	private String projectKey;
	@Column(name = "ProjectTitle")
	private String projectTitle;
	@ManyToMany(cascade = {  CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name="user_project", 
		joinColumns = @JoinColumn(name = "project_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> users = new ArrayList<>();
	@OneToMany(
	        mappedBy = "project", 
	        cascade = CascadeType.ALL, 
	        orphanRemoval = true
	)
	private List<Meeting> meetings = new ArrayList<>();
	
	public Project() {
		
	}
	
	public Project(String projectKey, String projectTitle) {
		
		this.projectKey     =  projectKey;
		this.projectTitle   =  projectTitle;
	}
	
	public void setProjectID(int projectID) {
		this.projectID = projectID;
	}
	
	public void setProjectKey(String projectKey) {
		this.projectKey = projectKey;
	}
	
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;	
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	public void setMeeintgs(List<Meeting> meetings) {
		this.meetings = meetings;
	}
	
	public int getProjectID() {
		return projectID;
	}

	public String getProjectKey() {
		return projectKey;
	}
	
	public String getProjectTitle() {
		return projectTitle;
	}
	
	public List<User> getUsers(){
		return this.users;
	}
	
	public List<Meeting> getMeetings(){
		return this.meetings;
	}
	
	public boolean hasData() {
		return projectKey!=null;
	}
	
	public String toString() {
		return projectKey + " " + projectTitle;
	}
	
	public void addMeeting(Meeting meeting) {
		meetings.add(meeting);
		meeting.setProject(this);
	}
	
	public void removeMeeting(Meeting meeting) {
		meetings.remove(meeting);
		meeting.setProject(null);
	}
	
	public void addUser(User user) {
	    users.add(user);
	    user.getProjects().add(this);
	}
	 
    public void removeUser(User user) {
	    users.remove(user);
	    user.getProjects().remove(this);
	}
	 
	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (!(o instanceof Project)) return false;
	    return projectID != 0 && projectID==((Project) o).projectID;
	}
	 
    @Override
	public int hashCode() {
	    return 31;
	}
}
