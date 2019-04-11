/*common variables*/
	
var currentUrl=window.location.href;
var origin=location.origin;
var itemRoot=origin+"/tgzx/goldenshop/";
var goldenShopApi={
	getUserInfo:itemRoot+"get_user_info.jsp",
	getWXInfo:"/tgzx/jaxrs/gameServiceHandle/getUserByOpenId",
	getIndexDocList:"/tgzx/jaxrs/gameServiceHandle/getLatestDoc",
	getDocListByFolderId:itemRoot+"get_doc_list_nopage.jsp",
	getIndexTrundleImages:itemRoot+"get_index_trundle_images.jsp",
	getTrundleImages:"http://120.27.166.179/mobileF10View/data/importantPictureNews/important_PictureNews",
	getJuYuanDocList:"http://120.27.166.179/mobileF10View/data/importantNews/important_News_",	//_no 为请求页数
	getBottomMenu:itemRoot+"navbar.html",
	getCollectNews:'/tgzx/jaxrs/goldenShopHandle/getDocByShop',
	getFocusStatus:'/tgzx/jaxrs/goldenShopHandle/hasFocus',
	setFocusStatus:itemRoot+"user_action.jsp",
	getCollectProducts:'/tgzx/jaxrs/goldenShopHandle/getProductsByShop',
	getShopkeeperInfo:itemRoot+'get_shopkeeper_info.jsp',
	setShopkeeperInfo:itemRoot+'set_shopkeeper_info.jsp',
	getLiveList:"http://120.27.166.179/mobileF10View/data/importantNews/important_News_",
	checkUser:itemRoot+"gs_checkuser.jsp",
	getMyFocusShop:itemRoot+"get_favorite_shop_list.jsp",
	getMyCollectDoc:itemRoot+"get_favorite_doc_list.jsp",
	loginAndChangePwd:itemRoot+"set_shopkeeper_login.jsp",
	getChosedStocksList:itemRoot+"get_chosed_stocks_list.jsp",
	getChosedStockInfo:itemRoot+"serviceacc_esbaction.jsp",
	getStockInfo:itemRoot+"get_stock_info.jsp",
	getStockChosed:itemRoot+"get_stock_chosed.jsp",
	setStockFocused:itemRoot+"serviceacc_esbaction.jsp",
	setStockChosed:itemRoot+"set_stock_chosed.jsp",
	getBindCode:itemRoot+"get_bind_code.jsp",
	getQRCode:itemRoot+"get_qrcode.jsp",
	getSubscribeList:itemRoot+"get_subscribe_list.jsp",
	setAccountBind:itemRoot+"esbaction.jsp",
	setLog:itemRoot+"setLog.jsp",
	getAppId:itemRoot+"get_appid.jsp",
	getGameUserByUserId:'/tgzx/jaxrs/goldShellHandle/getUserInfo',
	docArticle:"http://120.27.166.179/mobileF10View/data/importantNewsDetail/newsId_importantNewsDetail",
	setDocRecordLog:itemRoot+"recordTLog.jsp",
	gsESBAction:itemRoot+"gs_esbaction.jsp",
};
var windowH=$(window).height();
var windowW=$(window).width();
var queryShopId=0;
var fromUrl=location.href;
var includeSdk="http://sdk.talkingdata.com/app/h5/v1?appid=8D28B2E51C6846ADB73A29DFFA587840&vn=stockname&vc=1704";


