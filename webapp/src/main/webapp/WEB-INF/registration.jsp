<%@ page pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registration</title>
    <link rel="stylesheet" href="./resources/css/home.css">
    <style>
        /* Center the registration container vertically and horizontally */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f2f2f2; /* Set a background color */
        }

        /* Style for the registration container */
        .registration-container {
            background-color: #ffffff; /* Set a background color */
            border-radius: 8px; /* Add rounded corners */
            padding: 40px; /* Add padding */
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); /* Add a shadow */
            max-width: 400px; /* Set maximum width */
            width: 80%; /* Set width to 80% of parent container */
            text-align: center; /* Center align content */
            min-width: 300px; /* Set minimum width */
            min-height: 500px; /* Set minimum height */
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
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px; /* Add gap between form elements */
        }

        /* Style for form labels and inputs */
        .form-container label {
            display: block;
            margin-bottom: 5px;
            text-align: left;
            width: 100%;
        }

        .form-container input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        /* Style for the button container */
        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .button-container input[type="submit"] {
            margin-top: 20px;
            padding: 10px 20px; /* Add padding to the register button */
            background-color: #007bff; /* Set button background color */
            border: none; /* Remove button border */
            border-radius: 5px; /* Add rounded corners */
            color: white; /* Set button text color */
            cursor: pointer; /* Change cursor to pointer on hover */
        }

        .button-container input[type="submit"]:hover {
            background-color: #0056b3; /* Darken button background color on hover */
        }

        /* Style for the links container */
        .link-container {
            margin-top: 20px; /* Add space between button container and link container */
        }

        .link-container a {
            margin: 0 10px; /* Adjust the spacing between links */
            text-decoration: none; /* Remove underline */
            color: #007bff; /* Set link color */
        }

        /* Style for the debug information */
        .debug-info {
            text-align: left;
            margin-bottom: 20px;
        }

        .debug-info ul {
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <div class="registration-container">
        <div class="title-container">
            <h2>Register</h2>
        </div>
        
        <!-- Debugging information -->
        <c:if test="${not empty sessionScope.userConnection}">
            <div class="debug-info">
                <p>sessionScope.userConnection is defined :</p>
                <ul>
                    <li>sessionScope.userConnection.id : <c:out value="${sessionScope.userConnection.id}" /></li>
                    <li>sessionScope.userConnection.ipAddress : <c:out value="${sessionScope.userConnection.ipAddress}" /></li>
                    <li>sessionScope.userConnection.timestamp : <c:out value="${sessionScope.userConnection.timestamp}" /></li>
                    <li>sessionScope.userConnection.userId : <c:out value="${sessionScope.userConnection.userId}" /></li>
                    <li>sessionScope.userConnection.isAllowed : <c:out value="${sessionScope.userConnection.isAllowed}" /></li>
                </ul>
            </div>
        </c:if>
        <c:if test="${not empty sessionScope.user}">
            <div class="debug-info">
                <p>sessionScope.user is defined :</p>
                <ul>
                    <li>sessionScope.user.id : <c:out value="${sessionScope.user.id}" /></li>
                    <li>sessionScope.user.username : <c:out value="${sessionScope.user.username}" /></li>
                    <li>sessionScope.user.passwordHash : <c:out value="${sessionScope.user.passwordHash}" /></li>
                    <li>sessionScope.user.email : <c:out value="${sessionScope.user.email}" /></li>
                    <li>sessionScope.user.message : <c:out value="${sessionScope.user.message}" /></li>
                </ul>
            </div>
        </c:if>
        
        <!-- Registration form -->
        <div class="form-container">
            <form method="post" action="registration">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                
                <label for="email">Email:</label>
                <input type="text" id="email" name="email">
                
                <label for="message">Message:</label>
                <input type="text" id="message" name="message">
                
                <div class="button-container">
                    <input type="submit" value="Register">
                </div>
            </form>
        </div>

        <div class="link-container">
            <p>
                <a href="home">Home</a>
                <br>
                <a href="authentication">Authentication</a>
                <c:if test="${sessionScope.userConnection.userId != -1}">
                    <br>
                    <a href="logout">Logout</a>
                </c:if>
            </p>
        </div>

        <c:if test="${not empty registrationProblemEncountred}">
            <p>Registration failed due to: <c:out value="${registrationProblemEncountred}" /></p>
        </c:if>

        <c:if test="${not empty hasJustBeenRegistred}">
            <p>A user account with username <c:out value="${hasJustBeenRegistred}" /> has just been created.</p>
        </c:if>
    </div>
    <c:if test="${not empty hasJustBeenRegistred}">
        <script>
            // Redirect to homepage after successful authentication
            window.location.href = "home";
        </script>
    </c:if>
</body>
</html>
