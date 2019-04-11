	function eventByDom(){
		//2.select file
		$('#selectBtn').on('click',function(){
			$('input[name=singleFile]').trigger('click');
			
			//3.search the selected file
			var searchFile=setInterval(function(){
				if($('input[name=singleFile]').val()){
					$('#selectBtn').hide();
					$('#uploadBtn').show();
					$('#uploadForm div p').text('Choosed images： '+$('input[name=singleFile]').val());
					clearInterval(searchFile);
					
					
				};
			},1000)
		});
		
		//4.upload file to server
		$('#uploadBtn').on('click',function(){
			$(this).val("uploading").css("background","gray");
			var formData={
					fileName:'singleFile',
					fileQuantity:'single',
					fileType:fileType,	//image|video|txt
					storePath:local_path,
					usePath:absolute_path,
				};
			uploadToServer(formData);
		});
		
		//3.hide dom
		$('#uploadForm div img').on('click',function(){
			$('#uploadFile').fadeOut();
		});
	};
	
	//create dom
	function appendDom(){
		
		//0.creater dom
		var uploadFileDom=
			'<section class="uploadFile" id="uploadFile" style="display:none">'+
				'<form class="uploadForm" id="uploadForm">'+
					'<div>'+
					'<input type="file" name="singleFile" style="height:0;opacity:0"/>'+
					'<input type="button" value="Choose" class="selectBtn" id="selectBtn" style="cursor:pointer"/>'+
					'<input type="button" value="Upload" class="uploadBtn" id="uploadBtn" style="display:none"/>'+
					'<p>Max size:2MB</p>'+
					'<img src="'+plugin_root+'creepUpload/images/cancel.png"/>'+
					'</div>'+
				'</form>'+
			'</section>';
		
		$('body').append(uploadFileDom);
		
		//1.set dom's positon
		domCenter('#uploadFile');
		
		eventByDom();
	}; 
	
	//show dom
	function showUploadDom(fileType,rootPath,callbackSet){
		var maxSize="";
		var domLength=$("#uploadFile").length;
		var origin=location.origin+"/"+rootPath;
		window.absolute_path=origin+"/upload/";
		window.local_path='../../'+'upload/';	//../../../返回应用根目录
		window.plugin_root=origin+"/";
		window.callbackSet=callbackSet;
		window.fileType=fileType;
		
		if(fileType==null||fileType==undefined){
			fileType="image";
		};
		if(fileType=="image"){
			maxSize="2MB";
		}else if(fileType=="video"){
			maxSize="100MB";
		};
		
		if(domLength==0){
			appendDom();
		};
		
		$('#uploadFile').fadeIn();
		$('input[name=singleFile]').val("");
		$('#selectBtn').show();
		$('#uploadBtn').hide();
		$('#uploadForm div p').text("Max size:"+maxSize);
		$('#uploadBtn').val("upload").css("background","#F15B3D");
	};
	
	//upload to server
	function uploadToServer(formData){
			
			var disposedSetting={
				apiUrl:plugin_root+"creepUpload/php/up-file.php",
				formId:"uploadForm",
				formData:formData,
				setDomFunction:setDomFucntion,
			};
			var formObj=document.getElementById(disposedSetting.formId);
			var fd=new FormData(formObj);
			
			//add common form data
			if(disposedSetting.formData){
				for(var key in disposedSetting.formData){
					fd.append(key,disposedSetting.formData[key]);
				};
			};
			
			$.ajax({
				url:disposedSetting.apiUrl,
				type:"POST",
				data:fd,
				contentType:false,
				processData:false,
				dataType:"json",
				success:function(data,status){
					console.log("success: "+status);
					console.log(data);
					disposedSetting.setDomFunction(data);
				},
				error:function(result){
					console.log(result);
				},
			});
	};
	
	
	//set dom after upload succes
	function setDomFucntion(data){
		if(data.result=='success'){
			//$('#uploadBtn').val('Success11111').css('background','rgb(0,180,240)');
			//$('#uploadForm div p').hide();
			$('#uploadFile').fadeOut();
			$('input[name=singleFile]').val("");
			
			//data's type is obj
			if(callbackSet){
				callbackSet(data);
			};
			
		}else{
			$('#uploadBtn').val('Fail').css('background','gray');
			$('#uploadForm div p').text(data.result);
		};
	};
	
	//===========common==============
	// dom center
	function domCenter(theNode){
		
		//window's bulk
		var windowW=$(window).width();
		var windowH=$(window).height();
		
		var windowBulk={
			windowW:windowW,
			windowH:windowH,
		};
		
		//node's bulk
		var nodeW=$(theNode).width();
		var nodeH=$(theNode).height();
		
		var nodeBulk={
			nodeW:nodeW,
			nodeH:nodeH,
		};
		
		//node's position distances
		//var topDistance=(windowH-nodeH)/2;
		var topDistance="200";
		var leftDistance=(windowW-nodeW)/2;
		
		var nodeDistance={
			nodeTop:topDistance,
			nodeLeft:leftDistance,
		};
		
		//set node's position
		$(theNode).css({'top':topDistance+'px','left':leftDistance+'px'});
		
		//return the relative info
		var nodeInfo={
			windowBulk:windowBulk,
			nodeBulk:nodeBulk,
			nodeDistance:nodeDistance,
		};
		
		return nodeInfo;
	};