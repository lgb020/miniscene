var scene = angular.module("scene", []);
scene.controller("search", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	document.getElementById("search").addEventListener("tap", function() {
		console.log("1");
		var content = document.getElementById("content").value;
		console.log(content);
		$http({
			method: "GET",
			url: root + "s/search.html",
			params: {
				v: "1.0",
				content: content
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
			} else {
				document.getElementById("notice").style.display = "block";
			}
		});
	});
});