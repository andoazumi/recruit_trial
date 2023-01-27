import { debounce } from 'lodash-es';
import Stats from 'stats-js';

import Swiper, { Thumbs, Navigation, Pagination } from 'swiper';
import gsap from 'gsap';

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
  function menuBtn() {
    // 鈴木さんが作ってくださった、js記述のメニューボタン
    const getMenuBtn = document.querySelector('.menu-btn');
    const headerElm = document.querySelector('header');
    // 取得したheader要素を代入

    const htmlEl = document.documentElement;
    // 取得したドキュメントのルート(最上位)の要素、すなわちすなわちhtml要素を代入

    const bbb = $('.menu-btn');
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

      if (htmlEl.classList.contains('on')) {
        // html要素に「on」というクラスがあるとき

        htmlEl.classList.remove('on');
        // html要素から「on」というクラスを削除

        // htmlEl.classList.remove('scroll-stop');
        // // html要素から「scroll-stop」というクラスを削除
      } else {
        // html要素に「on」というクラスがないとき

        htmlEl.classList.add('on');
        // html要素から「on」というクラスをつける

        // htmlEl.classList.add('scroll-stop');
        //  // html要素から「scroll-stop」というクラスをつける
      }
    });
  }

  // モーダル関連処理一式
  function modal() {
    const modalEl = document.querySelector('[data-modal]');

    if (!modalEl) {
      return;
    }

    let scrolled = 0; // スクロール値を保存
    let offset = 0; // サムネイル下オフセット値を保存

    // メインカルーセル
    const carouselEl = modalEl.querySelector('[data-carousel]');
    const carouselMainEl = carouselEl.querySelector('[data-main]');
    const carousel = new Swiper(carouselMainEl, {
      modules: [Navigation, Pagination],
      wrapperClass: 'carousel-wrapper',
      slideClass: 'carousel-slide',
      slidesPerView: 1,
      allowTouchMove: false,
      loop: true,
      navigation: {
        prevEl: carouselEl.querySelector('[data-nav-prev]'),
        nextEl: carouselEl.querySelector('[data-nav-next]'),
      },
      pagination: {
        el: carouselEl.querySelector('[data-pagination]'),
        type: 'fraction',
      },
    });

    // パネル内カルーセル
    const panelsElms = modalEl.querySelectorAll('[data-panel]');
    panelsElms.forEach((panelEl) => {
      const imagesEl = panelEl.querySelector('[data-images]');

      const navEl = panelEl.querySelector('[data-nav]');
      const thumbsEl = navEl.querySelector('[data-thumbs]');

      const nav = new Swiper(thumbsEl, {
        slidesPerView: 4,
        slideToClickedSlide: true,
        spaceBetween: 10,
      });

      // eslint-disable-next-line no-new
      new Swiper(imagesEl, {
        modules: [Navigation, Pagination, Thumbs],
        slidesPerView: 1,
        loop: true,
        navigation: {
          prevEl: imagesEl.parentElement.querySelector('[data-image-prev]'),
          nextEl: imagesEl.parentElement.querySelector('[data-image-next]'),
        },
        pagination: {
          el: imagesEl.parentElement.querySelector('[data-image-pagination]'),
          type: 'fraction',
        },
        thumbs: {
          swiper: nav,
        },
      });

      const onResizePanel = () => {
        offset = thumbsEl.clientHeight;
        console.log(offset);

        carouselMainEl.style.paddingBottom = `${offset / 2}px`;
        // carouselMainEl.style.marginTop = `${-offset / 2}px`;

        navEl.style.bottom = `${-offset / 2}px`;
      };
      onResizePanel();

      window.addEventListener(EVENTS.RESIZE, debounce(onResizePanel, 200));
    });

    // モーダル開閉
    const openElms = document.querySelectorAll('[data-slide-index]');
    const closeElms = document.querySelectorAll('[data-modal-close]');
    openElms.forEach((openEl) => {
      openEl.addEventListener(EVENTS.CLICK, (e) => {
        e.preventDefault();
        if (modalEl.getAttribute('aria-hidden') === 'true') {
          scrolled = window.scrollY;

          carousel.slideTo(openEl.dataset.slideIndex, 0);
          gsap.to(modalEl, {
            autoAlpha: 1,
            onComplete: () => {
              document.body.style.overflow = 'hidden';
              modalEl.setAttribute('aria-hidden', 'false');
            },
          });
        }
      });
    });
    closeElms.forEach((closeElm) => {
      closeElm.addEventListener(EVENTS.CLICK, (e) => {
        e.preventDefault();
        if (modalEl.getAttribute('aria-hidden') === 'false') {
          document.body.style.overflow = '';
          window.scrollTo(0, scrolled);
          gsap.to(modalEl, {
            autoAlpha: 0,
            onComplete: () => {
              modalEl.setAttribute('aria-hidden', 'true');
            },
          });
        }
      });
    });
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

    modal();
  }
  window.addEventListener(EVENTS.LOAD, onLoad);
})();

