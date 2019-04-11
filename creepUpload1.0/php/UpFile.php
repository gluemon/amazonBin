<?php
	
	class UpFile{
		public $fileData;
		public $filePath;	
		public $fileType;
		public $absolutePath;	
		
		public function __construct($file,$storePath,$usePath,$fileType){
			$this->fileData=$file;	
			$this->filePath=$storePath;  //上传和返回的绝对路径在config中配置
			$this->absolutePath=$usePath;
			$this->fileType=$fileType;
			//目录容错
			if(file_exists($this->filePath)!=1){
				mkdir($this->filePath);
			} ;
		}
		
		public function multiUpload(){
			//可以根据fileType设置可接受的不同的文件类型，尺寸等
			if($this->fileType=="image"){
				$filetypeArray=array("image/jpeg","image/jpg","image/png","image/gif");  //图片类型
				$fileSize=2097152; //图片尺寸
			}else if($this->fileType=="video"){
				$filetypeArray=array("video/mp4","video/mpeg","video/mov","video/avi");  //图片类型
				$fileSize=112097152; 
			}else if($this->fileType=="txt"){
				$filetypeArray=array("text/plain");  //图片类型
				$fileSize=197152; //图片尺寸
			};
			
			$returnDimensionalArray;
			foreach ($this->fileData as $key => $value){
			if(is_uploaded_file($value["tmp_name"])){
				//大小过滤
				if($value["size"]>$fileSize){  //最大2mb，用字节表示，系统默认最大值
					$sizeError="文件尺寸超过".($fileSize/1000/1000)."MB";
					$returnArray=["result"=>$sizeError];
					$returnDimensionalArray[]=$returnArray;
					break;
				};
				//类型过滤
				
				if(!in_array($value["type"],$filetypeArray)){
					$returnArray=["result"=>"文件格式不正确"];
					$returnDimensionalArray[]=$returnArray;
					break;
				};
				//更改文件名
				$fileinfo=pathinfo($value["name"]);//解析文件名信息；
			
				$newname=date("YmdHis").rand(100,999).".".$fileinfo["extension"];//新名称（必须加随机数因为可能多个人都同时上传）+扩展名
				
				
				//移动文件
				
				if(move_uploaded_file($value["tmp_name"],$this->filePath.$newname)){
					//返回文件目录
					$returnArray=["result"=>"success",
					              "path"=>$this->absolutePath.$newname,
								  "size"=>$value["size"],
								  "extension"=>$value["type"],
								  'storePath'=>$this->filePath.$newname,
								 ];
					$returnDimensionalArray[]=$returnArray;
					
					
				}else{
					$returnArray=["result"=>"文件上传至服务器失败"];
					$returnDimensionalArray[]=$returnArray;
				};
			}else{
				$returnArray=["result"=>"临时文件夹不存在"];
				$returnDimensionalArray[]=$returnArray;
			};
			};	
			
			$returnJson=json_encode($returnDimensionalArray,JSON_UNESCAPED_UNICODE);
			return $returnJson;
			
		}
		
		public function singleUpload(){
			//可以根据fileType设置可接受的不同的文件类型，尺寸等
			if($this->fileType=="image"){
				$filetypeArray=array("image/jpeg","image/jpg","image/png","image/gif");  //图片类型
				$fileSize=2097152; //图片尺寸
			}else if($this->fileType=="video"){
				$filetypeArray=array("video/mp4","video/mpeg","video/mov","video/avi");  //图片类型
				$fileSize=112097152; 
			}else if($this->fileType=="txt"){
				$filetypeArray=array("text/plain");  //图片类型
				$fileSize=197152; //图片尺寸
			};
			
			
			if(is_uploaded_file($this->fileData["tmp_name"])){
				//大小过滤
				if($this->fileData["size"]>$fileSize){  //最大2mb，用字节表示，系统默认最大值
					$sizeError="文件尺寸超过".($fileSize/1000/1000)."MB";
					$returnArray=["result"=>$sizeError];
					$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
					return $returnJson;
					
				};
				//类型过滤
				
				if(!in_array($this->fileData["type"],$filetypeArray)){
					$returnArray=["result"=>"文件格式不正确"];
					$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
					return $returnJson;
					
				};
				//更改文件名
				$fileinfo=pathinfo($this->fileData["name"]);//解析文件名信息；
			
				$newname=date("YmdHis").rand(100,999).".".$fileinfo["extension"];//新名称（必须加随机数因为可能多个人都同时上传）+扩展名
				
				
				//移动文件
				
				if(move_uploaded_file($this->fileData["tmp_name"],$this->filePath.$newname)){
					//返回文件目录
					$returnArray=["result"=>"success",
					              "path"=>$this->absolutePath.$newname,
								  "size"=>$this->fileData["size"],
								  "extension"=>$this->fileData["type"],
								  'storePath'=>$this->filePath.$newname,
								 ];
					$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
					return $returnJson;
					
				}else{
					$returnArray=["result"=>"文件上传至服务器失败"];
					$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
					return $returnJson;
				};
			}else{
				$returnArray=["result"=>"临时文件夹不存在"];
				$returnJson=json_encode($returnArray,JSON_UNESCAPED_UNICODE);
				return $returnJson;
			};
				
		}
		
		
		
	}











	
?>