$(document).on("ready",function(){
	/*common functions*/
	//wechat validate
	$("body").hide();
	checkUser(fromUrl,function(data){
		
		$("body").show();
	});
	
	//bottom menu
	if(!currentUrl.match("goldenshop.html")&&!currentUrl.match("gs_doc_detail.html")&&!currentUrl.match("convert.jsp")&&!currentUrl.match("new_docdetail.jsp")){
		includeBottomMenu();
	};
	
	//sessionStorage
	if((!currentUrl.match("gs_news.html"))&&(!currentUrl.match("gs_doc_detail.html"))&&(!currentUrl.match("gs_juyuan.html"))){
		sessionStorage.removeItem("currentFolderId");
		sessionStorage.removeItem("currentScrollHeight");
	};
	
	if(!currentUrl.match("index.html")){
		localStorage.setItem("lastAccessPage",location.href);
	};
	
	
	//log
	var pathName=location.pathname;
	var pathSplit=pathName.split("/");
	var fileName=pathSplit[pathSplit.length-1];
	setLog(fileName,function(data){
		if(data.result=="success"){
			console.log("访问日志记录成功");
		}else{
			console.log("访问日志记录失败");
		};
	});
	
	//include sdk
	$("head").append('<script src="'+includeSdk+'"></script>');
	
	if(currentUrl.match("index.html")){
		/*
		$.ajax({
			type:"get",
			url:"https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN",
			data:{},
			dataType:"json",
			success:function(data){
				console.log(data);
			},
		});
		*/
		getIndexTrundleImages(function(data){
			console.log(data);
			var formatTrundleData=[];
			for(var i=0;i<data.length;i++){
				formatTrundleData[i]={};
				data[i].imgUrl=="null"?data[i].imgUrl="images/banner.jpg":data[i].imgUrl=data[i].imgUrl;
				formatTrundleData[i].imgUrl=data[i].imgUrl;
				formatTrundleData[i].imgDocUrl=data[i].openUrl;
				formatTrundleData[i].imgDesc=data[i].title;
			};
			
			$.commonMethods.setTrundleDom(formatTrundleData,$("#trundle"),false,170,function(){
				setTimeout(function(){
					//localStorage.removeItem("layer_index");
					//lead layer
					if(localStorage.getItem("layer_index")==null){
						leadLayer({
							descImg:"images/icons1703/layer_index_game.png",
							buttonImg:"images/icons1703/layer_know.png",
							patchObj:$(".navi dl[title=game] dt img"),
							lightObj:$(".navi dl[title=game] dt img"),
							patchRadius:"2px",
							revisePos:{top:0,left:0},
							reviseSize:{width:0,left:0},
							descDirect:{vercial:"top",horizon:"right"},
							//reviseDescPos:{"top":-(5*16)},
							reviseDescPos:{"top":0},
							square:true,
							hideBg:true,
							buttonTitle:"layer_index_game",
						 });
						 
						 $("img[title=layer_index_game]").on("click",function(){
							 clearLayer($(".navi dl[title=game] dt img"));
							 leadLayer({
								descImg:"images/icons1703/layer_index_goldenshell.png",
								buttonImg:"images/icons1703/layer_know.png",
								patchObj:$(".navi dl[title=score] dt img"),
								lightObj:$(".navi dl[title=score] dt img"),
								patchRadius:"2px",
								revisePos:{top:0,left:0},
								reviseSize:{width:0,left:0},
								descDirect:{vercial:"bottom",horizon:"right"},
								square:true,
								hideBg:true,
								buttonTitle:"layer_index_goldenshell",
							});
							
							 $("img[title=layer_index_goldenshell]").on("click",function(){
								 clearLayer($(".navi dl[title=score] dt img"));
								 localStorage.setItem("layer_index","showed");
							 });
						 
						 });
						
						
						 
					};
				},100);
			});
		});

		//verticleTrundle
		/*
		getGoldenChartList(8,function(data){			
			var tag=["热评","热议"];
			var currentTag="";

			for( i in data){
				var randomString=Math.random().toString();
				var randomNum=randomString.substr(randomString.length-2,1);
				
				if(randomNum%2){
					currentTag=tag[1];
				}else{
					currentTag=tag[0];
				};
				var title=$.commonMethods.editStringLength(data[i].title,15,"没有标题哦");
				var description=$.commonMethods.editStringLength(data[i].descr,36,"点击查看详情");
				$("#broadcast").append('<dd data-id="'+data[i].id+'"><span>'+currentTag+'</span>'+title+'</dd>');
			};
			
			verticleTrundle($("#broadcast dd"));
			
			$(".broadcast div:first-of-type").on("click",function(){
				window.location.href=itemRoot+"gs_news.html?folderId=1019";
			});
			
			$("#broadcast dd").on("click",function(){
				window.location.href=itemRoot+"gs_doc_detail.html?id="+$(this).attr("data-id");
			});
			
		});
		*/
		
		//redirect to categories
		getUserInfo(function(data){
			
			var categoryUrl={
				topLine:"gs_news.html?folderId=8888",
				hotPoint:"gs_news.html?folderId=1019",
				financing:"../wx/mg/funds/gs_financing.html?openId="+data.openId,
				goldenStock:"gs_news.html?folderId=1022",
				openAccount:data.openAccountUrl,
				subscribeTip:"gs_subscribe.html",
				gazeElf:"gs_stock.html",
				onlineService:"gs_service.html",
				game:"stockgame/guess_operation.html",
				score:origin+"/jinyuan_fnt/app/activity/view/index.php",
				
			}; 
			
			if(data.isShopkeeper=="Y"){
				categoryUrl.asset="gs_goldenshop.html";
				$(".navi dl[title=asset] dt img").attr({"src":"images/icons1703/naviGoldenshop.png"});
				$(".navi dl[title=asset] dd").text("我的金店");
			}else{
				getBindCode({},function(data){
					if(data.userBondAcc==""){
						categoryUrl.asset="gs_bind_account.html";
					}else{
						categoryUrl.asset="gs_asset.html";
					};
				});
				
			};
			
			$(".navi dl").on("click",function(){
				location.href=categoryUrl[$(this).attr("title")];
			});
			
			//get news list
			var pageNo=1;
			var pageSize=10;
			var appendEnd=true;
			getIndexDocList(data.shopId,pageNo,pageSize);

			$(document).on("scroll",function(){
				var callback=function(){appendEnd=true;};
				var listSectionTop=$("#index_news_list").offset().top;
				var listSectionH=$("#index_news_list").outerHeight(true,true);
				var windowH=$(window).height();
				var scrollTop=$(document).scrollTop();
				if(listSectionTop+listSectionH<=windowH+scrollTop){
					if(appendEnd==true){
						appendEnd=false;
						pageNo++;
						getIndexDocList(data.shopId,pageNo,pageSize,callback);
					};
				
				};
			});
			
		});
		
		
		
		
	}else if(currentUrl.match('gs_news.html')){
		
		getSearchList("公司",function(data){
			console.log(data);
		});
		//Trundle images
		getTrundleImages(function(data){
			var formatTrundleData=[];
			for(var i=0;i<data.length;i++){
				formatTrundleData[i]={};
				formatTrundleData[i].imgUrl="data:image/jpeg;base64,"+data[i].PictureContent;
				formatTrundleData[i].imgDocUrl="gs_juyuan.html?newsId="+data[i].ID;
				formatTrundleData[i].imgDesc=data[i].InfoTitle;
			};
			$.commonMethods.setTrundleDom(formatTrundleData,$("#trundle"),true,170);
		
		});
		
		//click to change category
		var category={
			
			hotPoint:{
						folderId:1019,
						folderName:"热点",
					 },	//热点
			topLine:{
						folderId:8888,
						folderName:"头条",
					 },	//直播
			goldenStock:{
						folderId:1022,
						folderName:"金股",
					 },	//金股
			life:{
						folderId:1028,
						folderName:"生活",
					 },	//生活 无，暂用投教
		};
		
		//append category to dom
		for(key in category){
			$(".category dl").append("<dd data-folderId=\""+category[key].folderId+"\">"+category[key].folderName+"</dd>");
		};
		
		//click to get list by folderId
		//get doc list by folderId
		var pageNo=1;
		var pageSize=10;
		var folderID=parseInt($(".category dl dd").eq(0).attr("data-folderId"));
	
		var clearDom=true;
		if($.commonMethods.getQueryStr("folderId")){
			folderID=parseInt($.commonMethods.getQueryStr("folderId"));
		};
		
		if(sessionStorage.getItem("currentFolderId")){
			folderID=sessionStorage.getItem("currentFolderId");
		};
		
		$(".category dl dd").css({"color":"#303030","transform":"scale(1)"});
		$(".category dl dd[data-folderId="+folderID+"]").css({"color":"#eb5746","transform":"scale(1.2)"});
		
		if(folderID==8888){
			//scrollNextPage(pageNo,pageSize,folderID,getJuYuanDocList);
			getJuYuanDocList(pageNo,pageSize,folderID,true);
		}else{
			//scrollNextPage(pageNo,pageSize,folderID,getDocListByFolderId);
			getDocListByFolderId(pageNo,pageSize,folderID,true);
		};
		
		
		$(".category dl").on("click","dd",function(){
			
			$(this).siblings().css({"color":"#303030","transform":"scale(1)"});
			$(this).css({"color":"#eb5746","transform":"scale(1.2)"});
			sessionStorage.removeItem("currentScrollHeight");
			$(document).scrollTop(0);
			pageNo=1;
			folderID=parseInt($(this).attr("data-folderId"));
			
			if(folderID==8888){
				console.log(folderID);
				//scrollNextPage(pageNo,pageSize,folderID,getJuYuanDocList);
				getJuYuanDocList(pageNo,pageSize,folderID,true);
			}else{
				//scrollNextPage(pageNo,pageSize,folderID,getDocListByFolderId);
				console.log(folderID);
				getDocListByFolderId(pageNo,pageSize,folderID,true);
			};
			
			var appendEnd=true;

			$(document).on("scroll",function(){
				var callback=function(){appendEnd=true;};
				var listSectionTop=$("#category_news_list").offset().top;
				var listSectionH=$("#category_news_list").outerHeight(true,true);
				var windowH=$(window).height();
				var scrollTop=$(document).scrollTop();
				console.log("scroll"+folderID);
				if(listSectionTop+listSectionH<=windowH+scrollTop){
					if(appendEnd==true){
						appendEnd=false;
						pageNo++;
						if(folderID==8888){
							getJuYuanDocList(pageNo,pageSize,folderID,false,callback);
						}else{
							getDocListByFolderId(pageNo,pageSize,folderID,false,callback);
						};
						
					};
				
				};
			});
			
		});
		
		
		var appendEnd=true;

		$(document).on("scroll",function(){
			var callback=function(){appendEnd=true;};
			var listSectionTop=$("#category_news_list").offset().top;
			var listSectionH=$("#category_news_list").outerHeight(true,true);
			var windowH=$(window).height();
			var scrollTop=$(document).scrollTop();
			console.log("scroll"+folderID);
			if(listSectionTop+listSectionH<=windowH+scrollTop){
				if(appendEnd==true){
					appendEnd=false;
					pageNo++;
					if(folderID==8888){
						getJuYuanDocList(pageNo,pageSize,folderID,false,callback);
					}else{
						getDocListByFolderId(pageNo,pageSize,folderID,false,callback);
					};
					
				};
			
			};
		});
		
		//click to save currentFolderId and scrollHeight
		$("#category_news_list_JuYuan,#category_news_list").on("click","dl",function(){
			var currentScrollHeight=$(document).scrollTop();
			var currentFolderId=folderID;
			sessionStorage.setItem("currentFolderId",currentFolderId);
			sessionStorage.setItem("currentScrollHeight",currentScrollHeight);
			
		});
		
		
	}else if(currentUrl.match("gs_mine.html")){	
		
		var custId="";
		
		$(".my_info dl dd:last-of-type").hide();
		
		getUserInfo(function(data){
			var shopId=data.shopId;
			var mySavePageUrl={
				myFocus:"gs_focus_collection.html?action=focus",
				myCollection:"gs_focus_collection.html?action=collcetion",
				myGoldenCoins:origin+"/jinyuan_fnt/app/activity/view/index.php",
			};
			
			$(".my_focus dl dd").on("click",function(){
				location.href=mySavePageUrl[$(this).attr("title")];
			});
			
			//show the different dom by the user's identity
			if(data.isShopkeeper=="Y"){
				$(".my_shopkeeper").show();
				$(".my_focus dl dd[title=myQRCode]").on("click",function(){
					location.href="gs_qrcode.html";
				});
				
				
	
				//create the shopkeeper's managerment pages' url
				var managerPageUrl={
					myShop:"gs_goldenshop.html",
					myConsumer:"gs_customer_data.html?shopID="+shopId+"&custID="+data.custId,
					myOpenAccount:"gs_openaccount_data.html?brokerNo="+data.brokerNo,
					myMarketReport:"gs_marketing_report.html?shopID="+shopId+"&brokerNo="+data.brokerNo,
					myNews:"gs_doc_manage.html?shopID="+data.encryptShopId,
				};

				//click to redirect
				$(".my_shopkeeper dl").on("click",function(){
					location.href=managerPageUrl[$(this).attr("title")];
				});
				
				//click to modify shopkeeper's infor
				$(".my_info dl dt,.my_info dl dd:first-of-type small").on("click",function(){
					window.location.href="?action=modifyInfo";
				});
				
				setTimeout(function(){
					//lead layer
					//localStorage.removeItem("layer_my");
					if(localStorage.getItem("layer_my")==null){
						leadLayer({
							descImg:"images/icons1703/layer_my_goldenshop.png",
							buttonImg:"images/icons1703/layer_know.png",
							patchObj:$(".my_shopkeeper dl[title=myShop]"),
							lightObj:$(".my_shopkeeper dl[title=myShop]").children(),
							patchRadius:"50%",
							revisePos:{top:10,left:0},
							reviseDescPos:{top:30},
							reviseSize:{width:0,left:0},
							square:true,
							descDirect:{vercial:"bottom",horizon:"left"},
							buttonTitle:"layer_my_goldenshop",
						 });
						 $("img[title=layer_my_goldenshop]").on("click",function(){
							 clearLayer($(".my_shopkeeper dl[title=myShop]").children());
							 leadLayer({
								descImg:"images/icons1703/layer_my_customer.png",
								buttonImg:"images/icons1703/layer_know.png",
								patchObj:$(".my_shopkeeper dl[title=myConsumer]"),
								lightObj:$(".my_shopkeeper dl[title=myConsumer]").children(),
								patchRadius:"50%",
								revisePos:{top:10,left:0},
								reviseDescPos:{top:30},
								reviseSize:{width:0,left:0},
								square:true,
								descDirect:{vercial:"bottom",horizon:"left"},
								buttonTitle:"layer_my_customer",
							 });
							 
							 $("img[title=layer_my_customer]").on("click",function(){
								 clearLayer($(".my_shopkeeper dl[title=myConsumer]").children());
								 localStorage.setItem("layer_my","showed");
							 });
						 });
						 
						 
					};
				},100);
				
				
			}else{
				
				$(".my_focus dl dd[title=myQRCode]").hide();
				
				//get user's assert data
				getBindCode({},function(data){
					
					if(data.userBondAcc==""){
						$(".my_bind").show().find("dl dd:last-of-type").on("click",function(){
							window.location.href="gs_bind_account.html";
						});
						$(".my_info dl dt,.my_info dl dd:first-of-type small").on("click",function(){
							window.location.href="gs_bind_account.html";
						});
					}else{
						//get user's assets infor
						$(".my_asset").show();
						$(".my_asset dl dt small").text(data.userBondAcc).parent().on("click",function(){
							window.location.href="gs_asset.html";
						});
						$(".my_info dl dt,.my_info dl dd:first-of-type small").on("click",function(){
							window.location.href="gs_bind_account.html";
						});
						
						getBindCode({action:"getBasicAssetInfo"},function(data){
							var enable_balance=parseFloat(data[0].enable_balance).toFixed(2);	//可用余额
							var asset_balance=parseFloat(data[0].asset_balance).toFixed(2);	//资产总额
							var money_type=data[0].money_type;
							var fund_account=data[0].fund_account;
							
							$(".my_asset dl dd small[title=enable_balance]").text(enable_balance);
							$(".my_asset dl dd small[title=asset_balance]").text(asset_balance);
							
							var dataObj={
								action:"getMoreAssetInfo",
								zjzh:fund_account,
								hbdm:money_type,
							};
							getBindCode(dataObj,function(data){
								var market_value=parseFloat(data[0].market_value).toFixed(2);
								var current_balance=parseFloat(data[0].current_balance).toFixed(2);
								$(".my_asset dl dd small[title=current_balance]").text(current_balance);
								$(".my_asset dl dd small[title=market_value]").text(market_value);
								console.log(data);
							});
							
						});
					};
				});
	
				
			};
			getWXInfo(data.encryptOpenId,function(data){
				
				data=data.result;
				console.log(data);
				custId=data.cust_id;
				var headImgUrl=$.commonMethods.editStringLength(data.headimgurl,1000,"images/icons1703/my_avatar.png");
				var nickName=$.commonMethods.editStringLength(data.nickname,20,"佚名");
				$(".my_info dl dt img").attr("src",headImgUrl);
				$(".modify_info dl dt img").attr("src",headImgUrl);	//修改店主信息板块头像
				$(".my_info dl dd:first-of-type small").html(nickName+" &gt;");
				
			});
		});
		
		//modify shopkeeper infor
		var action=$.commonMethods.getQueryStr("action");
		
		if(action=="modifyInfo"){
			$(".modify_info").fadeIn().height(windowH);
			getShopkeeperInfo(queryShopId,function(data){
				data=JSON.parse(data);
				
				$(".modify_info dl dd").each(function(){
					var currentTitle=$(this).attr("title");
					if(currentTitle=="qrCode"){
						$(this).on("click",function(){
							window.location.href=itemRoot+"gs_qrcode.html";
						});
					}else{
						if(currentTitle=="shopPwd"){
							$(this).find("small").text("请输入新密码");
						}else{
							var fieldVal=data[currentTitle];
							fieldVal=="null"?fieldVal="":fieldVal=fieldVal;
							fieldVal=$.commonMethods.editStringLength(fieldVal,13,"");
							$(this).find("small").text(fieldVal);
						};
						
					};
					
				});
				
				console.log(data);
			});
		};
		
		
		
		//click to show input
		$(".modify_info dl dd.modify").on("click",function(){
			$(".modify_info div").fadeIn().height(windowH);
			$(".modify_info dl").css({"opacity":"0.1"});
			var modifyInputH=$(".modify_info div").outerHeight(true,true);
			var currentModifyTitle=$(this).find("p").text();
			var currentVal=$(this).find("small").text();
			var dataRow=$(this).attr("data-row");
			var currentModifyField=$(this).attr("title");
			if(currentModifyField=="shopPwd"){
				$(".modify_info div input[type=password]").show().focus();
				$(".modify_info div textarea").hide();
				
			}else{
				$(".modify_info div input[type=password]").hide();
				$(".modify_info div textarea").show().focus();
			};
			
			$(".modify_info div").find("p").text(currentModifyTitle+"修改")
								 .parent().find("textarea").val(currentVal).css({"height":dataRow+"rem"}).attr({"data-field":currentModifyField});
		
		});
		
		$(".modify_info div img").on("click",function(){
			$(this).parent().fadeOut();
			$(".modify_info dl").css({"opacity":"1"});
		});
		
		//click to set modify
		$(".modify_info div input[type=button]").on("click",function(){
			
			var currentField=$(".modify_info div textarea").attr("data-field");
			
			if(currentField=="shopPwd"){
				//modify shop's password
				var newPwd=$(".modify_info div input[type=password]").val();
				if(newPwd.length < 8 || newPwd.length > 20 ||newPwd.match(/[0-9]+/)==null || newPwd.match(/([a-zA-Z])+/)==null){
					$.commonMethods.patchTip("微店密码必须为8-20位的数字和字母组合！");
					return false;
				}
				
				loginAndChangePwd(newPwd,custId,"changePwd",function(data){
					data=JSON.parse(data);
					if(data.result=="success"){
						$.commonMethods.patchTip("修改成功");
						if($.commonMethods.getCookie("savePwd")){
							$.commonMethods.delCookie("savePwd");
						};
						window.location.href=itemRoot+"index.html";
					}else{
						$.commonMethods.patchTip("修改失败");
					};
				});
				
				
			}else{
				
				//modify shopkeeper's infor
				
				var modifyValObj={
					shopName:$(".modify_info dl dd[title=shopName] small").text(),
					shopWXCode:$(".modify_info dl dd[title=shopWXCode] small").text(),
					shopMobile:$(".modify_info dl dd[title=shopMobile] small").text(),
					shopAddress:$(".modify_info dl dd[title=shopAddress] small").text(),
					shopDesc:$(".modify_info dl dd[title=shopName] shopDesc").text(),
				};
				
				modifyValObj[currentField]=$(".modify_info div textarea").val();

				$.ajax({
					type:"get",
					url:goldenShopApi.setShopkeeperInfo,
					dataType:"text",
					data:modifyValObj,
					success:function(data){
						data=JSON.parse(data);
						if(data.result=="success"){
							window.location.href="?action=modifyInfo";
						}else{
							$.commonMethods.patchTip("修改失败，请重新修改");
						};
						console.log(data);
					},
					error:function(result){
						console.log(result);
					},
				});
			};
			
		});
		
		//golden coins
		getGoldenCoins(function(data){
			console.log(data);
			if(!data.result){
				$(".my_info dl dd:first-of-type p").text("我的金贝：0");
			}else{
				$(".my_info dl dd:first-of-type p").text("我的金贝："+data.result.usable_score);
			};
			
			//console.log(data.result.totalPoints);  
		});
		
		
	}else if(currentUrl.match("service.html")){
		$(".qr_code").height(windowH);
		$(".qr_code img").css({"margin-top":windowH*0.15+"px"});
		
	}else if(currentUrl.match("gs_goldenshop.html")){
		
		var openAccountUrl="";
		//replace shopId by query
		if($.commonMethods.getQueryStr("shopId")){
			queryShopId=parseInt($.commonMethods.getQueryStr("shopId"));
		};
		
		
		//get user info
		getUserInfo(function(data){
			console.log(data);
			if(data.isShopkeeper!="Y"){
				//alert(queryShopId);
				if(queryShopId==0){
					location.href="restrict.html";
				};
				$("small[title=add_news],small[title=add_product]").hide();
			};
			//replace shopId by query
			if(queryShopId){
				if(queryShopId!=data.shopId){
					$("input[type=button]").hide();
				};
				data.shopId=queryShopId;
			}else{
				queryShopId=data.shopId;
			};
			
			var categoryUrl={
				addDocCollection:"gs_add_doc.html?shopID="+data.shopId+"&openId="+data.openId,
				addProductCollection:"gs_add_product.html?shopID="+data.shopId+"&openId="+data.openId,
			};
			
			$("small[title=add_news]").on("click",function(){
				location.href=categoryUrl.addDocCollection;
			});
			$("small[title=add_product]").on("click",function(){
				location.href=categoryUrl.addProductCollection;
			});
			
			
			
			//getMyFocusShop
			getMyFocusShop(1,1,data.openId,function(data){
				console.log(data);
				var currentText=$(".my_info dl dd:first-of-type p").text();
				$(".my_info dl dd:first-of-type p").html(currentText+"&nbsp&nbsp|&nbsp&nbsp关注 "+data.totalCount);
			});
			
			//get focus
			getFocusStatus(data.openId,data.shopId,function(data){
				if(data.RESULT==true){
					$(".my_info dl dd:last-of-type p").text("取消关注");
				};
			});
			
			//set focus
			$(".my_info dl dd:last-of-type p").on("click",function(){
				setFocusStatus(data.openId,data.shopId,function(data){
					console.log(data);
					if (data.success) {
						if(data.focused==false){
							$(".my_info dl dd:last-of-type p").text('+ 关注');
						}else{
							$(".my_info dl dd:last-of-type p").text('取消关注');
						};
					} else {
						$.commonMethods.patchTip(data.msg);
					};
					
				});
			});
			
			
			var pageNo=1;
			var pageSize=10;
			var clearDom=false;
			
			//collcetion news
			getCollectNews(data.shopId,pageNo,pageSize,clearDom,function(){
				//lead layer
				if(data.isShopkeeper=="Y"){
					//localStorage.removeItem("layer_goldenshop");
					if(localStorage.getItem("layer_goldenshop")==null){
						leadLayer({
							descImg:"images/icons1703/layer_goldenshop_add.png",
							buttonImg:"images/icons1703/layer_know.png",
							patchObj:$("#news_collection div small"),
							lightObj:$("#news_collection div small"),
							patchRadius:"2px",
							revisePos:{top:0,left:0},
							reviseSize:{width:5,left:5},
							square:false,
							descDirect:{vercial:"bottom",horizon:"right"},
							buttonTitle:"layer_goldenshop_add",
						 });
						 
						 $("img[title=layer_goldenshop_add]").on("click",function(){
							 clearLayer($("#news_collection div small"));
							 localStorage.setItem("layer_goldenshop","showed");
						 });
					};
				};

			});
			
			$("#news_collection>p").on("click",function(){
				pageNo++;
				getCollectNews(data.shopId,pageNo,pageSize,clearDom);
			});
			
			//collcetion products
			var productPageNo=1;
			var productPageSize=10;
			
			getCollectProducts(data.shopId,productPageNo,productPageSize,data.openId);
		
			$("#products_collection>p").on("click",function(){
				productPageNo++;
				getCollectProducts(data.shopId,productPageNo,productPageSize,data.openId);
			});
		
		});
		
		//get shopkeeper info
		getShopkeeperInfo(queryShopId,function(data){
			
			data=JSON.parse(data);
			
			getAppId(currentUrl,function(WXInfo){
				//console.log(WXInfo);
				
				var shareData = {
					appID:WXInfo.appID, 
					timestamp:WXInfo.share_timestamp,
					nonceStr:WXInfo.share_nonceStr,
					signature:WXInfo.share_signature,
					img_url: data.avatar,
					//img_width: "640",
					//img_height: "640",
					link:location.href+"?shopId="+queryShopId,
					desc:data.shopDesc,
					title:data.shopName,
				};
				
				setWXShare(shareData);
				
			});

			//console.log(data);
			var shopName=$.commonMethods.editStringLength(data.shopName,20,"佚名");
			var headImgUrl=$.commonMethods.editStringLength(data.avatar,1000,"images/icons1703/my_avatar.png");
			openAccountUrl=data.openAccountUrl;
			$(".my_info dl dt img").attr("src",headImgUrl);
			$(".my_info dl dd:first-of-type small").html(shopName+" <img src=\"images/icons1703/singleQRCode.png\"/>");
			$(".my_info dl dd:first-of-type p").text("粉丝 "+data.focusedCount);
			$(".contact_shopkeeper").on("click",function(){
				if(data.shopMobile==""||data.shopMobile=="null"||data.shopMobile==null){
					$.commonMethods.patchTip("手机不存在");
				}else{
					location.href="tel:"+data.shopMobile;
				};
			});
			
			var categoryUrl2={
				openAccount:openAccountUrl,
				gazeElf:"gs_stock.html",
			};
			
			$(".account_url dl dd").on("click",function(){
				location.href=categoryUrl2[$(this).attr("title")];
			});
		});

		//redirect

		$(".back_index p").on("click",function(){
			window.location.href="index.html";
		});
		
		
		//set QR code
		$(".my_info dl dd:first-of-type small").on("click","img",function(){
			$(".focus_code").fadeIn();
			var codeH=$(".focus_code img").height();
			$(".focus_code").height(windowH);
			$(".focus_code img").css({"margin-top":(windowH-codeH)/2+"px"});
		});
		
		$(".focus_code").on("click",function(){
			$(this).hide();
		});
		$(".focus_code img").on("click",function(){
			return false;
		});
		
		
		
		
	}else if(currentUrl.match("financing.html")){

		//golden chart
		getGoldenChartList(5,function(){
			//swipe to move 
			$.commonMethods.swipeMove($(".golden_chart dl"));
		});
		
		$.commonMethods.swipeMove($(".product_types ul"));
		
	}else if(currentUrl.match("focus_collection.html")){
		
		var actionType=$.commonMethods.getQueryStr("action");
		getUserInfo(function(userInfo){
			
			if(actionType=="focus"){
				//getMyFocusShop
				$("#collect").hide();
				$("#focus").show();
				getMyFocusShop(1,1000,userInfo.openId,function(data){
					var result=data.results;
					if(result.length<=0){
						$("#focus div").append('<small class="desc_text_color">还没有关注任何店主</small>');
						return false;
					};
					
					for(var i=0;i<result.length;i++){
						var avatar=$.commonMethods.editStringLength(result[i].headimgurl,1000,"images/icons1703/avatar.png");
						var shopName=$.commonMethods.editStringLength(result[i].shopname,15,"佚名");
						$("#focus div").append('<dl data-shopId="'+result[i].shopid+'">'+
											'<dt><img src="'+avatar+'"/></dt>'+
											'<dd>'+
												'<p>'+shopName+'</p>'+
												'<small class="desc_text_color">关注量：'+result[i].focusCount+'</small>'+
											'</dd>'+
										'</dl>');
					};
					
					$("#focus div dl").on("click",function(){
						window.location.href="gs_goldenshop.html?shopId="+$(this).attr("data-shopId");
					});
					
				});
				
			}else{
				$("#collect").show();
				$("#focus").hide();
				getMyCollectDoc(1,100,userInfo.openId,function(data){
					var result=data.results;
					if(result.length<=0){
						$("#collect div").append('<small class="desc_text_color">还没有收藏任何店铺</small>');
						return false;
					};
					for(var i=0;i<result.length;i++){
						var avatar=$.commonMethods.editStringLength(result[i].localimgurl,1000,"images/icons1703/defaultImg.jpg");
						var title=$.commonMethods.editStringLength(result[i].title,15,"无标题");
						var collectDt=result[i].focusDate;
						$("#collect div").append('<dl data-docId="'+result[i].docid+'">'+
											'<dt><img src="'+avatar+'"/></dt>'+
											'<dd>'+
												'<p>'+title+'</p>'+
												'<small class="desc_text_color">收藏日期：'+collectDt+'</small>'+
											'</dd>'+
										'</dl>');
					};
					
					$("#collect div dl").on("click",function(){
						window.location.href="gs_doc_detail.html?id="+$(this).attr("data-docId");
					});
				
					
				});
			};
			
		});
	}else if(currentUrl.match("gs_stock.html")){
		
		//show different section by actionType
		var actionType=$.commonMethods.getQueryStr("actionType");
		
		switch(actionType){
			case "add_stock":
				$(".operate_stock").hide();
				$("#add_stock").show();
				$("title").text("自选股");
			break;
			case "focus_market":
				$(".operate_stock").hide();
				$("#focus_market").show();
				$("title").text("盯盘精灵");
			break;
			case "stock_news":
				$(".stock_list,.operate_stock").hide();
				$(".stock_news").show();
				$("title").text("个股资讯");
			break;
			default:
				$(".operate_stock").hide();
				$("title").text("自选股");
		};
		
		//redirect to add stocks
		$(".stock_list header dl dd[title=add_and_name] span,.stock_list>p input").on("click",function(){
			location.href=location.href="?actionType=add_stock";
		});
		
		//redirect to focus stocks
		/*
		$(".stock_list header dl dd[title=focus_and_delete] span").on("click",function(){
			location.href=location.href="?actionType=focus_market";
		});
		
		$(".stock_list div").on("click","dl dd[title=focus_and_delete] span",function(){
			var currentStockCode=$(this).parents("dl").attr("data-code").split(".")[0];
			location.href=location.href="?actionType=focus_market&currentStockCode="+currentStockCode;
		});
		*/
		
		getUserInfo(function(data){
			var custId=data.custId;
			
			switch(actionType){
				case "focus_market":
					var currentStockCode=$.commonMethods.getQueryStr("currentStockCode");
					if(currentStockCode!=null){
						$("input[name=add_focused_input]").val(currentStockCode);
						getFocusedStockInfo(custId);
					};
					
				break;
				case "stock_news":
					var currentStockCode=$.commonMethods.getQueryStr("currentStockCode");
					var stockNewsTitle=sessionStorage.getItem("stockNewsTitle");
					
					stockNewsTitle=JSON.parse(stockNewsTitle);
				
					$(".chosed_news ul li:nth-of-type(1) p").text(stockNewsTitle.stockName);
					$(".chosed_news ul li:nth-of-type(1) small").text(stockNewsTitle.stockCode);
					$(".chosed_news ul li:nth-of-type(2) p").text(stockNewsTitle.currentPrice);
					$(".chosed_news ul li:nth-of-type(3) p").text(stockNewsTitle.upDownValue);
					$(".chosed_news ul li:nth-of-type(4) p").text(stockNewsTitle.upDownPercent);
					console.log(stockNewsTitle.upDownPercent);
					if(!stockNewsTitle.upDownPercent.match("-")){
						$(".chosed_news ul").css({"background":"#fc3337"});
					};
					
					insertFrameOfJuYuan(currentStockCode.substr(0,6));
					//click to change tag
					$(".chosed_news dl dd").on("click",function(){
						var newsType=$(this).attr("title");
						$(".chosed_news dl dd").removeClass("focusedTag").addClass("noFocusedTag");
						$(this).removeClass("noFocusedTag").addClass("focusedTag");
						insertFrameOfJuYuan(currentStockCode.substr(0,6),newsType);
					});
				break;
				default:
					var szzz="000001.SH";
					var szcz="399001.SZ";
					var cybz="399006.SZ";
					
					getMarketInfo(szzz,"szzz");
					getMarketInfo(szcz,"szcz");
					getMarketInfo(cybz,"cybz");
					
					function getMarketInfo(code,title){
						getChosedStockInfo(code,function(data){
							var zdf=data.resList[0].ZDF;
							var marketValue=data.resList[0].HQZJCJ;
							var zdfDom="<span class=\"color_red\">+"+zdf+"%</span>";
							var marketValueDom="<span class=\"color_red\">"+marketValue+"</span>";
							if(zdf<0){
								zdfDom="<span class=\"color_green\">"+zdf+"%</span>";
								marketValueDom="<span class=\"color_green\">"+marketValue+"</span>";
							};
							$(".stock_market dl[title="+title+"] dt").html(marketValueDom);
							$(".stock_market dl[title="+title+"] dd span").html(zdfDom);
						});
					};
					
			};
			
			//get chosed_stock list
			getStockInfo("","myList",custId,"get_zxg_all",function(data){
				//console.log(data);

			if(data.errMsg){
				$(".chosed_stock ul,.chosed_news,.chosed_stock div").hide();
				$(".chosed_stock small").show().html('<p>'+data.errMsg+'</p>');
				$("#my_stock_list").hide();
				$(".stock_list>p").show();
			}else{
				$("#my_stock_list").show();
				console.log($(".stock_list header dl dd[title=add_and_name]").offset());
				if(data.length==0){
					$(".stock_list>p").show();
				};
				
				getStockInfo("","focus",custId,"get_khdy",function(result){
					
					//console.log(result);

					for( var i in data){
						$(".chosed_stock small").hide();
						$(".chosed_stock ul,.chosed_news,.chosed_stock div").show();
						$(".chosed_stock ul").append('<li class="noFocusedStock">'+data[i].zqdm+'</li>');

						getChosedStockInfo(data[i].zqdm,function(data){
							//console.log(data);
							if(data.errorNo==0){
								
								for(var i in data.resList){
									var zf=data.resList[i].ZF;
									var zfDom="<span class=\"color_red\">"+zf+"</span>";
									var zdf=data.resList[i].ZDF;
									var zdfDom="<span class=\"color_red\">"+zdf+"%</span>";
									if(zdf.toString().match("-")){
										zdfDom="<span class=\"color_green\">"+zdf+"%</span>";
										zfDom="<span class=\"color_green\">-"+zf+"</span>";
									};
									
									//判断此自选股是否已经添加到盯盘
									var isFocused='<img src="images/icons1703/focusDown.png"/>';
									var editFocusedDom='<ul>'+
															'<li><p>涨到(元)</p><input type="number" name="upTo"/></li>'+
															'<li><p>跌到(元)</p><input type="number" name="downTo"/></li>'+
															'<li><p>涨幅(%)</p><input type="number" name="upPercent"/></li>'+
															'<li><input type="button" name="add_focus_button" value="确定"/></li>'+
														'</ul>';
									for(var j in result){
										if(result[j].tmp_HQZQDM==data.resList[i].HQZQDM){
											isFocused='<img src="images/icons1703/focusedDown.png"/>';
											editFocusedDom='<ul>'+
															'<li><p>涨到(元)</p><input type="number" name="upTo" value="'+result[j].tmp_cgjg+'"/></li>'+
															'<li><p>跌到(元)</p><input type="number" name="downTo" value="'+result[j].tmp_dyjg+'"/></li>'+
															'<li><p>涨幅(%)</p><input type="number" name="upPercent" value="'+result[j].tmp_cgzdf+'"/></li>'+
															'<li><input type="button" name="add_focus_button" value="确定"/></li>'+
														'</ul>';
										};
									};
									
									$(".stock_list div").append('<dl data-code="'+data.resList[i].HQZQDM+'">'+
													'<dd title="add_and_name">'+
														'<p>'+data.resList[i].ZQMC+'</p>'+
														'<small>'+data.resList[i].HQZQDM+'</small>'+
													'</dd>'+
													'<dd title="current_price">'+data.resList[i].HQZJCJ+'</dd>'+
													'<dd title="up_down_value">'+zfDom+'</dd>'+
													'<dd title="up_down_precent">'+zdfDom+'</dd>'+
													'<dd title="focus_and_delete">'+isFocused+'<img src="images/icons1703/stockDel.png"/></dd>'+
												'</dl>'+editFocusedDom);
								};
							}else{
								alert(data.errorInfo);
							};
						});
						
						
						
					};
					
				});
				
				//show stock news
				$(".stock_list div").on("click","dl dd[title!=focus_and_delete]",function(){
					var currentStockCode=$(this).parent().attr("data-code");
					stockNewsTitle={
						stockCode:currentStockCode,
						stockName:$(this).parents("dl").find("dd[title=add_and_name] p").text(),
						currentPrice:$(this).parents("dl").find("dd[title=current_price]").text(),
						upDownValue:$(this).parents("dl").find("dd[title=up_down_value]").text(),
						upDownPercent:$(this).parents("dl").find("dd[title=up_down_precent]").text(),
					};
					stockNewsTitle=JSON.stringify(stockNewsTitle);
					sessionStorage.setItem("stockNewsTitle",stockNewsTitle);
					location.href="?actionType=stock_news&currentStockCode="+currentStockCode;
				});
				
				//click to delete
				$(".stock_list div").on("click","dl dd[title=focus_and_delete] img:last-of-type",function(){
					var stockCode=$(this).parents("dl").attr("data-code");
					$(this).parents("dl").attr({"data-status":"del"});
					delStockFocused(stockCode,function(data){
						console.log(data);
						if(data.errorNo==0){
							$.commonMethods.patchTip("删除成功");
							$(".stock_list div dl[data-status=del]").remove();
						}else{
							$.commonMethods.patchTip("删除失败");
						};
					});
					
				});
				
			};
		});
		
		setTimeout(function(){
			//localStorage.removeItem("layer_stock");
			//lead layer
			if(localStorage.getItem("layer_stock")==null){
				leadLayer({
					descImg:"images/icons1703/layer_stock_add.png",
					buttonImg:"images/icons1703/layer_know.png",
					patchObj:$(".stock_list header dl dd[title=add_and_name]"),
					lightObj:$(".stock_list header dl dd[title=add_and_name]"),
					patchRadius:"2px",
					revisePos:{top:0,left:-5},
					reviseSize:{width:0,height:0},
					descDirect:{vercial:"bottom",horizon:"left"},
					square:false,
					buttonTitle:"layer_stock_add",
				 });
				 $("img[title=layer_stock_add]").on("click",function(){
					 clearLayer($(".stock_list header dl dd[title=add_and_name] span"));
					 //add a example dom
					 $(".stock_list div").prepend('<dl title="example">'+
												'<dd title="add_and_name">'+
													'<p>白云机场</p>'+
													'<small>600234</small>'+
												'</dd>'+
												'<dd title="current_price">12.34</dd>'+
												'<dd title="up_down_value">-0.12</dd>'+
												'<dd title="up_down_precent">-0.23%</dd>'+
												'<dd title="focus_and_delete"><img class="focused_button" src="images/icons1703/focusDown.png"/><img src="images/icons1703/stockDel.png"/></dd>'+
											'</dl>');
					 leadLayer({
						descImg:"images/icons1703/layer_stock_focus.png",
						buttonImg:"images/icons1703/layer_know.png",
						patchObj:$(".stock_list div dl:first-of-type dd[title=focus_and_delete] img:first-of-type"),
						lightObj:$(".stock_list div dl:first-of-type dd[title=focus_and_delete] img:first-of-type"),
						patchRadius:"2px",
						revisePos:{top:0,left:-5},
						reviseSize:{width:0,height:0},
						descDirect:{vercial:"bottom",horizon:"right"},
						square:false,
						hideBg:true,
						buttonTitle:"layer_stock_focus",
					 });
					 
					 $("img[title=layer_stock_focus]").on("click",function(){
						 $(".stock_list div dl[title=example]").remove();
						 clearLayer($(".stock_list div dl:first-of-type dd[title=focus_and_delete] img:first-of-type"));
						 localStorage.setItem("layer_stock","showed");
					 });
					 
				 });
				 
				  
			};
		},100);
		
		
		
		//add stock
		$(".operate_stock").outerHeight(windowH);
		
		$("input[name=add_stock_submit]").on("click",function(){
			var stockCode=$("input[name=add_stock_input]").val();
			if(stockCode.length<=2){
				$.commonMethods.patchTip("请输入正确的查询条件");
				return false;
			};
			
			//	var custId=data.custId;
				getStockInfo(stockCode,"search",custId,"",function(data){
					console.log(data);
					if(data.errMsg){
						$.commonMethods.patchTip(data.errMsg);
					}else{
						//console.log(data);
						for(var i in data){
							
							//check focused history
							getStockInfo(data[i].code,"check",custId,"get_zxg_all",function(result){
								//console.log(result);
								if(result.checkRes=="false"){
									$("#add_stock>dl").after('<div class="search_stock">'+
													'<p>'+data[i].name+' <span>'+data[i].code+'</span></p>'+
													'<input type="button" name="add_stock_chosed" value="添加" data-code="'+data[i].code+'"/>'+
												'</div>');
								}else{
									$.commonMethods.patchTip("您已经添加过股票："+data[i].name);
								};
							});
							
							
						};
					};
					
					//click to add stock
					$("#add_stock").on("click","div input",function(){
						var stockCode=$(this).attr("data-code");
						setStockFocused(stockCode,function(data){
							if(data.errorNo==0){
								$.commonMethods.patchTip("添加成功");
								location.href=location.href.split("?")[0];
							}else{
								$.commonMethods.patchTip("添加失败");
							};
							console.log(data);
						});
					});
					
				});
			//});
			
		});
		
			
		//var custId=data.custId;
		$("input[name=add_focused_submit]").on("click",function(){
			getFocusedStockInfo(custId);
		});
			
		//focus the stock
		//自选股盯盘
		$(".stock_list div").on("click","dl dd[title=focus_and_delete] img:first-of-type",function(){
			
			var ulDom=$(this).parents("dl").next();
			var focusedStockCode=$(this).parents("dl").attr("data-code");
			if(ulDom.attr("isShow")=="Y"){
				ulDom.hide().attr({"isShow":"N"});
				var currentImg=$(this).attr("src");
				var newImg=currentImg.replace("Up.png","Down.png");
				$(this).attr({"src":newImg});
			}else{
				ulDom.show().attr({"isShow":"Y","data-code":focusedStockCode});
				ulDom.siblings("ul").attr({"isShow":"N"}).hide();
				var currentImg=$(this).attr("src");
				var newImg=currentImg.replace("Down.png","Up.png");
				$(this).attr({"src":newImg});
			};
			
		});
		
		//submit data
		$(".stock_list div").on("click","ul li input[name=add_focus_button]",function(){
			var focusedStockCode=$(this).parents("ul").attr("data-code").split(".")[0];
			var cgzdf=$(this).parents("ul").find("input[name=upPercent]").val();
			var cgjg=$(this).parents("ul").find("input[name=upTo]").val();
			var dyjg=$(this).parents("ul").find("input[name=downTo]").val();

			setFocusedData(focusedStockCode,cgzdf,cgjg,dyjg,"hide_edit_dom");
		});
		
		//盯盘精灵
		$("input[name=add_stock_focused]").on("click",function(){
			var focusedStockCode=$("input[name=add_focused_input]").val();
			var cgzdf=$("#add_focus input[name=change_precent]").val();
			var cgjg=$("#add_focus input[name=raise_to]").val();
			var dyjg=$("#add_focus input[name=fall_to]").val();
			
			setFocusedData(focusedStockCode,cgzdf,cgjg,dyjg,"focus_market");
		});
		
		function setFocusedData(focusedStockCode,cgzdf,cgjg,dyjg,domSet){
			
			if(cgzdf==""&&cgjg==""&&dyjg==""){
				$.commonMethods.patchTip("请至少设置一个盯盘条件");
				return false;
			};
			var dataObj={actionType:"add",
						cmd:"set_khdy",
						stockCode:focusedStockCode,
						custId:custId,
						cgzdf:cgzdf,	//涨跌幅
						cgjg:cgjg,		//涨到
						dyjg:dyjg,		//跌到
						};
			setStockChosed(dataObj,function(data){

				if(data.result=="success"){
					
					if(domSet=="focus_market"){
						getStockList();
						$.commonMethods.patchTip("添加成功");
					}else{
						hideEditDom(focusedStockCode);
						$("dl[data-code^="+focusedStockCode+"]").find("dd[title=focus_and_delete] img:first-of-type").attr({"src":"images/icons1703/focusedDown.png"})
						
						$.commonMethods.patchTip("盯盘成功");
					};
					
					
				}else{
					$.commonMethods.patchTip("添加盯盘失败");
				};
			});
		};
		
		//focused list
		getStockList();
			
		function getStockList(){
			getStockInfo("","focus",custId,"get_khdy",function(data){
				//console.log(data.length);
				if(data.errMsg){
					//$.commonMethods.patchTip(data.errMsg);
				}else{
					$("#focus_market>div,#focus_market>p").remove();
					for(var i in data){
						$("#focus_market").append('<div>'+
									'<p>'+data[i].tmp_ZQMC+' <span>'+data[i].tmp_HQZQDM+'</span></p>'+
									'<input type="button" name="edit_stock_focused" value="编辑" data-cgzdf="'+data[i].tmp_cgzdf+'" data-cgjg="'+data[i].tmp_cgjg+'" data-dyjg="'+data[i].tmp_dyjg+'" data-code="'+data[i].tmp_HQZQDM+'"/>'+
									'<input type="button" name="del_stock_focused" value="删除" data-code="'+data[i].tmp_HQZQDM+'"/>'+
								'</div>');
					};
					//add a placeholder at the bottom
					$("#focus_market").append("<p style=\"width:100%;float:left;height:4rem\"></p>");
				};
			});
		};
		
		function hideEditDom(focusedStockCode){
			$(".stock_list div ul[data-code^=\""+focusedStockCode+"\"]").hide();
			$(".stock_list div dl[data-code^=\""+focusedStockCode+"\"] dd[title=focus_and_delete] span").text("已盯").removeClass("no_focused_button").addClass("focused_button");
		};
		
		//click to modify
		$("#focus_market").on("click","div input[name=edit_stock_focused]",function(){
			var editStockCode=$(this).attr("data-code");
			var cgzdf=$(this).attr("data-cgzdf");
			var cgjg=$(this).attr("data-cgjg");
			var dyjg=$(this).attr("data-dyjg");
			$("#add_focus").hide();
			$("#modify_focus").show().css({"margin-bottom":"0.5rem"});
			$(this).parent().after($("#modify_focus").remove());
			$("#modify_focus input[name=raise_to]").val(cgjg);
			$("#modify_focus input[name=fall_to]").val(dyjg);
			$("#modify_focus input[name=change_precent]").val(cgzdf);
			$("#modify_focus input[name=mod_stock_focused]").attr({"data-code":editStockCode});
		});
			
		//click to delete
		$("#focus_market").on("click","div input[name=del_stock_focused]",function(){
			var delStockCode=$(this).attr("data-code");
			var dataObj={actionType:"del",
						cmd:"del_khdy",
						stockCode:delStockCode,
						custId:custId,
						};
			setStockChosed(dataObj,function(data){
				//console.log(data);
				if(data.result=="success"){
					$.commonMethods.patchTip("删除成功");
					getStockList();
				}else{
					$.commonMethods.patchTip("删除失败");
				};
			});
		});
			
		//edit the stock
		$("#focus_market").on("click","#modify_focus input[name=mod_stock_focused]",function(){
			var cgzdf=$("#modify_focus input[name=change_precent]").val();
			var cgjg=$("#modify_focus input[name=raise_to]").val();
			var dyjg=$("#modify_focus input[name=fall_to]").val();
			var editStockCode=$(this).attr("data-code");
			
			var dataObj={actionType:"mod",
						cmd:"set_khdy",
						stockCode:editStockCode,
						custId:custId,
						cgzdf:cgzdf,	//涨跌幅
						cgjg:cgjg,		//涨到
						dyjg:dyjg,		//跌到
						};
			setStockChosed(dataObj,function(data){
				if(data.result=="success"){
					$.commonMethods.patchTip("修改成功");
					$("#add_focus").show();
					$("#modify_focus").hide()
					getStockList();
				}else{
					$.commonMethods.patchTip("修改失败");
				};
			});
		});
		
			
	});
	}else if(currentUrl.match("gs_customer_data.html")){
		$("article,section.main_menu").hide();
		//login
		getUserInfo(function(data){
			shopkeeperLogin(data);
		});
		
	}else if(currentUrl.match("gs_qrcode.html")){
		
		getUserInfo(function(result){
			
			var dataObj={
				shopId:result.shopId,
				openId:result.openId,
				actionType:"getImg",
			};
			getQRCode(dataObj,function(data){
				console.log(data);
				var openAccountImg=data.openAccountImg;
				var goldshopImg=data.goldshopImg;
				$(".qr_image dl dd img").attr({"src":openAccountImg});
				
				$(".qr_navi dl dd").on("click",function(){
					var currentImg=$(this).attr("title");
					$(".qr_navi dl dd").removeClass("qr_navi_selected");
					$(this).addClass("qr_navi_selected");
					switch(currentImg){
						case "openAccountImg":
							$(".qr_image dl dd img").attr({"src":openAccountImg});
							
							$(".qr_tip dl dd:first-of-type").text("1. 通过二维码开户，系统自动绑定经纪关系");
							$(".qr_tip dl dd:nth-of-type(2)").text("2. 修改微信头像后，点击更新按钮可同步更新二维码");
							
						break;
						case "goldshopImg":
							$(".qr_image dl dd img").attr({"src":goldshopImg});
						
							$(".qr_tip dl dd:first-of-type").text("1. 通过扫描此二维码，可以进入您的金店店铺");
							$(".qr_tip dl dd:nth-of-type(2)").text("2. 修改微信头像后，点击更新按钮可同步更新二维码");
						
						break;
						case "officialImg":
							
							getShopkeeperInfo(result.shopId,function(shopkeeperInfo){
								
								shopkeeperInfo=JSON.parse(shopkeeperInfo);
								var officialDataObj={
										brokerNo:shopkeeperInfo.brokerNo,
										actionType:"official",
									};
									
								getQRCode(officialDataObj,function(data){
									console.log(data);
									if(data.result=="success"){
										$(".qr_image dl dd img").attr({"src":origin+"/tgzx/goldenshopqrcode/"+shopkeeperInfo.brokerNo+"_qrcode.png"});
										
										$(".qr_tip dl dd:first-of-type").text("1. 金元证券官方微信，扫描关注后推送积分注册地址");
										$(".qr_tip dl dd:nth-of-type(2)").text("2. 用户通过该二维码关注后，系统后台将标记推荐关系");
									};
								});
							});
							
							
						break;
					};
				});
				
				$(".qr_image dl dd input").on("click",function(){
					var refreshDataObj={
						shopId:dataObj.shopId,
						openId:dataObj.openId,
						actionType:"refresh",
						openAccountImg:openAccountImg,
						goldshopImg:goldshopImg,
					};
					
					getQRCode(refreshDataObj,function(data){
						console.log(data);
						if(data.result=="success"){
							location.reload();
						};
					});
					
				});
				
			});
			
			
			
		});
		
	}else if(currentUrl.match("gs_subscribe.html")){
		getUserInfo(function(userInfo){
			/*
			if(userInfo.isShopkeeper=="Y"){
				$(".to_bind_asset_account").show().find("input").on("click",function(){
					location.href="gs_bind_account.html";
				});
			};
			*/
			var dataObj={
				custId:userInfo.custId,
				actionType:"get_list",
			};
			getSubscribeList(dataObj,function(data){
				console.log(data);
				var imgName="";
				var actionType="";
				for(var i in data){
					if(data[i].dy=="true"){
						imgName='on.png';
						actionType="del_lmdy";
					}else{
						imgName='off.png';
						actionType="set_lmdy";
					};
					$(".subscribe_list").append('<div>'+
									'<dl>'+
										'<dt>'+data[i].LMMC+'</dt>'+
										'<dd>'+data[i].LMSM+'</dd>'+
									'</dl>'+
									'<img data-actionType="'+actionType+'" data-lmbh="'+data[i].LMBH+'" src="images/icons1703/'+imgName+'"/>'+
								'</div>');
				};
			});
			
			//subscribe
			$(".subscribe_list").on("click","div img",function(){
				var dataObj={
					custId:userInfo.custId,
					actionType:$(this).attr("data-actionType"),
					lmbh:$(this).attr("data-lmbh"),
				};
				
				getSubscribeList(dataObj,function(data,imgObj){
					if(data.result=="success"){
						var currentImg=imgObj.attr("src");
						var actionType="";
						var newImg="";
						if(currentImg.match("on.png")){
							newImg=currentImg.replace("on.png","off.png");
							actionType="set_lmdy";
						}else{
							newImg=currentImg.replace("off.png","on.png");
							actionType="del_lmdy";
						};
						imgObj.attr({"src":newImg,"data-actionType":actionType});
						
					}else{
						$.commonMethods.patchTip(data.result);
					};
				},$(this));
			});
			
			
		});
	}else if(currentUrl.match("gs_bind_account.html")){
		
		var userBondAcc="";
		var userPhone="";
		var userName="";
		
		//unbind
		bindStatus(function(account_number){
			//已绑定账户获得账户代码
			userBondAcc=account_number;
		});
		
		//bind status
		getUserInfo(function(data){
			
			//unbind
			$("input[name=unbind]").on("click",function(){
				unBindAccount(data.openId,userBondAcc);
			});
			
			//bind 
			$("input[name=bindAccount]").on("click",function(){
				setBindAccount(data.openId,userBondAcc);
				
			});
		});	
		
		//bind
		//1.validate ID number
		$("input[name=validateID]").on("click",function(){
			//test id :650103380701067
			//validate ID's fromat
			var IDNumber=$("input[name=IDNumber]").val();
			var IDCardPattern=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			if(!IDNumber.match(IDCardPattern)){
				//$("#tips").html("( err:请输入正确的身份证号码 )").css({"color":"#f15b3d"});
				//$("input[name=IDNumber]").val("").focus();
				//return false;
			};

			//validate ID's capital account
			validateID(IDNumber,function(dataObj){
				
				userName=dataObj[0].CLIENT_NAME;
				userPhone=dataObj[0].MOBILE_TEL;
				userBondAcc=dataObj[0].CLIENT_ID;
				var validateRes="";
				if(":"==userPhone||""==userPhone||userPhone.length!=11){
					validateRes="尊敬的客户，您好，您在我司柜台留存的手机号不正确，请联系我司工作人员修改";
					$("#tips").html("( "+validateRes+" )").css({"color":"#f15b3d"});
				}else{
					validateRes="尊敬的"+userName.substr(0,1)+"先生/女士: 您在我司柜台留存的手机尾号为"+userPhone.substr(7)
					 +"，确认请获取手机验证码，如果您现在使用的手机号码不同，可拨打客服热线 <a href='tel:4008888228'style='color:#248bd1'>4008888228</a>。";
					$("#tips").html("( "+validateRes+" )").css({"color":"#b0b0b0"});
				};	
				
				//show bind section and hide validate section
				$(".sendForm").hide();
				$(".bindForm").show();
			});
			
		});
		//send rand code
		$("input[name=sendCode]").on("click",function(){
			sendRandCode(userPhone);
		});
		//rebind
		$("input[name=rebind]").on("click",function(){
			$(".sendForm").show();
			$(".otherOperate,.bindForm").hide();
		});

		
	}else if(currentUrl.match("gs_asset.html")){
		
		var sixColors=["#faa72e","#f26b55","#fea35d","#2568b1","#5396fc","#93befe"];
		
		//asset info
		getBindCode({action:"getBasicAssetInfo"},function(data){
			$(".my_account div p[title=currency]").text(data[0].money_name);
			$(".my_account div small[title=account]").text("资金账户: "+data[0].fund_account);
			$(".my_account div h1[title=asset]").text(data[0].asset_balance);
			var dataObj={
				action:"getMoreAssetInfo",
				zjzh:data[0].fund_account,
				hbdm:data[0].money_type,
			};
			getBindCode(dataObj,function(data){
				$(".my_account>p span:first-of-type").text("证券市值: "+data[0].market_value);
				$(".my_account>p span:last-of-type").text("开放式基金: "+data[0].opfund_market_value);
				$(".my_account dl dd:first-of-type h3").text(data[0].current_balance);
				$(".my_account dl dd:last-of-type h3").text(data[0].enable_balance);			
			});
			
		});
		
		//deal
		getBindCode({action:"getBasicDealInfo"},function(dealData){
			
			if(dealData.result=="no-data"){
				$.commonMethods.patchTip("没有股票信息");
				$(".my_stock_query").hide();
				return false;
			};
			$(".my_stock_query").show();
			//stock info
			getBindCode({action:"getBasicStockInfo"},function(data){
				
				for(var i in data){
					
					var headerDom='<p>'+data[i].ZQMC+'<small>'+data[i].ZQDM+'</small></p>';
					var dealDom="";
					
					for(var j in dealData){
						if(dealData[j].stock_name==data[i].ZQMC){
							
							var initDate=dealData[j].init_date;
							initDate=initDate.substring(0,4)+"-"+initDate.substring(4,6)+"-"+initDate.substring(6)
							headerDom='<p>'+data[i].ZQMC+'<small>'+data[i].ZQDM+'</small></p>';
									//  '<img src="images/icons1703/dealDown.jpg"/>';
							dealDom='<p title="deal">'+
										'<b>数量:<span>'+dealData[j].business_amount+'</span></b>'+
										'<b>金额:<span>'+dealData[j].clear_balance+'</span></b>'+
										'<small>交割时间：<span>'+initDate+'</span></small>'+
									'</p>';
						};
					};
					
					var dataObj={
						action:"getMoreStockInfo",
						zjzh:data[i].fund_account,
						stockcode:data[i].ZQDM,
					};
					
					getBindCode(dataObj,function(result){
						//console.log(result);
						$(".my_stock_query").append('<div>'+
									'<header>'+headerDom+
									'</header>'+
									'<dl>'+
										'<dd><b style="background:'+sixColors[0]+'"></b>当前数量<span>'+result[0].current_amount+'</span></dd>'+
										'<dd><b style="background:'+sixColors[1]+'"></b>可用数量<span>'+result[0].enable_amount+'</span></dd>'+
										'<dd><b style="background:'+sixColors[2]+'"></b>证券市值<span>'+result[0].MARKET_VALUE+'</span></dd>'+
										'<dd><b style="background:'+sixColors[3]+'"></b>浮动盈亏<span>'+result[0].income_balance+'</span></dd>'+
										'<dd><b style="background:'+sixColors[4]+'"></b>盈亏比例<span>'+result[0].income_ratio+'%</span></dd>'+
										'<dd><b style="background:'+sixColors[5]+'"></b>成本价格<span>'+result[0].cost_price+'</span></dd>'+
									'</dl>'+dealDom+
								'</div>');
					});
					
				};
				
				

			});
		});
		
		//click to show delinfo
		/*
		$(".my_stock_query").on("click","div header img",function(){
			var showStatus=$(this).attr("data-showStatus");
			if(showStatus=="Y"){
				$(this).parents("div").find("p[title=deal]").hide();
				$(this).attr({"data-showStatus":"N","src":"images/icons1703/dealDown.jpg"})
			}else{
				$(this).attr({"data-showStatus":"Y","src":"images/icons1703/dealUp.jpg"});
				$(this).parents("div").find("p[title=deal]").show();
			};
			
		});
		*/
		
	}else if(currentUrl.match("gs_openaccount_data.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
			//console.log(data);
		});
	}else if(currentUrl.match("gs_marketing_report.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
		});
	}else if(currentUrl.match("gs_doc_manage.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
		});
	}else if(currentUrl.match("form.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
		});
	}else if(currentUrl.match("update.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
		});
	}else if(currentUrl.match("article.html")){
		getUserInfo(function(data){
			if(data.isShopkeeper=="N"){
				location.href="restrict.html"
			};
		});
	}else if(currentUrl.match("gs_juyuan.html")){
		
		var newsId=$.commonMethods.getQueryStr("newsId");
		var shareShopId=$.commonMethods.getQueryStr("shopId");
		
		//wx share
		getDocById(newsId,function(data){});
		
		
		getUserInfo(function(data){
	
			if(data.isShopkeeper=="N"){
				if(!shareShopId){
					$("#focus").hide();
				};
				
			}else{
				shareShopId=data.shopId;
			};
			
			$("#focus a").attr({"href":$("#focus a").eq(0).attr("href")+shareShopId});
			getShopkeeperInfo(shareShopId,function(shopkeeperInfo){
				var shopkeeperInfo=JSON.parse(shopkeeperInfo);
				if(shopkeeperInfo.shopDesc=="null"){
					shopkeeperInfo.shopDesc="欢迎来我的店铺转转"
				};
				$("#focus dl dt img").attr({"src":shopkeeperInfo.avatar});
				$("#focus dl dd").eq(0).find("p").text(shopkeeperInfo.shopName);
				$("#focus dl dd").eq(0).find("small").text(shopkeeperInfo.shopDesc);
				$("#focus dl dd").eq(1).find("small").html("<span>"+shopkeeperInfo.focusedCount+"</span>人关注");
				//console.log(shopkeeperInfo);
			});
			
			
			/*star*/
			getStar(data.openId,shareShopId);
			$("#star").on('click',function(){
				setStar(data.openId,shareShopId);
			});
			
			getAppId(currentUrl,function(WXInfo){
				//console.log(WXInfo);
				
				var shareData = {
					appID:WXInfo.appID, 
					timestamp:WXInfo.share_timestamp,
					nonceStr:WXInfo.share_nonceStr,
					signature:WXInfo.share_signature,
					img_url:itemRoot+"images/defaultImg.jpg",
					//img_width: "640",
					//img_height: "640",
					link:location.href+"&shopId="+shareShopId,
					desc:$(".review-des-author p").text(),
					title:$(".review-des-title p").text(),
				};
				
				setWXShare(shareData);
				
			});
			
		});

	}else if(currentUrl.match("gs_doc_detail.html") || currentUrl.match("new_docdetail.jsp")){
		
		var docId=$.commonMethods.getQueryStr("id");
		var shareShopId=$.commonMethods.getQueryStr("shopId");
		
		getDocDetail(docId,function(data){
			console.log(data);
			var folderId=data[0].folderId;
			var creater=data[0].creater;
			$(".review-des-title p").text(data[0].title);
			$(".review-des-author p:first-of-type").html(data[0].author+'<code class="author-time">'+data[0].createdate.substring(0,10)+'</code>');
			$(".review-des-author p:nth-of-type(2) span").text(data[0].accesstimes);
			if(data[0].showCoverPic=="1" && data[0].localImgUrl!="null" && data[0].localImgUrl!=null){
				$(".review-des-conten").append('<div class="media">'+
													'<img src="'+data[0].localImgUrl+'" />'+
												'</div>');
			};
			$(".review-des-conten").append(data[0].content);
			if(data[0].folderId==1002 && data[0].reservedChar=="PF"){
				$("#tips").show();
			};
			

			//shopkeeper's info
			getUserInfo(function(userInfo){
				
				$.ajax({
					type:"get",
					url:"gs_restrict.jsp",
					data:{
						folderId:folderId,
						openId:userInfo.openId,
					},
					dataType:"json",
					success:function(data){
						console.log(data);
						if(data.result=="match"){
							location.href="restrict.html";
						};
					},
					error:function(result){console.log(result)},
				});
				
				if(userInfo.isShopkeeper=="Y"){
					shareShopId=userInfo.shopId;
				}else{
					if(!shareShopId && creater){
						shareShopId=creater;
					};
				};
				
				if(shareShopId=="null" ||shareShopId=="" || shareShopId==null){
					shareShopId=0;
				};
				
				getAppId(currentUrl,function(WXInfo){
				
				if(data[0].imgUrl=="null"){
						data[0].imgUrl=itemRoot+"images/defaultImg.jpg";
					};
					
					var shareData = {
						appID:WXInfo.appID, 
						timestamp:WXInfo.share_timestamp,
						nonceStr:WXInfo.share_nonceStr,
						signature:WXInfo.share_signature,
						img_url:data[0].imgUrl,
						//img_width: "640",
						//img_height: "640",
						link:location.href+"&shopId="+shareShopId,
						desc:data[0].desc,
						title:data[0].title,
					};
					
					setWXShare(shareData);
					
				});
				
				//log
				var rndCode=$.commonMethods.getQueryStr("rndCode");
				setDocRecordLog(shareShopId,userInfo.openId,docId,rndCode);
				
				//collection
				
				 getFocus(userInfo.openId,docId);

				 $('#my-favour').on('click',function(){
					setFocus(userInfo.openId,docId,shareShopId);
				});
				
				if(shareShopId==0){
					$("#shopkeeper_info").hide();
				}else{
					getShopkeeperInfo(shareShopId,function(shopkeeperInfo){
						var shopkeeperInfo=JSON.parse(shopkeeperInfo);
						console.log(shopkeeperInfo);
						if(shopkeeperInfo.shopDesc=="null"){
							shopkeeperInfo.shopDesc="欢迎来我的店铺转转"
						};
						
						$("#owner-info dt img").attr({"src":shopkeeperInfo.avatar});
						$("#owner-info dd:first-of-type p").text(shopkeeperInfo.shopName);
						$("#owner-info dd:first-of-type small").text(shopkeeperInfo.shopDesc);
						$("#owner-info dd:last-of-type small").text(shopkeeperInfo.focusedCount+"人关注");
						$("#detail-navbar a").attr({"href":"tel:"+shopkeeperInfo.shopMobile});
						$("#reviewList div").attr({"data-tel":"tel:"+shopkeeperInfo.shopMobile});
					});
					
				};
				
				$("#shopkeeper_info dl dt,#shopkeeper_info dl dd:first-of-type,#shopkeeper_info>div").on("click",function(){
					location.href="gs_goldenshop.html?shopId="+shareShopId;
				});
				
				//focus
				getStar(userInfo.openId,shareShopId);
				$("#star").on('click',function(){
					setStar(userInfo.openId,shareShopId);
				});
				
				//set avatar's height

				var avater_w_2=$('#owner-info dt').width();
				$('#owner-info dt').height(avater_w_2);
				
				//set navi icon height
				setTimeout(function(){
					var home_w=$('#detail-navbar div').eq(1).width();
					$('#detail-navbar div').height(home_w);
					$('#detail-navbar div').eq(0).css({'line-height':home_w+'px'});
				},100);
				
				
				//comment list
				reviewList(docId,userInfo.openId);
				
				$('#send-comment').css('color','gray').on('click',function(){
					var content=$("#comment-content").val();
					if(!content){
						$.commonMethods.patchTip('好像还没输入评论内容哦，说点什么吧。');
						$('#send-comment').css('color','gray');
						return false;
					}else if(content.length>200){
						$.commonMethods.patchTip('评论最长支持200个汉字或400个字符哦。');
						$('#send-comment').css('color','gray');
						return false;
					};
					
					commentSubmit(docId,content,data.openId,shareShopId);

				});

			});
		
		});
		
		$('#back-index').on('click',function(){
			location.href='index.html';
		});
		
		
		$('.review-des-conten img').on('click',function(e){
		
			var photos=new Object;
			for(var i=0;i<$('.review-des-conten img').length;i++){
				photos[i]=$('.review-des-conten img').eq(i).attr("src");
			};
			photosJson=JSON.stringify(photos);
			sessionStorage.setItem("photos",photosJson)
			console.log(sessionStorage.getItem("photos"));
			location.href="new_photo.html?src="+$(this).attr("src");
		});
		
		var window_h=$(window).height();
		$('.comment-form').height(window_h);
		
		$('.comment-form').eq(0).hide();
		$('#detail-navbar div').eq(0).on({
			'click':function(){
				$('.comment-form').eq(0).show();
				$('#comment-content').focus();
			},
		});
		$('.comment-div dl dd').eq(0).on({
			'click':function(){
				$('.comment-form').eq(0).hide();
			},
		});
		
		
			
		$('#comment-content').on('focus',function(){
			$('#send-comment').css('color','black');
			$('.comment-div').css('position','static').css('margin-top','5em');
			$('.comment-form').css('background','#efefef');
		});
		
		$('#comment-content').on('blur',function(){
			setTimeout(function(){
					$('.comment-div').css('position','fixed');
			$('.comment-form').css('background','rgba(0,0,0,0.8)');
			},100);
		
		});
		
		$('.comment-title').on('click',function(){
			if($(".comment-list").length!=0){
			//	location.href='new_comment_list.jsp?shopID='+shareShopId+'&id='+docId+'&tel='+$(this).attr('data-tel');
			};
		});
		$('.comment-title small').on('click',function(e){
			e.stopPropagation();
		});
		
		
		//tips
		$("#tips").height(window_h);
		$("#sure").on("click",function(){
			$("#tips").remove();
		});
		//img screen
		$("#lock_screen").height(window_h);
		$(".review-des-conten img").not(".last-child").not("#recordVisitHis img").on("click",function(){
			var img_h=$(this).height();
			$("#lock_screen img").attr("src",$(this).attr("src"));
			var top_h=(window_h-img_h)/2; 
			if(top_h>0){
				$("#lock_screen img").css("top",top_h+"px");
			}else{
				$("#lock_screen img").css("top","5px");
			};
			$("#lock_screen").css("display","block");
		});
		$("#lock_screen").on("click",function(){
			$(this).css("display","none");
		});
		
		//heart
		//$(".icon-hand-1").css("background","url(../images/icon-hand.png) no-repeat");
		$("#jsClickPraise").on("click",function(){
			$(this).find("i").toggleClass("icon-hand-1 icon-hand");
		});
		$("#jsClickFocus").on("click",function(){
			$(this).find("i").toggleClass("icon-favor icon-favor-red");
		});
		
	};

});	
	
