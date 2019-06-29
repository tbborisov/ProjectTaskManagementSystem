package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity(name = "users")
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserID")
	private int    userID;
	@Column(name = "LoginName")
	private String loginName;
	@Column(name = "Password")
	private String password;
	@Column(name = "FullName")
	private String fullName;
	@Column(name = "Role")
	private String role;
	@ManyToMany(mappedBy = "users")
	private List<Project> projects = new ArrayList<>();
	
	public User() {

	}

	public User(String loginName, String fullName, String role, int userID) {
		
		this.fullName  = fullName;
		this.loginName = loginName;
		this.role      = role;
		this.userID    = userID;
	}


	public void setUserID(int userID) {
		this.userID = userID;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setFullName(String fullname) {
		this.fullName = fullname;
	}
	
	public void setRole(String role) {
		this.role = role;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}
	
	public int getUserID() {
		return userID;
	}
	
	public String getLoginName() {
		return loginName;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getFullName() {
		return fullName;
	}
	
	public String getRole() {
		return role;
	}

	public List<Project> getProjects() {
		return projects;
	}
	
	public boolean hasData() {
		return loginName != null;
	}
	
	public void addProject(Project project) {
	    projects.add(project);
	    project.getUsers().add(this);
	}
	 
    public void removeProject(Project project) {
	    projects.remove(project);
	    project.getUsers().remove(this);
	}
	
	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (!(o instanceof User)) return false;
	    return userID != 0 && userID==((User) o).userID;
	}
	 
    @Override
	public int hashCode() {
	    return 31;
	}
}
