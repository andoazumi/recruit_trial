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

  // メニューボタンのことを書く
  function menuBtn(){

    // 鈴木さんが作ってくださった、js記述のメニューボタン
    let getMenuBtn = document.querySelector('.menu-btn');
    const headerElm = document.querySelector('header');
    // 取得したheader要素を代入
    
    const htmlEl = document.documentElement;
    // 取得したドキュメントのルート(最上位)の要素、すなわちすなわちhtml要素を代入
    
    let bbb = $(".menu-btn");
    getMenuBtn.addEventListener('click', function (event) {
      event.preventDefault(); // aタグなどのhtmlのデフォルトの動作をストップ
      console.log('Click');
      // headerElm.classList.toggle('on');
      // headerElm.classList.add('on'); // クラスをつける
      // headerElm.classList.remove('on');  // クラスをとる
      
      // if文のもの作成
      // if(headerElm.classList.contains('on')){
        //   // header要素に「on」というクラスがあるとき
        
        //   headerElm.classList.remove('on');
        //   // header要素から「on」というクラスを削除
        
        //   htmlEl.classList.remove('scroll-stop');
        //   // html要素から「scroll-stop」というクラスを削除
        
        // }else{
          //   // header要素に「on」というクラスがないとき
          
          //   headerElm.classList.add('on');
          //   // header要素から「on」というクラスをつける
          
          //   htmlEl.classList.add('scroll-stop');
          //    // html要素から「scroll-stop」というクラスをつける
          // }
          
          if(htmlEl.classList.contains('on')){
            // html要素に「on」というクラスがあるとき
            
            htmlEl.classList.remove('on');
            // html要素から「on」というクラスを削除
            
            // htmlEl.classList.remove('scroll-stop');
            // // html要素から「scroll-stop」というクラスを削除
            
          }else{
            // html要素に「on」というクラスがないとき
            
            htmlEl.classList.add('on');
            // html要素から「on」というクラスをつける
            
            // htmlEl.classList.add('scroll-stop');
            //  // html要素から「scroll-stop」というクラスをつける
          }
          
        })
   }
        
  // モーダルのことを書く
  function settingModal(){
    console.log('wa');
    const openModal = document.querySelectorAll('.product-content');
    // クリックしたらモーダルが展開する箇所すべて
    // console.log(openModal);
    // 配列で四つ取れている

    const modalArea = document.querySelector('.p-product__modal-area');
    // モーダルのエリアを取得

    const overlay = document.querySelector('.p-product__modal-bg');
    // モーダルの黒い背景の箇所を取得

    const closeBtn = document.querySelector('.p-product__modal-cb')
    // モーダルの閉じるボタンを取得

    // product-content内をクリックしたら、is-showをつける
    openModal.forEach(function(elm){
      // forEachは与えられた関数を配列の各要素に対して一つずつ実行する。
      // console.log(elm);
      elm.addEventListener('click',function(){
        modalArea.classList.add('is-show');
      });
    });
    // openModal.addEventListener('click',function(){
    //   modalArea.classList.toggle('is-show');
    // },false);
    // 「openModal.addEventListener is not a function」て出る

    // モーダルの黒い背景の箇所をクリックしたら、is-showを外す
    overlay.addEventListener('click',function(){
      // modalArea.classList.toggle('is-show');
      // ↑参考にしたサイト元々にあったやつ
      modalArea.classList.remove('is-show');
    },false);

    // モーダルの閉じるボタンを押した時に、is-showを外す
    closeBtn.addEventListener('click',function(){
      modalArea.classList.remove('is-show');
    },false);

  }

  //スライダーのことを書く
  function settingSwiper(){

    // ////swiperのベース
    const swiperMain = new Swiper(".p-product__modal-swiper-main",{
      pagination: {
        el: '.swiper-pagination-main',
        type: 'fraction',
      },
      // navigation:{
        //   prevEL:".p-product__modal-main-prev",
        //   nextEl:".p-product__modal-main-next",
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      // //////swaiperの入れ子
      // const swiperSub = new Swiper(".p-product__modal-swiper-sub",{
        //   pagination: {
          //     el: '.swiper-pagination-sub',
          //     type: 'fraction',
          //   },
          //   navigation:{
            //     prevEl:".p-product__modal-sub-prev",
            //     nextEl:".p-product__modal-sub-next",
            //   }
            // });

        // //////

          // ////// コピペ改良
            // const modal = document.getElementById("modal");
          //   // モーダルを取得
        
            const openModalBtns = document.querySelectorAll(".product-content");
          //   // product-content(モーダルを表示するもの)を全て取得
        
            // const closeModalBtns = document.querySelectorAll(".p-product__modal-cb");
          //   // モーダルを閉じるボタン
            
        
        
          
          //   // product-contentをクリックしたとき
            openModalBtns.forEach((openModalBtn) => {

              openModalBtn.addEventListener("click",() => {
          //       // data-slide-indexに設定したスライド番号を取得
                const modalIndex = openModalBtn.dataset.slideIndex;
                swiperMain.slideTo(modalIndex);
                // modal.classList.add("is-active");
              });
            });
        
          // //   // モーダルを閉じるボタンをクリックしたとき
          //   closeModalBtns.forEach((closeModalBtn) => {
          //     closeModalBtn.addEventListener("click",() => {
          //       modal.classList.remove("is-active");
          //     });
          //   });
          // コピペ改良ここまで
          }
          

    
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
    const headerElm = document.querySelector('header');
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

    menuBtn();

    settingSwiper();

    settingModal();
    
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

  // 追従メニュー==========
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
              // .headerのところに「fixed」というクラスをつける
              
            }else{
              //もしスクロールした量がmvHeightを超ていない(mvHeightより上のところを表示している)時に行う
              
              $('.header').removeClass('fixed');
              // .headerのところから「fixed」というクラスを外す
            }
            
          }else{
            if($('.header').hasClass('fixed')){
              // .headerのところにもし「fixed」クラスがあったら

              $('.header').removeClass('fixed');
              // .headerのところから「fixed」クラスを外す
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

    
    // smoothスクロール==========
    $('a[href^="#"]').click(function(){
      // #で始まるa要素をクリックいた場合に処理
      // console.log('a','click');

      const htmlEl = document.documentElement;
      // 取得したドキュメントのルート(最上位)の要素、すなわちすなわちhtml要素を代入

      let positionAdjust = $('.header-wrapper').outerHeight();
      // 移動先の調整。ここの数でずらせる。ヘッダー分ずらしたいからヘッダーの高さを取ってくる
      // console.log(positionAdjust);

      let scrollSpeed = 400;
      // スクロールの速度(ミリ秒)

      let getHref = $(this).attr("href");
      // アンカーの値を取得。リンク先(href)を取得して代入
      // console.log(getHref); // #wrapperが入っていたら成功

      let landingTarget =$(getHref == '#' || getHref == "" ? 'html' : getHref);
      // 移動先を取得。リンク先(herf)のidを探して、targetに代入
      // console.log(aTarget);

      let landingPosition = landingTarget.offset().top - positionAdjust;
      // 移動先を調整。idの要素の位置をoffset()で取得してpositionに代入
      // console.log(landingPosition);

      $('body,html').animate({scrollTop:landingPosition}, scrollSpeed, 'swing');
      // スムーススクロール。linear(等速)またはswing(変速)

      if(htmlEl.classList.contains('on')){
        // html要素に「on」というクラスがあるとき
  
        htmlEl.classList.remove('on');
        // html要素から「on」というクラスを削除
      }

      return false;
    });

});

