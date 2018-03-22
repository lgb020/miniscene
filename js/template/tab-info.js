mui.init();
var music = angular.module("scene", []);
music.controller("label", function($scope, $http) {
	var id = 0;
	var root = "http://www.hsfeng.cn/scene/";
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		/*获取传递过来的参数*/
		var title = "";
		switch(self.name) {
			case "3":
				title = "公司简介";
				break;
			case "4":
				title = "企业文化";
				break;
			case "5":
				title = "产品品牌";
				break;
			case "6":
				title = "企业宣传";
				break;
			case "7":
				title = "婚礼";
				break;
			case "8":
				title = "生日祝福";
				break;
			case "9":
				title = "纪念";
				break;
			case "10":
				title = "个人相册";
				break;
			default:
				break;
		}
		id = self.name;
		info(id, 1);
		document.getElementById("title").innerHTML = title;
	});

	var info = function(tip, charge) {
		$http({
			method: "GET",
			url: root + "s/part.html",
			params: {
				v: "1.0",
				type: tip,
				charge: charge
			}
		}).then(function successCallback(response) {
			var info = document.body.querySelector(".info");
			info.innerHTML = "";
			if(response.data.length > 0) {
				for(var i = 0; i < response.data.length; i++) {
					var div = document.createElement("div");
					switch(i % 3) {
						case 0:
							div.className = "cover";
							break;
						case 1:
							div.className = "cover center";
							break;
						default:
							div.className = "cover right";
							break;
					}
					if(response.data[i].jifen == 0) {
						div.innerHTML = "<img src='" + response.data[i].cover + "' />" +
							"<span class='describes'>" + response.data[i].title + "</span>" +
							"<span class='integral'><i class='iconfont icon-mianfeishichang'></i>  免积分</span>";
					} else {
						div.innerHTML = "<img src='" + response.data[i].cover + "' />" +
							"<span class='describes'>" + response.data[i].title + "</span>" +
							"<span class='integral'><i class='iconfont icon-jifen'></i> " + response.data[i].jifen + "</span>";
					}
					info.appendChild(div);
				}
				document.getElementById("notice").style.display = "none";
			}else{
				document.getElementById("notice").style.display = "block";
			}
		});
	}

	/*点击免费按钮*/
	var isCharge = document.getElementById("charge");
	isCharge.addEventListener("tap", function() {
		if(isCharge.className.indexOf("free") == -1) {
			info(id, 1);
			//积分兑换
			isCharge.classList.add("free");
			document.getElementById("small-title").innerHTML = "积分兑换";
		} else {
			info(id, 0);
			//免积分
			isCharge.classList.remove("free");
			document.getElementById("small-title").innerHTML = "免积分场景";
		}
	});
});