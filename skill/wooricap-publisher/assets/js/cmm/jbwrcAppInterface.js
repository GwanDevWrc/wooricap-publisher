/**
 * Mobile App�먯꽌 �ъ슜�섎뒗 Web <-> App 媛꾩쓽 Interface Script (AS-IS MDAppInterface.js)
 * 
 * Object       : jbwrcAppInterface.js
 * Description  : js �뚯씪 �ㅻ챸�� 湲곗닠�⑸땲��.
 * Author       : ??????
 * Since        : 2021. 01. 18.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2021. 01. 18.    ??????         理쒖큹 �앹꽦
 */

/**
 * 湲곌린 �몄텧
 */
function interfacecall(obj){
    if (isDevice.Type()){
        var android = navigator.userAgent.match(/Android/i) == null ? false : true;
        var ios = navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
        if(android == false && ios == false){
            if(navigator.maxTouchPoints == 5){ //iOS 13�댁긽�� iPad
                ios = true;
            }
        }
        try {
            if(ios){
                //alert(JSON.stringify(obj));
                if(typeof webkit !== 'undefined' && webkit && webkit.messageHandlers && webkit.messageHandlers.JBSupportBridge){
                    webkit.messageHandlers.JBSupportBridge.postMessage(JSON.stringify(obj));
                }
            }else{
                //alert(JSON.stringify(obj));
                if(typeof JBSupportBridge !== 'undefined' && JBSupportBridge ){
                    JBSupportBridge.callfunction(JSON.stringify(obj));
                }
            }
        } catch(e) {
            console.log(e);
        }
    } else {
        //console.log("not App!!");
    }
}

/**
 * �붾컮�댁뒪 援щ텇 Type() - true : App, false : MobileWeb
 */
var isDevice = {
	Type : function(){
		var android = navigator.userAgent.match(/Android/i) == null ? false : true;
		var ios = navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
        if(android == false && ios == false){
            if(navigator.maxTouchPoints == 5){ //iOS 13�댁긽�� iPad
                ios = true;
            }
        }
		if(android || ios){
			return true;
		}else{
			return false;
		}
	}
};

/**
 * 怨듬룞�몄쬆�� 媛��몄삤湲�
 * 1. Request
 * @param dataParam  JSONObject
 * dataParam.callback(String) 怨듬룞�몄쬆�� 媛��몄삤湲� �� 肄쒕갚諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * status(String) - SUCCESS : �깃났, FAIL : �ㅽ뙣
 */

