<?php
	
	header("Content-Type:text/html;charset=utf-8");
	
	include("../class/DbInsert.php");
	
	$di=new DbInsert();
	
	switch ($_REQUEST["action"]){
		
		case "addGallery":
			$sql="insert into gallery (galleryName,galleryFace,galleryDtime) values ('".$_REQUEST["gallery_name"]."','".$_REQUEST["gallery_face"]."',NOW())";
		break;
		
		case "addPhoto":
			$sql="insert into cases (galleryId,imgurl,title,dtime) values (".$_REQUEST["gallery_id"].",'".$_REQUEST["photo_path"]."','".$_REQUEST["photo_desc"]."',NOW())";
		break;
	};
	
	$result=$di->insertRow($sql);
	$result=json_encode(["result"=>$result]);
	echo $result;
	//echo $sql;
?>