<?php 
// LOGIN PHP

$servername = "remotemysql.com";
$username = "Wz2i5Z7eb9";
$password = "xhXgOi1kFT";
$dbname = "Wz2i5Z7eb9";

	$Name = $_POST['name'];
    $Password = $_POST['password'];


		$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection Error");

		if($conn == false){
			die(mysqli_connect_error());
		}
	
        $sql = "SELECT password FROM admin WHERE name = '" . $Name ."'";
		
		$result = $conn->query($sql);
		
		if($result->num_rows >0)
		{
			while($row = $result ->fetch_assoc())
			{
				if($row['password'] == $Password)
				{
                session_start();
				$_SESSION['user'] = $Name;
				header('Location:viewAll.php');
				}
				else {
					header("location:index.php?error=1");
				}
			}
		} 
		else {
			header("location:index.php?error=2");
		}
		
		$conn->close();
    
        //header("location: welcome.php");
?>
