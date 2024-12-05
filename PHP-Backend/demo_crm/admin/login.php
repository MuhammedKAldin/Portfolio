<?php
// Start the session
session_start();

// Include the database configuration file
require '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get email and password from the POST request
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Assuming your Database class provides a `getConnection()` method that returns a PDO connection
    $database = new Database();
    $pdo = $database->getConnection();

    // Check if the database connection is successful
    if ($pdo === null) {
        echo "Database connection failed.";
        exit;
    }

    // Query to check if the user exists in the 'owner' table with the provided email
    $query = "SELECT * FROM owner WHERE email = :email LIMIT 1";

    // Prepare the statement
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $email);

    // Execute the query
    if ($stmt->execute()) {
        // Fetch the user
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify if the user exists and the password matches
        if ($user && $password === $user['password']) {
            // Passwords match, proceed with login
            $_SESSION['user_logged_in'] = true;
            header("Location: index.php");
            exit;
        } else {
            // Wrong credentials
            echo "<script>alert('Wrong credentials. Please try again.'); window.history.back();</script>";
        }
    } else {
        // Error executing the query
        echo "Query execution failed.";
    }
}
