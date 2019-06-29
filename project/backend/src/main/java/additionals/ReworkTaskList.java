package additionals;

import java.util.ArrayList;
import java.util.List;

import entities.Task;

public class ReworkTaskList {
	public static String getTaskStatus(String status) {
		switch (status) {
		case "D":
			return "Done";
		case "I":
			return "In progress";
		case "R":
			return "Reopened";
		case "O":
			return "Open";
		default:
			return "Invalid";
		}
	}
	
	public static List<TaskNg> rework(List<Task> taskList){
		List<TaskNg> taskUNg = new ArrayList<>(); 
		for(Task currentTask : taskList) {
			TaskNg taskNg = new TaskNg();
			taskNg.setTaskKey(currentTask.getkey());
			taskNg.setProgress(currentTask.getProgress());
			taskNg.setStatus(getTaskStatus(currentTask.getStatus()));
			taskNg.setInitialEstimation(currentTask.getInitialEstimation());
			taskNg.setRemainingTime(currentTask.getRemainingTime());
			taskNg.setHoursSpent(currentTask.getHoursSpent());
			taskNg.setComments(currentTask.getComments().toString());
			taskUNg.add(taskNg);
		}
		return taskUNg;
	}
}
