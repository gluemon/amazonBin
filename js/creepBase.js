(function($){
		
	$.creepBase={
		
		creepAjax:function(params){
			
			var defaults={
				type:"get",
				url:"",
				data:{},
				dataType:"json",
				success:function(data){console.log(data)},
				errorObj:function(result){console.log(result)},
			};
			
			var mixParams=$.extend(defaults,params);
			
			$.ajax({
				type:mixParams.type,
				url:mixParams.url,
				data:mixParams.data,
				dataType:mixParams.dataType,
				success:mixParams.success,
				errorObj:mixParams.errorObj,
			});
		},
		
		
		putImageCenter:function(imgJqueryObj,ratio){
			
			if(ratio==null){
				ratio=1;
			};
			
			imgJqueryObj.on("load",function(){
				
				//set the image's size as auto, or we can't get it's right initial size
				$(this).css({"width":"auto","height":"auto"});
				
				//step1:get the image's parent element's size
				var imgParentW=$(this).parent().width();
				var imgParentH=imgParentW*ratio;
				$(this).parent().height(imgParentH);
				
				//step2:get the image's initial size
				var imgW=$(this).width();
				var imgH=$(this).height();

				//step3:calculate the image's and it's parent's height-to-width ratio
				var imgParentSizeScale=imgParentW/imgParentH;
				var imgSizeScale=imgW/imgH;

				//step4:set the image's size by it's height-to-width ratio
				if(imgSizeScale>imgParentSizeScale){
					$(this).css({"width":"auto","height":imgParentH+"px"});
					var realImgW=imgParentH*imgSizeScale;
					var moveDistance=(realImgW-imgParentW)/2;
					$(this).css({"position":"relative","left":-moveDistance+"px"});
				}else{
					$(this).css({"width":imgParentW+"px","height":"auto"});
					var realImgH=imgParentW/imgSizeScale;
					var moveDistance=(realImgH-imgParentH)/2;
					$(this).css({"position":"relative","top":-moveDistance+"px"});
				};
			});
		},
		
		editStringLength:function(params){
			//str,maxLength,defaultStr
			var defaults={
				initialStr:"",
				maxLength:10,
				defaultStr:"原字符为空时的替换字符",
			};
			
			var mixParams=$.extend(defaults,params);
			
			var strLength=mixParams.initialStr.length;
			var processedStr="";
			
			if(strLength<=0){
				processedStr=mixParams.defaultStr;
			}else if(strLength>mixParams.maxLength){
				processedStr=mixParams.initialStr.substring(0,mixParams.maxLength)+"...";
			}else{
				processedStr=mixParams.initialStr;
			};
			
			return processedStr;
		},
		
		
		
		//get query values
		getQueryStr:function(name){
			
			var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
			var r=window.location.search.substr(1).match(reg);
			if(r!=null){
				return unescape(r[2]);	
			}else{
				return null;
			};
		},
		
		//cookie
		setCookie:function(userSetting){
			var defaults={
				name:"userName",
				value:"creep",
				expires:7,
			}
			var setting=$.extend(defaults,userSetting);
			var currentDate=new Date();
			currentDate.setDate(currentDate.getDate()+setting.expires);
			document.cookie=setting.name+"="+setting.value+";expires="+currentDate.toUTCString()+";path=/";
		},
		
		getCookie:function(name){
			//step1: get the cookies' string
			var cookieStr=document.cookie;
			//step2: make the name and value's patterns
			var patternName=new RegExp(name+"=");
			var patternValue=new RegExp(name+"=([^;]*)(;|$)");
			//step3: judge if the cookie exists based on the name
			if(cookieStr.match(patternName)!=null){
				//tp4: judage if the value exists based on the name
				if(cookieStr.match(patternValue)){
					//return the cookie's value
					//caution: the match method return a object and the [1] is the group's string
					return cookieStr.match(patternValue)[1];
				}else{
					return "this cookie's value is undefined";
				}
			}else{
				return false;
			};
		},
		delCookie:function(name){
			var currentDate=new Date();
			currentDate.setDate(currentDate.getDate()-1);
			document.cookie=name+"="+null+";expires="+currentDate.toUTCString()+";path=/";
	
		},
		
		//tips
		
		patchTip:function(params){
			
			var defaults={
				tipText:"错误提示",
				bgColor:"black",
				textColor:"white",
				textSize:"0.8",
				showTime:1500,
			};
			
			var mixParams=$.extend(defaults,params);
			
			var windowW=$(window).width();
			var windowH=$(window).height();
			
			var divStyle={
				"position":"fixed",
				"z-index":1000,
				"background":mixParams.bgColor,
				"color":mixParams.textColor,
				"font-size":mixParams.textSize+"rem",
				"border-radius":"5px",
				"font-family":"microsoft yahei",
			};
			
			var pStyle={
				"padding":"0.5rem 1rem",
				"max-width":windowW*0.5+"px",
			};
			
			$("body").append('<div id="patchTip"><p>'+mixParams.tipText+'</p></div>');
			$("#patchTip").css(divStyle);
			$("#patchTip p").css(pStyle);
			
			var divH=$("#patchTip").outerHeight(true,true);
			var divW=$("#patchTip").outerWidth(true,true);
			
			$("#patchTip").css({"top":(windowH-divH)/2+"px","left":(windowW-divW)/2+"px"});
			
			setTimeout(function(){
				$("#patchTip").fadeOut().remove();
			},mixParams.showTime);
			
		},
		
		confirmTip:function(params){
			
			var tipTypeList=["readonly","redirect","callback"];
			
			var defaults={
				tipType:"readonly",
				redirectUrl:"",
				callback:function(){},
				
				tipText:"错误提示",
				bgColor:"white",
				textColor:"gray",
				textSize:"0.8",
				borderColor:"rgb(220,220,220)",
				
				buttonValue:"确定",
				buttonBgColor:"#3c78ff",
				
				bgShow:true,
				bgOpacity:0.7,
			};
			
			var mixParams=$.extend(defaults,params);
			
			var windowW=$(window).width();
			var windowH=$(window).height();
			
			var bgStyle={
				"position":"fixed",
				"z-index":99,
				"background":"rgba(0,0,0,"+mixParams.bgOpacity+")",
				"width":"100%",
				"height":windowH+"px",
				"margin":0,
				"padding":0,
			};
			
			var divStyle={
				"position":"fixed",
				"z-index":100,
				"background":mixParams.bgColor,
				"color":mixParams.textColor,
				"font-size":mixParams.textSize+"rem",
				"border-radius":"8px",
				"font-family":"microsoft yahei",
				"overflow":"hidden",
				"border":"1px solid "+mixParams.borderColor,
			};
			
			var pStyle={
				"padding":"0.5rem 1rem",
				"max-width":windowW*0.5+"px",
				"min-width":windowW*0.2+"px",
				"text-align":"center",
			};
			
			
			var buttonStyle={
				"width":"100%",
				"border":"none",
				"height":"2rem",
				"background":mixParams.buttonBgColor,
				"color":"white",
				"font-family":"microsoft yahei",
				"cursor":"pointer",
			};
			
			if(mixParams.bgShow){
				$("body").append('<section id="tipBg"></section>');
				$("#tipBg").css(bgStyle);
			};

			$("body").append('<div id="confirmTip"><p>'+mixParams.tipText+'</p><input type="button" value="'+mixParams.buttonValue+'"/></div>');
			$("#confirmTip").css(divStyle);
			$("#confirmTip p").css(pStyle);
			$("#confirmTip input[type=button]").css(buttonStyle);
			
			var divH=$("#confirmTip").outerHeight(true,true);
			var divW=$("#confirmTip").outerWidth(true,true);
			
			$("#confirmTip").css({"top":(windowH-divH)/2+"px","left":(windowW-divW)/2+"px"});
			
			//click to hide or redirect
			$("#confirmTip input[type=button]").on("click",function(){
				
				if(tipTypeList.indexOf(mixParams.tipType)==-1){
					$(this).prev().text("参数tipType不正确");
					return false;
				};
				
				switch (mixParams.tipType){
					case "readonly":
						$(this).parent().fadeOut().remove();
						$("#tipBg").fadeOut().remove();
					break;
					case "redirect":
						$(this).parent().remove();
						$("#tipBg").fadeOut().remove();
						window.location.href=mixParams.redirectUrl;
					break;
					case "callback":
						$(this).parent().remove();
						$("#tipBg").fadeOut().remove();
						mixParams.callback();
					break;
				};
			});
			
		},
		
		hideLoadTip:function(){
			if($("#loadTip").length>0){
				$("#loadTip").remove();
			};
		},
		
		loadTip:function(params){
			
			var defaults={
				bgColor:"white",
				borderColor:"rgb(200,200,200)",
			};
			
			var mixParams=$.extend(defaults,params);
			
			var windowW=$(window).width();
			var windowH=$(window).height();
			
			var imgSrc="data:image/gif;base64,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";
			
			var divStyle={
				"position":"fixed",
				"width":"5rem",
				"height":"5rem",
				"z-index":100,
				"background":"url("+imgSrc+") no-repeat",
				"background-size":"300%",
				"background-position":"center",
				"color":mixParams.textColor,
				"font-size":mixParams.textSize+"rem",
				"border-radius":"5px",
				"font-family":"microsoft yahei",
				"border":"1px solid "+mixParams.borderColor,
			};	
			
			if($.creepBase.isMobileDevice()){
				var aimSize=$(window).width()*0.15;
				divStyle.width=aimSize+"px";
				divStyle.height=aimSize+"px";
			};
			
			$("body").append('<div id="loadTip"></div>');
			$("#loadTip").css(divStyle);
			
			var divH=$("#loadTip").outerHeight(true,true);
			var divW=$("#loadTip").outerWidth(true,true);
			
			$("#loadTip").css({"top":(windowH-divH)/2+"px","left":(windowW-divW)/2+"px"});
			
		},
		
		
		//system 
		isMobileDevice:function(){
			var userAgentInfo = navigator.userAgent;
			var agentList = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
			var isMobile=false;
			
			for(var i in agentList){
				if(userAgentInfo.match(agentList[i])){
					isMobile=true;
				};
			};
			
			return isMobile;
		},
		
		//validate
		validateStringLength:function(params){
			
			var defaults={
				str:"",
				maxLength:10,
				minLength:1,
			};
			
			var errorObj={
				errCode:0,
				errMsg:"",
				curLength:0,
			};
			
			var mixParams=$.extend(defaults,params);
			
			var strLength=mixParams.str.length;
			
			if(strLength<=0){
				errorObj.errCode=1;
				errorObj.errMsg="字段不能为空";
				errorObj.curLength=strLength;
			}else if(strLength>0 && strLength<mixParams.minLength){
				errorObj.errCode=2;
				errorObj.errMsg="字段长度不能小于"+mixParams.minLength;
				errorObj.curLength=strLength;
			}else if(strLength>mixParams.maxLength){
				errorObj.errCode=3;
				errorObj.errMsg="字段长度不能大于"+mixParams.maxLength;
				errorObj.curLength=strLength;
			}else{
				errorObj.errCode=0;
				errorObj.errMsg="字段符合规定";
				errorObj.curLength=strLength;
			};
			
			return errorObj;
		},
		
		
		validateNumberSize:function(params){
			
			var defaults={
				number:0,
				maxSize:10,
				minSize:1,
			};
			
			var errorObj={
				errCode:0,
				errMsg:"",
				curSize:0,
			};
			
			var mixParams=$.extend(defaults,params);
			
			if(mixParams.number<mixParams.minSize){
				errorObj.errCode=1;
				errorObj.errMsg="字段不能小于"+mixParams.minSize;
				errorObj.curSize=mixParams.number;
			}else if(mixParams.number>mixParams.maxSize){
				errorObj.errCode=2;
				errorObj.errMsg="字段不能大于"+mixParams.maxSize;
				errorObj.curSize=mixParams.number;
			}else{
				errorObj.errCode=0;
				errorObj.errMsg="字段符合规定";
				errorObj.curSize=mixParams.number;
			};
			
			return errorObj;
			
		},
		
		
		validateStringFormat:function(params){
		
			var formatTypeList=["email","phone","tel","password"];
		
			var defaults={
				formatType:"email",
				str:"",
				maxPwdLength:18,
				minPwdLength:6,
			};
			
			var errorObj={
				errCode:0,
				errMsg:"",
				formatType:"",
			};
			
			var mixParams=$.extend(defaults,params);
			var format=null; 
			
			if(formatTypeList.indexOf(mixParams.formatType)==-1){
				errorObj.errCode=2;
				errorObj.errMsg="参数formatType不正确";
				errorObj.formatType=mixParams.formatType;
				return errorObj;
			};
			
			switch (mixParams.formatType){
				case "email":
					format=/^[a-zA-Z0-9_-]+@(([a-zA-Z0-9_-]+\.)+)([a-zA-Z0-9_-]+)$/;
				break;
				case "phone":
					format=/^1[0-9]{10}$/;
				break;
				case "tel":
					format=/^([0-9]{4})?[-]?([0-9]{6})$/;
				break;
				case "password":
					format=/^[a-zA-Z0-9_!@#$%^&-]{6,18}$/;
					format=new RegExp("^[a-zA-Z0-9_!@#$%^&-]{"+mixParams.minPwdLength+","+mixParams.maxPwdLength+"}$");
				break;
			};
			
			var matchRes=mixParams.str.match(format);
			
			if(matchRes==null){
				errorObj.errCode=1;
				errorObj.errMsg="匹配失败";
				errorObj.formatType=mixParams.formatType;
			}else{
				errorObj.errCode=0;
				errorObj.errMsg="匹配成功";
				errorObj.formatType=mixParams.formatType;
				errorObj.matchRes=matchRes;
			};
			
			return errorObj;
			
		},
		
		//scroll to get next page
		
		getNextPageByScroll:function(params){
			
			var defaults={
				triggerObj:$("#horizon"),
				ajaxUrl:"data/api/getList.php",
				ajaxData:{
							action:"getGalleryList",
						},
				callback:function(){console.log(data)},
			};
			
			var loading=false;
			
			var mixParams=$.extend(defaults,params);
			
			$(document).on("scroll",function(){
				
				var windowH=$(window).height();
				var scrollTop=$(document).scrollTop();
				
				var divTop=mixParams.triggerObj.offset().top;
				var divH=mixParams.triggerObj.height();
				
				if(windowH+scrollTop>=divTop+divH){
					if(loading==false){
						loading=true;
						$.creepBase.loadTip();
						$.creepBase.creepAjax({
							url:mixParams.ajaxUrl,
							data:mixParams.ajaxData,
							success:function(data){
								loading=false;
								$.creepBase.hideLoadTip();
								mixParams.callback(data);
							},
						});
						
					};
					
				};
			});
		},
		
		//scroll to load images
		/*
			html format,for example:
			<dd><img  src="images/example.jpg" data-src="images/realimg.png"/></dd>
		*/
		delayToLoadImages:function(params){
				
			var defaults={
				imageParentObj:null,
				urlAttrName:"data-src",
			};
			
			var mixParams=$.extend(defaults,params);
			
			var windowH=$(window).height();
			mixParams.imageParentObj.find("img["+mixParams.urlAttrName+"]").each(function(){
				var initialImgTop=$(this).offset().top;
				if(initialImgTop<windowH){
					$(this).attr({"src":$(this).attr(mixParams.urlAttrName)}).removeAttr(mixParams.urlAttrName);
				};
			});
			$(document).on("scroll",function(){
				var scrollTop=$(document).scrollTop();
				
				mixParams.imageParentObj.find("img["+mixParams.urlAttrName+"]").each(function(){
					var imgTop=$(this).offset().top;
					if(scrollTop+windowH>=imgTop){
						$(this).attr({"src":$(this).attr(mixParams.urlAttrName)}).removeAttr(mixParams.urlAttrName);
					};
				});
			});
		},
		
		//$.creepBase ends tag
	};	
		
		
})(jQuery);