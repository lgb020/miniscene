var scene = angular.module("scene", []);
scene.controller("music", function($scope, $http) {
	//上拉加载
	mui.init({
		pullRefresh: {
			container: "#online",
			up: {
				height: 50,
				auto: true,
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了",
				callback: moreInfo
			}
		}
	});

	mui.plusReady(function() {
		//获取传递过来模板的id
		var self = plus.webview.currentWebview();
		$scope.sceneId = self.sceneId;
	});

	var root = "http://www.hsfeng.cn/";
	var page = 1; //当前页
	var count = 1; //总页数

	//页面初始化
	mui.plusReady(function() {
		init_info(1);
		setTimeout(function() {
			musicLocation();
		}, 600);
	});

	var init_info = function(page) {
		var info = document.body.querySelector(".online");
		$http({
			method: "GET",
			url: root + "music/info.html",
			params: {
				v: "1.0",
				page: page
			}
		}).then(function successCallback(response) {
			for(var i = 0; i < response.data.length; i++) {
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.innerHTML = "<span class='mui-pull-left title'>" + response.data[i].name + "</span>" +
					"<span class='mui-pull-right length'>" + response.data[i].length + "</span>" +
					"<input type='hidden' value='" + response.data[i].url + "'/>";
				info.appendChild(li);
			}
		});
	}

	//查询总页数
	$http({
		method: "GET",
		url: root + "music/count.html",
		params: {
			v: "1.0"
		}
	}).then(function successCallback(response) {
		count = response.data;
	});

	function moreInfo() {
		setTimeout(function() {
			++page;
			mui("#online").pullRefresh().endPullup(page >= count);
			init_info(page);
		}, 2000);
	}

	mui("body").on("tap", ".select", function() {
		var music = document.getElementById("music").src;
		var mTitle = document.querySelector(".current").childNodes[0].innerHTML;
		var id = document.getElementById("sceneId").value;
		if(music.indexOf("file://") == 0) {
			//本地文件,有问题
			var task = plus.uploader.createUpload(root+"music/upload.html", {
					method: "POST"
				},
				function(t, status) {
					console.log(t.responseText);
				}
			);
			task.addFile(music,{
				key: "music"
			});
			task.addData("v","1.0");
			task.addData("mTitle",mTitle);
			task.addData("id",id);
			task.start();
		} else {
			//更新链接
			$http({
				method: "GET",
				url: root + "music/update.html",
				params: {
					v: "1.0",
					id: id,
					music: music,
					mTitle: mTitle
				}
			}).then(function successCallback(response) {
				if(response.data == "1") {
					mui.back();
				}
			});
		}
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

//获取本地音乐
function musicLocation() {
	if(plus.os.name == "Android") {
		var Context = plus.android.importClass("android.content.Context");
		var ContentResolver = plus.android.importClass("android.content.ContentResolver");
		var Cursor = plus.android.importClass("android.database.Cursor");
		var Uri = plus.android.importClass("android.net.Uri");
		var MediaStore = plus.android.importClass("android.provider.MediaStore");
		var main = plus.android.runtimeMainActivity();
		//创建一个游标对象
		var context = main;
		var Uri = new Uri();
		Uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
		var resolver = new ContentResolver();
		resolver = context.getContentResolver();
		var cursor = new Cursor();
		cursor = resolver.query(Uri, null, null, null, null);
		cursor.moveToFirst();
		var location = document.body.querySelector(".location");
		if(cursor != null) {
			while(cursor.moveToNext()) {
				//扫描本地文件，得到歌曲的相关信息
				var music_name = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE));
				var music_singer = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
				var music_path = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.innerHTML = "<span class='mui-pull-left title'>" + music_name + "</span>" +
					"<span class='mui-pull-right singer'>" + music_singer + "</span>" +
					"<input type='hidden' value='" + music_path + "'/>";
				location.appendChild(li);
			}
		}
		cursor.close();
	}

}

//搜索
document.getElementById("search").addEventListener("tap", function() {
	mui.openWindow({
		id: "mSearch",
		url: "./search.html",
		show: {
			aniShow: "pop-in"
		}
	});
});

//返回音乐停止播放
mui.back = function() {
	var audio = document.getElementById("music");
	audio.pause();
	plus.webview.hide(plus.webview.currentWebview(), "pop-out");
}

/*本地在线切换*/
var menu = document.getElementById("menu")
menu.addEventListener("tap", function() {
	var online = document.getElementById("online");
	var location = document.getElementById("location");
	var content = menu.innerHTML;
	if(content == "本地") {
		online.style.display = "none";
		location.style.display = "block";
		menu.innerHTML = "在线";
	} else {
		online.style.display = "block";
		location.style.display = "none";
		menu.innerHTML = "本地";
	}
});