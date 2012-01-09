package com.david.rps;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

@SuppressWarnings("serial")
public class RPSServlet extends HttpServlet {
	
	private Map<String, User> users = new HashMap<String, User>();
	private int lastUserId = 0;
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String thisUsersId = req.getParameter("userId");
		if ("true".equals(req.getParameter("pingAlive"))) {
			updateLastAliveTime(thisUsersId);
		}
		else {
			ObjectMapper mapper = new ObjectMapper();
			
			ArrayNode usersArray = mapper.createArrayNode();
			
			for (Map.Entry<String, User> userEntry: users.entrySet()) {
				if (!thisUsersId.equals(userEntry.getKey())) {
					User user = userEntry.getValue();
					Date now = new Date();
					if ((now.getTime()-user.getLastAliveTime().getTime())/1000 <= 10) {
						ObjectNode userJson = mapper.createObjectNode();
						userJson.put("user_id", userEntry.getKey());
						userJson.put("user_name", user.getName());
						usersArray.add(userJson);
					}
				}
			}
			
			ObjectNode usersJson = mapper.createObjectNode();
			usersJson.put("opponents",usersArray);
			
			resp.setContentType("application/json; charset=UTF-8");
			mapper.writeValue(resp.getWriter(), usersJson);
		}
	}
	
	private void updateLastAliveTime(String thisUsersId) {
		users.get(thisUsersId).setLastAliveTime(new Date());
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String lastUserIdStr = null;
		String userName = req.getParameter("user_name");
		synchronized (this) {
			lastUserIdStr = Integer.toString(++lastUserId);
			User user = new User(lastUserIdStr, userName, new Date());
			users.put(lastUserIdStr, user);
		}
	
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode userJson = mapper.createObjectNode();
		userJson.put("user_id", lastUserIdStr);
		userJson.put("user_name", userName);
		
		resp.setContentType("application/json; charset=UTF-8");
		mapper.writeValue(resp.getWriter(), userJson);
	}
}
