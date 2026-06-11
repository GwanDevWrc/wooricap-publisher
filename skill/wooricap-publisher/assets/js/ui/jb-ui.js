// 媛�濡쒕え��
function isIpadDevice() {
	const ua = navigator.userAgent.toLowerCase();

	if(ua.includes("ipad")) return true;

  if(navigator.platform === 'MacIntel' && navigator.maxTouchPoints <= 1) {
    return false;
  };
  const w = Math.min(window.screen.width, window.screen.height);
  if(/iphone|ipod|ipad/.test(ua) || (navigator.platform === 'MacIntel' && w >= 768 && w <= 1366)) {
    return true;
  }

  if(navigator.userAgent.match(/Intel Mac OS X/i)) return true;
	return false;
}
function isAndroidTabletDevice() {
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const hasTabletKeywords = /(tablet|tab|sm-t|nexus 7|nexus 10)/.test(ua);
  const isNotPhone = !ua.includes("mobile");

  return isAndroid && (hasTabletKeywords || isNotPhone);
}
function isPhoneDevice() {
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipod|android.*mobile|sm-g|galaxy|pixel/.test(ua);
}
function isMobileOrTabletDevice() {
  return isPhoneDevice() || isIpadDevice() || isAndroidTabletDevice();
}
function isPc() {
	// return !isMobileOrTabletDevice() && !/iphone|ipod|android|Blackberry|bb10|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
  return !isMobileOrTabletDevice()
}
function is_landscape() {
	const winWidth = window.innerWidth;
	const winHeight = window.innerHeight;

	const isWide = winWidth > winHeight;

  const isSafari = /safari/i.test(navigator.userAgent) && !/crois|fxios|opt\//i.test(navigator.userAgent);
  const isIOSWebView = isIpadDevice && !isSafari;

  if(isIOSWebView) return isWide;
	
	if(window.screen.orientation && window.screen.orientation.type) {
		return window.screen.orientation.type.includes("landscape") && isWide;
	}
	if(typeof window.orientation !== "undefined") {
		return window.orientation === 90 || window.orientation === -90;
	}
	return isWide;
}
function check_orientation() {
	if((is_landscape() && !isPc()) && (!location.href.includes('hqRsltsPres.do'))) {
		$('.landscape-warning').show();
		$('.wrapper').hide();
	} else {
		$('.landscape-warning').hide();
		$('.wrapper').show();
	}
}

if (!isPc()) {
  $('html').addClass('mb-layout');
} else {
  $('html').addClass('pc-layout');
}

$(document).ready(function () {
  registUI();
  
	setTimeout(() => {
		check_orientation();
	}, 100);
	$(window).on('resize orientationchage', function() {
		setTimeout(() => {
			check_orientation();
		}, 300);
	})
  document.addEventListener("visibilitychange", function() {
    setTimeout(() => {
			check_orientation();
		}, 300);
  });
})

var registUI = function () {
  _layerPop();// �덉씠�댄뙘��
  _accordion(); // �꾩퐫�붿뼵
  _accordionAgree(); // �쎄��숈쓽 �꾩퐫�붿뼵
  _tabContents(); // ��
  _selControl(); // ���됲듃
  _selMobileControl(); // 紐⑤컮�� ���됲듃
  setDatepicker(); // �곗씠�명뵾而�
  setTermsAct(); // �곗씠�명뵾而� 湲곌컙 �ㅼ젙
  _inpControl(); // input
  _searchControl(); // 寃��� input
  _tooltip(); // �댄똻
  authAnimation(); // 蹂몄씤�몄쬆 �좊땲硫붿씠��
  stepAnimation(); // �④퀎蹂� �낅젰�� �좊땲硫붿씠��
  _textareaControl(); // textarea
  _inpRecomList()
};

/**
  * @name _inpControl()
  * @description �명뭼 �낅젰李� �명꽣�됱뀡
  */
var _inpControl = function () {
  var inp = $('.input-con');
  var inpBox = $('.input-box .input-default');

  _inpChkVal(inpBox);
  _inpBtnOffset();

  inp.each(function (idx, el) {
    if($(this).find('.won').length && $(this).find('.btn-sm').length) {
      $(this).addClass('type-etc');
    }

    $(el).on('focus click', function (e) {
      var $thisInp = $(this).find('.input-default');
      _inpBtnOffset();
      _inpChkVal($thisInp);

      if (!$(this).find('.input-box').hasClass('type-readonly') && !$(this).find('.input-box').hasClass('type-disabled') && !$(this).find('input').prop('readonly') && !$(this).find('input').prop('disabled')) {
        $(this).addClass('focus');
        // $(this).find('.btn-ico-clear').css('display', 'block');
      }
    });

    $(el).on('focusout blur', function (e) {
      inp.removeClass('focus')
      $(this).removeClass('focus');
      // $(this).find('.btn-ico-clear').css('display', '');
    });

    $(el).bind('input change keyup', function (e) {
      var $thisInp = $(this).find('.input-default');
      _inpChkVal($thisInp);
    });
    $(el).bind('keyup', function (e) {
      $(this).focus().click();
    });

    $(el).find('.btn-ico-clear').bind('click', function (e) {
      e.preventDefault();
      $(this).siblings('.input-default').val('');
      $(this).siblings('.input-default').trigger('change');
      $(this).siblings('.input-default').focus()
      $(this).removeClass('has-val');
    });
  });
};


/**
  * @name _inpChkVal()
  * @description // �명뭼 value�� �곕Ⅸ �대옒��
  * @param {string | Element} el �명뭼 
  */
var _inpChkVal = function (el) {
  $(el).each(function () {
    var $inputCon = $(this).closest('.input-con');
    var hasValue = $inputCon.find('.input-default').filter(function () {
      return $(this).val() !== '';
    }).length > 0;

    if (hasValue) {
      $inputCon.addClass('has-val');
      $inputCon.find('.btn-step-next').css('display', 'block');
      $inputCon.find('.btn-ico-clear').css('display', 'block');
    } else {
      $inputCon.removeClass('has-val');
      $inputCon.find('.btn-step-next').css('display', 'none');
      $inputCon.find('.btn-ico-clear').css('display', 'none');
    }
  });
};

/**
  * @name _inpBtnOffset()
  * @description // �명뭼 踰꾪듉 媛꾧꺽
  * @param {string | Element} el �명뭼 
  */
var _inpBtnOffset = function () {
  var inpBoxWrap = $('.input-box');
  inpBoxWrap.each(function(){
    var $inpBoxChild = $(this).find('*'); // .input-box child
    
    var $clearBtn = $(this).find('.btn-ico-clear');
    var $inputForm = $(this).find('.input-default');
    var $clearBtnPad = 10;
    var $inputPad = 40;
    var totalWidth = 0;
    var isFound = false;

    if($clearBtn.length == 0) return;

    $inpBoxChild.each(function(){
      if(isFound) {
        if($(this).is('span, button')) {
          totalWidth += $(this).outerWidth();
        }
      }
      if(this == $clearBtn[0]) {
        isFound = true;
      }
    })
    
    $clearBtn.css('right', Math.round(totalWidth + $clearBtnPad) + 'px');
    $inputForm.css('padding-right', Math.round(totalWidth + $inputPad) + 'px');
  })
};

