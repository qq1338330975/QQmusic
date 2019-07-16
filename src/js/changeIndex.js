(function ($, root) {
    function Change() {
        root.number = 0;
    }
    Change.prototype = {
        changeIndex: function (num ,len , val,data,key) {
            // if(event == 'prev'){
            //     if(num == 0){
            //         root.number = len;
            //     }else{
            //         root.number--;
            //     }
            // }else if(event == 'next'){
            //     if(num == len){
            //         root.number = 0; 
            //     }else{
            //         root.number++;
            //     }
            // }
                if(key == 'true'){
                    root.number = (num + val + len) % len;//计算索引值
                }else{
                    root.number = num;
                }
                root.discTime = 0;
                console.log()
                root.rander(data[root.number]);//通过索引值渲染页面
                Audio.getAudio(data[root.number].audio);//点击切歌时获取重新获取歌曲信息
                changeplay(data);//切歌时判断状态和重置进度条和播放时间
                root.rotateChage();//切歌时旋转图片;
                $('.chage-list li').css('color','black');
                $('.chage-list li:nth-of-type('+ (root.number + 1) +')').css('color','red');
                duration = data[root.number].duration;
                return root.number;

        },
        changePlay : function(data){
            if(Audio.status == 'play'){
                cancelAnimationFrame(root.frameId);//切歌清除上一首的定时器
                handleTime.playTime(data);//开始下一首的定时器
                //这两条执行必须放这里，因为需要判断他如果是播放状态下切歌才让他自动开始定时器
                Audio.play();//立即播放
            }
            handleTime.totalTime(0, 'frist');
            root.curTimes = 0;
            root.discTime = 0;
            root.puaseTime = 0;
            $('.pro-top').css({
                'transform' : 'translateX(-100%)'
            })
            handleTime.totalTime(data[root.number].duration,'last');
            //切歌时更新歌曲时间和初始化播放时间和进度条
        },
        changeLike : function(data){
        data[root.number].isLike ? data[root.number].isLike = false : data[root.number].isLike = true;
        }
    }
    root.change = Change;
})(window.Zepto, window.player || (window.player = {}))