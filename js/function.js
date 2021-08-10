$(function () {
    
    //로딩 애니메이션
    $(".loading > ol").fadeOut();
    $(".loading").delay(350).fadeOut(1500, function(){
      $(this).remove();
    });

    const contTopVal = [];
    
    contTopVal[0] = $('.home').offset().top;
    contTopVal[1] = $('.cont1').offset().top;
    contTopVal[2] = $('.cont2').offset().top;
    contTopVal[3] = $('.cont3').offset().top;
    contTopVal[4] = $('.cont4').offset().top;
    
    console.log('contTopVal =', contTopVal);

    const moveFn = function (idx) {
      $('html,body').stop().animate({ scrollTop: contTopVal[idx] });
    };

    // 스크롤하면 중간부터 header fixed
    $(window).on('scroll', function(){
      
      let $header = $('header');
      let scrollH = $(this).scrollTop();//현재의 스크롤 탑 값
      
      //헤더가 걸리는 코드부분
      if(scrollH > $('.home').height()){			
        $header.addClass('n-fixed');
        $('.cont1').css({
          'margin-top':$header.height()
        });
      }else{			
        $header.removeClass('n-fixed');
        $('.cont1').css({
          'margin-top':0
        });
      }
    });
  

    const $gnb = $('header>.header-container > nav > .gnb > li > a');
    let nowIdx = 0;

    // nav(>.gnb)에 대한 click 이벤트 구문
    $gnb.on('click', function (evt) {
        evt.preventDefault();

        $(this).parent().addClass('on').siblings().removeClass('on');

        nowIdx = $gnb.index(evt.currentTarget);

        moveFn(nowIdx);
    });

    // window에 대한 scroll 이벤트 구문
    $(window).on('scroll', function(){
        
        //현재시점 스크롤바의 top값을 추출
        const scrollTop = $(window).scrollTop();

        // console.log(scrollTop);

        for(let i=0;i<5;i++){      
            if(scrollTop >= contTopVal[i]-200){
                //네비게이션 활성화표시
                $gnb.eq(i).parent().addClass('on').siblings().removeClass('on');
            }else if(scrollTop < contTopVal[0]-66){
                $gnb.parent().removeClass('on');
            }      
        }
    });

    // .logo에 대한 click 이벤트 구문
    $('header > .header-container > .logo> a').on('click', function(evt){
        evt.preventDefault();
        $('html,body').stop().animate({scrollTop:0});
    });

    $('footer > .footlogo > a ').on('click', function(evt){
        evt.preventDefault();
        $('html,body').stop().animate({scrollTop:0});
    });

    // load 이벤트는 화면에 내용이 나타난 시점에 발생
    $(window).on('load', function(){

        // 이벤트 강제발생 API
        $('header > .header-container > .logo> a').trigger('click');
    });

    // .share에 대한 click 이벤트 구문
    $('header >.header-container > .share ').on('click', function () {
        alert('공유하기~!');
    });


    // ---------cont1 영역---------
    const $fade = $('.cont1 > .visual > .visual-container > li');
    const $indicator = $('.cont1 > .visual > .visual-pagination > li > a');
    const $btnPrev = $('.cont1 > .navigation > .cont1-prev');
    const $btnNext = $('.cont1 > .navigation > .cont1-next');

    let fadeIdx = 0;

    const fadeFn = function(){
      $fade.filter('.on').stop().fadeOut(600).removeClass('on');

      $fade.eq(fadeIdx).stop().fadeIn(600).addClass('on');

      $indicator.eq(fadeIdx).parent().addClass('on').siblings().removeClass('on');
    };

    $indicator.on('click', function(evt){
      evt.preventDefault();

      fadeIdx = $indicator.index(this);

      fadeFn();
    });

    // 이전버튼
    $btnPrev.on('click', function(evt){
      evt.preventDefault();

      if(fadeIdx>0){
        fadeIdx--;
      }else{
        fadeIdx=3;
      }

      fadeFn();
    });

    // 다음버튼
    $btnNext.on('click', function(evt){
      evt.preventDefault();

      if(fadeIdx<3){
        fadeIdx++;
      }else{
        fadeIdx=0;
      }

      fadeFn();
    });

    // auto play
    const $btnAuto = $('.cont1 > .visual > .auto-play');

    let intervalKey;

    $btnAuto.on('click', function(evt){
      evt.preventDefault();
      
      if($(this).hasClass('pause')){
        clearInterval(intervalKey);
        $(this).removeClass('pause');
        
      }else{
        autoPlay();
        $(this).addClass('pause');
      }
    });

    // 자동재생
    const autoPlay = function(){
      intervalKey = setInterval(function(){

        if(fadeIdx<3){
          fadeIdx++;
        }else{
          fadeIdx=0;
        }
    
        fadeFn();
      },3000);
    };

    $(window).on('load', function(){
      autoPlay();
    });
    
    // cont1 - fade부분 a 기본기능 방지
    $fade.children('a').on('click', function(evt){
      evt.preventDefault();
    });

    // cont1 - article
    const $bestView = $('.cont1 > .all > .all-text > .th');
    $bestView.on('mouseover', function(){
        $(this).next('p').stop().slideDown();
    });
    $bestView.on('mouseout', function(){
        $(this).next('p').stop().slideUp();
    });

    
    // ---------cont3 영역---------

    // cont3 - thumbs에 대한 click 이벤트 구문
    const $thumbs = $('.cont3 > .leisure > .thumbs > li > a');
    const $screen = $('.cont3 > .leisure > .screen');
    let imgSrc = '';
    $thumbs.on('click', function(evt){
        evt.preventDefault();
        
        imgSrc = $(this).attr('href');
        // $screen bgi 값 변경
        $screen.css({
            backgroundImage: 'url('+imgSrc+')'
        });
        
        $(this).parent().addClass('on').siblings().removeClass('on');
    });

    // cont3 - .screen>a의 기본기능 방지
    $('.cont3 > .leisure > .screen > a').on('click', function(evt){
        evt.preventDefault();
    });


    // top 버튼에 대한 click 이벤트 구문
    $('.top').on('click', function(){
        $('html,body').stop().animate({scrollTop:0});
    });

    $(window).scroll(function(){
        if($(this).scrollTop() < 1){
        $('.top').fadeOut();
        }else{
        $('.top').fadeIn();
        }
    });
    $('.top').click(function() {
        $('html, body').animate({
        scrollTop: 0
        }, 200);
        return false;
    });

    // footer 영역
    // 단양 기타관광
    $('footer > .danyang_travel > a').click(function(evt) {
      evt.preventDefault();
      $('footer > .danyang_travel > .dtmnu').slideToggle(300);
    })
});