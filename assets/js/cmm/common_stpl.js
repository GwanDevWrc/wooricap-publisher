 /**********************************************************************************************
  **********************************************************************************************
  ****** ####### �붾㈃蹂� �쎄� �뺤쓽 諛� �쎄� ���� 泥섎━ #######
  ****** 1. �붾㈃蹂� �쒖텧�댁빞 �섎뒗 �쎄� �뺣낫 �ㅼ젙
  ******   - �몄쬆 �섎떒蹂� 湲곕낯�쎄�
  ******   - �낅Т蹂� �쎄�
  ****** 2. �좏깮�� �쎄� �뺣낫 ���� (湲곌컙怨� �꾨Ц �몄텧)
  ****** 3. �쎄� ���� �� 硫ㅻ쾭�� �쎄��� �ы븿�� 寃쎌슦 硫ㅻ쾭�� 媛��� �깅줉 泥섎━ �꾨Ц �몄텧 
  **********************************************************************************************
  **********************************************************************************************/

var cmmStpl = {
        
        /**
         * �쎄��깅줉 - �쎄�紐⑸줉 �앹뾽 (JCMMAUT0007.jsp)�� �ъ슜�섏뿬 ���ν븯�� 寃쎌슦 
         */
        regStpl : function (param, callback) {
            
            var stplScnId;
            if (jbwrcFnc.isEmpty(_scnId)) {
                stplScnId = $("form[name='stplFrm']").serializeObject().scnId;
            } else {
                stplScnId = _scnId;
            }
            
            // �붾㈃id蹂� �쎄� �뺣낫 -> 蹂댄넻�� 1媛쒕쭔 �섏��� ��.
            var scnIdAgrsData = scnIdCustAgrData.filter(data => data.tobeScnId == stplScnId);
            
            // �붾㈃蹂� �쎄� �뺣낫媛� �녾굅�� 泥댄겕�� �쎄� �뺣낫媛� �놁쑝硫�
            if (scnIdAgrsData.length == 0 || jbwrcFnc.isEmpty(stplObj)) {
                // JBWRC.alert( "���ν븷 �쎄��� �놁뼱��.", { okBtnText : '�뺤씤' });
                return false;
            }
            

            $stplParam = {};
            // 蹂몄씤�몄쬆/�좎슜議고쉶�� �몄쬆�섎떒蹂꾨줈  CMM~ �ㅼ젙
            if (certMesgNo == 'S315' || certMesgNo == 'S130') {
                if (_selectedAuthDiv == 'phone') {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM004';
                } else if (_selectedAuthDiv == 'kakao') {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM009';
                } else if (_selectedAuthDiv == 'toss') {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM011';
                } else if (_selectedAuthDiv == 'pass') {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM010';
                } else if (_selectedAuthDiv == 'card') {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM006';
                } else {
                    $stplParam.drctCustAgrProcsDvcd = 'CMM005';
                }
            } else {
                $stplParam.drctCustAgrProcsDvcd = scnIdAgrsData[0].drctCustAgrProcsDvcd;
            }
            

            // 硫ㅻ쾭�� 媛��� �쎄� �щ�
            var membersStplYn = false;
            
            // �덉쇅泥섎━ �ы빆
            // B0201, B0202 紐⑤몢 泥댄겕�쒖뿉�� idvd_info_select_usag_yn 而щ읆 Y �ㅼ젙 �꾩슂 (AS-IS - H1 肄붾뱶)
            let chkB0201 = false; 
            let chkB0202 = false; 
            
            // �좏깮�� �쎄� �뚮씪誘명꽣濡� 蹂���
            let selected = stplObj.getSelectedStpl().selectedStplIds;
            selected.forEach(function (selectId) {
                
                if (selectId == 'B0201') chkB0201 = true;
                if (selectId == 'B0202') chkB0202 = true;
                if (selectId == 'A0401' || selectId == 'A0402' || selectId == 'A0403' || selectId == 'A0405') membersStplYn = true;
                
                let argData = stplIdAgrData.filter(item => item.tobeStplId == selectId);
                if (!jbwrcFnc.isEmpty(argData)) {
                    argData.forEach(function (stpldata) {
                        if (!jbwrcFnc.isEmpty(stpldata.col)) new Function('$stplParam.' + stpldata.col + ' = "Y"')();
                    });
                }
            });
            
            if (chkB0201 && chkB0202) {
                $stplParam.idvdInfoSelectUsagYn = 'Y';
            }
            
            // 誘� �좏깮�� �쎄� �뚮씪誘명꽣濡� 蹂���
            let notSelect = stplObj.getSelectedStpl().notSelectStplIds;
            if (!jbwrcFnc.isEmpty(notSelect)) {
                notSelect.forEach(function (selectId) {
                    let argData = stplIdAgrData.filter(item => item.tobeStplId == selectId);
                    if (!jbwrcFnc.isEmpty(argData)) {
                        argData.forEach(function (stpldata) {
                            if (!jbwrcFnc.isEmpty(stpldata.col)) new Function('$stplParam.' + stpldata.col + ' = "N"')();
                        });
                    }
                });
            }
            
            // �좎슜, �먮떞 �ㅼ씠�됲듃 : 蹂몄씤�몄쬆�좎엯�곹뭹援щ텇肄붾뱶 異붽�
            if (stplScnId == 'JPLNMAN0010') { // �좎슜
                $stplParam.selfAthnInflGdsDvcd = '001';
            } else if (stplScnId == 'JUCRUMR0010') {  // �먮떞
                $stplParam.selfAthnInflGdsDvcd = '002';
            }
            
            Object.assign($stplParam, param);
            if (jbwrcFnc.isEmpty($stplParam.drctRefIdntDivNo) && !jbwrcFnc.isEmpty($stplParam.cstno)) {
                $stplParam.drctRefIdntDivNo = $stplParam.cstno;
            }
            
            JBWRC.showLoading();
            
            setTimeout(function(){
                jbwrcUtil.customAjax({
                    url : "/cmm/arg/regStpl.do"             // url 
                    , data : $stplParam                     // param
                    , beforeShow : false                    // 濡쒕뵫諛� �щ� 
                    , compleShow : false                    // 濡쒕뵫諛� �щ� 
                    , loginYn : "N"                         // 濡쒓렇�� �щ�
                    , async : false
                    , callBack : function(data){            // 肄쒕갚
                        
                        JBWRC.hideLoading(true);
                        
                        console.log('//==============================================================');
                        console.log(' ���ν븳 �쎄� �뺣낫  : ' + JSON.stringify($stplParam));
                        console.log('==============================================================//');
                        

                        // 硫ㅻ쾭�� 媛��낅벑濡�
                        if (membersStplYn) {
                            
                            cmmStpl.regMembers($stplParam, function( status, membersdata ){

                                if ( status == 'success' ) {
                                    callback( 'success', data );
                                } else {
                                    callback( 'fail', data );
                                }
                                
                            });

                        } else {
                            callback( 'success', data );
                        }
                        
                        //callback( 'success', data );
                        
                    }, errorCallback : function ( errCode, errorMsg ){
                        JBWRC.hideLoading(true);
                        callback( 'fail', errCode.responseJSON );
                    }
                });
                
            }, 100);
            
            
        },
        
        /**
         * �쎄��깅줉 - 媛쒕퀎�붾㈃�먯꽌 ���ν븯�� 寃쎌슦
         * 
         * 
         * param.cstno      // 怨좉컼踰덊샇
         * param.stpl       // ���ν븷 �쎄� 紐⑸줉 A0301,A0209....
         * param.notStpl    // 誘� 泥댄겕 �쎄� 紐⑸줉 
         * param.scnId      // �붾㈃id
         * 
         * 
         */
        regStplIndv : function (param, callback) {
            
            // 硫ㅻ쾭�� 媛��� �쎄� �щ�
            var membersStplYn = false;
            
            if (param.stpl.indexOf('A0401') > -1 || param.stpl.indexOf('A0402') > -1
                    || param.stpl.indexOf('A0403') > -1 || param.stpl.indexOf('A0405') > -1) {
                membersStplYn = true;
            }
            
            
            // �좏깮�� �쎄� �뚮씪誘명꽣濡� 蹂���
            $stplParam = {};
            
            if (!jbwrcFnc.isEmpty(param.etc)) {
                if(param.etc == 'OCR'){
                    $stplParam.drctCustAgrProcsDvcd = 'RE';
                }else{
                    $stplParam.drctCustAgrProcsDvcd = param.etc;
                }
            } else {
                // �붾㈃id蹂� �쎄� �뺣낫 -> 蹂댄넻�� 1媛쒕쭔 �섏��� ��.
                var scnIdAgrsData = scnIdCustAgrData.filter(data => data.tobeScnId == param.scnId);
                $stplParam.drctCustAgrProcsDvcd = scnIdAgrsData[0].drctCustAgrProcsDvcd;
            }
            
            var selected = param.stpl.split(',');
            selected.forEach(function (selectId) {
                let argData = stplIdAgrData.filter(item => item.tobeStplId == selectId);
                if (!jbwrcFnc.isEmpty(argData)) {
                    
                    argData.forEach(function (stpldata) {
                        if (!jbwrcFnc.isEmpty(stpldata.col)){
                            
                            // 蹂댁씠�ㅽ뵾�깆삁諛⑹븞�� 鍮꾪듃留듯삎�� 泥섎━
                            if (stpldata.tobeStplId == 'C0507') {
                                new Function('$stplParam.' + stpldata.col + ' = "11100"')();
                            }
                            // �쇰컲�곸씤 Y/N �뺥깭
                            else {
                                new Function('$stplParam.' + stpldata.col + ' = "Y"')();
                            }
                            
                        } 
                    });
                    
                }
            });
            
            // 誘� �좏깮�� �쎄� �뚮씪誘명꽣濡� 蹂���
            if (!jbwrcFnc.isEmpty(param.notStpl)) {
                var notSelect = param.notStpl.split(',');
                notSelect.forEach(function (selectId) {
                    let argData = stplIdAgrData.filter(item => item.tobeStplId == selectId);
                    if (!jbwrcFnc.isEmpty(argData)) {
                        argData.forEach(function (stpldata) {
                            if (!jbwrcFnc.isEmpty(stpldata.col)) new Function('$stplParam.' + stpldata.col + ' = "N"')();
                        });
                    }
                });
                
            }
            
            Object.assign($stplParam, param);

            JBWRC.showLoading();            
            setTimeout(function(){
                jbwrcUtil.customAjax({
                    url : "/cmm/arg/regStpl.do"             // url 
                    , data : $stplParam                     // param
                    , beforeShow : false                    // 濡쒕뵫諛� �щ� 
                    , compleShow : false                    // 濡쒕뵫諛� �щ� 
                    , loginYn : "N"                         // 濡쒓렇�� �щ�
                    , async : false
                    , callBack : function(data){            // 肄쒕갚
                        
                        JBWRC.hideLoading(true);
                        
                        console.log('//==============================================================');
                        console.log(' ���ν븳 �쎄� �뺣낫  : ' + JSON.stringify($stplParam));
                        console.log('==============================================================//');
                        

                        // 硫ㅻ쾭�� 媛��낅벑濡�
                        if (membersStplYn) {
                            
                            cmmStpl.regMembers($stplParam, function( status, membersdata ){
                                
                                if ( status == 'success' ) {
                                    callback( 'success', data );
                                } else {
                                    callback( 'fail', data );
                                }
                                
                            });

                        } else {
                            callback( 'success', data );
                        }
                        //callback( 'success', data );
                        
                    }, errorCallback : function ( errCode, errorMsg ){
                        JBWRC.hideLoading(true);
                        callback( 'fail', errCode.responseJSON );
                    }
                });
                
            }, 100);
            
        },
        
        
        /**
         * 硫ㅻ쾭�� 媛��� �깅줉 泥섎━
         */
        regMembers : function (param, callback) {
            
            
            // 硫ㅻ쾭�� �쎄��� 怨좉컼踰덊샇濡� �쒕쾲 �� ���� 
            param.agreAfcpYn = 'Y';
            JBWRC.showLoading();
            setTimeout(function(){
                jbwrcUtil.customAjax({
                    url : "/cmm/arg/regStpl.do" 
                    , data : param             
                    , beforeShow : false                    // 濡쒕뵫諛� �щ� 
                    , compleShow : false                    // 濡쒕뵫諛� �щ� 
                    , callBack : function(data){
                        
                        // �쎄� �쒕쾲�� ���� �� 硫ㅻ쾭�� 媛��낆쿂由�
                        setTimeout(function(){
                            jbwrcUtil.customAjax({
                                url : "/mdr/bzc/cpa/setMemSmsInfo.do" 
                                , data : param           
                                , beforeShow : false                    // 濡쒕뵫諛� �щ� 
                                , compleShow : false                    // 濡쒕뵫諛� �щ�             
                                , async : false
                                , callBack : function(data){
                                    JBWRC.hideLoading(true);
                                    callback( 'success', data );
                                }, errorCallback : function ( errCode, errorMsg ){
                                    JBWRC.hideLoading(true);
                                    callback( 'fail', errCode.responseJSON );
                                }
                                
                            });
                        }, 100);
                        
                    }, errorCallback : function ( errCode, errorMsg ){
                        JBWRC.hideLoading(true);
                        callback( 'fail', errCode.responseJSON );
                    }
                });
            }, 100);
            
        }
        

}


