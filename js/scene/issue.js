mui.init({
	preloadPages: [ {
		id: "addPage",
		url: "/scene/page.html"
	},{
		id: "addText",
		url: "/scene/text.html"
	}, {
		id: "addImg",
		url: "/scene/img.html"
	}, {
		id: "addBg",
		url: "/scene/backg.html"
	}, {
		id: "addMusic",
		url: "/scene/music.html"
	}],
	preloadLimit: 5
});

var menu = new Swiper(".footer .swiper-container", {
	slidesPerView: 4.5,
	resistanceRatio: 0.5,
	watchOverflow: true
});

var swiper = new Swiper(".panel .swiper-container", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	resistanceRatio: 0,
	centeredSlides: true,
	watchOverflow: true,
	observer: true,
	observeParents: true,
	pagination: {
		el: ".swiper-pagination",
		type: "fraction",
	}
});

var app = angular.module("scene", []);
var status = "false"; //编辑状态默认为false
app.controller("issue", function($scope) {
	/**
	 * 构建页面对象数组
	 * 一个页面为一个数组，存放当前页素材对象
	 */
	$scope.scene = new Array(); //场景
	var page; //单个页面,存放素材对象
	var text; //文本素材对象
	var img; //图片素材对象

	//添加新页面
	$scope.addPage = function() {
		page = new Array();
		var index = swiper.activeIndex; //背景id
		page.bgUrl = "";
		page.areaId = "area" + index;
		$scope.scene.push(page);
	}
	
	//删除当前页
	$scope.delPage = function(){
		var index = swiper.activeIndex; //当前页面
		//删除
		$scope.scene.splice(index,1);
		console.log($scope.scene);
	}

	//添加模板
	mui("body").on("tap", ".addPage", function() {
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			mui.openWindow({
				id: "addPage",
				show: {
					aniShow: "pop-in"
				}
			});
		}
	});

	//添加文字
	mui("body").on("tap", ".addText", function() {
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			mui.openWindow({
				id: "addText",
				show: {
					aniShow: "pop-in"
				}
			});
		}
	});
	
	//文本添加
	window.addEventListener("getText", function(event) {
		var value = event.detail.value;
		var fontSize = event.detail.fontSize;
		var color = event.detail.color;
		var align = event.detail.align;
		var ani_delay = event.detail.ani_delay;
		var ani_duration = event.detail.ani_duration;
		var ani_name = event.detail.ani_name;
		if(value != "" && value != " ") {
			text = {};
			//获取当前操作的下标
			var index = swiper.activeIndex;
			if(index < $scope.scene.length) {
				var zIndex = $scope.scene[index].length;
				text.content = "<div class='text'>" + value + "</div>";
				text.className = "swiper-no-swiping scenc-text animated " + ani_name;
				text.divCss = "font-size:" + fontSize + ";color:" + color + ";text-align:" + align + ";";
				text.liCss = "z-index:" + zIndex  + ";animation-delay:" + ani_delay + ";animation-duration:" + ani_duration + ";";
				$scope.scene[index].push(text);
			}
			$scope.$apply(); //手动刷新
			status = "true"; //编辑状态改为true
		}
	});

	//添加图片
	/*$scope.addImg = function() {
		img = {};
		//获取当前操作的下标
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			var zIndex = $scope.scene[index].length;
			img.content = "<img src='img/photo.jpg'/>";
			img.className = "swiper-no-swiping scene-img";
			img.css = "z-index:" + zIndex + ";top: 100px;left:30px;";
			$scope.scene[index].push(img);
		}
		status = "true"; //编辑状态改为true
	}*/
	mui("body").on("tap", ".addImg", function() {
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			mui.openWindow({
				id: "addImg",
				show: {
					aniShow: "pop-in"
				}
			});
		}
	});
	
	//添加背景
	mui("body").on("tap", ".addBg", function() {
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			mui.openWindow({
				id: "addBg",
				show: {
					aniShow: "pop-in"
				}
			});
		}
	});
	
	//添加音乐
	mui("body").on("tap", ".addMusic", function() {
		var index = swiper.activeIndex;
		if(index < $scope.scene.length) {
			mui.openWindow({
				id: "addMusic",
				show: {
					aniShow: "pop-in"
				}
			});
		}
	});

	/**
	 * 实现素材点击后可拖拽
	 * id：拽素材的id
	 * rId：操作拖放点的id
	 * wId：操作宽度点的id
	 */
	$scope.check = function(pageId, index) {
		//排他法，触发选中
		var id = "inside" + pageId + index,
			rId = "drop" + pageId + index,
			wId = "width" + pageId + index;
		var all_bar = document.body.querySelectorAll(".bar");
		for(var i = 0; i < all_bar.length; i++) {
			all_bar[i].style.display = "none";
		}
		var bar = document.body.querySelectorAll("#" + id + " .bar");
		for(var i = 0; i < bar.length; i++) {
			bar[i].style.display = "block";
		}

		var elem = document.getElementById(id);
		drop(elem, pageId, index); //移动
		zoom(pageId, id, elem, rId, wId); //缩放
	}

	//删除素材
	$scope.del = function(pageId, index) {
		var pageIndex = pageId.substring(4);
		$scope.scene[pageIndex].splice(index, 1);
	}

	//修改素材传递参数
	$scope.edit = function(pageId, index) {
		var elemId = "inside" + pageId + index;
		var preantElem = document.getElementById(elemId);
		var result = preantElem.classList.contains("scenc-text");
		if(result) {
			var elem = preantElem.getElementsByTagName("div")[0];
			var pageIndex = pageId.substring("4");
			var value = elem.innerText;
			var fontSize = getCss(elem, "font-size");
			var color = getCss(elem, "color");
			var align = getCss(elem, "text-align");
			var ani_delay = getCss(elem, "animation-delay");
			var ani_duration = getCss(elem, "animation-duration");
			var ani_name = getCss(elem, "animation-name");
			var view = plus.webview.getWebviewById("addText");
			mui.fire(view, "initText", {
				pageIndex: pageIndex,
				index: index,
				value: value,
				fontSize: fontSize,
				color: color,
				align: align,
				ani_delay: ani_delay,
				ani_duration: ani_duration,
				ani_name: ani_name
			});
			view.show("slide-in-right"); //显示页面
		}
		$scope.apply();
	}

	/**
	 * 拖动
	 * @param {Object} hammer：hammer实例
	 * @param {Object} element：拖动对象
	 */
	var drop = function(element, pageId, index) {
		var hammer = new Hammer(element);
		element.style.top = getCss(element, "top");
		element.style.left = getCss(element, "left");
		var x = 0,
			y = 0;
		hammer.on("panstart", function(event) {
			x = parseInt(element.style.left);
			y = parseInt(element.style.top);
		});
		hammer.on("panmove", function(event) {
			element.style.top = y + event.deltaY + "px";
			element.style.left = x + event.deltaX + "px";
		});
		hammer.on("panend", function(event) {
			//拖动结束后获取基础样式，重构css
			var width = getCss(element, "width");
			var height = getCss(element, "height");
			var left = getCss(element, "left");
			var top = getCss(element, "top");
			var zIndex = getCss(element, "z-index");
			var pageIndex = pageId.substring("4");

			var elemCss = "width:" + width + ";height:" + height + ";left:" + left + ";top:" + top + ";z-index:" + zIndex + ";";
			$scope.scene[pageIndex][index].css = elemCss;
		});
	}

	/**
	 * 缩放，类名含有scene-img则为图片，按比例缩放，显示右下角操作点
	 * 没有则为文字，不按比例缩放，显示右下角，右上角，左下角操作点
	 */
	var zoom = function(index, id, elem, rId, wId) {
		if(elem.classList.contains("scene-img")) {
			var scale = new Resize(id, {
				Max: true,
				mxContainer: index,
				Scale: true
			});
			scale.Set(rId, "right-down");
			scale.Set(wId, "right-up");
		} else {
			var scale = new Resize(id, {
				Max: true,
				mxContainer: index
			});
			scale.Set(rId, "right-down");
			scale.Set(wId, "right-up");
		}
	}
});

//获取相关CSS属性
var getCss = function(elem, key) {
	return window.getComputedStyle(elem)[key];
};

//保存
var save = function() {
	console.log("保存");
}

/*
 * 调用$compile服务
 * 手动编译动态生成html代码中的指令
 */
app.directive("compile", function($compile) {
	return function(scope, element, attrs) {
		scope.$watch(
			function(scope) {
				return scope.$eval(attrs.compile);
			},
			function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			}
		);
	};
});

//返回
mui.back = function() {
	if(status == "true") {
		document.getElementById("widget").style.display = "block";
		document.getElementById("shade").style.display = "block";
	} else {
		var view = plus.webview.currentWebview();
		view.close("auto");
	}
}

//不保存
var bin = function() {
	cShade();
	var view = plus.webview.currentWebview();
	view.close("auto");
}

//弹窗保存
var toSave = function() {
	cShade();
	save();
}

//取消
var cShade = function() {
	document.getElementById("widget").style.display = "none";
	document.getElementById("shade").style.display = "none";
}