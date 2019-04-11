<?php
	
	header("Content-Type:text/html;charset=utf-8");
	
	include("../class/DbDelete.php");
	
	$dd=new DbDelete();
	
	switch ($_REQUEST["action"]){
		case "deleteGallery":
			$sql="delete from gallery where galleryId=".$_REQUEST["gallery_id"];
		break;
		
		case "deletePhoto":
			$sql="delete from cases where id=".$_REQUEST["photo_id"];
		break;
	};
	
	$result=$dd->deleteRow($sql);
	$result=json_encode(["result"=>$result]);
	echo $result;
?>