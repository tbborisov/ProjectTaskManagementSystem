package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name = "tasks")
@Table(name = "tasks")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TaskID")
	private int taskID;
	@Column(name = "TaskKey")
	private String key;
	@Column(name = "Progress")
	private String progress;
	@Column(name = "Status")
	private String status;
	@Column(name = "InitialEstimation")
	private int initialEstimation;
	@Column(name = "RemainingTime")
	private int remainingTime;
	@Column(name = "HoursSpent")
	private int hoursSpent;
	@Column(name = "Comments")
	private StringBuilder comments;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
	private Meeting meeting;
	
	public Task() {
		comments = new StringBuilder();
	}
	
	public Task(String key, int initialEstimation) {
		
		this.key               = key;
		this.status            = "I";
		this.initialEstimation = initialEstimation;
		this.remainingTime     = initialEstimation;
		this.comments          = new StringBuilder();
	}
	
	public void setTaskID(int taskID) {
		this.taskID = taskID;
	}
	
	public void setTaskKey(String taskKey) {
		this.key = taskKey;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void setProgress(String progress) {
		this.progress = progress;
	}

	
	public void setInitialEstimation(int initEst) {
		this.initialEstimation = initEst;
	}
	
	public void setRemainingTime(int remainingTime) {
		this.remainingTime = remainingTime;
	}
	
	public void setHoursSpent(int hoursSpent) {
		this.hoursSpent = hoursSpent;
	}
	
	public void setComments(StringBuilder comments) {
		this.comments = comments;
	}
	
	public void addComment(String comments) {
		this.comments.append("\n "+comments);
	}
	
	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}
	
	public String getExpandedStatus() {
		switch(status) {
			case "D": return "done";
			case "I": return "in progress";
			case "R": return "reopened";
			case "O": return "open";
			default : return "invalid input";
		}
	}
	
	public int getTaskID() {
		return taskID;
	}
	
	public String getkey() {
		return key;
	}
	
	public String getStatus() {
		return status;
	}

	public String getProgress() {
		return progress;
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
		return comments;
	}
	
	public Meeting getMeeting() {
		return meeting;
	}
	
	public boolean hasData() {
		return key!=null;
	}
	
	public String toString() {
		return key + " " + getStatus() + ", " + progress + "%, est: " + initialEstimation + ", spent: "
				   + hoursSpent + ", rem: " + remainingTime;
	}
}
