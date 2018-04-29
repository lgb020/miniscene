var music = angular.module("scene", []);
music.controller("photo", function($scope, $http) {
	mui.init({
		pullRefresh: {
			container: "#hotInfo",
			up: {
				height: 50,
				auto: true,
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了",
				callback: moreInfo
			}
		}
	});
	var root = "http://www.hsfeng.cn/";
	var page = 1; //当前页
	var count = 1; //总页数
	//查询总页数
	$http({
		method: "GET",
		url: root + "s/photo/count.html",
		params: {v: "1.0"}
	}).then(function successCallback(response) {
		count = response.data;
	});

	var init_info = function(page) {
		$http({
			method: "GET",
			url: root + "s/photo.html",
			params: {
				v: "1.0",
				page: page
			}
		}).then(function successCallback(response) {
			var info = document.body.querySelector("#hotInfo .list");
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
				div.id = response.data[i].id;
				info.appendChild(div);
			}
		});
	}
	//数据初始化
	init_info(1);
	
	function moreInfo() {
		if(count == 1) {
			mui("#hotInfo").pullRefresh().endPullup(true);
		} else {
			setTimeout(function() {
				++page;
				mui("#hotInfo").pullRefresh().endPullup(page >= count);
				init_info(page);
			}, 2000);
		}
	}
	
	//查看详情
	mui(".info").on("tap", ".cover", function() {
		var sceneId = this.id;
		mui.openWindow({
			id: "view",
			url: "../view.html",
			extras: {
				sceneId: sceneId
			}
		});
	});
});

/*点击婚礼*/
document.getElementById("marry").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "1"
		}
	});
});

/*点击宴席*/
document.getElementById("birthday").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "2"
		}
	});
});

/*点击会议*/
document.getElementById("record").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "3"
		}
	});
});

/*点击其他*/
document.getElementById("other").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "4"
		}
	});
});