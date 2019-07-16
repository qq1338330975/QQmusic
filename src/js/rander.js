(function($,root){
    function randerImage(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('body'))
        }
    }
    function randerInfo(info){
        var str = '<div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>'
        $('.song-info').html(str);
    }
    function randerLike(lking){
        if(lking){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    function randerlist(data){
        var str = '';
        for(var i = 0; i < data.length; i++){
            str +='<li index = ' + i +'>'+ data[i].song + ' - ' + data[i].singer +'</li>'
        } 
        $('.chage-list ul').html(str);
        $('.chage-list li:nth-of-type('+ (index + 1) +')').css('color','red');
    }
    root.rander = function(data){
        randerImage(data.image);
        randerInfo(data);
        randerLike(data.isLike);
    }
    root.randerlist = randerlist;
})(window.Zepto , window.player || (window.player = {}))