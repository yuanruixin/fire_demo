// 摄像头部分的js 


let _this=this;
    //获得video摄像头区域
    let video = document.getElementById("video");
    function getMedia() {
        let constraints = {
            video: {width: 500, height: 500},
            audio: false
        };
        /*
        这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
        这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
        返回的是一个Promise对象。
        如果用户同意使用权限,则会将 MediaStream 对象作为resolve()的参数传给then()
        如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError 作为 reject()的参数传给catch()
        */
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then(function (MediaStream) {
			_this.MediaStreamTrack = typeof MediaStream.stop === 'function'?MediaStream:MediaStream.getTracks()[0];
            video.srcObject = MediaStream;
            video.play();
        }).catch(function (PermissionDeniedError) {
            console.log(PermissionDeniedError);
        })
    }
    function takePhoto() {
        //获得Canvas对象
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 500, 500);
    }
	function closeMedia() {
		this.MediaStreamTrack && this.MediaStreamTrack.stop();
	}
	function toBase64() {
        //获得Canvas对象
        let canvas = document.getElementById("canvas");
		//从画布上获取照片数据  
		var imgData = canvas.toDataURL();  
		//将图片转换为Base64  
		var base64Data = imgData.substr(22);
		console.log("base64Data:"+base64Data);
	}

let videoBtn = document.getElementById("video-btn")

videoBtn.onclick = function () {
    let flag = videoBtn.checked
    if (flag) {
        getMedia()
    }else{
        closeMedia()
    }
}