// �몄쬆 湲곕낯 �쎄�
var authStlpData = {};
authStlpData["Phone"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0504" }, 
            { stplId: "B0503" }, 
            { stplId: "B0501" }, 
            { stplId: "B0502" },
            { stplId: "", title: "[�꾩닔] 紐⑤컮�쇱븞�ы뵆�ъ뒪 �쒕퉬�� �숈쓽", hiddenTxt: "mblSftPlus", children: [
                  // level 2
                  { stplId: "B0510", title: "" },
                  { stplId: "B0507", title: "" },
                  { stplId: "B0508", title: "" },
                  { stplId: "B0509", title: "" }
            ]}
        ]
    }
];



authStlpData["FinCert"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" }
        ]
    }
];
authStlpData["CrossCert"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" }
        ]
    }
];
authStlpData["Kakao"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" }
        ]
    }
];
authStlpData["Pass"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" }
        ]
    }
];
authStlpData["Toss"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" }
        ]
    }
];
authStlpData["Card"] = [
    { stplId: "", title: "蹂몄씤�몄쬆 �꾩닔 �숈쓽",
        children: [
            { stplId: "B0506" },
            { stplId: "LINK", title: '[�꾩닔] KCB移대뱶 蹂몄씤�뺤씤 �쒕퉬�� �쎄� �숈쓽', stplUrl: 'https://card.ok-name.co.kr/popup/terms/all/list.do#none' }
        ]
    }
];
authStlpData["Acno"] = [
    // { stplId: "A0117" }, { stplId: "A0211" }, { stplId: "A0207" }
    // { stplId: "A0301" }, { stplId: "A0303" }, { stplId: "A0302" }//HH02H0201, HH02H0203, HH02H0202 -- 怨꾩쥖�몄쬆�� �덈컺怨� �ㅼ뿉 �쎌젙�쒖뿉 諛쏅뒗寃껋쑝濡� 蹂�寃�
];
authStlpData["Recd"] = [
    //{ stplId: "A0301" }, { stplId: "A0303" }, { stplId: "A0302" }//HH02H0201, HH02H0203, HH02H0202 -- 怨꾩쥖�몄쬆�� �덈컺怨� �ㅼ뿉 �쎌젙�쒖뿉 諛쏅뒗寃껋쑝濡� 蹂�寃�
];

