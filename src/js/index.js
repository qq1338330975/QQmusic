var root = window.player;
var index = 0;
var len;
var Audio = root.audioManager;
var change = new root.change();//点击事件的处理中心
var chageIndex = change.changeIndex;//获取index处理事件
var changeplay = change.changePlay;//判断当前歌曲是否在播放状态，是的话切歌自动播放
var changelike = change.changeLike;//判断系否是喜爱的歌曲
var changetime = change.changetime;//切歌获取歌曲时长
var timer;
var dataDeg = $('.img-box').attr('data-deg');
var handleTime = root.HandleTime;
var duration = 0;
root.times = 0;
root.rotateChage = (function () {
    return function rotateChage() {
        if (Audio.status == 'pause') {
            clearInterval(timer);
            dataDeg = 0;
        } else {
            clearInterval(timer);
            rotated(0);
        }
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    }
})();
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            $('.chage-list li:nth-of-type(1)').css('color', 'red')
            console.log(data);
            handleTime.totalTime(data[0].duration, 'last');
            duration = data[0].duration;
            Audio.getAudio(data[0].audio);
            len = data.length;
            bindEvent(data);
            bindTouchEvent(data);
            root.rander(data[0]);
            root.randerlist(data);
            root.discTime = 0;
        },
        error: function () {
            console.log('error');
        }
    })
}

function bindEvent(dataList) {
    $('.prev').on('click', function () {
        index = chageIndex(index, len, -1, dataList,'true');
    })
    $('.next').on('click', function () {
        index = chageIndex(index, len, 1, dataList,'true');
    })
    $('.like').on('click', function () {
        changelike(dataList);
        $(this).toggleClass('liking')
    })
    $('.play').on('click', function () {
        $(this).toggleClass('playing')
        if (Audio.status == 'pause') {
            Audio.play();
            rotated(parseInt(dataDeg));
            handleTime.playTime(dataList,root.curTimes);
        } else {
            root.stopTime();
            // handleTime.totalTime(0, 'frist');
        }
    })
    $('.list').on('click', function () {
        $('.chage-list').css({
            'transform': 'translateY(0)'
        })
            .find('span').on('click', function () {
                $('.chage-list').css({
                    'transform': 'translateY(100%)'
                })
            })
            $('ul').on('click', function (e) {
                target = e.target;
                index = parseInt($(target).attr('index'));
                chageIndex(index, len , 0 , dataList,'false');
                
            })
    })
}
function bindTouchEvent(dataList){
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.slider').on('touchstart',function(e){
        Audio.pause();
        clearInterval(timer);
        cancelAnimationFrame(root.frameId);
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        root.curTimes = per * duration;
        if(per > 0 && per < 1){
            handleTime.barrun(dataList,per);
            handleTime.totalTime(root.curTimes, 'frist');
        }
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        root.curTimes = per * duration;
        handleTime.barrun(dataList,per);
        handleTime.totalTime(root.curTimes, 'frist');
        Audio.playTo(root.curTimes);
        Audio.play();
        rotated(parseInt(dataDeg));
        handleTime.playTime(dataList,root.curTimes);
        $('.play').addClass('playing')
    })
}
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function () {
        dataDeg = deg;
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 0.1s linear'
        })
    }, 110)
}
$(Audio.audio).on('ended',function(){
    $('.next').trigger('click');
})
getData('../mock/data.json');
//信息图片的渲染
//按钮的点击及其替换样式
//音频的切换
//进度条运动
//列表切歌
//图片旋转
