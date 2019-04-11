<?php
	header("content-type:text/html;charset=utf-8");
	include("../class/DbSelect.php");
	
	$sql="select * from gallery";
	$ds=new DbSelect();
	
	phpinfo();
	
?>