// 硫ㅻ쾭�� �쎄�
var _membersStpl = 
{ stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "members", 
  children: [
      { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
      { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
      { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
      { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)" }
  ]
};

// �좎슜�숈쓽 �쎄�
var _credAgrStpl =
{ stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", hiddenTxt: "credAgr",
  children: [
       { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
       { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
       { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
       { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
  ]
};

// �먮룞�댁껜�쎄�
var _atrsfStpl =
{ stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", hiddenTxt: "atrsf",
  children: [
      { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
      { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
      { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
  ]
};




var scnIdStlpData = {};

//�쎄� sample �섏씠吏�
scnIdStlpData["sampleStpl"] = [
     // level 1
     { stplId: "A0201", title: "", popTitle: '�뱀랬', upDesc: '<p class="fz-m fw-sb" data-lang="">�쎌젙�뺤빟</p><p class="mt8" data-lang="">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�, ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟 �쒕쪟(怨꾩빟��, �쎄� ��)瑜� �대찓�� �먮뒗 SMS濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</p>', children: [] },
     //_membersStpl,  // 硫ㅻ쾭�� �쎄� 
     //_credAgrStpl,  // �좎슜�숈쓽 �쎄�
     //_atrsfStpl,    // �먮룞�댁껜 �쎄�
     { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "members", 
         children: [
             { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
             { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
             { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
             { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
         ]
     },
     { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", hiddenTxt: "atrsf",
         children: [
             { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
             { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
             { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽", isChnl: true }
         ]
     },
     { stplId: "B0505", title: "", downDesc: '理쒗븯�⑥뿉 �ㅼ뼱媛� �ㅻ챸�댁슜�낅땲��.<br>��異� �쎌젙 �먮뒗 �덊럹�댁� �뚯썝媛��� �� �좏깮�섏떊 �댁슜�� �쒖떆�섏뿀�쇰ŉ 媛��� �꾨즺 �� [�⑤씪�� 李쎄뎄>�댁젙蹂닿�由�]�먯꽌 蹂�寃� 媛��ν빐��.', children: [] }
 ];

// �꾩옄�쎌젙 sample �섏씠吏�
scnIdStlpData["sampleElecAgre"] = [
     // level 1
     { stplId: "A0201", title: "", popTitle: '�뱀랬', upDesc: '<p class="fz-m fw-sb" data-lang="">�쎌젙�뺤빟</p><p class="mt8" data-lang="">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�, ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟 �쒕쪟(怨꾩빟��, �쎄� ��)瑜� �대찓�� �먮뒗 SMS濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</p>', children: [] },

     // level 1
     { stplId: "", title: "lv 1 媛쒖씤(�좎슜)�뺣낫 �좏깮 �숈쓽", hiddenTxt: "", children: [
         // level 2
         { stplId: "", title: "lv 2 媛쒖씤(�좎슜)�뺣낫 �좏깮�� �섏쭛, �댁슜", children: [
             // level 3
             { stplId: "A0207", title: "" },      // �꾩닔�쎄�
             { stplId: "A0202", title: "" }
         ]},
         { stplId: "A0166", title: "", isChnl: true },
     ]},

     // level 1
     { stplId: "", title: "lv 1 JB�곕━硫ㅻ쾭�� 1", hiddenTxt: "delKey2", children: [
         // level 2
         { stplId: "A0203", title: "" },
         { stplId: "A0204", title: "" }
     ]},

     // level 1
     { stplId: "", title: "lv 1 JB�곕━硫ㅻ쾭��2", children: [
         // level 2
         { stplId: "A0702", title: "", children: [] },
         { stplId: "", title: "lv 2 JB�곕━硫ㅻ쾭��2 sub", children: [
             // level 3
             { stplId: "A0305", title: "" },
             { stplId: "A0306", title: "" }
         ]},
         { stplId: "A0303", title: "" }
     ]},

     { stplId: "A0804", title: "", downDesc: '理쒗븯�⑥뿉 �ㅼ뼱媛� �ㅻ챸�댁슜�낅땲��.<br>��異� �쎌젙 �먮뒗 �덊럹�댁� �뚯썝媛��� �� �좏깮�섏떊 �댁슜�� �쒖떆�섏뿀�쇰ŉ 媛��� �꾨즺 �� [�⑤씪�� 李쎄뎄>�댁젙蹂닿�由�]�먯꽌 蹂�寃� 媛��ν빐��.', children: [] }
 ];


//ODS>怨듯넻>�좎슜�뺣낫議고쉶
scnIdStlpData["JCIFQAGRMAN0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>�⑺넗留�>�좎슜�뺣낫議고쉶
scnIdStlpData["JFTRMAN0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0111", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0107", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� ��3�� �쒓났,議고쉶�� 愿��� �ы빆 " }
    //]},
    // level 1
    //{ stplId: "", title: "梨꾧텒�묐룄�밸굺", children: [
        // level 2 HH04H0416 = B0412
    //    { stplId: "B0412", title: "梨꾧텒 �묐룄�� ���� �숈쓽", children: [] }
    ]}        
];

//ODS>�닿뎄��>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSDRGD0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>�닿뎄�� �꾩옄�쎌젙>�꾩옄�쎌젙
scnIdStlpData["JODSDRGD0193"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>', children: [    
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0208", title: "�닿뎄�� �좊�湲덉쑖 �쎄�", children: []},
        { stplId: "C0205", title: "�묐룄�대낫怨꾩빟��", hiddenTxt: "delKey1", children: []}
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey4", children: [
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true}
    ]}
];

//ODS>以묎퀬李⑤줎>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSUCR0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>以묎퀬李⑤줎>怨꾩빟�좎껌>�꾩옄�쎌젙
scnIdStlpData["JODSUCR0310"] = [ 
    //level 1 
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>', children: [
        // level 2 HH01H0101 = A0101
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        // level 2 HH01H0102 = A0102
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        // level 2 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� > 以묎퀬�먮룞李� ��異� �쒖��쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
        { stplId: "A0202", title: "�먮룞李� �좊�湲덉쑖 �쎄�", hiddenTxt: "delKey1", children: []},
        // level 2 HH03H0305 = A0205
        { stplId: "A0205", title: "以묎퀬�먮룞李� ��異� �쒖��쎄�",  hiddenTxt: "delKey2", children: []},
        // level 2 HH04H0401 = C0210
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", children: []},
        // level 2 AA02A0205 = B0805
        { stplId: "B0805", title: "以묎퀬李� �곗옣 蹂댁쬆�쒕퉬�� �덈궡臾�", hiddenTxt: "delKey3", children: []}
    ]},
    // level 1 
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey4", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];

//ODS>以묎퀬�뚰듃>怨꾩빟�좎껌>�꾩옄�쎌젙               
scnIdStlpData["JODSUCRRNT0196"] = [ 
    //level 1 
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>', children: [                               
        // level 2 HH01H0102 = A0102
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},   
        // level 2 HH03H0304 = A0204
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        // level 2 HH04H0404 = C0302
        { stplId: "C0302", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []}
    ]},
    // level 1 
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];

//怨좉컼�쇳꽣 > JB�곕━硫ㅻ쾭�� > 硫ㅻ쾭����� as-is JMBSJON0002
scnIdStlpData["JMBSJON0001"] = [ 
     // level 1
    { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
    { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
    { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
    { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
 ];

// 硫붾돱 鍮꾨끂異� �붾㈃ > �퉆RL > 湲덈━�명븯�좎껌 > �좎껌
scnIdStlpData["JCSMITR0018"] = [
    {stplId:"", title:"媛쒖씤(�좎슜)�뺣낫 �숈쓽", children:[
        {stplId:"B0102", title:"[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽", children:[]},
    ]},
    {stplId:"", title:"[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �숈쓽", children:[
        {stplId:"B0601", title:"[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔 �숈쓽��", children:[]},
        {stplId:"B0602", title:"[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽��", children:[]}
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    {stplId:"", title:"湲덈━�명븯�붽뎄沅� �좎껌 �숈쓽", children:[
        {stplId:"B0901", title:"[�꾩닔] 湲덈━�명븯�붽뎄 �좎껌 �덈궡 �숈쓽", children:[]},
        {stplId:"B0902", title:"[�꾩닔] �ъ떊議곌굔蹂�寃�(湲덈━�명븯)�좎껌 �쎌젙��", children:[]},
    ]}
];

// 怨좉컼�쇳꽣 > �쒕퉬�� > �좎슜�먯닔 議고쉶 �쒕퉬�� > �덈궡
scnIdStlpData["JCSTEVT0031"] = [
    {stplId:"", title:"媛쒖씤(�좎슜)�뺣낫 愿��� �숈쓽 (怨듦났 留덉씠�곗씠��, �쒕룄湲덈━ 議고쉶쨌�뚮┝)", children:[
        {stplId:"B0601", title:"", children:[]},
        {stplId:"B0602", title:"", children:[]},
    ]}
];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > 以묎퀬李�
scnIdStlpData["JCRPTUCR0192"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        // level 2 HH01H0101 = A0101
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        // level 2 HH01H0102 = A0102
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        // level 2 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� �쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
        { stplId: "A0202", title: "�먮룞李� �좊�湲덉쑖 �쎄�", hiddenTxt: "delKey1", children: []},
        // level 2 HH03H0305 = A0205
        { stplId: "A0205", title: "以묎퀬�먮룞李� ��異� �쒖��쎄�",  hiddenTxt: "delKey2", children: []},
        // level 2 HH04H0401 = C0210
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", children: []},
        // level 2 AA02A0205 = B0805
        { stplId: "B0805", title: "以묎퀬李� �곗옣 蹂댁쬆�쒕퉬�� �덈궡臾�", hiddenTxt: "delKey3", children: []}
    ]},
    // level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey4", children: [
           //level 3
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
       ]}
    ]}
 ];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > 由ъ뒪
scnIdStlpData["JCRPTNCRLES0192"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []}
    ]},
    { stplId: "", title: "李⑤웾 洹쇱��� �뺣낫 �뺤씤", hiddenTxt: "delKey2", noStpId:"fxclCnfr", children: []},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey3", children: [
           //level 3  
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
        ]}
    ]}
];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > �щ━��
scnIdStlpData["JCRPTNCRRELES0192"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []}
    ]},
    //level 1 
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey3", children: [
           //level 3  
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
        ]}
    ]}
];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > �뚰듃
scnIdStlpData["JCRPTNCRRNT0193"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0302", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}
    ]},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey2", children: [
           //level 3  
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
        ]}
    ]}
];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > �щ젋��
scnIdStlpData["JCRPTNCRRERNT0193"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0305", title: "�κ린�щ젋�� �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}
    ]},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey2", children: [
           //level 3  
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
        ]}
    ]}
];

