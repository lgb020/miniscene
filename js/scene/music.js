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

/*获取传递过来的用户名和模板id*/
var userName, id;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	userName = self.account;
	id = self.temp_id;
	
	/*初始化数据*/
	init_info();
	setTimeout(function() {
		musicLocation();
	},600);
});

/*获取更多的音乐信息*/
var count = 0;
function moreInfo() {
	setTimeout(function() {
		mui("#online").pullRefresh().endPullup((++count > 2));
		init_info();
	}, 2000);
}

function init_info() {
	var info = document.body.querySelector(".online");
	for(var i = 0; i < 10; i++) {
		var li = document.createElement("li");
		li.className = "mui-table-view-cell";
		li.innerHTML = "<span class='mui-pull-left title'>游玩好心情放松日系配乐</span>" +
			"<span class='mui-pull-right length'>01:46</span>" +
			"<input type='hidden' value='http://pic.ibaotu.com/00/34/92/50G888piC4XR.mp3'/>";
		info.appendChild(li);
	}
}

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
				li.innerHTML = "<span class='mui-pull-left title'>"+music_name+"</span>" +
					"<span class='mui-pull-right singer'>"+music_singer+"</span>" +
					"<input type='hidden' value='"+music_path+"'/>";
				location.appendChild(li);
			}
		}
		cursor.close();
	}

}

//搜索
document.getElementById("search").addEventListener("tap", function() {
	mui.openWindow({
		id:"mSearch",
		url: "./search.html"
	});
});


mui("body").on("tap", ".select", function() {
	mui.back();
});

//放回音乐停止播放
mui.back = function(){
	var audio = document.getElementById("music");
	audio.pause();
	plus.webview.hide(plus.webview.currentWebview(),"pop-out");
}

/*本地在线切换*/
var menu = document.getElementById("menu")
menu.addEventListener("tap", function() {
	var online = document.getElementById("online");
	var location = document.getElementById("location");
	var content = menu.innerHTML;
	if(content=="本地"){
		online.style.display = "none";
		location.style.display = "block";
		menu.innerHTML = "在线";
	}else{
		online.style.display = "block";
		location.style.display = "none";
		menu.innerHTML = "本地";
	}
});