//checkUser
function checkUser(fromUrl,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.checkUser,
		dataType:"text",
		data:{
			fromUrl:fromUrl,
		},
		success:function(data){
			data=JSON.parse(data);
			//console.log(data);
			if(data.result=="success"){
				callback(data);
			}else{
				window.location.href=data.redirectUri;
				//window.location.replace(data.redirectUri);
			};
			
		},
		error:function(result){
			console.log(result);
		},
	});
};

//shopkeeperLogin
function shopkeeperLogin(userInfo){
	
	if(userInfo.isShopkeeper=="Y"){
	
		//$.commonMethods.delCookie("savePwd");
		
		//判断是否保存密码
		if($.commonMethods.getCookie("savePwd")=="Y"){
			$("article#volume_article,section.main_menu").show();
			$(".shopkeeper_login").hide();
			return false;
		};
		//[shopkeeper]check if users need to login
		$(".shopkeeper_login").show().height(windowH);
		var loginH=$(".shopkeeper_login dl").height();
		$(".shopkeeper_login dl").css({"margin-top":(windowH/2-loginH)/2+"px"});
		$(".shopkeeper_login dl input[type=password]").focus();
		
		//click to validate pwd
		$(".shopkeeper_login dl input[type=button]").on("click",function(){
			var pwd=$(".shopkeeper_login dl input[type=password]").val();
			var saveStatus=$(".shopkeeper_login dl input[name=savePwd]:checked").val();
			
			if(pwd.length<3){
				$.commonMethods.patchTip("密码不正确");	
				$(".shopkeeper_login dl input[type=password]").val("").focus();
				return false;
			};
			getWXInfo(userInfo.encryptOpenId,function(result){
			
				var custId=result.result.cust_id;
				loginAndChangePwd(pwd,custId,"login",function(data){
					data=JSON.parse(data);
					if(data.result=="success"){
						$("article#volume_article,section.main_menu").show();
						$(".shopkeeper_login").hide();
						if(saveStatus=="Y"){
							$.commonMethods.setCookie({
								name:"savePwd",
								value:"Y",
								expires:7,
							});
						};
					}else{
						$.commonMethods.patchTip("密码错误！");
						$(".shopkeeper_login dl input[type=password]").val("").focus();
					};
				});
				
			});
			
		});
		
		
	}else{
		$("article#volume_article,section.main_menu").show();
	};
};