//踰뺤씤�꾩옄�쎌젙(怨꾩빟��) > �닿뎄��
scnIdStlpData["JCRPTDRGD0192"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0208", title: "�닿뎄�� �좊�湲덉쑖 �쎄�", children: []}
    ]},
    //level 1 
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
        { stplId: "", title: "異붿쿇 �쒕퉬�� 諛� �쒗깮 �덈궡 梨꾨꼸", hiddenTxt: "delKey1", children: [
           //level 3  
           { stplId: "D0601", title: "�꾪솕" },
           { stplId: "D0602", title: "臾몄옄" },
           { stplId: "D0603", title: "�대찓��" },
           { stplId: "D0604", title: "�고렪" }
        ]}
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > 由ъ뒪
scnIdStlpData["JCRPTNCRLES0222"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []}
    ]},
    { stplId: "", title: "李⑤웾 洹쇱��� �뺣낫 �뺤씤", hiddenTxt: "delKey2", noStpId:"fxclCnfr", children: []},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > �щ━��
scnIdStlpData["JCRPTNCRRELES0222"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []}
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > �뚰듃
scnIdStlpData["JCRPTNCRRNT0222"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0302", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}
    ]},
    //level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > 以묎퀬李�
scnIdStlpData["JCRPTUCR0223"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0202", title: "�먮룞李� �좊�湲덉쑖 �쎄�", hiddenTxt: "delKey1", children: []},
        { stplId: "A0205", title: "以묎퀬�먮룞李� ��異� �쒖��쎄�", hiddenTxt: "delKey2", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", children: []}
    ]},
    //level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > �닿뎄��
