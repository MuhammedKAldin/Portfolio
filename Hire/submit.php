<?php 
// LOGIN PHP
//tut has 
//dbname = "unitywebphptut"
//table name = "users" --> id , username , password , level , coins

$servername = "remotemysql.com";
$username = "Wz2i5Z7eb9";
$password = "xhXgOi1kFT";
$dbname = "Wz2i5Z7eb9";

	$Name = $_POST['name'];
    $Email = $_POST['email'];
    $Phone = $_POST['phone'];
    $Country = $_POST['country'];
    $Price = $_POST['budget'];
    $Level = $_POST['quality'];
    $Story = $_POST['details'];

		$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection Error");

		if($conn == false){
			die(mysqli_connect_error());
		}
	
		$sql = "INSERT INTO visitors (`name`, `email`, `phone`, `country`, `price`, `quality`, `story`) VALUES ('$Name','$Email','$Phone','$Country','$Price','$Level','$Story')";
		if(!mysqli_query($conn ,$sql))
		{
			echo $conn->connect_error ;
		}
		else
		{
			echo 'Inserted';
		}

		$conn->close();

		header("location: index.php");
?>
