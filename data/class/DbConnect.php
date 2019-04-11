<?php
	
	class DbConnect{
		private $mysqli;
		private $host;
		private $user;
		private $pwd;
		private $db;
		
		public function __construct($host,$user,$pwd,$db){
			$this->host=$host;
			$this->user=$user;
			$this->pwd=$pwd;
			$this->db=$db;
		}
		
		public function connect(){
			$this->mysqli=new Mysqli();
			$this->mysqli->connect($this->host,$this->user,$this->pwd,$this->db);
			$this->mysqli->set_charset("utf8");
			$resultStr=$this->mysqli;
			if(mysqli_connect_errno()){
				exit(mysqli_connect_error());
			};
			return $resultStr;
		}
	};
	
?>