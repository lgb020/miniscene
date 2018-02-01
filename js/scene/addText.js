mui.init();

//弹出软键盘
var nativeWebview, imm, InputMethodManager;
var initNativeObjects = function() {
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var Context = plus.android.importClass("android.content.Context");
		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	} else {
		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	}
};
var showSoftInput = function() {
	if(mui.os.android) {
		imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
	} else {
		nativeWebview.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
	}
	setTimeout(function() {
		var inputElem = document.querySelector("#text");
		inputElem.focus();
	}, 200);
};
mui.plusReady(function() {
	initNativeObjects();
	showSoftInput();
});

//确定后返回编辑页面
mui("body").on("tap", ".ensure", function() {
	var value = document.getElementById("text").value;
	if(value != "" && value != " ") {
		var view = plus.webview.getWebviewById("issue");
		mui.fire(view, "getText", {
			text: value
		});
	} else {
		mui.back();
	}
});