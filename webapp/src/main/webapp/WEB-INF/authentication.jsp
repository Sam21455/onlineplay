<!--
    FILE: authentication.jsp
    PURPOSE: Serves as the user authentication interface for the Onlineplay web application. This
             page allows users to log in using their credentials and provides feedback on the
             success or failure of login attempts.
    FUNCTIONALITIES:
        1) Authentication Form: Provides a form for users to input their username and password if
           they are not already logged in.
        2) Authentication Feedback: Informs users whether their authentication attempt was
           successful or failed, and provides specific error messages if applicable.
        3) Session Handling: Checks if the user is already logged in and prevents
           re-authentication, advising logged-in users to log out before attempting to log in
           again.
        4) Navigation Links: Offers links to the home page and registration page, and a logout
           option for users who are already logged in.
    AUTHOR: Sylvain Labopin
    TAGLIBS USED:
        - Jakarta Core Tags: Utilized for conditional content rendering based on the user's
          authentication state.
    REQUEST VARIABLES:
        - authenticationFailed: Boolean flag set if username or password is incorrect.
        - hasJustBeenAuthenticated: Contains the username of the user if authentication succeeds.
        - authenticationProblemEncountred: Contains error messages from business logic or
        user-specific exceptions.
    SESSION VARIABLES:
        - sessionScope.user: Represents the authenticated user. This is set in the session by the
          Authentication servlet when a user successfully authenticates via
          userManager.authenticateUser(username, password). Contains user details such as username,
          user ID, etc., and is used to check authentication status and display user-specific
          information.
        - sessionScope.userConnection: Managed by webapp.filter.SessionManagement.java. This object
          represents the connection between the client and server. It's initialized via
          userManager.logUserConnection(ipAddress, timestamp) and set in the session by
          session.setAttribute("userConnection", userConnection). It is essential for
          webapp.filter.SessionCheckFilter to maintain session integrity and user connectivity.
          It is updated with the user ID when authentication is successful.
    FILES THIS USES:
        - Contains links to home.jsp, registration.jsp and logout.jsp to facilitate
          user navigation and account management directly from the main page.
    FILES THAT USE THIS FILE:
        - Authentication.java: This servlet is directly responsible for processing the login
          requests from the authentication form present on this page. It handles user credentials,
          performs authentication checks, and redirects users based on the outcome. The servlet
          also manages session attributes that are crucial for conditional rendering on this page,
          such as user authentication status.
        - Pages that provide links to this page are home.jsp, registration.jsp and logout.jsp.
    EXAMPLES OF USE:
        - A user visits this page to log in to their account.
        - A logged-in user is redirected here to log out or is informed to do so if they attempt
          to access the login form again.
    FORM DATA SUBMISSIONS:
      - authentication.jsp contains a form that facilitates user interactions by sending data to
        the server through POST requests. Here are the details of the form and its respective
        variables:
        User Authentication:
           - Form action: authentication
           - Method: POST
           - Variables:
             * username: [input from the user] (collects the username entered by the user)
             * password: [input from the user] (collects the password entered by the user)
           - User action: This form allows a user to authenticate by entering their username and
                          password and clicking the submit button. It sends a request to
                          authenticate the user based on the credentials provided.
    MAVEN AND SERVLET CONFIGURATION:
      - The Authentication servlet is configured in the web.xml file to handle requests to
        '/authentication'. This servlet processes the user login attempts. Below is the relevant
        servlet configuration in web.xml:
            <servlet>
            <servlet-name>Authentication</servlet-name>
            <servlet-class>online.caltuli.webapp.servlet.gui.Authentication</servlet-class>
            </servlet>
            <servlet-mapping>
            <servlet-name>Authentication</servlet-name>
            <url-pattern>/authentication</url-pattern>
            </servlet-mapping>
        This configuration directs requests to '/authentication' to be handled by the
        Authentication servlet, which is responsible for validating user credentials and managing
        session state based on authentication success or failure.
-->

<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Authentication</title>
    <link rel="stylesheet" href="./resources/css/home.css">
<style>
    /* Center the login container vertically and horizontally */
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f2f2f2; /* Set a background color */
    }

    /* Style for the login container */
    .login-container {
        background-color: #ffffff; /* Set a background color */
        border-radius: 8px; /* Add rounded corners */
        padding: 40px; /* Add padding */
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); /* Add a shadow */
        max-width: 400px; /* Set maximum width */
        width: 80%; /* Set width to 80% of parent container */
        text-align: center; /* Center align content */
        min-width: 300px; /* Set minimum width */
        min-height: 400px; /* Set minimum height */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* Style for the title container */
    .title-container {
        margin-bottom: 20px; /* Add space between title container and form container */
    }

    /* Style for the form container */
    .form-container {
        margin-bottom: 20px; /* Add space between form container and button container */
    }

    /* Style for the links container */
    .link-container {
        margin-top: 20px; /* Add space between button container and link container */
    }

    /* Style for the form */
    form {
        text-align: center;
    }

    /* Style for the buttons */
    .button-container input[type="submit"] {
        margin-top: 50px;
        margin-bottom: 50px;
        padding: 10px 20px; /* Add padding to the login button */
        background-color: #007bff; /* Set button background color */
        border: none; /* Remove button border */
        border-radius: 5px; /* Add rounded corners */
        color: white; /* Set button text color */
        cursor: pointer; /* Change cursor to pointer on hover */
    }

    .button-container input[type="submit"]:hover {
        background-color: #0056b3; /* Darken button background color on hover */
    }

    /* Style for the links */
    .link-container a {
        margin: 0 10px; /* Adjust the spacing between links */
        text-decoration: none; /* Remove underline */
        color: #007bff; /* Set link color */
    }
</style>


</head>
<body>
    <div class="login-container">
        <div class="title-container">
            <p>Authentication page</p>
        </div>

        <div class="form-container">
        <c:if test="${empty sessionScope.user}">
            <form id="loginForm" method="post" action="authentication">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br>
                <div class="button-container">
                    <input type="submit" value="Login">
                </div>
            </form>
        </c:if>
        </div>
        <c:if test="${not empty hasJustBeenAuthenticated}">
            <p>Authentication succeeded!</p>
            <p>Hello <c:out value="${hasJustBeenAuthenticated}" />!</p>
        </c:if>

        <c:if test="${not empty authenticationFailed}">
            <script>
                // Show a popup alert for authentication failure
                alert("Authentication failed. The username or the password is incorrect.");
            </script>
        </c:if>

        <c:if test="${not empty authenticationProblemEncountred}">
            <script>
                // Show a popup alert for authentication failure
                alert("Authentication failed. The username or the password is incorrect.");
            </script>
        </c:if>
        <div class="link-container">
        <a href="home">Home</a>
        <a href="registration">Registration</a>
    </div>
</div>

    <c:if test="${not empty hasJustBeenAuthenticated}">
    <script>
        // Redirect to homepage after successful authentication
        window.location.href = "home";
    </script>
    </c:if>
    
    <script>
        document.addEventListener("DOMContentLoaded", function() {
                var loginForm = document.getElementById("loginForm");

                loginForm.addEventListener("submit", function(event) {
                    event.preventDefault();

                    // Get username and password values
                    var username = document.getElementById("username").value;
                    var password = document.getElementById("password").value;

                    // Check if username or password is empty
                    if (!username.trim() || !password.trim()) {
                        alert("Please enter correct username and password.");
                        return; // Stop form submission
                    }

                    // If all checks pass, submit the form
                    loginForm.submit();
                });
            });
    </script>

</body>
</html>

