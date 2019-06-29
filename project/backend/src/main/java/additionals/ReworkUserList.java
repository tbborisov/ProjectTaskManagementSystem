package additionals;

import java.util.ArrayList;
import java.util.List;

import entities.User;

public class ReworkUserList {
	public static String getFullRole(String role) {
		switch (role) {
		case "A":
			return "Admin";
		case "U":
			return "User";
		default:
			return "WTF";
		}
	}
	
	public static List<String> rework(List<User> userList){
		List<String> userNgList = new ArrayList<>(); 
		for(User currentUser : userList) {
			userNgList.add(currentUser.getLoginName());
		}
		return userNgList;
	}
	
	public static List<UserNg> reworkFull(List<User> userList){
		List<UserNg> userNgList = new ArrayList<>(); 
		for(User currentUser : userList) {
			UserNg userNg = new UserNg();
			userNg.setUsername(currentUser.getLoginName());
			userNg.setFullName(currentUser.getFullName());
			userNg.setRole(getFullRole(currentUser.getRole()));
			userNgList.add(userNg);
		}
		return userNgList;
	}
}
