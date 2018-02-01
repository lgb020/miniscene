mui.init();
mui.plusReady(function() {
	//获取传递过来模板的id
	var self = plus.webview.currentWebview();
	var id = self.tempId;
});

/*修改背景音乐*/
document.getElementById("back-music").addEventListener("tap", function() {
	mui.openWindow({
		id: "bMusic",
		url: "../music/back-music.html",
		extras: {
			account: "1083178465@qq.com",
			temp_id:"1"
		}
	});
});