<?php
    session_start();
    if(!isset($_SESSION['user']) || $_SESSION['user'] == "" )
    {
        header("location:../index.php");
        exit();
    }


?>
<html>
    <head>
        <title>Admin panel</title>
    </head>
    <body>
        <h2 align="center">MK Admin Panel</h2>
    </body>
</html>
<?php 
// LOGIN PHP

$servername = "remotemysql.com";
$username = "Wz2i5Z7eb9";
$password = "xhXgOi1kFT";
$dbname = "Wz2i5Z7eb9";

        $conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection Error");
        
		$sql = "SELECT * FROM visitors ";

		$result = $conn->query($sql);
		
		if($result->num_rows >0)
		{
			while($row = $result ->fetch_assoc())
			{
				echo '- Name: ' .$row['name'] . "<br>". ' - Email: ' .$row['email']. "<br>". ' - Phone: ' .$row['phone'] . "<br>". ' - Country: ' .$row['country'] . "<br>". ' - Price: ' .$row['price']." $". "<br>". ' - Level: ' .$row['quality']. "<br>". ' - Story: ' .$row['story'] . "<hr/>" ;
				
			}
		} else {
			echo "0 results" ;
		}
    
        $conn->close();
    
        //header("location: welcome.php");
?>
