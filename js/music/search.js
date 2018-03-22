mui.init();
var music = angular.module("music", []);
music.controller("search", function($scope, $http) {
	var root = "http://www.hsfeng.cn/scene/";
	document.getElementById("search").addEventListener("tap", function() {
		var content = document.getElementById("content").value;
		$http({
			method: "GET",
			url: root + "music/search.html",
			params: {
				v: "1.0",
				content: content
			}
		}).then(function successCallback(response) {
			document.getElementById("music").pause();
			var info = document.body.querySelector(".list");
			info.innerHTML="";
			if(response.data.length > 0) {
				for(var i = 0; i < response.data.length; i++) {
					var li = document.createElement("li");
					li.className = "mui-table-view-cell";
					li.innerHTML = "<span class='mui-pull-left title'>" + response.data[i].name + "</span>" +
						"<span class='mui-pull-right length'>" + response.data[i].length + "</span>" +
						"<input type='hidden' value='" + response.data[i].url + "'/>";
					info.appendChild(li);
				}
				document.getElementById("notice").style.display="none";
				document.getElementById("audio").style.display="block";
			}else{
				document.getElementById("notice").style.display="block";
				document.getElementById("audio").style.display="none";
			}
		});
	});
});

/*点击音乐播放*/
mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
	var audio = document.getElementById("music");
	var music = this.childNodes[2].defaultValue;
	audio.src = music;
	audio.play();
	//排他法修改样式变化
	var list = document.body.querySelectorAll(".mui-table-view .mui-table-view-cell");
	for(var i = 0; i < list.length; i++) {
		if(list[i].classList.length == 2 && list[i].classList[1] == "current") {
			list[i].classList.remove("current");
		}
	}
	this.classList.add("current");
});