/**
  * @name _inpRecomList()
  * @description // 異붿쿇 �대찓��
  * @param {string | Element} el �명뭼 
  */
var domainList = ['naver.com', 'gmail.com', 'hanmail.net', 'daum.com', 'hotmail.com', 'nate.com'];
var createEmailSuggestions = function(inputVal) {
  var userId = inputVal.split('@')[0];
  var $suggestionList = $('.recom-list');
  var $ul = $suggestionList.find('ul').empty();

  domainList.forEach(function(domain) {
    var suggestionEmail = `${userId}@${domain}`;
    $ul.append(`<li><button type="button">${suggestionEmail}</button></li>`)
  });

  $suggestionList.show()
}

var _inpRecomList = function () {
  $('.recom-list-wrap').each(function(){
    var recomInp = $(this).find('.input-default');

    recomInp.on('input keyup', function() {
      var emailValue = $(this).val().trim();

      $('.recom-list').show();
      if(emailValue === '' || emailValue.includes('@')) {
        $('.recom-list').hide();
      } else {
        if(!$('.recom-list').length) {
          var suggestionHTML = `
            <div class="recom-list">
              <ul></ul>
            </div>`
          $(this).closest('.input-con').append(suggestionHTML);
        }
        createEmailSuggestions(emailValue);
      }
    })

    $(document).on('click', '.recom-list button', function() {
      recomInp.val($(this).text()).focus();
      $('.recom-list').hide()
    })
    $(document).on('click', '.recom-list-wrap .btn-ico-clear', function() {
      $('.recom-list').hide()
    })
    $(document).on('focusout blur', '.recom-list-wrap', function() {
      setTimeout(() => {
        $('.recom-list').hide()
      }, 300);
    })
  })
};


/**
  * @name textareaControl()
  * @description // textarea resize 諛� 湲��� �� �뺤씤
  */
var _textareaControl = function () {
  $('.textarea-wrap').each(function () {
    var $textarea = $(this).find('textarea');
    var $textLength = $(this).find('.text-length span');

    function updateTextLength() {
      var textLength = $textarea.val().length;
      $textLength.text(textLength);
    }

    function resizeTextarea() {
      $textarea.css('height', 'auto');
      $textarea.css('height', $textarea[0].scrollHeight + 'px');
    }

    $textarea.on('input', function () {
      updateTextLength();
      resizeTextarea();
    });
    updateTextLength();
    resizeTextarea();

    var $textareaId = $textarea.attr('id');
    $(this).find('label').attr('for', $textareaId);
  });
};

/**
  * @name _searchControl()
  * @description 寃��� input clear 踰꾪듉 異붽�
  */
var _searchControl = function() {
  var searchInp = $('.search-wrap');

  searchInp.each(function(idx, el) {
    $(el).on('ddclick', function (e) {
      $(this).addClass('focus');
    });
	$(el).on('focus click', function () {
		$(this).addClass('focus');
	});

    $(el).on('focusout blur', function (e) {
      setTimeout(function () {
        $(this).removeClass('focus');
      }.bind($(el)), 0);
    });

    $(el).bind('keyup change', function (e) {
      $(this).focus().click();

      var $inputCon = $(this);
      var hasValue = $(this).find('input').filter(function () {
        return $(this).val() !== '';
      }).length > 0;

      if (hasValue) {
        $inputCon.addClass('has-val');
        $inputCon.find('.btn-ico-clear').css('display', 'block');
      } else {
        $inputCon.removeClass('has-val');
        $inputCon.find('.btn-ico-clear').css('display', 'none');
      }
    });

    $(el).find('.btn-ico-clear').bind('click', function (e) {
      e.preventDefault();
      $(this).siblings('input').val('');
      $(this).siblings('input').trigger('change');
      $(this).removeClass('has-val');
    });
  });
}

/**
  * @name _tabContents()
  * @description // ��
*/
var _tabContents = function () {

  setTimeout(() => {//�묎렐��
    $('.tab-item').each(function(){
      var $activeTab = $(this).attr('aria-controls');
      if(!$(this).closest('.tab-wrap').find('#' + $activeTab).find('h3').length) {
        $(this).closest('.tab-list').siblings('.tab-contents').find('#' + $activeTab).prepend('<h3 class="blind">' + $(this).text() + '</h3>');
      }
      if($(this).hasClass('active')) {
        $(this).attr('title', "�좏깮��");
      }
    })
  }, 500);

  $(document).on("click", ".tab-item", function () {
    var $this = $(this);
    var $tabList = $this.parents(".tab-list, .tab-list-wrap");
    var $tabPanels = $this.parents(".tab-list, .tab-list-wrap").siblings('.tab-contents').find(" > .tab-panel");
    var targetPanel = $("#" + $this.attr("aria-controls"));

    $tabList.find(".tab-item").removeClass("active").attr({
      "aria-selected": false,
      "tabindex": -1,
      "title": ""
    });
    $this.addClass("active").attr({
      "aria-selected": true,
      "tabindex": 0,
      "title": "�좏깮��"
    });
    
    $tabPanels.removeClass("active");
    targetPanel.addClass("active");

    //�묎렐��
    targetPanel.find('h3').text($(this).text());
    
    if ($(window).outerWidth() < 900 && !$tabList.hasClass("type-full")) {
      var left = $this.offset().left - 20 + $tabList.scrollLeft();
      $tabList.animate({ scrollLeft: left }, 400);
    }
  });

  $(document).on("click", ".tab-list.type-sub .tab-item", function () {
    var $this = $(this);
    var $subTabList = $this.parent(".tab-list.type-sub");
    var $subtabPanels = $subTabList.parent(".tab-list").siblings('.tab-contents').find(" > .tab-panel");
    var subtargetPanel = $("#" + $this.attr("aria-controls"));
    
    $subTabList.find(".tab-item").removeClass("active").attr({
      "aria-selected": false,
      "tabindex": -1,
      "title": ""
    });
    $this.addClass("active").attr({
      "aria-selected": true,
      "tabindex": 0,
      "title": "�좏깮��"
    });
    
    $subtabPanels.removeClass("active");
    subtargetPanel.addClass("active");
  });
  
  $(document).on("keydown", ".tab-item", function (event) {
    var key = event.which;
    var $this = $(this);
    var $tabList = $this.closest(".tab-list");
    var $tabs = $tabList.find(".tab-item");
    var index = $tabs.index($this);
    
    if (key === 39 || key === 40) { // Right or Down arrow
      var nextIndex = (index + 1) % $tabs.length;
      $tabs.eq(nextIndex).click().focus();
    } else if (key === 37 || key === 38) { // Left or Up arrow
      var prevIndex = (index - 1 + $tabs.length) % $tabs.length;
      $tabs.eq(prevIndex).click().focus();
    }
  });

  $(document).on("click", ".btn-tab-down", function () {
    $(this).parent('.tab-list-wrap').toggleClass('active')
  });
}

