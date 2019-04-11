<?php

	include("../../config/constant.php");
	include("DbConnect.php");
	
	class DbSelect{
		
		private $mysqli;
		
		public function __construct(){
			$dc=new DbConnect(SQLHOST,SQLUSER,SQLPWD,SQLDB);
			$connectRes=$dc->connect();
			$this->mysqli=$connectRes;
		}
		
		public function getList($sql){
			
			$result=$this->mysqli->query($sql);
			if($result->num_rows!=0){
				while($rows=$result->fetch_object()){
					$result_array[]=$rows;
				};
				return $result_array;
			}else{
				return 0;
			}
			
		}
		
	};
	
?>