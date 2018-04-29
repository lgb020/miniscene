var scene = angular.module("scene", []);
scene.controller("store", function($scope, $http) {
	mui.init({
		pullRefresh: {
			container: "#recommend",
			up: {
				height: 50,
				auto: true,
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了",
				callback: moreInfo
			}
		}
	});

	var swiper = new Swiper(".swiper-container", {
		slidesPerView: 2.5,
		spaceBetween: 4,
		resistanceRatio: 0,
		observer: true,
		observeParents: true,
		watchOverflow: true,
	});

	var store = function(id) {
		mui.openWindow({
			id: "store",
			url: "../about/store.html",
			extras: {
				account: "1083178465@qq.com"
			}
		});
	}

	/*加载更多*/
	var root = "http://www.hsfeng.cn/";
	var page = 0; //当前页
	var count = 0; //总页数
	var nPage = 0; //新入驻页
	//查询总页数
	$http({
		method: "GET",
		url: root + "store/count.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		count = response.data;
	});

	//新入驻小店
	$scope.refresh = function() {
		if(nPage > 8) {
			nPage = 1;
		} else {
			nPage++;
		}
		$http({
			method: "GET",
			url: root + "store/news.html",
			params: {
				v: "1.0",
				page: nPage,
			}
		}).then(function successCallback(response) {
			var info = document.body.querySelector(".swiper-wrapper");
			info.innerHTML = "";
			for(var i = 0; i < response.data.length; i++) {
				var div = document.createElement("div");
				div.className = "swiper-slide";
				div.innerHTML = "<div class='photo'><img src='" + response.data[i].photo + "' /></div>" +
					"<div class='info'><span class='name'>" + response.data[i].name + "</span>";
				div.id = response.data[i].id;
				info.appendChild(div);
			}
		});
	}

	//推荐小店
	var init_info = function(page) {
		$http({
			method: "GET",
			url: root + "store/info.html",
			params: {
				v: "1.0",
				page: page
			}
		}).then(function successCallback(response) {
			var list = document.body.querySelector(".list");
			for(var i = 0; i < response.data.length; i++) {
				var div = document.createElement("div");
				if(i % 2 == 0) {
					div.className = "detail";
				} else {
					div.className = "detail add";
				}
				div.innerHTML = "<div class='photo'><img src='" + response.data[i].photo + "' /></div>" +
					"<div class='info'><span class='name'>" + response.data[i].name + "</span>" +
					"<span class='belief'>上架模板：" + response.data[i].counts + "</span></div>";
				div.id = response.data[i].id;
				list.appendChild(div);
			}
		});
	}

	//数据初始化
	init_info(1);
	$scope.refresh();

	function moreInfo() {
		if(count == 1) {
			mui("#recommend").pullRefresh().endPullup(true);
		} else {
			setTimeout(function() {
				++page;
				mui("#recommend").pullRefresh().endPullup(page >= count);
				init_info(page);
			}, 2000);
		}
	}

	//查看新入驻店的模板
	mui(".swiper-wrapper").on("tap", ".swiper-slide", function() {
		var storeId = this.id;
		mui.openWindow({
			id: "newStore",
			url: "./detail.html",
			extras: {
				storeId: storeId
			}
		});
	});

	//查看推荐小店的模板
	mui(".list").on("tap", ".detail", function() {
		var storeId = this.id;
		mui.openWindow({
			id: "ReStore",
			url: "./detail.html",
			extras: {
				storeId: storeId
			}
		});
	});
});