scnIdStlpData["JCRPTDRGD0223"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0208", title: "�닿뎄�� �좊�湲덉쑖 �쎄�", children: []}
    ]},
    //level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//踰뺤씤�꾩옄�쎌젙(蹂댁쬆��) > �щ젋��
scnIdStlpData["JCRPTNCRRERNT0223"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��. </li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: [] },
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0305", title: "�κ린�щ젋�� �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}
    ]},
    //level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1 
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//媛쒖씤湲덉쑖>�먮룞李⑤떞蹂대�異�>蹂몄씤�몄쬆
scnIdStlpData["JUCRUMR0010"] = [
    //level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];//, scnIdStlpData["JUCRUMR0010"]

//ODS>湲덉쑖�뚮퉬�먮낫�몃쾿(TM)>�먮룞李⑤떞蹂대�異�,媛쒖씤�좎슜��異�
scnIdStlpData["JPLNMAN0110"] = [
    //level 1
    { stplId: "", title: "�곹뭹�쎄� �꾩닔 �숈쓽", popTitle: '', hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "C0210", title: "[�꾩닔] �먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", hiddenTxt: "delKey2" },
        { stplId: "C0404", title: "[�꾩닔] �먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��", hiddenTxt: "delKey3" },
        { stplId: "C0402", title: "[�꾩닔] �먮룞李� �좎꽕�� �댁� �뺤빟��", hiddenTxt: "delKey4" },
        { stplId: "B0416", title: "[�꾩닔] 異붽� �ㅼ젙 �숈쓽", hiddenTxt: "delKey6" }
    ]},
    { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey7", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]}  
];//, scnIdStlpData["JPLNMAN0010"]

//媛쒖씤湲덉쑖>媛쒖씤�좎슜��異�(紐⑤컮�쇱쟾��)>蹂몄씤�몄쬆
scnIdStlpData["JPLNMAN0010"] = [
    //level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}  
];//, scnIdStlpData["JPLNMAN0010"]

//媛쒖씤湲덉쑖>���섎�異�_�좎슜/�먮룞李�>蹂몄씤�몄쬆
scnIdStlpData["JMVMMAN0010"] = [
    //level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]} 
];//, scnIdStlpData["JMVMMAN0010"]

//���섎�異�_�좎슜/�먮룞李�>��異쒖씠�� �꾩엫�덉감 �숈쓽>�꾩엫�� �숈쓽��
scnIdStlpData["JMVMMAN0020"] = [
    {stplId:"A0505", title:"��異쒖젙蹂� �대엺 諛� �곹솚�꾩엫�� 愿��� �숈쓽", children:[]},
    {stplId:"A0503", title:"��異쒖씠�숈떆�ㅽ뀥 怨좎쑀�앸퀎�뺣낫 �섏쭛�댁슜�� �숈쓽", children:[]},
    {stplId:"A0502", title:"��異쒖씠�숈떆�ㅽ뀥 媛쒖씤(�좎슜)�뺣낫 �섏쭛�댁슜�� �숈쓽", children:[]},
    {stplId:"A0501", title:"��異쒖씠�숈떆�ㅽ뀥�� �듯븳 ���섎�異쒖꽌鍮꾩뒪 �댁슜�쎄�", children:[]}
];


//媛쒖씤�뚯썝媛���
scnIdStlpData["JMEMIND0002"] = [ 
    // level 1
    {stplId:"A0601", title:"�⑤씪�몄꽌鍮꾩뒪 �댁슜�쎄�", children:[]},
    {stplId:"A0102", title:"�꾩옄湲덉쑖嫄곕옒�쎄�", children:[]},
    // level 1
    { stplId: "", title: "[�뚯썝媛���] 媛쒖씤�뺣낫 �숈쓽", children: [
        // level 2
        { stplId: "A0602", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(�뚯썝�쒕퉬�� �댁슜)" },
        { stplId: "A0603", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(湲덉쑖嫄곕옒 愿��� �쒕퉬�� �덈궡)" },
        { stplId: "A0604", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� 遺��섏꽌鍮꾩뒪 �덈궡)" },
        { stplId: "A0605", title: "媛쒖씤�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
    ]},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true },
    ]}
  ];

//踰뺤씤 �뚯썝媛���
scnIdStlpData["JMEMCPR0002"] = [
  // level 1
  {stplId:"A0601", title:"�⑤씪�몄꽌鍮꾩뒪 �댁슜�쎄�", children:[]},
  {stplId:"A0102", title:"�꾩옄湲덉쑖嫄곕옒�쎄�", children:[]},
  // level 1
  { stplId: "", title: "[�뚯썝媛���] 媛쒖씤�뺣낫 �숈쓽", children: [
      // level 2
      { stplId: "A0602", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(�뚯썝�쒕퉬�� �댁슜)" },
      { stplId: "A0603", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(湲덉쑖嫄곕옒 愿��� �쒕퉬�� �덈궡)" },
      { stplId: "A0604", title: "媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� 遺��섏꽌鍮꾩뒪 �덈궡)" },
      { stplId: "A0605", title: "媛쒖씤�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" },
  ]}
];

//ODS>由ъ뒪>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSNCRLES0010"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>由ъ뒪>�꾩옄�쎌젙
scnIdStlpData["JODSNCRLES0196"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []},
        { stplId: "C0304", title: "以묎퀬李� 李⑤웾�ㅻЪ�뺤씤 �뱀빟", hiddenTxt: "delKey3", children: []},
        { stplId: "B0419", title: "�꾩튂�뺣낫 �섏쭛�띿씠�⒲냽�쒓났 �숈쓽��", hiddenTxt: "delKey4", required:true, children: []}
    ]},
    { stplId: "", title: "李⑤웾 洹쇱��� �뺣낫 �뺤씤", hiddenTxt: "delKey2", noStpId:"fxclCnfr", children: []},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//ODS>�뚰듃>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSNCRRNT0010"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>�뚰듃>�꾩옄�쎌젙
scnIdStlpData["JODSNCRRNT0195"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0302", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []},
        { stplId: "C0309", title: "�κ린�뚰깉 Subprime �곹뭹 �뱀빟��", hiddenTxt: "delKey2", required:true, children: []},
        { stplId: "B0419", title: "�꾩튂�뺣낫 �섏쭛�띿씠�⒲냽�쒓났 �숈쓽��", hiddenTxt: "delKey2", required:true, children: []}
    ]},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//ODS>�щ━�ㅼ옱�뚰듃>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSNCRRELESRERNT0010"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", hiddenTxt: "B060X", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)"},
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)"}
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", hiddenTxt: "B0603", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>�щ━��>�꾩옄�쎌젙
scnIdStlpData["JODSNCRRELES0196"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []}
    ]},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//ODS>�щ젋��>�꾩옄�쎌젙
