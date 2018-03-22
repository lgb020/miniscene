mui.init();

var menu = new Swiper(".swiper-container", {
	effect: "fade",
	observer: true,
	observeParents: true,
	autoplay: true,
	pagination: {
		el: ".swiper-pagination",
	}
});

var scene = angular.module("scene", []);
scene.controller("recommend", function($scope, $http) {
	var root = "http://www.hsfeng.cn/scene/";
	//轮播图
	$http({
		method: "GET",
		url: root + "adv/index.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		$scope.adv = response.data;
	});
	//精选模板
	var page = 0;
	var count = 1;
	//换一批
	$scope.refresh = function() {
		if(page > count) {
			page = 1;
		} else {
			page++;
		}
		$http({
			method: "GET",
			url: root + "s/info.html",
			params: {
				v: "1.0",
				page: page,
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
				div.id = response.data[i].id;
				info.appendChild(div);
			}
		});
	}
	$scope.refresh();
	//最新推荐
	$http({
		method: "GET",
		url: root + "s/news.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		var info = document.body.querySelector(".news");
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
			div.id = response.data[i].id;
			info.appendChild(div);
		}
	});

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

	/*设计小店*/
	document.getElementById("store").addEventListener("tap", function() {
		mui.openWindow({
			id: "storeAll",
			url: "../store/store_all.html"
		});
	});

	/*新建模板*/
	document.getElementById("issue").addEventListener("tap", function() {
		$http({
			method: "GET",
			url: root + "user/auth.html",
			params: {
				v: "1.0"
			}
		}).then(function successCallback(response) {
			if(response.data == 1) {
				mui.openWindow({
					id: "issue",
					url: "../issue.html",
					show: {
						aniShow: "pop-in"
					}
				});
			} else {
				mui.openWindow({
					id: "login",
					url: "../login.html",
					show: {
						aniShow: "pop-in"
					}
				});
			}
		});
	});
});