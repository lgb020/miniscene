mui.init();

var animate = new Swiper(".animate .swiper-container", {
	slidesPerView: 5.5,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var text = angular.module("edit", []);
text.controller("editImg", function($scope) {
	$scope.animateArray = new Array("无动画","淡入", "弹入", "左弹入", "右弹入", "上弹入", "下弹入", "上淡入", "下淡入", "左淡入", "右淡入", "淡出", "翻转", "水平翻", "垂直翻", "旋转", "左旋入", "右旋入", "下滑入", "上滑入", "左滑入", "右滑入", "放大");
	$scope.aniValue = new Array("none","fadeIn", "bounceIn", "bounceInLeft", "bounceInRight", "bounceInDown", "bounceInUp", "fadeInDown", "fadeInUp", "fadeInLeft", "fadeInRight", "fadeOut", "flip", "flipInX", "flipInY", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn");
	$scope.aEffect = "fadeIn"; //动画效果
	$scope.aDuration = 0.5; //动画持续时间
	$scope.aDelay = 0.5; //动画延迟时间
	$scope.opacity = 0.8; //透明度
	//设置图片动画
	$scope.setAnimate = function(index) {
		$scope.aEffect = $scope.aniValue[index];
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
	
	//接收图片的参数
	window.addEventListener("initImg", function(event) {
		$scope.pageIndex = event.detail.pageIndex; //页面下标
		$scope.sIndex = event.detail.index; //素材下标
		$scope.content = event.detail.value; //图片链接
		$scope.width = event.detail.width;
		$scope.height = event.detail.height;
		$scope.top = event.detail.top;
		$scope.left = event.detail.left;
		$scope.opacity = parseFloat(event.detail.opacity); //素材透明度
		$scope.aEffect = event.detail.ani_name; //动画
		var duration = event.detail.ani_duration; //动画时间
		var delay = event.detail.ani_delay; //延迟时间
		$scope.aDuration = parseFloat(duration.substr(0, duration.length - 1));
		$scope.aDelay = parseFloat(delay.substr(0, delay.length - 1));
		$scope.$apply();
		//修改动画时间透明度
		document.getElementById("duration-val").innerHTML = $scope.aDuration;
		document.getElementById("delay-val").innerHTML = $scope.aDelay;
		document.getElementById("opacity-val").innerHTML = $scope.opacity;
		//修改动画
		var aOption = document.body.querySelectorAll(".animate .swiper-slide");
		for(var i = 0; i < aOption.length; i++) {
			if(aOption[i].classList.contains("check")) {
				aOption[i].classList.remove("check")
			}
		}
		for(var i = 0; i < $scope.aniValue.length; i++) {
			if($scope.aniValue[i] == $scope.aEffect) {
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
		var view = plus.webview.getWebviewById("issue");
		mui.fire(view, "editImg", {
			pageIndex: $scope.pageIndex,
			sIndex: $scope.sIndex,
			content: $scope.content,
			width: $scope.width,
			height: $scope.height,
			top: $scope.top,
			left: $scope.left,
			opacity: $scope.opacity,
			ani_name: $scope.aEffect,
			ani_delay: $scope.aDelay+"s",
			ani_duration: $scope.aDuration+"s",
		});
		mui.back();
	});
});

//滑块
var rangeList = document.querySelectorAll("input[type='range']");
for(var i = 0, len = rangeList.length; i < len; i++) {
	rangeList[i].addEventListener("input", function() {
		document.getElementById(this.id + "-val").innerHTML = this.value;
	});
}

//获取相关CSS属性
var getCss = function(elem, key) {
	return window.getComputedStyle(elem)[key];
};