/***********************************************************************************
 * 
 * �꾨줈�앺듃 �듯빀�� �곕Ⅸ �몄쬆 js �뚯씪 蹂�寃�
 * js/ui/common_cert.js  ===>  /assets/js/cmm/common_auth.js
 * 
 ***********************************************************************************/

var commonAuth = {

    // 濡쒖뺄 �몄쬆 泥섎━
    callAuthSuperPass : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/authSuperPass.do"
            , data : param                   
            , beforeShow : true              
            , compleShow : true              
            , callBack : function( data ){   
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    


    /**
     * �대��� 蹂몄씤�몄쬆 �몄쬆踰덊샇 �붿껌
     * 
     * @param param
     *      custNm      : 怨좉컼紐�
     *      custType    : 怨좉컼�좏삎(�닿뎅��:1, �멸뎅��:4)
     *      rnno        : 二쇰�踰덊샇
     *      brdd        : �앸뀈�붿씪
     *      sexCd       : �깅퀎(��:1, ��:2)
     *      cmcmDvcd    : �듭떊�� (01 SKT / 02 KT / 03 LG U+ / 04 SKT �뚮쑑�� / 05 KT �뚮쑑�� /06 LG U+ �뚮쑑��)
     *      clphLcno    : �대��곕쾲�� �욎옄由�
     *      clphTono    : �대��곕쾲�� 媛��대뜲�먮━
     *      clphSeqno   : �대��곕쾲�� 留덉�留됱옄由�
     *      itBzwkClcd  : IT�낅Т遺꾨쪟肄붾뱶 - 40005 : �ㅼ씠�됲듃 / 40006 : �ы썑愿�由�
     *      cstnoNmbrYn : 怨좉컼踰덊샇梨꾨쾲�щ� - �ㅼ씠�됲듃 �꾩슜, �ы썑 X
     *      cifqAgrYn   : �좎슜�뺣낫議고쉶�숈쓽�щ�
     *      dprmcd      : �낅젰遺��쒖퐫��
     *      athnDvcd    : �몄쬆援щ텇肄붾뱶 01:�대��꾪솕蹂몄씤�몄쬆 02:�좎슜�뺣낫議고쉶�숈쓽�대��꾪솕�몄쬆 11:�좎슜�뺣낫議고쉶�숈쓽怨듬룞�몄쬆
     *      hashVal     : �몄쬆臾몄옄�댁돩媛�_S11  TODO 蹂��섎챸 留욎떠�쇳븿 Athn_ltrs_hash_val_s11
     * 
     * @param callback
     *      callback �⑥닔
     *      
     * @example
     *      callPhoneSelfAuthRequest( param, function( status, data ) {
     *          console.log( status + " : " + data ); 
     *      });
     *      
     */    
    callPhoneSelfAuthRequest : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/phoneSelfAuthRequest.do"           // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * �대��� 蹂몄씤�몄쬆 �몄쬆踰덊샇 �뺤씤
     * 
     * @param param
     *      selfAthnMgmtNo : 愿�由щ쾲�� ( �대��� �몄쬆 �붿껌�� return data�� �닿꺼�덉쓬 )
     *      athnDmanNo : �몄쬆踰덊샇
     *      
     * @param callback
     *      callback �⑥닔
     *      
     * @example
     *      callPhoneQueryForResult( param, function( status, data ) {
     *          console.log( status + " : " + data ); 
     *      });
     *      
     */
    callPhoneQueryForResult : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/phoneQueryForResult.do"            // url
            , data : param                                      // param
            //, beforeShow : true                                 // 濡쒕뵫諛� �щ�
            //, compleShow : true                                 // 濡쒕뵫諛� �щ�
            , async : false
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * 移댁뭅�ㅽ럹�� �몄쬆 �붿껌
     * 
     * @param param
     *      custNm    : 怨좉컼紐�
     *      rnno      : 二쇰�踰덊샇
     *      brdd      : �앸뀈�붿씪
     *      clphLcno  : �대��곕쾲�� �욎옄由�
     *      clphTono  : �대��곕쾲�� 媛��대뜲�먮━
     *      clphSeqno : �대��곕쾲�� 留덉�留됱옄由�
     *      title     : �몄쬆 �붿껌 �� 移댁뭅�� 硫붿꽭吏��� �붿껌援щ텇 媛�
     * 
     * @param callback
     *      callback �⑥닔
     *      
     */    
    callKakaoSelfAuthRequest : function (param, callback) {

        jbwrcUtil.customAjax({
            url : "/cmm/aut/kakaoSelfAuthRequest.do"                // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * 移댁뭅�ㅽ럹�� �몄쬆 �뺤씤
     * 
     * @param param
     *      selfAthnMgmtNo : 愿�由щ쾲�� ( 移댁뭅�ㅽ럹�� �몄쬆 �붿껌�� return data�� �닿꺼�덉쓬 )
     *      
     * @param callback
     *      callback �⑥닔
     *      
     * @noti
     *      error�� error�댁슜�� �앹뾽�� �쒖텧�댁빞�댁꽌 customAjax 誘몄궗��
     *      
     */
    callKakaoQueryForResult : function (param, callback) {
        if (!jbwrcFnc.isEmpty(location.pathname)) {
            var fi = location.pathname.lastIndexOf("/")+1;
            var la = location.pathname.lastIndexOf(".");
            param.scnId = location.pathname.substring(fi,la);
        }
        
        jbwrcUtil.customAjax({
            url : "/cmm/aut/kakaoQueryForResult.do"            // url
            , data : param                                      // param
            , async : false
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });

    },

    /**
     * PASS �몄쬆 �붿껌
     * 
     * @param param
     *      custNm    : 怨좉컼紐�
     *      brdd      : �앸뀈�붿씪
     *      clphLcno  : �대��곕쾲�� �욎옄由�
     *      clphTono  : �대��곕쾲�� 媛��대뜲�먮━
     *      clphSeqno : �대��곕쾲�� 留덉�留됱옄由�
     *      title     : �몄쬆 �붿껌 �� �⑥뒪 硫붿꽭吏��� �붿껌援щ텇 媛� ---- TODO �뺤씤 �꾩슂
     * 
     * @param callback
     *      callback �⑥닔
     */    
    callPassSelfAuthRequest : function (param, callback) {

        jbwrcUtil.customAjax({
            url : "/cmm/aut/passSelfAuthRequest.do"                // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * PASS �몄쬆 �뺤씤
     * 
     * @param param
     *      selfAthnMgmtNo : 愿�由щ쾲�� ( �⑥뒪 �몄쬆 �붿껌�� return data�� �닿꺼�덉쓬 )
     *      
     * @param callback
     *      callback �⑥닔
     *      
     * @noti
     *      error�� error�댁슜�� �앹뾽�� �쒖텧�댁빞�댁꽌 customAjax 誘몄궗��
     *      
     */
    callPassQueryForResult : function (param, callback) {
        if (!jbwrcFnc.isEmpty(location.pathname)) {
            var fi = location.pathname.lastIndexOf("/")+1;
            var la = location.pathname.lastIndexOf(".");
            param.scnId = location.pathname.substring(fi,la);
        }
        
        jbwrcUtil.customAjax({
            url : "/cmm/aut/passQueryForResult.do"            // url
            , data : param                                      // param
            , async : false
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });


    },

    /**
     * TOSS �몄쬆 �붿껌 -- TODO �ы썑愿�由� 誘몄궗�⑹쑝濡� �ㅼ씠�됲듃 履� �뚮씪誘명꽣 �뺤씤 �� �뺤쓽 �꾩슂
     * 
     * @param param
     *      custNm    : 怨좉컼紐�
     *      brdd      : �앸뀈�붿씪
     *      clphLcno  : �대��곕쾲�� �욎옄由�
     *      clphTono  : �대��곕쾲�� 媛��대뜲�먮━
     *      clphSeqno : �대��곕쾲�� 留덉�留됱옄由�
     *      title     : �몄쬆 �붿껌 �� �⑥뒪 硫붿꽭吏��� �붿껌援щ텇 媛� ---- TODO �뺤씤 �꾩슂
     * 
     * @param callback
     *      callback �⑥닔
     *      
     */    
    callTossSelfAuthRequest : function (param, callback) {

        jbwrcUtil.customAjax({
            url : "/cmm/aut/tossSelfAuthRequest.do"            // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * TOSS �몄쬆 �뺤씤 -- TODO �ы썑愿�由� 誘몄궗�⑹쑝濡� �ㅼ씠�됲듃 履� �뚮씪誘명꽣 �뺤씤 �� �뺤쓽 �꾩슂
     * 
     * @param param
     *      selfAthnMgmtNo : 愿�由щ쾲�� ( �좎뒪 �몄쬆 �붿껌�� return data�� �닿꺼�덉쓬 )
     *      
     * @param callback
     *      callback �⑥닔
     *      
     * @noti
     *      error�� error�댁슜�� �앹뾽�� �쒖텧�댁빞�댁꽌 customAjax 誘몄궗��
     *      
     */
    callTossQueryForResult : function (param, callback) {
        if (!jbwrcFnc.isEmpty(location.pathname)) {
            var fi = location.pathname.lastIndexOf("/")+1;
            var la = location.pathname.lastIndexOf(".");
            param.scnId = location.pathname.substring(fi,la);
        }
        
        jbwrcUtil.customAjax({
            url : "/cmm/aut/tossQueryForStatus.do"            // url
            , data : param                                      // param
            //, beforeShow : true                                 // 濡쒕뵫諛� �щ�
            //, compleShow : true                                 // 濡쒕뵫諛� �щ�
            , async : false
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });

    },
    
    
    /**
     * 怨듭씤(怨듬룞)�몄쬆�� 蹂몄씤�몄쬆 �붿껌/�뺤씤 
     * �깅줉怨듭씤�몄쬆�� �뺤씤
     * 
     * @param param
     * @param callback
     * 
     * cmmcrosscert
     * \JLGISFI0003.jsp
     * \JLGISFP0003.jsp
     * crossCertSelfAuthRequest
     * 
     */
    callCrossCertSelfAuthRequest : function (param, callback) {

        //JBWRC.showLoading();
        jbwrcUtil.customAjax({
            url : "/cmm/aut/crossCertSelfAuthRequest.do"       // url
            , data : param                                      // param
            , beforeShow : true                                // 濡쒕뵫諛� �щ�
            , compleShow : true                                // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚

                //JBWRC.hideLoading(true);
                if( data.resultCode != '0' ){

                    // �쒓뎅�꾩옄�몄쬆 �ㅻ쪟肄붾뱶 硫붿꽭吏� �쒖텧
                    var getMsg = commonAuth.certMsgReFilter(data.resultCode);
                    var errMsg = "["+ data.resultCode + "]<br>" + getMsg;
                    
                    if (typeof getMsg == 'undefined') {
                        errMsg = '�몄쬆�� �뺣낫瑜� �뺤씤�댁＜�몄슂';
                    }
                    
                    JBWRC.alert( errMsg, { okBtnText: '�뺤씤', cancelBtnText: '' });
                }else{
                    callback( 'success', data );
                }
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * 湲덉쑖�몄쬆�� �몄쬆 �붿껌/�뺤씤
     * 湲덉쑖�몄쬆�� 蹂몄씤�몄쬆�듯빀議고쉶 諛� 湲덉쑖�몄쬆�� �깅줉 �щ� �뺤씤
     * 
     * @param certParam
     *      二쇰�踰덊샇 �뷀샇�붾뜲�댄꽣( 二쇰�踰덊샇 �덈뒗寃쎌슦 )
     *      湲덉쑖�몄쬆�� �몄쬆媛�
     * @param callback
     * 
     * comauth 1媛�
     */
    callFinCertSelfAuthRequest : function (certParam, callback) {

        new Promise(function(resolve, reject){

            // 湲덉쑖�몄쬆�� 寃�利�
            jbwrcUtil.customAjax({
                url : "/cmm/aut/finCertVerification.do"            // url
                , data : certParam                                  // param
                , beforeShow : true                                 // 濡쒕뵫諛� �щ�
                , compleShow : true                                 // 濡쒕뵫諛� �щ�
                , callBack : function( data ){                      // 肄쒕갚
                    // 湲덉쑖�몄쬆�� 寃�利� �깃났 �� 蹂몄씤�몄쬆�듯빀議고쉶
                    if( data.errcode == '0' ){
                        certParam.crfc_sigt_val = data.crfcSigtVal;       // 湲덉쑖�몄쬆�� �쒕챸媛�
                        certParam.crfc_unq_no = data.crfcUnqNo;           // 怨듭씤�몄쬆�쒓퀬�좊쾲��
                        certParam.inst_tx_no_s40 = data.instTxNoS40;      // 湲곌�嫄곕옒踰덊샇

                        resolve( data , certParam );
                    }else{
                        JBWRC.alert( data.errmessage, { okBtnText: '�뺤씤', cancelBtnText: '' });
                    }
                }, errorCallback : function (xhr, status, error){
                    callback( 'fail', xhr.responseJSON );
                }
            });

        }).then(function( data ){
            return new Promise(function(resolve, reject){

                // �꾩옄�쒕챸�좊븣留� 蹂몄씤�몄쬆�듯빀議고쉶
                if ( certParam.signType != '01' ) {

                    jbwrcUtil.customAjax({
                        url : "/cmm/aut/finCertSelfAuthRequest.do"         // url
                        , data : certParam                                  // param
                        , beforeShow : true                                 // 濡쒕뵫諛� �щ�
                        , compleShow : true                                 // 濡쒕뵫諛� �щ�
                        , callBack : function( returnData ){                // 肄쒕갚
                            returnData.finCrossCertInfo = data;
                            callback( 'success', returnData );
                        }, errorCallback : function (xhr, status, error){
                            callback( 'fail', xhr.responseJSON );
                        }
                    });

                } else {
                    callback( data );
                }

            });
        })
    },
    
    
    
    
    /**
     * 移대뱶 �몄쬆 �붿껌/�뺤씤
     * 
     * @param param
     * @param callback
     */
    callCardSelfAuthRequest : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/cardSelfAuthRequest.do"            // url
            , data : param                                      // param
            , beforeShow : true                                // 濡쒕뵫諛� �щ�
            , compleShow : true                                // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                //data.cardInfo = param;
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    
    /**
     * 怨꾩쥖寃�利�
     */
    callAcnoCnfrRequest : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/acnoCnfrRequest.do"                 // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    

    /**
     * 
     * 怨꾩쥖踰덊샇(1��) �몄쬆 �붿껌
     * 
     * @param param
     * 
     * @param callback
     *      callback �⑥닔
     *      
     */    
    callAcnoSelfAuthRequest : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/acnoSelfAuthRequest.do"           // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * 怨꾩쥖踰덊샇(1��) �몄쬆 �뺤씤
     * 
     * @param param
     *      
     * @param callback
     *      callback �⑥닔
     *      
     */
    callAcnoQueryForResult : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/acnoQueryForResult.do"            // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    
    /**
     * �ㅼ씠�됲듃 蹂몄씤�몄쬆 寃곌낵 �몄뀡 ����
     */
    setSelfAthnInfo : function (param, callback) {
        jbwrcUtil.customAjax({
            url : "/cmm/aut/setSelfAthnInfo.do"                 // url
            , data : param                                      // param
            , beforeShow : true                                 // 濡쒕뵫諛� �щ�
            , compleShow : true                                 // 濡쒕뵫諛� �щ�
            , async : false
            , callBack : function( data ){                      // 肄쒕갚
                callback( 'success', data );
            }, errorCallback : function (xhr, status, error){
                //xhr.responseJSON
                callback( 'fail', xhr.responseJSON );
            }
        });
    },
    
    /**
     * 怨듬룞�몄쬆�� 紐⑤뱢 �몄텧
     *
     * @param param :
     *            ��異쒕쾲��, ��異쒖씪�⑤쾲�� �� 怨좉컼�뺣낫 �곗씠��
     * @param frmParam :
     *            二쇰�踰덊샇 �뷀샇�� �곗씠��
     * @param callback :
     *            callback �⑥닔
     * @example : callCrossCert( param, crossCertFrmParam , function( data ){
     *
     * });
     */
    callCrossCert : function (param, callback) {
        
        event.preventDefault();
        var signSrc = '';
        if( !jbwrcFnc.isEmpty( param.signData ) ){
            signSrc = param.signData;
        }
        changeUniSignPolicy(param.certCustType);
        HPApp.CrossCert.signData(function(certData) {

            param.certRValue = certData.b64RValue;
            param.certUserDn = certData.certAttrs.subjectName;
            param.signedData = certData.signedData;

            commonAuth.callCrossCertSelfAuthRequest(param, callback);

        }, signSrc);
        
    },

    
    /**
     * 湲덉쑖�몄쬆�� �몄텧
     *
     * @example : fincertEvent.init() �⑥닔 �몄텧�섏뿬 device �뺣낫 �뺤씤 �� fincertEvent.call() 吏꾪뻾
     *          fincertEvent.init();
     *          $('#finCertNext').on('click', function(){
     *              fincertEvent.call( certSignData, certInfoData , callback );
     *          });
     */

    fincertEvent : {
        
        uniqVal : '',
        clientType : '',
        defensive_cnt : 0,  // 湲덉쑖�몄쬆�� �몄쬆 �щ윭踰� �대┃ 諛⑹� cnt
            
            
        /**
         * 湲덉쑖�몄쬆�� �몄텧 �� �붾컮�댁뒪 �뺤씤
         * �덈뱶濡쒖씠��, ios�쇨꼍�� uuid, �⑦궎吏�紐� �꾩슂
         */
        init : function() {

            var getDevice = JBWRC.getDevice();
            if (getDevice == 'IA' || getDevice == 'AA') {

                var dataParam = {
                    callback : "commonAuth.fincertEvent.deviceInfo"
                }
                if (!commonAuth.getIsBravoApp()) {
                    fn_GetDeviceInfo(dataParam);
                }
            }
        },
        /**
         * 媛��몄삩 �붾컮�댁뒪 �뺣낫 setting
         * �덈뱶濡쒖씠��, ios�쇨꼍�� clientType, uniqVal �꾩닔
         */
        deviceInfo : function(data) {

            var deviceType = data.deviceType;
            if (deviceType == 'A') {
                commonAuth.fincertEvent.clientType = 'ANDROID';
                commonAuth.fincertEvent.uniqVal = data.uuid;
            } else if (deviceType == 'I') {
                commonAuth.fincertEvent.clientType = 'IOS';
                commonAuth.fincertEvent.uniqVal = data.uuid;
            }
        },
        /**
         * certSignData : 湲덉쑖�몄쬆�쒖뿉 蹂댁뿬吏��� �댁슜
         * certInfoData = {
         *     signType : 濡쒓렇�� ( '01' ), �꾩옄�쒕챸 ( '02' )
         *     , certParam : {} 湲곌컙怨� �꾩옄�쒕챸 �뚮씪誘명꽣, 二쇰�踰덊샇 �뷀샇�� �뚮씪誘명꽣
         * }
         * callback : 寃곌낵 由ы꽩諛쏆쓣 �⑥닔
         */
        call : function( certSignData, certInfoData, callback ) {

            if( commonAuth.fincertEvent.defensive_cnt < 0 ){
                commonAuth.fincertEvent.defensive_cnt = 0;
            }else{

                //JBWRC.showLoading();        // 濡쒕뵫諛� show
                commonAuth.fincertEvent.defensive_cnt = commonAuth.fincertEvent.defensive_cnt - 1;

                var getDevice = JBWRC.getDevice();

                // �덈뱶濡쒖씠��, IOS �꾩닔 �뚮씪誘명꽣 泥댄겕
                if (getDevice == 'IA' || getDevice == 'AA') {
                    if (!jbwrcFnc.isEmpty(commonAuth.fincertEvent.uniqVal) && !jbwrcFnc.isEmpty(commonAuth.fincertEvent.clientType)) {
                        certInfoData.uniqVal = commonAuth.fincertEvent.uniqVal;
                        certInfoData.clientType = commonAuth.fincertEvent.clientType;
                    } else if (!jbwrcFnc.isEmpty(_deviceData) && !jbwrcFnc.isEmpty(_deviceData.deviceType)) {
                        
                        if (_deviceData.deviceType == 'A') {
                            commonAuth.fincertEvent.clientType = 'ANDROID';
                            commonAuth.fincertEvent.uniqVal    = _deviceData.uniqVal;
                        } else if (_deviceData.deviceType == 'I') {
                            commonAuth.fincertEvent.clientType = 'IOS';
                            commonAuth.fincertEvent.uniqVal    = _deviceData.uniqVal;
                        }

                        certInfoData.clientType = commonAuth.fincertEvent.clientType;
                        certInfoData.uniqVal    = commonAuth.fincertEvent.uniqVal;
                        
                    } else {
                        commonAuth.fincertEvent.init();
                        JBWRC.alert( '�꾩옱 湲덉쑖�몄쬆�쒕� �ъ슜�� �� �놁뒿�덈떎. <br>�ㅼ떆 �쒕룄�댁＜�몄슂.' , { okBtnText: '�뺤씤', cancelBtnText: '' });
                        return;
                    }
                } else {
                    certInfoData.clientType = 'WEB';
                }

                var certParam = {}; // 湲덉쑖�몄쬆�쒓�利�, 蹂몄씤�몄쬆�듯빀議고쉶�� �ъ슜�섎뒗 param
                if( !jbwrcFnc.isEmpty( certInfoData.certParam )) {
                    certParam = certInfoData.certParam;
                }
                // signType�� �녿뒗寃쎌슦 01濡� setting
                if( jbwrcFnc.isEmpty( certInfoData.signType )){
                    certParam.signType = '01'
                }else{
                    certParam.signType = certInfoData.signType;
                }
                // 湲덉쑖�몄쬆�� 紐⑤뱢�먯꽌 �꾩슂�녿뒗 �뚮씪誘명꽣 ��젣
                delete certInfoData.certParam;

                // 湲덉쑖�몄쬆�� �몄텧
                $finCert.call(certSignData, certInfoData, function(data) {

                    if( !jbwrcFnc.isEmpty(data) ){
                        // ���ㅼ슜 濡쒕뵫諛�
                        if(!(typeof certInfoData.findaChk === 'undefined') && certInfoData.findaChk == 'finda'){
                            window.Finda.setLoading();
                        }
                        // 湲덉쑖�몄쬆�� �몄쬆媛�
                        certParam.orcf_ecsg_val = data.signedVals[0];

                        // 湲덉쑖�몄쬆�� 寃�利�, 蹂몄씤�몄쬆�듯빀議고쉶
                        commonAuth.callFinCertSelfAuthRequest( certParam, callback );
                    }
                    commonAuth.fincertEvent.defensive_cnt = 0;
                });
            }
        }
    },
    
    // �몄쬆�먯꽌 �ъ슜�� 釉뚮씪蹂� �� 吏꾩엯 �щ�
    getIsBravoApp : function () {
        if (!jbwrcFnc.isEmpty(bravoYn) && 'Y' == bravoYn) {
            return true;
        }
        return false;
    },
    
    /**
     * �몄쬆 寃곌낵 return �⑥닔
     *
     * @param type :
     *            'call' -> �몄쬆 寃곌낵 �붿껌, 'return' -> �몄쬆 寃곌낵 由ы꽩
     * @param callback :
     *            callback �⑥닔 ( callback �⑥닔紐� 'getCertResult' 濡� 怨좎젙
     * @param returnType :
     *            �몄쬆諛⑸쾿
     * @param returnData :
     *            �몄쬆 寃곌낵 �곗씠�� ( �몄쬆 寃곌낵 �곗씠�곕뒗 �몄쬆 諛⑹떇�� �곕씪 �ㅻ쫫 )
     *            'phone', 'kakao', 'toss', 'pass', 'card', 'crossCert', 'fnncCert', 'recd'
     * @example : �몄쬆 寃곌낵 �붿껌 諛쏆쓣 怨녹뿉�� getCertResult �앹꽦 ( JARDCAP0001.jsp瑜� include�섎뒗
     *          �섏씠吏��먯꽌 �앹꽦 ) function getCertResult(result){ alert(result);
     *          console.log(result); if ( 由ы꽩 寃곌낵 �깃났�대㈃ ){ location.href = '�섏씠吏��대룞'; } }
     */
    sendCertResult : function (type, callback, returnType, returnData) {

        if (type != 'call') {
            sessionStorage.setItem("finAthnDvcd", returnType);    // ocr 2李� �몄쬆�� 湲곗〈 �몄쬆 �쒖쇅�섍린 �꾪빐 �ㅼ젙
            callback(returnType, returnData, _agreDvcd[returnType]);
        }
    },


    /**
     * 怨듬룞�몄쬆�� �쒓뎅�꾩옄�몄쬆 �ㅻ쪟肄붾뱶 -> 硫붿꽭吏� 蹂���
     */
    certMsgReFilter : function (str) {
        var msg = "";
        msg = certMsg[str];
        return msg;
    }
    
};


var _agreDvcd = {
    'phone' : '07',
    'kakao' : '08',
    'toss' : '12',
    'pass' : '14',
    'card' : '09',
    'crossCert' : '05',
    'fnncCert' : '10',
    'recd' : '01'
}


var certMsg = {
    "1"                 : "珥덇린�� �ㅻ쪟",
    "2"                 : "珥덇린�� �ㅻ쪟",
    "FFFFFFFFFF"        : "�뚮씪誘명꽣媛� �놁쓬.",
    "3"                 : "Memory allocated Fail.",
    "4"                 : "�몄쬆�� �ㅼ젙 �ㅻ쪟",
    "5"                 : "�쇱씠�쇱뒪 �ㅻ쪟",
    "6"                 : "�낅젰�� �뚮씪誘명꽣媛� �щ컮瑜댁� �딆뒿�덈떎.",
    "7"                 : "INVALID_NUMBERTYPE_MSG",
    "50000"             : "踰좎씠��64 �몄퐫�⑹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "50001"             : "踰좎씠��64 �붿퐫�⑹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1100001"           : "�몄쬆�쒓� �ㅼ젙�섏뼱 �덉� �딆뒿�덈떎.",
    "1100002"           : "�몄쬆�쒓� �ㅼ젙�섏뼱 �덉� �딆뒿�덈떎.",
    "1100003"           : "ASN.1 �붿퐫�⑹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1100004"           : "�몄쬆�쒖쓽 �ㅼ엫 �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "1100005"           : "�몄쬆�쒖쓽 �ㅼ엫 �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "1000005D"          : "�몄쬆�� �좏슚湲곌컙 �쒖옉�� �꾩옱�쒓컙蹂대떎 誘몃옒�� �쒓컙�낅땲��",
    "1000005E"          : "�몄쬆�쒗룓湲곕ぉ濡앹쓽 �좏슚湲곌컙�� 留뚭린�섏뿀�듬땲��.",
    "1000005F"          : "�몄쬆�쒗룓湲곕ぉ濡앹쓽 �좏슚湲곌컙 �쒖옉�� �꾩옱�쒓컙蹂대떎 誘몃옒�� �쒓컙�낅땲��.",
    "1100006"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(unspecified)",
    "1100007"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(keyCompromise)",
    "1100008"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(cACompromise)",
    "1100009"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(affiliationChanged)",
    "110000A"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(superseded)",
    "110000B"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(cessationOfOperation)" ,              
    "110000C"           : "�몄쬆�쒓� �먯�(�⑤젰�뺤�)�섏뿀�듬땲��.(cetificateHold)",
    "110000D"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(removeFromCRL)",
    "110000E"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(privilegeWithdrawn)",
    "110000F"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.(aACompromise)",
    "1100010"           : "�몄쬆�쒖쓽 �ㅼ슜�꾧� �좏슚�섏� �딆뒿�덈떎.",
    "1100011"           : "�몄쬆�쒖쓽 二쇱껜��泥댁씠由꾩씠 �좏슚�섏� �딆뒿�덈떎.",
    "1100012"           : "�몄쬆�쒖쓽 湲곌��ㅼ떇蹂꾩옄媛� �좏슚�섏� �딆뒿�덈떎.",
    "1100013"           : "�몄쬆�쒖쓽 諛쒓툒�먭� �좏슚�섏� �딆뒿�덈떎.",
    "1100014"           : "OCSP 寃�利앹뿉 �ㅽ뙣�덉뒿�덈떎.(鍮꾨�踰덊샇 ��由�)",
    "1100015"           : "�몄쬆�쒓� �먯��섏뿀�듬땲��.!!",
    "1100016"           : "�쒕쾭利앹꽌媛� �좏슚�섏� �딆뒿�덈떎.(OCSP)",
    "1100017"           : "�쒕쾭利앹꽌媛� 留뚭린�섏뿀�듬땲��.(OCSP)",
    "1100018"           : "�몄쬆�쒗룓湲곕ぉ濡앹씠 �좏슚�섏� �딆뒿�덈떎.",
    "110001E"           : "TSA �붿껌�� �ㅽ뙣�덉뒿�덈떎.",
    "110001F"           : "TSA �좉렐 寃�利앹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1100020"           : "TSA �좉렐 �띾뱷�� �ㅽ뙣�덉뒿�덈떎.",   
    "1100021"           : "TSA �좉렐 �몄퐫�⑹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1100022"           : "TSA �좉렐 �붿퐫�⑹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1100023"           : "TSA�� �쒕쾭�몄쬆�쒖쓽 鍮꾨�踰덊샇媛� ��由쎈땲��.",
    "1100024"           : "�쒕쾭利앹꽌媛� 留뚭린�섏뿀�듬땲��.(TSA)",
    "1100025"           : "�몄쬆�쒖껜�몄씠 �좏슚�섏� �딆뒿�덈떎.",
    "1100026"           : "�몄쬆�쒖쓽 二쇱껜�� �좏슚�섏� �딆뒿�덈떎.",
    "1100027"           : "�� �� �녿뒗 �뚭퀬由ъ쬁�낅땲��.",
    "1100028"           : "OCSP �붿껌硫붿떆吏� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "1100029"           : "OCSP �묐떟硫붿떆吏� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "110002A"           : "�몄쬆�� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "110002B"           : "�몄쬆�쒖껜�� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "110002C"           : "�몄쬆�쒗룓湲곕ぉ濡� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "1200001"           : "�몄쬆�쒖껜�� 寃�利앹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1700001"           : "媛쒖씤�ㅻ� 異붿텧�섎뒗�� �ㅽ뙣�덉뒿�덈떎.",
    "1700002"           : "媛쒖씤�� 鍮꾨�踰덊샇媛� �щ컮瑜댁� �딆뒿�덈떎.",
    "1700003"           : "媛쒖씤�� 鍮꾨�踰덊샇 �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1700004"           : "怨듦컻�� �앹꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "1700005"           : "媛쒖씤�� �뺤떇�� �щ컮瑜댁� �딆뒿�덈떎.",
    "1700004"           : "媛쒖씤�� �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1700005"           : "媛쒖씤�� �띾뱷�� �ㅽ뙣�덉뒿�덈떎.",
    "1700006"           : "媛쒖씤�� 鍮꾨�踰덊샇 �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1700007"           : "媛쒖씤�� �뚮━誘명꽣 �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1700008"           : "媛쒖씤�� �뚭퀬由ъ쬁 �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1700009"           : "媛쒖씤�� 鍮꾨�踰덊샇 �뷀샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "170000A"           : "媛쒖씤�� �띾뱷�� �ㅽ뙣�덉뒿�덈떎.",
    "1700064"           : "媛쒖씤�� �띾뱷�� �ㅽ뙣�덉뒿�덈떎.",
    "1400001"           : "�몄뀡�� �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1400002"           : "�몄뀡�� �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "1400003"           : "�쒕뜡媛� �앹꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "1400004"           : "�몄뀡�ㅺ� �ㅼ젙�섏뼱 �덉� �딆뒿�덈떎.",
    "1400005"           : "��移�궎 �뷀샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1400006"           : "��移�궎 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1400007"           : "鍮꾨�移�궎 �뷀샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1400008"           : "鍮꾨�移�궎 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1400009"           : "鍮꾨�移�궎 �ㅼ뙇�앹꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "16E361"            : "LDAP 珥덇린�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "16E362"            : "LDAP �묒냽�� �ㅽ뙣�덉뒿�덈떎.",
    "16E363"            : "LDAP �묒냽�� �듭뀡 �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "16E364"            : "LDAP 寃��됱뿉 �ㅽ뙣�덉뒿�덈떎.",
    "16E365"            : "LDAP 寃��됱뿉�ㅽ뙣�덉뒿�덈떎.(first_attribute)",
    "16E366"            : "LDAP 寃��됱뿉 �ㅽ뙣�덉뒿�덈떎.()",
    "16E367"            : "LDAP�먯꽌 �뚯씠��瑜� 李얠쓣 �� �놁뒿�덈떎.",
    "16E368"            : "LDAP�먯꽌 �뚯씠��瑜� 李얠쓣 �� �놁뒿�덈떎.(HTTP CRL)",
    "16E369"            : "LDAP�먯꽌 �뚯씠��瑜� 李얠쓣 �� �놁뒿�덈떎.(HTTP CRL)",
    "1600003"           : "�댁돩 �뚭퀬由ъ쬁�� �ㅼ젙�섏뼱 �덉� �딆뒿�덈떎.",
    "1600003"           : "鍮꾨�移� �뚭퀬由ъ쬁�� �ㅼ젙�섏뼱 �덉� �딆뒿�덈떎.",
    "1600004"           : "�꾩옄�쒕챸 �앹꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "160EB90"           : " �꾩옄�쒕챸 寃�利앹뿉 �ㅽ뙣�덉뒿�덈떎.",
    "160EB91"           : "�꾩옄�쒕챸�먯꽌 �몄쬆�쒕� 李얜뒗�� �ㅽ뙣�덉뒿�덈떎.",
    "1600005"           : "�몄쬆�� �뷀샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(SetRecipientInfo)",
    "1600006"           : "�몄쬆�� �뷀샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(generateKey)",
    "1600007"           : "�몄쬆�� 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(setEnvelopedData)",
    "1600008"           : "�몄쬆�� 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(OpenEnvelopedData setEnvelopedData)",
    "1600009"           : "�몄쬆�� 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(getRecipientIdentifier)",
    "160000A"           : " �꾩옄�쒕챸 �앹꽦 珥덇린�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "160000B"           : " �꾩옄�쒕챸 �앹꽦�� �몄쬆�� �ㅼ젙�� �ㅽ뙣�덉뒿�덈떎.",
    "160000C"           : " 怨듦컻�� �뷀샇硫붿떆吏� �앹꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "160000D"           : " �몄쬆�� 蹂듯샇�붿뿉 �ㅽ뙣�덉뒿�덈떎.(split)",
    "160000E"           : " �꾩옄�쒕챸 �곗씠�� �뺤떇�� �좏슚�섏� �딆뒿�덈떎.",
    "1000101"           : "�댁돩 泥섎━�� �ㅽ뙣�덉뒿�덈떎.",
    "1800001"           : "PFX 留뚮뱾湲곗뿉 �ㅽ뙣�덉뒿�덈떎.",
    "1800002"           : "PFX 遺꾨━�� �ㅽ뙣�덉뒿�덈떎.",
    "91"                : "�뚯씪 �곹깭 �뺤씤�� �ㅽ뙣�덉뒿�덈떎.",
    "92"                : "�뚯씪 �ㅽ뵂�� �ㅽ뙣�덉뒿�덈떎.",
    "93"                : "�뚯씪 �쎄린�� �ㅽ뙣�덉뒿�덈떎.",
    "430101"            : "���꾩꽌踰� �ㅼ젙 珥덇린�붿뿉 �ㅽ뙣�덉뒿�덈떎.",
    "430102"            : "���꾩꽌踰� �묒냽�� �ㅽ뙣�덉뒿�덈떎.",
    "430103"            : "���꾩꽌踰꾨줈遺��� �곗씠��瑜� 諛쏆쓣 �� �놁뒿�덈떎.",
    "430104"            : "���꾩꽌踰꾨��� 諛쏆� 硫붿떆吏� 援ъ꽦�� �ㅽ뙣�덉뒿�덈떎.",
    "1000005c"          : " �몄쬆�� �좏슚湲곌컙 寃�利� �ㅽ뙣[留뚭린]",
    "10000037"          : "�먯�[SUPERSEDED]",
    "10000050"          : " �먯�[CERTIFICATIONHOLD]",
    "50000001"          : "蹂몄씤�뺤씤�� �ㅽ뙣�덉뒿�덈떎.",
    "51000002"          : "�덉슜�� OID媛� �꾨떃�덈떎." 
};
