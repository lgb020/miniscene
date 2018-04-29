var scene = angular.module("scene", []);
scene.controller("templ", function($scope, $http, $compile) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	//制作的模板
	$http({
		method: "GET",
		url: root + "about/scene.html",
		params: {
			v: "1.0",
			temp: 0
		}
	}).then(function successCallback(response) {
		if(response.data.length > 0) {
			$scope.original = response.data;
		} else {
			document.getElementById("notice").classList.remove("dispress");
		}
	});

	//兑换的模板
	$http({
		method: "GET",
		url: root + "about/scene.html",
		params: {
			v: "1.0",
			temp: 1
		}
	}).then(function successCallback(response) {
		if(response.data.length > 0) {
			$scope.exchange = response.data;
		} else {
			document.getElementById("o-notice").classList.remove("dispress");
		}
	});

	//点击管理按钮
	$scope.setting = function(id, temp) {
		//原创的temp为true,兑换的temp为false,原创模板弹出菜单多了上架市场
		if(temp == true) {
			mui("#setting").popover("toggle");
		} else if(temp == false) {
			mui("#eSetting").popover("toggle");
		}
		$scope.editId = id;
	}

	//上架,添加角标
	$scope.putaway = function() {
		var btnArray = ["上架", "取消"];
		mui.confirm("是否上架H5市场？", "", btnArray, function(e) {
			if(e.index == 0) {
				document.getElementById("item").style.display = "block";
				document.getElementById("shade").style.display = "block";
			}
			mui("#setting").popover("toggle");
		});
	}

	//设置积分
	$scope.submit = function() {
		var id = document.getElementById("editId").value;
		var elem = document.body.querySelector("#elem" + id);
		var i = document.createElement("i");
		i.className = "iconfont icon-jiaobiao";
		elem.insertBefore(i, elem.firstChild);
		var jifen = trim(document.getElementById("jifen").value);
		if(jifen == "") {
			jifen = 0;
		}
		$http({
			method: "GET",
			url: root + "s/manage/shelve.html",
			params: {
				v: "1.0",
				id: id,
				jifen: jifen
			}
		}).then(function successCallback(response) {
			if(response.data == "true") {
				mui.toast("上架成功");
				document.getElementById("item").style.display = "none";
				document.getElementById("shade").style.display = "none";
			}
		});
	}

	$scope.cancel = function() {
		document.getElementById("item").style.display = "none";
		document.getElementById("shade").style.display = "none";
	}

	function trim(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	}

	//编辑模板信息
	$scope.editInfo = function() {
		var id = document.getElementById("editId").value;
		mui("#setting").popover("toggle");
	}

	//设置模板信息
	$scope.setInfo = function() {
		var id = document.getElementById("editId").value;
		mui.openWindow({
			id: "setTempl",
			url: "./set-templ.html",
			extras: {
				sceneId: id
			}
		});
		mui("#setting").popover("toggle");
	}

	//删除模板信息
	$scope.delInfo = function() {
		var btnArray = ["删除", "取消"];
		mui.confirm("是否删除该场景？", "", btnArray, function(e) {
			if(e.index == 0) {
				var id = document.getElementById("editId").value;
				$http({
					method: "GET",
					url: root + "s/manage/del.html",
					params: {
						v: "1.0",
						id: id
					}
				}).then(function successCallback(response) {
					if(response.data == "true") {
						var currentList = document.body.querySelector("#elem" + id);
						currentList.parentNode.remove();
						mui.toast("删除成功");
					}
				});
			}
			mui("#setting").popover("toggle");
		});
	}

	//分享服务
	var shares = null;

	function plusReady() {
		plus.share.getServices(function(s) {
			shares = {};
			for(var i in s) {
				var t = s[i];
				shares[t.id] = t;
			}
		}, function(e) {
			console.log("获取分享失败");
		});
	}

	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}

	//分享操作
	function shareAction(sb) {
		var sceneId = document.getElementById("editId").value;
		$http({
			method: "GET",
			url: root + "s/scene.html",
			params: {
				v: "1.0",
				sceneId: sceneId
			}
		}).then(function successCallback(response) {
			if(response.data != null) {
				var msg = {
					extra: {
						scene: sb.x
					}
				};
				msg.href = root+"s/view.html?v=1.0&code="+response.data.code;
				msg.title = response.data.title;
				msg.content = response.data.describes;
				// 发送分享
				if(sb.s.authenticated) {
					shareMessage(msg, sb.s);
				} else {
					sb.s.authorize(function() {
						shareMessage(msg, sb.s);
					}, function(e) {
						console.log("发送失败");
					});
				}
			}
		});
	}
	//发送分享消息
	function shareMessage(msg, s) {
		s.send(msg, function() {
			console.log("发送成功");
		}, function(e) {
			console.log("发送失败"+e.message);
		});
	}
	// 分享
	$scope.share = function(id) {
		$scope.editId = id;
		mui("#share").popover("toggle");
	}
	// 分享方式选择
	$scope.shareway = function(index) {
		var shareBts = [];
		var ss = shares["weixin"];
		ss && ss.nativeClient && (
			shareBts.push({
				title: "微信好友",
				s: ss,
				x: "WXSceneSession"
			}),
			shareBts.push({
				title: "微信朋友圈",
				s: ss,
				x: "WXSceneTimeline"
			})
		);
		if(shareBts.length > 0) {
			shareAction(shareBts[index]);
		} else {
			plus.nativeUI.alert("分享操作失败!")
		}
	}

});