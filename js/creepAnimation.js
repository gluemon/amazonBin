(function($){
	
	$.creepAnimation={
		
		//set trundle dom
		setTrundleMotion:function(params){
			
			var defaults={
				trundleType:"manual", //manual || auto
				data:[],	//[{imgUrl:"",imgDesc:"",imgDocUrl:""},{},{}]
				containerParent:null,	//jQuery object
				showDesc:true,	//true || false
				limitHeight:null,	//null/100/100px
				callback:function(){},
			};
			
			var mixParams=$.extend(defaults,params);
			
			var containerStyle={
				"position":"relative",
				"overflow":"hidden",
				"width":"100%",
				"margin":0,
				"padding":0,
				"font-family":"microsoft yahei",
				"float":"left",
			};
			
			var dlStyle={
				"width":"100%",
				"float":"left",
				"position":"relative",
				"overflow":"hidden",
			};
			
			var ddStyle={
				"width":"100%",
				"float":"left",
				"position":"absolute",
				"top":0,
				"left":0,
			};
			
			var imgStyle={
				"width":"100%",
			};
			
			var divStyle={
				"width":"96%",
				"padding":"0 2%",
				"position":"absolute",
				"left":0,
				"bottom":0,
				"background":"rgba(0,0,0,0.7)",
				"height":"2rem",
			};
			
			var divpStyle={
				"width":"75%",
				"float":"left",
				"color":"white",
				"line-height":"2rem",
				"height":"2rem",
				"font-size":"0.8rem",
				"overflow":"hidden",
			};
			
			var divdlStyle={
				"float":"right",
				"height":"2rem",
			};
			
			var divddStyle={
				"float":"left",
				"margin":"0.5rem 0 0 0",
				"color":"white",
				"line-height":"1rem",
				"text-align":"center",
				"height":"1rem",
				"width":"0.8rem",
				"font-size":"0.8rem",
				"transform":"scale(0.5)",
			};
			
			var divddfirstStyle={
				"transform":"scale(1)",
			};
			
			var titleList=[];
			//create dom trees
			mixParams.containerParent.append("<section id=\"container\">"+
										"<dl></dl>"+
										"<div>"+
											"<p></p>"+
											"<dl></dl>"+
										" </div>"+
									"</section>");
			
			var container=$("#container");
			
			container.css(containerStyle);
			container.find("dl").eq(0).css(dlStyle);
			container.find("div").eq(0).css(divStyle);
			container.find("div p").css(divpStyle);
			container.find("div dl").css(divdlStyle);
			
			var data=mixParams.data;
			for(var i=0;i<data.length;i++){
				
				var currentImgUrl=data[i].imgUrl;
				var currentImgDocId=data[i].imgDocUrl;
				titleList[i]=data[i]. imgDesc;
				container.find("dl").eq(0).append("<dd><img src=\""+currentImgUrl+"\" data-docUrl=\""+currentImgDocId+"\"/></dd>")

				if(titleList[i].length>20){
					titleList[i]=titleList[i].substr(0,20)+"...";
				};
				
				//add tip circle
				container.find("div dl").append("<dd>●</dd>");
			};
			
			container.find("dl").eq(0).find("dd").css(ddStyle);
			container.find("dl").eq(0).find("dd img").css(imgStyle);
			container.find("div dl dd").css(divddStyle);
			container.find("div dl dd").eq(0).css(divddfirstStyle);
			
			container.find("dl dd").on("click",function(){
				window.location.href=$(this).find("img").attr("data-docUrl");
			});
			
			if(mixParams.showDesc==false){
				container.find("div").hide();
			};
			
			//images trundle
			var moveParams={
				titleList:titleList,
				container:container,
				limitHeight:mixParams.limitHeight,
				callback:mixParams.callback,
			};
			
			if(mixParams.trundleType=="manual"){
				$.creepAnimation.imagesTrundleManual(moveParams);
			}else{
				$.creepAnimation.imagesTrundle(moveParams);
			};
			
			
		},
		
		//imagesTrundle
		imagesTrundle:function(params){
			
			var defaults={
				titleList:[],
				container:null,
				limitHeight:null,
				callback:function(){},
			};
			
			var mixParams=$.extend(defaults,params);
			
			var container=mixParams.container;
			var moveObj=container.find("dl").eq(0).find("dd");
			//set the parent's height
			var imgH=0;
			var imgW=$(window).width();
			var limitHeight=parseInt(mixParams.limitHeight);
			
			//***must wait for the img loaded,or the height is 0
			moveObj.eq(0).find("img").on("load",function(){
				imgH=$(this).height();
				
				container.height(imgH);
				
				if(limitHeight){
					if(limitHeight<imgH){
						container.height(limitHeight);
					};
				};
				
				container.find("dl").eq(0).height(imgH);
				
				if(mixParams.callback){
					mixParams.callback();
				};
			});
			
			//set initial position
			var index=0;
			var maxIndex=moveObj.length-1;
			var nextIndex=index+1;
			moveObj.css({"left":imgW+"px"});
			moveObj.eq(index).css({"left":0+"px"});
			container.find("div p").text(mixParams.titleList[index]);
			//$("#topThree div dl dd").eq(0).css({"color":"rgb(56,120,215)"});
			
			setInterval(function(){
				
				
				if(index>maxIndex){
					index=0;
				};
				if(index<maxIndex){
					nextIndex=index+1;
				}else{
					nextIndex=0;
				};
				
				moveObj.eq(index).animate({"left":-imgW+"px"},function(){
					$(this).css({"left":imgW+"px"});
				});
				moveObj.eq(nextIndex).animate({"left":0+"px"});
				
				//change the title
				container.find("div p").text(mixParams.titleList[nextIndex]);
				//change the tip points
				container.find("div dl dd").css({"transform":"scale(0.5)"});
				container.find("div dl dd").eq(nextIndex).css({"transform":"scale(1)"});
				
				index++;
				
			},3000);
			
			
			
		},
		
		imagesTrundleManual:function(params){
			
			var defaults={
				titleList:[],
				container:null,
				limitHeight:null,
				callback:function(){},
			};
			
			var mixParams=$.extend(defaults,params);
			
			var container=mixParams.container;
			
			var moveObj=container.find("dl").eq(0).find("dd");
			//set the parent's height
			var imgH=0;
			var imgW=$(window).width();
			var limitHeight=parseInt(mixParams.limitHeight);
			
			//***must wait for the img loaded,or the height is 0
			moveObj.eq(0).find("img").on("load",function(){
				
				imgH=$(this).height();
				
				if(imgH==0){
					imgH=height;
				};
				
				container.height(imgH);
				
				if(limitHeight){
					if(limitHeight<imgH){
						container.height(limitHeight);
					};
				};
				
				container.find("dl").eq(0).height(imgH);
				
				if(mixParams.callback){
					mixParams.callback();
				};
			});
			
			//set initial position
			var index=0;
			var maxIndex=moveObj.length-1;
			var nextIndex=index+1;
			var prevIndex=maxIndex;
			moveObj.css({"left":imgW+"px"});
			moveObj.eq(index).css({"left":0+"px"});
			container.find("div p").text(mixParams.titleList[index]);
			//$("#topThree div dl dd").eq(0).css({"color":"rgb(56,120,215)"});
			
			var moveAuto=setInterval(function(){trundleAuto()},3000);
			
			function trundleAuto(){
				
				if(index>maxIndex){
					index=0;
				};
				if(index<maxIndex){
					nextIndex=index+1;
				}else{
					nextIndex=0;
				};
				
				moveObj.css({"left":imgW+"px"});
				moveObj.eq(index).css({"left":0+"px"});
				
				moveObj.eq(index).animate({"left":-imgW+"px"},function(){
					$(this).css({"left":imgW+"px"});
				});
				moveObj.eq(nextIndex).animate({"left":0+"px"});
				
				//change the title
				container.find("div p").text(mixParams.titleList[nextIndex]);
				//change the tip points
				container.find("div dl dd").css({"transform":"scale(0.5)"});
				container.find("div dl dd").eq(nextIndex).css({"transform":"scale(1)"});
				
				index++;
			};
			
			//manual
			container.swipe({
			    swipe:function(event,direction,distance,duration,fingerCount){
					clearInterval(moveAuto);
					if(direction=="left"){
						
						if(index>maxIndex){
							index=0;
						};
						if(index<maxIndex){
							nextIndex=index+1;
						}else{
							nextIndex=0;
						};
						
						moveObj.css({"left":imgW+"px"});
						moveObj.eq(index).css({"left":0+"px"});
						
						moveObj.eq(index).animate({"left":-imgW+"px"},function(){
							$(this).css({"left":imgW+"px"});
						});
						moveObj.eq(nextIndex).animate({"left":0+"px"});
								
						//change the title
						container.find("div p").text(mixParams.titleList[nextIndex]);
						//change the tip points
						container.find("div dl dd").css({"transform":"scale(0.5)"});
						container.find("div dl dd").eq(nextIndex).css({"transform":"scale(1)"});
						
						index++;
						
						moveAuto=setInterval(function(){trundleAuto()},3000);
						
					}else if(direction=="right"){
						
						if(index<0){
							index=maxIndex;
						};
						if(index>0){
							prevIndex=index-1;
						}else{
							prevIndex=maxIndex;
						};
						
						
						moveObj.css({"left":-imgW+"px"});
						moveObj.eq(index).css({"left":0+"px"});
						
						moveObj.eq(index).animate({"left":imgW+"px"},function(){
							$(this).css({"left":-imgW+"px"});
						});
						moveObj.eq(prevIndex).animate({"left":0+"px"});
						
						//change the title
						container.find("div p").text(mixParams.titleList[prevIndex]);
						//change the tip points
						container.find("div dl dd").css({"transform":"scale(0.5)"});
						container.find("div dl dd").eq(prevIndex).css({"transform":"scale(1)"});
						
						index--;
	
						moveAuto=setInterval(function(){trundleAuto()},3000);
					};  
			    },
			    preventDefaultEvents:false,
			});
			
			
			
		},
		
		//swipe to move
		setHorizonMotion:function(moveJqueryObj){
			
			moveJqueryObj.css({"position":"relative"});
			
			var articleElementWidth=moveJqueryObj.children().eq(0).outerWidth(true,true);
			var articleElementNo=moveJqueryObj.children().length;
			var articleElementParentW=articleElementNo*articleElementWidth+40;
			
			var windowW=$(window).width();
			moveJqueryObj.width(articleElementParentW);
			var moveTime=0;
			var maxMoveTime=Math.ceil((articleElementParentW-windowW)/articleElementWidth);
			var moveDistance=0;
			
			moveJqueryObj.swipe({
				swipe:function(event,direction,distance,duration,fingerCount){
					
					if(direction=='left'){
						
						if(moveTime>=maxMoveTime){
							return false;
						};
						moveTime++;
						moveDistance+=articleElementWidth;
						moveJqueryObj.animate({"left":-moveDistance+"px"});

					}else if(direction=='right'){
						
						if(moveDistance<=0){
							return false;
						};
						moveTime--;
						moveDistance-=articleElementWidth;
						moveJqueryObj.animate({"left":-moveDistance+"px"});

					};
				},
				preventDefaultEvents:false,
			});
		},
		
	};
	
}(jQuery))