package additionals;

public class UserNg {
	private String username;
	private String password;
	private String fullName;
	private String role;
	
	public UserNg() {

	}

	public UserNg(String username, String fullName, String role) {
		
		this.username  = username;
		this.fullName  = fullName;
		this.role      = role;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getUsername() {
		return username;
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
}
