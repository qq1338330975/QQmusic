(function ($, root) {
    function HandleTime() {
        root.puaseTime = 0;
    }

    //时间转化
    HandleTime.prototype = {
        totalTime: function (time, where) {
            time = parseInt(time);
            var min = 0;
            var second = 0;
            min = Math.floor(time / 60);
            second = time - min * 60;
            if (second < 10) {
                second = '0' + second;
            }
            if (min < 10) {
                min = '0' + min;
            }
            if (where == 'last') {
                $('.all-time').html(min + ':' + second);
            } else if (where == 'frist') {
                $('.cur-time').html(min + ':' + second);
            }
        },
        //更新时间
        playTime: function (data,p) {
            //获取初始时间
            var curTime = new Date().getTime();
            //更新当前时间
            frame = function () {
                // console.log(p,root.discTime);
                //用时间差进行渲染
                handleTime.totalTime(root.discTime, 'frist');
                root.frameId = requestAnimationFrame(frame);
                //获取当前的时间
                var nowTime = new Date().getTime();
                //获取时间差
                root.discTime = (nowTime - curTime) / 1000;
                if(p === undefined){
                    root.discTime =  root.discTime;
                }else{
                    root.discTime += p;
                }
               
                //更新当前进度
                
                if (Audio.status == 'play') {
                    root.discTime += root.puaseTime;
                    handleTime.barrun(data);
                    handleTime.totalTime(root.discTime, 'frist');
                }
            }
            frame();
            root.stopTime = function() {
                Audio.pause();
                root.discTime =  root.discTime - root.curTimes;
                clearInterval(timer);
                root.puaseTime = 0;
                cancelAnimationFrame(root.frameId);
                root.puaseTime = root.discTime;
                $(this).toggleClass('playing')
            }
        },
        //更新进度条
        barrun: function (data, per) {
            if (arguments[1] == undefined) {
                root.per = root.discTime * 100 / (data[root.number].duration);
            }else{
                root.per = per * 100;
            }
            $('.pro-top').css({
                'transform': 'translateX(' + (-100 + root.per) + '%)'
            })
        }
    }
    root.HandleTime = new HandleTime();
})(window.Zepto, window.player || (window.player = {}))