// $(function(){

//   $(".menu-btn").on('click',function(){
//     $('header').toggleClass('on');
//   });

// });

$(function () {
  // htmlを読み込んでから

  // 追従メニュー==========
  function addFixed() {
    // 関数宣言

    const mvHeight = $('.mv').outerHeight();
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

    function fixedClass() {
      const scrollAmount = $(window).scrollTop();
      // console.log(scrollAmount);
      if (widthSize > 767) {
        // もしwidthSizeが767以上だったら行う
        // console.log('pc');

        if (scrollAmount > mvHeight) {
          // もしスクロールした量がmvHeightを超えた(mvHeightより下のところを表示している時)時に行う

          $('.header').addClass('fixed');
          // .headerのところに「fixed」というクラスをつける
        } else {
          // もしスクロールした量がmvHeightを超ていない(mvHeightより上のところを表示している)時に行う

          $('.header').removeClass('fixed');
          // .headerのところから「fixed」というクラスを外す
        }
      } else if ($('.header').hasClass('fixed')) {
        // .headerのところにもし「fixed」クラスがあったら

        $('.header').removeClass('fixed');
        // .headerのところから「fixed」クラスを外す
      }
    }

    $(window).resize(function () {
      // ウィンドウが変更されるごとに関数を実行
      widthSize = $(window).width();
      // 画面幅の数値をとる
      console.log(widthSize);
    });

    $(window).scroll(function () {
      fixedClass();
    });

    fixedClass();
  }

  addFixed();

  // smoothスクロール==========
  $('a[href^="#"]').click(function () {
    // #で始まるa要素をクリックいた場合に処理
    // console.log('a','click');

    const htmlEl = document.documentElement;
    // 取得したドキュメントのルート(最上位)の要素、すなわちすなわちhtml要素を代入

    const positionAdjust = $('.header-wrapper').outerHeight();
    // 移動先の調整。ここの数でずらせる。ヘッダー分ずらしたいからヘッダーの高さを取ってくる
    // console.log(positionAdjust);

    const scrollSpeed = 400;
    // スクロールの速度(ミリ秒)

    const getHref = $(this).attr('href');
    // アンカーの値を取得。リンク先(href)を取得して代入
    // console.log(getHref); // #wrapperが入っていたら成功

    const landingTarget = $(getHref == '#' || getHref == '' ? 'html' : getHref);
    // 移動先を取得。リンク先(herf)のidを探して、targetに代入
    // console.log(aTarget);

    const landingPosition = landingTarget.offset().top - positionAdjust;
    // 移動先を調整。idの要素の位置をoffset()で取得してpositionに代入
    // console.log(landingPosition);

    $('body,html').animate(
      { scrollTop: landingPosition },
      scrollSpeed,
      'swing'
    );
    // スムーススクロール。linear(等速)またはswing(変速)

    if (htmlEl.classList.contains('on')) {
      // html要素に「on」というクラスがあるとき

      htmlEl.classList.remove('on');
      // html要素から「on」というクラスを削除
    }

    return false;
  });
});
