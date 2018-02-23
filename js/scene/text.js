mui.init();

window.onload = function() {
	initFont();
	initAnimate();
}

var size = new Swiper(".size .swiper-container", {
	slidesPerView: 8.5,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var color = new Swiper(".color .swiper-container", {
	slidesPerView: 8.5,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var animate = new Swiper(".animate .swiper-container", {
	slidesPerView: 5.5,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var text = angular.module("text", []);
text.controller("add", function($scope) {
	$scope.fontSize = "16px";
	$scope.fontColor = "#000000";
	$scope.fontAlign = "center";
	$scope.aEffect = "fadeIn animated"; //动画效果
	$scope.aDuration = 1; //动画持续时间
	$scope.aDelay = 0.5; //动画延迟时间
	$scope.pageIndex = -1; //页面下标
	$scope.sIndex = -1; //素材下标

	$scope.fontArray = new Array("12", "13", "14", "16", "18", "20", "24", "28", "32", "48", "64");
	$scope.colorArray = new Array("#FFFFFF", "#FFFFE0", "#FFFACD", "#F5DEB3", "#FFE4B5", "#DEB887", "#CD853F", "#FFA07A", "#FF7F50", "#FF6347", "#FF4500", "#FA8072", "#FFB6C1", "#FFC0CB", "#F08080", "#CD5C5C", "#FF0000", "#EEE8AA", "#F0E68C", "#DAA520", "#FFA500", "#FF8C00", "#F4A460", "#8B4513", "#87CEEB", "#00BFFF", "#4682B4", "#7B68EE", "#483D8B", "#0000FF", "#00008B", "#DDA0DD", "#EE82EE", "#FF00FF", "#8B008B", "#800080", "#DCDCDC", "#C0C0C0", "#A9A9A9", "#808080", "#000000");
	$scope.animateArray = new Array("无动画", "弹入", "左弹入", "右弹入", "上弹入", "下弹入", "淡入", "上淡入", "下淡入", "左淡入", "右淡入", "淡出", "翻转", "水平翻", "垂直翻", "旋转", "左旋入", "右旋入", "下滑入", "上滑入", "左滑入", "右滑入", "放大");
	$scope.aniValue = new Array("none", "bounceIn", "bounceInLeft", "bounceInRight", "bounceInDown", "bounceInUp", "fadeIn", "fadeInDown", "fadeInUp", "fadeInLeft", "fadeInRight", "fadeOut", "flip", "flipInX", "flipInY", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn");

	//设置字体大小
	$scope.setSize = function(index) {
		$scope.fontSize = $scope.fontArray[index] + "px";
		//排他法选中
		var sOption = document.body.querySelectorAll(".size .option");
		for(var i = 0; i < sOption.length; i++) {
			if(sOption[i].classList.contains("check")) {
				sOption[i].classList.remove("check");
			}
		}
		sOption[index].classList.add("check");
	}

	//设置字体颜色
	$scope.setColor = function(index) {
		$scope.fontColor = $scope.colorArray[index];
		var cOption = document.body.querySelectorAll(".color .bg");
		for(var i = 0; i < cOption.length; i++) {
			if(cOption[i].classList.contains("check")) {
				cOption[i].classList.remove("check");
			}
		}
		cOption[index].classList.add("check");
	}

	//设置字体位置
	$scope.setAlign = function(index) {
		switch(index) {
			case 0:
				$scope.fontAlign = "left";
				break;
			case 1:
				$scope.fontAlign = "center";
				break;
			case 2:
				$scope.fontAlign = "right";
				break;
			default:
				break;
		}
		var aOption = document.body.querySelectorAll(".align .option");
		for(var i = 0; i < aOption.length; i++) {
			if(aOption[i].classList.contains("check")) {
				aOption[i].classList.remove("check");
			}
		}
		aOption[index].classList.add("check");
	}

	//设置字体动画
	$scope.setAnimate = function(index) {
		var value = $scope.aniValue[index] + " animated";
		$scope.aEffect = value;
		var aOption = document.body.querySelectorAll(".animate .swiper-slide");
		for(var i = 0; i < aOption.length; i++) {
			if(aOption[i].classList.contains("check")) {
				aOption[i].classList.remove("check");
			}
		}
		aOption[index].classList.add("check");
		//添加动画时显示滑块
		var rang = document.body.querySelectorAll(".animate .rang");
		if(index > 0 && index <= $scope.animateArray.length - 1) {
			for(var i = 0; i < rang.length; i++) {
				rang[i].style.display = "block";
			}
		} else {
			for(var i = 0; i < rang.length; i++) {
				rang[i].style.display = "none";
			}
		}
	}

	//修改字体的参数
	window.addEventListener("initText", function(event) {
		$scope.pageIndex = event.detail.pageIndex; //页面下标
		$scope.sIndex = event.detail.index; //素材下标
		$scope.value = event.detail.value; //文本值
		$scope.fontSize = event.detail.fontSize; //大小
		$scope.fontColor = event.detail.color; //颜色
		$scope.fontAlign = event.detail.align; //位置
		var aEffect = event.detail.ani_name; //动画
		$scope.aEffect = aEffect + " animated";
		var duration = event.detail.ani_duration; //动画时间
		var delay = event.detail.ani_delay; //延迟时间
		$scope.aDuration = parseFloat(duration.substr(0, duration.length - 1));
		$scope.aDelay = parseFloat(delay.substr(0, delay.length - 1));
		$scope.$apply();
		//修改字体大小
		var font = $scope.fontSize.substr(0, $scope.fontSize.length - 2);
		var sOption = document.body.querySelectorAll(".size .option");
		for(var i = 0; i < sOption.length; i++) {
			if(sOption[i].classList.contains("check")) {
				sOption[i].classList.remove("check");
			}
		}
		for(var i = 0; i < $scope.fontArray.length; i++) {
			if(font == $scope.fontArray[i]) {
				sOption[i].classList.add("check");
			}
		}
		//修改字体颜色
		var cOption = document.body.querySelectorAll(".color .bg");
		for(var i = 0; i < cOption.length; i++) {
			if(cOption[i].classList.contains("check")) {
				cOption[i].classList.remove("check");
			}
		}
		//修改字体位置
		switch($scope.fontAlign) {
			case "left":
				$scope.setAlign(0);
				break;
			case "center":
				$scope.setAlign(1);
				break;
			case "right":
				$scope.setAlign(2);
				break;
			default:
				break;
		}
		//修改动画时间
		document.getElementById("duration-val").innerHTML = duration;
		document.getElementById("delay-val").innerHTML = delay;
		//修改动画
		var aOption = document.body.querySelectorAll(".animate .swiper-slide");
		for(var i = 0; i < aOption.length; i++) {
			if(aOption[i].classList.contains("check")) {
				aOption[i].classList.remove("check")
			}
		}
		for(var i = 0; i < $scope.aniValue.length; i++) {
			if($scope.aniValue[i] == aEffect) {
				aOption[i].classList.add("check");
				var rang = document.body.querySelectorAll(".animate .rang");
				if(i==0){
					for(var i = 0; i < rang.length; i++) {
						rang[i].style.display = "none";
					}
				}else{
					for(var i = 0; i < rang.length; i++) {
						rang[i].style.display = "block";
					}
				}
			}
		}
	});

	//确定后返回编辑页面
	mui("body").on("tap", ".ensure", function() {
		var value = document.getElementById("text").value;
		if(value != "" && value != " ") {
			//获取样式参数
			var elem = document.getElementById("example");
			var fontSize = getCss(elem, "font-size");
			var color = getCss(elem, "color");
			var align = getCss(elem, "text-align");
			var ani_delay = getCss(elem, "animation-delay");
			var ani_duration = getCss(elem, "animation-duration");
			var ani_name = getCss(elem, "animation-name");
			var view = plus.webview.getWebviewById("issue");
			mui.fire(view, "getText", {
				pageIndex: $scope.pageIndex,
				sIndex: $scope.sIndex,
				value: value,
				fontSize: fontSize,
				color: color,
				align: align,
				ani_delay: ani_delay,
				ani_duration: ani_duration,
				ani_name: ani_name
			});
		}
		$scope.pageIndex=-1;
		$scope.sIndex=-1;
		mui.back();
	});
});

//初始化字体
var initFont = function() {
	var initSize = document.body.querySelectorAll(".size .option");
	initSize[3].classList.add("check");
}

//初始化动画,默认无动画
var initAnimate = function() {
	var aOption = document.body.querySelectorAll(".animate .swiper-slide");
	aOption[0].classList.add("check");
}

//滑块
var rangeList = document.querySelectorAll("input[type='range']");
for(var i = 0, len = rangeList.length; i < len; i++) {
	rangeList[i].addEventListener("input", function() {
		document.getElementById(this.id + "-val").innerHTML = this.value + "s";
	});
}

//获取相关CSS属性
var getCss = function(elem, key) {
	return window.getComputedStyle(elem)[key];
};