/**
  * @name _accordion()
  * @description // �꾩퐫�붿뼵 
*/
var _accordion = function () {
  //湲덉쑖 �곹뭹 �꾩퐫�붿뼵�� type-multi �꾨씫嫄댁뿉 �쒗빐 addClass
  setTimeout(() => {
    $('.financial-product-wrap').find('.accordion-wrap').addClass('type-multi');
    $('.form-wrap .agree-list-wrap .btn-toggle').attr({
      'aria-expanded': 'false', 'aria-label': '�닿린'
    });
  }, 300);
  
  $(document).on('click', '.accordion-wrap .btn-toggle', function () {
    var $this = $(this),
      $accWrap = $this.closest('.accordion-wrap'),
      $thisContents = $this.parent('.accordion-header').next('.accordion-contents'),
      isMulti = $accWrap.hasClass('type-multi');

    if ($thisContents.is(':hidden')) {
      if (!isMulti) {
        $accWrap.find('.btn-toggle.active').removeClass('active').attr({
          'aria-expanded': 'false', 'aria-label': '�닿린'
        }).parent('.accordion-header').next('.accordion-contents').slideUp();
      }
      $thisContents.slideDown();
      $this.addClass('active').attr({
        'aria-expanded': 'true', 'aria-label': '�リ린'
      });
    } else {
      $this.removeClass('active').attr({
        'aria-expanded': 'false', 'aria-label': '�닿린'
      });
      $thisContents.slideUp();
    }
  });
};


/**
  * @name _accordionAgree()
  * @description // �쎄��숈쓽 �꾩퐫�붿뼵
*/
var _accordionAgree = function () {

  $(document).on('click', '.agree-list-wrap.type-accordion .btn-toggle', function () {
    var $this = $(this),
      $thisContents = $this.parent('.box-chk').next('.agree-panels')

    if ($thisContents.is(':hidden')) {
      $thisContents.slideDown();
      $this.addClass('active').attr({
        'aria-expanded': 'true', 'aria-label': '�リ린'
      });
    } else {
      $this.removeClass('active').attr({
        'aria-expanded': 'false', 'aria-label': '�닿린'
      });
      $thisContents.slideUp();
    }
  });
}

/**
  * @name _layerPop()
  * @description // �덉씠�댄뙘��
  */
var _zIndexCounter = 100; // 珥덇린 z-index 媛� �ㅼ젙
var _layerPop = function () {
  $(document).on('click', '.fnOpenPop', function () {
    var popId = $(this).attr('aria-controls');
    $(this).attr('aria-expanded', 'true');
    // if ($('#' + popId).hasClass('type-alert')) {
    //   fnOpenAlert(popId);
    // } else {
    //   fnOpenLayerPop(popId);
    // }
    fnOpenLayerPop(popId);
  });
  $(document).on('click', '.fnClosePop', function () {
    var popId = $(this).closest('.layerpop-wrap').attr('id');
    $('#' + popId).removeAttr('aria-hidden');
    $('[aria-controls="' + popId + '"]').attr('aria-expanded', 'false');
    fnCloseLayerPop(popId);
  });
  $('.layerpop-wrap').on('keydown', function (e) {
    if (e.key === "Escape") {
      var popId = $(this).attr('id');
      $('#' + popId).removeAttr('aria-hidden');
      $('[aria-controls="' + popId + '"]').attr('aria-expanded', 'false');
      fnCloseLayerPop(popId);
    }
  });
  if($('html').hasClass('mb-layout')) {
    $(document).on('click', '.layerpop-wrap.type-bottom', function (e) {
      if (!$(e.target).closest('.layerpop').length) {
        var popId = $(this).attr('id');

        if(popId === 'jftrman0020_lypop1') return;
        if($(this).hasClass('no-dimclick')) return;
        
        fnCloseLayerPop(popId);
      }
    });
  }
};

