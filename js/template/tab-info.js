mui.init();

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	/*获取传递过来的参数*/
	var title = "";
	switch(self.name) {
		case "abstract":
			title = "公司简介";
			break;
		case "culture":
			title = "企业文化";
			break;
		case "goods":
			title = "产品品牌";
			break;
		case "marry":
			title = "婚礼";
			break;
		case "birthday":
			title = "生日祝福";
			break;
		case "record":
			title = "纪念";
			break;
		case "other":
			title = "个人相册";
			break;
		default:
			title = "企业宣传";
			break;
	}
	document.getElementById("title").innerHTML = title;
});


/*点击免费按钮*/
var isCharge = document.getElementById("charge");
isCharge.addEventListener("tap", function() {
	if(isCharge.className.indexOf("free")==-1){
		
		//积分兑换
		isCharge.classList.add("free");
		document.getElementById("small-title").innerHTML="积分兑换";
	}else{
		
		//免积分
		isCharge.classList.remove("free");
		document.getElementById("small-title").innerHTML="免积分场景";
	}
});