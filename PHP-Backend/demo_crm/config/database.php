<?php
class Database {
    private $host = "sql104.byethost12.com";
    private $database_name = "b12_37724681_crystalcrm";
    private $username = "b12_37724681";
    private $password = "3244039";
    private $port = "3306";

    // private $host = "sql12.freesqldatabase.com";
    // private $database_name = "sql12736265";
    // private $username = "sql12736265";
    // private $password = "NgQVI44tmj";
    // private $port = "3306";

    public $conn;

    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO(
                "mysql:host=" .$this->host . ";
                port=" . $this->port. ";
                dbname=" .$this->database_name,
                $this->username,
                $this->password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4") //Fix for Arabic
            );

            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Fix for Arabic
        }catch(PDOException $exception){
            echo "Database could not be connected: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

$database = new Database();
$conn = $database->getConnection();
