(function ($, root) {
    function AudioManager() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
                this.audio.src = src;
                root.repeat = 'no';
        },
        playTo:function(time){
            this.audio.currentTime = time;
            // if(Audio.status == 'play'){
            //     cancelAnimationFrame(root.frameId);//切歌清除上一首的定时器
            //     handleTime.playTime(data,);//开始下一首的定时器
            // }
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}));