function fn_CertCopy(dataParam){
    var params = {
        header : {api : 106},
        body : {callback : dataParam.callback}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 怨듬룞�몄쬆�� 濡쒓렇��
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.hint(String) - 蹂댁븞�ㅽ뙣�쒖뿉 �ㅼ뼱媛� �뚰듃(placeholder)
 * dataParam.label(String) - �ㅽ뙣�쒖엯�ν솕硫댁쓽 �낅젰�꾨뱶 �쇰꺼
 * dataParam.maxmsg(String) - �ㅼ젙�� �ㅽ뙣�� 理쒕� 媛믩낫�� 湲몄씠媛� 珥덇낵�� 寃쎌슦 蹂댁뿬以� 硫붿꽭吏�
 * dataParam.minmsg(String) -  �ㅼ젙�� �ㅽ뙣�� 理쒖냼 媛믩낫�� 湲몄씠媛� 誘몃쭔�� 寃쎌슦 蹂댁뿬以� 硫붿꽭吏�
 * dataParam.inData(String) - �쒕챸�� String 媛�
 * dataParam.inType(String) - 吏꾩엯吏��� (怨듬룞�몄쬆�� 濡쒓렇�� : LOGIN, 怨듬룞�몄쬆�� �깅줉 : REGIST) - �대떦媛믪뿉 �곕씪 "�ㅻⅨ �몄쬆�섎떒"踰꾪듉�� 蹂댁뿬吏먰뙋��
 * dataParam.certType(String) - �몄쬆�� 援щ텇(P : 媛쒖씤, B : 踰뺤씤) - 蹂대궡吏� �딆쓣 寃쎌슦 �몄쬆�� �꾩껜瑜� 蹂댁뿬以�
 * dataParam.callback(String) - 怨듬룞�몄쬆�� 濡쒓렇�� �� 肄쒕갚 諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * status (String) - 寃곌낵 �곹깭 (SUCCESS : �깃났, OTHER_AUTH : �ㅻⅨ �몄쬆 �섎떒 �좏깮)
 * signData(String) - �쒕챸�곗씠��
 * vid(String) - vid Random 媛�
 * subjectDn(String) - dn 媛�
 */
function fn_CertProc(dataParam){
    var inType = dataParam.inType != null && dataParam.inType != "" ? dataParam.inType : "LOGIN";
    var params = {
        header : {api : 107},
        body : {
            type : "1",
            keypadtype : "0",
            txttype : "2",
            hint : dataParam.hint,
            label : dataParam.label,
            maxmsg : dataParam.maxmsg,
            minmsg : dataParam.maxmsg,
            maxlength : 30,
            minlength : 0,
            bUpper : "N",
            language : "1",
            inData : dataParam.inData,
            inType : inType,
            certType : dataParam.certType,
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * 移대찓�� �몄텧
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 移대찓�� �� �� 肄쒕갚 諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * status(String) - SUCCESS : �깃났, FAIL : �ㅽ뙣
 * imageBase64(String) - base64濡� �몄퐫�⑸맂 �대�吏� String
 */
function fn_OpenCamera(callbackStr){
    var params = {
        header : {api : 109},
        body : {
            //callback : dataParam.callback
            callback : callbackStr
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        var callbackData = {
            success : true,
            image : "base64Imagedata"
        };
        eval(dataParam.callback + "(" + JSON.stringify(callbackData) + ")");
    }
}

/**
 * �몃�釉뚮씪�곗� �몄텧
 * @param url String - �몄텧�� URL
 */
function fn_openBrowser(url){
    var params = {
        header : {api : 110},
        body : {
            url : url
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        window.open(url);
    }
}

/**
 * 媛ㅻ윭由� �몄텧
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 媛ㅻ윭由� �몄텧 �� 肄쒕갚 諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * status(String) - SUCCESS : �깃났, FAIL : �ㅽ뙣
 * imageBase64(String) - base64濡� �몄퐫�⑸맂 �대�吏� String
 */
function fn_OpenGallery(dataParam){
    var params = {
        header : {api : 111},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        var callbackData = {
            success : true,
            image : "base64Imagedata"
        };
        eval(dataParam.callback + "(" + JSON.stringify(callbackData) + ")");
    }
}

/**
 * �붾컮�댁뒪 �뺣낫 媛��몄삤湲�
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �붾컮�댁뒪 �뺣낫媛��몄삤湲� �몄텧 �� 肄쒕갚 諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * pushToken - �몄떆 �좏겙
 * deviceType - OS 援щ텇 (A - Android, I- iOS)
 * appVer - �� 踰꾩쟾
 * uuid - Device UUID
 * pushDeviceId - Push �쇱씠釉뚮윭由ъ뿉�� �앹꽦�� Device Id (Push �뚯씠釉붿뿉 �대떦 媛믪씠 Device Id濡� ����)
 * ip - ip 二쇱냼
 * imei - Device imei
 * imsi - Device imsi
 * usimSerial - USIM �쒕━�� 踰덊샇
 * isDebug - ( true - 媛쒕컻�댁쁺寃�利� �좏깮李� �쒖떆 , false - �댁쁺�쇰줈 吏꾪뻾 )
 */
function fn_GetDeviceInfo(dataParam){
    var params = {
        header : {api : 112},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �뚯씪�� 媛� ���� (�붾컮�댁뒪 �댁뿉 �뚯씪濡� 媛믪쓣 ����, �� ��젣 �먮뒗 �곗씠�� ��젣 �꾧퉴吏� ��젣�섏� �딅뒗��)
 * 1. Request
 * @param key String - ���ν븷 Key
 * @param value String - ���ν븷 Value
 * @param callback String - ���� �� callback �⑥닔 (�덈꽆寃⑤룄��)
 *
 * 2. Response (�뚮씪誘명꽣 �놁쓬)
 */
function fn_SetPref(key, data, callback){
    var params = {
        header : {api : 113},
        body : {
            key : key,
            data : data,
            callback : callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �뚯씪�� ���λ맂 媛� 遺덈윭�ㅺ린
 * 1. Request
 * @param key String - ���μ떆 �낅젰�덈뜕 Key
 * @param callback String - Value 媛믪쓣 由ы꽩諛쏆쓣 肄쒕갚 �⑥닔 紐�
 *
 * 2. Response
 * Value (String) - ���λ릺�덈뜕 Value 媛�
 */
function fn_GetPref(key, callback){
    var params = {
        header : {api : 114},
        body : {
            key : key,
            callback : callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}


/**
 * 
 * @param data
 * @param callback
 * 
 * 紐⑤컮�쇱빋 �ㅽ겕�섑븨 泥섎━�붿껌
 * 
 * @param type 0=�먮룞李�, 1=媛쒖씤��異�
 * @param signSrc �쒕챸�먮Ц�곗씠��
 * @param scrapData �ㅽ겕�섑븨�곗씠��
 * @param userName �ъ슜�먮챸
 * @param userNumber �앸뀈�붿씪6�먮━
 * @param numtranskey �ㅽ뙣��
 * @param qwertytranskey �ㅽ뙣��
 * @param callbackStr 肄쒕갚�⑥닔(臾몄옄����)
 */
function fn_EspiderScrapping(type, signSrc, scrapData, userName, userNumber, _numtranskey, _qwertytranskey, callbackStr ){
    
    var numtranskey = {
        "keypadtype" : "1"   
       ,"hint" : "�섏씠��(-) �놁씠 13�먮━�낅젰"
       ,"label" : "二쇰��깅줉踰덊샇"
       ,"maxmsg" : "二쇰�踰덊샇 13�먮━ �낅젰�� 二쇱떆湲� 諛붾엻�덈떎."
       ,"minmsg" : "二쇰�踰덊샇 13�먮━ �낅젰�� 二쇱떆湲� 諛붾엻�덈떎."
       ,"maxlength" : "13"
       ,"minlength" : "13"
       ,"bUpper" : "false"
       ,"language" : "0"
    };
    var qwertytranskey = {
        "keypadtype" : "0"    
        ,"hint" : "�몄쬆�쒖븫��"
        ,"label" : "怨듭씤�몄쬆�� 鍮꾨�踰덊샇"
        ,"maxmsg" : "�몄쬆�� 鍮꾨�踰덊샇瑜� �낅젰�� 二쇱떆湲� 諛붾엻�덈떎."
        ,"minmsg" : "�몄쬆�� 鍮꾨�踰덊샇瑜� �낅젰�� 二쇱떆湲� 諛붾엻�덈떎."
        ,"maxlength" : ""
        ,"minlength" : ""
        ,"bUpper" : "false"
        ,"language" : "0"
    };
    
    $.extend(numtranskey, _numtranskey);
    $.extend(qwertytranskey, _qwertytranskey);
    
    
    var params = {
        header : {
            api : "115"
        },
        body : {
            "inData" : signSrc,
            "type" : type,
            "userName" : userName,
            "userNumber" : userNumber,
            "scrapp" : scrapData,
            "numtranskey" : numtranskey,
            "qwertytranskey" : qwertytranskey,
            "callback" : callbackStr
        }
    };
    
    interfacecall(params);
}

/**
 * �꾩옄�쒕챸 �붾㈃ �몄텧
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �꾩옄�쒕챸 �붾㈃ �몄텧 �� 肄쒕갚 諛쏆쓣 �⑥닔 紐�
 *
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * @return JSONObject
 * status(String) - SUCCESS : �깃났, FAIL : �ㅽ뙣
 * img_sign(String) - �쒕챸 �대�吏� Base64濡� �몄퐫�⑸맂 �곗씠��
 * img_name(String) - �대쫫 �대�吏� Base64濡� �몄퐫�⑸맂 �곗씠��
 */
function fn_GetEformSign(dataParam){
    var params = {
        header : {api : 125},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        var callbackData = {
            success : "true",
            img_name : "imgDataBase64_�대쫫_�깆뿉�쒖퐳�댁빞 �뺤긽 �섏떊��",
            img_sign : "imgDataBase64_�쒕챸_�깆뿉�쒖퐳�댁빞 �뺤긽 �섏떊��",
        };
        eval(dataParam.callback + "(" + JSON.stringify(callbackData) + ")");
    }
}

/**
 * �� 醫낅즺
 */
function fn_Exit(){
    var params = {
        header : {api : 127}
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * 而ㅼ뒪�� �밸럭 �붾㈃ �몄텧 (�꾩씠�� �� �몃��� �붾㈃�� �몄텧�댁빞�섎뒗 寃쎌슦 湲곗〈 �뱀뿉�� 而⑦듃濡ㅼ씠 遺덇��ν븯誘�濡� 蹂꾨룄�� �밸럭 �붾㈃�� �몄텧�쒕떎. 泥섎━ �� �대떦 �밸럭瑜� �レ쑝�ㅻ㈃ 諛섎뱶�� fn_closePop�� �몄텧�댁빞 �쒕떎)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.url(String) - 而ㅼ뒪�� �밸럭�� �몄텧�� URL
 * dataParam.title(String) - 而ㅼ뒪�� �밸럭 �쒕ぉ�� �ㅼ뼱媛� 遺�遺� ( �놁쓣 寃쎌슦 "JB�곕━罹먰뵾��"濡� 湲곕낯�명똿)
 */
function fn_openPop(dataParam){
    var params = {
        header : {api : 128},
        body : {
            url : dataParam.url,
            title : dataParam.title == null ? "JB�곕━罹먰뵾��" : dataParam.title
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 而ㅼ뒪�� �밸럭 �붾㈃ �リ린 (fn_openPop�쇰줈 �몄텧�� 而ㅼ뒪�� �밸럭 �붾㈃�� �ル뒗��. �붾㈃�쇰줈 �섍만 data�� callback紐낆쓣 �섍린硫� �밸럭瑜� �リ퀬 callback�쇰줈 �명똿�� data瑜� �섍꺼以���.)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.data(String) - 而ㅼ뒪�� �밸럭瑜� �リ퀬 callback �⑥닔�� �꾨떖�� �곗씠��
 * dataParam.callback(String) - 而ㅼ뒪�� �밸럭瑜� �レ쓣 �� �몄텧�� callback �⑥닔紐�
 */
function fn_closePop(dataParam){
    var params = {
        header : {api : 129},
        body : {
            data : dataParam.data,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 怨좎쑀 �섏쭛 �뺣낫 �붿껌(FDS �댁긽�⑤쭚�먯� �섏쭛 湲곕뒫 AS-IS Direct)
 */
function fn_nProtectProc(dataParam){
    var params = {
        header : { api : 130 },
        body : {
            key : dataParam.key,
            callback : dataParam.callback 
        }
    }
    
    if (isDevice.Type()) {
        interfacecall(params);
    }else{
      //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �몄쬆踰덊샇 媛� �명똿 (Android Only)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �몄쬆 踰덊샇 �몄텧 �� �대떦 媛믪쓣 罹먯튂�섏뿬 肄쒕갚�댁쨪 �⑥닔 紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * success - true : �깃났, false : �ㅽ뙣
 * auth_number - �몄쬆踰덊샇
 */
function fn_SetSmsNum(dataParam){
	var params = {
		header : {api:131},
		body : {
			callback : dataParam.callback
		}
	};

	if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 湲곕낯 濡쒓렇�� 諛⑸쾿 �ㅼ젙
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.basicLoginType(String) - 湲곕낯 濡쒓렇�� ����(�꾩씠�� 濡쒓렇�� : ID, 怨듬룞�몄쬆�� : CERT, 湲덉쑖�몄쬆�� : FICERT, 媛꾪렪鍮꾨�踰덊샇 : PIN, �⑦꽩 : PATTERN, �앹껜�몄쬆 : FIDO)
 * dataParam.callback(String) - 湲곕낯 濡쒓렇�� �ㅼ젙 �� 肄쒕갚�댁쨪 �⑥닔 紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �깃났�щ� ( SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_SetBasicLoginType(dataParam){
    var params = {
        header : {api:132},
        body : {
            basicLoginType : dataParam.basicLoginType,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 湲곕낯 濡쒓렇�� 諛⑸쾿 �ㅼ젙 媛��몄삤湲�
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 湲곕낯 濡쒓렇�� �ㅼ젙 諛⑸쾿 肄쒕갚�댁쨪 �⑥닔 紐�
 * dataParam.loginId(String) - 濡쒓렇�� �꾩씠��(�� �ㅼ젙�먯꽌 鍮꾧탳�섍린 �꾪빐 �ъ슜�섎뒗 媛믪쑝濡� ID瑜� �섍린�� 寃쎌슦 濡쒖뺄�� ���λ맂 PIN, PATTERN�� ���λ맂 �꾩씠�붽컪怨� 鍮꾧탳�섏뿬 �ㅻ� 寃쎌슦 湲곕낯 濡쒓렇�� �ㅼ젙 諛⑸쾿�� �꾩씠�붾줈洹몄씤�쇰줈 由ы꽩�쒕떎.) 
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * basicLoginType - 湲곕낯 濡쒓렇�� �ㅼ젙 諛⑸쾿(�꾩씠�� 濡쒓렇�� : ID, 怨듬룞�몄쬆�� : CERT, 湲덉쑖�몄쬆�� : FICERT, 媛꾪렪鍮꾨�踰덊샇 : PIN, �⑦꽩 : PATTERN, �앹껜�몄쬆 : FIDO)
 */
function fn_GetBasicLoginType(dataParam){
    var loginId = !isEmpty(dataParam.loginId) ? dataParam.loginId : "";
    var params = {
        header : {api:133},
        body : {
            callback : dataParam.callback,
            loginId : loginId
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �꾩씠�� �붾㈃ �몄텧
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.url (String) - �꾩씠�� URL(�꾨찓�몄쓣 �쒖쇅�� 二쇱냼)
 * dataParam.callback(String) - �꾩씠�� 寃곌낵 肄쒕갚 �⑥닔 紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status - 寃곌낵 �곹깭 (SUCCESS : �깃났, FAIL : �ㅽ뙣 諛� 痍⑥냼, OTHER_AUTH : �ㅻⅨ�몄쬆�섎떒 踰꾪듉 �대┃ ��)
 * ipinData - JBSupportBridge.closeIpinPop(JSONObject)�먯꽌�� JSONOjbect 媛�
 * 
 * �꾩닔 �ы빆
 * �꾩씠���� 寃곌낵 �섏씠吏��먯꽌 �꾨옒 �⑥닔瑜� 紐낆떆�곸쑝濡� �몄텧
 * JBSupportBridge.closeIpinPop(JSONObject) - �뱁럹�댁��먯꽌 諛쏆쓣 �뺥깭�� JSON �곗씠�� �뺥깭濡� call 
 */
function fn_OpenIpinPop(dataParam){
    var params = {
        header : {api:134},
        body : {
            url : dataParam.url,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �⑦꽩 �ㅼ젙(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.cusNo(String) - �⑦꽩 �ㅼ젙 �� ���ν븷 怨좉컼踰덊샇(�쒕쾭�먯꽌 �뷀샇�뷀빐�� 諛쏆� 媛�)
 * dataParam.loginId(String) - �⑦꽩 �ㅼ젙 �� ���ν븷 �꾩씠��
 * dataParam.callback(String) - �⑦꽩 �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status (String) - �ㅼ젙 �щ� (SUCCESS : �깃났, FAIL : �ㅽ뙣, CANCEL : �ㅻ줈媛�湲�)
 * dialogClickType (String) - 濡쒓렇�몄닔�⑥꽕�� �앹뾽�먯꽌 �대┃�� �댁슜 (use : �ъ슜�섍린, no_use : �ъ슜�덊븿, cancel : �リ린)
 */
function fn_SetPatternLock(dataParam){
    var params = {
        header : {api : 140},
        body : {
            cusNo : dataParam.cusNo,
            loginId: dataParam.loginId,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �⑦꽩 �뺤씤(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �⑦꽩 �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status - �곹깭 (SUCCESS : �깃났, MAX_FAIL : 5�� �ㅽ뙣�섏뿬 �좉릿 �곹깭, FORGOT_PATTERN:�⑦꽩�� �딆뼱踰꾨졇�댁슂 踰꾪듉 �대┃, NOT_SETTING : �ㅼ젙�� �� �� �곹깭, CANCEL : 痍⑥냼, OTHER_AUTH : �ㅻⅨ�몄쬆�섎떒, MAX_FAIL_LOGIN : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� 濡쒓렇�명븯湲� 踰꾪듉 �뚮��꾨븣, MAX_FAIL_CANCEL : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� �섍�湲� 踰꾪듉 �뚮��꾨븣, MAX_FAIL_CLOSE : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� �リ린 踰꾪듉 �뚮��꾨븣)
 * cusNo - �⑦꽩 �ㅼ젙 �� �꾨떖 諛쏆� 怨좉컼 踰덊샇 媛�
 * loginId - �⑦꽩 �ㅼ젙�� ���ν븳 濡쒓렇�� �꾩씠��
 */
function fn_ConfirmPatternLock(dataParam){
    var params = {
        header : {api : 141},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �⑦꽩 5�� �ㅽ뙣 珥덇린��(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 5�뚯떎�� 珥덇린�� �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �곹깭 (SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_ResetPatternFail(dataParam){
    var params = {
        header : {api : 142},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �⑦꽩 �ㅼ젙 �щ�(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �⑦꽩 �ㅼ젙 �щ� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * isPattern - �⑦꽩 �ㅼ젙 �щ� (true : �ㅼ젙��, false : �ㅼ젙�덈맖)
 */
function fn_HasPattern(dataParam){
	var params = {
        header : {api : 143},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �⑦꽩 珥덇린��(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �⑦꽩 珥덇린�� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - 珥덇린�� �깃났 �щ� (SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_PatternClear(dataParam){
    var params = {
        header : {api : 144},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �� �ㅼ젙(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.cusNo(String) - �� �ㅼ젙 �� ���ν븷 怨좉컼踰덊샇(�쒕쾭�먯꽌 �뷀샇�뷀빐�� 諛쏆� 媛�)
 * dataParam.loginId(String) - �� �ㅼ젙 �� ���ν븷 �꾩씠��
 * dataParam.callback(String) - �� �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status (String) - �ㅼ젙 �щ� (SUCCESS : �깃났, FAIL : �ㅽ뙣, CANCEL : �ㅻ줈媛�湲�)
 * dialogClickType (String) - 濡쒓렇�몄닔�⑥꽕�� �앹뾽�먯꽌 �대┃�� �댁슜 (use : �ъ슜�섍린, no_use : �ъ슜�덊븿, cancel : �リ린)
 */
function fn_SetPinLock(dataParam){
    var params = {
        header : {api : 145},
        body : {
            cusNo : dataParam.cusNo,
            loginId : dataParam.loginId,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �� �뺤씤(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status - �곹깭 (SUCCESS : �깃났, MAX_FAIL : 5�� �ㅽ뙣�섏뿬 �좉릿 �곹깭, FORGOT_PATTERN:�⑦꽩�� �딆뼱踰꾨졇�댁슂 踰꾪듉 �대┃, NOT_SETTING : �ㅼ젙�� �� �� �곹깭, CANCEL : 痍⑥냼, OTHER_AUTH : �ㅻⅨ�몄쬆�섎떒, MAX_FAIL_LOGIN : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� 濡쒓렇�명븯湲� 踰꾪듉 �뚮��꾨븣, MAX_FAIL_CANCEL : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� �섍�湲� 踰꾪듉 �뚮��꾨븣, MAX_FAIL_CLOSE : 5�뚯떎�⑦썑 諛뷀��쒗듃 �щ씪���� �リ린 踰꾪듉 �뚮��꾨븣)
 * cusNo - �� �ㅼ젙 �� �꾨떖 諛쏆� 怨좉컼 踰덊샇 媛�
 * loginId - �� �ㅼ젙 �� �꾨떖 諛쏆� 濡쒓렇�� �꾩씠��
 * smpLoginSrtnNo - ?
 */
function fn_ConfirmPinLock(dataParam){
    var params = {
        header : {api : 146},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �� 5�� �ㅽ뙣 珥덇린��(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 5�뚯떎�� 珥덇린�� �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �곹깭 (SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_ResetPinFail(dataParam){
    var params = {
        header : {api : 147},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �� �ㅼ젙 �щ�(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �� �ㅼ젙 �щ� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * isPin - �� �ㅼ젙 �щ� (true : �ㅼ젙��, false : �ㅼ젙�덈맖)
 */
function fn_HasPin(dataParam){
	var params = {
        header : {api : 148},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �� 珥덇린��(媛꾪렪 濡쒓렇��)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �� 珥덇린�� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - 珥덇린�� �깃났 �щ� (SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_PinClear(dataParam){
	var params = {
        header : {api : 149},
        body : {
            callback : dataParam.callback
        }
    };
    if(isDevice.Type()){
        interfacecall(params);
    }
}

/**
 * �몄떆 �쒕퉬�� 諛� �ъ슜�� �깅줉
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.CUID(String) - �ъ슜�� �깅줉 �� �ъ슜�� CUID
 * dataParam.CNAME(String) - �ъ슜�� �깅줉 �� �ъ슜�� CNAME
 * 2. Response (�놁쓬)
 */
function fn_PushRegisterServiceAndUser(dataParam){
    var params = {
        header : {api : 150},
        body : {
            CUID : dataParam.CUID,
            CNAME : dataParam.CNAME
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �몄떆 �쒕퉬�� �댁젣
 * 1. Request (�놁쓬)
 * 2. Response (�놁쓬)
 */
function fn_PushUnRegistService(){
    var params = {
        header : {api : 151},
        body : {}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 理쒖큹 濡쒓렇�몄떆 �몄떆 �앹뾽 �몄텧 �ㅼ젙
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.showPushPopupYn(String) - �몄떆�앹뾽 �몄텧�좎� �щ� (Y:�몄텧, N:�몄텧�덊븿)
 * dataParam.callback(String) - �몄떆�앹뾽 �ㅼ젙 �� 肄쒕갚�댁쨪 �⑥닔 紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �깃났�щ� ( SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_SetShowPushPopup(dataParam){
    var params = {
        header : {api:152},
        body : {
            showPushPopupYn : dataParam.showPushPopupYn,
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * 理쒖큹 濡쒓렇�몄떆 �몄떆 �앹뾽 �몄텧 �ㅼ젙 媛��몄삤湲�
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 理쒖큹 濡쒓렇�몄떆 �몄떆 �앹뾽 �몄텧 �ㅼ젙 諛⑸쾿 肄쒕갚�댁쨪 �⑥닔 紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * showPushPopupYn - �몄떆�앹뾽 �몄텧�좎� �щ� (Y:�몄텧, N:�몄텧�덊븿)
 */
function fn_GetShowPushPopup(dataParam){
    var params = {
        header : {api:153},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �쒗넗由ъ뼹 �щ� 154 湲곗〈 誘몄궗��
 */

/**
 * �� �꾨�議� App Iron 泥댄겕 (1李� 泥댄겕 �� 2李⑥뿉 �꾩슂�� sessionId�� token媛� 由ы꽩�섎룄濡� 援ы쁽)
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �깆쐞蹂�議� 1李� 泥댄겕 �� �뺤씤 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject
 * status - �곹깭 (SUCCESS : �깃났, FAIL : �ㅽ뙣)
 * sessionId - 2李� �몄쬆�� �꾩슂�� sessionId ( status媛� SUCCESS�� 寃쎌슦�먮쭔 議댁옱 )
 * token - 2李� �몄쬆�� �꾩슂�� token ( status媛� SUCCESS�� 寃쎌슦�먮쭔 議댁옱 )
 * errorCode - 1李� �몄쬆 �ㅽ뙣 �� �먮윭肄붾뱶
 *  8000 : �대떦 �� �꾩씠�붿� 踰꾩쟾�쇰줈 �깅줉�� �댄뵆由ъ��댁뀡�� �놁뼱�� 諛쒖깮�섎뒗 �먮윭濡� �깆쓣 �뺤긽�곸쑝濡� �깅줉�섏��붿� �뺤씤�댁빞��
 *  9001 : �깆씠 �꾨�議곕맖(�쒕챸)
 *  9002 : 猷⑦똿�� �μ튂�먯꽌 �깆씠 �ㅽ뻾��
 *  9003 : �깆씠 �꾨�議곕맖(�ㅼ씠�곕툕 �쇱씠釉뚮윭由�)
 *  9004 : 釉붾옓�깆씠 �ㅼ튂�� �μ튂�먯꽌 �깆씠 �ㅽ뻾��
 */
function fn_CheckAppIron(dataParam){
	var params = {
        header : {api : 160},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * �� �꾨�議� App Iron 1,2李� 紐⑤몢 泥댄겕
 * 1李� �먮윭 or 2李� �먮윭 : �먮윭硫붿떆吏� �꾩슫 �� �� 醫낅즺
 * �깃났 : �꾨Т �묐떟 �놁쓬
 * @param dataParam  JSONObject
 * 1. Request �놁쓬
 * 2. Response �놁쓬
 */
function fn_CheckAppSecond(dataParam){
    var params = {
        header : {api : 161},
        body : {}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}
/**
 * �좎뒪�� �앹뾽
 */
function fn_Toast(message){
    var params = {
        header : {api : 170},
        body : {
            message : message
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * Android Play Store, Apple App Store濡� �대룞 (�ы썑愿�由ъ빋 �곸꽭 �붾㈃�쇰줈)
 */
function fn_OpenStore(){
    var params = {
        header : {api:180},
        body : {
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        //console.log("�깆뿉�쒕쭔 援щ룞 媛���");
    }
}

/**
 * APP�� �뚯썝媛��� �꾨즺 �몄텧 �꾨떖 - 媛쒖씤(P) / 踰뺤씤(B) - API : 200
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - �뚯썝媛��� �꾨즺 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �깃났�щ� ( SUCCESS : �깃났, FAIL : �ㅽ뙣)
 */
function fn_SetJoinComplete(dataParam){
    var params = {
        header : {api : 200},
        body : {
             joinUserDiv : dataParam.joinUserDiv
            ,callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * APP�� 濡쒓렇�몄씠 媛��ν븳吏� �붿껌 - API : 201
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) -  APP�� 濡쒓렇�몄씠 媛��ν븳吏� �뺤씤 �� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - 媛��μ뿬遺� ( Y : 媛���, N : 遺덇���)
 */
function fn_GetAppLoginYN(dataParam){
    var params = {
        header : {api : 201},
        body : {
             callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * APP�� �먮룞 濡쒓렇�� 泥댄겕 �щ� �붿껌 - API : 202
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - APP�� �먮룞 濡쒓렇�� 泥댄겕 �щ� �뺤씤 �� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - 媛��μ뿬遺� ( Y : 泥댄겕, N : 誘몄껜��)
 */
function fn_GetAutoLoginYN(dataParam){
    var params = {
        header : {api : 202},
        body : {
             callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * APP�� 濡쒓렇�� �붿껌 - API : 203
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - ��,�⑦꽩,fido,怨듬룞�몄쬆�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - 媛��μ뿬遺� ( Y : 媛���, N : 遺덇���)
 */
function fn_RequestAppLogin(dataParam){
    var params = {
        header : {api : 203},
        body : {
            callbackPin : dataParam.callbackPin, //��濡쒓렇��
            callbackPattern : dataParam.callbackPattern, //�⑦꽩濡쒓렇��
            callbackFido : dataParam.callbackFido,//�앹껜�몄쬆 濡쒓렇��
            callbackCert : dataParam.callbackCert//怨듭씤�몄쬆 濡쒓렇��
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * APP�� 濡쒓렇�� �꾨즺 �뺤씤 - API : 204
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - 濡쒓렇�� �꾨즺 �뺤씤 callback �⑥닔紐�
 * 2. Response (�놁쓬)
 */
function fn_ConfirmAppLogin(dataParam){
    var params = {
        header : {api : 204},
        body : {
            callback : dataParam.callback //濡쒓렇�� �꾨즺 肄쒕갚
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * �먮룞濡쒓렇�� �쒕퉬�� 諛� �ъ슜�� �깅줉
 * @param dataParam  JSONObject
 * 1. Request
 *    auto_login : Y
 * 2. Response (�놁쓬)
 */
function fn_AutoLoginRegisterServiceAndUser(dataParam){
    var params = {
        header : {api : 205},
        body : {
            auto_login : dataParam.auto_login
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * �먮룞濡쒓렇�� �쒕퉬�� �댁젣
 * 1. Request (�놁쓬)
 * 2. Response (�놁쓬)
 */
function fn_AutoLoginUnRegistService(){
    var params = {
        header : {api : 206},
        body : {}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * APP�� �뚯썝 �뺤씤 �붿껌 - API : 207
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - APP�� �뚯썝 �뺤씤 �� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * String
 * status - �뺤씤�щ�(Y : �깊쉶��, N : 鍮꾪쉶��) {"result" : "Y","cusNo" : ".........","smpLoginSrtNo" : "........."}
 * �좎�媛� 鍮꾨�踰덊샇 �꾨Ⅴ�붽쾬 痍⑥냼�섎㈃ "result":"N" �� 由ы꽩�섍퀬 �섎㉧吏��� 怨듬갚�쇰줈 由ы꽩
 */
function fn_GetAppUserConfirm(dataParam){
    var params = {
        header : {api : 207},
        body : {
             callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}


/**
 * �� �뚯썝 �덊눜 - API : 208
 * 1. Request (�놁쓬)
 * 2. Response (�놁쓬)
 */
function fn_AppMemberOut(){
    var params = {
        header : {api : 208},
        body : {}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}


/**
 * �ㅺ뎅�� �ㅼ젙
 * 1. Request �몄뼱援щ텇 (en/ko/ru/zh) 
 * 2. Response (�놁쓬)
 */
function fn_LanguageRegistService(dataParam){
    var params = {
        header : {api : 210},
        body : {
            language : dataParam.language
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * 吏�臾�/�섏씠�� �깅줉 - API : 1000 
 * 李멸퀬:fn_SetPatternLock, fn_SetPinLock
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.loginId(String) - �앹껜 �몄쬆�� �좏깮�� 怨좉컼ID, �좏깮�� LoginID 媛�
 * dataParam.hpNum(String) - �대���/移대뱶 �몄쬆�먯꽌 �섏뼱�� �몃뱶�곕쾲��
 * dataParam.uName(String) - �대���/移대뱶 �몄쬆�먯꽌 �섏뼱�� �대쫫 
 * dataParam.callback(String) -FIDO �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject {"resultCode":"1200","resultMessage":"�깃났"}
 * resultCode �뺤긽�멸꼍�� iphone:"1200", android:"000"
 * resultMessage "�깃났"
 * fido - 媛꾪렪鍮꾨�踰덊샇泥섎읆 怨꾩젙�붾퉬�� �깅줉�� 媛�
 */
function fn_SetFidoLock(dataParam){
    var params = {
        header : {api : 1000},
        body : {
            loginId : dataParam.loginId,
            cusNo : dataParam.cusNo,
            hpNum : dataParam.hpNum,
            uName : dataParam.uName,
            uBirth : '',
            uSex : '',
            foreigner : '',
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * 吏�臾�/�섏씠�� 濡쒓렇�� - API : 1001
 * 李멸퀬:fn_ConfirmPatternLock, fn_ConfirmPinLock
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - FIDO �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject {"LOGIN_ATHN_DVDCD":"F","resultCode":"1200","LOGIN_MTHD":"","resultMessage":"�깃났","jtoken":"xKocFYOAtwzi6s3mRHDJyQ==","user_no":"XXXXXXXX"}
 * LOGIN_ATHN_DVDCD 吏�臾몄� T, �섏씠�ㅼ씤利앹� F
 * cusNo - �� �ㅼ젙 �� �꾨떖 諛쏆� 怨좉컼 踰덊샇 媛�
 * loginId - �� �ㅼ젙 �� �꾨떖 諛쏆� 濡쒓렇�� �꾩씠��
 * smpLoginSrtnNo
 * fido - 媛꾪렪鍮꾨�踰덊샇 泥섎읆 怨꾩젙�붾퉬�� �깅줉�� ���λ릺�� �덈뒗 媛�
 */
function fn_ConfirmFidoLock(dataParam){
    var params = {
        header : {api : 1001},
        body : {
            loginRequestType : '5',
            jtoken : dataParam.jtoken,
            callback : dataParam.callback, //fido 湲곕낯濡쒓렇��
            callbackPin : dataParam.callbackPin, //��濡쒓렇��
            callbackPattern : dataParam.callbackPattern, //�⑦꽩濡쒓렇��
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * 吏�臾�/�섏씠�� �댁� - API : 1002
 * 李멸퀬:fn_PatternClear, fn_PinClear
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) - FIDO �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject {"resultCode":"1200","resultMessage":"�깃났"}
 * resultCode �뺤긽�멸꼍�� iphone:"1200", android:"000"
 */
function fn_FidoClear(dataParam){
    var params = {
        header : {api : 1002},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * �앹껜�몄쬆 �깅줉 �щ� - API : 1004
 * �⑦꽩�ㅼ젙�щ�(媛꾪렪 濡쒓렇��) - fn_HasPattern
 * �� �ㅼ젙 �щ�(媛꾪렪 濡쒓렇��) - fn_HasPin
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) -FIDO �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject {"result":"B"}
 * �앹껜�몄쬆 B
 */
function fn_HasFido(dataParam){
    var params = {
        header : {api : 1004},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * �대떦湲곌린媛� TouchID(吏�臾�) 吏��먯씤吏� FaceID 吏��먯씤吏� 援щ텇 - API : 1005
 * @param dataParam  JSONObject
 * 1. Request
 * dataParam.callback(String) -FIDO �ㅼ젙 �� �몄텧�� callback �⑥닔紐�
 * 2. Response (callback�⑥닔濡� �꾨떖�� �뚮씪誘명꽣)
 * JSONObject {"result":"F"}
 * 吏�臾몄� T, �섏씠�ㅼ씤利앹� F
 */
function fn_fido1005(dataParam){
    var params = {
        header : {api : 1005},
        body : {
            callback : dataParam.callback
        }
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
 * �ㅽ뵆�섏떆 �대�吏� �リ린 - API : 201
 * @param dataParam  JSONObject
 * 
 */
function fn_CloseSplash(){
    var params = {
        header : {api : 211},
        body : {}
    };

    if(isDevice.Type()){
        interfacecall(params);
    }else{
        console.log("�깆뿉�쒕쭔 援щ룞 媛���"+JSON.stringify(params));
    }
}

/**
*�� �먯꽌 諛깊븯�� 寃쎌슦 �뱀젙 �섏씠吏�濡� �대룞�댁빞 �섎뒗寃쎌슦 backKeyEvent �⑥닔 define �꾩슂 
* 
**/
function JBSupportBackEvent(param){
    var dontMoveList = ["errorView", "privateView", "checkView", "stopView"];
    var subMain = ["JFINCAP0001", "JCSMCHT0001", "JCSTCAP0001", "JONLLON0043"];
    var dontMoveBol = false;
    var nowPage = window.location.pathname;
    var referrer = document.referrer; 
    if($("#uiMenusec").hasClass("m_menu open") && JBWRC.isMobile()){ // 紐⑤컮�� 硫붾돱
        $(".btn_menu_close").trigger("click");
        return;
    }
    if($(".allmenu").css("display") === "block" && !JBWRC.isMobile()){ // �� 硫붾돱
        $(".allmenu-close").trigger("click");
        return;
    }
    
    if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){ // �깆씠 �꾨땶寃쎌슦 
        for(var i in subMain){
            var check = subMain[i];
            if(nowPage.indexOf(check) >= 0){
                window.localStorage.setItem("backFlag", "Y");
                break;
            }
        }
    }
    
    for(var i in dontMoveList){
        var check = dontMoveList[i];
        if(nowPage.indexOf(check) >= 0){
            dontMoveBol = true;
            break;
        }
    };
    
    var hashCd = window.location.hash;
    if(!dontMoveBol){
        var main = window.location.protocol + "//" + window.location.host;
        var nowLink = window.location.href;
        var loginMainChek = ( referrer.indexOf("JLGICAP0004") >= 0 || referrer.indexOf("JLGICAP0001") >= 0 || isEmpty(referrer) || ( ( referrer == main || referrer == (main+"/") ) &&  ( nowLink == main || nowLink == (main+"/") ) ) );
        if(hashCd != "" && !(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){ // �깆씠 �꾨땶寃쎌슦留� hash �대깽�� 
            window.localStorage.setItem("backFlag", "N");
            //jbwrcUtil.goBack();
            jbwrcFnc.goBackFunc();
        }else{
            if(loginMainChek){
                window.location.replace(main);
            }else if(typeof backKeyEvent == "function"){
                backKeyEvent();
            }else{
                //jbwrcUtil.goBack();
                jbwrcFnc.goBackFunc();
            } 
        }
    }
}

/**
*鍮덇컪 �뺤씤
* 
**/
function isEmpty(value){

    if( value == "" || value == null || value == undefined || 
      ( value != null && typeof value == "object" && !Object.keys(value).length)){
        return true;
    }else{
        return false;
    }
}