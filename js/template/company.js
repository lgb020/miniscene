var music = angular.module("scene", []);
music.controller("company", function($scope, $http) {
	mui.init({
		pullRefresh: {
			container: "#hotInfo",
			up: {
				height: 50,
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了",
				callback: moreInfo
			}
		}
	});
	var root = "http://www.hsfeng.cn/scene/";
	var page = 1; //当前页
	var count = 1; //总页数
	//查询总页数
	$http({
		method: "GET",
		url: root + "s/company/count.html",
		params: {v: "1.0"}
	}).then(function successCallback(response) {
		count = response.data;
	});

	var init_info = function(page) {
		$http({
			method: "GET",
			url: root + "s/company.html",
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
});

/*点击公司简介*/
document.getElementById("abstract").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "3"
		}
	});
});

/*点击企业文化*/
document.getElementById("culture").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "4"
		}
	});
});

/*点击产品品牌*/
document.getElementById("goods").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "5"
		}
	});
});

/*点击其他*/
document.getElementById("all").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "6"
		}
	});
});