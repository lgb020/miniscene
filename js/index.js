mui.init();

mui.plusReady(function() {
	var currentId = plus.webview.currentWebview().id;
	var group = new webviewGroup(currentId, {
		items: [{
			id: "recommend",
			url: "./template/recommend.html",
			extras: {},
			
		}, {
			id: "hot",
			url: "./template/hot.html",
			extras: {}
		}, {
			id: "company",
			url: "./template/company.html",
			extras: {}
		}, {
			id: "photo",
			url: "./template/photo.html",
			extras: {}
		}],
		onChange: function(obj) {
			var item = document.querySelector(".mui-control-item.mui-active");
			if(item) {
				item.classList.remove("mui-active");
			}
			document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")").classList.add("mui-active");
		}
	});
	mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
		var wid = this.getAttribute("data-wid");
		group.switchTab(wid);
	});
});

/*个人中心*/
document.getElementById("about").addEventListener("tap", function() {
	mui.openWindow({
		id: "aboutUs",
		url: "./about-us.html",
		show:{
			aniShow:"slide-in-left"
		}
	});
});

/*乐库*/
document.getElementById("music").addEventListener("tap", function() {
	mui.openWindow({
		id: "bMusic",
		url: "./music/back-music.html"
	});
});