scnIdStlpData["JODSNCRRERNT0196"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0305", title: "�κ린�щ젋�� �뺣퉬 �뱀빟", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}
    ]},
    //level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
];

//ODS>紐⑥쭛�� 媛쒖씤�좎슜��異� �꾩옄�쎌젙>�꾩옄�쎌젙
scnIdStlpData["JODSPLN0191"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        //媛쒖씤�좎슜��異�,�먮룞李⑤떞蹂대�異�
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�", hiddenTxt: "delKey10", children: []},
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��", hiddenTxt: "delKey11", children: []},
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛/�댁슜/�쒓났 �숈쓽", hiddenTxt: "delKey12", children: []},
        //�먮룞李⑤떞蹂대�異�
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0404", title: "�먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��", hiddenTxt: "delKey2", children: []}, // HH04H0417
        { stplId: "C0402", title: "�먮룞李� �좎꽕�� �댁� �뺤빟��", hiddenTxt: "delKey3", children: []}, // HH04H0406
        { stplId: "B0416", title: "異붽� �ㅼ젙 �숈쓽", hiddenTxt: "delKey4", children: []}, // HH04H0423 , HH04H0418
        //紐④린吏�
        { stplId: "A0209", title: "遺��숈궛�대낫��異� �쎄�", hiddenTxt: "delKey5", children: []},
        { stplId: "C0207", title: "遺��숈궛 洹쇱��� �ㅼ젙怨꾩빟��", hiddenTxt: "delKey7", children: []},
        { stplId: "C0208", title: "遺��숈궛�대낫��異� 異붽��쎌젙��", hiddenTxt: "delKey6", children: []},
        { stplId: "C0213", title: "�앺솢�덉젙�먭툑 二쇳깮�대낫��異� 異붽��쎌젙��", hiddenTxt: "delKey14", children: []}
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey8", children: [
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
       { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
       { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
       { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
       { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
   ]}
];
 
//ODS>紐⑥쭛�� 議곌굔蹂�寃�>�꾩옄�쎌젙
scnIdStlpData["JODSCDCH0190"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        //媛쒖씤�좎슜��異�,�먮룞李⑤떞蹂대�異�
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�", hiddenTxt: "A0207", children: []},
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��", hiddenTxt: "C0206", children: []},
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛/�댁슜/�쒓났 �숈쓽", hiddenTxt: "B0104", children: []},
        //�먮룞李⑤떞蹂대�異�
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", hiddenTxt: "C0210", children: []},//HH04H0401
        { stplId: "C0404", title: "�먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��", hiddenTxt: "C0404", children: []}, // HH04H0417
        { stplId: "C0402", title: "�먮룞李� �좎꽕�� �댁� �뺤빟��", hiddenTxt: "C0402", children: []}, // HH04H0406
        { stplId: "B0416", title: "異붽� �ㅼ젙 �숈쓽", hiddenTxt: "B0416", children: []}, // HH04H0423 , HH04H0418
    ]},
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
       { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
       { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
       { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
       { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
   ]}
];


//媛쒖씤湲덉쑖>�먮룞李⑤떞蹂대�異�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
scnIdStlpData["JUCRUMR0310"] = [ 
    // level 1 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� �쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
    { stplId: "", title: "�곹뭹�쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [                                                                                                                                                                                                                                                                                              
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�" },//, HH01H0101
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�" },//, HH01H0102
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�" },//, HH03H0307
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��" }, //, HH03H0310
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },//, CC05
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��" , hiddenTxt: "C0210"}, //, HH04H0401
        { stplId: "C0404", title: "�먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��" , hiddenTxt: "C0404"},//, HH04H0417 
        { stplId: "C0402", title: "�먮룞李� �좎꽕�� �댁� �뺤빟��" , hiddenTxt: "C0402" }, //, HH04H0406
        { stplId: "B0416", title: "異붽� �ㅼ젙 �숈쓽" , hiddenTxt: "B0416", }//, HH04H0423 (HH04H0418 媛� �듯빀�먮떎怨� ��..)
        
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },//, HH02H0201
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },//, HH02H0203
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" },//, HH02H0202
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "JB�곕━硫ㅻ쾭�� 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },//, HH05H0501
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },//, HH05H0502
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },//, HH05H0503
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true },//, HH05H0504
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", hiddenTxt: "", children: [
          // level 2
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)"},//, DD01D0101
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },//, DD01D0102
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" , isChnl: true},//, DD02D0201
    ]}
];

//媛쒖씤湲덉쑖>�좎슜��異�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
scnIdStlpData["JPLNMAN0280"] = [ 
    // level 1 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� �쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
    { stplId: "", title: "�곹뭹�쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�" },
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�" }, 
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�" }, 
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��" }, 
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" },
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "JB�곕━硫ㅻ쾭�� 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true}
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", hiddenTxt: "", children: [
          // level 2
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true},
    ]}
];

//媛쒖씤湲덉쑖>���섎�異�_�좎슜/�먮룞李�>�꾩옄�쎌젙
scnIdStlpData["JMVMMAN0280"] = [ 
    // level 1 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� �쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
    { stplId: "", title: "�곹뭹�쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�" },
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒�쎄�" }, 
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�" }, 
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��" }, 
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��"              , hiddenTxt: "C0210"}, 
        { stplId: "C0404", title: "�먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��"         , hiddenTxt: "C0404"}, 
        { stplId: "C0402", title: "�먮룞李� �좎꽕�� �댁� �뺤빟��"              , hiddenTxt: "C0402" }, 
        { stplId: "B0416", title: "異붽� �ㅼ젙 �숈쓽"                    , hiddenTxt: "B0416" }
        
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" },
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "JB�곕━硫ㅻ쾭�� 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)" , isChnl: true},
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", hiddenTxt: "", children: [
          // level 2
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)" , isChnl: true},
    ]}
];

