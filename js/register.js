var music = angular.module("scene", []);
music.controller("register", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/scene/";
	var check = function(account, pass, rpass) {
		if(account != "" && pass != "" && rpass != "") {
			if(isEmail(account)) {
				if(pass == rpass) {
					return true;
				} else {
					mui.toast("两次输入的密码不一样");
					return false;
				}
			} else {
				mui.toast("请输入正确的账号");
				return false;
			}
		} else {
			mui.toast("输入内容不能为空");
			return false;
		}
	}

	//注册
	mui(".mui-content").on("tap", "#register", function() {
		var account = trim(document.getElementById("email").value);
		var password = trim(document.getElementById("pass").value);
		var rpassword = trim(document.getElementById("re-pass").value);
		if(check(account, password, rpassword)) {
			password = hex_md5(pass + "mini");
			$http({
				method: "post",
				url: root + "user/register.html",
				data: {
					v: "1.0",
					account: account,
					password: password
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).then(function successCallback(response) {
				if(response.data == 1) {
					mui.toast("邮件已发送，请登陆邮箱激活账号");
					mui.back();
				} else {
					mui.toast("账号已被注册");
				}
			});
		}
	});

	mui(".mui-content").on("tap", ".mui-pull-right", function() {
		mui.back();
	});

	function trim(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	}

	function isEmail(str) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return reg.test(str);
	}
});