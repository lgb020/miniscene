mui.init({
	pullRefresh: {
		container:"#recommend",
		up: {
			height: 50,
			auto: true,
			contentrefresh: "正在加载...",
			contentnomore: "没有更多数据了",
			callback: moreInfo
		}
	}
});

var swiper = new Swiper(".swiper-container", {
	slidesPerView: 2.5,
	spaceBetween: 4
});

var store = function(id) {
	mui.openWindow({
		id: "store",
		url: "../about/store.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
}

/*加载更多*/
var count = 0;
function moreInfo() {
	setTimeout(function() {
		mui("#recommend").pullRefresh().endPullup((++count > 2));
		var list = document.body.querySelector(".list");
		var info = document.body.querySelectorAll(".list .detail");
		for(var i = 0; i < info.length; i++) {
			var div = document.createElement("div");
			if(i%2==0){
				div.className = "detail";
			}else{
				div.className = "detail add";
			}
			div.innerHTML = "<div class='photo'><img src='../img/photo.jpg' /></div>"+
				"<div class='info'><span class='name'>三里墩小店</span>"+
				"<span class='belief'>模板：5&nbsp;&nbsp;被采用：25次</span></div>";
			list.appendChild(div);
		}
	}, 2000);
}