/**
  * @name fnOpenLayerPop()
  * @description �덉씠�댄뙘�� �닿린
  * @param {string} popID �앹뾽ID 
*/
var fnOpenLayerPop = function (popID) { 
  $(':focus').addClass('iscurfocus');

  var $el = $('#' + popID);
  if(!popID) {

  }
  if(!$el.length) return;

  // z-index 利앷� 諛� �곸슜
  _zIndexCounter++;
  $el.css('z-index', _zIndexCounter);
  
  $('body').addClass('overflow');
  $el.addClass('show').attr('aria-hidden', 'false');
  $el.find('.layerpop-contents').attr('tabindex', '0');
  if ($el.find('.tooltip-wrap').length) {
    _closeTooltip($('.tooltip-con'))
  }

  setTimeout(() => { // �묎렐��
    $('input:not([type="hidden"]').each(function(idx) {
      if($(this).attr('id')) {
        $(this).closest('label').attr('for', $(this).attr('id'))
      } else {
        $(this).attr('id', 'jbInputId' + idx);
        $(this).closest('label').attr('for', 'jbInputId' + idx);
      }
    });

    $('.box-chk').each(function(){
      var $agreeTxt = $(this).find('label > span').text();
      var $agreeView = $(this).find('.ico-arrow > span');
  
      $agreeView.text($agreeTxt + " �먯꽭�� 蹂닿린")
    });

    $('.form-wrap .agree-list-wrap .btn-toggle').attr({
      'aria-expanded': 'false', 'aria-label': '�닿린'
    });
  }, 500);

  setTimeout(() => {
    var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var $focusable = $el.find(focusableElements).filter(':visible');
    var firstFocusable = $focusable.first();
    // var lastFocusable = $focusable.last();
    if (firstFocusable.length) {
      firstFocusable.focus();
    }
    $el.on('keydown', function (e) {
      if (e.key === 'Escape') {
        fnCloseLayerPop(popID);
      }
      if (e.key === 'Tab') {
        var lastFocusable = $el.find(focusableElements).filter(':visible:not([disabled])').last();
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable[0]) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable[0]) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
  }, 500);
  
  $('.layerpop-contents').animate({scrollTop : 0 }, 100); // �대┫ �� �곷떒
};

/**
  * @name fnOpenAlert()
  * @description �뚮읉 �닿린
  * @param {string} popID �앹뾽ID 
*/
var fnOpenAlert = function (popID) {
  var $el = $('#' + popID);
  var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  $('body').addClass('overflow');
  $el.addClass('show').attr('aria-hidden', 'false');

  var $focusable = $el.find(focusableElements).filter(':visible:not([disabled])');
  var firstFocusable = $focusable.first();
  var lastFocusable = $focusable.last();
  if (firstFocusable.length) {
    firstFocusable.focus();
  }
  $el.on('keydown', function (e) {
    if (e.key === 'Escape') {
      fnCloseLayerPop(popID);
    }
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable[0]) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable[0]) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
};

/**
  * @name fnCloseLayerPop()
  * @description �덉씠�댄뙘�� �リ린
  * @param {string} popID �앹뾽ID
  */
var fnCloseLayerPop = function (popID) {
  var $el = $('#' + popID);
  var $focusBtn = $('[aria-controls="' + popID + '"]');

  if($focusBtn.length > 1){
    $focusBtn = $focusBtn.filter('.iscurfocus');
  }

  if(!popID) {
    $('body').removeClass('overflow');
    $(document).find('.layerpop-wrap.show').removeClass('show');
  }

  setTimeout(function () {
    $focusBtn.removeClass('iscurfocus');
    $el.removeClass('show').attr('aria-hidden', 'true');
    $el.find('.layerpop-contents').removeAttr('tabindex');
    $el.off('keydown');
    if(!$('#allmenu').hasClass('on')) {
      $('body').removeClass('overflow');
    }
    if ($focusBtn.length) {
      $focusBtn.attr('aria-expanded', 'false').focus();
    }

    if ($el.find('.tooltip-wrap').length) {
      _closeTooltip($('.tooltip-con'))
    }

    // 25WP0138 - �ㅽ넗�ъ빱�� 愿��� �곸슜 
    // 25.07.15 - event skip key 蹂�寃�
    if( !($focusBtn.attr('data-isafevtskip') && 'true' === $focusBtn.attr('data-isafevtskip').toLowerCase()) ) {
      $focusBtn.trigger('autofocus');
    }
  }, 30);
};

/**
  * @name _selControl()
  * @description // selecbox status
  */
var _selControl = function () {
  $('.select-box').each(function (idx, el) {

    $(el).on('focus click', function () {
      $('.select-box').removeClass('focus');
      if (!$(this).find('select').prop('readonly') && !$(this).find('select').prop('disabled')) {
        $(this).addClass('focus');
      }
    });
    
    $(el).on('focusout blur', function (e) {
      setTimeout(function () {
        $(this).removeClass('focus');
      }.bind($(el)), 0);
    });

    // $(el).bind('keyup change', function (e) { //change �� �� �ъ빱��......
    //   $(this).focus().click();
    //   // $(this).next().focus();
    // });

    if ($(el).find('select').val()) {
      $(this).closest('.select-box').addClass('has-val');
      $(this).closest('.select-wrap').addClass('has-val');
    }

    $(el).find('select').on('change', function () {
      if ($(this).val()) {
        $(this).closest('.select-box').addClass('has-val');
        $(this).closest('.select-wrap').addClass('has-val');
      } else {
        $(this).closest('.select-box').removeClass('has-val');
        $(this).closest('.select-wrap').removeClass('has-val');
      }
    });
  });
};

/**
  * @name _selMobileControl()
  * @description 紐⑤컮�쇱뿉�� ���됲듃 諛뷀��앹뾽 �앹꽦
  */
var _selMobileControl = function (idx) {
  var $selectBoxes = $('.select-box.pc');

  if(idx != null && idx != undefined) {
    idx = idx.substring(idx.indexOf("_") + 1);
    $selectBoxes = $selectBoxes.eq(idx);
  }

  $selectBoxes.each(function (boxIdx, el) {
    var $selectBox = $(el);
    var $select = $selectBox.find('select');
    var $label = $selectBox.find('.select-label');
    
    // �꾩옱 �좏깮�� �듭뀡 媛� 媛��몄삤湲�
    var selectedText =  $select.find('option:selected').val() ? $select.find('option:selected').text() : $select.siblings('label').text();
    var hasSelectedValue = $select.find('option:selected').val() ? 'has-val' : '';
    var hasError = $selectBox.hasClass('type-error') ? 'type-error' : '';
    var hasSelectedDisabled = $select.attr('disabled') ? 'disabled' : '';
    // var isOpenPop = $select.find('option').length > 1 ? 'fnOpenPop' : '';
    
    if(idx !=null && idx != undefined ) {
      boxIdx = idx
    }
    var mobileBtnId = `popupId_${boxIdx}`;
    var $mobileBtn = $selectBox.next('.select-box.mobile');

    if (!$mobileBtn.length) {
      var mobileButton = `
        <button type="button" class="select-box mobile fnOpenPop ${hasSelectedValue} ${hasError}" ${hasSelectedDisabled} aria-controls="${mobileBtnId}" aria-haspopup="dialog" aria-expanded="false">
          <span class="select-label" data-lang="">${$label.text()}</span>
          <span class="value" data-lang="">${selectedText}</span>
        </button>`;
      $selectBox.after(mobileButton);
      $mobileBtn = $selectBox.next('.select-box.mobile');
    } else if ( $mobileBtn.length >= 1) {
      if($select.attr('disabled')) {
        $mobileBtn.prop('disabled', true);
        if($mobileBtn.find('.value') != '' && $mobileBtn.find('.value') != null && $mobileBtn.find('.value') != undefined ) {
          $mobileBtn.addClass('has-val');
        }
      }
      if($selectBox.hasClass('type-error')) {
        $mobileBtn.addClass('type-error')
      }
      if($select.find('option:selected').val() !== '' && $select.find('option:selected').val() !== undefined) {
        $mobileBtn.find('.value').text($select.find('option:selected').text())
        $mobileBtn.addClass('has-val');
      }
      // if($select.find('option').length === 0) {
      //   $mobileBtn.removeClass('fnOpenPop');
      // }
      if($mobileBtn.find('.value').text() !== '' && $mobileBtn.find('.value').text() !== undefined) {
        if($select.find('option:selected').val() !== '' && $select.find('option:selected').val() !== undefined) {
          $mobileBtn.find('.value').text($select.find('option:selected').text())
          $mobileBtn.addClass('has-val');
        } else {
          $mobileBtn.find('.value').text($select.siblings('label').text())
        }
        
      }
    }
    
    var $popup = $(`#${mobileBtnId}`);

    if (!$popup.length) {
      var popupLayer = `
        <div id="${mobileBtnId}" class="layerpop-wrap type-bottom" role="dialog" aria-modal="true">
          <div class="layerpop">
            <div class="layerpop-header">
              <p class="layerpop-tit">${$label.text()}</p>
              <button class="btn-close fnClosePop"><span class="blind">�앹뾽 �リ린</span></button>
            </div>
            <div class="layerpop-contents">
              <div class="select-list-wrap">
                <ul></ul>
              </div>
            </div>
          </div>
        </div>`;
      $('body').append(popupLayer);
      $popup = $(`#${mobileBtnId}`);
    }

    var $listWrap = $popup.find('.select-list-wrap ul').empty();

    $select.find('option').each(function () {
      var optionText = $(this).text(),
          optionValue = $(this).val(),
          optionDisabled = $(this).attr('disabled') ? 'disabled' : '',
          optionShow = $(this).attr('style'),
          selectedValue = $mobileBtn.find('.value').text();
  
      if(optionValue) {
        if(optionText === selectedValue) {
          $listWrap.append(`<li class="selected"><button type="button" class="select-list" style="${optionShow}" data-value="${optionValue}" ${optionDisabled} title="�좏깮��" data-lang="">${optionText}</button></li>`);
        }
        else{
          $listWrap.append(`<li><button type="button" class="select-list" style="${optionShow}" data-value="${optionValue}" ${optionDisabled} title="" data-lang="">${optionText}</button></li>`);
        }
      }
    });

    // 湲곗〈 change �대깽�� 由ъ뒪�� �좎�
    $select.on('change', function () {
      var selectedText = $(this).find('option:selected').text();
      var hasValue = $(this).val() ? 'has-val' : '';

      $mobileBtn.find('.value').text(selectedText);
      $mobileBtn.removeClass('has-val').addClass(hasValue);
      $selectBox.addClass('has-val');
    });

    $popup.find('.select-list-wrap').off('click').on('click', '.select-list', function () {
      var selectedText = $(this).text(),
          selectedValue = $(this).data('value');
          
      $mobileBtn.addClass('has-val');
      $mobileBtn.find('.value').text(selectedText);
      $select.val(selectedValue).trigger('change');
      
      $(this).closest('li').addClass('selected').siblings().removeClass('selected');

      $(this).closest('li').siblings().find('button').attr('title', '')
      $(this).attr('title', '�좏깮��');
      
      setTimeout(function () {
        fnCloseLayerPop($popup.attr('id'));
      }.bind($(this)), 0);
    });

    // if ($('html').hasClass('mb-layout')) {
    //   $('body').append($popup);
    //   $selectBox.after($mobileBtn);
    // }
  });

};

/**
  * @name fnToastPop()
  * @description �좎뒪�명뙘�� �닿린
  * @param {string} popID �앹뾽ID 
  */
var fnToastPop = function (popID) {
  var $el = $('#' + popID);
  if($('.section-bottom-fixed').length) {
    $el.addClass('has-bottom');
  }
  if($('.submain-navi').length) {
    $el.addClass('has-bottom');
  }
  $el.addClass('active');

  setTimeout(function () {
    $el.removeClass('active');
    $el.remove();
  }, 3000);
};

/**
  * @name _tooltip()
  * @description �댄똻 �닿린
  */
var _tooltip = function () {
  $(document).on('click', '.btn-tooltip', function (e) {
    e.stopPropagation();
    
    var $this = $(this);
    var tooltipId = $this.attr('aria-describedby');
    var $tooltip = $('#' + tooltipId);

    $('.tooltip-con.active').not($tooltip).each(function () {
      _closeTooltip($(this));
    });

    positionTooltip($this, $tooltip);
    
    if ($tooltip.attr('aria-hidden') === 'true') {
      $tooltip.attr({'aria-hidden': 'false', 'aria-live': 'polite'}).addClass('active');
      $this.attr('aria-expanded', 'true');
      $tooltip.find('.btn-tooltip-close').focus();
    }
  });

  $(document).on('click', '.btn-tooltip-close', function (e) {
    e.preventDefault();
    _closeTooltip($(this).closest('.tooltip-con'));
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.tooltip-con[aria-hidden="false"]').each(function () {
        _closeTooltip($(this));
      });
    }
  });

  $(document).on('click' , function (e) {
    if (!$(e.target).closest('.tooltip-con').length) {
      if($('.tooltip-con.active').length) {
        _closeTooltip($('.tooltip-con'));
      }
      
    }
  });

  $(window).on('resize', function () {
    $('.tooltip-con.active').each(function () {
      var $tooltip = $(this);
      var $button = $('.btn-tooltip[aria-describedby="' + $tooltip.attr('id') + '"]');
      positionTooltip($button, $tooltip);
    });
  });
};

