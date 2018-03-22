var hot = angular.module("scene", []);
hot.controller("hot", function($scope, $http) {
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
	var page = 1; //热门推荐的当前页
	var count = 1; //热门推荐的总页数
	var newsPage = 0; //最新模板的当前页
	var newsCount = 1; //最新模板的总页数
	//查询最新模板总页数
	$http({
		method: "GET",
		url: root + "/s/h/count.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		newsCount = response.data;
	});
	//换一批
	$scope.refresh = function() {
		if(newsPage > newsCount) {
			newsPage = 1;
		} else {
			newsPage++;
		}
		$http({
			method: "GET",
			url: root + "s/hot.html",
			params: {
				v: "1.0",
				page: newsPage,
			}
		}).then(function successCallback(response) {
			var info = document.body.querySelector(".start");
			info.innerHTML = "";
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
	//查询推荐总页数
	$http({
		method: "GET",
		url: root + "/s/hot/count.html",
		params: {v: "1.0"}
	}).then(function successCallback(response) {
		count = response.data;
	});

	var init_info = function(page) {
		$http({
			method: "GET",
			url: root + "s/hot/recommend.html",
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

	//数据初始化
	init_info(1);
	$scope.refresh();
});