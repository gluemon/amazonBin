<?php
	
	include("../class/DbSelect.php");
	
	$ds=new DbSelect();
	
	switch ($_REQUEST["action"]){
		case "getGalleryList":
			$sql="select * from gallery";
		break;
		
		case "getCaseList":	
			$sql="select * from cases";
		break;
		
		case "getCaseListByGallery":	
			$sql="select * from cases where galleryId=".$_REQUEST["galleryId"];
		break;
		
		case "getCaseAndGalleryListByGallery":	
			$sql="select * from cases inner join gallery on cases.galleryId=gallery.galleryId where cases.galleryId=".$_REQUEST["galleryId"];
		break;
		
		case "validateUser":	
			$sql="select count(*) as amount from users where uname='".$_REQUEST["uname"]."' and pwd='".$_REQUEST["pwd"]."'";
		break;
		
		case "getGalleryCount":	
			$sql="select count(*) as amount from gallery";
		break;
		
		case "getCaseCount":	
			$sql="select count(*) as amount from cases";
		break;
		
	};
	
	$list=$ds->getList($sql);
	/*if($list!=0){
		echo json_encode($list);
	}else{
		echo json_encode(["errMsg"=>"没有数据","errCode"=>1]);
	};
	
	*/
	
	echo json_encode($list);
	
	
?>