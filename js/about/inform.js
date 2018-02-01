mui.init();

var userName = "";
mui.plusReady(function() {
	//获取传递过来的账号
	var self = plus.webview.currentWebview();
	userName = self.account;
});

/*左滑删除*/
(function($) {
	var btnArray = ["确认","取消"];
	$("#info").on("slideleft", ".mui-table-view-cell", function(event) {
		var elem = this;
		//删除元素的id
		console.log(elem.id);
		mui.confirm("确认删除该条记录？","",btnArray, function(e) {
			if(e.index == 0) {
				elem.parentNode.removeChild(elem);
				checkList();
			} else {
				setTimeout(function() {
					$.swipeoutClose(elem);
				}, 0);
			}
		});
	});
})(mui);

/*判断是否还有数据*/
var checkList = function(){
	var info = document.body.querySelectorAll("#info .mui-table-view-cell");
	var notice = document.getElementById("notice");
	if(info.length==0){
		//无数据
		notice.classList.remove("dispress");
	}
}
