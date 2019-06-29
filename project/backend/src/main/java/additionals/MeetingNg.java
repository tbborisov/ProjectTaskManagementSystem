package additionals;

public class MeetingNg {
	private String meetingKey;
	private String meetingDate;
	
	public MeetingNg() {
		
	}
	
	public MeetingNg(String meetingKey, String meetingDate) {
		this.meetingKey = meetingKey;
		this.meetingDate = meetingDate;
	}
	
	public void setMeetingKey(String meetingKey) {
		this.meetingKey = meetingKey;
	}
	
	public void setMeetingDate(String meetingDate) {
		this.meetingDate = meetingDate;
	}
	
	public String getMeetingKey() {
		return meetingKey;
	}
	
	public String getMeetingDate() {
		return meetingDate;
	}
}
