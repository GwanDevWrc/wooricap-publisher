$(document).ready(function () {

    // MutationObserver濡� �대옒�� 蹂�寃� 媛먯�
    function observeClassChanges(targetElement) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                const element = mutation.target;
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    try{
                        if( $(element).attr('jbevent-show') && $(element).hasClass('show') ) {
                            jbwrcUtil.pageUtil.pageClickLog($(element).attr('jbevent-show'), 'show');
                        } else if( $(element).attr('jbevent-render') && $(element).hasClass('show') ) {
                            jbwrcUtil.pageUtil.pageClickLog($(element).attr('jbevent-render'), 'render');
                        } else if( $(element).attr('jbevent-render-hidden') && !$(element).hasClass('hidden') ) {
                            if( $(element).parents('.layerpop-wrap').length == 0 || $(element).parents('.layerpop-wrap').hasClass('show') ){
                                if( $(element).parents('.auth2nd').length > 0 ) {
                                    if( !$(element).parents('.auth2nd').hasClass('hidden') ) jbwrcUtil.pageUtil.pageClickLog($(element).attr('jbevent-render-hidden'), 'render');
                                } else if( !$(element).parents('.contents-wrap').hasClass('hidden') ){
                                    jbwrcUtil.pageUtil.pageClickLog($(element).attr('jbevent-render-hidden'), 'render');
                                }
                                
                            }
                        }
                    }catch (error) {
                        console.error(error);
                    }
                } else if( mutation.type === 'attributes' && mutation.attributeName === 'style' ) {
                    try{
                        if( $(element).attr('jbevent-render') && $(element).css('display') !== 'none' ) {
                            jbwrcUtil.pageUtil.pageClickLog($(element).attr('jbevent-render'), 'render');
                        } 
                    }catch (error) {
                        console.error(error);
                    }
                }
            }
        });
        observer.observe(targetElement, {
            attributes: true, // �띿꽦 蹂�寃� 媛먯� 
            attributeFilter: ['class', 'style'] // 'class', style �띿꽦留� 媛먯� 
        });
    }
    
    // �대깽�� �몃뱾�� �뺤쓽 
    function setupEventHandlers() {
        // Page render �대깽�� 泥섎━ 
        $('.contents-wrap[jbevent-render]').each(function () {
            try{
                if( !$(this).hasClass('hidden') && $(this).css('display') !== 'none' ){
                    jbwrcUtil.pageUtil.pageClickLog($(this).attr('jbevent-render'), 'render');
                }
            } catch (error) {
                console.error(error);
            }
        });
        // Click �대깽�� 泥섎━ 
        $(document).on('click', '[jbevent-click], button[jbevent-select]', function () {
            try{
                if($(this).attr('jbevent-click')){
                    jbwrcUtil.pageUtil.pageClickLog($(this).attr('jbevent-click'), 'click');
                } else if($(this).attr('jbevent-select')){
                    jbwrcUtil.pageUtil.pageClickLog($(this).attr('jbevent-select'), 'select');
                }
                
            } catch (error) {
                console.error(error);
            }
        });
        // Input focusout �대깽�� 泥섎━
        // trigger focusout �� �ъ슜�섎뒗 寃쎌슦媛� �덉뼱 愿�由щ줈吏� 異붽�
        let jbeventFocusList = [];
        $(document).on('focusin', '[jbevent-input]', function () {            
            //理쒓렐 focusin �� 媛앹껜 2媛쒕쭔 蹂닿�
            try{
                jbeventFocusList.push($(this));
                if( jbeventFocusList.length > 2)  {
                    jbeventFocusList.shift();
                }
            } catch (error){
                console.error(error);
            }
        });
        $(document).on('focusout', '[jbevent-input]', function () {
            try{
                //理쒓렐 focusin �� 媛앹껜�� 寃쎌슦
                if( jbeventFocusList.some(item => item.is($(this))) ) {
                    jbeventFocusList = jbeventFocusList.filter(item => !item.is($(this)));
                    jbwrcUtil.pageUtil.pageClickLog($(this).attr('jbevent-input'), 'input');
                }
            } catch (error) {
                console.error(error);
            }
        });
        // Select change �대깽�� 泥섎━ 
        $(document).on('change', 'select[jbevent-select]', function () {
            try{
                jbwrcUtil.pageUtil.pageClickLog($(this).attr('jbevent-select'), 'select');
            } catch (error) {
                console.error(error);
            }
        });
        // jbevent-show, render �띿꽦�� 媛�吏� �쒓렇�� MutationObserver �곸슜 
        $('[jbevent-show],[jbevent-render],[jbevent-render-hidden]').each(function () {
            try{
                observeClassChanges(this);
            } catch (error) {
                console.error(error);
            }
        });
        // DOM�� �숈쟻�쇰줈 異붽��� jbevent-show �쒓렇 泥섎━ 
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && $(node).attr('jbevent-show')) {
                        observeClassChanges(node);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    // 珥덇린 �ㅼ젙 
    //setTimeout(function(){
        setupEventHandlers();
    //},100);
});


