mui.init();
var scene = angular.module("scene", []);
scene.controller("about", function($scope, $http) {
	var root = "http://www.hsfeng.cn/";
	var id = 0;
	$http({
		method: "GET",
		url: root + "user/info.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		id = response.data.id;
		var info = "<img src='" + response.data.photo + "'/><div class='name'>"+response.data.name+"</div>";
		document.getElementById("photo").innerHTML = info;
		if(response.data.isRead == false) {
			document.querySelector(".mui-badge").style.display = "none";
		}
	});
	/*通知*/
	document.getElementById("inform").addEventListener("tap", function() {
		mui.openWindow({
			id: "inform",
			url: "./about/inform.html"
		});
	});

	/*我的模板*/
	document.getElementById("templ").addEventListener("tap", function() {
		mui.openWindow({
			id: "templ",
			url: "./about/templ.html"
		});
	});

	/*我的小店*/
	document.getElementById("store").addEventListener("tap", function() {
		mui.openWindow({
			id: "myStore",
			url: "./about/store.html"
		});
	});

	/*会员信息*/
	document.getElementById("member").addEventListener("tap", function() {
		mui.openWindow({
			id: "member",
			url: "./about/member.html"
		});
	});

	/*关于我们*/
	document.getElementById("introduce").addEventListener("tap", function() {
		mui.openWindow({
			id: "introduce",
			url: "./about/introduce.html"
		});
	});
});