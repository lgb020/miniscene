var scene = angular.module("scene", []);
scene.controller("inform", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/";
	$http({
		method: "GET",
		url: root + "about/message.html",
		params: {v: "1.0"}
	}).then(function successCallback(response) {
		if(response.data.length > 0) {
			var info = document.body.querySelector("#info");
			for(var i = 0; i < response.data.length; i++) {
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.id = response.data[i].id;
				li.innerHTML = "<div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red'>删除</a></div>" +
					"<div class='mui-slider-handle mui-table'><div class='mui-table-cell'><span>" + response.data[i].sTimes + "</span>" +
					"<span>" + response.data[i].content + "</span></div></div>";
				info.appendChild(li);
			}
		} else {
			document.getElementById("notice").classList.remove("dispress");
		}
	});

	/*左滑删除*/
	(function($) {
		var btnArray = ["确认", "取消"];
		$("#info").on("slideleft", ".mui-table-view-cell", function(event) {
			var elem = this;
			mui.confirm("确认删除该条记录？", "", btnArray, function(e) {
				if(e.index == 0) {
					$http({
						method: "GET",
						url: root + "about/mess/delete.html",
						params: {
							v: "1.0",
							id: elem.id
						}
					}).then(function successCallback(response) {
						elem.parentNode.removeChild(elem);
						checkList();
					});
				} else {
					$.swipeoutClose(elem);
				}
			});
		});
	})(mui);

	/*判断是否还有数据*/
	var checkList = function() {
		var info = document.body.querySelectorAll("#info .mui-table-view-cell");
		var notice = document.getElementById("notice");
		if(info.length == 0) {
			//无数据
			notice.classList.remove("dispress");
		}
	}
});