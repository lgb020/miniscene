var music = angular.module("scene", []);
music.controller("back", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/scene/";
	var count = 60; //计数器
	var curCount; //当前剩余秒数
	var InterValObj; //控制时间
	//获取验证码
	mui(".mui-content").on("tap", "#getCode", function() {
		var account = trim(document.getElementById("email").value);
		if(account != "" && isEmail(account)) {
			$http({
				method: "post",
				url: root + "user/code.html",
				data: {
					v: "1.0",
					account: account
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
					curCount = count;
					document.getElementById("getCode").disabled = true;
					InterValObj = window.setInterval(SetRemainTime, 1000);
					mui.toast("验证码已发送到邮箱");
				} else {
					mui.toast("请先注册账号");
				}
			});
		} else {
			mui.toast("请输入正确的账号");
		}
	});

	//timer处理函数
	function SetRemainTime() {
		if(curCount == 0) {
			window.clearInterval(InterValObj);
			document.getElementById("getCode").disabled = false;
			document.getElementById("getCode").innerHTML = "获取验证码";
			code = ""; //清除验证码
		} else {
			curCount--;
			document.getElementById("getCode").innerHTML = curCount + "s";
		}
	}

	var check = function(account, password, rpassword, code) {
		if(account != "" && password != "" && rpassword != "" && code != "") {
			if(isEmail(account)) {
				if(password == rpassword) {
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

	//重置密码
	mui(".mui-content").on("tap", "#reset", function() {
		var account = trim(document.getElementById("email").value);
		var password = trim(document.getElementById("pass").value);
		var rpassword = trim(document.getElementById("re-pass").value);
		var code = trim(document.getElementById("code").value);
		if(check(account, password, rpassword, code)) {
			password = hex_md5(password + "mini");
			$http({
				method: "post",
				url: root + "user/reset.html",
				data: {
					v: "1.0",
					account: account,
					password: password,
					code: code
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
				if(response.data == 0) {
					mui.toast("验证码错误");
				} else {
					mui.toast("密码重置成功");
					mui.back();
				}
			});
		}
	});

	function trim(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	}

	function isEmail(str) {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return reg.test(str);
	}
});