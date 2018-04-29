var scene = angular.module("scene", []);
scene.controller("view", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	mui.plusReady(function() {
		//获取传递过来模板的id
		var self = plus.webview.currentWebview();
		$scope.sceneId = self.sceneId;
		plus.nativeUI.showWaiting();
		$scope.sceneInfo($scope.sceneId); //场景信息
		$scope.pageInfo($scope.sceneId); //场景单页信息
		plus.nativeUI.closeWaiting();
	});

	//获取场景信息
	$scope.sceneInfo = function(id) {
		$http({
			method: "GET",
			url: root + "s/scene.html",
			params: {
				v: "1.0",
				sceneId: id
			}
		}).then(function successCallback(response) {
			$scope.title = response.data.title;
			$scope.music = response.data.music;
			$scope.cover = response.data.cover;
			if(response.data.jifen > 0) {
				$scope.charge = response.data.jifen + "积分兑换";
			} else {
				$scope.charge = "免费兑换";
			}
		});
	}

	//获取场景单页信息
	$scope.info = new Array(); //场景
	$scope.pageInfo = function(id) {
		$http({
			method: "GET",
			url: root + "s/list.html",
			params: {
				v: "1.0",
				sceneId: id
			}
		}).then(function successCallback(response) {
			for(var i = 0; i < response.data.length; i++) {
				var page = new Array();
				page.bgUrl = response.data[i].background;
				page.color = response.data[i].bgcolor;
				$scope.info.push(page);
				var content = JSON.parse(response.data[i].content); //对内容反序列化
				for(var j = 0; j < content.length; j++) {
					$scope.info[i].push(content[j]);
				}
			}
		});
	}

	//点击音乐
	mui(".mui-content").on("tap", ".bgm-btn", function() {
		var result = this.classList.contains("rotate");
		var music = document.getElementById("music");
		if(result) {
			music.pause();
			this.classList.remove("rotate");
		} else {
			music.play();
			this.classList.add("rotate");
		}
	});

	//点击举报
	mui(".footer").on("tap", ".report", function() {
		$http({
			method: "GET",
			url: root + "s/manage/ip.html",
			params: {
				v: "1.0",
				sceneId: $scope.sceneId,
				ip: returnCitySN.cip
			}
		}).then(function successCallback(response) {
			if(response.data == "true") {
				document.getElementById("item").style.display = "block";
				document.getElementById("shade").style.display = "block";
			} else {
				mui.toast("该场景已举报，管理员正在处理！");
			}
		});
	});

	//取消
	$scope.cancel = function() {
		document.getElementById("item").style.display = "none";
		document.getElementById("shade").style.display = "none";
	}

	//举报
	$scope.submit = function() {
		var reason = document.getElementById("reason").value; //举报原因
		$http({
			method: "GET",
			url: root + "s/manage/report.html",
			params: {
				v: "1.0",
				sceneId: $scope.sceneId,
				ip: returnCitySN.cip,
				content: reason
			}
		}).then(function successCallback(response) {
			if(response.data > 0) {
				mui.toast("举报成功，管理员会马上处理！");
			}
			document.getElementById("item").style.display = "none";
			document.getElementById("shade").style.display = "none";
		});
	}
});

scene.filter("to_draw", ["$sce", function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	}
}]);

var swiper = new Swiper(".swiper-container", {
	direction: "vertical",
	resistanceRatio: 0,
	observer: true,
	observeParents: true,
	pagination: {
		el: ".swiper-pagination",
	},
	on: {
		init: function() {
			swiperAnimateCache(this);
			swiperAnimate(this);
		},
		slideChangeTransitionStart: function() {
			swiperAnimate(this);
		}
	}
});

setTimeout(function() {　　
	swiperAnimate(swiper);
}, 1000);