/**
  * @name _closeTooltip()
  * @description �댄똻 �リ린
  */
var _closeTooltip = function ($tooltip) {
  var $button = $('.btn-tooltip[aria-describedby="' + $tooltip.attr('id') + '"]');
  $tooltip.attr('aria-hidden', 'true').removeClass('active');
  $tooltip.removeAttr('aria-live');
  $tooltip.attr('style', '');
  $button.attr('aria-expanded', 'false').focus();
};

/**
  * @name positionTooltip()
  * @description �댄똻 �꾩튂 議곗젙
  */
var positionTooltip = function ($button, $tooltip) {
  // height媛� �뺥솗��
  $tooltip.css({ visibility: 'hidden', display: 'block' });

  var btnOffset = $button.offset();
  var btnWidth = $button.outerWidth();
  var btnHeight = $button.outerHeight();
  var tooltipWidth = $tooltip.outerWidth();
  var tooltipHeight = $tooltip.outerHeight();
  var windowWidth = $(window).width();
  var $wrap = $button.closest('.tooltip-wrap');
  var scrollTop = $(window).scrollTop();
  var leftPos = btnOffset.left + btnWidth / 2 - tooltipWidth / 2.5;
  var topPos;
  $tooltip.css({ visibility: '', display: '' });

  if ($wrap.hasClass('type-bottom')) {
    topPos = btnOffset.top + btnHeight + 8;
  } 

  if ($wrap.hasClass('type-top')) {
    $wrap.removeClass('type-top');
    var topThreshold = tooltipHeight + 20;
    if(btnOffset.top - scrollTop < topThreshold) {
      $wrap.addClass('type-bottom')
    } else {
      $wrap.addClass('type-top')
    }

    topPos = btnOffset.top - tooltipHeight + 10;
  }

  if ($('html').hasClass('mb-layout') || windowWidth < 768) {
    leftPos = 20;
  } else {
    if (leftPos + tooltipWidth > windowWidth - 10) {
      leftPos = windowWidth - tooltipWidth - 10;
    }
  }

  $tooltip.css({
    top: topPos,
    left: leftPos,
    visibility: 'visible',
  });
};

/**
  * @name setTermsAct()
  * @description �곗씠�명뵾而� �쒖옉�� 醫낅즺�� �ㅼ젙
  */
var setTermsAct = function () {
  $('.set-terms').each(function () {
    var start = $('input').filter('[data-term-start="' + $(this).attr('data-target') + '"]');
    var end = $('input').filter('[data-term-end="' + $(this).attr('data-target') + '"]');
    var btns = $(this).find('[data-btn]');
    btns.off('click.terms').on('click.terms', function () {
      // days, months, years
      var $this = $(this);
      var days = $(this).attr('data-days');
      var months = $(this).attr('data-months');
      var years = $(this).attr('data-years');
      var s = new Date().valueOf();
      var e = new Date();
      var y = e.getFullYear();
      var m = e.getMonth() + 1;
      var d = e.getDate();
      var yy = y;
      var mm = m < 10 ? '0' + m : m;
      var dd = d < 10 ? '0' + d : d;
      if (days && days > 0) {
        s = new Date(s - days * 24 * 60 * 60 * 1000);
        y = s.getFullYear();
        m = s.getMonth() + 1;
        d = s.getDate();
      }
      if (months && months > 0) {
        m = m - months;
        if (m <= 0) {
          y--;
          m = m + 12;
        }
      }
      if (years && years > 0) {
        y = y - years;
      }

      m = m < 10 ? '0' + m : m;
      if (m == 2) {
        if (y % 4 == 0) {
          d = d > 29 ? 29 : d;
        } else {
          d = d > 28 ? 28 : d;
        }
      }
      d = d < 10 ? '0' + d : d;
      s = y + '.' + m + '.' + d;
      start.val(s).trigger('change');
      end.val(yy + '.' + mm + '.' + dd).trigger('change');
      setTimeout(function () {
        btns.removeClass('on');
        $this.addClass('on');
      }, 5);
    });
    start.off('change.termsAct').on('change.termsAct', function () {
      btns.removeClass('on');
    });
    end.off('change.termsAct').on('change.termsAct', function () {
      btns.removeClass('on');
    });
  })
}

