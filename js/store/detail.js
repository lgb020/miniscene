var scene = angular.module("scene", []);
scene.controller("store", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	mui.plusReady(function() {
		//获取传递过来模板的id
		var self = plus.webview.currentWebview();
		$scope.sceneInfo(self.storeId);
	});

	$scope.sceneInfo = function(id) {
		$http({
			method: "GET",
			url: root + "store/list.html",
			params: {
				v: "1.0",
				id:id
			}
		}).then(function successCallback(response) {
			if(response.data.length > 0) {
				var info = document.body.querySelector("#info");
				for(var i = 0; i < response.data.length; i++) {
					var li = document.createElement("li");
					li.className = "mui-table-view-cell";
					li.id = response.data[i].id;
					if(response.data[i].jifen == 0) {
						li.innerHTML = "<div class='mui-slider-handle mui-table'><img class='mui-pull-left' src='" + response.data[i].cover + "'>" +
							"<div class='describes'><span class='title'>" + response.data[i].title + "</span>" +
							"<span class='mui-pull-right times'>" + response.data[i].sTimes + "</span><span class='line'></span>" +
							"<span class='iconfont icon-jifen'> 免费</span></div></div>";
					} else {
						li.innerHTML = "<div class='mui-slider-handle mui-table'><img class='mui-pull-left' src='" + response.data[i].cover + "'>" +
							"<div class='describes'><span class='title'>" + response.data[i].title + "</span>" +
							"<span class='mui-pull-right times'>" + response.data[i].sTimes + "</span><span class='line'></span>" +
							"<span class='iconfont icon-jifen'> " + response.data[i].jifen + "</span></div></div>";
					}
					li.id = response.data[i].id;
					info.appendChild(li);
				}
			} else {
				document.getElementById("notice").classList.remove("dispress");
			}
		});
	}

	//查看详情
	mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
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