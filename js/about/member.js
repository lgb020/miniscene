var scene = angular.module("scene", []);
scene.controller("member", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	//用户信息
	$http({
		method: "GET",
		url: root + "user/info.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		var info = "<img class='mui-media-object mui-pull-left head-img' src='" + response.data.photo + "'>" +
			"<div class='mui-media-body'><p class='name'><span>" + response.data.name + "</span>";
		if(response.data.isMember == 1) {
			info = info + "<span><i class='iconfont icon-huiyuan1 isIntegral'></i></span></p>";
		} else {
			info = info + "<span><i class='iconfont icon-huiyuan1 common'></i></span></p>"
		}
		info = info + "<p class='mui-ellipsis'><span class='integral'>积分：" + response.data.jifen + "</span>";
		if(response.data.isMember == 1) {
			info = info + "<span class='times'>次数：" + response.data.alNumbers + "/" + response.data.numbers + "</span></p>";
		}
		info = info + "</div><button type='button' class='mui-btn mui-btn-primary recharge' id='recharge'>申请会员</button>";

		document.getElementById("info").innerHTML = info;
	});

	//兑换记录
	$http({
		method: "GET",
		url: root + "about/member.html",
		params: {
			v: "1.0",
			type: 2
		}
	}).then(function successCallback(response) {
		var info = "";
		if(response.data.length > 0) {
			for(var i = 0; i < response.data.length; i++) {
				info = info + "<section><span class='point-time point-yellow'></span><aside>" +
					"<p class='time'>" + response.data[i].sTimes + "</p><p class='brief'>" + response.data[i].descirbe + "</p></aside></section>";
			}
		} else {
			info = info + "<p class='time'>无记录</p></aside></section>";
		}
		document.getElementById("exchange").innerHTML = info;
	});
});