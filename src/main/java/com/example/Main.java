package com.example;

import static spark.Spark.*;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import com.google.gson.*;

public class Main {
    private static Map<String, Session> sessions = new HashMap<>();
    
    public static void main(String[] args) {
        // Set the port for the Spark server
        port(4567);

        // Serve static files from the /public folder
        staticFiles.location("/public");
        staticFiles.externalLocation("src/main/resources/views");

        // Configure before filters
        before((req, res) -> {
            // Set content type for all responses
            res.type("text/html");
        });

        // Serve index page
        get("/", (req, res) -> {
            return renderView("/views/index.html");
        });

        // Serve login page
        get("/login", (req, res) -> {
            // If already logged in, redirect to appropriate dashboard
            Session session = validateSession(req, res);
            if (session != null) {
                res.redirect("/" + session.getUserType() + "/dashboard");
                return null;
            }
            return renderView("/views/login.html");
        });

        // Handle POST request for login
        post("/login", (req, res) -> {
            res.type("application/json");
            Gson gson = new Gson();
            JsonObject response = new JsonObject();

            try {
                User user = gson.fromJson(req.body(), User.class);

                try (Connection conn = DriverManager.getConnection(
                        "jdbc:mysql://localhost:3306/varsity_transport", "root", "")) {

                    String sql = "SELECT * FROM users WHERE username=? AND password=? AND user_type=?";
                    PreparedStatement stmt = conn.prepareStatement(sql);
                    stmt.setString(1, user.username);
                    stmt.setString(2, user.password);
                    stmt.setString(3, user.userType);
                    ResultSet rs = stmt.executeQuery();

                    if (rs.next()) {
                        String status = rs.getString("status");
                        if ("approved".equals(status)) {
                            // Create session
                            String sessionId = UUID.randomUUID().toString();
                            Session session = new Session(
                                rs.getInt("id"),
                                rs.getString("username"),
                                rs.getString("user_type")
                            );
                            sessions.put(sessionId, session);
                            
                            // Set session cookie
                            res.cookie("sessionId", sessionId, 3600); // 1 hour expiration
                            
                            response.addProperty("success", true);
                            response.addProperty("message", "Login Successful");
                            response.addProperty("redirect", "/" + user.userType + "/dashboard");
                        } else {
                            response.addProperty("success", false);
                            response.addProperty("message", "Your account is pending admin approval. Please wait.");
                        }
                    } else {
                        response.addProperty("success", false);
                        response.addProperty("message", "Invalid credentials or account not found.");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.addProperty("success", false);
                response.addProperty("message", "Database error: " + e.getMessage());
            }

            return gson.toJson(response);
        });

        // Dashboard routes with authentication
        get("/admin/dashboard", (req, res) -> {
            Session session = validateSession(req, res);
            if (session == null || !"admin".equals(session.getUserType())) {
                res.redirect("/login");
                return null;
            }
            return renderView("/views/admin/dashboard.html");
        });

        get("/bus-driver/dashboard", (req, res) -> {
            Session session = validateSession(req, res);
            if (session == null || !"bus-driver".equals(session.getUserType())) {
                res.redirect("/login");
                return null;
            }
            return renderView("/views/bus-driver/dashboard.html");
        });

        get("/student-teacher/dashboard", (req, res) -> {
            Session session = validateSession(req, res);
            if (session == null || !"student-teacher".equals(session.getUserType())) {
                res.redirect("/login");
                return null;
            }
            return renderView("/views/student-teacher/dashboard.html");
        });

        // Logout endpoint
        get("/logout", (req, res) -> {
            String sessionId = req.cookie("sessionId");
            if (sessionId != null) {
                sessions.remove(sessionId);
            }
            res.removeCookie("sessionId");
            res.redirect("/");
            return null;
        });

        // About page (example of additional public page)
        get("/about", (req, res) -> {
            return renderView("/views/about.html");
        });

        // Contact page (example of additional public page)
        get("/contact", (req, res) -> {
            return renderView("/views/contact.html");
        });
    }

    // Helper method to render view files
    private static String renderView(String viewPath) {
        try {
            return new String(Main.class.getResourceAsStream(viewPath).readAllBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error loading page: " + viewPath;
        }
    }

    // Helper method to validate session
    private static Session validateSession(spark.Request req, spark.Response res) {
        String sessionId = req.cookie("sessionId");
        if (sessionId == null || !sessions.containsKey(sessionId)) {
            return null;
        }
        return sessions.get(sessionId);
    }

    // User class for parsing login credentials
    static class User {
        String username;
        String password;
        String userType;
    }

    // Session class to store user information
    static class Session {
        private int userId;
        private String username;
        private String userType;

        public Session(int userId, String username, String userType) {
            this.userId = userId;
            this.username = username;
            this.userType = userType;
        }

        public int getUserId() {
            return userId;
        }

        public String getUsername() {
            return username;
        }

        public String getUserType() {
            return userType;
        }
    }
}