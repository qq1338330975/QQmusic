!function(i,t){function a(){this.audio=new Audio,this.status="pause"}a.prototype={play:function(){this.audio.play(),this.status="play"},pause:function(){this.audio.pause(),this.status="pause"},getAudio:function(i){this.audio.src=i,t.repeat="no"},playTo:function(i,t){this.audio.currentTime=i}},t.audioManager=new a}(window.Zepto,window.player||(window.player={}));