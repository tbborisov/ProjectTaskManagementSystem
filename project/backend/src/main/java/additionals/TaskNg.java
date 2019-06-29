package additionals;

public class TaskNg {
	private String taskKey;
	private String taskProgress;
	private String taskStatus;
	private int initialEstimation;
	private int remainingTime;
	private int hoursSpent;
	private String comments;
	
	public TaskNg() {
	}
	
	public TaskNg(String key, int initialEstimation) {
		
		this.taskKey               = key;
		this.taskStatus            = "I";
		this.initialEstimation = initialEstimation;
		this.remainingTime     = initialEstimation;
	}
	
	public void setTaskKey(String taskKey) {
		this.taskKey = taskKey;
	}
	
	public void setProgress(String taskProgress) {
		this.taskProgress = taskProgress;
	}
	
	public void setStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	
	public void setInitialEstimation(int initialEstiamtion) {
		this.initialEstimation = initialEstiamtion;
	}
	
	public void setRemainingTime(int remainingTime) {
		this.remainingTime = remainingTime;
	}
	
	public void setHoursSpent(int hoursSpent) {
		this.hoursSpent = hoursSpent;
	}
	
	public void setComments(String comments) {
		this.comments = comments;
	}
	
	public void addComment(String comments) {
		this.comments = this.comments + " " + comments;
	}
	
	public String getKey() {
		return taskKey;
	}
	
	public String getStatus() {
		return taskStatus;
	}

	public String getProgress() {
		return taskProgress;
	}

	public int getInitialEstimation() {
		return initialEstimation;
	}

	public int getRemainingTime() {
		return remainingTime;
	}

	public int getHoursSpent() {
		return hoursSpent;
	}
	
	public String getComments() {
		return comments;
	}
	
}
