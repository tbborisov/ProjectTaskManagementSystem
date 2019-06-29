package additionals;

public class ProjectNg {
	private String projectKey;
	private String projectTitle;
	
	public ProjectNg() {
		
	}
	
	public ProjectNg(String projectKey, String projectTitle) {
		
		this.projectKey     =  projectKey;
		this.projectTitle   =  projectTitle;
	}
	
	public void setProjectKey(String projectKey) {
		this.projectKey = projectKey;
	}
	
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;	
	}
	
	public String getProjectKey() {
		return projectKey;
	}
	
	public String getProjectTitle() {
		return projectTitle;
	}
}
