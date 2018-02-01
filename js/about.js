mui.init();

/*通知*/
document.getElementById("inform").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/inform.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});

/*我的模板*/
document.getElementById("templ").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/templ.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});

/*我的小店*/
document.getElementById("store").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/store.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});

/*会员信息*/
document.getElementById("member").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/member.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});

/*关于我们*/
document.getElementById("introduce").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/introduce.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});

/*设置*/
document.getElementById("setting").addEventListener("tap", function() {
	mui.openWindow({
		url: "./about/setting.html",
		extras: {
			account: "1083178465@qq.com" //账号
		}
	});
});