/**
  * @name setDatepicker()
  * @description �곗씠�명뵾而�
  */
var setDatepicker = function () {
  function parseDotDate(dateStr) {
    if(!dateStr) return null;
    var parts = dateStr.split('.');
    if(parts.length !== 3) return null;

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day)
    return isNaN(date.getTime()) ? null : date;
  }

  $('.datepicker-item').each(function () {
    var $el = $(this);
    var defaultView = $(this).attr('data-min-view') || 'days';

    const rawMax = $el.attr('maxdate');
    const rawMin = $el.attr('mindate');
    const rawVal = $el.val();

    var max = parseDotDate(rawMax);
    var min = parseDotDate(rawMin);
    var defaultDate = parseDotDate(rawVal);

    var frmt = defaultView == 'years' ? 'yyyy' : defaultView == 'months' ? 'yyyy.mm' : 'yyyy.mm.dd';
    var opt = {
      buttonId: $el.data('datepickerButton'),
      clearButton: false,
      todayButton: false,
      autoClose: true,
      container: 'body',
      view: defaultView,
      dateFormat: frmt,
      language: 'ko',
      maxDate: max,
      minDate: min,
      date: defaultDate,
      showEvent: 'click',
      toDayBtn: true,
      todayHighlight: true,
      navTitles: {
        days: '<i class="year">yyyy</i><i class="suffix">��</i><i class="month">MM</i>',
        months: '<i class="year">yyyy</i><i class="suffix">��</i>',
        years: '<i class="year">yyyy1</i> ~ <i class="year">yyyy2</i>'
      },
      onShow: function (pick) {
        $('.input-datepicker-btn').removeClass('focusBtn');
        pick.$el.next('.input-datepicker-btn').addClass('focusBtn');
        
        pick.$prevValue = pick.$el.val();

        if ($('html').hasClass('mb-layout')) {
          pick.$datepicker.closest('.datepickers-container').addClass('active')
          pick.$datepicker.closest('.datepickers-container.active').off('click.pickClose').on('click.pickClose', function (e) {
            if (e.target.id == 'datepickers-container') {
              pick.hide();
            }
          });
        }
        if (!pick.$datepicker.find('.datepicker-close-btn').length) {
          pick.$datepicker.append('<button class="datepicker-close-btn" title="�リ린"></button>')
        }
        pick.$datepicker.find('.datepicker-close-btn').off('click').on('click', function () {
          pick.hide();
          $el.focus();
        });

        if (pick.$el.closest('.layer-popup-wrap').length) {
          pick.$datepicker.css('z-index', 50);
        }

        setTimeout(() => {
          var focusableElements = 'button, [data-date], [data-month], [data-year], [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          var $focusable = pick.$datepicker.find(focusableElements).filter(':visible:not([disabled])');
          var firstFocusable = $focusable.first();
          var lastFocusable = $focusable.last();
          if (firstFocusable.length) {
              firstFocusable.focus();
          }
          pick.$datepicker.on('keydown', function (e) {
              if (e.key === 'Tab') {
                
                  if (e.shiftKey) {
                      if (document.activeElement === firstFocusable[0]) {
                          e.preventDefault();
                          lastFocusable.focus();
                      }
                      } else {
                      if (document.activeElement === lastFocusable[0]) {
                          e.preventDefault();
                          firstFocusable.focus();
                      }
                  }
              }
          });
        }, 0);
        
        if(pick.$datepicker.find('.-selected-').length) {
          pick.$datepicker.find('.-selected-').attr('title', "�좏깮��");
        }
      },
      onHide: function (pick) {
        if (pick.$pickerBtn) {
          if (pick.$el.val()) {
            pick.$pickerBtn.siblings('.input-clear-btn').addClass('show');
          } else {
            pick.$pickerBtn.siblings('.input-clear-btn').removeClass('show');
          }
        }
        if ($('html').hasClass('mb-layout')) {
          pick.$datepicker.closest('.datepickers-container').removeClass('active');
        }
        if (pick.$el.val() && pick.$prevValue != pick.$el.val()) {
          pick.$el.on('input');
          pick.$el.trigger('change');
          pick.$el.closest('.input-con').addClass('has-val').removeClass('focus');
        }
        // $el.focus();

        $(document).find('.focusBtn').focus();
      }
    }
    $(this).datepicker(opt);
    this.datepicker = $(this).data('datepicker');

    if (!this.datepicker.opts.inline) {
      this.datepicker.hide();
    }
  });
}


/**
  * @name authAnimation()
  * @description �몄쬆 �좊땲硫붿씠��
  */
var authAnimation = function() {
  let showidx = 0;
	const objGroup = $(".auth-form-wrap > div");
	const validationBtn = $('.btn-vali');
	const nextBtn = $('.btn-next');
	const headerTit = $('.title-wrap .title');
	const headerTxt = $('.cont-header .title-wrap .txt');

  $(".auth-form-wrap").each(function(){
    $(this).find(' > div').eq(showidx).addClass("show");
	  checkBlock($(this).find(' > div').eq(showidx));
  })

	function checkBlock(obj) {
		let chktype = obj.attr("data-check");
		let tittype = obj.attr('data-type');

		if (chktype == "inp") {
      if(tittype === "director") {
        headerTit.html('�대떦�먮챸��<br>�낅젰�댁＜�몄슂.')
      }
      if(tittype === "owner") {
				headerTit.html('�뚯쑀�먮챸��<br>�낅젰�댁＜�몄슂.')
			}

			nextBtn.on('click', function () {
        if (obj.find("input").val()) {
          showBlock(obj);
        }
      });
		} else if(chktype == "cp_num") {
      headerTit.html('�ъ뾽�먮벑濡앸쾲�몃� <br>�낅젰�댁＜�몄슂');
			obj.find("input").on("input", function () {
				if (obj.find("input").val().length == 10) {
					showBlock(obj);
				}
			});
    } else if (chktype == "jumin") {
			headerTit.html('�앸뀈�붿씪�� <br>�낅젰�댁＜�몄슂');
			obj.find("input").on("input", function () {
				if (obj.find("input").eq(0).val().length == 6) {
					obj.find('.ele_jumin2').focus();
					if ($('.ele_jumin2').val().length == 1) {
						showBlock(obj);
					}
				}
			});
		} else if (chktype == "jumin_full") {
			headerTit.html('二쇰��깅줉踰덊샇瑜� <br>�낅젰�댁＜�몄슂');
			obj.find("input").on("input", function () {
				if (obj.find("input").eq(0).val().length == 6) {
					obj.find('.ele_jumin_full2').focus();
					if ($('.ele_jumin_full2').val().length == 7) {
						showBlock(obj);
					}
				}
			});
		} else if (chktype == "select") {
			if(tittype == "telecom") {
				headerTit.html('�듭떊�щ� <br>�좏깮�댁＜�몄슂');
			}
      if(obj.index() !== 0) {
        if($('html').hasClass('mb-layout')) {
          obj.find(".select-box.mobile").click();
        } else {
          obj.find(".select-box.pc").click();
        }
      }
			obj.find("select").on("change", function () {
				showBlock(obj);
			});
		} else if (chktype == "select_card") {
			headerTit.html('移대뱶�щ� <br>�좏깮�댁＜�몄슂');
			obj.find("select").on("change", function () {
				showBlock(obj);
			});
		} else if (chktype == "select_amex") {
			headerTit.html('移대뱶�좏삎�� <br>�좏깮�댁＜�몄슂');
			obj.find("select").on("change", function () {
				showBlock(obj);
			});
		} else if (chktype == "card") {
			headerTit.html('移대뱶踰덊샇瑜� <br>�낅젰�댁＜�몄슂');
			obj.find("input").on("input", function () {
				showBlock(obj);
			});
		} else if (chktype == "phone") {
			headerTit.html('�대��� 踰덊샇瑜� <br>�낅젰�댁＜�몄슂');
			obj.find("input").on("input", function () {
        if (obj.find("input").val().length == 8) {
					showBlock(obj);
				}
			});
		} else {
			showBlock(obj);
		}
	}

	function showBlock(obj) {
    obj.addClass("complete");
    let nextObj = obj.next();
    
    setTimeout(() => {
      obj.find('.input-con').removeClass('focus');
      obj.find('.select-box').removeClass('focus');
    }, 0);

    setTimeout(() => {
      if(!nextObj.hasClass('complete') && !nextObj.find('.input-box').hasClass('type-readonly') && !nextObj.find('.input-box').hasClass('type-disabled')) {
        nextObj.find('.input-con').addClass('focus');
        nextObj.find('.input-box:first-child .input-default').focus().click();
        nextObj.find('select').focus().click();
      }
    }, 300);
    
    if(obj.index() >= 0){
      headerTxt.hide();
    }
    if (objGroup.index(nextObj) !== -1) {
      nextObj.addClass("show");
      checkBlock(nextObj);
    } else {
      validationBtn.on('click', function(){
        headerTit.html('�낅젰�� �뺣낫瑜�<br>�뺤씤�댁＜�몄슂');
      })
    }
  }
}
/**
  * @name stepAnimation()
  * @description �④퀎蹂� �낅젰�� �좊땲硫붿씠��
  */
