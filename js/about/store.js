var scene = angular.module("scene", []);
scene.controller("store", function($scope, $http) {
	mui.init();
	var root = "http://www.hsfeng.cn/scene/";
	$http({
		method: "GET",
		url: root + "about/store.html",
		params: {v: "1.0"}
	}).then(function successCallback(response) {
		if(response.data.length > 0) {
			var info = document.body.querySelector("#info");
			for(var i = 0; i < response.data.length; i++) {
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.id = response.data[i].id;
				li.innerHTML = "<div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red'>下架</a></div>"+
					"<div class='mui-slider-handle mui-table'><img class='mui-pull-left' src='"+response.data[i].cover+"'>"+
					"<div class='describes'><span class='title'>"+response.data[i].title+"</span>"+
					"<span class='mui-pull-right times'>"+response.data[i].sTimes+"</span><span class='line'></span>"+
					"<span class='iconfont icon-jifen'> "+response.data[i].hitCount+"</span></div></div>";
				info.appendChild(li);
			}
		} else {
			document.getElementById("notice").classList.remove("dispress");
		}
	});
	/*左滑下架模板*/
	(function($) {
		var btnArray = ["下架", "取消"];
		$("#info").on("slideleft", ".mui-table-view-cell", function(event) {
			var elem = this;
			//下架模板的id
			mui.confirm("是否下架该模板？", "", btnArray, function(e) {
				if(e.index == 0) {
					$http({
						method: "GET",
						url: root + "s/manage/down.html",
						params: {
							v: "1.0",
							id: elem.id
						}
					}).then(function successCallback(response) {
						elem.parentNode.removeChild(elem);
						checkList();
					});
				} else {
					setTimeout(function() {
						$.swipeoutClose(elem);
					}, 0);
				}
			});
		});
	})(mui);

	/*判断是否还有数据*/
	var checkList = function() {
		var info = document.body.querySelectorAll("#info .mui-table-view-cell");
		var notice = document.getElementById("notice");
		if(info.length == 0) {
			/*无数据*/
			notice.classList.remove("dispress");
		}
	}
});