//methods
function getUserInfo(callback){
	$.ajax({
		type:"get",
		async:true,
		url:goldenShopApi.getUserInfo,
		data:{
			//shopId:6,
		},
		dataType:"text",
		success:function(data){
			//console.log(data);
			var data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};



//get doc list by forlderId
function getDocListByFolderId(pageNo,pageSize,folderID,clearDom,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getDocListByFolderId,
		dataType:"json",
		data:{
			"pageNo":pageNo, 
			"pageSize":pageSize,
			"folderID":folderID,
			
		},
		success:function(data){
			//console.log(data);
			insertFolderListToDom(data,clearDom,callback);
		},
		error:function(result){
			console.log(result);
		},
	});
};

function insertFolderListToDom(data,clearDom,callback){
	
	if(!data||data.length==0){
		if($("#category_news_list>p").length==0){
			$("#category_news_list").append("<p class=\"tip_text_color get_more_button\">没有更多了</p>");
		};
		return false;
	};
	
	if(clearDom==true){
		$("#category_news_list").empty();
	};

	if(data[0].Media){
		
		$("#category_news_list").empty();
		
		for(var name in data){
			var headline=$.commonMethods.editStringLength(data[name].InfoTitle,18,"没有标题哦");;
			var description=$.commonMethods.editStringLength(data[name].Media,32,"");
			var docId=data[name].ID;
			var releaseDt=data[name].date2+" "+data[name].time;
			
			$("#category_news_list_JuYuan").append('<dl data-id="'+docId+'">'+
												
												'<dd>'+
													'<h1>'+headline+'</h1>'+
													'<p class="desc_text_color">'+description+'</p>'+
													'<p class="desc_text_color">'+releaseDt+'</p>'+
												'</dd>'+
											'</dl>');
		};
		
		$("#category_news_list_JuYuan dl").on("click",function(){
			window.location.href=itemRoot+"gs_juyuan.html?newsId="+$(this).attr("data-id");
		});
		
	}else{
		
		$("#category_news_list_JuYuan").empty();
		
		for(var name in data){
			var headline=$.commonMethods.editStringLength(data[name].title,13,"没有标题哦");;
			var description=$.commonMethods.editStringLength(data[name].descr,32,"");
			var articleImg=$.commonMethods.editStringLength(data[name].localImgURL,10000,"images/defaultImg.jpg");
			var docId=data[name].id;
			
			$("#category_news_list").append('<dl data-id="'+docId+'">'+
												'<dt><img src="'+articleImg+'"/></dt>'+
												'<dd>'+
													'<h1>'+headline+'</h1>'+
													'<p class="desc_text_color">'+description+'</p>'+
												'</dd>'+
											'</dl>');
		};
		
		//set the news' list's images' parents' height
		var imgParentH=$(".news_list dl dd").height();
		$(".news_list dl dt").height(imgParentH);
		
		$.commonMethods.putImageCenter2($(".news_list dl dt img"));
		
		$("#category_news_list dl").on("click",function(){
			window.location.href=itemRoot+"gs_doc_detail.html?id="+$(this).attr("data-id");
		});
	};
	
	if(sessionStorage.getItem("currentScrollHeight")){
		$(document).scrollTop(sessionStorage.getItem("currentScrollHeight"));
	};
	
	if(callback){
		callback();
	};
	
};

//scroll to get more
function scrollNextPage(pageNo,pageSize,folderID){
	
	var clearDom=false;
	var appendEnd=true;

	//getList(pageNo,pageSize,folderID,clearDom);
	//console.log("getList"+folderID);

	$(document).on("scroll",function(){
		var callback=function(){appendEnd=true;};
		var listSectionTop=$("#category_news_list").offset().top;
		var listSectionH=$("#category_news_list").outerHeight(true,true);
		var windowH=$(window).height();
		var scrollTop=$(document).scrollTop();
		console.log("scroll"+folderID);
		if(listSectionTop+listSectionH<=windowH+scrollTop){
			if(appendEnd==true){
				appendEnd=false;
				pageNo++;
				if(folderID==8888){
					getJuYuanDocList(pageNo,pageSize,folderID,clearDom,callback);
				}else{
					getDocListByFolderId(pageNo,pageSize,folderID,clearDom,callback);
				};
				
			};
		
		};
	});
};

/*include navbar*/
function includeBottomMenu(){
	$.ajax({
		type:"get",
		url:goldenShopApi.getBottomMenu,
		dataType:"html",
		success:function(data){
			$("body").append(data);
			var menuJqueryObj=$(".bottom_menu dl");
			
			getUserInfo(function(data){
				var menuUrl={
					index:itemRoot+"index.html",
					gs_stock:itemRoot+"gs_stock.html",
					gs_news:itemRoot+"gs_news.html",
					gs_financing:"../wx/mg/funds/gs_financing.html?openId="+data.openId,
					gs_mine:itemRoot+"gs_mine.html",
				};
			
				menuJqueryObj.each(function(){
					//replace relative path to abosulte path
					var relativeImgUrl=$(this).find("dt img").attr("data-img");
					$(this).find("dt img").attr("src",itemRoot+relativeImgUrl);
				
					if(location.href.match($(this).attr("title"))){
						var firstIcon=$(this).find("dt img").attr("src");
						firstIcon=firstIcon.replace("Blank","Filling");
						$(this).find("dt img").attr({"src":firstIcon});
						$(this).find("dd").css({"color":"#ff542c"});
					};
				});
				
				menuJqueryObj.on("click",function(){
					window.location.href=menuUrl[$(this).attr("title")];
				});
				
			});
			
			
			
		},
		error:function(result){
			console.log(data);
		},
	});
};

/*get user's avatar*/
function getWXInfo(openId,callback){
	$.ajax({
		type:"GET",
		url:goldenShopApi.getWXInfo,
		data:{
			'openID' :openId,
		},
		dataType:"JSON",
		success:function(data){
			callback(data);
			
		},
		error:function(result){
			$.commonMethods.patchTip(result.status);
		},
	});
};


//get shopkeeper's collection
function getCollectNews(shopId,pageNo,pageSize,clearDom,callback){
	$.ajax({
		type:"get",
		async:true,
		url:goldenShopApi.getCollectNews,
		data:{
			shopId:shopId,
			pageNum:pageNo,
			pageSize:pageSize,
		},
		dataType:"json",
		success:function(data){
			insertNewsCollectionToDom(data,clearDom,function(){
				$("#news_collection dl").on("click",function(){
					location.href="gs_doc_detail.html?id="+$(this).attr("data-id");
				});
			});
			
			if(callback){
				callback();
			};
			
		},
		error:function(result){
			console.log(result);
		},
	});
};

function insertNewsCollectionToDom(data,clearDom,callback){
	
	if(!data||data.length==0){
		$("#news_collection>p").text("没有更多了");
		return false;
	};
	
	if(clearDom==true){
		$("#category_news_list").empty();
	};
	
	for(var name in data){
		var headline=$.commonMethods.editStringLength(data[name].title,13,"没有标题哦");;
		var description=$.commonMethods.editStringLength(data[name].descr,32,"");
		var articleImg=$.commonMethods.editStringLength(data[name].imgURL,10000,"images/defaultImg.jpg");
	
		$("#news_collection>p").before('<dl data-id="'+data[name].id+'">'+
											'<dt><img src="'+articleImg+'"/></dt>'+
											'<dd>'+
												'<h1>'+headline+'</h1>'+
												'<p class="desc_text_color">'+description+'</p>'+
											'</dd>'+
										'</dl>');
	};
	
	//set the news' list's images' parents' height
	var imgParentH=$(".news_list dl dd").height();
	$(".news_list>dl dt").height(imgParentH);
	
	$.commonMethods.putImageCenter2($(".news_list>dl dt img"));
	
	if(callback){
		callback();
	};
	
};


//get goldenChart list (10)	folderId=1019 热点
function getGoldenChartList(pageSize,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getDocListByFolderId,
		dataType:"json",
		data:{
			"pageNo":1, 
			"pageSize":pageSize,
			"folderID":1019,
			"title":"",
		},
		success:function(data){
			//console.log(data);
			insertGoldenChartListToDom(data,callback);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

function insertGoldenChartListToDom(data,callback){
	//console.log(data);
	for( i in data){
		var title=$.commonMethods.editStringLength(data[i].title,12,"没有标题哦");
		var description=$.commonMethods.editStringLength(data[i].descr,36,"点击查看详情");
		$(".golden_chart dl").append('<dd data-id="'+data[i].id+'">'+
										'<p>'+title+'</p>'+
										'<small>'+description+'</small>'+
									'</dd>');
	};
	callback();
	
	//click to docDetail.html
	$(".golden_chart dl dd").on("click",function(){
		location.href=itemRoot+"gs_doc_detail.html?id="+$(this).attr("data-id");
	});
	
	$(".golden_chart h1 small").on("click",function(){
		location.href=itemRoot+"gs_news.html?folderId=1019";
	});
	
};


//verticleTrundle

function verticleTrundle(moveJuqeryObj){
	//initail elements position
	var index=0;
	var secondIndex=index+1;
	var nextIndex=index+2;
	var nextSecondIndex=index+3;
	var maxIndex=moveJuqeryObj.length-1;
	//var prevIndex=maxIndex;
	var elementH=moveJuqeryObj.eq(0).height();
	//console.log(elementH);
	
	moveJuqeryObj.css({"top":-elementH});
	moveJuqeryObj.eq(index).css({"top":elementH*index});
	moveJuqeryObj.eq(secondIndex).css({"top":elementH*secondIndex});
	moveJuqeryObj.eq(nextIndex).css({"top":elementH*nextIndex});
	moveJuqeryObj.eq(nextSecondIndex).css({"top":elementH*nextSecondIndex});
	//moveJuqeryObj.eq(prevIndex).css({"top":-elementH});
	
	setInterval(function(){
		
		moveJuqeryObj.eq(index).css({"top":0});
		moveJuqeryObj.eq(secondIndex).css({"top":elementH});
		moveJuqeryObj.eq(nextIndex).css({"top":elementH*2});
		moveJuqeryObj.eq(nextSecondIndex).css({"top":elementH*3});
		
		
		moveJuqeryObj.eq(index).animate({"top":-elementH*2});
		moveJuqeryObj.eq(secondIndex).animate({"top":-elementH});
		moveJuqeryObj.eq(nextIndex).animate({"top":0});
		moveJuqeryObj.eq(nextSecondIndex).animate({"top":elementH});
		
		index=index+2;
		secondIndex=secondIndex+2;
		nextIndex=nextIndex+2;
		nextSecondIndex=nextSecondIndex+2;
		
		if(index>maxIndex){
			index=0;
			secondIndex=1;
		};
		if(nextIndex>maxIndex){
			nextIndex=0;
			nextSecondIndex=1;
		};
		
	},2000);
	
};


//focus
function getFocusStatus(openId,shopId,callback){
	$.ajax({
		async : true,
		type : "get",
		url :goldenShopApi.getFocusStatus,
		data : {"openId": openId, "refId": shopId, "actType": "F"},
		dataType: "json",
		success : function(data) {
			callback(data);
		},
		error: function(result){
			console.log('error: '+result.status+"-"+result.statusText);
		},
	});
}

function setFocusStatus(openId,shopId,callback){
	$.ajax({
		async:true,
		type:"post",
		url:goldenShopApi.setFocusStatus,
		data:{
			  "openid":openId, 
			  "refObject":shopId, 
			  "actType":"F"
		},
		dataType: "json",
		success:function(data) {
			callback(data);
		},
		error: function(result){
			console.log(result);
		},
	});
};

//get collcetion products

function getCollectProducts(shopId,pageNo,pageSize,openId){
	
	$.ajax({
		type:"get",
		async:true,
		url:goldenShopApi.getCollectProducts,
		data:{
			shopId:shopId,
			pageNum:pageNo,
			pageSize:pageSize,
		},
		dataType:"json",
		success:function(data){
			console.log(data);
			insertCollectProductsToDom(data,openId);	
		},
		error:function(result){
			console.log(result);
		},
	});
};

function insertCollectProductsToDom(data,openId){
	
	if(data==null||data==""){
		$('#products_collection>p').text('没有更多了');
		return false;
	};
	for(var key in data){

		//production Code
		data[key]['productCode']=data[key]['productCode'].substr(0,6);
		
		//knit html elements
		if(data[key]['productType']=='ZQNHG'){
			
			var insertElement='<div class="fund_detail to_market" data-docid="'+data[key]['productId']+'">'+
										'<dl class="fund_bond">'+
											'<dt class="diff_color2">'+data[key]['returnRate']+'%</dt>'+
											'<dd>'+data[key]['returnRateType']+'</dd>'+
										'</dl>'+
										'<dl class="fund_bond">'+
											'<dt>'+data[key]['productCode']+'</dt>'+
											'<dd>'+data[key]['productName']+'</dd>'+
										'</dl>'+
										'<dl class="fund_bond">'+
											'<dt>'+data[key]['retention']+'</dt>'+
											'<dd>期限(天)</dd>'+
										'</dl>'+
									'</div>';
			$('.fund_kind').append(insertElement);
		}else{
			getFundDataFromJuYuan(data[key]['productCode'],data[key],function(nvData,manualData){
				//label split
				var allLabels=manualData['label'];
				if(!allLabels){
					allLabels='收益稳定-低风险-随买随卖';
				};
				var labelArray=allLabels.split('-');
				var labelElement='';
				for(var i in labelArray){
					labelElement+='<span>'+labelArray[i]+'</span>';
				};
				
				var RRType="";
				var RRValue=0;
				
				var RRValueObj=nvData.jjqjhb[0];
				var netValueData=nvData.jjjzzs[0];
				var nvDt=netValueData.MaxEndDate;
				
				switch (manualData['returnRateType']){
					case "RRInSingleYear":
						RRType="近一年收益率";
						RRValue=RRValueObj.RRInSingleYear;
					break;
					case "RRInSixMonth":
						RRType="近六月收益率";
						RRValue=RRValueObj.RRInSixMonth;
					break;
					case "RRInSingleMonth":
						RRType="近一月收益率";
						RRValue=RRValueObj.RRInSingleMonth;
					break;
					case "RRSinceStart":
						RRType="成立以来收益率";
						RRValue=RRValueObj.RRSinceStart;
					break;
					default:
						RRType="成立以来收益率";
						RRValue=RRValueObj.RRSinceStart;
				};
				
				if(RRValue.length>5){
					RRValue="<span style=\"font-size:1.8rem\">"+RRValue+"%</span>";
				}else{
					RRValue="<span style=\"font-size:2rem\">"+RRValue+"%</span>";;
				};
				
				var detail_url='../wx/mg/funds/production.html?openId='+openId+'&productCode='+manualData['productCode']+'&id='+manualData['productId'];
				var insertElement='<a href="'+detail_url+'">'+
											'<div class="fund_detail" data-docid="'+data[key]['productId']+'">'+
												'<dl class="fund_rate">'+
													'<dt class="diff_color2">'+RRValue+'</dt>'+
													'<dd>'+RRType+'</dd>'+
												'</dl>'+
												'<dl class="fund_name">'+
													'<dt>'+manualData['productName']+'</dt>'+
													'<dd class="fund_feature">'+labelElement+'</dd>'+
													'<dd class="fund_buy">'+manualData['lowestAmount']+'元起购，费率：<span>'+manualData['rateDiscount']+'折</span></dd>'+
												'</dl>'+
												'<div class="glass" data-status="'+manualData['status']+'"></div>'+
											'</div>'+
										'</a>';
				
				$('.fund_kind').append(insertElement);
							
			});
			
		};
	};		
};

//get shopkeeper info
function getShopkeeperInfo(shopId,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getShopkeeperInfo,
		dataType:"text",
		data:{
			shopId:shopId,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get index's list
function getIndexDocList(shopId,pageNo,pageSize,callback){
		
	$.ajax({
		type:"get",
		async:true,
		url:goldenShopApi.getIndexDocList,
		data:{
			"shopID":shopId,
			"pageNum":pageNo,
			"pageSizeNum":pageSize,
		},
		dataType:"json",
		success:function(result){
			//console.log(result);
			var resultObj=result.results;
			
			if(resultObj==null||resultObj==""){
				$(".news_list>p").text("没有更多了");
			};
			
			for(name in resultObj){
				
				var headline=$.commonMethods.editStringLength(resultObj[name].shopname,15,"没有标题哦");;
				var description=$.commonMethods.editStringLength(resultObj[name].shopDesc,32,"");;
				var articleImg=$.commonMethods.editStringLength(resultObj[name].headimgurl,1000,"images/defaultImg.jpg");
				var articleId=resultObj[name].shopid;
				
				$(".news_list>p").before('<dl data-id="'+articleId+'">'+
											'<dt><img src="'+articleImg+'"/></dt>'+
											'<dd>'+
												'<h1>'+headline+'</h1>'+
												'<p class="desc_text_color">'+description+'</p>'+
											'</dd>'+
										'</dl>');
				
			};
			
			//set the news' list's images' parents' height
			var windowW=$(window).width();
		
			var imgParentH=$(".news_list>dl dd").eq(0).height();
			
			$(".news_list dl dt").height(imgParentH);
			
			$.commonMethods.putImageCenter2($(".news_list dl dt img"));
			
			$(".news_list dl").on("click",function(){
				window.location.href=itemRoot+"gs_doc_detail.html?id="+$(this).attr("data-id");
			});
			
			if(callback){
				callback();
			};
			
		},
		error:function(result){
			console.log(result);
		}
	});
};
		
//getMyFocusShop
function getMyFocusShop(pageNo,pageSize,openId,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getMyFocusShop,
		dataType:"json",
		data:{
			fromPage:pageNo,
			pageSize:pageSize,
			openid:openId,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getMyCollectDoc
function getMyCollectDoc(pageNo,pageSize,openId,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getMyCollectDoc,
		dataType:"json",
		data:{
			fromPage:pageNo,
			pageSize:pageSize,
			openid:openId,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//loginAndChangePwd
function loginAndChangePwd(password,custId,actionType,callback){
	$.ajax({
		type:"post",
		url:goldenShopApi.loginAndChangePwd,
		dataType:"text",
		data:{
			password:password,
			custId:custId,
			actionType:actionType,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get chosed_stock list
function getChosedStocksList(custId,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getChosedStocksList,
		dataType:"text",
		data:{
			custId:custId,
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get stock infor by stockcode
function getChosedStockInfo(stockcode,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getChosedStockInfo,
		dataType:"text",
		data:{
			cmd:"get_zqxx",
			stockcode:stockcode,
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get frame of juyuan
function insertFrameOfJuYuan(stockCode,newsType){
				
	var frameSrc="";
	var frameHeight=0;
	var pageName="";
	var myIframe="";
	
	switch(newsType){
		case "stock_news":	//个股新闻
			pageName="news.html";
			frameHeight=900;
		break;
		case "stock_notice":	//个股公告
			pageName="gonggao.html";
			frameHeight=900;
		break;
		case "stock_diagnose":	//个股诊断
			pageName="secudiagnosis.html";
			frameHeight=2200;
		break;
		case "stock_f10":	//f10
			pageName="f10.html";
			frameHeight=2200;
		break;
		default:
			pageName="news.html";
			frameHeight=900;
	};
	
	frameSrc='http://120.27.166.179/mobileF10View/'+pageName+'?s='+stockCode+'&p=HSJY_1009&u=abc123&t=orange&v=1.0&n=getDate()&h=0';
	myIframe='<iframe style="height:'+frameHeight+'px;" src="'+frameSrc+'"></iframe>';
	
	$("#include_frame").empty();
	$("#include_frame").append(myIframe);
};

//get stock info
function getStockInfo(stockCode,actionType,custId,cmd,callback){
	$.ajax({
		type:"post",
		url:goldenShopApi.getStockInfo,
		dataType:"text",
		data:{
			stockCode:stockCode,
			actionType:actionType,
			custId:custId,
			cmd:cmd,
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//setStockFocused
function setStockFocused(stockCode,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.setStockFocused,
		dataType:"text",
		data:{
			cmd:"set_zxg",
			stockcode:stockCode,
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//delStockFocused
function delStockFocused(stockCode,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.setStockFocused,
		dataType:"text",
		data:{
			cmd:"del_zxg",
			stockcode:stockCode,
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

function setStockChosed(dataObj,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.setStockChosed,
		dataType:"text",
		data:dataObj,
		/*data:{
			cmd:"set_khdy",
			stockcode:stockCode,
			custId:custId,
			cgzdf:cgzdf,	//涨跌幅
			cgjg:cgjg,		//涨到
			dyjg:dyjg,		//跌到
		},*/
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getBindCode
function getBindCode(data,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getBindCode,
		dataType:"text",
		data:data,
		success:function(data){
			if(data==null||data==""){
				data={result:"no-data"};
			}else{
				data=JSON.parse(data);
			};
			
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//trundle images
function getIndexTrundleImages(callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getIndexTrundleImages,
		dataType:"text",
		data:{
		},
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getTrundleImages
function getTrundleImages(callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getTrundleImages,
		dataType:"json",
		data:{
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getQRCode
function getQRCode(dataObj,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getQRCode,
		dataType:"text",
		data:dataObj,
		/*data:{
			shopId:shopId,
			openId:openId,
			actionType:actionType,
		},*/
		success:function(data){
			data=JSON.parse(data);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getJuYuanDocList
function getJuYuanDocList(pageNo,pageSize,folderID,clearDom,callback){
	
	$.ajax({
		type:"get",
		url:goldenShopApi.getJuYuanDocList+pageNo,
		dataType:"json",
		data:{},
		success:function(data){
			//console.log(data.News);
			insertFolderListToDom(data.News,clearDom,callback);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//getFocusedStockInfo
function getFocusedStockInfo(custId){
	var stockCode=$("input[name=add_focused_input]").val();
	if(!stockCode.match(/[0-9]{6}/)){
		$.commonMethods.patchTip("请输入正确的查询条件");
		return false;
	};
	$("#add_focus").show();
	$("#modify_focus").hide();
	getStockInfo(stockCode,"search",custId,"",function(data){
		
		var focusedStockCode=stockCode;
		
		if(data.errMsg){
			$.commonMethods.patchTip(data.errMsg);
		}else{
			//get stock's info
			getChosedStockInfo(data[0].code,function(result){
				if(result.errorNo!=0){
					$("#focus_market dl dd p").text(result.errorInfo);
				}else{
					$("#focus_market dl dd p").parent().remove();
					$("#focus_market dl").append("<dd><p>"+result.resList[0].ZQMC+'&nbsp;&nbsp;&nbsp;&nbsp;现价 : <span>'+result.resList[0].HQZJCJ+'</span>&nbsp;&nbsp;&nbsp;涨跌 : <span>'+result.resList[0].ZDF+'</span></p></dd>');
					//console.log(data);
				};
			});
			
			
		};
	});
};

//getSubscribeList
function getSubscribeList(data,callback,imgObj){
	$.ajax({
		type:"get",
		url:goldenShopApi.getSubscribeList,
		dataType:"json",
		data:data,
		success:function(data){
			//var data=JSON.parse(data);
			if(imgObj){
				callback(data,imgObj);
			}else{
				callback(data);
			};
			
		},
		error:function(result){
			console.log(result);
		},
	});
};
/*
//bind account
function bindAccount(idNumber,checkCode,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.setAccountBind,
		dataType:"text",
		data: {
				cmd:"GetUserInfoByIdCard",
				acc_type:"X",
				id_no:idNumber,
				yzm:checkCode,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};
*/
//setLog
function setLog(fileName,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.setLog,
		dataType:"json",
		data: {
				fileName:fileName,
		},
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get appid
function getAppId(currentUrl,callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getAppId,
		data:{
			currentUrl:currentUrl,
		},
		dataType:"json",
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get points
function getGoldenCoins(callback){
	$.ajax({
		type:"get",
		url:goldenShopApi.getGameUserByUserId,
		data:{},
		dataType:"json",
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get search list
function getSearchList(keywords,callback){
	
	$.ajax({
		type:"get",
		url:goldenShopApi.getDocListByFolderId,
		data:{
			folderID:"1019,1022,1028",
			title:keywords
		},
		dataType:"json",
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//get juyuan doc
function getDocById(newsId,callback){
	var docUrl=goldenShopApi.docArticle.replace("newsId",newsId);
	$.ajax({
		type:"get",
		url:docUrl,
		dataType:"json",
		data:{
			//newsId:newsId,
		},
		success:function(data){
			var initialContent=data.Content;
			//replace \s to <br/>
			var trueContent=initialContent.replace(/\s/g,"<br/>");
			//relapce multi <br/> to single <br/>
			trueContent=trueContent.replace(/(<br\/>)+/g,"<br/><br/>");
			//clear the initial <br/>
			trueContent=trueContent.replace(/<br\/><br\/>/,"");
			$("title").text(data.Media);
			$(".review-des-title p").text(data.InfoTitle);
			$(".review-des-author p.left").html(data.Media+'<code class="author-time">'+data.date2+' '+data.time+'</code>');
			$(".review-des-conten").html(trueContent);
			$("input[name=title]").val(data.InfoTitle);
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

function setStar(openId,shopID){
	
	$.ajax({
		async : true,
		type : "post",
		url : goldenShopApi.setFocusStatus,
		data:{
			   openid:openId,
			   refObject:shopID,
			   actType: "F",
		},
		dataType: "json",
		error: function(e){
			$.commonMethods.patchTip("关注失败，好像有什么不对劲哦！");
			console.log("error:"+e.status+":"+e.statusText);
		},
		success : function(data) {
			console.log(data);
			if (data.success) {
				var focusAmount=$("#focus dl dd").eq(1).find("small span").text();
				focusAmount=parseInt(focusAmount);
				
				if($('#star').attr('data-focus')=='true'){
					$('#star').css({'color':'#f15b2d'}).text('+关注').attr('data-focus','true');
					$.commonMethods.patchTip("T_T，把我抛弃了！");
					$('#star').attr('data-focus','false');
					focusAmount--;
					$("#focus dl dd").eq(1).find("small").html("<span>"+focusAmount+"</span>人关注");
				}else{
					$('#star').css({'color':'gray'}).text('取消关注').attr('data-focus','true');
					$.commonMethods.patchTip("好棒喔！关注成功^_^");
					$('#star').attr('data-focus','true');
					focusAmount++;
					$("#focus dl dd").eq(1).find("small").html("<span>"+focusAmount+"</span>人关注");
				};
			} else {
				$.commonMethods.patchTip(data.msg);
			}
		}
	});
};

function getStar(openId,shopId){
	console.log(openId);
	$.ajax({
		async : true,
		type : "get",
		url :goldenShopApi.getFocusStatus,
		data:{
			   "openId": openId,
			   "refId":shopId,
			   "actType": "F"
		},
		dataType: "json",
		
		error: function(result){
			console.log('error: '+result.status+"-"+result.statusText);
		},
		success : function(data,status) {
			console.log("关注店主"+JSON.stringify(data));
			if(data.RESULT==true){
				$('#star').css({'color':'gray'}).text('取消关注').attr('data-focus','true');
			};
			
		}
	});
};

//get doc detail
function getDocDetail(docId,callback){
	$.ajax({
		type:"get",
		url:"get_doc_detail.jsp",
		data:{
			id:docId,
		},
		dataType:"json",
		success:function(data){
			callback(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

function commentSubmit(docId,content,openId,shopId){
	$.ajax({
		"type":"POST",
		"url":"submit_comment_action.jsp",	
		"data":{"docid":docId,"content":content, "openid":openId, "shopId":shopId},
		"cache": false,
		"dataType":"json",
		"error": function(e) {
			$.commonMethods.patchTip("评论失败，好像有什么不对劲哦！");
			console.log(e);
		},
		"success":function(data){
			if(data.success == true){
				$("#comment-content").val('');
				$('#comment-form').hide();
				$.commonMethods.patchTip("评论成功，请等待管理员审核！");
			}else{
				$.commonMethods.patchTip("评论失败！");
			};
		},
	});
};

function reviewList(docId,openId){
	//var $loading = $("#loading");
	var $reviewList = $("#reviewList");
	var params = {"docid" : docId, "openid" :openId};
	$reviewList.scrollLoad({
		"url": "get_doc_comment_list.jsp",
		"fromPage": 1, //从第几页开始
		"scrollWrap": $(document), //滚动的对象
		"pageSize": 1000, //每页加载个数
		"params":params,
		"htmlTemp": function (data){ //func 数据的html结构 接受了返回的data
			var r = data.results;
			var l = r.length;
			var htmls = [];
			if(l==0){
				$('.comment-more p').text('暂时没有评论。');
			};
			if (l > 0) {
				//comment amount
				$('#comment-amount').text(' ( 共'+l+'条 )');
				for ( var i=0; i < l; i++) {
						var avatar = r[i].headimgurl ? r[i].headimgurl : defaultAvatar;
						
						//Added by CJF on 20160408
						var nickName = '新用户';
						if(r[i].nickname!=null && r[i].nickname!=''){
							nickName = r[i].nickname;
						}
						
						//console.log(r[0]);
						
						//insert to dom
						$('<div class="comment-list">'+
											'<div class="comment-detail">'+
												'<div class="comment-avatar">'+
													'<img src="'+avatar+'"/>'+
												'</div>'+
												'<div class="comment-content">'+
													'<hgroup>'+
														'<h3>'+nickName+'<span></span></h3>'+
														'<h5>'+r[i].commentDate+'</h5>'+
													'</hgroup>'+
													'<p>'+r[i].content+'</p>'+
												'</div>'+
											'</div>'+
										'</div>').insertBefore('.comment-more');
						
					}
			};
			//click to show more
			var avatar_w=$('.comment-avatar').width();
			$('.comment-avatar').height(avatar_w);
			if($(".comment-list").length>5){
				$('.comment-more').css({'color':'black'});
			};
			
			var defaultLength=5;
			showMoreMessage(defaultLength);
			function showMoreMessage(thisLength){
				$(".comment-list").each(function(index){
					$(this).show();
					if(index>thisLength-1){
						$(this).hide();
					};
				});	
			};
			
			$('.comment-more').on({
				'click':function(){
					defaultLength+=5;
					showMoreMessage(defaultLength);
					if((defaultLength>=$(".comment-list").length)&&($(".comment-list").length!=0)){
						$(this).text('没有更多了！').css({'color':'#f15b3d'});
					};
				},
			});
		},
		"bsCallback": function(){
			//$loading.show();
		},
		"callback": function(){//func 加载成功后的回调
			//$loading.hide();
		}
	});
};

//doc collect
function getFocus(openId,docId){

	$.ajax({
		async : true,
		type : "get",
		url :goldenShopApi.getFocusStatus,
		data : {"openId": openId, "refId":docId, "actType": "D"},
		dataType: "json",
		
		error: function(result){
			console.log(result);
		},
		success : function(data,status) {
			console.log("资讯收藏"+JSON.stringify(data));
			if(data.RESULT==true){
				$('#my-favour img').attr('src','images/new-icons/favour2.png');
			};
			
		}
	});
};

function setFocus(openId,docId,shopId){

	$.ajax({
		async : true,
		type : "post",
		url : goldenShopApi.setFocusStatus,
		data : {"openid": openId, "refObject": docId, "actType": "D", "shopId" : shopId},
		dataType: "json",
		
		error: function(result){
			console.log(result);
			//$.commonMethods.patchTip("好像有什么不对劲哦！");
		},
		success : function(data,status) {
			console.log(data);
			if (data.success) {
				if(data.focused==false){
					$('#my-favour img').attr('src','images/new-icons/favour.png');
					$.commonMethods.patchTip("取消收藏成功");
					
				}else{
					$('#my-favour img').attr('src','images/new-icons/favour2.png');
					$.commonMethods.patchTip("好棒喔！收藏成功^_^");
					
				};
			} else {
				//$.commonMethods.patchTip(data.msg);
			}
		}
	});
};

//setDocRecordLog
function setDocRecordLog(shopId,openId,docId,rndCode){
	$.ajax({
		type:"get",
		url:goldenShopApi.setDocRecordLog,
		data:{
			cmd:"recordVisitHis",
			shopID:shopId,
			openID:openId,
			docID:docId,
			rndCode:rndCode,
		},
		dataType:"text",
		success:function(data){
			console.log(data);
		},
		error:function(result){
			console.log(result);
		},
	});
};

//layer

function leadLayer(layerArgs){
		
	var descImg=layerArgs.descImg;
	var buttonImg=layerArgs.buttonImg;
	var patchObj=layerArgs.patchObj;
	var lightObj=layerArgs.lightObj;
	var patchRadius=layerArgs.patchRadius;
	var revisePos=layerArgs.revisePos;
	var reviseDescPos={};
	var reviseSize=layerArgs.reviseSize;
	var descDirect=layerArgs.descDirect;
	var hideBg=false;
	var buttonTitle=layerArgs.buttonTitle;
	
	var winW=$(window).width();
	var winH=$(window).height();
	var posTop=patchObj.offset().top+revisePos.top;
	var posLeft=patchObj.offset().left+revisePos.left;
	
	var patchW=patchObj.width();
	var patchH=patchObj.height();
	var posRight=winW-posLeft-patchW;
	var buttonW=winW*0.2;
	var descW=winW*0.5;
	
	if(layerArgs.reviseDescPos){
		reviseDescPos=layerArgs.reviseDescPos;
	};
	if(layerArgs.hideBg==true){
		hideBg=true;
	};
	
	console.log(patchH);
	
	var patchStyle={
		position:"absolute",
		width:patchW+reviseSize.width,
		height:patchH+reviseSize.height,
		top:posTop,
		left:posLeft,
		borderRadius:patchRadius,
		background:"white",
		zIndex:13,
	};
	
	if(layerArgs.square==true){
		patchStyle.height=patchW;
	};
	if(hideBg==true){
		patchStyle.background="none";
	};
	
	var layerStyle={
		position:"fixed",
		width:winW,
		height:winH,
		top:0,
		left:0,
		background:"rgba(0,0,0,0.6)",
		zIndex:12,
	};
	
	var descStyle={
		position:"absolute",
		width:descW,
		height:"auto",
		top:posTop+patchH+10,
		left:patchStyle.left+patchW*0.5,
		zIndex:12,
	};
	
	if(descDirect.horizon=="right"){
		delete descStyle.left;
		descStyle.right=posRight+patchW*0.5;
	};
	if(descDirect.vercial=="top"){
		descStyle.top-=(patchH+20);
	};
	if(layerArgs.reviseDescPos){
		descStyle.top+=reviseDescPos.top;
	};
	
	var buttonStyle={
		position:"absolute",
		width:buttonW,
		height:"auto",
		top:descStyle.top+40,
		left:descStyle.left+(descStyle.width-buttonW)*0.5,
		zIndex:12,
	};
	
	if(descDirect.horizon=="right"){
		delete buttonStyle.left;
		buttonStyle.right=descStyle.right+(descStyle.width-buttonW)*0.5;
	};
	
	if(descDirect.vercial=="top"){
		buttonStyle.top=posTop;
	};
	
	var patchDom=$('<div title="patch"></div>');
	var layerDom=$('<section title="layer"></section>');
	var descDom=$('<img title="desc" src="'+descImg+'"/>');
	var buttonDom=$('<img title="'+buttonTitle+'" src="'+buttonImg+'"/>');
	
	patchDom.css(patchStyle);
	layerDom.css(layerStyle);
	descDom.css(descStyle);
	buttonDom.css(buttonStyle);
	
	layerDom.appendTo($("body"));
	patchDom.appendTo(layerDom);
	descDom.appendTo(layerDom);
	buttonDom.appendTo(layerDom);
	
	lightObj.css({"z-index":15,"position":"relative"});
	
	if(descDirect.vercial=="top"){
		descDom.on("load",function(){
			var descH=descDom.height();
			descDom.css({"top":posTop-descH-10});
		});
		
	};
};

function clearLayer(lightObj){
	$("section[title=layer]").remove();
	lightObj.css({"z-index":"inherit"});
};

//bind asset account
function setBindAccount(openId,userBondAcc){

	$.ajax({
	   type:"get",
	   url:goldenShopApi.gsESBAction,
	   data:{
			 action_type:"bindAccount",
			 acc_type:"X",
			 acc_code:openId,
			 dest_acc_typ:"F",
			 dest_acc_code:userBondAcc,
		}, 
	   dataType:"json",
	   error : function(){
			$("#tips").html("( err:绑定失败 )").css({"color":"#f15b3d"});
	   },
	   success : function(data){
		  if(data.result=="true"){
				$("#tips").html("( 绑定成功 )").css({"color":"#b0b0b0"});
				$(".sendForm,.bindForm").hide();
				$(".otherOperate").show();

			}else{
				//$("#tips").html("( err:绑定失败 )").css({"color":"#f15b3d"});
				$("#tips").html(data).css({"color":"#f15b3d"});
			};
		},
	});

};
function unBindAccount(openId,userBondAcc){
		
	if(confirm("您确定要解除绑定吗?")){
		$.ajax({
		   type:"get",
		   url:goldenShopApi.gsESBAction,
		   data:{
			     action_type:"unBindAccount",
				 acc_type:"X",
				 acc_code:openId,
				 dest_acc_typ:"F",
				 dest_acc_code:userBondAcc,
			}, 
			dataType:"json",
		   error : function(){
				$("#tips").html("( err:解绑失败 )").css({"color":"#f15b3d"});
		   },
		   success : function(data){
			   console.log(data);
			   
				if(data.result=="false"){
					$("#tips").html("( err:解绑失败 )").css({"color":"#f15b3d"});
				}else{
					$(".sendForm").show();
					$(".otherOperate,.bindForm").hide();
				};
				
			},
		});
	};
};

function bindStatus(callback){
	getBindCode({},function(data){
		if(data.userBondAcc!=""){
			$("#tips").html("( 你已经绑定了资金账号 )").css({"color":"#b0b0b0"});
			$(".sendForm,.bindForm").hide();
			$(".otherOperate").show();
			callback(data.userBondAcc);
		};
	});
	
};

function validateID(IDNumber,callback){
	
	$.ajax({
	   type : "POST",
	   url : goldenShopApi.setAccountBind,
	   data: {cmd:"GetUserInfoByIdCard",acc_type:"X",id_no:IDNumber,yzm:"ignoreYzm"}, 
	   error : function(){
			$("#tips").html("( err:身份验证失败 )").css({"color":"#f15b3d"});
	   },
	   success : function(data){
			if(data.indexOf("err:")!=-1){
				$("#tips").html("( "+data+" )").css({"color":"#f15b3d"});
			}else{	
				var dataObj=JSON.parse(data);
				callback(dataObj);
				
			};	
	   },
	});
};
function sendRandCode(userPhone){

	$.ajax({
	   type : "POST",
	   url : goldenShopApi.setAccountBind,
	   data: {type:"send",acc_type:"X",mobileNum:userPhone}, 
	   error : function(){
		$("#tips").html("( err:验证码获取失败 )").css({"color":"#f15b3d"});
	   },
	   success : function(data){
			//console.log(data);
			if(data.indexOf("已经发送")!=-1){
				$("#tips").html("( "+data+" )").css({"color":"#248bd1"});
			}else{
				$("#tips").html("( err:手机验证码发送失败 )").css({"color":"#f15b3d"});
			};
	   },
	});
};

function getFundDataFromJuYuan(productCode,manualData,callback){
	$.ajax({
		type:"get",
		url:"http://120.27.166.179/mobileF10View/dataapi/jjjzhb/"+productCode+"_jjjzhb/HSJY_1009/SllfMTAwOQ/10.1.51.63",
		data:{},
		dataType:"json",
		success:function(data){
			callback(data,manualData);
		},
		error:function(result){
			console.log(result);
		},
	});
};