//ODS>紐④린吏��곗옣>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSMRGG0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS>�밴퀎由ъ뒪>�밴퀎 �숈쓽
scnIdStlpData["JODSSUCSLES0010"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">�밴퀎 �� �댁슜�먮뒗 �밴퀎 �� �댁슜�먯뿉寃� 李⑤웾�� �뺤긽 �곹깭濡� �몃룄�섏��쇰ŉ, </span> 媛곸쥌 怨듦낵湲�(�먮룞李⑥꽭, 踰붿튃湲�, 怨쇳깭猷� ��) 諛� 硫댁콉湲�, 李⑤웾怨� 愿��⑤맂 媛곸쥌 �쒕컲鍮꾩슜 �쇱껜瑜� �밴퀎 �� �댁슜�먯� 異⑸텇�� �묒쓽�섍퀬 �뺤궛�⑥쓣 �뺤씤�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []},
        { stplId: "C0503", title: "�밴퀎 �뺤씤��", children: []},
    ]},
      { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey3", children: [
          { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
          { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
          { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
          { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
      ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];

//ODS>�밴퀎由ъ뒪>�꾩옄�쎌젙
scnIdStlpData["JODSSUCSLES0196"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0203", title: "�먮룞李⑤━�� �쎄�", children: []},
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��", hiddenTxt: "delKey1", children: []},
        { stplId: "C0401", title: "�댁슜�먮챸�� 由ъ뒪 �뺤빟��", hiddenTxt: "delKey2", children: []},
        { stplId: "C0504", title: "李⑤웾�몄닔利� 諛� �밴퀎 媛곸꽌", children: []}                                                                                                                                                                                                                                                                                                                                           
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey3", children: [
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];

//ODS>�밴퀎�뚰듃>�밴퀎 �숈쓽
scnIdStlpData["JODSSUCSRNT0010"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">�밴퀎 �� �댁슜�먮뒗 �밴퀎 �� �댁슜�먯뿉寃� 李⑤웾�� �뺤긽 �곹깭濡� �몃룄�섏��쇰ŉ, </span> 媛곸쥌 怨듦낵湲�(�먮룞李⑥꽭, 踰붿튃湲�, 怨쇳깭猷� ��) 諛� 硫댁콉湲�, 李⑤웾怨� 愿��⑤맂 媛곸쥌 �쒕컲鍮꾩슜 �쇱껜瑜� �밴퀎 �� �댁슜�먯� 異⑸텇�� �묒쓽�섍퀬 �뺤궛�⑥쓣 �뺤씤�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        
        { stplId: "C0307", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []},
        { stplId: "C0211", title: "�밴퀎 遺��� �쎌젙��", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []},
    ]},
      { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey2", children: [
          { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
          { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
          { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
          { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
      ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];

//ODS>�밴퀎�뚰듃>�꾩옄�쎌젙
scnIdStlpData["JODSSUCSRNT0196"] = [
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        { stplId: "A0204", title: "�κ린�뚰깉 �쎄�", children: []},
        { stplId: "C0307", title: "�κ린�뚰깉 �뺣퉬 �뱀빟", children: []},
        { stplId: "C0212", title: "李⑤웾�몄닔利� 諛� �밴퀎 遺��� �쎌젙��", children: []},
        { stplId: "C0306", title: "湲덉쑖�뚰듃(�몄닔��) �κ린�뚰깉 �뱀빟", hiddenTxt: "delKey1", children: []}                                                                                                                                                                                                                                                                                                                                      
    ]},
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey2", children: [
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", isChnl: true }
    ]}
];


//�곷떞�좎껌
scnIdStlpData["JFINRET0050"] = [
  { stplId: "B0110", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽", children: []}
];

//ODS>紐⑥쭛�멸컻�몄떊�⑸�異�>�좎슜�뺣낫議고쉶
scnIdStlpData["JODSPLN0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0104", title: "[�꾩닔] 援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS > 紐④린吏��곗옣 > �꾩옄�쎌젙
scnIdStlpData["JODSMRGG0192"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        // level 1 HH01H0101 = A0101
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        // level 1 HH01H0102 = A0102
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        //level 1 HH03H0311 = A0209
        { stplId: "A0209", title: "遺��숈궛�대낫��異� �쎄�", children: []},                    
    ]},
    // level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
 ];

//二쇳깮�대낫��異�(HI紐④린吏�) > �꾩옄�쎌젙
scnIdStlpData["JMRGG0220"] = [
    //level 1
    { stplId: "", title: "�곹뭹 �쎄� �꾩닔 �숈쓽", popTitle: '�쎄� �댁슜�� �뺤씤�댁＜�몄슂', upDesc: '<ul class="bullet-wrap type-circle"><li data-lang=""><span class="fw-b">蹂몄씤�� 湲덉쑖�곹뭹 �좎껌�댁뿭怨� �쎄��� 異⑸텇�� �댄빐�� �� 怨꾩빟�� 泥닿껐�덉쑝硫�,</span> ��異쒖“嫄댁씠 �ы븿�� 怨꾩빟�쒕쪟(怨꾩빟��, �쎄�) �깆쓣 �대찓�� �먮뒗 臾몄옄濡� �〓�諛쏅뒗 寃껋뿉 �숈쓽�⑸땲��.</li><li data-lang=""><span class="fw-b">�먮룞�댁껜 諛� 利됱떆異쒓툑 怨꾩쥖 �깅줉</span>�� �숈쓽�⑸땲��.</li></ul>' , children: [
        // level 1 HH01H0101 = A0101
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯 �쎄�", children: []},
        // level 1 HH01H0102 = A0102
        { stplId: "A0102", title: "�꾩옄湲덉쑖嫄곕옒 �쎄�", children: []},
        //level 1 HH03H0311 = A0209
        { stplId: "A0209", title: "遺��숈궛�대낫��異� �쎄�", children: []},
        // level 1 HH03H0312 = C0207
        { stplId: "C0207", title: "遺��숈궛 洹쇱��� �ㅼ젙怨꾩빟��", children: []},
        //level 1 HH03H0314 = C0208
        { stplId: "C0208", title: "遺��숈궛�대낫��異� 異붽��쎌젙��", children: []},
        { stplId: "C0213", title: "�앺솢�덉젙�먭툑 二쇳깮�대낫��異� 異붽��쎌젙��", hiddenTxt: "C0213", children: []}
    ]},
    // level 1
    { stplId: "", title: "�먮룞�댁껜 �꾩닔 �숈쓽", children: [
        // level 2 HH02H0201 = A0301, HH02H0203 = A0303, HH02H0202 = A0302
        { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
        { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �숈쓽", children: [
        // level 2  
        //id=4664{ stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0201", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(�곹뭹/�쒕퉬�� �덈궡)" },
        { stplId: "B0202", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �섏쭛,�댁슜 �숈쓽(湲고� �쒕퉬�� �덈궡)" },
        { stplId: "B0205", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫 �쒓났 �숈쓽(怨꾩뿴��)", hiddenTxt: "B0205", isChnl: true }
    ]}
 ];
//媛쒖씤湲덉쑖>二쇳깮�대낫��異�>蹂몄씤�몄쬆
scnIdStlpData["JMRGG0010"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "delKey1", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//�쒕뵫>李⑤웾 怨듬룞�뚯쑀�� �숈쓽
/*scnIdStlpData["JBZCLND0088"] = [ 
     //level 1
     { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽", children: []},
     { stplId: "B0112", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽", children: []}
];*/

//釉뚮┸吏�>濡�뜲�뚰꽣移�>蹂몄씤�몄쬆
scnIdStlpData["JLOTUCR0020"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//釉뚮┸吏�>�좎뒪以묎퀬李�>蹂몄씤�몄쬆
scnIdStlpData["JTOSUCR0020"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//釉뚮┸吏�>釉뚮씪蹂댁퐫由ъ븘以묎퀬李⑤�異�>蹂몄씤�몄쬆
scnIdStlpData["JUCRBRA0020"] = [ 
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽(��88�먮떎移�)", children: [
        // level 2
        {stplId:"B0305", title:"[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽(��88�먮떎移�)", children:[]}
    ]}
];

// 釉뚮┸吏� > 釉뚮씪蹂댁퐫由ъ븘 以묎퀬李� ��異� > 蹂몄씤�몄쬆 > �꾪솕�곷떞�묒닔
scnIdStlpData["JCMMTEL0020"] = [
    {stplId:"B0302", title:"[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽(�꾪솕�곷떞)", children:[]},
    {stplId:"B0305", title:"[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽(��88�먮떎移�)", children:[]}
];

//媛쒖씤湲덉쑖>�먮룞李⑤떞蹂대�異�>�뱀랬�쎌젙
scnIdStlpData["JUCRUMR0251"] = [
    //level 1 HH03H0302 = A0202 (�먮룞李� �좊�湲덉쑖 �쎄� 怨� 以묎퀬李� �ㅽ넗濡� �쎄��� 議곌굔�� �곕씪 1媛쒕쭔 �몄텧��)
    { stplId: "", title: "�곹뭹�쎄� �꾩닔 �숈쓽", popTitle: '', upDesc: '' , children: [                                                                                                                                                                                                                                                                                              
        { stplId: "A0101", title: "�ъ떊嫄곕옒湲곕낯�쎄�" },//, HH01H0101
        { stplId: "A0207", title: "媛쒖씤�좎슜��異� �쎄�" },//, HH03H0307
        { stplId: "C0206", title: "�좎슜��異� �ы썑 �⑸룄愿�由� 異붽��쎌젙��" }, //, HH03H0310
        { stplId: "B0104", title: "援�넗援먰넻遺� 二쇳깮�뚯쑀�뺤씤 �섏쭛,�댁슜,�쒓났 �숈쓽" },//, CC05
        { stplId: "C0210", title: "�먮룞李� 洹쇱��� �ㅼ젙 怨꾩빟��" , hiddenTxt: "C0210"}, //, HH04H0401
        { stplId: "C0404", title: "�먮룞李� 洹쇱��� �ㅼ젙 愿��� 異붽� �뺤빟��" , hiddenTxt: "C0404"},//, HH04H0417 
        //, { stplId: "C0402", title: "�먮룞李� �좎꽕�� �댁� �뺤빟��" , hiddenTxt: "C0402" }, //, HH04H0406
        { stplId: "B0416", title: "異붽� �ㅼ젙 �숈쓽" , hiddenTxt: "B0416", }//, HH04H0423 (HH04H0418 媛� �듯빀�먮떎怨� ��..)
        
    ]},
    // level 1 (議곌굔�� �곕씪 �몄텧/鍮꾨끂異� 泥섎━��)
    { stplId: "", title: "JB�곕━硫ㅻ쾭�� 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", hiddenTxt: "A040X", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },//, HH05H0501
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },//, HH05H0502
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },//, HH05H0503
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true },//, HH05H0504
    ]},
];//, scnIdStlpData["JUCRUMR0250"]

//以묎퀬李⑥긽�댁떊泥�
scnIdStlpData["JUINMAN0051"] = [
    //level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
];

//�먮룞�댁껜怨꾩쥖蹂�寃�
scnIdStlpData["JONLSTM0027"] = [
    { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
    { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
    { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
];

//利됱떆異쒓툑怨꾩쥖�깅줉
scnIdStlpData["JONLSTM0035"] = [
  { stplId: "A0301", title: "[�꾩닔] �먮룞怨꾩쥖�댁껜 �쎄�" },
  { stplId: "A0303", title: "[�꾩닔] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽" },
  { stplId: "A0302", title: "[�꾩닔] 媛쒖씤�뺣낫 ��3�� �쒓났 �숈쓽" }
];

//ODS > 由ъ뒪 > �좎슜�뺣낫議고쉶(2025)
scnIdStlpData["JODSNCRLES0110"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS > �뚰듃 > �좎슜�뺣낫議고쉶(2025)
scnIdStlpData["JODSNCRRNT0110"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},    
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];

//ODS > �좎감�좊�/濡� > �좎슜�뺣낫議고쉶(2025)
scnIdStlpData["JODSNCRLON0110"] = [
    // level 1
    { stplId: "", title: "媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", popTitle: '蹂몄씤�몄쬆 �꾩뿉 �쎄� �댁슜�� 瑗� �뺤씤�댁＜�몄슂.', children: [
        // level 2
        { stplId: "B0102", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,議고쉶,�쒓났 �숈쓽" },
        { stplId: "B0106", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 媛쒖씤(�좎슜)�뺣낫 �댁슜,�쒓났 �숈쓽" },
        { stplId: "B0105", title: "[�꾩닔] 湲덉쑖寃곗젣�� �먮룞�댁껜�뺣낫 怨좎쑀�앸퀎�뺣낫 �섏쭛,�댁슜 �숈쓽" },
        { stplId: "B0113", title: "[�꾩닔] 湲덉쑖寃곗젣�� ���됱씠泥댁젙蹂� 媛쒖씤(�좎슜)�뺣낫 �댁슜, �쒓났 �숈쓽" },
        { stplId: "B0114", title: "[�꾩닔] �ㅻ궇 ���덉젙蹂� 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났, 議고쉶 �숈쓽" }
    ]},
    // level 1
    { stplId: "", title: "[怨듦났 留덉씠�곗씠��] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�숈쓽", children: [
        // level 2
        { stplId: "B0601", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(怨듦났 留덉씠�곗씠��)" },
        { stplId: "B0602", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 ��3�� �쒓났 �숈쓽(怨듦났 留덉씠�곗씠��)" }
    ]},
    { stplId: "B0603", title: "[�꾩닔] 蹂몄씤 �됱젙�뺣낫 �쒓났 �붽뎄��(怨듦났 留덉씠�곗씠��)", children: []},
    // level 1
    { stplId: "", title: "[JB�곕━硫ㅻ쾭��] 媛��� 諛� 媛쒖씤(�좎슜)�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "A0401", title: "[�꾩닔] JB�곕━硫ㅻ쾭�� �뚯썝�쎄�" },
        { stplId: "A0402", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 議고쉶 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0403", title: "[�꾩닔] 媛쒖씤(�좎슜)�뺣낫 �꾩닔�� �섏쭛,�댁슜,�쒓났 �숈쓽(JB�곕━硫ㅻ쾭��)" },
        { stplId: "A0405", title: "[�좏깮] 媛쒖씤(�좎슜)�뺣낫�� �섏쭛,�댁슜 �숈쓽(JB�곕━硫ㅻ쾭��)", isChnl: true }
    ]},
    // level 1
    { stplId: "", title: "媛쒖씤�뺣낫 �좏깮�숈쓽", children: [
        // level 2
        { stplId: "B0301", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (��異쒖젅李⑥븞��)" },
        { stplId: "B0303", title: "[�좏깮] 媛쒖씤�뺣낫 �섏쭛,�댁슜 �숈쓽 (�곹뭹/�쒕퉬�ㅼ븞��)" }
    ]}
];