var stepAnimation = function(conId) {
  var showidx = 0;
  var objGroup = null;
  if(conId) {
    objGroup = $('#' + conId).find(".step-form-wrap > div");
  } else {
    objGroup = $(".step-form-wrap > div");
  }

  $(".step-form-wrap").each(function(){
    $(this).find(' > div').eq(showidx).addClass("show");
	  checkBlock($(this).find(' > div').eq(showidx));
  })

	function checkBlock(obj) {
		var chktype = obj.attr("data-check");

    var nextBtnOrigin = obj.find('.btn-next');
    var nextBtn = obj.find('.btn-step-next');
    
    var headerTit = obj.closest('.inner').find('.cont-header .title-wrap .title');
	  var headerTxt = obj.closest('.inner').find('.cont-header .title-wrap .txt');

    var chktit = obj.find('.step-title').html();
    var chktxt = obj.find('.step-txt').html();

    headerTit.html(chktit);
    headerTxt.html(chktxt);

    obj.on('keydown', function (e) {
      if (e.key === 'Enter') {
        showBlock(obj);
      }
    });
    obj.find('input').on('input change', function (e) {
      if ($(this).val().length === 0) {
        if(obj.hasClass('complete')) {
          obj.removeClass('complete');
        }
      }
    });

    if(objGroup.closest('.step-form-wrap').find('[data-check]').length === objGroup.closest('.step-form-wrap').find('[data-check].complete').length) { // �낅젰 �ㅽ뻽�� �� 泥댄겕
      showBlock(obj);
    }
		if (chktype == "inp" && !obj.hasClass('complete')) {
			nextBtn.on('click', function () {
        if(objGroup.closest('.step-form-wrap').find('[data-check]').length === objGroup.closest('.step-form-wrap').find('[data-check].complete').length) return;
        if (obj.find("input").val()) {
          showBlock(obj);
        }
      });
      nextBtnOrigin.on('click', function () {
        if (obj.find("input").val()) {
          showBlock(obj);
        }
      });
		} else if(chktype == "pw") {
      nextBtnOrigin.on('click', function () {
        if (obj.find("input").val()) {
          showBlock(obj);
        }
      });
    }  else if (chktype == "select" && !obj.hasClass('complete')) {
      if(objGroup.closest('.step-form-wrap').find('[data-check]').length === objGroup.closest('.step-form-wrap').find('[data-check].complete').length) return;

      if(obj.index() !== 0) {
        if($('html').hasClass('mb-layout')) {
          obj.find(".select-box.mobile").click();
        } else {
          obj.find(".select-box.pc").click();
        }
      }
      
      obj.find("select").on("change", function () {
        showBlock(obj);
      });
			
		} else if(chktype == "cp_num" && !obj.hasClass('complete')) {
			obj.find("input").on("input", function () {
				if (obj.find("input").val().length >= 10) {
					showBlock(obj);
				} else {
          obj.removeClass('complete');
        }
			});
    } else if (chktype == "btn" && !obj.hasClass('complete')) {
      if(obj.find('.btn-select.active').length) {
        showBlock(obj);
      }
		} else if (chktype == "birth" && !obj.hasClass('complete')) {
			obj.find("input").on("input", function () {
				if (obj.find("input").eq(0).val().length == 4 && obj.find("input").eq(1).val().length == 2 && obj.find("input").eq(2).val().length == 2) {
          if(objGroup.closest('.step-form-wrap').find('[data-check]').length === objGroup.closest('.step-form-wrap').find('[data-check].complete').length) return;
					showBlock(obj);
				} else {
          obj.removeClass('complete');
        }
			});
		} else if (chktype == "phone" && !obj.hasClass('complete')) {
      if(objGroup.closest('.step-form-wrap').find('[data-check]').length === objGroup.closest('.step-form-wrap').find('[data-check].complete').length) return;

			obj.find("input").on("input", function () {
        if (obj.find("input").val().length >= 11) {
					showBlock(obj);
          // obj.closest('.inner').find('.cont-header .title-wrap .title').html('�낅젰�� �뺣낫瑜� �뺤씤�댁＜�몄슂');
				} else {
          obj.removeClass('complete');
        }
			});
		} else {
			showBlock(obj);
		}
	}

	function showBlock(obj) {
    obj.addClass("complete");
    let nextObj = obj.next();
    setTimeout(() => {
      $('html, body').animate({scrollTop : 0 }, 300);

      obj.find('.input-con').removeClass('focus');
      obj.find('.select-box').removeClass('focus');
    }, 0);
  
    if(nextObj.attr('data-check') === "birth") {
      var fakeInput = $('<input />');
      fakeInput.attr('type', 'text');
      fakeInput.css('position', 'absolute');
      fakeInput.css('opacity', '0');
      fakeInput.css('height', '0');
      
      obj.append(fakeInput);
      
      fakeInput.focus();
    }
    setTimeout(() => {
      if(!nextObj.hasClass('complete') && !nextObj.find('.input-box').hasClass('type-readonly') && !nextObj.find('.input-box').hasClass('type-disabled')) {
        nextObj.find('.input-con').addClass('focus');
        nextObj.find('.input-box:first-child .input-default').focus().click(); 
      }
    }, 300);

    if(nextObj.find('input').val() === '') {
      nextObj.removeClass('complete'); 
    }

    if (objGroup.index(nextObj) !== -1) {
      nextObj.addClass("show");
      checkBlock(nextObj);
    } else {
      obj.closest('.inner').find('.cont-header .title-wrap .title').html($('.step-form-wrap > .step-title').html());
      obj.closest('.inner').find('.cont-header .title-wrap .txt').html($('.step-form-wrap > .step-txt').html());
      if(!$('.step-form-wrap > .step-txt').length) {
        obj.closest('.inner').find('.cont-header .title-wrap .txt').hide();
      }
    }
  }
}

