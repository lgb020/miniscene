mui.init({
	pullRefresh: {
		container: "#hotInfo",
		up: {
			height: 50,
			auto:true,
			contentrefresh: "正在加载...",
			contentnomore: "没有更多数据了",
			callback: moreInfo
		}
	}
});

var count = 0;

function moreInfo() {
	setTimeout(function() {
		mui('#hotInfo').pullRefresh().endPullup((++count > 2));
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
			div.innerHTML = "<img src='../img/cover.jpg' />" +
				"<span class='describes'>2018新年派对邀请函</span>" +
				"<span class='integral'><i class='iconfont icon-jifen'></i> 3</span>";
			info.appendChild(div);
		}
	}, 2000);
}

/*点击公司简介*/
document.getElementById("abstract").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "abstract" //扩展参数
		}
	});
});

/*点击企业文化*/
document.getElementById("culture").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "culture" //扩展参数
		}
	});
});

/*点击产品品牌*/
document.getElementById("goods").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "goods" //扩展参数
		}
	});
});

/*点击全部*/
document.getElementById("all").addEventListener("tap", function() {
	mui.openWindow({
		id: "tabInfo",
		url: "./tab-info.html",
		extras: {
			name: "all" //扩展参数
		}
	});
});