// 紐⑤컮�� �꾩슜 �붾㈃ 愿��� 泥섎━
var _jbeventInnerWidth = 0;
//$(document).ready(function () {
(function(){
    const mobileUrls = [
        '/mdr/odspln/',  //紐⑥쭛��
        '/mdr/pln/',     //媛쒖씤�좎슜��異�
        '/mdr/mvm/',     //��異쒖씠�� ���섎�異�
        '/mdr/mrgg/',    //二쇳깮�대낫��異�
        '/mdr/ucr/umr/', //�먮룞李⑤떞蹂대�異�
    ];
    const directSessionTimeoutUrls =[
        '/mdr/',  //�ㅼ씠�됲듃 (�몄뀡���꾩븘�껋씠 醫낅즺�� �몄뀡醫낅즺 �섏씠吏�濡� �대룞 諛� �덈줈怨좎묠 ����)
        '/mem/cap/',//�뚯썝媛���
        '/cst/crt/',//�ㅼ젙
    ];

    let pathname = location.pathname;
    const isMobileUrl = mobileUrls.some(item => pathname.startsWith(item));
    if( isMobileUrl ) {
        console.log('紐⑤컮�� �꾩슜�붾㈃ : ' + pathname);
        if( !JBWRC.isMobile() ){
            jbwrcUtil.pageUtil.goPage('/cmm/JCOMERR0005.do');
            return;
        }
    }
    const isDirectSessionTimeoutUrl = directSessionTimeoutUrls.some(item => pathname.startsWith(item));
    //console.log(isDirectSessionTimeoutUrl);
    if( isDirectSessionTimeoutUrl ) {
        setTimeout(function() {
            //以묐났�쇰줈 �몄뀡 ���대㉧媛� �뚯� �딅룄濡� �섍린 �꾪빐 ���꾩븘�껋쓣 二쇨퀬 �섏씠吏� 濡쒕뵫 �� �먮떒
            if(jbwrcFnc.securityTime.securityTimeoutChk == 0){
                jbwrcUtil.securityUtil.init();
            } 
        }, 3000);
    }
    let _isJCOMERR0005 = false;
    $(window).on('resize orientationchange', function(){
        if( isMobileUrl ) {
            JBWRC.ua();
            if( !JBWRC.isMobile() && !_isJCOMERR0005 ){
                _isJCOMERR0005 = true;
                jbwrcUtil.pageUtil.goPage('/cmm/JCOMERR0005.do');
                return;
            }
        }
        /*
        mql = window.matchMedia('(orientation: portrait)');
        if( mql.matches ) {
            if(_jbeventInnerWidth == 0 ) {
                _jbeventInnerWidth = window.innerWidth;
            } else if( isMobileUrl && window.innerWidth > _jbeventInnerWidth ) {
                jbwrcUtil.pageUtil.goPage('/cmm/JCOMERR0005.do');
            }
        }
        */
    });

    /*
    function onOrientationChanged(orientation){
        console.log('諛⑺뼢 �꾪솚 媛먯�:', orientation);
    }
    function getOrientation(){
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
    //珥덇린 �몃줈紐⑤뱶�� 寃쎌슦 �볦씠 湲곕줉
    let mql = window.matchMedia('(orientation: portrait)');
    if( mql.matches ) {
        _jbeventInnerWidth = window.innerWidth;
    }

    let current = getOrientation();    
    function mqHandler(e){
        let newOrientation = e.matches ? 'portrait' : 'landscape';
        if( newOrientation !== current ) {
            current = newOrientation;
            onOrientationChanged(current);
        }
    }
    */
    /*
    $(document).ready(function(){
        if( isMobileUrl ){
            jbwrcUtil.pageUtil.preventBackNavigation();
            back.athn();
        }
    });
    */
})();