/**
  * @name targetMove()
  * @description �대떦 �꾩튂濡� �대룞�섎뒗 湲곕뒫
  */

var targetMove = function(id) {
  var $element = $("#" + id);

  if($('html').hasClass('mb-layout')) {
    if($element.length) {
      $('html, body').animate({scrollTop : $element.offset().top - 60 }, 300);
    } else {
      $('html, body').animate({scrollTop : 0 }, 300);
    }
  } else {
    $('html, body').animate({scrollTop : 0 }, 300);
  }
}

/**
  * @name focusMove()
  * @description �대떦 �꾩튂濡� �대룞�섎뒗 湲곕뒫
  */

var focusMove = function(id) {
  var $elInput = $("#" + id);
  var scrollTop = $(window).scrollTop();
  var minSt = Math.round($elInput.offset().top - 25);
  var maxSt = Math.round($elInput.offset().top + 25);
  if(minSt > scrollTop || maxSt < scrollTop) {
    if($('html').hasClass('mb-layout')) {
      if($('.snb-wrap').is(':hidden')) {
        $('html, body').animate({scrollTop : $elInput.offset().top - $('#header').outerHeight() }, 300);
      } else {
        $('html, body').animate({scrollTop : $elInput.offset().top - $('#header').outerHeight() - $('.snb-wrap').outerHeight() - 50 }, 300);
      }
    }
    if($('html').hasClass('pc-layout')) {
      $('html, body').animate({scrollTop : $elInput.offset().top - $('#header').outerHeight() }, 300);
    }
  }
}

// �먯꽭媛� �붾낫湲� 踰꾪듉
$(".btn-more").click(function () {
  $(this).toggleClass("on");

  if ($(this).hasClass("on")) {
    $("+ .btn-container", this).show();
  } else {
    $("+ .btn-container", this).hide();
  };
});

//�ъ뾽�먮벑濡앸쾲�� '-' �먮룞�몄텧
$(document).ready(function(){
	$('#companyNum, .company-num').keydown(function (event){
    var key = event.charCode || event.keyCode || 0;
    $text = $(this);
    if(key !== 8 && key !== 9){
      if($text.val().length === 3){
        $text.val($text.val() + '-');
      }
      if ($text.val().length === 6){
        $text.val($text.val() + '-');
      }
    }
    return(key == 8 || key == 46 || (key >= 48 && key <= 57) ||(key >= 96 && key <= 105));
  })
});


$(document).ready(function(){
  //s:�묎렐�� 愿���
  $('.layerpop-wrap').find('.btn-close > span').text('�リ린');
  $('input:not([type="hidden"]').each(function(idx) {
    if($(this).attr('id')) {
      $(this).closest('label').attr('for', $(this).attr('id'))
    } else {
      $(this).attr('id', 'jbInputId' + idx);
      $(this).closest('label').attr('for', 'jbInputId' + idx);
    }
  })
  $('.input-con label').each(function() {
    if($(this).text().includes('*')) {
      $(this).append('<span class="blind">�꾩닔 �낅젰</span>');
      if(!$('.legend-txt').length) {
        $(this).closest('.contents').prepend('<p class="legend-txt ta-r" data-lang="">* �� �꾩닔�낅젰 ��ぉ�낅땲��</p>');
      }
    }
  })
  $('.select-box.pc .select-label').each(function() {
    if($(this).text().includes('*')) {
      $(this).append('<span class="blind">�꾩닔 �낅젰</span>');
      if(!$('.legend-txt').length) {
        $(this).closest('.contents').prepend('<p class="legend-txt ta-r" data-lang="">* �� �꾩닔�낅젰 ��ぉ�낅땲��</p>');
      }
    }
  })
  $('.select-box.mobile .select-label').each(function() {
    if($(this).text().includes('*')) {
      $(this).append('<span class="blind">�꾩닔 �낅젰</span>');
      if(!$('.legend-txt').length) {
        $(this).closest('.contents').prepend('<p class="legend-txt ta-r" data-lang="">* �� �꾩닔�낅젰 ��ぉ�낅땲��</p>');
      }
    }
  })
  $('.textarea-wrap label').each(function() {
    if($(this).text().includes('*')) {
      $(this).append('<span class="blind">�꾩닔 �낅젰</span>');
      if(!$('.legend-txt').length) {
        $(this).closest('.contents').prepend('<p class="legend-txt ta-r" data-lang="">* �� �꾩닔�낅젰 ��ぉ�낅땲��</p>');
      }
    }
  })

  $('.input-con.type-auth .input-box:nth-child(1) input').attr('title', '�몄쬆踰덊샇 泥ル쾲吏� �먮━');
  $('.input-con.type-auth .input-box:nth-child(2) input').attr('title', '�몄쬆踰덊샇 �먮쾲吏� �먮━');
  $('.input-con.type-auth .input-box:nth-child(3) input').attr('title', '�몄쬆踰덊샇 �몃쾲吏� �먮━');
  $('.input-con.type-auth .input-box:nth-child(4) input').attr('title', '�몄쬆踰덊샇 �ㅻ쾲吏� �먮━');
  $('.input-con.type-auth .input-box:nth-child(4) input').attr('title', '�몄쬆踰덊샇 �ㅼ꽢踰덉㎏ �먮━');
  $('.input-con.type-auth .input-box:nth-child(6) input').attr('title', '�몄쬆踰덊샇 �ъ꽢踰덉㎏ �먮━');

  $('.submain-navi .navi.active').attr('title', '�좏깮��');
  // if (!isPc()) {
  //   $('.btn-ico-clear').attr('aria-hidden', 'true');
  // }

	$(document).on('keydown', function(e) {
		if(e.key === 'Tab') {
			setTimeout(() => {
				var $active = $(document.activeElement);
				if($active.length) {
					$active[0].scrollIntoView({behavior: 'smooth', block: 'center'})
				}
			}, 0);
		}
	})
  $(document).on('mouseenter focus click', '.opt-chk-list > li > a', function() {
    $('.opt-chk-list > li > a').attr('title', '');
    $(this).attr('title', '�좏깮��');
  })
  //e:�묎렐�� 愿���
})