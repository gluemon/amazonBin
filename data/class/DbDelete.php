<?php

	include("../../config/constant.php");
	include("DbConnect.php");
	
	class DbDelete{
		
		private $mysqli;
		
		public function __construct(){
			$dc=new DbConnect(SQLHOST,SQLUSER,SQLPWD,SQLDB);
			$connectRes=$dc->connect();
			$this->mysqli=$connectRes;
		}
		
		public function deleteRow($sql){
			
			$this->mysqli->query($sql);
			$result=$this->mysqli->affected_rows;
			return $result;
		}
		
	};
	
?>