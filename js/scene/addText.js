mui.init();

window.onload = function() {
	initFont();
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

var text = angular.module("text", []);
text.controller("add", function($scope) {
	$scope.fontSize = "16px";
	$scope.fontColor = "#000";
	$scope.fontPosition = "center";

	$scope.fontArray = new Array("12", "13", "14", "16", "18", "20", "24", "28", "32", "48", "64", "96");
	$scope.colorArray = new Array(
		"#FFFFFF", "#DCDCDC", "#F5F5DC", "#FAFAD2", "#FFFFE0", "#FFFACD", "#F5DEB3", "#FFE4B5", "#D2B48C", "#DEB887",
		"#CD853F", "#FFA07A", "#FF7F50", "#FF6347", "#FF4500", "#FA8072", "#FFB6C1", "#FFC0CB", "#F08080", "#CD5C5C",
		"#FF0000", "#EEE8AA", "#F0E68C", "#FFF8DC", "#DAA520", "#FFA500", "#FF8C00", "#F4A460", "#8B4513", "#4682B4",
		"#87CEEB", "#00BFFF", "#7B68EE", "#483D8B", "#0000FF", "#DDA0DD", "#EE82EE", "#FF00FF", "#8B008B", "#800080",
		"#00008B", "#C0C0C0", "#A9A9A9", "#808080", "#000000");

	//设置字体大小
	$scope.setSize = function(index) {
		$scope.fontSize = $scope.fontArray[index] + "px";
		//排他法选中
		var sOption = document.body.querySelectorAll(".size .option");
		for(var i = 0; i < sOption.length; i++) {
			sOption[i].classList.remove("check");
		}
		sOption[index].classList.add("check");
	}

	//设置字体颜色
	$scope.setColor = function(index) {
		$scope.fontColor = $scope.colorArray[index];
		var cOption = document.body.querySelectorAll(".color .bg");
		for(var i = 0; i < cOption.length; i++) {
			cOption[i].classList.remove("check");
		}
		cOption[index].classList.add("check");
	}

});

//初始化字体
var initFont = function() {
	var initSize = document.body.querySelectorAll(".size .option");
	initSize[3].classList.add("check");
}

//确定后返回编辑页面
mui("body").on("tap", ".ensure", function() {
	var value = document.getElementById("text").value;
	if(value != "" && value != " ") {
		var view = plus.webview.getWebviewById("issue");
		mui.fire(view, "getText", {
			text: value
		});
	}
	mui.back();
});