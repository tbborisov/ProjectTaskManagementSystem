package additionals;

public class UserLogIn {
	private String loginName;
	private String role;
	
	public UserLogIn() {

	}

	public UserLogIn(String loginName, String role) {
		
		this.loginName = loginName;
		this.role      = role;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getLoginName() {
		return loginName;
	}
	
	public String getRole() {
		return role;
	}
}
