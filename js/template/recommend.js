mui.init();

mui("#slider").slider({
	interval: 3000
});

/*设计小店*/
document.getElementById("store").addEventListener("tap", function() {
	mui.openWindow({
		id: "storeAll",
		url: "../store/store_all.html"
	});
});

/*新建模板*/
document.getElementById("issue").addEventListener("tap", function() {
	mui.openWindow({
		id: "issue",
		url: "../issue.html",
		show:{
			aniShow:"slide-in-bottom"
		}
	});
});