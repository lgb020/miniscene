mui.init({
	pullRefresh: {
		container: "#info",
		up: {
			height: 50,
			auto: true,
			contentrefresh: "正在加载...",
			contentnomore: '没有更多数据了',
			callback: moreInfo
		}
	}
});

var swiper = new Swiper(".swiper-container", {
	slidesPerView: 3.8,
	spaceBetween: 10,
	resistanceRatio: 0,
	watchOverflow: true,
	observer: true,
	observeParents: true
});

var count = 0;

function moreInfo() {
	setTimeout(function() {
		mui("#info").pullRefresh().endPullup((++count > 2));
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
			div.innerHTML = "<img src='../img/cover.jpg' />";
			info.appendChild(div);
		}
	}, 2000);
}

var bg = angular.module("bg", []);
bg.controller("bgCon", function($scope) {
	$scope.originColor = new Array("#FFFFFF", "#9fb2c0", "#d3c3c4", "#a09aa6", "#8CC7B5", "#D1BA74", "#ECAD9E", "#F4606C", "#716f7d", "#314d58", "#000000");

});

mui("body").on("tap", "#issue", function(e) {
	galleryImg();
});

//本地相册选择
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("background.png", {}, function(file) {
					file.remove(function() {
						entry.copyTo(root, "background.png", function(e) {
							var img = e.fullPath + "?version=" + new Date().getTime();
							cropeImg(img);
						});
					});
				}, function() {
					entry.copyTo(root, "background.png", function(e) {
						img = e.fullPath + "?version=" + new Date().getTime();
						cropeImg(img);
					});
				});
			})
		});
	})
};

var cropeImg = function(url){
	mui.openWindow({
		id: "crop",
		url: "./cropper.html",
		extras: {
			img : url
		},
		show:{
			aniShow:"slide-in-bottom"
		}
	});
}
