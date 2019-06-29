package additionals;

public class MeetingTask {
	private String meetingKey;
	private String taskKey;
	private String taskProgress;
	private String taskStatus;
	private int initialEstimation;
	private int remainingTime;
	private int hoursSpent;
	private String comments;
	
	public MeetingTask() {
	}
	
	public MeetingTask(String taskKey, int initialEstimation) {
		
		this.taskKey           = taskKey;
		this.taskStatus        = "I";
		this.initialEstimation = initialEstimation;
		this.remainingTime     = initialEstimation;
	}
	
	public void setMeetingKey(String meetingKey) {
		this.meetingKey = meetingKey;
	}
	
	public String getMeetingKey() {
		return meetingKey;
	}
	
	public void setTaskKey(String taskKey) {
		this.taskKey = taskKey;
	}
	
	public void setTaskProgress(String taskProgress) {
		this.taskProgress = taskProgress;
	}
	
	public void setTaskStatus(String taskStatus) {
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
	
	public String getTaskKey() {
		return taskKey;
	}
	
	public String getTaskProgress() {
		return taskProgress;
	}
	
	public String getTaskStatus() {
		return taskStatus;
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
	
	public StringBuilder getComments() {
		return new StringBuilder(comments);
	}
}
