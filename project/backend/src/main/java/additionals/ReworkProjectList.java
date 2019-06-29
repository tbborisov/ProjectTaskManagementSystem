package additionals;

import java.util.ArrayList;
import java.util.List;

import entities.Project;

public class ReworkProjectList {
	public static List<ProjectNg> rework(List<Project> projectList){
		List<ProjectNg> projectUNg = new ArrayList<>(); 
		for(Project currentProject : projectList) {
			ProjectNg projectNg = new ProjectNg();
			projectNg.setProjectKey(currentProject.getProjectKey());
			projectNg.setProjectTitle(currentProject.getProjectTitle());
			projectUNg.add(projectNg);
		}
		return projectUNg;
	}
}
