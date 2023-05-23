$(function () {

  $('.header-burger').on("click", function (e) {
    e.preventDefault();
    $('.header-main').toggleClass('active');
  })


  // 註冊ScrollTrigger, TextPlugin套件
  gsap.registerPlugin(ScrollTrigger, TextPlugin);


  let breakPoint = 768;
  let mm = gsap.matchMedia();


  mm.add({
    isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
    isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`
  }, (context) => {
    let { isDesktop, isMobile } = context.conditions;

    // -------------------------------------------------------------------> TODO: 第一屏
    const cloud = gsap.timeline({
      scrollTrigger: {
        trigger: ".section02", // 決定scrolltrigger要以哪一個元素作為觸發基準點
        // markers: true, // 開啟start & end標記點，單純方便瀏覽動畫開始與結束點
        scrub: true, //是否依賴視窗滾動
      },
    });


    cloud.to(['.cloud-left', '.cloud-right'], {
      left: 'calc(50% - 150px)',
      scale: 0,
      top: '-=50px',
    })

    const blockStart = gsap.timeline({
      scrollTrigger: {
        trigger: ".section01",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });


    blockStart.to('.traffic-light-txt', {     //1.ready文字消失
      opacity: 0,
    })
      .to('traffic-light-red', {         //2.紅燈[亮]，其他燈[暗]
        opacity: 1,
      }, '<')
      .to(['.traffic-light-green', '.traffic-light-yellow'], {
        opacity: 0,
      }, '<')
      .to('.traffic-light-yellow', {      //3.黃燈[亮]，其他燈[暗]
        opacity: 1,
      })
      .to('.traffic-light-txt', {
        text: 'GO!!',
      }, '<')
      .to('.traffic-light-red', {
        opacity: 0,
      }, '<')
      .to('.traffic-light-green', {      //4.綠燈[亮]，其他燈[暗]，Ready改成GO!
        opacity: 1,
      })
      .to('.traffic-light-yellow', {
        opacity: 0,
      }, '<')
      .to('.traffic-light-txt', {
        opacity: 1,
      }, '<')
      .to(['.traffic-light-txt', '.traffic-light-green', '.traffic-light-frame', '.job-title', '.cloud-left', '.cloud-right'], {   //5.整個紅綠燈、參賽人數消失
        opacity: 0,
      })
      .to(['.railing-start', '.section01 .logo', '.title-main'], {   //6.欄杆、大logo消失、左側小logo顯示
        opacity: 0,
      })
      .to('.logo-s', {
        opacity: isDesktop ? 1 : 0,
      }, '<')

      .to('.characters-person', {
        height: isDesktop ? '80%' : '70%',
        duration: 0.5,
      })
      .to('.characters-load', {
        width: '45%',
        duration: 1,
      }, '<')
      .to(['.characters-decorate-l', '.characters-decorate-r'], {
        opacity: isDesktop ? 1 : 0,
        duration: 0.5,
      }, '<')

    // -------------------------------------------------------------------> TODO: 第二屏 [你是否也有以下困擾？]
    const blockSecond = gsap.timeline({
      scrollTrigger: {
        trigger: ".section02",
        // markers: true,
        pin: isDesktop ? true : false,
        scrub: true,
      },
    });

    if (isDesktop) {
      blockSecond.to('.section02 .title-sub', {       //1. 大標題出現，角色縮小
        opacity: 1,
      })
      blockSecond.from('.question-1', {               //3. question1-3 接續出現
        xPercent: '-100',
        opacity: 0,
      })
        .to(['.characters-decorate-l', '.characters-decorate-r'], {
          width: '9%',
          x: '-=3%',
        }, '<')
      blockSecond.to('.question-2', {
        opacity: 1,
      })
        .to(['.characters-decorate-l', '.characters-decorate-r'], {
          width: '7%',
          x: '-=3%',
        }, '<')
      blockSecond.from('.question-3', {
        xPercent: '100',
        opacity: 0,
      })
        .to(['.characters-decorate-l', '.characters-decorate-r'], {
          opacity: 0,
        }, '<')
    } else if (isMobile) {
      blockSecond.to('.section02 .title-sub', {       //1. 大標題出現，角色縮小
        opacity: 1,
      })
      blockSecond.from('.question-1', {               //3. question1-3 接續出現
        xPercent: '-60',
        opacity: 0,
      },'<')
      .to('.question-1', {
        // xPercent: '-50',
        opacity: 1,
      })
      blockSecond.to('.question-2', {
        opacity: 1,
      },'<')
      blockSecond.from('.question-3', {
        xPercent: '60',
        opacity: 0,
      },'<')
      .to('.question-3', {
        opacity: 1,
      })
    }


    // -------------------------------------------------------------------> TODO: 第三屏 [本屆主題：互動式網頁設計]
    const blockThird = gsap.timeline({
      scrollTrigger: {
        trigger: ".section03",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });

    blockThird.to('.characters-person', {                 //1. 人物放大，大標、副標出現
      height: isDesktop ? '+=15%' : '-=3%',
    })

    if(isDesktop){
      blockThird.to(['.section03 .title-sub', '.section03  .title-sub-content'], {
        opacity: 1,
      })
      .to('.contestant', {
        yPercent: '-10',
        opacity: 1,
        duration: 1,
      })
      .to(['.section03 .title-sub', '.section03  .title-sub-content'], {
        opacity: 0,
      })
      .to('.contestant', {
        yPercent: '10',
        opacity: 0,
        duration: 0.5,
      }, '<')
    } else if(isMobile){
      blockThird.to(['.section03 .title-sub', '.section03  .title-sub-content'], {
        opacity: 1,
      })
      .to('.contestant' , {
        yPercent: '-80',
      })
      .to('.contestant-box-f2e', {
        opacity:1,
      },'<')
      .to('.contestant' , {
        yPercent: '-105',
      })
      .to('.contestant-box-f2e', {
        opacity:0,
      },'<')
      .to('.contestant-box-ui', {
        opacity:1,
      },'<')
      .to('.contestant' , {
        yPercent: '-135',
      })
      .to('.contestant-box-ui', {
        opacity:0,
      },'<')
      .to('.contestant-box-team', {
        opacity:1,
      },'<')
      .to('.contestant-box-team', {
        opacity:0,
      })
      .to(['.section03 .title-sub', '.section03  .title-sub-content'], {
        opacity: 0,
      })
    }


    // -------------------------------------------------------------------> TODO: 第四屏 [年度最強合作，三大主題來襲]
    const blockFourth = gsap.timeline({
      scrollTrigger: {
        trigger: ".section04",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });

    blockFourth.to(['.characters-person', '.characters--load'], {
      height: '-=20%',
    })
      .to(['.section04 .title-sub', '.section04 .title-sub-content'], {
        opacity: 1,
      }, '<')
      .to('.project', {                     //1. WEEK1內容顯示
        yPercent: isDesktop ? '-65' : '-90',
      })
      .to('.project-group-week1', {
        opacity: 1,
      }, '<')
      .to('.project', {                     //2. WEEK2內容顯示，WEEK1半透明
        yPercent: '-120',
      })
      .to('.project-group-week1', {
        opacity: 0.2,
      }, '<')
      .to('.project-group-week2', {
        opacity: 1,
      }, '<')
      .to('.project', {                     //3. WEEK3內容顯示，WEEK1消失，WEEK2半透明
        yPercent: '-150',
      })
      .to('.project-group-week1', {
        opacity: 0,
      }, '<')
      .to('.project-group-week2', {
        opacity: 0.2,
      }, '<')
      .to('.project-group-week3', {
        opacity: 1,
      }, '<')
      .to('.project', {
        yPercent: '-155',
      })
      .to('.project-group-week3', {
        opacity: 0.2,
      }, '<')
      .to('.project', {
        yPercent: '-175',
      })
      .to('.project-group-week3', {
        opacity: 0,
      }, '<')
      .to(['.section04 .title-sub', '.section04 .title-sub-content'], {      //4. 大標消失， 人物放大
        opacity: 0,
      })
      .to('.characters-person', {
        height: '+=10%',
      }, '<')
      .to('.characters-load', {
        width: '-=10%',
      }, '<')

    // -------------------------------------------------------------------> TODO: 第五屏 [活動說明]
    const blockFifth = gsap.timeline({
      scrollTrigger: {
        trigger: ".section05",
        // markers: true,
        // end: 'top 10%',
        pin: true,
        scrub: true,
      },
    });

    if (isDesktop){
      blockFifth.to('.bg-mark', {         //1. 中間弧線從左至右顯示
        opacity: 1,
      })
        .to('.actiity-line', {
          opacity: 1,
        })
        .to('.bg-mark', {
          xPercent: '100',
        }, '<1')
        .to('.actiity-line-point1', {          //2.說明第一點從下往上顯示
          opacity: 1,
          height: '120px',
          duration: 2,
        })
        .to('.actiity-signup', {
          opacity: 1,
          yPercent: '-20',
        }, '<')
        .to('.actiity-line-point2', {          //3.說明第二點從下往上顯示
          opacity: 1,
          height: '70px',
          duration: 2,
        })
        .to('.actiity-start', {
          opacity: 1,
          yPercent: '-20',
        }, '<')
        .to('.actiity-line-point3', {          //4.說明第三點從下往上顯示
          opacity: 1,
          height: '100px',
          duration: 2,
        })
        .to('.actiity-upload', {
          opacity: 1,
          yPercent: '-20',
        }, '<')
        .to('.actiity-line', {                 //5.弧線消失，活動說明網上消失，人物放大
          opacity: 0,
        })
        .to('.section05 .index-card', {
          yPercent: '-20',
          opacity: 0,
        }, '<')
        .to('.characters-person', {
          height: '+=10%',
        }, '<')
        .to('.characters-load', {
          width: '+=10%',
        }, '<')
    }else if(isMobile){
      blockFifth.to('.section05 .title-sub', {
        opacity: 1,
      })
      .to('.actiity', {
        yPercent: '-102',
      })
      .to('.actiity-signup', {
        opacity: 1,
      }, '<')
      .to('.actiity', {
        yPercent: '-133',
      })
      .to('.actiity-signup', {
        opacity: 0,
      }, '<')
      .to('.actiity-start', {
        opacity: 1,
      }, '<')
      .to('.actiity', {
        yPercent: '-170',
      })
      .to('.actiity-start', {
        opacity: 0,
      }, '<')
      .to('.actiity-upload', {
        opacity: 1,
      }, '<')
    }
    


    // -------------------------------------------------------------------> TODO: 第六屏 [獎項說明]
    const blockSixth = gsap.timeline({
      scrollTrigger: {
        trigger: ".section06",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });

    blockSixth.to(['.awards-img-left', '.awards-img-right'], {
      opacity: 1,
    })
      .to('.awards-img-left', {
        xPercent: '60',
        yPercent: '-42',
        duration: 2,
      }, '<')
      .to('.awards-img-right', {
        xPercent: '-30',
        yPercent: '-42',
        duration: 2,
      }, '<')
      .to('.awards-title', {
        opacity: 1,
        scale: 1,
        duration: 2,
      }, '<')
      .to(['.awards-img-right', '.awards-img-left', '.awards-title'], {
        opacity: 0,
      })
      .to('.section06 .title-sub', {
        opacity: 1,
      })
      .to('.characters-person', {
        height: '-=15%',
      }, '<')
      .to('.characters-load', {
        width: '-=15%',
      }, '<')
      .to('.awards-box', {
        xPercent: '0',
        opacity: 1,
      }, '<')
      .to('.trophy-light', {
        rotation: -180,
        duration: 2,
      }, '<')
      .to('.section06 .title-sub', {
        opacity: 0,
      })
      .to('.trophy-light', {
        rotation: 180,
        duration: 2,
      }, '<')
      .to('.awards-box', {
        xPercent: '100',
        opacity: 0,
        duration: 4,
      }, '<')
      .to('.characters-person', {
        height: '+=5%',
      })
      .to('.characters-load', {
        width: '+=10%',
      }, '<')

    // -------------------------------------------------------------------> TODO: 第七屏 [贊助廠商]
    const blockSeventh = gsap.timeline({
      scrollTrigger: {
        trigger: ".section07",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });

    blockSeventh.to('.section07 .title-sub', {
      opacity: 1,
    })
      .to(['.characters-tree-left', '.characters-tree-right'], {
        height: 'auto',
      })
      .to(['.characters-tree-left', '.characters-tree-right'], {
        opacity: 1,
      })
      .to('.characters-tree-left', {
        width: '-=8%',
        left: '15%',
      })
      .to('.characters-tree-right', {
        width: '-=10%',
        left: '60%',
      }, '<')
      .to('.sponsor-blockstudio', {
        yPercent: '-10',
        opacity: 1,
      }, '<')
      .to('.sponsor-titansoft', {
        yPercent: '-10',
        opacity: 1,
      }, '<0.1')
      .to('.sponsor-kdanmobile', {
        yPercent: '-10',
        opacity: 1,
      }, '<0.2')
      .to(['.characters-tree-left', '.characters-tree-right', '.section07 .title-sub'], {
        opacity: 0,
      })
      .to('.characters-tree-left', {
        width: '-=2%',
        left: '20%',
        opacity: 0,
      }, '<')
      .to('.characters-tree-right', {
        width: '-=2%',
        left: '60%',
        opacity: 0,
      }, '<')
      .to('.sponsor', {
        opacity: 0,
        yPercent: '10',
      }, '<')

    // -------------------------------------------------------------------> TODO: 最後一屏 [end]
    const blockLast = gsap.timeline({
      scrollTrigger: {
        trigger: ".sectionLast",
        // markers: true,
        pin: true,
        scrub: true,
      },
    });

    blockLast.to('.cloud-left', {
      left: '10%',
      scale: 1,
    })
      .to('.cloud-right', {
        left: '70%',
        scale: 1,
      }, '<')
      .to(['.cloud-left', '.cloud-right'], {
        opacity: 1,
      })
      .to('.cloud-left', {
        left: '+=10%',
      })
      .to('.characters-person', {
        height: '+=10%',
      }, '<')
      .to('.characters-load', {
        width: '+=15%',
      }, '<')
      .to('.railing-end', {
        opacity: 1,
        scale: 1,
      }, '<')
      .to('.cloud-right', {
        left: '-=10%',
      }, '<')
      .to('.characters-finishLine', {
        opacity: 1,
        scale: 1,
      }, '<')
      .to(['.characters-finishLine-l', '.characters-finishLine-r'], {
        yPercent: '-150'
      }, '<')
      .to('.characters-person', {
        height: '+=15%',
      })
      .to('.characters-finishLine-l', {
        rotation: '-10'
      }, '<')
      .to('.characters-finishLine-r', {
        rotation: '10'
      }, '<')
      .to('.cloud-right', {
        left: '-=10%',
      }, '<')
      .to('.cloud-left', {
        left: '+=10%',
      }, '<')
      .to('.characters-person', {
        height: '+=15%',
      })
      .to('.characters-finishLine-l', {
        opacity: 0,
        xPercent: '-50',
      }, '<')
      .to('.characters-finishLine-r', {
        opacity: 0,
        xPercent: '120',
      }, '<')
      .to(['.cloud-left', '.cloud-right'], {
        left: 'calc(50% - 150px)',
        opacity: 0,
      }, '<')
      .to('.characters-person', {
        height: '+=15%',
        opacity: 0,
      })
      .to('.railing-end', {
        opacity: 0,
      })
      .to('.last', {
        y: 0,
        opacity: 1,
      })
      .to('.logo-s', {
        opacity: 0,
      })

    return () => console.log("cleanup");
  });









});

