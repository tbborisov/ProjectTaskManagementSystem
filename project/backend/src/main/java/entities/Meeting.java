package entities;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity(name = "meetings")
@Table(name = "meetings")
public class Meeting {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MeetingID")
	private int       meetingID;
	@Column(name = "MeetingName")
	private String    name;
	@Column(name = "Date")
	private String date;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
	private Project project;
	@OneToMany(
	        mappedBy = "meeting", 
	        cascade = CascadeType.ALL, 
	        orphanRemoval = true
	)
	private List<Task> tasks = new ArrayList<>();
	
	public Meeting() {
	
	}

	public Meeting(String name, String date) {

		this.name = name;
		this.date = date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}

	public void setMeetingID(int ID) {
		this.meetingID = ID;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	public int getMeetingID() {
		return meetingID;
	}

	public String getName() {
		return name;
	}
	
	public String getDate() {
		return date;
	}
	
	public List<Task> getTasks(){
		return tasks;
	}
	
	public void addTask(Task task) {
		tasks.add(task);
		task.setMeeting(this);
	}
	
	public void removeTask(Task task) {
		tasks.remove(task);
		task.setMeeting(null);
	}
	
	public String toString() {
		return name + " " + date;
	}

	public boolean hasData() {
		return name != null;
	}
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Meeting )) return false;
        return meetingID == 0  && meetingID == ((Meeting) o).meetingID;
    }
    @Override
    public int hashCode() {
        return 31;
    }

	public void setProject(Project project) {
		this.project = project;
	}
	
	public Project getProject() {
		return project;
	}
}
