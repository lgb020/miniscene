var scene = angular.module("scene", []);
scene.controller("setting", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	mui.plusReady(function() {
		//获取传递过来模板的id
		var self = plus.webview.currentWebview();
		$scope.sceneId = self.sceneId;
		$http({
			method: "GET",
			url: root + "s/manage/setting.html",
			params: {
				v: "1.0",
				id: $scope.sceneId
			}
		}).then(function successCallback(response) {
			$scope.title = response.data.title;
			$scope.describes = response.data.describes;
			$scope.mTitle = response.data.mTitle;
		});
	});
	
	/*完成修改*/
	document.getElementById("update").addEventListener("tap", function() {
		var id = document.getElementById("sceneId").value;
		var title = document.getElementById("title").value;
		var describes = document.getElementById("describes").value;
		$http({
			method: "GET",
			url: root + "s/manage/issue.html",
			params: {
				v: "1.0",
				id: id,
				title: title,
				describes: describes
			}
		}).then(function successCallback(response) {
			if(response.data == "true"){
				mui.back();
			}
		});
	});

	/*修改背景音乐*/
	document.getElementById("back-music").addEventListener("tap", function() {
		var id = document.getElementById("sceneId").value;
		mui.openWindow({
			id: "bMusic",
			url: "../scene/music.html",
			extras: {
				sceneId: id
			}
		});
	});
});