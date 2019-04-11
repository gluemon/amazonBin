<?php
	header('Content-Type:text/html;charset=UTF-8');
	require('UpFile.php');
	
	if($_REQUEST["fileQuantity"]=="single"){
		$upSingle=new UpFile($_FILES[$_REQUEST["fileName"]],$_REQUEST["storePath"],$_REQUEST["usePath"],$_REQUEST["fileType"]);
		$upInfo=$upSingle->singleUpload();
		print($upInfo);
	}else if($_REQUEST["fileQuantity"]=="multi"){
		$upMulti=new UpFile($_FILES,$_REQUEST["storePath"],$_REQUEST["usePath"],$_REQUEST["fileType"]);
		$upInfo=$upMulti->multiUpload();
		$upInfo=json_encode($upInfo,JSON_UNESCAPED_UNICODE);
		print($upInfo);
	}else{
		$returnArray=["result"=>"ajax缺少参数fileQuantity(single|multi)"];
		$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
		print($returnJson);
	}
	
?>