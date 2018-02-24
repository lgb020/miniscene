mui.init({
	preloadPages: [{
		id: "bMusic",
		url: "../scene/music.html",
	}],
	preloadLimit: 10
});
mui.plusReady(function() {
	//获取传递过来模板的id
	var self = plus.webview.currentWebview();
	var id = self.tempId;
});

/*修改背景音乐*/
document.getElementById("back-music").addEventListener("tap", function() {
	mui.openWindow({
		id: "bMusic",
		show: {
			aniShow: "pop-in"
		}
	});
});