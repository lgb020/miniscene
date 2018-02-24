mui.init();

var userName = "";
mui.plusReady(function() {
	//获取传递过来的账号
	var self = plus.webview.currentWebview();
	userName = self.account;
});

//点击管理按钮
var setting = function(id, temp) {
	/**
	 * 原创的temp为true，兑换的temp为false
	 * 原创模板弹出菜单多了上架市场
	 */
	mui("#setting").popover("toggle");
	toggle(id, temp);
}

/**
 * 原创模板添加上架选项
 * 兑换模板移除上架选项
 */
var toggle = function(id, temp) {
	var setting = document.body.querySelector("#tab-list");
	document.body.querySelector("#tab-list").innerHTML = "";
	if(temp == true) {
		tab_putaway(id, setting);
		tab_list(id, setting);
	} else if(temp == false) {
		tab_list(id, setting);
	}
}

/*上架选项*/
var tab_putaway = function(id, elem) {
	var li = document.createElement("li");
	li.className = "mui-table-view-cell mui-media mui-col-xs-3";
	li.innerHTML = "<a href='#' onclick='putaway(" + id + ")'><span class='iconfont icon-dingdan'>" +
		"</span><div class='mui-media-body'>上架</div></a></li>";
	elem.insertBefore(li, setting.firstChild);
}

/*编辑选项*/
var tab_edit = function(id, elem) {
	var li = document.createElement("li");
	li.className = "mui-table-view-cell mui-media mui-col-xs-3";
	li.innerHTML = "<a href='#' onclick='editInfo(" + id + ")'><span class='iconfont icon-review'>" +
		"</span><div class='mui-media-body'>编辑</div></a></li>";
	elem.insertBefore(li, setting.firstChild);
}

/*设置选项*/
var tab_setting = function(id, elem) {
	var li = document.createElement("li");
	li.className = "mui-table-view-cell mui-media mui-col-xs-3";
	li.innerHTML = "<a href='#' onclick='setInfo(" + id + ")'><span class='iconfont icon-set'>" +
		"</span><div class='mui-media-body'>设置</div></a></li>";
	elem.insertBefore(li, setting.firstChild);
}

/*删除选项*/
var tab_delete = function(id, elem) {
	var li = document.createElement("li");
	li.className = "mui-table-view-cell mui-media mui-col-xs-3";
	li.innerHTML = "<a href='#' onclick='delInfo(" + id + ")'><span class='iconfont icon-delete'>" +
		"</span><div class='mui-media-body'>删除</div></a></li>";
	elem.insertBefore(li, setting.firstChild);
}

/*选项集合*/
var tab_list = function(id, elem) {
	tab_edit(id, elem);
	tab_setting(id, elem);
	tab_delete(id, elem);
}

/*上架,添加角标*/
var putaway = function(id) {
	var btnArray = ["上架", "取消"];
	mui.confirm("是否上架H5市场？", "", btnArray, function(e) {
		if(e.index == 0) {
			var elem = document.body.querySelector("#elem" + id);
			var i = document.createElement("i");
			i.className = "iconfont icon-jiaobiao";
			elem.insertBefore(i, elem.firstChild);
			mui.toast("上架成功");
		}
		//选项图层关闭
		mui("#setting").popover("toggle");
	});
}

//编辑模板信息
var editInfo = function(id) {
	//选项图层关闭
	mui("#setting").popover("toggle");
}

//设置模板信息
var setInfo = function(id) {
	mui.openWindow({
		id: "setTempl",
		url: "./set-templ.html",
		extras: {
			tempId: id
		},
		show: {
			aniShow: "pop-in"
		}
	});
	//选项图层关闭
	mui("#setting").popover("toggle");
}

//删除模板信息
var delInfo = function(id) {
	var btnArray = ["删除", "取消"];
	mui.confirm("是否删除该场景？", "", btnArray, function(e) {
		if(e.index == 0) {
			var currentList = document.body.querySelector("#elem" + id);
			currentList.parentNode.remove();
			mui.toast("删除成功");
		}
		//选项图层关闭
		mui("#setting").popover("toggle");
	});
}