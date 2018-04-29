var swiper = new Swiper(".swiper-container", {
	slidesPerView: 3.8,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var scene = angular.module("scene", []);
scene.controller("background", function($scope, $http) {
	mui.init({
		pullRefresh: {
			container: "#info",
			up: {
				height: 50,
				auto: true,
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了",
				callback: moreInfo
			}
		}
	});
	$scope.originColor = new Array("#FFFFFF", "#9fb2c0", "#d3c3c4", "#a09aa6", "#8CC7B5", "#D1BA74", "#ECAD9E", "#F4606C", "#716f7d", "#314d58", "#000000");

	var root = "http://www.hsfeng.cn/";
	var page = 1; //当前页
	var count = 1; //总页数
	var init_info = function(page) {
		var info = document.body.querySelector(".recommend");
		$http({
			method: "GET",
			url: root + "file/info.html",
			params: {
				v: "1.0",
				type: 0,
				page: page
			}
		}).then(function successCallback(response) {
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
				div.innerHTML = "<img src='" + response.data[i].url + "'/>";
				info.appendChild(div);
			}
		});
	}
	init_info(page);
	//查询总页数
	$http({
		method: "GET",
		url: root + "file/count.html",
		params: {
			v: "1.0",
			type: 0
		}
	}).then(function successCallback(response) {
		count = response.data;
	});

	//下拉刷新加载更多
	function moreInfo() {
		setTimeout(function() {
			++page;
			mui("#info").pullRefresh().endPullup(page >= count);
			init_info(page);
		}, 2000);
	}

	//查询使用记录
	function record() {
		var info = document.body.querySelector(".record");
		$http({
			method: "GET",
			url: root + "file/record.html",
			params: {
				v: "1.0",
				type: 0
			}
		}).then(function successCallback(response) {
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
				div.innerHTML = "<img src='" + response.data[i].url + "'/>";
				info.appendChild(div);
			}
		});
	}

	/*本地在线切换*/
	var menu = document.getElementById("menu")
	menu.addEventListener("tap", function() {
		var online = document.getElementById("online-text");
		var location = document.getElementById("location-text");
		var content = menu.innerHTML;
		if(content == "素材库") {
			online.style.display = "none";
			location.style.display = "block";
			menu.innerHTML = "在线";
			record();
		} else {
			online.style.display = "block";
			location.style.display = "none";
			menu.innerHTML = "素材库";
		}
	});

});

//选择背景图
mui(".info").on("tap", ".cover", function() {
	var img = this.childNodes.item(0).src;
	var view = plus.webview.getWebviewById("issue");
	mui.fire(view, "getBackg", {
		img: img
	});
	mui.back();
});

//选择纯色
mui(".swiper-wrapper").on("tap", ".pure", function() {
	var bgColor = this.childNodes.item(1).style.backgroundColor;
	var view = plus.webview.getWebviewById("issue");
	mui.fire(view, "getBackgC", {
		bgColor: bgColor
	});
	mui.back();
});

mui("body").on("tap", "#issue", function(e) {
	galleryImg();
});

//本地相册选择
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("background.png", {}, function(file) {
					file.remove(function() {
						entry.copyTo(root, "background.png", function(e) {
							var img = e.fullPath + "?version=" + new Date().getTime();
							cropeImg(img);
						});
					});
				}, function() {
					entry.copyTo(root, "background.png", function(e) {
						img = e.fullPath + "?version=" + new Date().getTime();
						cropeImg(img);
					});
				});
			})
		});
	})
};

var cropeImg = function(url) {
	mui.openWindow({
		id: "crop",
		url: "./cropper.html",
		extras: {
			img: url,
			type: 0
		},
		show: {
			aniShow: "slide-in-bottom"
		}
	});
}