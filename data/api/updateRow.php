<?php
	
	header("Content-Type:text/html;charset=utf-8");
	
	include("../class/DbUpdate.php");
	
	$du=new DbUpdate();
	
	switch ($_REQUEST["action"]){
		case "updateGalleryName":
			$sql="update gallery set galleryName='".$_REQUEST["gallery_name"]."' where galleryId=".$_REQUEST["gallery_id"];
		break;
		
		case "updatePhotoDesc":
			$sql="update cases set title='".$_REQUEST["photo_desc"]."' where id=".$_REQUEST["photo_id"];
		break;
	};
	
	$result=$du->setRow($sql);
	$result=json_encode(["result"=>$result]);
	echo $result;
?>