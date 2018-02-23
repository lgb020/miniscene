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

//获取版本号
var version = "1.0";
mui.plusReady(function() {
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		version = inf.version;
	});
});

var scene = angular.module("scene", []);
var root = "http://www.hsfeng.cn/scene/"
scene.controller("ctrl", function($scope, $http) {
	
});

/*设计小店*/
document.getElementById("store").addEventListener("tap", function() {
	mui.openWindow({
		id: "storeAll",
		url: "../store/store_all.html",
		show: {
			aniShow: "pop-in"
		}
	});
});

/*新建模板*/
document.getElementById("issue").addEventListener("tap", function() {
	mui.openWindow({
		id: "issue",
		url: "../issue.html",
		show: {
			aniShow: "pop-in"
		}
	});
});