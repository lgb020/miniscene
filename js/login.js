var music = angular.module("scene", []);
music.controller("login", function($scope, $http) {
	mui.init();
	
	function trim(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	}

	function isEmail(str) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return reg.test(str);
	}
	
	
	var root = "http://www.hsfeng.cn/scene/";
	//登录
	mui(".mui-content").on("tap", "#login", function() {
		var account = trim(document.getElementById("account").value);
		var password = trim(document.getElementById("password").value);
		if(account != "" && password != "") {
			password = hex_md5(password+"mini");
			if(isEmail(account)) {
				$http({
					method: "post",
					url: root + "user/login.html",
					data: {
						v: "1.0",
						account: account,
						password: password
					},
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					transformRequest: function(obj) {
						var str = [];
						for(var p in obj) {
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						}
						return str.join("&");
					}
				}).then(function successCallback(response) {
					if(response.data == 1) {
						var home = plus.webview.getLaunchWebview();
						plus.webview.show(home);
						mui.toast("登陆成功");
					} else {
						mui.toast("请输入正确的账号和密码");
					}
				});
			} else {
				mui.toast("请输入正确的账号");
			}
		} else {
			mui.toast("账号或密码不能为空");
		}
	})

	//注册
	mui(".mui-content").on("tap", ".mui-pull-left", function() {
		mui.openWindow({
			id: "register",
			url: "./register.html"
		});
	});

	//密码找回
	mui(".mui-content").on("tap", ".mui-pull-right", function() {
		mui.openWindow({
			id: "reset",
			url: "./reset.html"
		});
	});

});