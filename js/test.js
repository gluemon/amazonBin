$(document).on("ready",function(){
	$.creepBase.loadTip();
	$.creepBase.creepAjax({
		url:"data/api/getList.php",
		data:{
			action:"getGalleryList",
		},
		success:function(data){
			console.log(data);
			for(var i in data){
				if(i>3){continue};
				$("#horizon dl").append("<dd><img src=\"images/adv01.jpg\" data-src=\""+data[i].galleryFace+"\"/></dd>");
			};
			//$.creepAnimation.setHorizonMotion($("#horizon dl"));
			
			
			var callback=function(data){
				for(var i in data){
					if(i>3){continue};
					$("#horizon dl").append("<dd><img  src=\"images/adv01.jpg\" data-src=\""+data[i].galleryFace+"\"/></dd>");
				};
				
				$.creepBase.delayToLoadImages({
					imageParentObj:$("#horizon dl dd"),
				});
			};
			
			$.creepBase.hideLoadTip();
			$.creepBase.getNextPageByScroll({
				triggerObj:$("#horizon"),
				ajaxUrl:"data/api/getList.php",
				ajaxData:{
							action:"getGalleryList",
						},
				callback:callback,
			});
			
			$.creepBase.delayToLoadImages({
				imageParentObj:$("#horizon dl dd"),
			});
			
				
			
				
			
			
		},
	});
	
	
	
	
	
});