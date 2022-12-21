import { debounce } from 'lodash-es';
import Stats from 'stats-js';

import EVENTS from '~/constants/event-names';

(function () {
  /// /////////////////////////////////////////////////////// Performance Monitor
  const performanceMonitor = () => {
    const stats = new Stats();

    document.body.appendChild(stats.dom);

    function monitor() {
      stats.begin();
      stats.end();

      requestAnimationFrame(monitor);
    }

    requestAnimationFrame(monitor);
  };

  // 鈴木さんが作ってくださった、js記述のメニューボタン
  let aaa = document.querySelector('.menu-btn');
  const headerElm = document.querySelector('header');
  let bbb = $(".menu-btn");
  aaa.addEventListener('click', function (event) {
    event.preventDefault(); // aタグなどのhtmlのデフォルトの動作をストップ
    console.log('Click');
    // headerElm.classList.toggle('on');
    // headerElm.classList.add('on'); // クラスをつける
    // headerElm.classList.remove('on');  // クラスをとる

    // if文のもの作成
    if(headerElm.classList.contains('on')){
      headerElm.classList.remove('on');
    }else{
      headerElm.classList.add('on');
    }
  })

  /// /////////////////////////////////////////////////////// Resize
  // ccc = 要素高さ;
  function onResize() {
    // キービジュアルの高さをとる

    // ccc = 要素高さ;

    // スクロールの数値をとる

    // キービジュアルの高さを越えたらクラスをつける

    // 

  }
  window.addEventListener(EVENTS.RESIZE, debounce(onResize, 200));

  /// /////////////////////////////////////////////////////// Scroll
  function onScroll() {
    const kkk = headerElm.clientHeight;
    console.log(kkk);
  }
  window.addEventListener(EVENTS.SCROLL, debounce(onScroll, 200));

  /// /////////////////////////////////////////////////////// Load
  function onLoad() {
    // development
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor();
    }


    
  }
  window.addEventListener(EVENTS.LOAD, onLoad);
})();

// $(function(){

//   $(".menu-btn").on('click',function(){
//     $('header').toggleClass('on');
//   });

// });

$(function(){
  // htmlを読み込んでから

  
  function addFixed(){
    // 関数宣言

    let mvHeight = $('.mv').outerHeight();
    // キービジュアルの高さをとる
    // console.log(mvHeight);
    
    let widthSize = $(window).width();
    // 画面幅の数値をとる
    // console.log(widthSize);


    // 間違っているゾーン
    // if (width => 768){
      //        ↑不等号の書き方が違う
      // if(window.matchMedia("(min-width: 768px)").matches){
        //     // 768px以上の時に行う。
        
        //     $(window).scroll(function(){
          //       // スクロールした時
          //       if ($(this).scrollTop() > mvHeight){
                       // 
            //         // キービジュアルの高さを越えたら
            //         $('.header').addClass('fixed');
            //         // クラスをつける
            //       }else{
              //         // キービジュアルの高さを越えていなかったら
              //         $('.header').removeClass('fixed');
              //         // クラスを外す
              //       }
              //     });
              //   }
        // $(window).scrollの位置がふさわしくない
        //  $(window).scrollが一度監視状態になるとずっと監視状態になってしまう
      
        function fixedClass(){
          let scrollAmount = $(window).scrollTop();
          // console.log(scrollAmount);
          if (widthSize > 767){
            // もしwidthSizeが767以上だったら行う
            // console.log('pc');
            
            if (scrollAmount > mvHeight ){
              //もしスクロールした量がmvHeightを超えた(mvHeightより下のところを表示している時)時に行う
              
              $('.header').addClass('fixed');
              // .headerに「fixed」というクラスをつける
              
            }else{
              //もしスクロールした量がmvHeightを超ていない(mvHeightより上のところを表示している)時に行う
              
              $('.header').removeClass('fixed');
              // .headerから「fixed」というクラスを外す
              
            }
            
          }
        }

       $(window).resize(function(){
            // ウィンドウが変更されるごとに関数を実行
            widthSize = $(window).width();
            // 画面幅の数値をとる
            console.log(widthSize);
        });

      $(window).scroll(function(){
        fixedClass();

      });

      fixedClass();

    }

    addFixed();

});

