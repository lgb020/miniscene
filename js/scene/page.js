mui.init({
	pullRefresh: {
		container: ".info",
		up: {
			height: 50,
			auto: true,
			contentrefresh: "正在加载...",
			contentnomore: '没有更多数据了',
			callback: moreInfo
		}
	}
});

var count = 0;
function moreInfo() {
	setTimeout(function() {
		mui("#info").pullRefresh().endPullup((++count > 2));
		var info = document.body.querySelector(".list");
		var list = document.body.querySelectorAll(".list .cover");
		for(var i = 0; i < list.length; i++) {
			var div = document.createElement("div");
			switch(i % 3) {
				case 0:
					div.className = "cover";
					break;
				case 1:
					div.className = "cover add";
					break;
				default:
					div.className = "cover right";
					break;
			}
			div.innerHTML = "<img src='../img/cover.jpg' />";
			info.appendChild(div);
		}
	}, 2000);
}