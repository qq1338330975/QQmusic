!function(m,n){function e(){n.puaseTime=0}e.prototype={totalTime:function(e,i){var a=0,t=0;(t=(e=parseInt(e))-60*(a=Math.floor(e/60)))<10&&(t="0"+t),a<10&&(a="0"+a),"last"==i?m(".all-time").html(a+":"+t):"frist"==i&&m(".cur-time").html(a+":"+t)},playTime:function(i,a){var t=(new Date).getTime();frame=function(){handleTime.totalTime(n.discTime,"frist"),n.frameId=requestAnimationFrame(frame);var e=(new Date).getTime();n.discTime=(e-t)/1e3,void 0===a?n.discTime=n.discTime:n.discTime+=a,"play"==Audio.status&&(n.discTime+=n.puaseTime,handleTime.barrun(i),handleTime.totalTime(n.discTime,"frist"))},frame(),n.stopTime=function(){Audio.pause(),n.discTime=n.discTime-n.curTimes,clearInterval(timer),n.puaseTime=0,cancelAnimationFrame(n.frameId),n.puaseTime=n.discTime,m(this).toggleClass("playing")}},barrun:function(e,i){n.per=null==i?n.per=100*n.discTime/e[n.number].duration:100*i,m(".pro-top").css({transform:"translateX("+(-100+n.per)+"%)"})}},n.HandleTime=new e}(window.Zepto,window.player||(window.player={}));