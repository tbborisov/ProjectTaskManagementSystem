package additionals;

import java.util.ArrayList;
import java.util.List;

import entities.Meeting;

public class ReworkMeetingList {
	public static List<MeetingNg> rework(List<Meeting> meetingList){
		List<MeetingNg> meetingUNg = new ArrayList<>(); 
		for(Meeting currentMeeting : meetingList) {
			MeetingNg meetingNg = new MeetingNg();
			meetingNg.setMeetingKey(currentMeeting.getName());
			meetingNg.setMeetingDate(currentMeeting.getDate());
			meetingUNg.add(meetingNg);
		}
		return meetingUNg;
	}
}
