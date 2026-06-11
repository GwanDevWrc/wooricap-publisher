/*
 * ! <pre> ��怨좉컼 梨꾨꼸 front 怨듯넻 UI �⑥닔 �좏떥  Javascript </pre> (AS-IS ��遺�遺� MDJbUtil.js, HPApp.js)
 * 
 * @ClassName : jbwrcUtil.js
 * @Description : ��怨좉컼 梨꾨꼸 front 怨듯넻 UI �⑥닔 �좏떥
 * @author 24WP0097
 * @since 2024. 11. 29.
 * @version 1.0
 * @see 
 * @Modification Information <pre> since author description ===========
 *      ============= =========================== 2024. 11. 29. 24WP0097 理쒖큹 �앹꽦 </pre>
 */
(function(w, $) {
    'use strict';
    if (!$) {
        throw new Error('This libray requires jQuery');
    }

    if (w.jbwrcUtil) {
        return;
    }

    function tageName(name) {
        var tageName = {
            cmMessage : 'CM_MESSAGE'
        }[name];
        return tageName;
    }

    var jbwrcUtil = {
        createNameSpace : function(ns) {
            var names = ns.split('.'), i, parent = w, length = names.length;
            for (var i = 0; i < length; i++) {
                if (typeof parent[names[i]] === 'undefined') {
                    parent[names[i]] = {};
                }

                if (i < length - 1) {
                    parent = parent[names[i]];
                }
            }
            return parent;
        }
    };
    
    var JBWRC_MENU_1 = null;
    var JBWRC_MENU_2 = null;
    var JBWRC_MENU_3 = null;
    var JBWRC_MENU_4 = null;
    
    var JBWRC_MENUS = null;
    var timeStamp = null;
    
    var clsn_dt = [];
    var holi_dt = [];
    var today_all_clsn_dt = [];
    var workSearchCnt = 0;

    var rootNameSpace = 'jbwrcUtil', wlp = (/adm/.test(w.location.pathname.split('/')[1])) ? true : false, context = {
        isDevServer : false,
        isTestServer : false,
        isRealServer : false,
        maxTouchPoints : '-9',
        
        /**
         * �ㅼ씠踰꾩��� api�먯꽌 �ъ슜�섎뒗 �� 媛�
         */
        naverKey : "8jnnrvzvqs",
        
        /*
         * AS-IS MDJbUtil.js - direct
         * */
        ajaxUtil : {
            call : function(paramObj) {
                //if (typeof CM_LOGIN_INFO !== 'undefined') {
                //    if (CM_LOGIN_INFO.isLogin) {
                //        context.pageUtil.loginTimeCheck();
                //    }
                //}
                //if (typeof CM_SM_LOGIN_INFO !== 'undefined') {
                //    if (CM_SM_LOGIN_INFO.isLogin) {
                //        context.pageUtil.loginSmTimeCheck();
                //    }
                //}
                var result = {
                    errorNo : 0
                }

                if (!paramObj.hasOwnProperty("url")) {
                    result.errorNo = -1;
                }

                var waitFlag = paramObj.hasOwnProperty("waitFlag") ? paramObj["waitFlag"] : false;
                var errCallFlag = paramObj.hasOwnProperty("errCallFlag") ? paramObj["errCallFlag"] : false;

                $.ajax({
                    url : paramObj.hasOwnProperty("url") ? paramObj["url"] : "",
                    data : paramObj.hasOwnProperty("data") ? paramObj["data"] : "",
                    type : paramObj.hasOwnProperty("type") ? paramObj["type"] : "POST",
                    dataType : paramObj.hasOwnProperty("dataType") ? paramObj["dataType"] : "json",
                    async : paramObj.hasOwnProperty("async") ? paramObj["async"] : true,
                    beforeSend : function() {
                        if (waitFlag || paramObj.beforeShow) {
                            JBWRC.showLoading();                            
                        }
                    },
                    complete : function() {
                        if (waitFlag || paramObj.compleShow) {
                            JBWRC.hideLoading();                          
                        }
                    },
                    success : function(rData) {

                        if (paramObj.hasOwnProperty("callBack")) {
                            if (paramObj["callBack"] != "") {
                                if (typeof paramObj["callBack"] == "function") {
                                    paramObj["callBack"](rData);
                                } else {
                                    new Function('return ' + paramObj["callBack"])()(rData);
                                }
                            }
                        } else {
                            result.data = rData;
                        }
                    },
                    error : function(xhr, status, error) {
                        console.log(xhr);
                        
                        var userErrorMsg = "";
                        var errorMsg = "�ㅽ듃�뚰겕 �듭떊 �ㅻ쪟�낅땲��./n�좎떆�� �ㅼ떆 �쒕룄�댁＜�몄슂.";
                        var tempMsg = ""; // �ㅺ컪�ㅻ쪟
                        
                        // �듭떊 �ㅻ쪟 �뺤씤
                        if (xhr.status != 200) {
                            if (xhr.status == 0) 
                            {
                                errorMsg = xhr.statusText || error;
                            }
                            else 
                            {
                                var errorCode = "";
                                
                                if(!jbwrcFnc.isEmpty(xhr.responseJSON) && !jbwrcFnc.isEmpty(xhr.responseJSON.errorCode))
                                {
                                    errorCode = xhr.responseJSON.errorCode;
                                }
                                
                                // �쒕쾭 �ㅻ쪟 肄붾뱶 �뺤씤
                                if(!jbwrcFnc.isEmpty(xhr.responseJSON))
                                {
                                    errorMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorMessage) ? errorMsg : xhr.responseJSON.errorMessage;
                                    userErrorMsg = jbwrcFnc.isEmpty(xhr.responseJSON.userViewErrorMessage) ? errorMsg : xhr.responseJSON.userViewErrorMessage;
                                    
                                    errorMsg += ' '+xhr.responseJSON.detailErrorMessage;
                                }
                                else
                                {
                                    errorMsg = xhr.statusText || error;
                                }
                            }
                        }
                        
                        // �ㅺ컪�ㅻ쪟 泥섎━
                        if(!jbwrcFnc.isEmpty(xhr.responseJSON))
                        {
                            //tempMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorMessage) ? "" : xhr.responseJSON.errorMessage;
                            tempMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorCode) ? "" : xhr.responseJSON.errorCode;
                        }
                        
                        if(tempMsg == "99999")
                        {
                            userErrorMsg = "�μ떆媛� �댁슜�� �녾굅��, ���λ맂 �뷀샇 �ъ슜�쒖뿉��<br/>�섏씠吏�瑜� �ㅼ떆 �쒖옉�⑸땲��. 硫붿씤�쇰줈 �대룞�⑸땲��.";
                        }

                        JBWRC.hideLoading(true);
                        JBWRC.hideLoadingRandom(true);
                        
                        // �먮윭泥섎━瑜� �붾㈃�먯꽌 �섎뒗寃쎌슦
                        if (typeof paramObj.errorCallback  == "function"){  
                            paramObj.errorCallback(xhr, status, error);
                            return;
                        }
                        else{
                            if( typeof paramObj.beforeErrorAlert == 'function' ) {
                                try { 
                                    paramObj.beforeErrorAlert(userErrorMsg, xhr, status, error);
                                } catch(e){}                                        
                            }
                            var jsonErrorCode = '';
                            if(!jbwrcFnc.isEmpty(xhr.responseJSON) && !jbwrcFnc.isEmpty(xhr.responseJSON.errorCode))
                            {
                                jsonErrorCode = xhr.responseJSON.errorCode;
                            }
                            JBWRC.errorAlert(userErrorMsg, errorMsg, {
                                okBtnText: "�뺤씤",
                                cancelBtnText: "",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                                errCode:jsonErrorCode,
                                okCallback: function(){
                                    if( typeof paramObj.errorAlertCallback == 'function' ) {
                                        try { 
                                            paramObj.errorAlertCallback(userErrorMsg, xhr, status, error);
                                        } catch(e){}                                        
                                    }
                                    if(tempMsg == "99999")
                                    {
                                        // 濡쒓렇�몄븘�껋쿂由�
                                        location.href = "/lgi/logout.do";
                                    }
                                }
                            });                                                        
                        }                    
                    }
                });
                return result;
            },
            conditionCheck : function(rData) {
                if (rData.hasOwnProperty("errorResultFlag")) {
                    return rData.errorResultFlag;
                } else {
                    return true;
                }

            },
            form : function(paramObj) {
                var option = {
                    contentType : "application/json",
                    beforeSubmit : function() {
                    },
                    beforeSend : function() {
                    },
                    success : function() {
                        if (paramObj.hasOwnProperty("callBack")) {
                            if (typeof paramObj["callBack"] == "function") {
                                paramObj["callBack"](arguments[0]);
                            } else {
                                new Function('return ' + paramObj["callBack"])()(arguments[0]);
                            }
                        } else {
                            return arguments;
                        }
                    },
                    complete : function() {
                        console.log('ajaxForm_complete', arguments);
                    },
                    error : function(xhr, textStatus, errorThrown) {

                        result.errorNo = xhr.status;
                        if (xhr.status != 200) {
                            JBWRC.alert(xhr.responseJSON.errorMessage,{
                                okCallback: function(){
                                    
                                }
                            });
                        }
                    }
                }, result = {};

                if (paramObj.hasOwnProperty('form')) {
                    if (!paramObj.form instanceof jQuery) {
                        paramObj.form = $(paramObj.form);
                    }

                    if (paramObj.hasOwnProperty("option")) {
                        if (paramObj.option.hasOwnProperty("url")) {
                            $.extend(true, option, paramObj.option, {});
                        } else {
                            if (paramObj.form.prop('action') === '') {
                                return false;
                            }
                        }
                        $.extend(true, option, paramObj.option, {});
                    } else {
                        if (paramObj.form.prop('action') === '') {
                            return false;
                        }
                    }
                    paramObj.form.ajaxSubmit(option);
                } else {
                    return false;
                }
            },
            step : function(paramObj) {
                var dataObj = {
                    stepCode : "",
                    stepSeq : "",
                    procCd : "",
                    callBack : ""
                };
                context.dataUtil.objCopy(paramObj, dataObj);
                var urlData = "";
                if (dataObj["procCd"] == "set") {
                    urlData = "/cmm/ste/setStepProc.do";
                } else if (dataObj["procCd"] == "get") {
                    urlData = "/cmm/ste/getStepProc.do";
                } else if (dataObj["procCd"] == "preDel") {
                    dataObj["actionCode"] = "01"
                    urlData = "/cmm/ste/delStepSelProc.do";
                } else if (dataObj["procCd"] == "nextDel") {
                    dataObj["actionCode"] = "02"
                    urlData = "/cmm/ste/delStepSelProc.do";
                } else if (dataObj["procCd"] == "del") {
                    urlData = "/cmm/ste/delStepProc.do";
                } else if (dataObj["procCd"] == "allDel") {
                    urlData = "/cmm/ste/allDelStepProc.do";
                } else {
                    console.error("�끸쁾�끸쁾 procCd �ㅼ젙 媛믪씠 ��由쎈땲��.", paramObj);
                    return false;
                }

                if (dataObj["procCd"] == "set" && (dataObj["stepSeq"] != "1")) {
                    var checkData = {
                        "stepCode" : dataObj["stepCode"],
                        stepSeq : dataObj["stepSeq"] - 1
                    };
                    context.ajaxUtil.call({
                        url : "/cmm/ste/cehckStepAjax.do",
                        data : checkData,
                        waitFlag : false,

                        callBack : function(rData) {

                            if (rData.result == "true" || rData.result == true) {
                                context.ajaxUtil.call({
                                    url : urlData,
                                    data : dataObj,
                                    waitFlag : false,
                                    async : false,
                                    callBack : dataObj.callBack
                                });
                            } else {
                                JBWRC.alert("�묎렐�� 留뚮즺�� �붾㈃ �낅땲��. 硫붿씤�쇰줈 �대룞�⑸땲��. ",{
                                    okCallback: function(){
                                        location.replace("/");
                                    }
                                });
                            }
                        }
                    });
                } else {
                    context.ajaxUtil.call({
                        url : urlData,
                        data : dataObj,
                        waitFlag : false,
                        async : false,
                        callBack : dataObj.callBack
                    });
                }
            }
        },
        /**
         * url : �몄텧 url
         * data : �뚮씪誘명꽣
         * �몄텧 諛⑹떇   
         * customAjax({
                url : "/onl/lon/cstlmr1104r.do" // url 
                , data : {key:data} // param
                , beforeShow : true // 濡쒕뵫諛� �щ� 
                , compleShow : false // 濡쒕뵫諛� �щ� 
                , callBack : customCallBack // 肄쒕갚
                , loginYn : "Y"
            });
         * 
         */        
        customAjax : function(obj) {
            var info = obj;
            if(!jbwrcFnc.isEmpty(info.loginYn) && info.loginYn == "Y"){
                if(info.beforeShow){
                    JBWRC.showLoading();
                    info.beforeShow = false;
                };
                context.ajaxUtil.call({
                    url : "/cmm/sessionAuth.do"
                    , data : {}
                    , beforeShow : false
                    , compleShow : false
                    , callBack : function(param){
                        if(param.seesionYn == "Y"){
                            context.ajaxUtil.call(info);
                        }else{
                            JBWRC.hideLoading(true);
                            fnCloseLayerPop('_alert');
                            $('#_alert').remove();
                            JBWRC.alert( "�꾩옱 �댁슜�섏떆�� �쒕퉬�ㅻ뒗 濡쒓렇�� �� �댁슜 媛��ν빀�덈떎.", {
                                okBtnText: "濡쒓렇�명븯湲�",
                                cancelBtnText: "�덉쑝濡�",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                                okCallback: function(){
                                    JBWRC.showLoadingSec();                                                                       
                                    location.href = '/lgi/JLGICAP0001.do';
                                },
                                cancelCallback: function(){ // 痍⑥냼�� �ㅽ뻾�� �⑥닔
                                    JBWRC.showLoadingSec();                                   
                                    location.href = '/main.do';
                                }
                            });
                        }
                    }
                    ,errorCallback : function(status, errorMsg){}
                }); 
            }else{
                context.ajaxUtil.call(info);
            }            
        },
        dateUtil : {
            serverTime : function(formatData) {
                var serverTime = context.ajaxUtil.call({
                    url : '/std/getServerTime.do',
                    waitFlag : false,
                    async : false
                });

                if (formatData == undefined) {
                    return serverTime.data.result.replace("KST", "");
                } else {
                    var date = new Date(serverTime.data.result.replace("KST", ""));
                    return date.getFullYear() + formatData + addZero(date.getMonth() + 1) + formatData + addZero(date.getDate());
                }

                function addZero(n) {
                    return n < 10 ? "0" + n : n;
                }
            },
            setDate : function(data, type, num) {
                if (data == undefined) {
                    data = new Date(this.serverTime());
                } else {
                    data = new Date(this.dateFormat(data));
                }

                if (num == undefined) {
                    num = 1;
                }

                if (type == undefined) {
                    type = 'Y';
                }

                switch (type) {
                    case 'Y':
                        data.setFullYear(data.getFullYear() + num);
                        break;
                    case 'M':
                        data.setMonth(data.getMonth() + num);
                        break;
                    default:
                        data.setDate(data.getDate() + num);
                        break;
                }

                return this.dateFormat(data);
            },
            dateFormat : function(data, delimiter) {
                if (delimiter == undefined) {
                    delimiter = ".";
                }
                if (data == undefined) {
                    data = "-";
                }

                if(delimiter == "date"){
                    if(data.length != 8){
                        return "-";
                    }else{
                        return jbwrcFnc.isEmpty(data) ? "-" : moment(data).format("YYYY.MM.DD"); 
                    }
                }else if(delimiter == "YMD"){
                    if(data.length != 8){
                        return "-";
                    }else{
                        return jbwrcFnc.isEmpty(data) ? "-" : moment(data).format("YYYY�껶M�봁D��"); 
                    } 
                }else if(delimiter == "time"){
                    var hh = data.substring(0, 2);
                    var mm = data.substring(2, 4);
                    var ss = data.substring(4, 6);
                    var date = "";
                 
                    if(data.length == 6){
                        date = hh + ':' + mm + ':' + ss;
                    }
                    return date;
                }else if(delimiter == "P"){
                    return jbwrcFnc.isEmpty(data) ? "-" : Number(data) +"%";//comLon.formatIntrt(data); 
                }else if(delimiter == "won"){
                    return jbwrcFnc.isEmpty(data) || data == "-" ? "0 ��" : jbwrcFnc.comComma(data)+" ��"; 
                }else if(delimiter == "acno"){
                    return jbwrcFnc.isEmpty(data) ? "-" : comLon.formatAcno(data);
                }else if(delimiter == "car"){
                    return jbwrcFnc.isEmpty(data) ? "-" : comLon.carNumMask(data);
                }else if(delimiter == "H"){
                    return jbwrcFnc.isEmpty(data) || data == "0" ? "�놁쓬" : ""+data+"��";
                }else if(delimiter == "H2"){
                    return jbwrcFnc.isEmpty(data) || data == "0" ? "�놁쓬" : data+"<i>��</i>";
                }else if(delimiter == "媛쒖썡"){
                    return jbwrcFnc.isEmpty(data) || data == "" ? "" : data + " " + delimiter;
                }else if(delimiter == "��"){
                    return jbwrcFnc.isEmpty(data) || data == "" ? "" : data + " " + delimiter;
                }
                if (data instanceof Date) {
                    return data.getFullYear() + delimiter + addZero(data.getMonth() + 1) + delimiter + addZero(data.getDate());
                }
                jbwrcFnc.coSpecialCharRemove(data);
                switch (data.length) {
                    case 6:
                        return data.substr(0, 4) + delimiter + data.substr(4, 2);
                        break;
                    case 8:
                        return data.substr(0, 4) + delimiter + data.substr(4, 2) + delimiter + data.substr(6, 2);
                        break;
                    default:
                        return data.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3 $4:$5');
                        break;
                }
                if(data.trim() == "null"){
                    data = "";
                }
                return jbwrcFnc.isEmpty(data) ? "-" : data+delimiter;

                function addZero(n) {
                    return n < 10 ? "0" + n : n;
                }
            }
        },
        dataUtil : {
            previewImg : function($fileObj, $target, w_size) {
                if (!$fileObj instanceof jQuery) {
                    $fileObj = $($fileObj);
                }

                if (!$target instanceof jQuery) {
                    $target = $($target);
                }
                if ($fileObj.val() !== '') {
                    if (/\.(jpg|gif|png)?$/i.test($fileObj.val())) {
                        if (window.FileReader) {
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                var $img = $('<img/>').attr('src', e.target.result);
                                if (typeof w_size !== 'undefined') {
                                    $img.css('width', w_size);
                                }
                                $.each($target, function() {
                                    this.innerHTML += $('<div/>').append($img).html();
                                });
                            }
                            var inputFile = $fileObj[0];
                            if (inputFile.files && inputFile.files[0]) {
                                reader.readAsDataURL(inputFile.files[0]);
                            }
                        } else {
                            var inputFile = $fileObj[0];
                            inputFile.select();
                            var src = document.selection.createRange().text;
                            var $img = $('<img/>').attr('src', src);
                            if (typeof w_size !== 'undefined') {
                                $img.css('width', w_size);
                            }
                            $.each($target, function() {
                                this.innerHTML += $('<div/>').append($img).html();
                            });
                        }
                    }
                }
            },
            formSet : function(objData) {
                $.each(objData.orgObj, function(mKey, mValue) {
                    $.each(objData.targetObjArr, function(sKey, sObj) {
                        if (objData.hasOwnProperty("targetNameArr")) {
                            if (objData.targetNameArr.length != 0) {
                                if ($.inArray(mKey, objData.targetNameArr) >= 0) {
                                    if (mKey == sObj.name) {
                                        if (mValue != null) {
                                            if (objData.hasOwnProperty("subSelector")) {
                                                $(objData.subSelector + " input[name='" + sObj.name + "']").val(mValue);
                                            } else {
                                                $("input[name='" + sObj.name + "']").val(mValue);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (mKey == sObj.name) {
                                if (mValue != null) {
                                    if (objData.hasOwnProperty("targetNameArr")) {
                                        $(objData.subSelector + " input[name='" + sObj.name + "']").val(mValue);
                                    } else {
                                        $("input[name='" + sObj.name + "']").val(mValue);
                                    }
                                }
                            }
                        }

                    });
                });
            },
            objCopy : function(source, target) {
                source = $.extend(true, {}, source);
                $.each(target, function(mK, mV) {
                    $.each(source, function(sK, sV) {
                        if (mK == sK) {
                            target[mK] = sV;
                        }
                    });
                });
            },
            bindData : function(_obj, _parentSelector) {

                if (_parentSelector == null) {
                    _parentSelector = "body";
                }

                var bindFunc = function() {

                    var key = $(this).attr("data-key");
                    var keyArray = key.split(".");

                    var tempObj = _obj;
                    for (var idx = 0; idx < keyArray.length; idx++) {
                        if (tempObj.hasOwnProperty(keyArray[idx])) {
                            if (idx == keyArray.length - 1) {

                                $(this).empty("");

                                var dataFunc = $(this).attr("data-func");

                                var value = "";
                                if (dataFunc != null && dataFunc != "") {
                                    value = eval(dataFunc.replace("#" + keyArray[idx] + "#", tempObj[keyArray[idx]]));
                                } else {
                                    value = tempObj[keyArray[idx]];
                                }

                                var dataType = $(this).attr("data-type");
                                switch (dataType) {
                                    case "html":
                                        $(this).html(value);
                                        break;
                                    case "value":
                                        $(this).val(value);
                                        break;
                                    case "text":
                                        $(this).text(value);
                                        break;
                                    default:
                                        if ($(this).get(0).tagName.toLowerCase() == "data-bind") {
                                            $(this).text(value);
                                        } else {
                                            $(this).val(value);
                                        }
                                        break;
                                }
                            } else {
                                tempObj = tempObj[keyArray[idx]];
                            }
                        } else {
                            tempObj = _obj;
                            break;
                        }
                    }
                }

                $(_parentSelector).find("data-bind").each(bindFunc);
                $(_parentSelector).find("[data-bind]").each(bindFunc);
            },
            commaFormat : function(paramObj) {
                var obj, floVal, fn;
                if (paramObj == undefined) {
                    console.error("�낅젰媛믪씠 �뺤쓽 �섏� �딆븯�듬땲��.");
                    return false;
                }

                obj = paramObj["selector"] ? paramObj["selector"] : null;
                floVal = paramObj["limit"] ? paramObj["limit"] : null;
                fn = paramObj["callBack"] ? paramObj["callBack"] : null;

                if (obj instanceof jQuery == false) {
                    obj = $(obj);
                }
                if (obj.length < 1) {
                    console.error("媛앹껜媛� 議댁옱 �섏� �딆뒿�덈떎.", obj);
                    return false;
                } else {
                    context.formatterUtil('num_comma', obj);
                }

                function floorSet(val, event) {
                    if (val.length != 0) {
                        var result, rData = {};
                        if (floVal === null) {
                            result = Number(val);
                            rData["limitFlag"] = true;
                        } else {
                            result = Math.floor(Number(val) / floVal) * floVal
                            rData["limitFlag"] = result > 0 ? true : false;
                        }

                        if (fn !== null) {
                            rData["selector"] = obj;
                            rData["preVal"] = val;
                            rData["nextVal"] = result;
                            if (typeof fn == "function") {
                                fn(rData);
                            } else {
                                new Function('return ' + fn)()(rData);
                            }
                        }

                        return result;
                    } else {
                        return "";
                    }
                }
                obj.off('focusout.cmmfmt').on('focusout.cmmfmt', function(e) {
                    floorSet( jbwrcFnc.coCommaRemove(e.target.value), e);
                });
            }
        },
        pageUtil : {
            callLayPop : function(objData) {
                var urlFlag = objData.hasOwnProperty("urlPorcFlag") ? objData["urlPorcFlag"] : false;
                var pageUrl = "";

                try {
                    var urlData = objData.hasOwnProperty("url") ? objData["url"] : "";
                    if (urlData.indexOf(".do") != -1) {
                        pageUrl = urlData;
                    } else {
                        urlData = urlData.split("/");
                        urlData[urlData.length - 1] = urlData[urlData.length - 1].replace(".do", "").toUpperCase();
                        pageUrl = objData.hasOwnProperty("url") ? "/std/layPop.do?returnUrl=" + urlData.join("/") : "";
                    }

                } catch (e) {
                    pageUrl = "";
                }

                if ("" != pageUrl) {
                    $('#'+objData.id).remove();
                    $.get(pageUrl, function(rData) {
                        $("#base-laypop").append(rData);
                        var layObj = new Object();                        
                        layObj["id"] = objData.hasOwnProperty("id") ? objData["id"] : "";
                        
                        if(layObj["id"] == "PCW_ERR_0070_lypop"){
                            context.pageUtil.pageClickLog('Eerror_S', 'render'); //�ㅻ쪟 �앹뾽 �좎엯�� 
                        }
                        
                        if (objData.hasOwnProperty("endfocus")) {
                            layObj["endfocus"] = objData["endfocus"];
                        }
                        if (objData.hasOwnProperty("initFn")) {
                            layObj["callback"] = objData["initFn"];                            
                            if (typeof new Function('return ' + layObj["callback"])() != "function") {
                                console.error(layObj["callback"] + " �⑥닔媛� 議댁옱 �섏� �딆뒿�덈떎.");
                                return false;
                            }
                        }
                        if (objData.hasOwnProperty("param")) {
                            layObj["param"] = objData["param"];
                        }
                        if (objData.hasOwnProperty("callBackFn")) {
                            layObj["closeback"] = objData["callBackFn"];
                        }
                        if (objData.hasOwnProperty("full")) {
                            layObj["full"] = objData["full"];
                        }
                        if (objData.hasOwnProperty("reisze")) {
                            layObj["resize"] = objData["resize"];
                        }

                        fnOpenLayerPop(layObj["id"]);
                       
                        if (layObj["callback"] != "") {
                            if (typeof layObj["callback"] == "function") {
                                layObj["callback"]();
                            }else {
                                new Function('return ' + layObj["callback"])()();
                            }
                        }
                        
                    })
                } else {
                    console.log("url �뺣낫媛� �놁뒿�덈떎.");
                }
            },
            callWinPopUp : function(opt) {
                var width = (!opt.width) ? 790 : opt.width, height = (!opt.height) ? 620 : opt.height, align = (!opt.align) ? 'center' : opt.align, top = (!opt.top) ? 0 : opt.top, left = (!opt.left) ? 0 : opt.left, toolbar = (!opt.toolbar) ? 'no' : opt.toolbar, location = (!opt.location) ? 'no' : opt.location, menubar = (!opt.menubar) ? 'no' : opt.menubar, status = (!opt.status) ? 'no' : opt.status, resizable = (!opt.resizable) ? 'no' : opt.resizable, scrollbars = (!opt.scrollbars) ? 'yes' : opt.scrollbars;

                if (align === 'center') {
                    var w_w = $(w).outerWidth() / 2, w_h = $(w).outerHeight() / 2;

                    left = w_w - (width / 2);
                    top = w_h - (height / 2);
                }

                var specs = context.setString('width={0},height={1},left={2},top={3},toolbar={4},location={5},resizable={6},status={7},menubar={8},scrollbars={9}', [ width, height, left, top, toolbar, location, resizable, status, menubar, scrollbars ])
                return w.open((!opt.link) ? '' : opt.link, (!opt.name) ? 'new popup' : opt.name, specs);
            },
            submit : function() {
                JBWRC.showLoading();
                switch (arguments.length) {
                    case 1:
                        arguments[0].attr("onsubmit", "");
                        arguments[0].submit();
                        break;
                    case 2:
                        arguments[0].attr("onsubmit", "");
                        arguments[0].attr('action', arguments[1]).submit();
                        break;
                }
                setTimeout(function(){
                    JBWRC.hideLoading();
                },10000);
            },
            goPage : function(urlData, type, param) {
                if (typeof param !== 'undefined') {
                    if (param !== '') {
                        urlData += ('?' + $.param(param));
                    }
                }

                if (typeof type !== 'undefined') {
                    if ( type == 'pop' ) {
                        window.open(urlData,'test_newfiles');
                        JBWRC.hideLoading();
                    } else if (type) {
                        JBWRC.showLoading();
                        setTimeout(function(){
                            location.replace(urlData);
                        },50);
                    } else {
                        JBWRC.showLoading();
                        setTimeout(function(){                            
                            location.href = urlData;
                        },50);
                    }
                } else {
                    JBWRC.showLoading();
                    setTimeout(function(){
                        location.href = urlData;
                    },50);
                }
                var loadingTime = 10000;
                if(typeof type === 'number') {
                    if(type > 0){
                        loadingTime = type;
                        setTimeout(function(){
                            JBWRC.hideLoading();
                        },loadingTime);                        
                    }
                }
            },
            openPop : function(url, id, option, title) {
                if (typeof id === 'undefined') {
                    id = "tempPop";
                }

                if (typeof option === 'undefined') {
                    option = 'toolbar=0,directories=0,status=no.menubar=0,scrollbars=auto.resizable=yes,left=0,top=0';
                }

                if ($.browser.device == "IA" || $.browser.device == "AA") {
                    if (typeof title === 'undefined') {
                        title = null;
                    }
                    ;

                    fn_openPop({
                        url : url,
                        title : title
                    });
                } else {
                    var pop = window.open('', id, option);
                    pop.location.replace(url);
                }

            },

            tagGoPage : function(selector) {
                var url = '';
                if (/^A$/.test($(selector)[0].tagName.toUpperCase())) {
                    url = $(selector).attr("href");
                } else {
                    url = $(selector).data("link");
                }
                if (url == "" || url == "#") {
                    JBWRC.alert("�쒕퉬�� 以�鍮꾩쨷�낅땲��.");
                } else {
                    context.pageUtil.goPage(url);
                }
            },

            goLogin : function(paramObj) {
                var url = "";
                if (typeof paramObj === "undefined") {
                    url = window.location.pathname;
                } else {
                    url = paramObj.hasOwnProperty("url") ? paramObj["url"] : window.location.pathname;
                }

                if (CM_LOGIN_INFO.isLogin) {
                    location.href = url;
                } else {
                    context.storageUtil.set("CM_LOGIN_RETURN_URL", url);
                    location.href = "/lgi/JLGICAP0001.do";
                }
            },
            
            goLogout : function(flag, url) {
                flag = flag == undefined ? true : flag;
                if (flag) {
                    var tmplString = '<section class="ui-dialog laypop loginpop" id="MBW_LGO_0011_lypop" role="dialog" aria-hidden="true"><div class="laypop_wrap"><header class="laypop_tit"><h1> 濡쒓렇�꾩썐 �덈궡</h1></header><div class="laypop_cont txt_c"><p> 濡쒓렇�꾩썐 �섏떆寃좎뒿�덇퉴?</p><div class="btn_wrap"><button type="button" class="btn_base_l act2 logoutBtnCancel"><i>痍⑥냼</i></button> <button type="button" class="btn_base_l act logoutBtnOk"><i>�뺤씤</i></button></div></div></div></section>';
                    $.tmpl(tmplString).appendTo("#base-laypop");
                    var layPopObj = {
                        id : "MBW_LGO_0011_lypop"
                    };
                    $._uiLayPopup.open(layPopObj);

                    $(".logoutBtnCancel, .logoutBtnOk").off("click.logout").on("click.logout", function() {

                        if ($(this).hasClass("logoutBtnCancel")) {
                            $._uiLayPopup.close({
                                id : "MBW_LGO_0011_lypop",
                                remove : true
                            });
                        }

                        if ($(this).hasClass("logoutBtnOk")) {
                            logout(true);
                            $._uiLayPopup.close({
                                id : "MBW_LGO_0011_lypop",
                                remove : true
                            });
                        }

                    });
                } else {
                    logout(flag);
                }

                function logout(goPageFlag) {
                    context.ajaxUtil.call({
                        url : '/log/procLogout.do',
                        waitFlag : false,
                        callBack : function(rData) {

                            context.storageUtil.clear();

                            if (goPageFlag) {
                                if (url) {
                                    context.pageUtil.goPage(url);
                                } else {
                                    context.goMainPage('0', true);
                                }
                            }
                        }
                    });
                }
            },
            goSmLogout : function(){
                context.ajaxUtil.call({
                    url : '/sale/log/procLogout.do',
                    waitFlag : false,
                    callBack : function(rData) {
                        context.storageUtil.clear();
                    }
                });
            },
            loginTimeCheck : function() {
                clearInterval(loginTime.logInTimer);
                loginTime.logInTimeoutChk = 60 * 10;
                loginTime.semiLogInTimeoutChk = 60 * 8;
                loginTime.semiLogInTimeoutChkFlag = true;

                loginTime.logInTimer = setInterval(function() {
                    this.loginTimeInit();
                }, 1000);
            },
            backPageInfo : function() {
                if (location.hash != "#info") {
                    history.pushState('', '', window.location.href.concat("#info"))
                }
                $(window).off('hashchange.backpage').on("hashchange.backpage", function() {
                    if (location.hash == '') {
                        var chkUrl = window.location.pathname;
                        if (chkUrl.indexOf("errorView.do") != -1) {
                            context.goMainPage('0', true);
                        } else {
                            JBWRC.alert("�꾩옱 �섏씠吏��먯꽌 �섍��쒓쿋�듬땲源�?<br><br>蹂�寃쎌궗��씠 ���λ릺吏� �딆쓣 �� �덉뒿�덈떎.", {okBtnText:"�뺤씤", cancelBtnText:"痍⑥냼",
                                okCallback: function(flag) {
                                    if (flag) {
                                        window.history.back(-1);
                                    }
                                }
                            });
                        }
                    }
                });
            },
            page : function(option, target, callBackFn) {
                var util = new this.pagingAction();
                util.totalCnt = option.hasOwnProperty("totalRecordCount") ? option.totalRecordCount : 0;
                util.pageRows = option.hasOwnProperty("pageUnit") ? option.pageUnit : 10;
                util.disPagepCnt = option.hasOwnProperty("pageSize") ? option.pageSize : $.browser.mobile ? 5 : 10;
                util.curPage = option.hasOwnProperty("currentPage") ? option.currentPage : 1;
                util.setTotalPage();
                $(target).html(util.drow().html());
                $(target).find('button').off('click.mdpage').on('click.mdpage', function(e) {
                    e.stopPropagation();
                    if (util.disPagepCnt > 1) {
                        if ($(this).hasClass('btn_d_prev')) {
                            util.curPage = util.getPrevPage();
                        } else if ($(this).hasClass('btn_prev')) {
                            util.curPage = util.getPrev();
                        } else if ($(this).hasClass('page')) {
                            util.curPage = parseInt($(this).text());
                            return false;
                        } else if ($(this).hasClass('goPage')) {
                            util.curPage = parseInt($(this).text());
                        } else if ($(this).hasClass('btn_next')) {
                            util.curPage = util.getNext();
                        } else if ($(this).hasClass('btn_d_next')) {
                            util.curPage = util.getNextPage();
                        }
                    } else {
                        util.curPage = util.getNext();
                    }

                    util.setTotalPage();
                    if ("" != callBackFn) {
                        new Function('return ' + callBackFn)()({
                            currentPage : util.curPage,
                            pageSize : util.disPagepCnt,
                            pageUnit : util.pageRows
                        });
                    }
                })
            },
            pagingAction : function() {
                this.totalCnt;
                this.pageRows;
                this.curPage;
                this.disPagepCnt;
                this.totalPage;

                this.setTotalPage = function() {
                    this.totalPage = parseInt((this.totalCnt / this.pageRows)) + (this.totalCnt % this.pageRows > 0 ? 1 : 0);
                };

                this.getPrev = function() {
                    var prev = 0;
                    if (this.curPage > 1) {
                        prev = this.curPage - 1;
                    } else {
                        prev = 1;
                    }
                    return prev;
                };

                this.getNext = function() {
                    var next = 0;
                    if (this.curPage < this.totalPage) {
                        next = this.curPage + 1;
                    } else {
                        next = this.totalPage;
                    }
                    return next;
                };

                this.getPrevPage = function() {
                    var prevPage = 0;
                    var curPos = (parseInt((this.curPage / this.disPagepCnt)) + (this.curPage % this.disPagepCnt > 0 ? 1 : 0));

                    if (curPos > 1) {
                        prevPage = parseInt((curPos - 1)) * this.disPagepCnt;
                    }

                    return prevPage;
                };

                this.getNextPage = function() {
                    var nextPage = 0;
                    var curPos = parseInt((parseInt((this.curPage / this.disPagepCnt)) + (this.curPage % this.disPagepCnt > 0 ? 1 : 0)));

                    if ((curPos * this.disPagepCnt + 1) <= this.totalPage) {
                        nextPage = curPos * this.disPagepCnt + 1;
                    }

                    if (this.totalPage >= nextPage) {
                        return nextPage;
                    } else {
                        return this.totalPage;
                    }
                };

                this.drow = function() {
                    var $sb = $('<div/>');
                    var start = ((parseInt((this.curPage / this.disPagepCnt)) + (this.curPage % this.disPagepCnt > 0 ? 1 : 0)) * this.disPagepCnt - (this.disPagepCnt - 1));
                    var end = ((parseInt((this.curPage / this.disPagepCnt)) + (this.curPage % this.disPagepCnt > 0 ? 1 : 0)) * this.disPagepCnt);

                    if (end > this.totalPage) {
                        end = this.totalPage;
                    }

                    if (this.disPagepCnt > 1) {
                        if (this.curPage > this.disPagepCnt) {
                            $sb.append($('<button/>').attr({
                                type : 'button'
                            }).addClass('btn_d_prev').text('泥섏쓬�섏씠吏�濡�'));
                        }

                        if (this.getPrev() < this.curPage) {
                            $sb.append($('<button/>').attr({
                                type : 'button'
                            }).addClass('btn_prev').text('�댁쟾�섏씠吏�'));
                        }

                        for (var i = start; i <= end; i++) {
                            if (i == this.curPage) {
                                $sb.append($('<button/>').attr({
                                    type : 'button',
                                    'aria-selected' : true,
                                    title : '�좏깮��'
                                }).addClass('page').text(i));
                            } else {
                                $sb.append($('<button/>').attr({
                                    type : 'button',
                                    'aria-selected' : false,
                                    title : ''
                                }).addClass('goPage').text(i));
                            }
                        }

                        if (this.curPage < this.getNext()) {
                            $sb.append($('<button/>').attr({
                                type : 'button'
                            }).addClass('btn_next').text('�ㅼ쓬�섏씠吏�'));
                        }

                        if (this.totalPage >= this.getNextPage() && this.getNextPage() != 0) {
                            $sb.append($('<button/>').attr({
                                type : 'button'
                            }).addClass('btn_d_next').text('�앺럹�댁�濡�'));
                        }
                    } else {
                        if (this.curPage < this.getNext()) {
                            $sb.append($('<button/>').attr({
                                type : 'button'
                            }).addClass('btn_listmore').append($('<span/>').append('<i/>').text(this.curPage + '/' + this.totalPage)));
                        }
                    }
                    return $sb;
                };
            },
            callAppDown : function(option) {
                // intent://targethost?#Intent;scheme=jbmobilesupport;package=com.wooricap.jbmobilesupport;end
                var param = {
                    osTycd : '001', // Android
                    //osMediaDvcd : '1',
                    //relsDvcd : '1',
                    //mblAppDvcd : '1',
                    pageUrl : '/'
                };
                var pop = "";
                if (typeof option !== 'undefined') {
                    $.extend(true, param, option, {});
                }

                if ($.browser.device == "IA" || $.browser.device == "AA") {
                    JBWRC.alert("�깆뿉�쒕뒗 �ъ슜 �� �� �놁뒿�덈떎.",{
                        okCallback: function(){
                        }
                    });                    
                    return false;
                } else if ($.browser.device == "IW" || $.browser.device == "AW") {
                    if ($.browser.device == "IW") {
                        param["osTycd"] = "002"
                    } else if ($.browser.device == "AW") {
                        param["osTycd"] = "001"
                    }
                } else if ($.browser.device == "W") {
                    pop = window.open('', 'appVer');
                } else {
                    JBWRC.alert("�섎せ�� �묎렐�쇰줈 �깅떎�대줈�쒕�\n�ㅽ뻾 �� �� �놁뒿�덈떎.",{
                        okCallback: function(){
                        }
                    });                     
                    return false;
                }

                context.ajaxUtil.call({
                    url : '/mdr/mym/app/selectAppVer.do',
                    data : param,
                    callBack : function(rData) {
                        (function(ver) {
                            if (ver) {
                                if ($.browser.device == "IW") {
                                    launchiOSApp(location.origin + param["pageUrl"], ver.connUrl);
                                } else if ($.browser.device == "AW") {
                                    launchAndroidApp(location.origin + param["pageUrl"], ver.connUrl);
                                } else if ($.browser.device == "W") {
                                    pop.location.replace(ver.connUrl);
                                }
                            } else {
                                JBWRC.alert("�쒕퉬�� 以�鍮꾩쨷 �낅땲��.",{
                                    okCallback: function(){
                                    }
                                });                                   
                                return false;
                            }
                        }(rData.ADMVEROVO.ver))
                    }
                });

                function launchAndroidApp(rcvUrl, failUrl) {

                    var ua = navigator.userAgent;
                    var verChrome, verFireFox, verOpera, verSafari;

                    if ($.browser.chrome) {
                        verChrome = ua.match(/Chrome\/\d+.\d+/)[0].split("/")[1];
                    }
                    if ($.browser.firefox) {
                        verFireFox = ua.match(/Firefox\/\d+.\d+/)[0].split("/")[1];
                    }
                    if ($.browser.opera) {
                        verOpera = ua.match(/ORP\/\d+.\d+/)[0].split("/")[1];
                    }
                    if ($.browser.safari) {
                        verSafari = ua.match(/Safari\/\d+.\d+/)[0].split("/")[1];
                    }

                    var params = {
                        "target" : rcvUrl
                    };
                    var schemeUrl = "jbmobilesupport://targethost?" + JSON.stringify(params);

                    var iframe = document.createElement('IFRAME');
                    iframe.style.display = 'none';

                    if (verChrome <= 25 || verFireFox <= 40 || navigator.userAgent.match(/Daum/i)) {

                        iframe.src = 'intent://targethost?' + JSON.stringify(params) + '#Intent;scheme=jbmobilesupport;end';
                        document.body.appendChild(iframe);
                        start = +new Date();
                        setTimeout(function() {
                            var now = +new Date();
                            if (now - start < 2000) {
                                document.location.replace(failUrl);
                            }
                        }, 500);

                    } else if ((verChrome > 26 && verChrome < 42)) {

                        if (navigator.userAgent.match(/SamsungBrowser/i)) {

                            var openAt = new Date();
                            setTimeout(function() {
                                if (new Date() - openAt < 1000) {
                                    document.location.replace(failUrl);
                                }
                            }, 500);
                            document.location.replace('intent://targethost?' + JSON.stringify(params) + '#Intent;scheme=jbmobilesupport;package=com.wooricap.jbmobilesupport;S.browser_fallback_url=' + failUrl + ';end');

                        } else {

                            iframe.src = 'intent://targethost?' + JSON.stringify(params) + '#Intent;scheme=jbmobilesupport;package=com.wooricap.jbmobilesupport;S.browser_fallback_url=' + failUrl + ';end';
                            document.body.appendChild(iframe);
                            start = +new Date();
                            setTimeout(function() {
                                var now = +new Date();
                                if (now - start < 2000) {
                                    document.location.replace(failUrl);
                                }
                            }, 500);

                        }

                    } else if (verChrome >= 42 || verFireFox > 40) {

                        iframe.onload = function() {
                            document.location.replace('intent://targethost?' + JSON.stringify(params) + '#Intent;scheme=jbmobilesupport;package=com.wooricap.jbmobilesupport;S.browser_fallback_url=' + failUrl + ';end');
                        };
                        document.body.appendChild(iframe);
                        document.body.removeChild(iframe);
                    }
                }
                function launchiOSApp(rcvUrl, failUrl) {                    
                    window.location.href =  failUrl;
                    return false;
                }
            },
            msieVersionChk : function() {
                var ua = navigator.userAgent;

                if (ua.indexOf("MSIE") != -1 || navigator.appVersion.indexOf("Trident/") > 0) {
                    console.log("MSIE ua : " + ua);
                    var rv = 0;
                    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

                    var trident = ua.match(/Trident\/(\d.\d)/);
                    if (trident != null && trident[1] < 6.0) {
                        return true;
                    }

                    if (re.exec(ua) != null) {
                        rv = parseFloat(RegExp.$1);
                    }
                    console.log("MSIE VER : " + rv);
                    if (rv != 0 && rv <= 9) {
                        return true;
                    }
                }
            },
            loginSmTimeCheck : function() {
                clearInterval(loginSmTime.loginSmTimer);
                loginSmTime.loginSmTimeoutChk = 60 * 10;
                loginSmTime.semiloginSmTimeoutChk = 60 * 8;
                loginSmTime.semiloginSmTimeoutChkFlag = true;
                loginSmTime.loginSmTimer = setInterval(function() {
                    this.loginSmTimeInit();
                }, 1000);
            },
            pageClickLog : function(logCd, status, sync) {
                var url = "";
                if(!jbwrcFnc.isNull(status)){
                    url = "/xt/click.do?userClick="+logCd+"&status="+status;
                }else{
                    url = "/xt/click.do?userClick="+logCd;   
                }
                
                var async = true;
                if (!jbwrcFnc.isEmpty(sync) && sync == true) {
                    async = false;
                }

                $.ajax({
                    type : "GET",
                    dataType : "json",
                    async : async,
                    url : url,
                    data : {},
                    waitFlag : false,
                    success : function(rData) {},
                    error : function(rData){}
                });
            },
            /**
             * �쒓렇�� �띿꽦媛믪쑝濡� �ｊ퀬 �대┃�� 濡쒓렇瑜� �④�
             */
            loadClickLog : function() {
                var nodeDocLen = document.all.length;
                var htmlDocColl = document.all;

                for (var k = 0; k < nodeDocLen; k++) {
                    var eleDoc = htmlDocColl[k];
                    if(eleDoc.getAttribute('clicklog') != null && eleDoc.getAttribute('clicklog').length > 0){
                        console.log("get element "+eleDoc.getAttribute('clicklog'));
                        var clicklogValue = eleDoc.getAttribute('clicklog');
                        //eleDoc.addEventListener("click",jbwrcUtil.pageUtil.loadClickLog(eleDoc.getAttribute('clicklog'),"click"));
                        eleDoc.addEventListener("click", function(event){
                            console.log("get element2 "+clicklogValue);
                            context.pageUtil.pageClickLog(clicklogValue,'click');
                        });
                    }
                }
            },//pageClickLog
            /**
             * history.back 李⑤떒
             */
            preventBackNavigation : function(){
                console.log('...in preventBackNavigation...');
                setTimeout(function(){
                    console.log('...in preventBackNavigation2...');
                    location.hash = '#test';
                    history.pushState(null, '', location.href);
                    history.pushState(null, '', location.href);
                    //$(window).unbind('beforeunload');
                    //$(window).unbind('popstate');
                    //$(window).unbind('pageshow');
                    //$(window).unbind('pagehide');

                    let isHandling = false;
                    let isAddEventListener = false;
                    if( !isAddEventListener ){
                        isAddEventListener = true;
                        //window.addEventListener('popstate', function(){
                        $(window).off('popstate').on('popstate', function(){
                            console.log('...in popstate...');
                            if( !isHandling ){
                                console.log('...in popstate2...');
                                isHandling = true;
                                history.pushState(null, '', location.href);
                                setTimeout(function(){
                                    isHandling = false;
                                }, 100);
                                console.log('�ㅻ줈媛�湲곕뒗 �ъ슜�� �� �놁뒿�덈떎.');
                                JBWRC.alert('�ㅻ줈媛�湲곕뒗 �ъ슜�� �� �놁뒿�덈떎.');
                            }
                        });
                    }
                },1000);
            },//preventBackNavigation
            preventBackNavigation_1 : function(){
                console.log('...in preventBackNavigation_1...');
                history.pushState(null, '', location.href);
                window.onpopstate = function(event){
                    console.log('...in preventBackNavigation_1...2');
                    history.go(1);
                    history.pushState(null, '', location.href);
                    console.log('�ㅻ줈媛�湲곕뒗 �ъ슜�� �� �놁뒿�덈떎.');
                    JBWRC.alert('�ㅻ줈媛�湲곕뒗 �ъ슜�� �� �놁뒿�덈떎.')
                }
            },
            preventBackNavigation_2 : function() {
                if( location.hash !== '#no-back' ) {
                    location.hash = '#no-back';
                    setTimeout( ()=> {
                       location.hash = '#lock'; 
                    }, 50);
                }
            
                setTimeout(function(){
                    //window.addEventListener('hashchange', function(){
                    $(window).off('hashchange').on('hashchange', function(){
                        if( location.hash === '#no-back' ) {
                             console.log('�ㅻ줈媛�湲� 李⑤떒:', location.hash);
                             //JBWRC.alert('�ㅻ줈媛�湲곕뒗 �ъ슜�� �� �놁뒿�덈떎.');
                             history.pushState(null, '', location.href);
                             setTimeout( ()=> {
                                location.hash = '#lock'; 
                                 history.pushState(null, '', location.href);
                             }, 50);
                        } else {
                            console.log('�ㅻ줈媛�湲곗감��???', location.hash);
                            history.pushState(null, '', location.href);
                        }
                     }, false); 
                },100);
            },
        },
        securityUtil : {
            init : function() {

                if (typeof CM_LOGIN_INFO !== 'undefined') {
                    if (!CM_LOGIN_INFO.isLogin) {
                        context.securityUtil.securityTimeCheck();
                    }
                }
                
                if (typeof CM_SM_LOGIN_INFO !== 'undefined') {
                    if (!CM_SM_LOGIN_INFO.isLogin) {
                        context.securityUtil.securitySmTimeCheck();
                    }
                }
                //var isSecurityInit = false;
                //const inputs = document.querySelectorAll('input');
                //for(let i=0; i<inputs.length; i++){
                //    if(inputs[i].hasAttribute('data-tk-useinput')){
                //        isSecurityInit = true;
                //        break;
                //    }
                //    //if(inputs[i].hasAttribute('e2e_type')){
                //    //    isSecurityInit = true;
                //    //   break;
                //    //}
                //}

                if ($.browser.mobile) {
                    //if(isSecurityInit == true){
                    if($('input[data-tk-kbdType]').length > 0){
                        initmTranskey();
                    }
                    //}                    
                    
                    $("[data-tk-kbdType]").each(function() {
                        var maxNum = $(this).attr("maxlength");
                        $(this).off("contextmenu.secure").on("contextmenu.secure", function(e) {
                            return false;
                        });
                        $(this).off('paste.secure').on('paste.secure', function(e) {
                            return false;
                        });
                        $(this).off("focus.securemtk").on("focus.securemtk", function() {
                            var $thisObj = $(this);
                            mtk.onKeyboard(this);
                            if ($(window).height() != jbwrcFnc.winSize.top) {
                                setTimeout(function() {
                                    $(context.setString("#mtk_{0}", $thisObj.attr("id"))).focus();
                                    $(context.setString("#mtk_{0}", $thisObj.attr("id"))).removeAttr('tabindex');
                                }, 500);
                            } else {
                                $(context.setString("#mtk_{0}", $thisObj.attr("id"))).focus();
                                $(context.setString("#mtk_{0}", $thisObj.attr("id"))).removeAttr('tabindex');
                            }

                            $(context.setString("div#mtk_{0}", $(this).attr("id"))).off("touchstart.securemtk").on("touchstart.securemtk", function() {
                                if ($thisObj.attr("ui-format")) {
                                    $("#" + $thisObj.attr("id")).inputmask($thisObj.attr("ui-format"));
                                }
                                if ($thisObj.val().length >= maxNum) {
                                    mtk.close();
                                }

                            });
                        });
                    });

                } else {
                    $("[data-tk-kbdType]").each(function() {
                        $(this).off("contextmenu.securemtk").on("contextmenu.securemtk", function(e) {
                            return false;
                        });
                        $(this).off('paste.securemtk').on('paste.securemtk', function(e) {
                            return false;
                        });
                        $(this).attr("e2e_type", "1");
                        if ($(this).attr("data-tk-kbdType") === "number") {
                            $(this).attr("e2e_inputtype", "1");
                        }
                        $(this).removeAttr("data-tk-kbdType");
                        $(this).off("focus.securemtk").on("focus.securemtk", function() {
                            $ASTX2.clearE2EText($(this)[0]);
                        });
                    });

                    $ASTX2.setOption({
                        autofocus : false,
                        e2eform : true
                    });
                    checkInstallASTX2(function onSuccess() {
                        $_astxu.log('ASTX.checkServer() success');
                        $ASTX2.initE2E();
                    }, function onFailure() {
                        $_astxu.log('ASTX.checkServer() failure: errno=' + $ASTX2.getLastError());
                    });
                }
            },
            setData : function() {
                if ($.browser.mobile) {
                    mtk.fillEncData();
                }
            },
            securityTimeCheck : function() {
                clearInterval(jbwrcFnc.securityTime.securityTimer);
                jbwrcFnc.securityTime.securityTimeoutChk = jbwrcFnc.isNull(CM_SESSION_TIME) ? "1500" : CM_SESSION_TIME - 300;
                jbwrcFnc.securityTime.securityTimer = setInterval(function() {
                    this.securityTimeInit();
                }, 1000);

            },
            securitySmTimeCheck : function() {
                clearInterval(securitySmTime.securitySmTimer);
                securitySmTime.securitySmTimeoutChk = jbwrcFnc.isNull(CM_SM_SESSION_TIME) ? "1500" : CM_SM_SESSION_TIME - 300;
                securitySmTime.securitySmTimer = setInterval(function() {
                    this.securitySmTimeInit();
                }, 1000);

            },
            deviceIdifGthProc : function(callBack) {
                var rData = "";
                try {
                    if ($.browser.device === "W" && $.browser.desktop === true) {
                        var PCIdifGthForm = $('<form/>').attr("name", "PCIdifGth");
                        if ($('form[name="PCIdifGth"]').length == 0) {
                            $("body").append(PCIdifGthForm);
                        }
                        npPfsStartup(PCIdifGthForm[0], false, false, true, false, "npkencrypt", "on");
                        setTimeout(function() {
                            npPfsCtrl.waitSubmit(function() {
                                context.ajaxUtil.call({
                                    url : '/std/getPCIdifGth.do',
                                    waitFlag : false,
                                    data : PCIdifGthForm.serialize(),
                                    callBack : function(rData) {
                                    }
                                });
                            });
                        }, 1000);

                        /*var PCIdifGthForm = $('<form/>').attr("name", "PCIdifGth");
                        if($('form[name="PCIdifGth"]').length == 0){
                            $("body").append(PCIdifGthForm);
                        }*/

                        /*npPfsStartup($('form[name="testForm"]'), false, false, true, false, "npkencrypt", "key");
                        console.log("�끸쁾�끸쁾 deviceIdifGthProc call 22!!");
                        npPfsCtrl.waitSubmit(function(){
                            console.log("�끸쁾�끸쁾 deviceIdifGthProc call 33!!");
                            context.ajaxUtil.call({
                                url : '/std/getPCIdifGth.do',
                                waitFlag : false,
                                data : $('form[name="testForm"]').serialize(),
                                callBack :function(rData){
                                }
                            }); 
                        });*/

                    } else if ($.browser.device === "IA" || $.browser.device === "AA") {
                        console.log("�끸쁾�끸쁾 �몄텧 �쒖옉: ");
                        var dataParam = {
                            callback : "jbwrcUtil.securityUtil.mobileIdifGthKeyGenProc"
                        };
                        fn_GetDeviceInfo(dataParam);
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            },
            mobileIdifGthKeyGenProc : function(deviceInfo) {
                context.storageUtil.set("CM_MOBILE_UUID", deviceInfo.uuid);
                context.ajaxUtil.call({
                    url : '/std/genMobileIdifGthKey.do',
                    data : {
                        uuid : deviceInfo.uuid
                    },
                    waitFlag : false,
                    callBack : function(rData) {
                        console.log("�끸쁾�끸쁾 rData.result : " + rData.result);
                        fn_nProtectProc({
                            key : rData.result,
                            callback : "jbwrcUtil.securityUtil.mobileIdifGthProc"
                        })
                    }
                });
            },
            mobileIdifGthProc : function(IdifGthInfo) {
                context.ajaxUtil.call({
                    url : '/std/genMobileIdifGth.do',
                    data : {
                        uuid : context.storageUtil.get("CM_MOBILE_UUID"),
                        key : IdifGthInfo.encryptKey,
                        data : IdifGthInfo.encryptInfo
                    },
                    waitFlag : false,
                    callBack : function(rData) {
                        //console.log("�끸쁾�끸쁾rData : " , rData);
                    }
                });
            }
        },
        checkUtil : {
            checkInstall : function(target) {
                if ($.browser.device == "W") {
                    var cert = false;
                    var ahnlab = false;
                    
                    if (target == undefined) {

                        this.pcAhnlabCheck();

                        if(document.URL.indexOf("sale/log") == -1){
                            this.pcCertCheck();
                            this.pcScrap();
                            this.pcnProtect();                        
                        }

                    } else {
                        if (target == "cert") {
                            if(document.URL.indexOf("sale/log") == -1){
                                this.pcCertCheck();
                            }
                            
                        } else if (target == "ahnlab") {
                            this.pcAhnlabCheck();
                        } else if (target == "scrap") {
                            
                            if(document.URL.indexOf("sale/log") == -1){
                                this.pcScrap();
                            }                            
                        } else if (target == "nProtect") {
                            
                            if(document.URL.indexOf("sale/log") == -1){
                                this.pcnProtect();
                            }                               
                        }
                    }
                    
                }
            },
            pcAhnlabCheck : function() {
                try {
                    $ASTX2.init(function onSuccess() {
                    }, function onFailure() {
                        var errno = $ASTX2.getLastError();
                        if (errno == $ASTX2_CONST.ERROR_NOTINST) {
                            
                            if(document.URL.indexOf("sale/log") == -1){
                                location.href = "/cst/crt/JCSTCRT0013.do";
                            }else{
                                location.href = "/sale/log/mdSaleLog0013.do";  //梨꾨꼸�� 寃ъ쟻                              
                            }    
                            
                            return false;
                        }
                    });
                } catch (err) {
                    console.log("愿��� astx2.min.js, astx2_custom.js  �뚯씪�� 議댁옱 �섏� �딆뒿�덈떎. : ", err);
                }

            },
            pcCertCheck : function() {
                try {
                    //Delfino.isInstall(false, function(result) {
                    //    if (!result) {
                    //        location.href = "/csc/pro/mdPro0010.do";
                    //        return false;
                    //   }
                    //});
                } catch (err) {
                    console.log("愿��� delfino.jspf �뚯씪�� 議댁옱 �섏� �딆뒿�덈떎. : ", err);
                }
            },
            pcScrap : function() {
                try {
                    //espider.initialization(function() {
                    //    if (!arguments[0]) {                            
                    //        location.href = "/cst/crt/JCSTCRT0013.do";                            
                    //        return false;
                    //    }
                    //});
                } catch (err) {
                    console.log("愿��� espider.io.js, espider.js  �뚯씪�� 議댁옱 �섏� �딆뒿�덈떎. : ", err);
                }

            },
            pcnProtect : function() {
                try {
                    npPfsCtrl.isInstall({
                        success : function() {
                            //�뺤긽 �ㅼ튂
                        },
                        fail : function() {
                            location.href = "/cst/crt/JCSTCRT0013.do";
                            return false;
                        }
                    });
                } catch (err) {
                    console.log("愿��� nppfs-1.13.0.js �뚯씪�� 議댁옱 �섏� �딆뒿�덈떎. : ", err);
                }
            }
        },
        certUtil : {
            certData : {
                baseCallBack : ""
            },
            call : function(certType, callBack, orgTxt, waitFlag) {
                if ($.browser.device === "W") {
                    certType = jbwrcFnc.isNull(certType) ? "login=certLogin" : certType;
                    context.certUtil.certData.baseCallBack = callBack;
                    //if (jbwrcFnc.isNull(orgTxt)) {
                    //    Delfino.login(certType, context.certUtil.callBack);
                    //} else {
                    //    Delfino.sign(orgTxt, {
                    //        resetCertificate : true,
                    //        cacheCert : false,
                    //        addNonce : true
                    //    }, context.certUtil.callBack);
                    //}

                } else if ($.browser.device === "IW" || $.browser.device === "AW") {
                    context.pageUtil.goPage("/csc/not/mdDwl0010.do");
                } else if ($.browser.device === "IA" || $.browser.device === "AA") {
                    context.certUtil.certData.baseCallBack = callBack;
                    var objData = {
                        hint : "�몄쬆�쒖븫��",
                        label : "怨듬룞�몄쬆�� 鍮꾨�踰덊샇",
                        maxmsg : "",
                        minmsg : "",
                        inData : jbwrcFnc.isNull(orgTxt) ? "蹂몄씤�몄쬆" : orgTxt,
                        callback : "context.certUtil.callBack"
                    };
                    fn_certProc(objData)
                }
            },
            callBack : function(rData) {
                if ($.browser.device === "W") {
                    if (rData.status == 1) {
                        context.certUtil.certData.baseCallBack(rData);
                    } else {
                        //,$._uiLoading.hide();
                        if (rData.status == 0) {
                            JBWRC.alert("痍⑥냼�섏��듬땲��.",{
                                okCallback: function(){
                                }
                            }); 
                            return false;
                        }
                        if (rData.status == -10301) {
                            alert("error:" + rData.message + "[" + rData.status + "]");
                            return false;
                        }
                    }
                } else if ($.browser.device === "IA" || $.browser.device === "AA") {
                    if (rData.vid != "") {
                        rData.vidRandom = rData.vid
                        context.certUtil.certData.baseCallBack(rData);
                    } else {
                        //,$._uiLoading.hide();
                        JBWRC.alert("�몄쬆�� �ㅽ뙣 �섏��듬땲��.",{
                            okCallback: function(){
                            }
                        });                         
                    }
                }

            },
            validation : function(paramObj, callBack, waitFlag) {
                context.ajaxUtil.call({
                    url : '/std/certValidation.do',
                    data : paramObj,
                    waitFlag : jbwrcFnc.isNull(waitFlag) ? false : waitFlag,
                    callBack : function(rData) {
                        if ($.browser.device === "IA" || $.browser.device === "AA") {
                            var arrData = rData.result.crfcUserDn.split(",");
                            var resultData = "";
                            var intData = arrData.length;
                            $.each(arrData, function(key, value) {
                                resultData += arrData[intData - 1].replace(/(.+)(\=)(.+)/, function() {
                                    return arguments[1].toUpperCase() + arguments[2] + arguments[3];
                                }) + ",";
                                intData--;
                            });
                            rData.result.crfcUserDn = resultData.replace(/.$/, '');
                        }
                        callBack(rData.result);
                    }
                });
            }

        },
        storageUtil : {
            set : function(id, value, gubun) {
                var storage = gubun == undefined ? sessionStorage : localStorage
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                storage.setItem(id, value);
            },
            get : function(id, gubun) {
                var storage = gubun == undefined ? sessionStorage : localStorage
                var value = storage.getItem(id);
                try {
                    if (/[^0-9]/g.test(value)) {
                        return JSON.parse(value);
                    } else {
                        return value;
                    }

                } catch (e) {
                    return value;
                }
            },
            remove : function(id, gubun) {
                var storage = gubun == undefined ? sessionStorage : localStorage
                try {
                    storage.removeItem(id);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            toString : function(gubun) {
                var storage = gubun == undefined ? sessionStorage : localStorage
                return storage;
            },
            length : function(gubun) {
                var storage = gubun == undefined ? sessionStorage : localStorage
                return storage.length;
            },
            clear : function() {
                $.each(context.storageUtil.toString(), function(key, value) {
                    context.storageUtil.remove(key);
                });

                $.each(context.storageUtil.toString(""), function(key, value) {
                    context.storageUtil.remove(key, "");
                });

            }
        },
        formatterUtil : function(type, obj, m_len, m_type) {
            var base = this;
            if (typeof type === 'undefined') {
                return;
            }

            if (typeof obj === 'undefined') {
                return;
            } else {
                if (!obj instanceof jQuery) {
                    obj = $(obj);
                }
            }

            if (typeof m_len === 'undefined') {
                m_len = 0;
            }

            if (typeof m_type === 'undefined' || m_type !== 'B') {
                m_type = 'L';
            }

            var charByteSize = function(ch) {
                if (ch == null || ch.length == 0) {
                    return 0;
                }
                return ch.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
            };

            var cutByteLength = function(event) {
                var str = event.target.value;
                if (str == null || str.length == 0) {
                    return "";
                }
                var size = 0;
                var rIndex = str.length;
                for (var i = 0; i < str.length; i++) {
                    size += charByteSize(str.charAt(i));
                    if (size == m_len) {
                        rIndex = i + 1;
                        break;
                    } else if (size > m_len) {
                        rIndex = i;
                        break;
                    }
                }

                if (size >= m_len) {
                    event.target.value = event.target.value.substring(0, rIndex);
                }
            };

            var cutLength = function(event) {
                var size = event.target.value.length;
                if (size > m_len) {
                    event.target.value = event.target.value.substring(0, m_len)
                }
            };

            var replaceExp = function(event, exp) {
                if (typeof exp !== 'undefined') {
                    if (exp.test(event.target.value)) {
                        event.target.value = event.target.value.replace(exp, '');
                    }
                }
                if (m_len != 0) {
                    if (m_type == 'L') {
                        cutLength(event);
                    } else {
                        cutByteLength(event);
                    }
                }

                if (/^\s+/g.test(event.target.value)) {
                    event.target.value = context.strTrim(event.target.value, 'L');
                }

                $(event.target).off('focusout.formatter').on('focusout.formatter', function(e) {
                    event.stopPropagation();
                    if (/\s+$/g.test(event.target.value)) {
                        $(this).val(context.strTrim($(this).val(), 'R'));
                    }
                });

                //OCR�� 寃쎌슦 怨듬갚 2�먮━ �댁긽 �덉슜
                if(event.target.id != "ocr_flnm"){
                    if (/\s{2}/g.test(event.target.value)) {
                        event.target.value = context.strTrim(event.target.value, 'R');
                    }
                }
            };

            var dateCheck = function(event) {
                var dateReg = /^(\d{4})(\d{2})(\d{2})$/;
                var date = new Date(event.target.value.replace(dateReg, '$1-$2-$3'));
                if (/Invalid Date/.test(date.toDateString())) {
                    event.target.value = event.target.defaultValue;
                } else {
                    event.target.value = event.target.value.replace(dateReg, '$1-$2-$3');
                }
            }

            var dateSetting = function(event, selection) {
                var str_l = event.target.value.replace(/\D/g, '').substr(0, 8);
                if (!/keyup/.test(event.type)) {
                    event.target.value = String(str_l);
                } else {
                    event.target.value = str_l;
                    if (event.target.setSelectionRange) {
                        event.target.setSelectionRange(selection, selection);
                    }
                }
                if (/focusout/.test(event.type)) {
                    dateCheck(event);
                }
            }

            var timeCheck = function(event) {
                var timeReg = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
                if (!timeReg.test(event.target.value)) {
                    if (/srchStartTime/.test(event.target.id)) {
                        event.target.value = '00:00:00';
                    } else {
                        event.target.value = '24:00:00';
                    }
                }
            }

            var timeSetting = function(event, selection) {
                var str_l = event.target.value.replace(/\D/g, '').substr(0, 6);
                if (!/keyup/.test(event.type)) {
                    event.target.value = String(str_l).replace(/\B(?=(\d{2})+(?!\d))/g, ':');
                } else {
                    event.target.value = str_l;
                    if (event.target.setSelectionRange) {
                        event.target.setSelectionRange(selection, selection);
                    }
                }
                if (/focusout/.test(event.type)) {
                    timeCheck(event);
                }
            }

            var dateFunction = {
                date : function(event, selection) {
                    dateSetting(event, selection);
                },
                time : function(event, selection) {
                    timeSetting(event, selection);
                }
            };

            var fnFormatter = {
                NUM : function(event) {
                    replaceExp(event, /[^0-9]|[\|]/g);
                },
                NUM_COMMA : function(event) {
                    replaceExp(event, /[^0-9]|[\|]/g);
                    event.target.value = jbwrcFnc.coAddComma(event.target.value);
                },
                NUM_AMT : function(event) {
                    replaceExp(event, /[^0-9]|[\|]/g);
                    event.target.value = jbwrcFnc.coAddCommaAmt(event.target.value);
                },
                ENG : function(event) {
                    replaceExp(event, /[^A-Za-z\s]|[\|]/g);
                },
                ENG_NUM : function(event) {
                    replaceExp(event, /[^a-zA-Z0-9]|[\|]/g);
                },
                ENG_COMMA : function(event) {
                    replaceExp(event, /[^A-Za-z\s\.]|[\|]/g);
                },
                KOR : function(event) {
                    replaceExp(event, /[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025\s]|[\|]/g);
                },
                ENG_KOR : function(event) {
                    replaceExp(event, /[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|A-Za-z\s]|[\|]/g);
                },
                KOR_NUM : function(event) {
                    replaceExp(event, /[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|0-9\s]|[\|]/g);
                },
                KOR_NUM_TRIM : function(event) {
                    replaceExp(event, /[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|0-9]|[\|]/g);
                },
                EMAIL : function(event) {
                    replaceExp(event, /[^a-zA-Z0-9_\.,-@]|[\|]/g);
                },
                NOT_HTML : function(event) {
                    replaceExp(event, /[~!\#$^&*\=\-+|:;?"<,.>']/g);
                },
                HTML : function(event) {
                    replaceExp(event);
                },
                NOT_UNUSUAL : function(event) {
                    replaceExp(event, /[~!\#$^&*\=\-+|:;?"<,.>'%(_)]/g);
                },
                SRCH : function(event) {
                    var regExp = new RegExp(context.getMsg('BMMDR0990'), 'g');
                    replaceExp(event, regExp);
                }
            };

            var formatter = function($obj, type) {
                $obj.off('keydown.fmtutil keyup.fmtutil paste.fmtutil focusin.fmtutil blur.fmtutil contextmenu.fmtutil')
                     .on('keydown.fmtutil keyup.fmtutil paste.fmtutil focusin.fmtutil blur.fmtutil contextmenu.fmtutil', function(event) {
                    event.type == 'focusin' || event.stopPropagation();
                    event = event || window.event;
                    var keyCode = (event.which) ? event.which : event.keyCode;
                    if (/date|time/i.test(type)) {
                        if (/keydown/.test(event.type)) {
                            if (/^(4[8-9]|5[0-7]|9[6-9]|10[0-5]|8|9|16|35|36|37|38|39|40|46)$/.test(keyCode)) {
                                return;
                            } else {
                                return false;
                            }
                        } else if (/keyup/.test(event.type)) {
                            if (/^(16|35|36|37|38|39|40|46)$/.test(keyCode)) {
                                return;
                            } else {
                                dateFunction[type](event, event.target.selectionEnd);
                            }
                        } else if (/paste/.test(event.type)) {
                            setTimeout(function() {
                                dateFunction[type](event);
                            }, 100);
                        } else if (/contextmenu/.test(event.type)) {
                            return false;
                        } else if (/focusin/.test(event.type)) {
                            event.target.defaultValue = event.target.value;
                            dateFunction[type](event);
                        } else {
                            dateFunction[type](event);
                        }
                    } else {
                        if (/keydown/.test(event.type)) {
                            if (/^num/.test(type)) {
                                if (/^(4[8-9]|5[0-7]|9[6-9]|10[0-5]|8|9|16|35|36|37|38|39|40|46)$/.test(keyCode)) {
                                    return;
                                } else {
                                    return false;
                                }
                            }
                        } else if (/keyup/.test(event.type)) {
                            if (/^(16|35|36|37|38|39|40|46)$/.test(keyCode)) {
                                return;
                            } else {
                                fnFormatter[type.toUpperCase()](event);
                            }
                        } else if (/paste/.test(event.type)) {
                            setTimeout(function() {
                                fnFormatter[type.toUpperCase()](event);
                            }, 100);
                        } else if (/contextmenu/.test(event.type)) {
                            return false;
                        } else {
                            fnFormatter[type.toUpperCase()](event);
                        }
                    }
                });
            }
            formatter(obj, type);
        },
        fileUtil : {
            donwload : function(paramObj) {
                var baseObj = {
                    pathKey : paramObj.hasOwnProperty("basePath") ? paramObj["basePath"] : "",
                    viewMode : paramObj.hasOwnProperty("resultFlag") ? paramObj["resultFlag"] : false,
                    atflNm : paramObj.hasOwnProperty("orgFileName") ? paramObj["orgFileName"] : "",
                    strgFileNm : paramObj.hasOwnProperty("sysFileName") ? paramObj["sysFileName"] : "",
                    noFileType : paramObj.hasOwnProperty("noFileType") ? paramObj["noFileType"] : "A01"
                }
                if (baseObj.viewMode) {
                    return '/std/fileDownload.do?' + $.param(baseObj);
                } else {
                    location.href = '/std/fileDownload.do?' + $.param(baseObj);
                    return false;
                }

            },
            danawaImg : function(_flag, _option) {
                var param = {
                    flag : _flag,
                    viewMode : true,
                    noFileType : _option.hasOwnProperty("noFileType") ? _option["noFileType"] : "A01"
                };

                if (_option.hasOwnProperty("makrCd")) {
                    $.extend(param, {
                        makrCd : _option["makrCd"],
                        makrSeqno : _option["makrSeqno"]
                    });

                    if (_flag == "B") {
                        param.makrSeqno = "0";
                    }
                } else if (_option.hasOwnProperty("fileNm")) {
                    $.extend(param, {
                        fileNm : _option["fileNm"].replace(/[/]/img, "")
                    });
                } else if (_option.hasOwnProperty("cmdtCd")) {
                    $.extend(param, {
                        cmdtCd : _option["cmdtCd"],
                        cmdtDtlsCd : _option["cmdtDtlsCd"]
                    });
                }

                var imageLocation = '/std/danawaImage.do?' + $.param(param);

                return imageLocation;
            }
        },
        stplUtil : {  
            //stplUtil.layPop - 誘몄궗��
            //stplUtil.setData  - 誘몄궗��
            //stplUtil.validation  - 誘몄궗��
            getAgrValue : function(selector) {
                var thisObj = $(context.setString("{0} input:checkbox[data-stpl-id]", typeof selector === 'undefined' ? "" : selector));
                var tempString = "";
                $.each(thisObj, function(idx, obj) {
                    var objAttr = $(this).attr("data-stpl-id")
                    var Ival = ["I1","I2","I3"]
                    if(jQuery.inArray(objAttr, Ival) == -1){
                        tempString += context.setString("{0}={1}|", [ objAttr, $(this).prop("checked") ? "Y" : "N" ]);
                    }else{
                        tempString += context.setString("{0}={1}|", [ objAttr, $(this).prop("checked") ? "N" : "Y" ]);
                    }
                });
                tempString = tempString.replace(/.$/, '');
                return tempString;
            }
        },
        validationUtil : {
            email : function(str) {
                var s = str.split("-").join("");
                if (s.indexOf("@") == -1 || s.indexOf(".") == -1) {
                    return false;
                }
                if (s.indexOf("*") > -1) {
                    return false;
                }
                var t = escape(s);
                if (t.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null && t.match(/^(\w+)[.](\w+)@(\w+)[.](\w+)$/ig) == null 
                        && t.match(/^(\w+)[.](\w+)[.](\w+)@(\w+)[.](\w+)$/ig) == null
                        && t.match(/^(\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null && t.match(/^(\w+)[.](\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null
                        && t.match(/^(\w+)[.](\w+)[.](\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null
                        ) { 
                    return false;
                }
                return true;
            },
            vhcno : function(str) {
                var vhcno = str.trim();
                if (vhcno == "") {
                    return false;
                }

                var fChar = vhcno.substring(0, 1);
                if (!(/[^0-9]/g).test(fChar)) {
                    if (vhcno.length == 7) {
                        if (vhcno.match(/^\d{2}\D\d{4}$/) == null) {
                            return false;
                        }
                    } else {
                        if (vhcno.match(/^\d{3}\D\d{4}$/) == null) {
                            return false;
                        }
                    }
                } else if (!(/[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\s]/g).test(fChar)) {
                    if (vhcno.length == 10) {
                        if (vhcno.match(/^\D{2}\d{3}\D\d{4}$/) == null) {
                            return false;
                        }
                    } else if (vhcno.match(/^\D{2}\d{2}\D\d{4}$/) == null) {
                        return false;
                    }
                } else {
                    JBWRC.alert("�뺤떇�� 留욎� �딅뒗 臾몄옄",{
                        okCallback: function(){
                            
                        }
                    });
                    return false;
                }
                return true;
            },
            corpRegNo : function(bizID) {
                bizID = bizID.replace(/[^0-9]/g, "");
                if (bizID == "") {
                    return false;
                } else if (bizID.length != 10) {
                    return false;
                }
                var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
                var tmpBizID, i, chkSum = 0, c2, remander;
                bizID = bizID.replace(/-/gi, "");
                for (i = 0; i <= 7; i++)
                    chkSum += checkID[i] * bizID.charAt(i);
                c2 = "0" + (checkID[8] * bizID.charAt(8));
                c2 = c2.substring(c2.length - 2, c2.length);
                chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
                remander = (10 - (chkSum % 10)) % 10;

                if (Math.floor(bizID.charAt(9)) == remander)
                    return true;
                return false;
            }
        },
        autoFn : function() {
            $.fn.formToJson = function() {
                var form;
                if ($(this).is('form')) {
                    form = $(this);
                } else {
                    form = $(this).clone(true).wrap($('<form/>')).parent();
                }
                var resultObj = new Object();
                $.each(form.serializeArray(), function(i, data) {
                    resultObj[data.name] = data.value;
                })
                return resultObj;
            }
            $.extend(this, {
                jqueryTmpl : {
                    set : function() {

                        var lalyerTmplFlag = false;
                        var tmpl = {};
                        tmpl[location.pathname] = {};
                        $("script[type='text/x-jquery-tmpl']").each(function() {
                            tmpl[location.pathname][$(this).attr("id")] = $(this);

                            if ($(this).parents(".laypop").length > 0) {
                                lalyerTmplFlag = true;
                            }
                        });

                        if (lalyerTmplFlag) {

                            if (this.tmpl == null) {
                                this.tmpl = {};
                                this.tmpl[location.pathname] = {};
                            }

                            $.extend(this.tmpl[location.pathname], tmpl[location.pathname]);
                        } else {
                            this.tmpl = tmpl;
                        }
                    },
                    get : function(_targetTmplId, _printTargetSelector) {
                        var valueString = "";
                        for (var idx = 2; idx < arguments.length; idx++) {
                            valueString += "arguments[##],".replace("##", idx);
                        }
                        valueString = valueString.replace(/,$/, '');
                        eval("this.tmpl['" + location.pathname + "']['" + _targetTmplId + "'].tmpl(" + valueString + ").appendTo('" + _printTargetSelector + "')");
                    }
                },
                strTrim : function(str, type) {
                    if (typeof str === 'string') {
                        if (typeof type === 'undefined') {
                            return str.replace(/\s/g, new String());
                        } else if (/L/i.test(type)) {
                            return str.replace(/^\s+/g, new String());
                        } else if (/R/i.test(type)) {
                            return str.replace(/\s+$/g, new String());
                        } else {
                            return str;
                        }
                    } else {
                        return str;
                    }
                },
                setString : function(str, data) {
                    if (typeof str === 'string') {
                        var resultStr = str.replace(/\{(\d+)\}/g, function() {
                            if (typeof data[arguments[1]] !== 'undefined') {
                                if (data instanceof Array) {
                                    return data[arguments[1]];
                                } else {
                                    data = data.split(',');
                                    return data[arguments[1]];
                                }
                            } else {
                                return new String();
                            }
                        });
                        return this.strTrim(resultStr, 'R');
                    } else {
                        return str;
                    }
                },
                getMsg : function(msgCode, val) {
                    var msg = this.storageUtil.get(tageName('cmMessage')) == null ? undefined : this.storageUtil.get('CM_MESSAGE')[msgCode];
                    if (typeof msg === 'undefined') {
                        msg = this.ajaxUtil.call({
                            url : '/std/getMeaage.do',
                            data : {
                                msgCode : msgCode
                            },
                            async : false
                        })['data']['msg'];
                        if (typeof msg === 'string') {
                            var obj = {};
                            obj[msgCode] = msg;
                            if (this.storageUtil.get(tageName('cmMessage')) == null) {
                                this.storageUtil.set(tageName('cmMessage'), obj);
                            } else {
                                var cmMessage = this.storageUtil.get(tageName('cmMessage'));
                                $.extend(true, cmMessage, obj, {});
                                this.storageUtil.remove(tageName('cmMessage'));
                                this.storageUtil.set(tageName('cmMessage'), cmMessage);
                            }
                        } else {
                            return false;
                        }
                    }

                    if (typeof val === 'undefined') {
                        return msg;
                    } else {
                        return msg.replace(/\{(\d+)\}/g, function() {
                            if (val instanceof Array) {
                                return val[arguments[1]];
                            } else {
                                val = val.split(',');
                                return val[arguments[1]];
                            }
                        });
                    }
                },
                alert : function(paramObj) {
                    JBWRC.alert(paramObj["msg"], {
                        okBtnText : paramObj['yBtnNm'] || '�뺤씤',
                        cancelBtnText : paramObj['nBtnNm'] || '', // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                        okCallback : function() {
                            if (paramObj.hasOwnProperty('callBack')) {
                                paramObj['callBack'](true);
                            }
                        },
                        cancelCallback : function() {
                            if (paramObj.hasOwnProperty('callBack')) {
                                paramObj['callBack'](false);
                            }
                        }
                    });
                },
                confirm : function(paramObj) {
                    JBWRC.alert(paramObj["msg"], {
                        okBtnText : paramObj['yBtnNm'] || '�뺤씤',
                        cancelBtnText : paramObj['nBtnNm'] || '', // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                        okCallback : function() {
                            if (paramObj.hasOwnProperty('callBack')) {
                                paramObj['callBack'](true);
                            }
                        },
                        cancelCallback : function() {
                            if (paramObj.hasOwnProperty('callBack')) {
                                paramObj['callBack'](false);
                            }
                        }
                    });
                }
            });

            $.extend(w, {
                openAllMenu : function() {
                    var pageObjData = {
                        url : "/bzc/men/mdMen0010.do?XAREA=main_head_menu",
                        id : "PCW_MEN_0010_lypop",
                        full: true
                    };
                    context.pageUtil.callLayPop(pageObjData);
                },
                cookieTopbn : function() {
                    if (!$._cookie.get({
                        name : 'mai0010Ck1'
                    })) {
                        if (!$.browser.mobile) {
                            $('.bn_bar').show();
                            $('body').addClass('bn_bar_on');
                        }
                    }
                    $(document).off('click.cookiechk').on('click.cookiechk', '.ui-cookiecheck', function() {
                        var cookieId = $(this).attr('cookieid');
                        $('.bn_bar').slideUp(function() {
                            $('#' + cookieId).prop('checked') ? $._cookie.set({
                                name : cookieId,
                                term : 7,
                                value : $('#' + cookieId).val()
                            }) : '';
                            $('body').removeClass('bn_bar_on');

                        });
                    });
                },
                cookiePopup : function() {
                    if (!$._cookie.get({
                        name : 'mai0010Ck2'
                    })) {
                        $._uiLayPopup.open({
                            id : 'mainNotice_lypop'
                        });
                    }
                    $(document).off('click.cookiechk2').on('click.cookiechk2', '.ui-cookie-ntpop', function() {
                        var cookieId = $(this).attr('cookieid');
                        $('#' + cookieId).prop('checked') ? $._cookie.set({
                            name : cookieId,
                            term : 1,//7 �쇱＜��
                            value : $('#' + cookieId).val()
                        }) : '';
                        $._uiLayPopup.close({
                            id : 'mainNotice_lypop'
                        });
                        if ($('#' + cookieId).prop('checked')) {
                            location.href = "/";
                        }
                    });
                },
                cookiePopup2 : function() {
                    if (!$._cookie.get({
                        name : 'saleMai0010Ck2'
                    })) {
                        $._uiLayPopup.open({
                            id : 'saleNotice_lypop'
                        });
                    }
                    $(document).off('click.cookiechk2').on('click.cookiechk2', '.ui-cookie-ntpop', function() {
                        var cookieId = $(this).attr('cookieid');
                        $('#' + cookieId).prop('checked') ? $._cookie.set({
                            name : cookieId,
                            term : 1,//7 �쇱＜��
                            value : $('#' + cookieId).val()
                        }) : '';
                        $._uiLayPopup.close({
                            id : 'saleNotice_lypop'
                        });
                        if ($('#' + cookieId).prop('checked')) {
                            location.href = "/sale/mai/mdSaleMai0000.do";
                        }
                    });
                },
                chkEnter : function(strObj) {
                    if (event.which || evnet.keyCode) {
                        if ((event.which == 13) || (event.keyCode == 13)) {
                            document.getElementById(strObj).click();
                            return false;
                        }
                    } else {
                        return true;
                    }
                },
                entrySrv : function(page, tabId) {
                    if ("mdMen0010" == page) {
                        $._uiLayPopup.close({
                            id : "PCW_MEN_0010_lypop",
                            remove : true
                        });
                    }

                    $('body').data('useguide', $('.ui-useguide-btn'));
                    $._uiAjax.page({
                        id : 'ui-useguide',
                        url : '/csc/srv/mdSrv0010.do?XAREA=main_head_mdsrv',
                        add : false,
                        callback : useGuide
                    });

                    function useGuide() {
                        var $this = $('.ui-useguide-btn'), $ug = $('#ui-useguide'), $tit = $ug.find('.base-titimg'), $body = $('body'), timer;

                        if (!$body.data('scrolltop')) {
                            $body.data('scrolltop', $(w).scrollTop()).find('.base-wrapper, .base-landing').css('top', $(w).scrollTop() * -1);
                            $body.addClass('noscroll ug');
                        }

                        /*$._uiHold.hold({
                            //id : 'ui-useguide'
                        });*/
                        $ug.addClass('on');
                        $tit.attr('tabindex', 0);

                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            $tit.focus();
                        }, 100);

                        $('.ui-useguide-close').off('click.usg').on('click.usg', function() {
                            $body.removeAttr('style').removeClass('noscroll ug').find('.base-wrapper, .base-landing').removeAttr('style');
                            $('html, body').stop().animate({
                                scrollTop : $('body').data('scrolltop')
                            }, 0, function() {
                                $ug.removeClass('on').removeAttr('tabindex');
                                $($('body').data('useguide')).focus();
                                $body.data('scrolltop', null);
                            });
                        });

                        $('#ui-useguide').data('ajaxload', true);
                        $('#useGuide').uiSlide({
                            current : tabId == null ? 1 : tabId,
                            dot : true,
                            nav : true,
                            rolling : true,
                            auto_height : '.ui-img',
                            type : 'slide',
                            speed : 700,
                            mouseDrag : false,
                            autoplay : false,
                            autoplay_state : 'stop',
                            autoplay_time : 5000
                        });

                    }
                },
                loginTimeInit : function() {
                    var curruntTime = new Date();
                    var outCheckTime = 0;
                    if (loginTime.checkTime != 0) {
                        outCheckTime = Math.round((curruntTime.getTime() - loginTime.checkTime.getTime()) / 1000);
                    }

                    loginTime.checkTime = new Date();
                    loginTime.logInTimeoutChk = loginTime.logInTimeoutChk - outCheckTime;
                    loginTime.semiLogInTimeoutChk = loginTime.semiLogInTimeoutChk - outCheckTime;

                    if (loginTime.semiLogInTimeoutChkFlag) {
                        if (loginTime.semiLogInTimeoutChk <= -1 && loginTime.logInTimer != null) {
                            var pageObjData = {
                                url : "/log/MDLGO0012",
                                id : "PCW_LGO_0012_lypop",
                                initFn : "mdLgo0012.init"
                            }
                            context.pageUtil.callLayPop(pageObjData);
                            loginTime.semiLogInTimeoutChkFlag = false;
                        }
                    }

                    if (loginTime.logInTimeoutChk <= -1 && loginTime.logInTimer != null) {
                        $._uiLayPopup.close({
                            id : "PCW_LGO_0012_lypop",
                            remove : true
                        });
                        context.pageUtil.goLogout(false);

                        var pageObjData = {
                            url : "/log/MDLGO0010",
                            id : "PCW_LGO_0010_lypop",
                            initFn : "mdLgo0010.init",
                        }
                        context.pageUtil.callLayPop(pageObjData);
                        clearInterval(loginTime.logInTimer);

                    }
                    if ($(".layLogoutTimeInfo")) {
                        $(".layLogoutTimeInfo").text(loginTime.logInTimeoutChk);
                    }

                },
                loginSmTimeInit : function() {
                    var curruntTime = new Date();
                    var outCheckTime = 0;
                    if (loginSmTime.checkTime != 0) {
                        outCheckTime = Math.round((curruntTime.getTime() - loginSmTime.checkTime.getTime()) / 1000);
                    }
                    
                    loginSmTime.checkTime = new Date();
                    loginSmTime.loginSmTimeoutChk = loginSmTime.loginSmTimeoutChk - outCheckTime;
                    loginSmTime.semiloginSmTimeoutChk = loginSmTime.semiloginSmTimeoutChk - outCheckTime;
                    
                    if (loginSmTime.semiloginSmTimeoutChkFlag) {
                        if (loginSmTime.semiloginSmTimeoutChk <= -1 && loginSmTime.loginSmTimer != null) {
                            
                            var pageObjData = {
                                url : "/sale/log/MDSALELOG0012",
                                id : "PCW_SM_LOG_0012_lypop",
                                initFn : "mdSaleLog0012.init"
                            }
                            context.pageUtil.callLayPop(pageObjData);
                            loginSmTime.semiloginSmTimeoutChkFlag = false;
                        }
                    }

                    if (loginSmTime.loginSmTimeoutChk <= -1 && loginSmTime.loginSmTimer != null) {
                        $._uiLayPopup.close({
                            id : "PCW_SM_LOG_0012_lypop",
                            remove : true
                        });
                        context.pageUtil.goSmLogout();
                        

                        var pageObjData = {
                            url : "/sale/log/MDSALELOG0011",
                            id : "PCW_SM_LOG_0011_lypop",
                            initFn : "mdSaleLog0011.init",
                        }
                        context.pageUtil.callLayPop(pageObjData);
                        clearInterval(loginSmTime.loginSmTimer);

                    }
                    if ($(".layLogoutTimeInfo")) {
                        $(".layLogoutTimeInfo").text(loginSmTime.loginSmTimeoutChk);
                    }

                },
                securityTimeInit : function() {
                    var curruntTime = new Date();

                    var outCheckTime = 0;
                    if (jbwrcFnc.securityTime.checkTime != 0) {
                        outCheckTime = Math.round((curruntTime.getTime() - jbwrcFnc.securityTime.checkTime.getTime()) / 1000);
                    }

                    jbwrcFnc.securityTime.checkTime = new Date();
                    jbwrcFnc.securityTime.securityTimeoutChk = jbwrcFnc.securityTime.securityTimeoutChk - outCheckTime;

                    if (jbwrcFnc.securityTime.securityTimeoutChk <= -1) {
                        //�몄뀡醫낅즺�� 臾댄븳濡쒕뵫�꾩긽 �쒓굅
                        if(location.href.indexOf("Umr0200") > -1
                                || location.href.indexOf("Umr0220") > -1
                                || location.href.indexOf("Pln0220") > -1
                                || location.href.indexOf("Mvm0220") > -1
                                || location.href.indexOf("Aset0220") > -1){
                            location.href = "/";
                        }else if(location.href.indexOf("Pln0221") > -1
                                || location.href.indexOf("Umr0171") > -1
                                || location.href.indexOf("Mvm0221") > -1
                                || location.href.indexOf("Aset0221") > -1
                                || location.href.indexOf("odsPln") > -1
                                || location.href.indexOf("MDODSUCR") > -1
                                || location.href.indexOf("inapp/tossjb") > -1
                                || location.href.indexOf("TsUmr0200") > -1
                                || location.href.indexOf("TsUmr0220") > -1
                                || location.href.indexOf("inapp/findajb") > -1
                                || location.href.indexOf("FdUmr0220") > -1){
                            
                            location.href = "/cmm/JCOMERR0004.do?errUri="+location.href;
                        }else{
                            window.location.reload();
                        }
                    }

                },
                securitySmTimeInit : function() {
                    var curruntTime = new Date();

                    var outCheckTime = 0;
                    if (securitySmTime.checkTime != 0) {
                        outCheckTime = Math.round((curruntTime.getTime() - securitySmTime.checkTime.getTime()) / 1000);
                    }

                    securitySmTime.checkTime = new Date();
                    securitySmTime.securitySmTimeoutChk = securitySmTime.securitySmTimeoutChk - outCheckTime;

                    if (securitySmTime.securitySmTimeoutChk <= -1) {
                        window.location.reload();
                    }

                },
                stringErrorCheck : function(str) {
                    var exp = new RegExp(context.getMsg('BMMDR0990'), 'g');
                    var returnObj = {
                        errorArray : [],
                        rspnRslt : 'NR',
                        returnStr : str
                    }

                    if (exp.test(String(str))) {
                        returnObj.rspnRslt = 'ER';
                        returnObj.returnStr = String(str).replace(exp, function() {
                            returnObj.errorArray.push(arguments[0]);
                            return new String();
                        });
                    }
                    return returnObj;
                }
            });
        },
        pageAccess : {
            checkAccess : function() {

                if (this.isCloseServiceClass()) {
                    $(".closeServiceClass").attr("href", "javascript:alert('�곹뭹以�鍮꾩쨷�낅땲��.\n怨� 李얠븘逾숆쿋�듬땲��.');");
                }
                this.isIosChkgClass();
            },

            isCloseServiceClass : function() {
                //1李⑥삤�덉떆 以묎퀬李⑤줎 ���� �붾㈃ �쒓굅 (誘몄궗�⑹떆 諛섎뱶�� false濡� �ㅼ젙)
                return true;
            },

            isIosChkgClass : function() {

                /**
                 * TODO iOS寃��섍� �꾨즺�� 寃쎌슦 諛섎뱶�� false 濡� 蹂�寃�
                 */
                var isChecked = false;

                if (isChecked && $.browser.device == "IA") {

                    try {
                        var dataParam = {
                            callback : "jbwrcUtil.pageAccess.versionCallback"
                        };
                        fn_GetDeviceInfo(dataParam);
                    } catch (e) {
                    }
                }
            },

            versionCallback : function(rData) {

                /**
                 * 寃��섏쿂由ъ쨷�� �깅쾭�꾩껜�ъ씤 寃쎌슦留� �ㅼ젙
                 */
                if (rData.appVer == "1.0.9") {//TODO 寃��섏쿂由ъ쨷�� �깅쾭�� 泥댄겕
                    $(".closeIosChkgClass").hide();
                    $(".closeIosChkgClassATag").attr("href", "javascript:void('');");
                    $('body').removeClass('page-pcwmai0010');
                    $('html, body').stop().animate({
                        scrollTop : 1
                    });

                    $.each($(".closeIosChkgClass"), function() {
                        if ($(this).attr("id") == "rentfeAreaBtn" || $(this).attr("id") == "leasfeAreaBtn" || $(this).attr("id") == "insamdAreaBtn") {
                            $(this).attr("id", "");
                        }
                    });

                }
            }
        },
        /*
         * HPApp.js 蹂꾨룄 �앹꽦�쇰줈 �ㅼ떆 蹂�寃�
         * */        
        /**
         * 媛� 硫붿씤�쇰줈 �대룞 
         * type == true �� 寃쎌슦 location.replace 泥섎━ (jbwrcUtil.pageUtil.goPage �⑥닔 type �뚮씪誘명꽣 愿���)
         */
        goMainPage : function (key, type){
            var url = "";
            var langDiv = jbwrcFnc.nvl(context.storageUtil.get("reqlang"), "ko");
            switch (key) {
                case "0":
                    url = window.location.protocol + "//" + window.location.host; // 硫붿씤
                    break;
                case "1":
                    url = "/fin/cap/JFINCAP0001.do"; // 湲덉쑖�곹뭹
                    if(langDiv != "ko"){
                        url = "/man/JMANGLO0003.do"; // 湲덉쑖�곹뭹(�ㅺ뎅��)
                    }
                    break;
                case "2":
                    url = "/csm/JCSMCHT0001.do";     // 湲덉쑖�뚮퉬�먮낫�� �뚯옣
                    break;
                case "3":
                    url = "/cst/cap/JCSTCAP0001.do"; // 怨좉컼�쇳꽣
                    break;  
                case "4":
                    url = '/onl/lon/JONLLON0043.do'; // �닿툑�듦�由�
                    break; 
                default:
                    url = key;
                    break;
            }
            JBWRC.showLoading();
            setTimeout(() => {
                if(type) {
                    location.replace(url);                    
                } else {
                    location.href = url;
                }
            }, 30);
            
        },

        runFinSwipe : function (o,i) {
            //JBWRC.setAccordion( $("#faqList"), 'close' );       // accordion �リ린
            if ( !o ) {
                o = $('.tab_base_b[data-fn="tabs"]');
                o = o.length ? o : null;
                i = i ? i : 0;
            }
            if ( JBWRC.isMobile() && o ) {
                context.setSubTitle(o,i);
                JBWRC.noActTabSet();
                var tabScrT = JBWRC.scroller.scrollTop() > o.offset().top-64 ? o.offset().top-64 : JBWRC.scroller.scrollTop();
                $('html, body').stop().animate({scrollTop: tabScrT}, 250, function() {
                    setTimeout( function() {
                        JBWRC.scroller.trigger('scroll');
                    }, 300);
                });
            }
            
            // ��꽑�앹떆 �ъ쓽�꾨쾲�� 諛붽� 寃쎌슦
            if ( $('.text-tab-0001').length ) {
                $('[class^="text-tab-000"]').hide()
                $('.text-tab-000'+(+i+1)).show();
            }
            // 以묎퀬李� ��異쒖씤 寃쎌슦
            if ( $('.top_btn').find('.btn_base_l.act').length && $('.top_btn').find('.btn_base_l.act').attr('onclick').indexOf( "goDirectLink('1')" ) > -1 ) {
                if ( i == 0 ) {
                    $('.top_btn').show();
                    $('.breadcrumb .float-box .btn_box').removeClass('hide');
                } else {
                    $('.top_btn').hide();
                    $('.breadcrumb .float-box .btn_box').addClass('hide');
                }
            }

            var id = !!o ? '#swiper-graph-'+i : '#swiper-graph';
            // �곸슜 �섏뼱�덉쑝硫� 痍⑥냼
            $('.tab_base_b [data-contains]').children('section:not(.on)').find('.swiper-slide-active').addClass('swiper-slide-active-cancel').removeClass('swiper-slide-active');
            if ( $(id).length == 0 || $(id).hasClass('swiper-activated') ) {
                if ( $(id).hasClass('swiper-activated') ) {
                    $(id).find('.swiper-slide-active-cancel').addClass('swiper-slide-active').removeClass('swiper-slide-active-cancel');
                } 
                return;
            }
            $(id)[0].swipeObj = new Swiper(id, {
                on: {
                    'init' : function(swiper){                
                        $(id).find('.swiper-pagination').attr('title','珥� ' + swiper.slides.length + '媛� �щ씪�대뱶 以� ' + (swiper.realIndex+1) + '踰덉㎏ �щ씪�대뱶' );
                    },
                    'slideChange': function(swiper) {
                        $(id).find('.swiper-pagination').attr('title','珥� ' + swiper.slides.length + '媛� �щ씪�대뱶 以� ' + (swiper.realIndex+1) + '踰덉㎏ �щ씪�대뱶' );
                    }
                },
                loop: false,
                pagination: {
                    el: id + ' .swiper-pagination',
                    clickable: true,
                    renderBullet: function(idx, className){
                        return '<a href="javascript:void(0)" class="'+ className +'">slide '+ (idx + 1) + ' 蹂닿린</a>';
                    }
                },
                spaceBetween : 30,
                slidesPerView : 1,
                slidesPerGroup : 1,
                navigation: {
                    nextEl: id + ' .swiper-button-next',
                    prevEl: id + ' .swiper-button-prev',
                }
            });
            $(id).addClass('swiper-activated');
        },

        setSubTitle : function (o,i) {
            i = i ? i : 0;
            var tt = $('.top_tit h2');
            var tab = $('.tab_base_b[data-fn="tabs"]');
            if ( tab.length ) {
                var btns = tab.find('[data-btns]');
                var btn = btns.find('button');
                var t_text = btn.eq(i).text();
                if(t_text == ''){
                    t_text = tt.text();
                }
                console.log($('.top_tit h2').text());
                console.log(t_text);
                var obj = $('<div class="nav-tabs"></div>');
                obj.append('<a href="javascript:void(0)" title="'+ t_text +'" >'+ t_text +' <i class="arrow"></i></a>');
                obj.append(btns.clone().hide());
                obj.find('a').off('click').on('click', function() {
                    if ( $(this).hasClass('on') ) {
                        $(this).removeClass('on');
                        obj.find('.tabBtn').slideUp();
                    } else {
                        $(this).addClass('on');
                        obj.find('.tabBtn').slideDown()
                    }
                });
                obj.find('.tabBtn button').off('click').on('click', function(e) {
                    btn.eq( $(this).index() ).trigger('click');
                    obj.find('a').removeClass('on').html( $(this).text() );
                    obj.find('.tabBtn').slideUp();
                });
                JBWRC.headerNavSub(obj);
            }
        },

        setScnId : function (form){
            var scnId =  "";
            if(!jbwrcFnc.isEmpty(location.pathname)){
                var fi = location.pathname.lastIndexOf("/")+1;
                var la = location.pathname.lastIndexOf(".");
                scnId = location.pathname.substring(fi,la);
            }
            var hidenField = document.createElement('input');
            hidenField.setAttribute('type', 'hidden');
            hidenField.setAttribute('name', "scnId");
            hidenField.setAttribute('value', scnId);
            form.appendChild(hidenField);
        },

        getScnId : function () {
            if (!jbwrcFnc.isEmpty(location.pathname)) {
                return location.pathname.match('[^/]+$')[0].replace(/\..*$/,'');
            }
            return '';
        },

        //怨듯넻 �ъ슜  ajax �뚯뒪�몄쨷 !!!!!!!!
        /**
         * url : �몄텧 url
         * data : �뚮씪誘명꽣(留듯삎�쒓컼泥� �먮뒗 �� serialize)
         * useAsync : 鍮꾨룞湲� �ъ슜�щ� default true
         * beforeShow : 濡쒕뵫諛� �쒖옉 �ъ슜�щ� default true
         * compleShow : 濡쒕뵫諛� 醫낅즺 �ъ슜�щ� default true
         * method : �꾩넚諛⑹떇(get,post) default post
         * dataType :�꾩넚���� (json) default json
         * 
         * 媛쒕퀎 �붾㈃�먯꽌 fnCallback_[calback_id](calback_id,data,textStatus)紐낆쑝濡� �⑥닔 �뺤쓽 �섏뿬 �ъ슜 ex)function fnCallback_notificationListMoreAjax(calback_id,data,status){
         */
        cfn_ajaxTransmit : function (url,data,useAsync,beforeShow,compleShow,method,dataType){
            
            var calback_id = url.split('/').reverse()[0].replace('.do','');
            
            useAsync = useAsync == null?true:useAsync;
            beforeShow = beforeShow == null?true:beforeShow;
            compleShow = compleShow == null?true:compleShow;
            method = method == null?"post":method;
            dataType = dataType == null?"json":dataType;
            
            /*
            var url = obj.url;
            var data = obj.data;
            var calback_id = url.split('/').reverse()[0].replace('.do','');
            
            var useAsync = obj.useAsync == null?true:obj.useAsync;
            var beforeShow = obj.beforeShow == null?true:obj.beforeShow;
            var compleShow = obj.compleShow == null?true:obj.compleShow;
            var method = obj.method == null?"post":obj.method;
            var dataType = obj.dataType == null?"json":obj.dataType;
            */
            
            if(!jbwrcFnc.isEmpty(location.pathname)){
                var fi = location.pathname.lastIndexOf("/")+1;
                var la = location.pathname.lastIndexOf(".");
                var _scnId = location.pathname.substring(fi,la);
                if(typeof data == "object"){
                    data.scnId = _scnId;
                }else{
                    if(jbwrcFnc.isEmpty(data)){
                        data = jbwrcFnc.isEmpty(data) ? {} : data;
                        data.scnId = _scnId;
                    }else{
                        data = data + "&scnId=" +_scnId;
                    }
                }
            }
            $.ajax({
                url : url,
                data :  data,
                dataType : dataType,
                method : method,
                async  : useAsync,
                beforeSend : function() {
                    if(beforeShow){
                        JBWRC.showLoading();
                    }
                },
                complete : function() {
                    
                },
                success : function(data, status, xhr) {
                    //console.log(data);
                    //濡쒓렇�� �꾩슂�� 濡쒓렇�몄씠��
                    if(data.session != null && data.session == 'N'){
                        location.replace(data.url);
                        return false;
                    }
                    var callback = eval("fnCallback_"+calback_id+"(calback_id,data,status,xhr)");
                    $.when(callback).done(function(result){
                        if(compleShow){
                            JBWRC.hideLoading(true);
                        }
                    })
                },
                error:function(xhr, status, error) {
                    var userErrorMsg = "";
                    var errorMsg = "�ㅽ듃�뚰겕 �듭떊 �ㅻ쪟�낅땲��.<br>�좎떆�� �ㅼ떆 �쒕룄�댁＜�몄슂.";
                    var tempMsg = ""; // �ㅺ컪�ㅻ쪟

                    // �듭떊 �ㅻ쪟 �뺤씤
                    if (xhr.status != 200) {
                        if (xhr.status == 0) 
                        {
                            errorMsg = xhr.statusText || error;
                        }
                        else 
                        {
                            var errorCode = "";
                            
                            if(!jbwrcFnc.isEmpty(xhr.responseJSON) && !jbwrcFnc.isEmpty(xhr.responseJSON.errorCode))
                            {
                                errorCode = xhr.responseJSON.errorCode;
                            }
                            
                            // �쒕쾭 �ㅻ쪟 肄붾뱶 �뺤씤
                            if(!jbwrcFnc.isEmpty(errorCode))
                            {
                                errorMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorMessage) ? errorMsg : xhr.responseJSON.errorMessage;
                                userErrorMsg = jbwrcFnc.isEmpty(xhr.responseJSON.userViewErrorMessage) ? errorMsg : xhr.responseJSON.userViewErrorMessage;
                                
                            }
                            else
                            {
                                errorMsg = xhr.statusText || error;
                            }
                        }
                    }
                    // �ㅺ컪�ㅻ쪟 泥섎━
                    if(!jbwrcFnc.isEmpty(xhr.responseJSON))
                    {
                        //tempMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorMessage) ? "" : xhr.responseJSON.errorMessage;
                        tempMsg = jbwrcFnc.isEmpty(xhr.responseJSON.errorCode) ? "" : xhr.responseJSON.errorCode;
                    }
                    
                    if(tempMsg == "99999")
                    {
                        userErrorMsg = "�μ떆媛� �댁슜�� �녾굅��, ���λ맂 �뷀샇 �ъ슜�쒖뿉��<br/>�섏씠吏�瑜� �ㅼ떆 �쒖옉�⑸땲��. 硫붿씤�쇰줈 �대룞�⑸땲��.";
                    }
                    
                    
                    JBWRC.errorAlert(userErrorMsg, errorMsg, {
                        okBtnText: "�뺤씤",
                        cancelBtnText: "",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                        okCallback: function(){
                            if(JBWRC.loadingCnt > 0){
                                JBWRC.hideLoading(true);
                            }
                            
                            if(tempMsg == "99999")
                            {
                                // 濡쒓렇�몄븘�껋쿂由�
                                location.href = "/lgi/logout.do";
                            }
                        }
                    });
                }
            });
        },
        /**
         * msg, ok_txt, okBack, cancel_txt, cancelBack
         */
        fn_alert : function (obj){
            
            if(obj.cancel_txt == undefined){
                obj.cancel_txt = "";
            }
            
            JBWRC.alert( obj.msg, {
                okBtnText: obj.ok_txt,
                cancelBtnText: obj.cancel_txt,  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                okCallback: function(){
                    if(obj.okBack != undefined){
                        okBack();
                    }
                },
                cancelCallback: function(){ // 痍⑥냼�� �ㅽ뻾�� �⑥닔
                    if(obj.cancelBack != undefined){
                        cancelBack();
                    }
                }
            }); 
        },
        
        fn_openPopup : function(url) {
            if (JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA") {
                fn_openBrowser(url);
            } else {
                //window.open('about:blank', fn_getTime()).location.href = url;
                //window.open('about:blank', "_popup").location.href = url;
                window.open(url, "_popup");
            }
        },
        
        /**
         * 踰꾪듉 �좏슚�� 泥댄겕 (�붾㈃ �� vldchk �띿꽦�� �덈뒗 媛앹껜�� �좏슚�� 泥댄겕�섏뿬 踰꾪듉 �쒖꽦��/鍮꾪솢�깊솕)
         * 
         * @param pType      : [*�꾩닔] �ㅽ뻾 �좏삎 (I:�깅줉-���� 踰꾪듉 理쒖큹 鍮꾪솢�깊솕, U:�섏젙-���� 踰꾪듉 理쒖큹 �쒖꽦��, C:泥댄겕-泥댄겕 濡쒖쭅留� �ㅽ뻾)
         * @param btnId      : [*�꾩닔] �쒖꽦��/鍮꾪솢�깊솕 ���� 踰꾪듉 id
         * @param isAllObjs  : [ �좏깮] �꾩껜 媛앹껜 ���곸뿬遺� (false�� 寃쎌슦 show�섏뼱�덈뒗 媛앹껜留� ����)
         * @param targetArea : [ �좏깮] ���� �곸뿭
         * @param isPrint    : [ �좏깮] console.log 異쒕젰�щ�
         * 
         * @example
         * jbwrcUtil.vldChkBtn("I", "btnReg");  // ready�먯꽌 �몄텧 (�깅줉踰꾪듉 id : btnReg)
         * 
         * @example
         * jbwrcUtil.vldChkBtn("U", "btnReg");  // ready�먯꽌 �몄텧 (�섏젙踰꾪듉 id : btnUpd)
         * 
         * @example
         * jbwrcUtil.vldChkBtn("C", "btnReg");  // 泥댄겕 �ㅽ뻾�댁빞�섎뒗 濡쒖쭅�먯꽌 �몄텧
         */
        vldChkBtn : function(pType, btnId, isAllObjs, targetArea, isPrint) {
            if (!btnId) return false;
            
            // 異쒕젰
            var print = function(e) {
                if (isPrint) {
                    if (e.target) {
                        console.log("[vldChkBtn] " + e.target.type.replace(/-one/gi, "") + " " + e.type + " event 諛쒖깮\n�� object : #" + e.target.id);
                    } else {
                        var type = e.prop("type").replace(/-one/gi, "");
                        var what = (type == "select" || type == "radio") ? "誘몄꽑��" : (type == "checkbox" ? "誘몄껜��" : "誘몄엯��");
                        console.log("[vldChkBtn] FALSE : " + type + " " + what + "\n�� object : #" + e.prop("id"));
                    }
                }
            };
            
            // ���� �곸뿭
            var $area = $('#' + btnId).closest('.contents-wrap');
            if (!jbwrcFnc.isEmpty(targetArea) && $area.find(targetArea).length > 0) {
                $area = $area.find(targetArea);
            }
            
            // 泥댄겕
            var chk = function() {
                var isDisabled = true;
                var objs = null;
                if (isAllObjs) {
                    objs = $area.find('[vldChk], select[vldChk]');
                } else {
                    if (JBWRC.isMobile()) {
                        objs = $area.find('[vldChk]:visible, select[vldChk]');  // 紐⑤컮�� select �④�泥섎━ ����
                    } else {
                        objs = $area.find('[vldChk]:visible, select[vldChk]:visible');
                    }
                }
                for (var i = 0; i < objs.length; i++) {
                    var obj = objs[i];
                    var value = !jbwrcFnc.isEmpty(obj.value) ? obj.value.replace(/[.,-]/gi, "") : "";
                    if (obj.type == "select-one") {
                        if (jbwrcFnc.isEmpty(value) && obj.selectedIndex <= 0) {
                            isDisabled = false;
                            print($(obj));
                            break;
                        }
                    } else if (obj.type == "radio") {
                        if (jbwrcFnc.isEmpty($('input:radio[name=' + obj.name + ']:checked').val())) {
                            isDisabled = false;
                            print($(obj));
                            break;
                        }
                    } else if (obj.type == "checkbox") {
                        if (!$('#' + obj.id).is(":checked")) {
                            isDisabled = false;
                            print($(obj));
                            break;
                        }
                    } else {
                        if (jbwrcFnc.isEmpty(value)) {
                            isDisabled = false;
                            print($(obj));
                            break;
                        }
                    }
                }
                
                // 踰꾪듉 �쒖꽦��/鍮꾪솢�깊솕
                $('#' + btnId).prop('disabled', !isDisabled);
            };
            
            // �ㅽ뻾 �좏삎�� �곕씪 泥댄겕 �먮뒗 �대깽�� 異붽�
            if (pType == "C") {
                // 泥댄겕
                chk();
            } else {
                // �대깽�� 異붽�
                var objs = null;
                if (isAllObjs) {
                    objs = $area.find('[vldChk], select[vldChk]');
                } else {
                    if (JBWRC.isMobile()) {
                        objs = $area.find('[vldChk]:visible, select[vldChk]');  // 紐⑤컮�� select �④�泥섎━ ����
                    } else {
                        objs = $area.find('[vldChk]:visible, select[vldChk]:visible');
                    }
                }
                objs.each(function() {
                    var type = $(this).prop("type");
                    if (type == "select-one" || type == "radio" || type == "checkbox") {
                        $(this).off("change").on("change", function(e) {
                            print(e);
                            chk();
                        });
                    } else {
                        //$(this).on("input", function(e) { // btn-ico-clear �낅젰��젣 踰꾪듉 �대┃ �� input�� change�대깽�� ����
                        $(this).off("input change").on("input change", function(e) {
                            print(e);
                            chk();
                        });
                    }
                });
                
                // �ㅽ뻾 �좏삎�� �곕씪 踰꾪듉 �쒖꽦��/鍮꾪솢�깊솕
                $('#' + btnId).prop('disabled', (pType == "I"));
            }
            
        },
        
        /**
         * �낅젰�� 湲��� �� set
         * 
         * @param inpObj : [*�꾩닔] �낅젰 �섎뒗 媛앹껜 (maxlength �띿꽦 �꾩슂. maxlength源뚯�留� �낅젰 媛���)
         * @param tarObj : [*�꾩닔] count瑜� 異쒕젰�� ���� 媛앹껜
         * 
         * @example
         * // inqCtnt(textarea) �낅젰 �� inqCtntCnt(span)�� 湲��� �� set
         * $('#inqCtnt').off('input').on('input', function() {
                jbwrcUtil.setCntChar($(this), $('#inqCtntCnt'));
            });
         */
        setCntChar : function(inpObj, tarObj) {
            if (!inpObj || !tarObj) return false;
            var maxLen = !jbwrcFnc.isEmpty(inpObj.attr("maxlength")) ? inpObj.attr("maxlength") : 200; 
            if (jbwrcFnc.isEmpty(inpObj.val())) {
                tarObj.text("0");
            } else if (inpObj.val().length > Number(maxLen)) {
                inpObj.val(inpObj.val().substring(0, Number(maxLen)));
                tarObj.text(jbwrcFnc.comComma(maxLen));
            } else {
                tarObj.text(jbwrcFnc.comComma(String(inpObj.val().length)));
            }
        },
        
        /**
         * 湲덉븸 �쒓� �뺤떇
         * 
         * @param amt : [*�꾩닔] 湲덉븸
         * 
         * @example
         * jbwrcUtil.formatKorAmt(15500000);    // @result : 1泥�5諛�5��쭔��
         */
        formatKorAmt : function(amt) {
            if (amt === 0) return "0";
            if (amt < 0) return amt;
            if (typeof amt !== "number") amt = Number(amt.replace(/,/g, ""));
            var koreanUnits = ["", "留�", "��", "議�", "寃�"];
            var numbers = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var parts = [];
            var unitIndex = 0;
            while (amt > 0) {
                var chunk = amt % 10000;
                if (chunk > 0) {
                    var chunkParts = [];
                    var tempChunk = chunk;
                    for (var i = 0; i < 4; i++) {
                        var digit = tempChunk % 10;
                        if (digit > 0) {
                            if (i === 1) {
                                chunkParts.unshift("��");
                            } else if (i === 2) {
                                chunkParts.unshift("諛�");
                            } else if (i === 3) {
                                chunkParts.unshift("泥�");
                            }
                            chunkParts.unshift(numbers[digit]);
                        }
                        tempChunk = Math.floor(tempChunk / 10);
                    }
                    parts.unshift(chunkParts.join("") + koreanUnits[unitIndex]);
                }
                amt = Math.floor(amt / 10000);
                unitIndex++;
            }
            return parts.join("") + "��";
        },
        
        /**
         * (input-box �ㅼ뿉 �ㅻ뒗 �몃씪�몄뿉��)
         * �몃씪�� �ㅻ쪟硫붿떆吏� show/hide �먮뒗 append/remove
         * 
         * @param obj     : [ �좏깮] �좏슚�� 泥댄겕 ���� 媛앹껜 (empty:�꾩껜 �몃씪�� �ㅻ쪟硫붿꽭吏� remove|hide)
         * @param msg     : [ �좏깮] �먮윭硫붿꽭吏� (empty:�곸뿭 remove|hide)
         * @param isMake  : [ �좏깮] �앹꽦 �щ� (true:append/remove|false:show/hide)
         * @param noFocus : [ �좏깮] �ъ빱�� 誘몄떎�� �щ� (true|false)
         * 
         * @example
         * // �대찓�� 二쇱냼 �좏슚�� 泥댄겕
         * var errMsg = "";
           var oEmailAddr = $('#emailAddr');
           if (jbwrcFnc.isEmpty(oEmailAddr.val())) {
               errMsg = "�대찓�� 二쇱냼瑜� �낅젰�댁＜�몄슂";
           } else {
               errMsg = "";
           }
           jbwrcUtil.setInlineErr(oEmailAddr, errMsg);
         */
        ilnErrFocusId : null,
        setInlineErr : function(obj, msg, isMake, noFocus) {
            if (obj) {
                var errId = obj.prop("id") + "_ilnErr";
                var $err = $('#' + errId);
                var $box = obj.parents('div[class*=-box]');
                if (obj.hasClass("datepicker-item")) {
                    //$box = $box.closest('.row');  // 罹섎┛�� �대떦 �대옒�� �놁쓬�쇰줈 二쇱꽍泥섎━
                }
                if (isMake) {
                    var errHtml = '<p class="txt-info type-error" id="@errId">@errmsg</p>'.replace(/@errId/gi, errId);
                    if (!jbwrcFnc.isEmpty(msg)) {
                        if ($err.length > 0) $err.remove();
                        $box.addClass("type-error");
                        $box.after(errHtml.replace(/@errmsg/gi, msg));
                        if (JBWRC.isMobile() && obj.prop('type') == "select-one") _selMobileControl();
                    } else {
                        if (obj.prop("id") == context.ilnErrFocusId) context.ilnErrFocusId = null;
                        $box.removeClass("type-error");
                        $err.remove();
                    }
                } else {
                    if (!jbwrcFnc.isEmpty(msg)) {
                        $box.addClass("type-error");
                        
                        // 250715 25WP0138 - input-con�� type-border議댁옱 �� 寃쎌슦 input-con�� type-border�� type-error 異붽�
                        if(0 < $box.closest('.input-con.type-border').length) {
                            $box.closest('.input-con.type-border').addClass('type-error');
                        }
                        
                        $err.text(msg).show();
                        if (JBWRC.isMobile() && obj.prop('type') == "select-one") _selMobileControl();
                    } else {
                        if (obj.prop("id") == context.ilnErrFocusId) context.ilnErrFocusId = null;
                        $box.removeClass("type-error");
                        
                        // 250715 25WP0138 - input-con�� type-border議댁옱 �� 寃쎌슦 input-con�� type-border�� type-error �쒓굅
                        if(0 < $box.closest('.input-con.type-border').length) {
                            $box.closest('.input-con.type-border').removeClass('type-error');
                        }
                        
                        $err.text("").hide();
                    }
                }
                
                // �몃씪�� �먮윭 泥ル쾲吏� �ъ빱��
                if (!noFocus) {
                    for (var i = 0; i < $('[id*=_ilnErr]').length; i++) {
                        var $ilnErr = $('[id*=_ilnErr]').eq(i);
                        if ($ilnErr.css('display') != "none") {
                            var chkObjId = $ilnErr.attr("id").replace("_ilnErr", "");
                            if ($ilnErr.hasClass("type-birth")) {
                                // �앸뀈�붿씪 泥ル쾲吏� input
                                chkObjId = $ilnErr.prev('.input-con').find('input').eq(0).attr("id");
                            }
                            if ($('#' + chkObjId).length > 0 && context.ilnErrFocusId == null) {
                                //console.log("focusMove", i, chkObjId);
                                context.ilnErrFocusId = chkObjId;
                                focusMove(chkObjId);    // jb-ui.js
                            }
                            break;
                        }
                    }
                }
            } else {
                context.ilnErrFocusId = null;
                $('div[class*=-box].type-error').removeClass("type-error");
                $('div[class*=-con].type-error').removeClass("type-error");
                $('.row.type-error').removeClass("type-error");
                var $allIlnErr = $('[id*=_ilnErr]');
                if (isMake) {
                    $allIlnErr.remove();
                } else {
                    $allIlnErr.hide();
                }
            }
        },
        
        /**
         * (input-con �ㅼ뿉 �ㅻ뒗 �몃씪�몄뿉��)
         * �몃씪�� �ㅻ쪟硫붿떆吏� show/hide (�앸뀈�붿씪怨� 媛숈씠 �щ윭媛쒕줈 �섎돏 input�먯꽌 �ъ슜 �� �몃씪�몄뿉�� 媛앹껜瑜� 吏��뺥븯�� �ъ슜)
         * 
         * @param eObj : [ �좏깮] �먮윭 媛앹껜 (empty:�꾩껜 �몃씪�� �ㅻ쪟硫붿꽭吏� hide)
         * @param msg  : [ �좏깮] �먮윭硫붿꽭吏� (empty:�곸뿭 hide)
         * 
         * @example
         * // �앸뀈�붿씪 �좏슚�� 泥댄겕
         * var errMsg = "";
           var birth = $('#birth1').val() + $('#birth2').val() + $('#birth3').val();
           if (jbwrcFnc.isEmpty(birth)) {
               errMsg = "�앸뀈�붿씪�� �낅젰 �댁＜�몄슂.";
               isPass = false;
           } else {
               errMsg = "";
           }
           jbwrcUtil.setTrgtInlineErr($('#birth_ilnErr'), errMsg);
         */
        setTrgtInlineErr : function(eObj, msg) {
            if (eObj) {
                //var $con = eObj.closest('div[class*=-wrap]').find('div[class*=-con]');
                var $con = eObj.prev('div[class*=-con]');
                if (!jbwrcFnc.isEmpty(msg)) {
                    $con.addClass("type-error");
                    //$con.find('input').eq(0).focus();
                    eObj.text(msg).show();
                } else {
                    if (eObj.hasClass("type-birth")) {
                        // �앸뀈�붿씪 泥ル쾲吏� input
                        var eObjId = eObj.prev('.input-con').find('input').eq(0).attr("id");
                        if (eObjId == context.ilnErrFocusId) context.ilnErrFocusId = null;
                    }
                    $con.removeClass("type-error");
                    eObj.text("").hide();
                }
            } else {
                context.setInlineErr();
            }
        },
        
        /**
         * �щĸ �곗씠�� 諛붿씤�� (�꾨뱶紐낆쑝濡� �щĸ�낇븯�� �곗씠�� 諛붿씤�� data-id�� �꾨뱶紐� �낅젰)
         * 
         * @param data       : [*�꾩닔] �곗씠��
         * @param oTargetDiv : [ �좏깮] ���� �곸뿭
         * 
         * @example
         * JETMCAP0004.jsp 李몄“
         */
        bindFmtData : function(data, oTargetDiv) {
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                var k      = keys[i];
                var v      = data[k];
                var colArr = k.split("_");
                var col    = colArr[colArr.length - 1];
                if (col.startsWith("dt")) {
                    v = context.dateUtil.dateFormat(String(v), "date");
                } else if (col.startsWith("amt") || col.startsWith("bal") || col.startsWith("cost") || col.startsWith("prc") || col.startsWith("pmcs")) {
                    v = context.dateUtil.dateFormat(String(v), "won");
                } else if (col.startsWith("trm")) {
                    v = String(v) + " 媛쒖썡";
                } else if (k == 'optn_nm_s1000'){
                	k = 'optn_nm'
					v = v.replaceAll("," , "<br>")
                }
                if (!jbwrcFnc.isEmpty(v)) {
                    var oTarget = $('[data-id=' + k + ']');
                    if (!jbwrcFnc.isEmpty(oTargetDiv)) {
                        oTargetDiv.find(oTarget).html(v);
                    } else {
                        oTarget.html(v);
                    }
                }
            }
        },
        
        /**
         * �좎쭨 �щ㎎��
         * 
         * @param val : [*�꾩닔] �좎쭨
         * @param sep : [ �좏깮] 援щ텇�� (鍮덇컪 �� default : YYYY�� MM�� DD��)
         * 
         * @example
         * jbwrcUtil.setFmtDate("20250602");        // @result : 2025�� 06�� 02��
         * 
         * @example
         * jbwrcUtil.setFmtDate("20250602", ". ");  // @result : 2025. 06. 02
         */
        setFmtDate : function(val, sep) {
            var rtnVal = val;
            if (!jbwrcFnc.isEmpty(val) && moment(val).isValid()) {
                if (jbwrcFnc.isEmpty(sep)) {
                    rtnVal = moment(val).format("YYYY�� MM�� DD��");
                } else {
                    rtnVal = moment(val).format("YYYY" + sep + "MM" + sep + "DD");
                }
            }
            return rtnVal;
        },
        
        /**
         * 湲덉븸 ��
         * 
         * @param amt : [*�꾩닔] 湲덉븸
         * 
         * @example
         * jbwrcUtil.setWon("50000");   // @result : 50,000 ��
         */
        setWon : function(amt) {
            return context.dateUtil.dateFormat(String(amt), "won");
        },
        
        /**
         * �뚯닔�� 泥섎━
         * 
         * @param val  : [*�꾩닔] �レ옄
         * @param dgts : [ �좏깮] �뚯닔�� �먮┸�� (鍮덇컪 �� default : 2)
         * 
         * @example
         * jbwrcUtil.setDcpn("3.14159");    // @result : 3.14
         * 
         * @example
         * jbwrcUtil.setDcpn("3.14159", 4); // @result : 3.1416
         */
        setDcpn : function(val, dgts) {
            var rtnVal = Number(val).toFixed(2);
            if (!jbwrcFnc.isEmpty(dgts)) {
                rtnVal = Number(val).toFixed(Number(dgts));
            }
            return rtnVal;
        },
        
        /**
         * 湲덉븸 (��) 臾몄옄�� 由ы꽩
         * 
         * @param amt : [*�꾩닔] 湲덉븸
         * @param rt  : [*�꾩닔] ��
         * 
         * @example
         * jbwrcUtil.setAmtRt("50000", 1.2);    // @result : 50,000 �� (1.2 %)
         */
        setAmtRt : function(amt, rt) {
            //return context.setWon(amt) + " (" + String(Number(rt).toFixed(0)) + " %)";
            return context.setWon(amt) + " (" + String(rt) + " %)";
        },
        
        /**
         * �뱀젒洹쇱꽦 �곸슜
         * 
         * @param type      : [*�꾩닔] �좏삎 (tab:��, )
         * @param baseObj   : [*�꾩닔] 湲곗� 媛앹껜
         * @param targetObj : [*�꾩닔] ���� 媛앹껜
         * 
         * @example
         * // �� 踰꾪듉 �대┃ �� �� �곸뿭 �숈쟻 �앹꽦
         * $('[role=tablist] button').off('click').on('click', function(e) {
               // �뱀젒洹쇱꽦 �곸슜 (tab)
               jbwrcUtil.aplyAria("tab", $(this), $('[role=tabpanel]'));    // �좏삎, �� 踰꾪듉 媛앹껜, �� �곸뿭 媛앹껜
           });
         */
        aplyAria : function(type, baseObj, targetObj) {
            if (type == "tab") {
                
                // tabButton�� aria-controls=""�� �대떦 tabContent�� id=""�� 留ㅼ묶
                targetObj.attr("id", baseObj.attr("aria-controls"));
                
                // tabButton�� id=""�� �대떦 tabContent�� aria-labelledby=""�� 留ㅼ묶
                targetObj.attr("aria-labelledby", baseObj.attr("id"));
            }
        },
        
        /**
         * �ㅽ뀦諛� html �앹꽦 諛� set
         * 
         * @param tStep : [*�꾩닔] �꾩껜 �ㅽ뀦
         * @param cStep : [*�꾩닔] �꾩옱 �ㅽ뀦
         * @param btnNm : [ �좏깮] 踰꾪듉紐�
         * 
         * @example
         * jbwrcUtil.setStepBar(3, 1);
         */
        setStepBar : function(tStep, cStep, btnNm) {
            if (!tStep || !cStep) return false;
            if ($('#divStepWrapLayer').length > 0) $('#divStepWrapLayer').remove();
            var tmpHtml = "";
            tmpHtml+= '<div class="step-wrap" id="divStepWrapLayer">';
            tmpHtml+= '    <div class="step-bar" aria-hidden="true" style="--total-steps:' + tStep + '">';
            tmpHtml+= '        <span class="step-bar-active" style="--current-step:' + cStep + '"></span>';
            tmpHtml+= '    </div>';
            tmpHtml+= '    <p class="tit-wrap">';
            tmpHtml+= '        <span title="�꾩옱�④퀎">' + cStep + '</span>/<span title="�꾩껜�④퀎">' + tStep + '</span>';
            if (!jbwrcFnc.isEmpty(btnNm)) {
                tmpHtml+= '        <button type="button" class="btn-txt btn-txt-blue step-tit" data-lang="">' + btnNm + '</button>';
            }
            tmpHtml+= '    </p>';
            tmpHtml+= '</div>';
            
            if ($('.contents-wrap .inner').length > 0) $('.contents-wrap .inner').eq(0).before(tmpHtml);
        },
        
        /**
         * FAQ, �몄뼱�좏깮 �꾩씠肄� �앹꽦
         * 
         * @param faqShowYn  : [ �좏깮] FAQ �꾩씠肄� �쒖떆 �щ�
         * @param langShowYn : [ �좏깮] �몄뼱�좏깮 �꾩씠肄� �쒖떆 �щ�
         * @param targetObj  : [ �좏깮] ���� 媛앹껜 (�꾩씠肄� �앹꽦�� 媛앹껜)
         * 
         * @example FAQ, �몄뼱�좏깮 �꾩씠肄� 紐⑤몢 �앹꽦
         * jbwrcUtil.setIconLink("Y", "Y");
         * 
         * @example FAQ, �몄뼱�좏깮 �꾩씠肄� 紐⑤몢 �앹꽦 (contents-wrap �щ윭媛� �ъ슜�섎뒗 �섏씠吏��먯꽌 �몄텧 ��)
         * jbwrcUtil.setIconLink("", "Y", $('.contents-wrap.jcmmocr0100'));
         */
        setIconLink : function(faqShowYn, langShowYn, targetObj) {
            
            var makeHtml = function(f, l) {
                var html = "";
                html += '<div class="iconlink only_mo">';
                if (f) html += '    <button type="button" class="ico-faq" jbevent-click="SelectFAQBt_C">臾몄쓽�섍린</button>';
                if (l) html += '    <button type="button" class="ico-lang" onClick="jbi18ChoicePop.init();fnOpenLayerPop(\'popupLangChoiceId1\');">�몄뼱�좏깮</button>';
                html += '</div>';
                return html;
            };
            
            var drawHtml = function(_html) {
                var $targetObj = jbwrcFnc.isEmpty(targetObj) ? $('.contents-wrap') : targetObj;
                $targetObj.find('.iconlink').remove();
                
                if ($targetObj.find('.step-wrap').length > 0) {
                    $targetObj.find('.step-wrap').after(_html);
                } else {
                    if ($targetObj.find('.inner').length > 0) $targetObj.find('.inner').eq(0).before(_html);
                }
                
                JBWRC.hideLoading();    // [1-�꾩씠肄� �앹꽦 濡쒕뵫] hide (success|error)
                
                var $faqIcon = $targetObj.find('.iconlink').find('button.ico-faq');
                if ($faqIcon.length > 0) {
                    $faqIcon.off('click').on('click', function() {
                        console.log("FAQ �꾩씠肄섏쓣 �대┃�덉뼱��. �몄뀡�뺣낫瑜� �앹꽦�좉쾶��!");
                        
                        JBWRC.showLoading();    // [2-FAQ �몄뀡�뺣낫 set] show
                        
                        context.customAjax({
                            url : "/cmm/bra/mdBvfaqPop.do"
                          , data : {}
                          , beforeShow : false
                          , compleShow : false
                          , callBack : function(result) {
                              if (!jbwrcFnc.isEmpty(result) && !jbwrcFnc.isEmpty(result.faqCustcpno)) {
                                  console.log("�몄뀡�뺣낫媛� �앹꽦�먯뼱��. �앹뾽�� �몄텧�좉쾶��!");
                                  context.openFngrFaqPop(result.faqCustcpno);
                              }
                          }
                          , errorCallback : function(result) {
                              
                              JBWRC.hideLoading();  // [2-FAQ �몄뀡�뺣낫 set] hide (error)
                              
                              if (!jbwrcFnc.isEmpty(result) && !jbwrcFnc.isEmpty(result.responseJSON)) {
                                  var eJson = result.responseJSON;
                                  JBWRC.errorAlert(eJson.userViewErrorMessage || "", eJson.errorMessage || "", {okBtnText : "�뺤씤", errCode : eJson.errorCode,
                                      okCallback : function() {
                                          console.log("�몄쬆�몄뀡�� 議댁옱�댁빞 �ъ슜�� �� �덈뒗 湲곕뒫�댁뿉��. �몄쬆 �� �꾩씠肄� �앹꽦�� �붿껌�섏뀛�� �댁슂!");
                                      }
                                  });
                              }
                          }
                        });
                    });
                }
            };

            JBWRC.showLoading();    // [1-�꾩씠肄� �앹꽦 濡쒕뵫] show
            
            var iconHtml = "";
            if (faqShowYn === "Y") {
                var ssfngrYn = context.storageUtil.get("fngrYn");
                if (!jbwrcFnc.isEmpty(ssfngrYn)) {
                    ssfngrYn === "Y" ? console.log("�대� FAQ �앹꽦�붿껌 �섏뀲�덉뼱��. �멸뎅�몄씠�� FAQ �꾩씠肄섏쓣 �앹꽦�좉쾶��!") : console.log("�대� FAQ �앹꽦�붿껌 �섏뀲�덉뼱��. �멸뎅�몄씠 �꾨땲�� FAQ �꾩씠肄섏쓣 �앹꽦�섏� �딆쓣寃뚯슂!");
                    iconHtml = makeHtml(ssfngrYn === "Y", langShowYn === "Y");
                    drawHtml(iconHtml);
                } else {
                    console.log("FAQ �앹꽦�붿껌 �섏뀲�댁슂. 洹몃옒�� �멸뎅�몄씤吏� 泥댄겕�좉쾶��!");
                    context.customAjax({
                        url : "/cmm/bra/chkFngrYn.do"
                            , data : {}
                    , beforeShow : false
                    , compleShow : false
                    , callBack : function(result) {
                        if (!jbwrcFnc.isEmpty(result) && !jbwrcFnc.isEmpty(result.fngrYn)) {
                            context.storageUtil.set("fngrYn", result.fngrYn);
                            result.fngrYn === "Y" ? console.log("�멸뎅�몄쓣 �뺤씤�덉뼱��. FAQ �꾩씠肄섏쓣 �앹꽦�좉쾶��!") : console.log("�멸뎅�몄씠 �꾨땲�먯슂. FAQ �꾩씠肄섏쓣 �앹꽦�섏� �딆쓣寃뚯슂!");
                            iconHtml = makeHtml(result.fngrYn === "Y", langShowYn === "Y");
                            drawHtml(iconHtml);
                        }
                    }
                    , errorCallback : function(result) {
                        console.log("�멸뎅�� �щ� 泥댄겕 �� �ㅻ쪟媛� 諛쒖깮�덉뼱��. FAQ�� 鍮쇨퀬 �꾩씠肄섏쓣 �앹꽦�좉쾶��!");
                        iconHtml = makeHtml(false, langShowYn === "Y");
                        drawHtml(iconHtml);
                    }
                    });
                }
            } else {
                iconHtml = makeHtml(false, langShowYn === "Y");
                drawHtml(iconHtml);
            }
        },
        
        /**
         * QR肄붾뱶 �대�吏� �앹꽦
         * 
         * @param opts   : [*�꾩닔] �앹꽦 �듭뀡 媛앹껜
         *        opts.obj    : ���� 媛앹껜
         *        opts.url    : �앹꽦 url
         *        opts.width  : �대�吏� �볦씠 (default : 100)
         *        opts.height : �대�吏� �믪씠 (default : 100)
         *        opts.title  : title臾멸뎄
         * 
         * @example
         * jbwrcUtil.setQRCode({
                obj    : $('#divQr')    // qr �대�吏� �쒓렇�� �곸쐞 �곸뿭
              , url    : "https://d-www.wooricap.com/"
              , width  : 80
              , height : 80
              , title  : "JB�곕━罹먰뵾��"
           });
         */
        setQRCode : function(opts) {
            if (opts) {
                if (opts.hasOwnProperty("obj") && opts.hasOwnProperty("url")) {
                    if (!opts.hasOwnProperty("width"))  opts.width  = 100;
                    if (!opts.hasOwnProperty("height")) opts.height = 100;
                    if (!opts.hasOwnProperty("title"))  opts.title  = "";
                    if (opts.obj.length > 0) {
                        opts.obj.empty();
                        new QRCode(opts.obj.attr("id"), {width : opts.width, height : opts.height}).makeCode(opts.url);
                        opts.obj.attr("title", opts.title);
                        opts.obj.find('img').attr("alt", opts.title);
                    }
                }
            }
        },
        
        /**
         * �덉씠�댄뙘�� �몄텧
         * 
         * @param popId     : [*�꾩닔] �덉씠�댄뙘�� id
         * @param oCallback : [ �좏깮] �뺤씤 �대┃ 肄쒕갚 �⑥닔
         * @param cCallback : [ �좏깮] �リ린 �대┃ 肄쒕갚 �⑥닔
         * @param callback  : [ �좏깮] �앹뾽 �ㅽ뵂 �� 肄쒕갚 �⑥닔
         */
        openLayerPop : function(popId, oCallback, cCallback, callback) {
            if (jbwrcFnc.isEmpty(popId)) return false;
            
            // �앹뾽 open
            fnOpenLayerPop(popId);
            
            // �뺤씤 踰꾪듉 �대┃
            $('#' + popId).find('.layerpop-footer button.btn-primary').on("click", function(e) {
                if (typeof oCallback == "function") {
                    oCallback();
                    //fnCloseLayerPop(popId);
                }
            });
            
            // �リ린 踰꾪듉 �대┃
            $('#' + popId).find('.layerpop-header button.btn-close').on("click", function(e) {
                if (typeof cCallback == "function") {
                    cCallback();
                    //fnCloseLayerPop(popId);
                }
            });
            
            // �ㅽ뵂 �� 肄쒕갚
            if (typeof callback == "function") {
                callback();
            }
        },
        
        /**
         * 紐⑤컮�쇱뿉�� 怨꾩냽�섍린 �덉씠�댄뙘�� �몄텧
         * 
         * @param qrData          : [*�꾩닔] qr肄붾뱶 �앹꽦�� �곗씠��
         *        qrData.url    : qr �대룞 url (�꾨찓�몄쓣 �ы븿�� url �꾩껜)
         *        qrData.stepNm : qr ���댄�
         * @param closeCallbackFn : [ �좏깮] �リ린 �대┃ 肄쒕갚 �⑥닔
         * @param okCallbackFn    : [ �좏깮] �뺤씤 �대┃ 肄쒕갚 �⑥닔
         * 
         * @example
         * jbwrcUtil.openCntiAtMblPop({
                 url    : location.origin + "/cst/cap/JCSTCAP0001.do"
               , stepNm : "怨좉컼�쇳꽣"
           }, function() {
               console.log("�リ린 踰꾪듉 �대┃ 肄쒕갚");            
           }, function() {
               console.log("�뺤씤 踰꾪듉 �대┃ 肄쒕갚");
           });
         */
        openCntiAtMblPop : function(qrData, closeCallbackFn, okCallbackFn) {
            if (jbwrcFnc.isEmpty(qrData)) return false;
            if (jbwrcFnc.isEmpty(qrData.url)) return false;
            if (!qrData.hasOwnProperty("stepNm"))  opts.stepNm  = "吏꾪뻾以묒씠�덈뜕";
            
            // �앹뾽 媛앹껜
            var $popObj = $('#lpCntiAtMbl');
            
            // �앹뾽�� �녿뒗 寃쎌슦�� �앹꽦
            if ($popObj.length == 0) {
                if(qrData.stepNm.indexOf('媛쒖씤梨꾨Т議곗젙') > -1){
                    var _popHtml = "";
                    _popHtml += '<div id="lpCntiAtMbl" class="layerpop-wrap type-full" role="dialog" aria-modal="true" aria-labelledby="lpCntiAtMbl_tit">';
                    _popHtml += '    <div class="layerpop" tabindex="-1">';
                    _popHtml += '        <div class="layerpop-header">';
                    _popHtml += '            <p id="lpCntiAtMbl_tit" data-lang="" class="layerpop-tit blind">紐⑤컮�쇱뿉�� 怨꾩냽�섍린</p>';
                    _popHtml += '            <button type="button" class="btn-close"><span data-lang="" class="blind">�앹뾽 �リ린</span></button>';
                    _popHtml += '        </div>';
                    _popHtml += '        <div class="layerpop-contents">';
                    _popHtml += '            <div class="mobile-qr-wrap">';
                    _popHtml += '                <p class="ta-c txt" data-lang="">梨꾨Т議곗젙�붿껌沅� �좎껌</p>';
                    _popHtml += '                <p class="ta-c" data-lang="">梨꾨Т議곗젙 �붿껌 ���곸뿬遺�瑜� �뺤씤�섍린 �꾪빐 <br><span class="fc-blue">蹂몄씤�몄쬆 �덉감</span>媛� �꾩슂�⑸땲��.</p>';
                    _popHtml += '                <div class="qr-img" id="lpCntiAtMbl_divQr">';
                    _popHtml += '                    <%-- <img src="/assets/img/qr-img.png" alt=""> --%>';
                    _popHtml += '                </div>';
                    _popHtml += '                <p class="ta-c" data-lang="">�대��� 移대찓�쇰줈 QR肄붾뱶瑜� �ㅼ틪 ��, <br>蹂댁씠�� 留곹겕瑜� �대┃�섏뿬 紐⑤컮�쇰줈 吏꾪뻾�댁＜�몄슂.</p>';
                    _popHtml += '            </div>';
                    _popHtml += '        </div>';
                    _popHtml += '        <div class="layerpop-footer">';
                    _popHtml += '            <div class="btn-wrap">';
                    _popHtml += '                <button type="button" class="btn-lg btn-primary" data-lang="">�뺤씤</button>';
                    _popHtml += '            </div>';
                    _popHtml += '        </div>';
                    _popHtml += '    </div>';
                    _popHtml += '</div>';
                    
                    if ($('.contents-wrap').length > 0) {
                        // �낅Т �붾㈃ 理쒖긽�� �대옒��
                        $('.contents-wrap').append(_popHtml);
                    } else {
                        // 硫붿씤 �붾㈃ 理쒖긽�� �대옒��
                        $('.conwrap').append(_popHtml);
                    }
                    
                    $popObj = $('#lpCntiAtMbl');
                }else{
                    var _popHtml = "";
                    _popHtml += '<div id="lpCntiAtMbl" class="layerpop-wrap type-full" role="dialog" aria-modal="true" aria-labelledby="lpCntiAtMbl_tit">';
                    _popHtml += '    <div class="layerpop" tabindex="-1">';
                    _popHtml += '        <div class="layerpop-header">';
                    _popHtml += '            <p id="lpCntiAtMbl_tit" data-lang="" class="layerpop-tit blind">紐⑤컮�쇱뿉�� 怨꾩냽�섍린</p>';
                    _popHtml += '            <button type="button" class="btn-close"><span data-lang="" class="blind">�앹뾽 �リ린</span></button>';
                    _popHtml += '        </div>';
                    _popHtml += '        <div class="layerpop-contents">';
                    _popHtml += '            <div class="mobile-qr-wrap">';
                    _popHtml += '                <p class="ta-c" data-lang="">紐⑤컮�쇱뿉�� 怨꾩냽 吏꾪뻾�� 蹂댁꽭��!</p>';
                    _popHtml += '                <p class="ta-c txt" data-lang="">�좎슜�먯닔 �곹뼢�놁씠, <br><span class="fc-blue">�쎄퀬 媛꾪렪�섍쾶 <br>紐⑤컮�쇱뿉�� 吏꾪뻾</span>�� �� �덉뼱��.</p>';
                    _popHtml += '                <div class="qr-img" id="lpCntiAtMbl_divQr">';
                    _popHtml += '                    <%-- <img src="/assets/img/qr-img.png" alt=""> --%>';
                    _popHtml += '                </div>';
                    _popHtml += '                <p class="ta-c" data-lang="">�대��곗쑝濡� QR肄붾뱶瑜� �ㅼ틪 ��, <br>蹂댁씠�� 留곹겕瑜� �뚮윭二쇱꽭��.</p>';
                    _popHtml += '            </div>';
                    _popHtml += '        </div>';
                    _popHtml += '        <div class="layerpop-footer">';
                    _popHtml += '            <div class="btn-wrap">';
                    _popHtml += '                <button type="button" class="btn-lg btn-primary" data-lang="">�뺤씤</button>';
                    _popHtml += '            </div>';
                    _popHtml += '        </div>';
                    _popHtml += '    </div>';
                    _popHtml += '</div>';
                    
                    if ($('.contents-wrap').length > 0) {
                        // �낅Т �붾㈃ 理쒖긽�� �대옒��
                        $('.contents-wrap').append(_popHtml);
                    } else {
                        // 硫붿씤 �붾㈃ 理쒖긽�� �대옒��
                        $('.conwrap').append(_popHtml);
                    }
                    
                    $popObj = $('#lpCntiAtMbl');
                }
            }
            
            // qr 媛앹껜
            var $popQrObj = $('#lpCntiAtMbl').find('.qr-img');
            
            // qr �앹꽦
            if ($popObj.length > 0) {
                //console.log(qrData);
                context.setQRCode({
                     obj    : $popQrObj
                   , url    : qrData.url
                   , width  : 80
                   , height : 80
                   , title  : qrData.stepNm + " �붾㈃�쇰줈 �대룞"
                });
                
                // qr �앹꽦 �깃났 �� �앹뾽 �ㅽ뵂
                if ($popQrObj.find('img').length > 0) {
                    context.openLayerPop("lpCntiAtMbl");
                    
                    // �リ린 踰꾪듉 �대┃ �대깽�� 諛붿씤��
                    $popObj.find('.btn-close').off('click').on('click', function(e) {
                        if (typeof closeCallbackFn == "function") closeCallbackFn();
                        fnCloseLayerPop("lpCntiAtMbl");
                    });
                    
                    // �뺤씤 踰꾪듉 �대┃ �대깽�� 諛붿씤��
                    $popObj.find('.layerpop-footer .btn-primary').off('click').on('click', function(e) {
                        if (typeof okCallbackFn == "function") okCallbackFn();
                        fnCloseLayerPop("lpCntiAtMbl");
                    });
                }
            }
        },
        
        /**
         * �멸뎅�� FAQ 臾몄옄諛쒖넚 �덉씠�댄뙘�� �몄텧
         * 
         * @param hpno             : [*�꾩닔] FAQ url�� �꾩넚�� �몃뱶�곕쾲��
         * @param cancelCallbackFn : [ �좏깮] Cancel �대┃ 肄쒕갚 �⑥닔
         * @param sendCallbackFn   : [ �좏깮] Send �대┃ 肄쒕갚 �⑥닔
         * 
         * @example
         * jbwrcUtil.openFngrFaqPop("01012345678", function() {
               console.log("Cancel 踰꾪듉 �대┃ 肄쒕갚");            
           }, function() {
               console.log("Send 踰꾪듉 �대┃ 肄쒕갚");
           });
         */
        openFngrFaqPop : function(hpno, cancelCallbackFn, sendCallbackFn) {
            if (jbwrcFnc.isEmpty(hpno)) return false;
            if (hpno.indexOf("-") == -1) {
                hpno = jbwrcFnc.hipenPh(hpno);
            }
            
            // �앹뾽 媛앹껜
            var $popObj = $('#lpFngrFaqPop');
            var isNew = false;
            
            // �앹뾽�� �녿뒗 寃쎌슦�� �앹꽦
            if ($popObj.length == 0) {
                
                var _popHtml = "";
                _popHtml += '<div id="lpFngrFaqPop" class="layerpop-wrap type-bottom" role="dialog" aria-modal="true" aria-labelledby="lpFngrFaqPop_tit">';
                _popHtml += '    <div class="layerpop" tabindex="-1">';
                _popHtml += '        <div class="layerpop-header">';
                _popHtml += '            <p id="lpFngrFaqPop_tit" data-lang="" class="layerpop-tit">Send to your phone FAQ</p>';
                _popHtml += '            <button class="btn-close fnClosePop"><span class="blind" data-lang="">pop close</span></button>';
                _popHtml += '        </div>';
                _popHtml += '        <div class="layerpop-contents">';
                _popHtml += '            <div class="fc-blue ta-c">' + hpno + '</div>';
                _popHtml += '            <p class="">It can be translated into google chrome browser.</p>';
                _popHtml += '        </div>';
                _popHtml += '        <div class="layerpop-footer">';
                _popHtml += '            <div class="btn-wrap">';
                _popHtml += '                <button type="button" data-lang="" class="btn-lg btn-secondary">Cancel</button>';
                _popHtml += '                <button type="button" data-lang="" class="btn-lg btn-primary">Send</button>';
                _popHtml += '            </div>';
                _popHtml += '        </div>';
                _popHtml += '    </div>';
                _popHtml += '</div>';
                
                if ($('.contents-wrap').length > 0) {
                    // �낅Т �붾㈃ 理쒖긽�� �대옒��
                    $('.contents-wrap').append(_popHtml);
                }
                
                $popObj = $('#lpFngrFaqPop');
            }
            
            context.openLayerPop("lpFngrFaqPop");
            
            $popObj.find('#lpFngrFaqPop_tit').focus();
            
            JBWRC.hideLoading();    // [2-FAQ �몄뀡�뺣낫 set] hide (success)
            
            // Cancel 踰꾪듉 �대┃ �대깽�� 諛붿씤��
            $popObj.find('.btn-wrap button.btn-secondary').off('click').on('click', function(e) {
                if (typeof cancelCallbackFn == "function") cancelCallbackFn();
                fnCloseLayerPop("lpFngrFaqPop");
            });
            
            // Send 踰꾪듉 �대┃ �대깽�� 諛붿씤��
            $popObj.find('.layerpop-footer .btn-primary').off('click').on('click', function(e) {
                console.log("Send 踰꾪듉�� �대┃�섏뀲�댁슂. �몄쬆�� 踰덊샇濡� 臾몄옄瑜� �꾩넚�좉쾶��!");
                context.customAjax({
                    url : "/cmm/bra/mdBvfaqSend.do"
                  , data : {}
                  , beforeShow : true
                  , compleShow : true
                  , callBack : function(result) {
                      if (typeof sendCallbackFn == "function") sendCallbackFn();
                      fnCloseLayerPop("lpFngrFaqPop");
                  }
                });
            });
        },
        
        /**
         * �앸뀈�붿씪 �먮룞�ъ빱�� �대깽�� 諛붿씤��
         * 
         * @param bObjs    : [*�꾩닔] �앸뀈�붿씪 媛앹껜��
         * @param isAllSel : [ �좏깮] input �꾩껜�좏깮 �щ�
         */
        afBirthEventBind : function(bObjs, isAllSel) {
            if (!bObjs) return false;
            bObjs = bObjs.not('[class*="type-error"]');
            bObjs.on('keyup', function(e) {
                if (e.key != "Backspace" && e.key != "Delete") {
                    var id = $(this).attr('id');
                    var inNum  = id.charAt(id.length - 1);
                    if (bObjs.length != Number(inNum)) {
                        if ($(this).val().length == $(this).attr('maxlength')) {
                            bObjs[Number(inNum)].focus();
                        }
                    }
                } else {
                    var bsCnt = $(this).data('bsCnt') || 0;
                    if (jbwrcFnc.isEmpty($(this).val())) {
                        $(this).data('bsCnt', ++bsCnt);
                        if ($(this).data('bsCnt') == 2) {
                            $(this).data('bsCnt', 0);
                            var id = $(this).attr('id');
                            var inNum  = id.charAt(id.length - 1);
                            if (Number(inNum) > 1) {
                                bObjs[Number(inNum - 2)].focus();
                            }
                        }
                    } else {
                        $(this).data('bsCnt', 0);
                    }
                }
            });
            bObjs.on('blur', function() {
                if ($(this).attr('maxlength') == 2 && $(this).val().length == 1) {
                    if ($(this).val() != "0" && $(this).val().length > 0 && $(this).val() < 10) {
                        $(this).val("0" + $(this).val());
                    }
                }
            });
            if (isAllSel) {
                bObjs.on('focus', function() {
                    $(this).select();
                });
            }
        },
        
        /**
         * 寃��� 臾몄옄�댁쓣 李얠븘 �됱긽泥섎━ �섏뿬 html 諛섑솚
         * 
         * @param strHtml    : [*�꾩닔] html 臾몄옄��
         * @param schWordVal : [*�꾩닔] �됱긽 蹂��섑븷 寃��� 臾몄옄��
         * @param strColor   : [ �좏깮] �됱긽
         */
        setColorSchWord : function(strHtml, schWordVal, strColor) {
            if (jbwrcFnc.isEmpty(strColor)) strColor = "blue";
            //var schLen = schWordVal.length;
            //var schLoc = strHtml.indexOf(schWordVal);
            //if (schLoc < 0) return strHtml;
            //var fTitl = strHtml.substring(0, schLoc);
            //var mTitl = strHtml.substring(schLoc, (schLoc + schLen));
            //var lTitl = strHtml.substring((schLoc + schLen), strHtml.length);
            //return fTitl + '<em class="fc-' + strColor + '">' + mTitl + '</em>'+ lTitl;
            var schRegex = new RegExp(schWordVal,"gi");
            var schReplaceWord  =  strHtml.replace(schRegex,'<em class="fc-' + strColor + '">$&</em>');
            return schReplaceWord;
        },
        
        /**
         * �� �곌껐 留곹겕
         * 
         * @param deviceType : [ �좏깮] 湲곌린�좏삎
         */
        getAppLink : function(deviceType) {
            var url = "";
            if (deviceType == "IA" || deviceType == "IW") {
                //url = "https://itunes.apple.com/us/app/id1278005474?l=ko&ls=1&mt=8";
                url = "https://itunes.apple.com/app/id1556177762";
            } else if(deviceType == "AW") {
                //url = "https://play.google.com/store/apps/details?id=com.wooricap.jbmobilesupport&hl=ko";
                url = "https://play.google.com/store/apps/details?id=com.wooricap.jbmobilesupport&hl=ko";
            } else if(deviceType == "AA") {
                //url = "market://details?id=com.wooricap.jbmobilesupport";
                url = "market://details?id=com.wooricap.jbmobilesupport";
            } else {
                //url = "https://direct.wooricap.com";
                url = "https://www.wooricap.com";
            }
            //
            return url;
        },
        
        /**
         * 釉뚮씪蹂댁퐫由ъ븘 App �λ쭅�� URL
         */
        goBravoKoreaApp : function(linkType) {

            var link = '';
            var clickLog = '';
            var isPushRcv = false;  // push �섏떊 �щ�
                
            switch (linkType){
               case "A" : // 硫붿씤 諛곕꼫
                   clickLog = 'Ad_BRV_Banner_C_Home';
                   link = 'https://abr.ge/y9pbgi';
                   break;
               case "B" : // 硫붿씤 �앹뾽
                   clickLog = 'Ad_BRV_Popup_C_Home';
                   link = 'https://abr.ge/4jkgxpb';
                   break;
               //case "C" : // TM �좎슜議고쉶�숈쓽 �꾨즺 (誘몄궗��)
               //    clickLog = '';
               //    link = 'https://abr.ge/7qu76y';
               //    break;
               case "D" : // 以묎퀬 �좎슜議고쉶�숈쓽
                   clickLog = 'Ad_BRV_Banner_C_UsedCar_Cnsl';
                   link = 'https://abr.ge/27ndlj';
                   break;
               case "E" : // 以묎퀬 �꾩옄�쎌젙 �꾨즺
                   clickLog = 'Ad_BRV_Banner_C_UsedCar_Loan';
                   link = 'https://abr.ge/jvl29wl';
                   break;
               case "F_1" : // App �몄떆
                   clickLog = 'Ad_BRV_Push_C';
                   link = 'https://abr.ge/z1u54x';
                   isPushRcv = true;
                   break;
               case "F_2" : // App �몄떆(�뚮┝��)
                   clickLog = 'Ad_BRV_Push_Inbox_C';
                   link = 'https://abr.ge/z1u54x';
                   break;    
               default :    // default : home(A) 湲곗�
                   clickLog = 'Ad_BRV_Banner_C_Home';
                   link = 'https://abr.ge/y9pbgi';
                   break;
            }
            
            context.pageUtil.pageClickLog(clickLog, 'click');
            
            if ($.browser.device == "IA" || $.browser.device == "AA") {
                if (isPushRcv) {    // push �섏떊�쇰줈 �ㅼ뼱�� 寃쎌슦 : App -> �몃� 釉뚮씪�곗�濡� �ㅽ뻾�섏뿀�쇰�濡� href 泥섎━ 
                    location.href = link;
                } else {
                    fn_openBrowser(link);
                }
                
            } else {
                if (isPushRcv) {    // push �섏떊�쇰줈 �ㅼ뼱�� 寃쎌슦 : App -> �몃� 釉뚮씪�곗�濡� �ㅽ뻾�섏뿀�쇰�濡� href 泥섎━ 
                    location.href = link;
                } else {
                    window.open(link, '_blank');
                }                
            }
            
        },
        
        /**
         * 釉뚮씪蹂댁퐫由ъ븘 App 援щ텇
         */
        isBravoKoreaApp : function() {
            if (navigator.userAgent.indexOf('JBNativeApp') > -1) {  // BK�� �밸럭 useragent�� �ы븿�섏뼱 �덉쓬
                return true;
            } else {
                return false;
            }
        },
        
        /**
         * url�� �ы븿�� �뚮씪硫뷀꽣 諛섑솚
         */
        getUrlParams : function(_url) {
            var urlObj = new URL(_url || window.location.href);
            var rtnObj = new Object();
            for (var [key, value] of urlObj.searchParams.entries()) {
                rtnObj[key] = value;
            }
            return rtnObj;
        },
        
        /**
         * pc �쒕ぉ �곸뿭�� �띿뒪�몃� 蹂�寃�
         * @param pcTitle �곷떒 �쒕ぉ
         * @param pcText  �섎떒 �곸꽭�ㅻ챸
         * @returns 
         */
        setPcTitle : function(pcTitle) {
            $("#idPcTitle").text(pcTitle);
            $("#idHeadTitle").text(pcTitle);
        },
        
        /**
         * 紐⑤컮�� �쒕ぉ �곸뿭�� �띿뒪�몃� 蹂�寃�
         * @param pcTitle �곷떒 �쒕ぉ
         * @param pcText  �섎떒 �곸꽭�ㅻ챸
         * @returns 
         */
        setMobileTitle : function(mobileTitle) {
            $("#moHeaderTitle").text(mobileTitle);
            //$("#idMobileTitle").text(mobileTitle);
            $("#idHeadTitle").text(mobileTitle);
        },
        
        /**
         * 釉뚮옒�쒗겕�쇱쓣 媛쒕컻
         * @param menuTreeSet (url 怨� 硫붾돱紐� 由ъ뒪�몃� 媛�吏�怨� �덈뒗 諛곗뿴 媛앹껜)
         *        [{"url":"/cst/cap/JCSTCAP0001.do","txt":"怨좉컼�쇳꽣"},{"url":"/cst/evt/JCSTEVT0001.do","txt":"�대깽��"},{"url":"/cst/evt/JCSTEVT0002.do","txt":"�대깽�� �곸꽭"}]
         * @returns 
         */
        setPcBreadcrumb : function(menuTreeSet) {
            if(menuTreeSet == null || menuTreeSet == undefined || menuTreeSet.length < 1){
                return false;
            }
            $("#idBreadcrumbList").html('');
            var crumbHtml = '<a href="/" class="home">��</a>';
            for(var i=0; i<menuTreeSet.length; i++){
                var menuObj = menuTreeSet[i];
                if(i == (menuTreeSet.length - 1)){
                    crumbHtml += '<span class="now">'+menuObj.txt+'</span>';                    
                }else{
                    crumbHtml += ' <a href="'+menuObj.url+'" data-lang="">'+menuObj.txt+'</a>';                    
                }                
            }
            $("#idBreadcrumbList").append(crumbHtml);
        } ,
        
        // input box �쒕젅�� focus in
        setTimeInputFocus : function (_compObj, _compId, _time) {
            if (jbwrcFnc.isEmpty(_compObj) && jbwrcFnc.isEmpty(_compId)) {
                return;
            }
            
            var $focusTarget = !jbwrcFnc.isEmpty(_compObj) ? _compObj : $("#"+_compId); 
            if (jbwrcFnc.isEmpty(_time)) {
                _time = 300;
            }
            setTimeout(function(){
                $focusTarget.focus().click();
            }, _time);
        },
        
        // input box �쒕젅�� focus in
        inputFocus : function (_compParam, _time) {
            if (jbwrcFnc.isEmpty(_compParam)) {
                return false;
            }
            if (typeof _compParam === 'string') {
                this.setTimeInputFocus('', _compParam, _time);
            } else {
                this.setTimeInputFocus(_compParam, '', _time);
            }
        },
        
        // 而댄룷�뚰듃�� show, hidden class in/out
        setShowClsComp : function (_compObj, _compId, _bShow) {
            if (jbwrcFnc.isEmpty(_compObj) && jbwrcFnc.isEmpty(_compId)) {
                return;
            }
            var $showTarget = !jbwrcFnc.isEmpty(_compObj) ? _compObj : $("#"+_compId);
            if (_bShow == undefined) {
                _bShow = true;
            }
            if (_bShow) {
                $showTarget.addClass('show');
                $showTarget.removeClass('hidden');
            } else {
                $showTarget.addClass('hidden');
                $showTarget.removeClass('show');
            }
        },
        
        // 而댄룷�뚰듃�� show, hidden class in/out
        showClsComp : function (_compParam, _bShow) {
            if (jbwrcFnc.isEmpty(_compParam)) {
                return false;
            }
            if (typeof _compParam === 'string') {
                this.setShowClsComp('', _compParam, _bShow);
            } else {
                this.setShowClsComp(_compParam, '', _bShow);
            }
        }
        
        /**--------------------------------------------------------------------------------------------*/
        /**[��異쒓났��] �댁뼱�섍린_[S] ---------------------------------------------------------------------------*/
        /**--------------------------------------------------------------------------------------------*/
        
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 痍⑥냼�섍린 - �몄뀡�ㅽ넗由ъ� remove
         * @param data          :
         *  
         * @returns 
         */
        , delLoanTempPrdt : function(param, _callback, _errorCallback){
            context.storageUtil.remove("loanTmpStrgData");//, 釉뚮씪�곗��ㅽ넗由ъ� ��젣
            context.ajaxUtil.call({
                url :  "/mdr/bzc/prg/delLoanTempPrdt.do"//, �ㅼ씠�됲듃>��異쒓났��>�ㅼ씠�됲듃 �댁뼱�섍린 ��젣
                , beforeShow : true
                , compleShow : true
                , data : param
                , callBack :  function(rData){                    
                    if(! jbwrcFnc.isNull(rData) && ! (rData.result.rspnCd == "100000" && rData.result.rspnRslt == "NR")){
                        if(! jbwrcFnc.isNull(rData.result) && ! (rData.result.rspnCd == "100000" && rData.result.rspnRslt == "NR") ){
                            alert(rData.result.rspnMsg);//, �꾨Ц�묐떟 �먮윭 �몄텧
                        }
                    }else{
                        if(! jbwrcFnc.isNull(_callback)){
                            if (typeof _callback == "function") {
                                _callback(rData);
                            }else {
                                new Function('return ' + _callback)()(rData);
                            }
                        }
                    }
                }
                , errorCallback : _errorCallback
            });    
        }
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 �곗씠�� ����
         * @param data          : [*�꾩닔] �댁뼱�섍린 �명똿 �곗씠��
         *  >[*�꾩닔] data.bzwkDivVal : �낅Т援щ텇媛�
         *  >[*�꾩닔] data.stepDivVal : �④퀎援щ텇媛�
         *  >[ �좏깮] data.extra      : 蹂꾨룄 ���κ컪 
         * @param callback      : [ �좏깮] 肄쒕갚
         * @param _errorCallback   : [ �좏깮] �먮윭肄쒕갚 
         * @returns 
         */
        , saveLoanTmpStrg : function(loanTempInfo, _callback, _errorCallback, isNoSave){
            var param = {};
            param.bzwkDivVal = loanTempInfo.bzwkDivVal;//, �낅Т援щ텇媛�
            param.stepDivVal = loanTempInfo.stepDivVal;//, �④퀎援щ텇媛�
            param.bzwkDataCtnt = {};//,�낅Т�곗씠�곕궡��
            
            var tmpObj      = {};
            var area        = "";
            var step        = loanTempInfo.step;
            var isSave      = 'N';

            //, ���ν븯�ㅻ뒗 page id �명똿
            if(! jbwrcFnc.isNull(param.stepDivVal) && ! jbwrcFnc.isNull(step)){
                for(var i=0; i<step.length; i++){
                    var stepFullName = step[i]["cd"] +"_"+step[i]["bizStepCd"];
                    if(step[i]["isSave"] == 'Y' && stepFullName == param.stepDivVal){
                        area = step[i]["page"];
                        isSave = "Y";
                        break;
                    }
                }
            }
            if(isSave == 'Y' && jbwrcFnc.isNull(isNoSave)){//, json �ㅼ젙�뚯씪�� �댁뼱�섍린 ���� �щ�媛� Y 硫� ���ν븳��. 
                if(! jbwrcFnc.isEmpty(area)){
                   //, for(var i=0; i<area.length; i++){
                        var $area = $("#"+area);
                        $area.find("[loanTmp]").each(function(){//, loanTmp �붿냼媛� �덉쑝硫� �곗씠�� ����
                            var obj     = this;
                            var key     = $(this).attr("loanTmp");
                            var value   = "";
                            if(! jbwrcFnc.isNull(key)){
                                if(/select|input/.test(obj.tagName.toLowerCase())){
                                    if (obj.type == "radio") {
                                        value = $area.find('input:radio[loanTmp=' + key + ']:checked').val();
                                    } else if (obj.type == "checkbox") {
                                        value = $(this).is(":checked");//, true or false
                                    }else{
                                        value = obj.value;
                                    }
                                }else{//, select, input �� �꾨땶 �쇰컲 �쒓렇�� "loanTmp" �띿꽦�� �덈뒗 寃쎌슦
                                    value = $(this).text();
                                }
                                tmpObj[key] = jbwrcFnc.nvl(value);
                            }else{
                                console.log(obj + "loanTmp �띿꽦�� 媛믪씠 �놁뒿�덈떎.");
                            }
                        });
                        
                        param.bzwkDataCtnt = tmpObj;
                   //, }
                }//, if(! jbwrcFnc.isEmpty(area))
                if(! jbwrcFnc.isNull(loanTempInfo.saveData) ){
                    //, �낅Т�먯꽌 蹂꾨룄濡� ���ν븯�� �곗씠�곌� �덉쑝硫� �명똿
                    if(! jbwrcFnc.isNull(loanTempInfo.saveData.extra)){
                        param.bzwkDataCtnt.extra = Object.assign({}, loanTempInfo.saveData.extra);
                        loanTempInfo.saveData.extra = {};
                    }
                    //, �뚮씪誘명꽣媛� �덉쑝硫�
                    if(! jbwrcFnc.isNull(loanTempInfo.saveData.param)){
                        param.bzwkDataCtnt.param = Object.assign({}, loanTempInfo.saveData.param);
                        loanTempInfo.saveData.param = {};
                    }
                }
                //, 釉뚮씪�곗� �몄뀡 �곗씠�� �명똿
                if( ! jbwrcFnc.isNull(sessionStorage)){
                    var blackList = ["is_sbs", "stplList", "reqlang", "multiLangPack", "loanTmpStrgJson", "loanTmpStrgData"];//, �쒖쇅����
                    var storageObj = {}; 
                    for(var key in sessionStorage){//, ���� ���곷쭔 ����
                        if(! blackList.includes(key)){
                            storageObj[key] = sessionStorage[key];
                        }
                    }
                    param.strgDataCtnt = JSON.stringify(storageObj);
                }
                param.bzwkDataCtnt = JSON.stringify(param.bzwkDataCtnt);
                context.ajaxUtil.call({
                    url :  "/mdr/bzc/prg/saveLoanTmpStrg.do"
                    , beforeShow : true
                    , compleShow : true
                    //, async     : false
                    , data      : param
                    , callBack  :  function(rData){                    
                        console.log("saveLoanTmpStrg �댁뼱�섍린 �곗씠�� ���μ셿猷�");
                        if(! jbwrcFnc.isNull(rData.result) && rData.result == "00"){
                            if (!jbwrcFnc.isNull(rData.frstRegDt) && rData.frstRegDt.length == 8) {
                                var yyyy = parseInt(rData.frstRegDt.substring(0, 4), 10);
                                var mm   = parseInt(rData.frstRegDt.substring(4, 6), 10);
                                var dd   = parseInt(rData.frstRegDt.substring(6, 8), 10);
                                jbwrcFnc.setLocalStorageWithExpiry("cntiPosbYn", "Y", new Date(yyyy, mm, dd + 1, 0, 0, 0)); // 理쒖큹�깅줉�� �댄썑 留뚮즺
                            }
                        }
                        if(! jbwrcFnc.isNull(_callback)){
                            if (typeof _callback == "function") {
                                _callback(rData);
                            }else {
                                new Function('return ' + _callback)()(rData);
                            }
                        }
                    }
                    , errorCallback : _errorCallback
                });
            }//, if(isSave == 'Y')
            else{//, �댁뼱�섍린瑜� ���ν븯吏� �딆쑝硫� callback �⑥닔留� �몄텧�쒕떎. 
                console.log("isSave : " + isSave + ", jbwrcFnc.isNull(isNoSave) : " + jbwrcFnc.isNull(isNoSave)+" �댁뼱�섍린 ���� ���� �놁쓬");
                if(! jbwrcFnc.isNull(_callback)){
                    if (typeof _callback == "function") {
                        _callback();
                    }else {
                        new Function('return ' + _callback)()();
                    }
                }
            }
        }
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 �곗씠�� 議고쉶
         * @param data          : [*�꾩닔] �댁뼱�섍린 議고쉶 �곗씠��
         *  >[*�꾩닔] data.bzwkDivVal : �낅Т援щ텇媛�
         *  >[ �좏깮] data.stepDivVal : �④퀎援щ텇媛�(�놁쑝硫� 理쒖쥌�④퀎瑜� 議고쉶��)
         * @returns 
         */
        , getLoanTmpStrgDetail : function(data, url){
            JBWRC.showLoading();
            context.ajaxUtil.call({
                url : "/mdr/bzc/prg/getLoanTmpStrgDetail.do"
                , beforeShow : false
                , compleShow : false
                , data : data
                , callBack : function(rData){
                    if(! jbwrcFnc.isNull(rData)){
                        
                        var result = jbwrcFnc.nvl(rData.result);
                        if(result == "00"){
                            //, context.storageUtil.set("loanTmpStrgData", rData);
                            //, isFirst : �댁뼱�섍린 理쒖큹 �좎엯 �щ�
                            //,  -Y : �댁뼱�섏떆寃좎뒿�덇퉴? �앹뾽�쇰줈 �좎엯
                            //,  -N : �댁뼱�섍린 �④퀎 �앹뾽�먯꽌 '�섏젙' 踰꾪듉�쇰줈 �좎엯 or '�ㅻ줈媛�湲�' 濡� �좎엯
                            //, rData.reqeustParamMap["isFirst"] = (jbwrcFnc.isNull(data.isFirst) ? "N" : data.isFirst);
                            var isFirst = (jbwrcFnc.isNull(data.isFirst) ? "N" : data.isFirst);
                            if(! jbwrcFnc.isNull(url)){
                                page.objMoveView(rData.moveParam, url+"?isFirst="+isFirst, "POST");
                                //, context.pageUtil.goPage(url, null, param);
                            }else{
                                page.objMoveView(rData.moveParam, rData.moveUrl+"?isFirst="+isFirst, "POST");
                            }
                        }else if(result == "01"){
                            //, �먮떞 inapp�� 寃쎌슦
                            context.pageUtil.goPage(rData.moveUrl); //'�먮룞李⑤떞蹂대�異�
                        }else{
                            //, �ㅼ씠�됲듃 �곹뭹�� �쒕룄議고쉶 �붾㈃�쇰줈 �대룞
                            JBWRC.hideLoading(true);
                            var bzwkDivVal = data.bzwkDivVal;
                            if("D1|D2|D3|D10".indexOf(bzwkDivVal) > -1){
                                JBWRC.alert("�대떦�곹뭹�� �댁뼱�섍린媛� 遺덇��섏뿬 蹂몄씤�몄쬆 �④퀎濡� �대룞�⑸땲��.",{
                                    okCallback: function(){
                                        if(bzwkDivVal == "D1" ){
                                            context.pageUtil.goPage("/mdr/ucr/umr/mdUmr0010.do"); //'�먮룞李⑤떞蹂대�異�
                                        }else if(bzwkDivVal == "D2" ){
                                            context.pageUtil.goPage("/mdr/pln/mdPln0010.do");     //'�좎슜��異�
                                        }else if(bzwkDivVal == "D3" ){
                                            context.pageUtil.goPage("/mdr/mvm/mdMvm0010.do");     //'���섎�異�(�먮떞), ���섎�異�(�좎슜)
                                        }else if(bzwkDivVal == "D10" ){
                                            context.pageUtil.goPage("/mdr/mrgg/mdMrgg0010.do");   //'遺��숈궛��異�
                                        }
                                    }
                                });
                            }else{
                                JBWRC.alert("�댁뼱�섍린 �곗씠�� 議고쉶以� 臾몄젣媛� 諛쒖깮�덉뒿�덈떎.",{
                                    okCallback: function(){
                                        context.goMainPage('0');   //'遺��숈궛��異�
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 紐⑸줉議고쉶
         * @param data    bzwkDivVal  : "D1"
         *                cstno :
         *                cnslno : 
         *            
         *        ODS �쇰븣 bzwkDivVal : "O1"      
         *                srtnUrlIdntRandVal : �⑥텞URL�앸퀎�쒖닔媛� 
         * @returns 
         */
        , getLoanTmpStrgDetailList : function(data, _callback, _errorCallback){
            context.ajaxUtil.call({
                url : "/mdr/bzc/prg/getLoanTmpStrgDetailList.do"
                , waitFlag : false
                , data : data
                , callBack : function(rData){
                    
                    console.log(rData);
                    
                    if (_callback != "") {                        
                        if (typeof _callback == "function") {
                            _callback(rData);
                        }else {
                            new Function('return ' + _callback)()(rData);
                        }
                    } else {
                       // result.data = rData;
                    }
                }
                , errorCallback : _errorCallback
            });
        }
        
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 �낅Т �곗씠�� �명똿 �⑥닔
         * @returns 
         */
        , setLoanTmpData : function(loanTempInfo, pageInfo){
            context.ajaxUtil.call({
                url : "/mdr/bzc/prg/getLoanTmpStrgBzwkData.do"
                , beforeShow    : false
                , compleShow    : false
                , async         : false
                , callBack      : function(rData){
                    if(! jbwrcFnc.isNull(rData)){
                        if(rData.result == "99"){
                            context.pageUtil.goPage("/cmm/JCOMERR0003.do");
                        }else{
                            loanTempInfo['pageInfo'] = context.setLoanTmpBzwkData(loanTempInfo['step'], rData);
                            loanTempInfo["loanTmpStrgData"] = rData;
                        }
                    }else{
                        console.log("�명똿�� �낅Т�곗씠�곌� �놁뒿�덈떎.");
                    }
                }
            });
        }
        /**
         * �ㅼ씠�됲듃>��異쒓났��>�댁뼱�섍린 �곗씠�� �명똿 �⑥닔
         * @param stepObj �댁뼱�섍린 �④퀎 �뺣낫瑜� �ы븿�� object
         * @returns 
         */
        , setLoanTmpBzwkData : function(stepList, rData){
            var pageInfo    = {};//, �몄텧�� �섏씠吏�
            var lastStep    = "";
            if(! jbwrcFnc.isNull(stepList)){
                JBWRC.showLoading();
                
                var storage         = rData;//, db 議고쉶 �곗씠��
                var storageNowStep  = storage['moveStepDivVal'];//, 理쒖쥌 �댁뼱�섍린 �④퀎
                var isNext          = false;//, 理쒖쥌 �댁뼱�섍린 �④퀎(storageNowStep) 蹂대떎 �댄썑 �④퀎 �щ�

                //, �몄뀡�ㅽ넗由ъ� �명똿_[S] -------------------------------------------------------------------------------
                if(! jbwrcFnc.isNull(storage.bzwkDataCtnt['strgDataCtnt'])){
                    for(var data in storage.bzwkDataCtnt['strgDataCtnt']){
                        context.storageUtil.set(data, storage.bzwkDataCtnt['strgDataCtnt'][data]);
                    }
                }
                //, �몄뀡�ㅽ넗由ъ� �명똿_[E] -------------------------------------------------------------------------------
                //, �붾㈃ �명똿_[S] ------------------------------------------------------------------------------------
                for(var step of stepList){//, [{"cd" : "STEP2", "bizStepCd" : "LIMT_RSLT", "page" : [stepManage.pageId[1]]}]//, �쒕룄議고쉶 寃곌낵
                    var stepFullName = step["cd"] + "_" + step["bizStepCd"];//, STEP1_LIMT_RSLT
                    var page = step["page"];//, stepManage.pageId[1]
                    var loanFnncDsntAreaCnt = 0;
                    for(var storgStepName in storage.bzwkDataCtnt){//, STEP2_LNAL_INPUT: {loanTrm: '12', appcAmt: '3,000,000'}
                        //, db議고쉶 step(storageStep) 怨� �뚮씪誘명꽣濡� 諛쏆� step(stepObj) �� 媛숈쑝硫� �곗씠�� �명똿
                        if(storgStepName == stepFullName){
                            lastStep = step['pageCnt'];
                            
                            for(var storgKey in storage.bzwkDataCtnt[storgStepName]){//, {loanTrm: '12', appcAmt: '3,000,000'}
                                var $area       = $("#"+page);//, prefill page
                                var $this       = $area.find("[loanTmp='"+storgKey+"']");//,prefill ����
                                var storgVal    = storage.bzwkDataCtnt[storgStepName][storgKey];//, prefill媛�
                                var value       = '';//, prefill �붾㈃�� default 媛�
                                var eventType   = '';
                                
                                if(! jbwrcFnc.isNull($this) && $this.length != 0){//, prefill ���곸씠 �덉쓬
                                    if(/select|input/.test($this.prop('tagName').toLowerCase())){
                                        if ($this.prop('type') == "radio") {
                                            $this = $area.find('input:radio[loanTmp=' + storgKey + '][value="'+storgVal+'"]');
                                            value = $area.find('input:radio[loanTmp=' + storgKey + '][value="'+storgVal+'"]').is(":checked");
                                            if(!isNext || jbwrcFnc.isNull(value)){
                                                $area.find('input:radio[loanTmp=' + storgKey + '][value="'+storgVal+'"]').prop("checked", true);
                                            }
                                            eventType = "click";
                                        } else if ($this.prop('type') == "checkbox") {
                                            value = $this.is(":checked");//, true or false
                                            if(!isNext || jbwrcFnc.isNull(value)){
                                                $this.prop("checked", (storgVal ? true : false));
                                            }
                                        }else{
                                            value = $this.val();
                                            if(!isNext || jbwrcFnc.isNull(value)){
                                                $this.val(storgVal);
                                            }
                                        }
                                        if(! $this.is("[loanTmpNoEvnt]")){
                                            if("click" == eventType){
                                                $this.click();
                                            }else{
                                                $this.change();
                                            }
                                        }
                                        if($this.attr("loanTmpNoEvnt") == "loanFnncDsntArea"){
                                            console.log("setLoanTmpData �댁뼱�섍린 �곗씠�� �명똿 �섏씠吏� loanTmpNoEvnt: " + $this.attr("loanTmpNoEvnt"));
                                            loanFnncDsntAreaCnt++;
                                        }
                                    }else{//, select, input �� �꾨땶 �쇰컲 �쒓렇�� "loanTmp" �띿꽦�� �덈뒗 寃쎌슦
                                        value = $this.text();
                                        //, if(!isNext || jbwrcFnc.isNull(value)){
                                            $this.text(storgVal);
                                        //, }
                                        if($this.closest('button').hasClass('btn-select') && ! jbwrcFnc.isNull(storgVal)){
                                            $this.closest('button').addClass('active');
                                        }
                                        /* �쇰꺼 ��긽 �쒖떆�섎룄濡� css 蹂�寃� (2025.06.30)
                                        if (! jbwrcFnc.isNull(storgVal) && $this.prop('tagName').toLowerCase() == "span" && $this.hasClass("value")) {
                                            // value �대옒�� 遺�紐� 踰꾪듉�� active 異붽��섏뿬 �쇰꺼 show
                                            $this.closest("button").addClass("active");
                                        }
                                        */
                                    }
                                }
                            }
                        }//, if(storgStepName == stepFullName)
                    }//, for(var storgStepName in storage.bzwkDataCtnt)
                    if(storageNowStep == stepFullName){//, �꾩옱 �④퀎 泥댄겕
                        console.log("setLoanTmpData �댁뼱�섍린 �곗씠�� �명똿 �섏씠吏� : "+step["page"]);
                        isNext = true;
                        pageInfo['page']        = step["page"];//,page id
                        pageInfo['stepDivVal']  = storageNowStep;//, �④퀎援щ텇媛�
                        pageInfo['pageCnt']     = step["pageCnt"];//, �붾㈃�먯꽌 諛쏆� Page id
                        pageInfo['bizStep']     = step['bizStep'];//, �낅Т�④퀎
                        targetMove(step["page"]);//' �ㅽ겕濡ㅼ긽�⑥쑝濡쒖씠��
                        
                        console.log("setLoanTmpData �댁뼱�섍린 �곗씠�� �명똿 �섏씠吏� loanFnncDsntAreaCnt: " + loanFnncDsntAreaCnt);
                        if(step["page"] == "loanFnncDsntArea"){//' �곹뭹 �ㅻ챸�� �ㅽ겕濡ㅼ씠踰ㅽ듃 �ㅽ뻾
                            setTimeout( function() {
                                console.log("�댁뼱�섍린 �곗씠�� �명똿 �섏씠吏� (�곹뭹�ㅻ챸�� �ㅽ겕濡ㅼ씠踰ㅽ듃 �ㅽ뻾)");
                                defaultScrollMagic();
                            },400);
                            if(loanFnncDsntAreaCnt >= 3){//' �곹뭹 �ㅻ챸�� �ㅽ겕濡ㅼ씠踰ㅽ듃 �ㅽ뻾
                                setTimeout( function() {
                                    console.log("�댁뼱�섍린 �곗씠�� �명똿 �섏씠吏� (�곹뭹�ㅻ챸�� 踰꾪듉�꾨즺泥섎━)");
                                    redAreaChecked();
                                },350);
                            }
                        }
                    }
                    pageInfo['lastCnt']     = lastStep;//, 理쒖쥌 step
                    //prefill �뺤씤�� 濡쒓렇
                    if(! isNext){
                        console.log("All prefill O step : " + stepFullName);
                    }else{
                        console.log("All prefill X step : " + stepFullName);
                    }
                }//, for(var step of stepList)
                //, �몄텧�� �섏씠吏� �뺣낫媛� �덉쑝硫� �붾㈃ 泥섎━
                if(! jbwrcFnc.isNull(context.getQueryVariable('isFirst'))){
                    if(! jbwrcFnc.isNull(pageInfo['page'])){
                        $(".contents-wrap").hide();//, 紐⑤뱺 �④퀎 鍮꾨끂異�
                        $("#"+pageInfo['page']).show();//, �꾩옱 step �� �대떦�섎뒗 �④퀎 �몄텧
                        if(storage['bzwkDivVal'].startsWith("O")){//,ODS �곹뭹
                            if(pageInfo['bizStep'] == 1 || pageInfo['bizStep'] == 2){
                                context.hideBackBtn();
                            }else{
                                context.showBackBtn();
                            }
                        }
                    }
                }
                //, �붾㈃ �명똿_[E] ------------------------------------------------------------------------------------
                JBWRC.hideLoading(true);
            }
            return pageInfo;
        },
        /**
         * ��異� �댁뼱�섍린 json 議고쉶�섏뿬 釉뚮씪�곗� �ㅽ넗由ъ��� �명똿
         * @param bzwkDivVal : �낅Т援щ텇媛� ( D1, O1, ... )
         */
        setLoanTmpStrgJson : function(bzwkDivVal){
            context.ajaxUtil.call({
                url : "/mdr/bzc/prg/getLoanTmpStrgJson.do"
                , beforeShow : false
                , compleShow : false
                , data : {'bzwkDivVal' : jbwrcFnc.nvl(bzwkDivVal)}
                , async : false
                , callBack : function(rData){
                    console.log(rData);
                    context.storageUtil.set("loanTmpStrgJson", rData);
                }
            });
        },
        
        setLoanTempStatus : function(data, _callback, _errorCallback){
            context.customAjax({
                beforeShow : true, 
                compleShow : true,
                data : data,
                url : '/mdr/bzc/prg/updateLoanTemp.do',
                callBack : function(rData){
                    context.storageUtil.remove("cntiPosbYn");//, �댁뼱�섍린 �ㅽ넗由ъ� ��젣
                    if(! jbwrcFnc.isNull(_callback)){                       
                        if (typeof _callback == "function") {
                            _callback(rData);
                        }else {
                            new Function('return ' + _callback)()(rData);
                        }
                    }
                }, 
                errorCallback : _errorCallback
            });
        }, 
        /**--------------------------------------------------------------------------------------------*/
        /**[��異쒓났��] �댁뼱�섍린_[E] ---------------------------------------------------------------------------*/
        /**--------------------------------------------------------------------------------------------*/

        /**
         * �듭썡�� �꾪빐 3�ъ튂 �곸뾽�� �몄텧
         * @param base_ym : 議고쉶 �꾩썡�� ( yyyymmdd )
         * @param callback : callback�⑥닔 
         *                   return workList, clsn_dt 
         * @example          
         *     getWorkList( base_ym, function( workList, clsn_dt )){
         *          workList = base_ym 湲곗� 3�곸뾽�� ;
         *          clsn_dt = base_ym 湲곗� 3�� �곸뾽��;
         *     }
         */
        getWorkList : function ( base_ym, callback, flag ){
            
            var copyWorkList = [];
            var copyClsn_dt = [];
            context.customAjax({
                url : "/onl/stm/cbsobg1303r.do"                     // url 
                , data : { base_ym : base_ym }                      // param
                , beforeShow : false                                 // 濡쒕뵫諛� �щ� 
                , compleShow : false                                // 濡쒕뵫諛� �щ� 
                , callBack : function( data ){                      // 肄쒕갚
                    
                    var rNewTrgtBzopDdIqry = data.rNewTrgtBzopDdIqry;   // �좉퇋���곸쁺�낆씪議고쉶寃곌낵Dto
                    
                    rNewTrgtBzopDdIqry.forEach(function( item, index ){
                     
                        // �곸뾽�쇰쭔 �곕줈 諛곗뿴�앹꽦
                        if( item.bzop_dd_yn == 'Y' ){
                            clsn_dt.push(item.clsn_dt);
                        }else{
                            holi_dt.push(item.clsn_dt);
                        }
                        today_all_clsn_dt.push(item.clsn_dt);
                    }); 
                    workSearchCnt++;
                    if(flag == "one"){
                        if( workSearchCnt < 2 ){
                            return context.getWorkList( moment( base_ym , 'YYYYMMDD' ).add('1','M').format('YYYYMMDD'), callback,"one");
                        }else{
                            var checkCnt = 0;
                            var work_list = [];
                            for( var i = 0; i < clsn_dt.length; i++ ){
                                
                                // �ㅻ뒛�좎쭨�ы븿 誘몃옒�좎쭨 �곸뾽�쇰쭔 list push
                                if( clsn_dt[i] >= moment().format('YYYYMMDD') ){
                                    work_list.push(clsn_dt[i]);
                                    checkCnt++;
                                }      
                                // �ㅻ뒛�좎쭨 �ы븿 3�쇰쭔 �앹꽦
                                if( checkCnt > 3 ){
                                    
                                    // 珥덇린��
                                    checkCnt = 0;
                                    copyWorkList = JSON.parse(JSON.stringify(work_list));
                                    copyClsn_dt = JSON.parse(JSON.stringify(clsn_dt));
                                    work_list = [];
                                    //clsn_dt = [];
                                    workSearchCnt = 0;
                                    
                                    // base_ym 湲곗� 3�곸뾽�� , 3�� �곸뾽�� return 
                                    callback( copyWorkList, copyClsn_dt, holi_dt, today_all_clsn_dt );
                                }
                            }
                        }
                        
                    }else{
                        if( workSearchCnt < 3 ){
                            return context.getWorkList( moment( base_ym , 'YYYYMMDD' ).add('1','M').format('YYYYMMDD'), callback );
                        }else{
                            var checkCnt = 0;
                            var work_list = [];
                            for( var i = 0; i < clsn_dt.length; i++ ){
                                
                                // �ㅻ뒛�좎쭨�ы븿 誘몃옒�좎쭨 �곸뾽�쇰쭔 list push
                                if( clsn_dt[i] >= moment().format('YYYYMMDD') ){
                                    work_list.push(clsn_dt[i]);
                                    checkCnt++;
                                }      
                                // �ㅻ뒛�좎쭨 �ы븿 3�쇰쭔 �앹꽦
                                if( checkCnt > 3 ){
                                    
                                    // 珥덇린��
                                    checkCnt = 0;
                                    copyWorkList = JSON.parse(JSON.stringify(work_list));
                                    copyClsn_dt = JSON.parse(JSON.stringify(clsn_dt));
                                    work_list = [];
                                    clsn_dt = [];
                                    
                                    // base_ym 湲곗� 3�곸뾽�� , 3�� �곸뾽�� return 
                                    callback( copyWorkList, copyClsn_dt, holi_dt, today_all_clsn_dt );
                                }
                            }
                        } 
                    }
                    
                }              
            }); 
        }
        /**
         * 怨듯넻 醫뚯륫 硫붾돱 snb 蹂댁씠湲�
         * @param  
         * @returns 
         */
        , showSnb : function(){
            if(JBWRC.isMobile()){
                $("#idSnbWrapArea").not('.pc').show();
            } else {
                $("#idSnbWrapArea").show();
            }
        }
        /**
         * 怨듯넻 醫뚯륫 硫붾돱 snb 媛먯텛湲�
         * @param
         * @returns 
         */
        , hideSnb : function(){
            $("#idSnbWrapArea").hide();
        }
        /*
         * �ㅻ줈媛�湲� 踰꾪듉 �④�
         * */        
        , hideBackBtn : function() {
            $('.btn-back').hide();        
        }
        /*
         * �ㅻ줈媛�湲� 踰꾪듉 蹂댁씠湲�
         * */        
        , showBackBtn : function() {
            $('.btn-back').show();        
        }        
        //硫붿떆吏�
        , msg_KIB : function (rspn_cd){
            
            var KIB_CD_A = [ '099', '376', '379', '505', '585', '616', '839', '857', '907'];        // 怨꾩쥖�붿븸遺�議�
            var KIB_CD_B = [ '901', '106', '107', '108', '109', '115', '116', '117', '118', '119',  // �댁슜遺덇�怨꾩쥖
                             '120', '121', '122', '123', '159', '163', '172', '185', '192', '193',
                             '196', '197', '198', '199', '203', '206', '208', '234', '250', '260',
                             '303', '304', '312', '344', '388', '389', '403', '490', '504', '561',
                             '563', '570', '572', '574', '575', '579', '580', '581', '584', '612', 
                             '613', '614', '617', '641', '647', '662', '669', '678', '681', '716',
                             '719', '755', '758', '876', '877', '911', '915', 'X73' ];
            var KIB_CD_C = [ '338', '355', '412', '507', '534', '548', '559', '598', '600', '670',  // �듭떊�먰솢X
                             '675', '717', '736', 'W98', 'W99', 'W11'];
            var KIB_CD_D = [ '136', '139', '147', '189', '225', '262', '310', '329', '336', '359',  // 湲곌��먭�以�
                             '373', '492', '521', '549', '554', '597', '619', '625', '663', '692',
                             '698', '702', '703', '739', '741', '765', '790', '804', '826', '866'];
            var KIB_CD_E = [ '001', '137', '187', '214', '311', '335', '337', '471', '551', '653',  // 寃곌낵�뺤씤�꾩슂
                             '656', '657', '697', '744', '820', '855', 'TIM', '035'];
          
            var msg = '';
            if( KIB_CD_A.indexOf(rspn_cd) > -1 ){
                msg = '怨꾩쥖�� �붿븸 遺�議깊빀�덈떎.';
            }else if( KIB_CD_B.indexOf(rspn_cd) > -1 ){
                msg = '�댁슜�� 遺덇��ν븳 怨꾩쥖�낅땲��.';        
            }else if( KIB_CD_C.indexOf(rspn_cd) > -1 ){
                msg = '�듭떊�� �먰솢�섏� �딆뒿�덈떎.';
            }else if( KIB_CD_D.indexOf(rspn_cd) > -1 ){
                msg = '湲곌� �먭�以묒엯�덈떎.';
            }else{
                msg = '���됱떆�ㅽ뀥 �ㅻ쪟�낅땲��. 怨좉컼�쇳꽣濡� 臾몄쓽�댁＜�몄슂.';
            }
            return msg;
        }
        // �곸뾽��, �곸뾽�쒓컙 議고쉶
        ,checkBusinessDay : function ( beforeShow, compleShow, callback ){
           
            customAjax({
                url : "/onl/stm/checkBusinessDay.do"                // url 
                , data : ''                                         // param
                , beforeShow : jbwrcFnc.isEmpty(beforeShow) ? false : true   // 濡쒕뵫諛� �щ� 
                , compleShow : jbwrcFnc.isEmpty(compleShow) ? false : true   // 濡쒕뵫諛� �щ� 
                , callBack : function(result){                      // 肄쒕갚
                    callBack(result);
                }             
            });
        }
        //scnId 異붽� 
        ,setScnId : function(form){
            var scnId =  "";
            if(!jbwrcFnc.isEmpty(location.pathname)){
                var fi = location.pathname.lastIndexOf("/")+1;
                var la = location.pathname.lastIndexOf(".");
                scnId = location.pathname.substring(fi,la);
            }
            var hidenField = document.createElement('input');
            hidenField.setAttribute('type', 'hidden');
            hidenField.setAttribute('name', "scnId");
            hidenField.setAttribute('value', scnId);
            form.appendChild(hidenField);
        }
        /**
         * �ы썑愿�由� �ㅽ넗�� �대룞 
         */
        ,goFumnLink : function(){
            var url = "https://jbmobilesupport.page.link/main";
            
            // 媛쒕컻
            if(HPApp.Util.isDevServer)
            {
                url  = url + "_Dev";
            }
            // 寃�利�
            else if(HPApp.Util.isTestServer)
            {
                url  = url + "_Test";
            }
            
            if(JBWRC.isMobile() && (JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW"))
            {
                //紐⑤컮��
                location.href =  url;
                setTimeout(function(){
                    JBWRC.hideLoading(true);
                },500);
            }
            else
            {
                JBWRC.alert("紐⑤컮�쇱쎒�먯꽌留� �묎렐�� 媛��ν빀�덈떎.");
                return;
            }   
        }
        /**
         * 泥댄겕諛뺤뒪 �꾩껜 泥댄겕 諛� �댁젣
         * @param id   
         * @example 
         *      fnAllChk('phoneChk');   
         */
        ,fnAllChk : function (id){
            if($('#'+id+'All').is(':checked')){
                $('input[name="'+id+'"]').prop('checked', true);
            }else{
                $('input[name="'+id+'"]').prop('checked', false);
            }
        }

        ,fnPropChk : function (id){
            var chkboxLen = $('input[name="'+id+'"]').length;
            var chkLen = $('input[name="'+id+'"]:checked').length;
            console.log(chkboxLen + " : " + chkLen)
            if(chkboxLen == chkLen){
                $('#'+id+'All').prop('checked', true);
            }else{
                $('#'+id+'All').prop('checked', false);
            }
        }
        /**
         * 紐⑤컮�쇱슜 select popup �댁슜 蹂�寃� �⑥닔
         *
         * @selectId   : [*�꾩닔]蹂�寃쏀븷 select id
         * 
         * ex) jbwrcUtil.changeMbSelectPop("selectId");
         */
        , changeMbSelectPop : function(selectId){
            if (selectId){
                //, $("#"+selectId).closest(".select-box.pc").find("button[aria-controls]").attr("aria-controls");
                var id = $("#"+selectId).closest(".select-box.pc").next().attr("aria-controls");
                _selMobileControl(id);//, �쇰툝 popup 洹몃━�� �⑥닔
            }   
        },
        /**
         * �ㅻ뒛�좎쭨 �щĸ吏���
         * @param    format
         * @example 
         *      fn_getToday('.');   --> 2025.04.02
         */
        fn_getToday : function (format){
            var date = new Date();
            var yy = date.getFullYear();
            var mm = date.getMonth() + 1;
            if(jbwrcFnc.isEmpty(format)){
                format = '';
            }
            if(mm < 10){
                mm = '0' + mm;
            }
            var dd = date.getDate();
            if(dd < 10){
                dd = '0' + dd;
            }
            return yy + format + mm + format + dd;
        },

        fn_getTime : function (format){
            
            var date = new Date();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            if(jbwrcFnc.isEmpty(format)){
                format = '';
            }
            if(hour < 10){
                hour = '0' + hour;
            }
            
            return hour + format + min + format + sec;
        }
        , getQueryVariable : function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0; i<vars.length; i++) {
                if(0 < vars[i].indexOf("=")) {
                    if(variable == vars[i].substring(0, vars[i].indexOf("="))) {
                        return vars[i].substring(vars[i].indexOf("=")+1, vars[i].length);
                    }
                }
            }
            return null;
        }
        /**
         * 二쇨린�곸쑝濡� 鍮꾨룞湲곕줈 媛믪씠 �ㅼ뼱媛� �덈뒗吏� 泥댄겕
         * @param    intervalSec : 議고쉶 二쇨린(珥�)
         * @param    maxTryCnt : 理쒕��쒕룄�잛닔
         * @param    ajaxParamObj : �낅Т�먯꽌 �ъ슜�섎뜕 ajax data
         */        
        , getPollingAjax : function(intervalSec, maxTryCnt, ajaxParamObj, isHideLoading) {
            let tryCnt = 0;
            const startTime = new Date().getTime();
            const userCallback = ajaxParamObj.callBack;
            let callARSYn = false;
            if (typeof ajaxParamObj.callBiz != 'undefined' && !jbwrcFnc.isEmpty(ajaxParamObj.callBiz)) {
                callARSYn = true;
            }
            
            if(!isHideLoading) {
                JBWRC.showLoadingRandom(JBWRC.loadingMsg.type1);
            }

            ajaxParamObj.callBack = function(rData, status, xhr) {
                    console.log('getPollingAjax callBack...', rData);
                    let currTime = new Date().getTime();
                    if(rData != null && rData.RSPN_RSLT == 'WI') {
                        if( tryCnt < maxTryCnt ){
                            setTimeout(checkStatus, intervalSec * 1000);
                            return;
                        } 
                    }
                    console.log('getPollingAjax ��...', rData);
                    if(!isHideLoading) {
                        JBWRC.hideLoading();
                    }
                    userCallback(rData);
                }

            function checkStatus(){
                tryCnt++;
                console.log('>> getPollingAjax �몄텧', tryCnt);
                //let currTime = new Date().getTime();
                //$('#countArea').text( [tryCnt , maxTryCnt, (currTime-startTime)/1000].join('/') );
                context.customAjax(ajaxParamObj);
                if (callARSYn) _arsPollingCnt++;
            }

            checkStatus();
        }
        /**
         * html�먯꽌 鍮꾩뼱�덈뒗 �명뭼 �꾨뱶�� �ъ빱�� �대룞
         */
        , focusOnFirstEmptyInput : function(){
            const inputs = document.querySelectorAll('input');
            for(let i=0; i<inputs.length; i++){
                if(inputs[i].value.trim() == ''){
                    inputs[i].focus();
                }
            }
        }       
        /**
         * �� �먯꽌 諛깊븯�� 寃쎌슦 �뱀젙 �섏씠吏�濡� �대룞�댁빞 �섎뒗寃쎌슦 backKeyEvent �⑥닔 define �꾩슂 
         */
        , goBackBtnEvent : function(backUrl){
            if (typeof backKeyEvent == "function") {
                backKeyEvent();
            }
            else if (typeof backUrl == "string") {
                window.location.href = backUrl;
            }
            else {
                var dontMoveList = ["errorView", "privateView", "checkView", "stopView"];
                var subMain = ["JFINCAP0001", "JMANGLO0003", "JCSMCHT0001", "JCSTCAP0001", "JONLLON0043"];
                var dontMoveBol = false;
                var nowPage = window.location.pathname;
                var referrer = document.referrer; 
                if($("#mobileMenu").hasClass("layerpop-wrap type-full type-allmenu show") && JBWRC.isMobile()){ // 紐⑤컮�� 硫붾돱
                    $(".btn-close .fnClosePop").trigger("click");
                    return;
                }
                if($(".allmenu").hasClass("on") && !JBWRC.isMobile()){ // �� 硫붾돱
                    $(".btn .menu-close").trigger("click");
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
                    var loginMainChek = ( referrer.indexOf("JLGICAP0004") >= 0 || referrer.indexOf("JLGICAP0002") >= 0 || jbwrcFnc.isEmpty(referrer) || ( ( referrer == main || referrer == (main+"/") ) &&  ( nowLink == main || nowLink == (main+"/") ) ) );
                    if(hashCd != "" && !(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){ // �깆씠 �꾨땶寃쎌슦留� hash �대깽�� 
                        window.localStorage.setItem("backFlag", "N");
                        if (document.referrer) {
                            window.location.href = document.referrer; 
                        } else {
                            window.history.back();
                        }
                    }else{
                        if(loginMainChek){
                            window.location.replace(main);
                        }else{
                            //if (document.referrer) {
                            //    window.location.href = document.referrer; 
                            //} else {
                                window.history.back();
                            //}
                        } 
                    }
                }
            }
        }//else
    } //jbwrcUtil end

    jbwrcUtil.createNameSpace(rootNameSpace);
    w[rootNameSpace] = context;
    w[rootNameSpace].autoFn();
    w['fn_openPopup'] = context.fn_openPopup;
    $(w).on(function() {
        if (typeof CM_LOGIN_INFO !== 'undefined') {
            if (CM_LOGIN_INFO.isLogin) {
                context.pageUtil.loginTimeCheck();
            }
        }
        
        if (typeof CM_SM_LOGIN_INFO !== 'undefined') {
            if (CM_SM_LOGIN_INFO.isLogin) {
                context.pageUtil.loginSmTimeCheck();
            }
        }


        $('.googleP, .appS').off('click.gglapps').on('click.gglapps', function() {
            var option = {};
            if ($(this).hasClass("googleP")) {
                option['osMediaDvcd'] = '1';
            } else if ($(this).hasClass("appS")) {
                option['osMediaDvcd'] = '2';
            } else {
                option['osMediaDvcd'] = '1';
            }
            
            var urlInfo = $(this).hasClass("appS") ? "/requestDownloadCkickiOS.do" : "/requestDownloadCkickAndroid.do";
            
            context.ajaxUtil.call({
                url : urlInfo,
                data : {},
                callBack : function(rData){                    
                    context.pageUtil.callAppDown(option);
                }
            });
        });



    });
})(this, jQuery);

var finEvt = {
        //�곹뭹 而⑦뀗痢� 
        getFinContents : function (_callback){
            var ajaxParam = $('#searchFin').serialize();
            JBWRC.showLoading();
            jbwrcUtil.ajaxUtil.call({
                url : "/fin/aut/getFinList.do"
                , data : ajaxParam
                , callBack : function(data, status, xhr) {
                    if(data != null){
                        var contentList = data.list;
                        var tap = $("[data-tap]");
                        if(tap.length > 0 && contentList.length > 0){
                            for(var i in contentList){
                                var obj = contentList[i].fnncGdsCtnt;
                                $("[data-tap='"+i+"']").prepend(obj); 
                            }
                        }
                    }
                    //JBWRC.init( $('.contents.fin') );
                    jbwrcUtil.runFinSwipe();
                    finEvt.getFaqList(_callback);
                    //$('.product-default').show();
                    $('.section-bottom-fixed').show();
                    JBWRC.hideLoading();
                    /*
                     
                    if(status == "success" && xhr.responseJSON.list.length > 0){
                        var contentList = xhr.responseJSON.list;
                        for(var i in contentList){
                            var obj = contentList[i].fnncGdsCtnt;
                            $("[data-set-evt='"+i+"']").data("gds", contentList[i].fnncGdsNoVal);
                        }
                         
                        $(document).off('click.countcheck', "[data-set-evt]").on('click.countcheck', "[data-set-evt]", function(e){
                            e.stopImmediatePropagation();
                            var fingds = $(this).data("gds");
                            if(!jbwrcFnc.jbwrcFnc.isEmpty(fingds)){
                                jbwrcUtil.ajaxUtil.call({
                                    url : "/fin/aut/setFinCnt.do"
                                    , data : {
                                        fnncGdsNoVal : fingds
                                    }
                                    , callback : function() {
                                        
                                    }
                                });
                            }
                        });
                    }
                     */
                }
                ,errorCallback : function(status, errorMsg){
                    finEvt.getFaqList(_callback);
                    JBWRC.hideLoading();
                }
            });
        },
        //�곹뭹 FAQ
        getFaqList : function(_callback){
            var ajaxParam = $('#searchFin').serialize();
            jbwrcUtil.ajaxUtil.call({
                url : "/fin/aut/getFinFaqList.do"
                , data : ajaxParam
                , callBack : function(data, status, xhr) {
                    if(data != null){
                        var faqList = data.list;
                        var makeFaq = "";
                        console.log("faqList.length : " + faqList.length)
                        if(faqList.length > 0){
                            for(var i in faqList){
                                var obj = faqList[i];
                                makeFaq +=  '<div class="accordion">';
                                makeFaq +=  '   <div class="accordion-header">';
                                makeFaq +=  '       <button type="button" class="btn-toggle" aria-expanded="false" aria-label="�닿린">'+obj.qryCtnt+'</button>';
                                makeFaq +=  '   </div>';
                                makeFaq +=  '   <div class="accordion-contents">';
                                makeFaq +=  '       <p>';
                                makeFaq +=  obj.replCtnt;
                                makeFaq +=  '       </p>';
                                makeFaq +=  '   </div>';
                                makeFaq +=  '</div>';
                            };
                            $('.product-default').show();
                        }else{
                            //makeFaq +=  '<div class="accordion">';
                            //makeFaq +=  '   <div class="accordion-contents">';
                            //makeFaq +=  '       <p>';
                            //makeFaq +=  '�대떦 �곗씠�곌� 議댁옱�섏� �딆뒿�덈떎.';
                            //makeFaq +=  '       </p>';
                            //makeFaq +=  '   </div>';
                            //makeFaq +=  '</div>';
                        }
                        $("#faqList").html(makeFaq);
                        //JBWRC.init();
                        //JBWRC.hideLoading(true);
                    };
                    
                    if (typeof _callback == "function") {
                        _callback();
                    }
                    
                }
            });
        }
}

var back = {
        num : -1
        // �몄쬆 諛� �꾩옄�쒕챸 �꾨즺 ��, �꾨즺�섏씠吏�媛� �꾨땺寃쎌슦 �ъ슜(硫붿꽭吏� �섏젙�좎닔�� �덉쓬)
        // �꾩옱 �섏씠吏��먯꽌 �섍��쒓쿋�듬땲源�?<br>蹂�寃쎌궗��씠 ���λ릺吏� �딆쓣 �� �덉뒿�덈떎.
           ,athn : function(){
               if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){
                   if (window.location.hash != "#ATHN" && window.localStorage.getItem("backFlag") == "Y") {
                       if((!$.browser.edg && $.browser.chrome) && !(JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW")){
                           history.pushState('', '', window.location.href.concat("#ATHN"));
                           jbwrcFnc.sleep(100);
                           history.back();
                           setTimeout(function(){
                               history.forward();
                               window.localStorage.setItem("backFlag", "N");
                           }, 500);
                       }else{
                           history.pushState('', '', window.location.href.concat("#ATHN"));
                           window.localStorage.setItem("backFlag", "N");
                       }
                   }
                   $(window).off('hashchange').on("hashchange", function() {
                       if (location.hash == ''&& window.localStorage.getItem("backFlag") == "N") {
                           JBWRC.alert( "�꾩옱 �섏씠吏��먯꽌 �섍��쒓쿋�듬땲源�?<br>蹂�寃쎌궗��씠 ���λ릺吏� �딆쓣 �� �덉뒿�덈떎.", {
                               bodyTitle: "�낅젰 痍⑥냼",
                               okBtnText: "�뺤씤",
                               cancelBtnText: "痍⑥냼",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                               okCallback: function(){
                                   if(typeof backKeyEvent == "function"){
                                       backKeyEvent();
                                   }else{
                                       jbwrcFnc.goBackFunc();
                                   } 
                               },
                               cancelCallback: function(){
                                   history.pushState('', '', window.location.href.concat("#ATHN"));
                               }
                           });
                       }
                   });
               }
               
           }
        // �꾨즺�섏씠吏�
        // 硫붿꽭吏� �놁씠 �좎뼵�� �섏씠吏�濡� �대룞
           ,fin : function(pageNum){
               if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){
                   if(!jbwrcFnc.isEmpty(pageNum)){
                       back.num = jbwrcFnc.isEmpty(pageNum) ? -l : pageNum * -1;
                   }
                   if (window.location.hash != "#FIN" && window.localStorage.getItem("backFlag") == "Y") {
                       if((!$.browser.edg && $.browser.chrome) && !(JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW")){
                           history.pushState('', '', window.location.href.concat("#FIN"));
                           jbwrcFnc.sleep(100);
                           history.back();
                           setTimeout(function(){
                               history.forward();
                               window.localStorage.setItem("backFlag", "N");
                           }, 500);
                       }else{
                           history.pushState('', '', window.location.href.concat("#FIN"));
                           window.localStorage.setItem("backFlag", "N");
                       }
                   }
                   $(window).off('hashchange').on("hashchange", function() {
                       if (location.hash == ''&& window.localStorage.getItem("backFlag") == "N") {
                           if(typeof backKeyEvent == "function"){
                               backKeyEvent();
                           }else{
                               window.history.go(back.num);
                               back.num = -1;
                           } 
                       }
                   });
               }
               
           }
        // 紐⑸줉�붾㈃
        // �댁쟾�쇰줈 媛덉떆 臾댁“嫄� 硫붿씤�붾㈃
           ,list : function(pageNum){
               if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){
                   console.log("list >> " + location.hash + " : " + localStorage.getItem("backFlag"))
                   if (window.location.hash != "#LIST" && window.localStorage.getItem("backFlag") == "Y") {
                       if((!$.browser.edg && $.browser.chrome) && !(JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW")){
                           history.pushState('', '', window.location.href.concat("#LIST"));
                           jbwrcFnc.sleep(100);
                           history.back();
                           setTimeout(function(){
                               history.forward();
                               window.localStorage.setItem("backFlag", "N");
                           }, 500);
                       }else{
                           history.pushState('', '', window.location.href.concat("#LIST"));
                           window.localStorage.setItem("backFlag", "N");
                       }
                   };
                   $(window).off('hashchange').on("hashchange", function() {
                       if (location.hash == '' && window.localStorage.getItem("backFlag") == "N") {
                           if(typeof backKeyEvent == "function"){
                               backKeyEvent();
                           }else{
                               var main = window.location.protocol + "//" + window.location.host;
                               window.location.replace(main);
                           } 
                       }
                   });
               };
               
           }
        // �댁쟾�쇰줈 媛덉떆 臾댁“嫄� backKeyEvent
           ,list2 : function(pageNum){
               if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){
                   if (window.location.hash != "#LIST" && window.localStorage.getItem("backFlag") == "Y") {
                       if((!$.browser.edg && $.browser.chrome) && !(JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW")){
                           history.pushState('', '', window.location.href.concat("#LIST"));
                           jbwrcFnc.sleep(100);
                           setTimeout(function(){
                               window.localStorage.setItem("backFlag", "N");
                           }, 500);
                       }else{
                           history.pushState('', '', window.location.href.concat("#LIST"));
                           window.localStorage.setItem("backFlag", "N");
                       }
                   };
                   $(window).off('hashchange').on("hashchange", function() {
                       backKeyEvent();
                   });
               };
               
           }
           // �ㅽ뀦�� �낅Т�먯꽌 �ъ슜�� 寃쎌슦(�꾩슂�좊븣留�)
           ,ing : function(pageNum){
               if(!jbwrcFnc.isEmpty(pageNum)){
                   back.num = jbwrcFnc.isEmpty(pageNum) ? -l : pageNum * -1;
               }
               if (location.hash != "#ING") {
                   history.pushState('', '', window.location.href.concat("#ING"));
               }
               $(window).off('hashchange').on("hashchange", function() {
                   if (location.hash == '') {
                       if(typeof backKeyEvent == "function"){
                           backKeyEvent();
                       }else{
                           //TODO �뺤쓽 �꾩쭅 �덈맖 
                       } 
                   }
               });
           }
           // 硫붿씤 �섏씠吏��먯꽌 �ㅻ줈媛�湲� �섎뒗寃쎌슦(�꾩슂�좊븣留�) 
           ,home : function(){
               if(!(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA")){
                   if (window.location.hash != "#HOME" && window.localStorage.getItem("backFlag") == "Y") {
                       if((!$.browser.edg && $.browser.chrome) && !(JBWRC.getDevice() == "IW" || JBWRC.getDevice() == "AW")){
                           history.pushState('', '', window.location.href.concat("#HOME"));
                           jbwrcFnc.sleep(100);
                           history.back();
                           setTimeout(function(){
                               history.forward();
                               window.localStorage.setItem("backFlag", "N");
                           }, 500);
                       }else{
                           history.pushState('', '', window.location.href.concat("#HOME"));
                           window.localStorage.setItem("backFlag", "N");
                       }
                   }
                   $(window).off('hashchange').on("hashchange", function() {
                       if (location.hash == ''&& window.localStorage.getItem("backFlag") == "N") {
                           JBWRC.alert( "硫붿씤 �섏씠吏��먯꽌 �섍��쒓쿋�듬땲源�?", {
                               okBtnText: "�뺤씤",
                               cancelBtnText: "痍⑥냼",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                               okCallback: function(){
                                   if(typeof backKeyEvent == "function"){ //TODO 誘몄젙��
                                       backKeyEvent();
                                   }else{
                                       jbwrcFnc.goBackFunc();
                                   } 
                               },
                               cancelCallback: function(){
                                   history.pushState('', '', window.location.href.concat("#HOME"));
                               }
                           });
                       }
                   });
               }
               
           }
           // �ㅻ쪟 �붾㈃�먯꽌 �댁쟾�붾㈃ 紐산�寃� 泥섎━
           ,hist : function(){
               history.pushState('', '', window.location.href.concat(""));
               
               window.onpopstate = function(a){
                   history.pushState('', '', window.location.href.concat(""));
               }
           }
           // �댁돩�쒓굅 
           ,hashRemove : function(flag){
               if(flag == window.location.hash){
                   return;
               }
               switch (window.location.hash){
                   case "#HOME" : //�곸꽭 湲덉쑖(�꾨즺)
                       window.history.back();
                       break;
                   case "#ING" : //�곸꽭 由ъ뒪(�꾨즺)
                       window.history.back();
                       break;
                   case "#LIST" : //�곸꽭 �뚰깉(�꾨즺)
                       window.history.back();
                       break;
                   case "#FIN" : //�좊�湲덇껐�� �덉���(�꾨즺)
                       window.history.back();
                       break;
                   case "#ATHN" : //�먭툑�곹솚  �덉��� (�꾨즺)
                       window.history.back();
                       break;    
                   default :
                       break;
               }
           
           }
           ,loadEvt : function(flag){
               var type = flag;
               
               window.onpageshow = function(e){
                   if (e.persisted || (window.performance && window.performance.navigation.type == 2)){
                       back.no(type);
                   }
               }
               if(type == "forward"){
                   window.onload = back.no(type);
                   window.history.forward();
                 }
           }
           ,no : function(flag){
               switch (flag){
                   case "pop" : // �앹뾽
                       JBWRC.alert( "�꾩옱 �섏씠吏��먯꽌 �섍��쒓쿋�듬땲源�?<br>蹂�寃쎌궗��씠 ���λ릺吏� �딆쓣 �� �덉뒿�덈떎.", {
                           okBtnText: "�뺤씤",
                           cancelBtnText: "痍⑥냼",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                           okCallback: function(){
                               if(typeof backKeyEvent == "function"){
                                   backKeyEvent();
                               }else{
                                   jbwrcFnc.goBackFunc();
                               } 
                           },
                           cancelCallback: function(){
                               window.history.forward();
                           }
                       });
                       break;
                   case "main" : //硫붿씤, 
                       location.href = window.location.protocol + "//" + window.location.host;
                       break;
                   case "error" : //�먮윭 �섏씠吏�, 
                       location.href = "/privateView.do"
                       break;
                   case "forward" : //�먮윭 �섏씠吏�, 
                       window.history.forward(); 
                       break;
                   case "back" : //�쒕쾲 �� �ㅻ줈 
                       window.history.back(); 
                       break;
                   case "page" : //�먮윭 �섏씠吏�, 
                       if(typeof backKeyEvent == "function"){
                           backKeyEvent();
                       }else{
                           window.history.forward(); 
                       } 
                       break;    
                   default :
                       window.history.forward(); 
                       break;
               }
               
           } 
           
   };
// 蹂몄씤�몄쬆 怨듯넻 泥섎━ 
var comAuth = {
        complete : function(certVal, data){
            if(data.result == "Y")
            {
                // �대���, �꾩씠��, 怨듬룞�몄쬆��, 湲덉쑖�몄쬆��, 移댁뭅�ㅽ럹��, pass, 怨듬룞�몄쬆�� 而ㅼ뒪��(媛쒖씤�뺣낫�숈쓽)
                if(certVal == "phone" || certVal == "ipinCert" || certVal == "crossCert" || certVal == "fnncCert" || certVal == "kakao"  || certVal == "pass" || certVal == "crossCrifCert" || certVal == "toss")
                {
                    // �몄쬆怨듯넻寃�利앹쿂由�
                    comAuth.success(data.selfAuthInfo, certVal);
                }
                else
                {
                    JBWRC.alert( "鍮꾩젙�곸쟻�� �묎렐�낅땲��.", {
                        okBtnText: '�뺤씤',
                        cancelBtnText: '',  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                        okCallback: function(opt){
                                     
                        }
                    });
                }
            }
            else
            {
                JBWRC.alert( "蹂몄씤�뺤씤�� �대（�댁�吏� �딆븯�듬땲��.<br/>�ㅼ떆 �쒕룄�댁＜�쒓린 諛붾엻�덈떎.", {
                    okBtnText: '�뺤씤',
                    cancelBtnText: '',  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                    okCallback: function(opt){
                                 
                    }
                });
            }
        },
        success : function(selfAuthInfo, certVal){
            var athnCstno = selfAuthInfo.cstno;                     // �몄쬆諛쏆� 怨좉컼踰덊샇
            var athnSelfAthnMgmtNo = selfAuthInfo.selfAthnMgmtNo;   // �몄쬆諛쏆� 蹂몄씤�몄쬆愿�由щ쾲��

            if(jbwrcFnc.isEmpty(athnCstno))
            {
                JBWRC.alert( "��異� �댁슜 怨좉컼留� 議고쉶 諛� �좎껌�� 媛��ν빀�덈떎.", {
                    okBtnText: '�뺤씤',
                    cancelBtnText: '',  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                    okCallback: function(opt){
                        context.goMainPage("0");          
                    }
                });        
            }
            else
            {
                // �몄쬆諛쏆� 怨좉컼踰덊샇 泥댄겕
                if(!jbwrcFnc.isEmpty(athnCstno))
                {
                    // 濡쒓렇�명븳 怨좉컼怨� �몄쬆�� 怨좉컼�� 留욌뒗吏� 泥댄겕
                    fn_customAuth(athnCstno, athnSelfAthnMgmtNo, certVal);
                }
                
            }
        },
        completeNologin : function(certVal, data){
            if(data.result == "Y")
            {
                // �대���, 怨듬룞�몄쬆��, 移댁뭅��
                if(certVal == "phone" || certVal == "ipinCert" || certVal == "crossCert" || certVal == "fnncCert" || certVal == "kakao"  || certVal == "pass" || certVal == "crossCrifCert" || certVal == "toss")
                {
                    // �몄쬆怨듯넻寃�利앹쿂由�
                    comAuth.successNologin(data.custNm, data.hp, data.selfAuthInfo);
                }
                else
                {
                    JBWRC.alert( "鍮꾩젙�곸쟻�� �묎렐�낅땲��.", {
                        okBtnText: '�뺤씤',
                        cancelBtnText: '',  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                        okCallback: function(opt){
                                     
                        }
                    });
                }
            }
            else
            {
                JBWRC.alert( "蹂몄씤�뺤씤�� �대（�댁�吏� �딆븯�듬땲��.<br/>�ㅼ떆 �쒕룄�댁＜�쒓린 諛붾엻�덈떎.", {
                    okBtnText: '�뺤씤',
                    cancelBtnText: '',  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                    okCallback: function(opt){
                                 
                    }
                });
            }
        },
        successNologin : function(nm, ph, data){
            var userNm = jbwrcFnc.isEmpty(nm)? "" : nm;                     // �몄쬆諛쏆� 怨좉컼�대쫫
            var phoneNumber = jbwrcFnc.isEmpty(ph)? "" : ph;     // �몄쬆諛쏆� �꾪솕踰덊샇
            fn_customAuth(userNm, phoneNumber, data);
        },
        typeCheck : function(flag){
            var typeNm = "";
            switch (flag){
                case "phone" : //�대���, )
                    typeNm = "�대���";
                    break;
                case "ipinCert" : //�꾩씠��, 
                    typeNm = "�꾩씠��";
                    break;
                case "crossCert" : //怨듬룞�몄쬆��, 
                    typeNm = "怨듬룞�몄쬆��";
                    break;
                case "fnncCert" : //湲덉쑖�몄쬆��, 
                    typeNm = "湲덉쑖�몄쬆��";
                    break;
                case "kakao" : //移댁뭅�ㅽ럹��, 
                    typeNm = "移댁뭅�ㅽ럹��";
                    break;
                case "pass" : //pass, 
                    typeNm = "pass";
                    break; 
                case "crossCrifCert" : //怨듬룞�몄쬆�� 而ㅼ뒪��(媛쒖씤�뺣낫�숈쓽)
                    typeNm = "怨듬룞�몄쬆��";
                    break;
                case "toss" : //toss
                    typeNm = "�좎뒪";
                    break;
                default :
                    url = "";
                    break;
            }
            return typeNm;
        }
        
}

var page = {
            moveView : function(list, url, type){ //form �쇰줈 �섏씠吏� �대룞
                var form = document.createElement("form");
                form.setAttribute("onSubmit", "return false");
                form.setAttribute("id", "pageForm");
                form.setAttribute("name", "pageForm");
                var meethodType = jbwrcFnc.isEmpty(type) ? "POST" : type;
                form.setAttribute("method", meethodType);
                
                form.setAttribute("action", url);
                jbwrcUtil.setScnId(form); // scnId 異붽�
                if(list.length > 0){
                    for(var i in list){
                        var obj = list[i];
                        var hidenField = document.createElement("input");
                        hidenField.setAttribute("type", "hidden");
                        var key = Object.keys(obj)[0];
                        var val = String(obj[key]);
                        hidenField.setAttribute("name", key);
                        hidenField.setAttribute("value", val);
                        form.appendChild(hidenField);
                    }
                }
                document.body.appendChild(form);
                form.submit();
            },
            objMoveView : function(obj, url, type){ //form �쇰줈 �섏씠吏� �대룞 
                JBWRC.showLoadingSec();
                
                var meethodType = jbwrcFnc.isEmpty(type) ? "POST" : type;
                
                var form = document.createElement("form");
                form.setAttribute("onSubmit", "return false");
                form.setAttribute("id", "pageForm");
                form.setAttribute("name", "pageForm");           
                form.setAttribute("method", meethodType);
                form.setAttribute("action", url);
                jbwrcUtil.setScnId(form); // scnId 異붽�
                if(!jbwrcFnc.isEmpty(obj)){
                    var hidenField;
                    for(var key in obj ){
                        hidenField = document.createElement('input');
                        hidenField.setAttribute('type', 'hidden');
                        hidenField.setAttribute('name', key);
                        hidenField.setAttribute('value', obj[key]);
                        form.appendChild(hidenField);
                    }
                }
                document.body.appendChild(form);
                form.submit();
            },
            download : function(fileUrl, fileNm, downFileNm, uniqIdx) {
                
                var absoluteUrl = window.location.protocol + "//" + window.location.host;
                var params = {}
                params.fileUrl = fileUrl;
                params.downFileNm = downFileNm;
                params.fileNm = fileNm;
                params.uniqIdx = !jbwrcFnc.isEmpty(uniqIdx) ? uniqIdx : "";
                
                var form = document.createElement("form");
                form.setAttribute("onSubmit", "return false");
                form.setAttribute("id", "downForm");
                form.setAttribute("name", "downForm");           
                form.setAttribute("method", "POST");
                form.setAttribute("action", absoluteUrl+"/cap/fileDownload.do");
                jbwrcUtil.setScnId(form);//scrnId 異붽� 
                var hidenField;
                for(var key in params ){
                    hidenField = document.createElement('input');
                    hidenField.setAttribute('type', 'hidden');
                    hidenField.setAttribute('name', key);
                    hidenField.setAttribute('value', params[key]);
                    form.appendChild(hidenField);
                }
                document.body.appendChild(form);
                if(JBWRC.getDevice() == "IA" || JBWRC.getDevice() == "AA"){
                    var downParams = $("#downForm").serialize();
                    $("#downForm").remove();
                    //alert(downParams);
                    jbwrcUtil.fn_openPopup(absoluteUrl+"/cap/fileDownload.do?"+downParams);
                    setTimeout(function(){JBWRC.hideLoading(true);},500);
                    return false;
                }
                form.submit();
                setTimeout(function(){JBWRC.hideLoading(true);},500);
            }
    }

 // �⑤씪�� 李쎄뎄 愿��� 怨듯넻 
 var comLon = {
         // �댁옄�� 
         formatIntrt : function(arg){
             
             return arg.substring(0,4)+"%";
         },
         //怨꾩쥖踰덊샇
         formatAcno : function(_arg){
             var arg = jbwrcFnc.isEmpty(_arg) ? "" : _arg.replace(" ", "");
             var data = "";
             if(arg != "" && arg.indexOf("(") > 0){
                 var flen = (arg.indexOf("(") - 8);
                 var slen = (arg.indexOf("(") - 4);
                 data += arg.substring(0,flen)+"****"+arg.substring(slen, arg.length);
             }else{
                 var flen = (arg.length - 8);
                 var slen = (arg.length - 4);
                 data += arg.substring(0,flen)+"****"+arg.substring(slen, arg.length);
             }
             return data; 
         },
         //�꾨옒�뚯감(�쇱옄)
         fnFormatThmmPym :function (){
             var info = JONLLON.rcvTgatIqryBndInfo.rcvTgatIqryLoanInfoDto;
             var gdsLccd = info.gds_lccd;
             var dt = info.dmnd_dt;
             var nth ="";
             if(gdsLccd == '1' || gdsLccd == '2'){
                 nth = JONLLON.rcvTgatIqryBndInfo.rcvTgatIqryBndInfoDto.thmm_pym_nth;
                 dt = JONLLON.rcvTgatIqryBndInfo.rcvTgatIqryBndInfoDto.thmm_pym_dt;
             }else{
                 nth = JONLLON.rcvTgatIqryBndInfo.rcvTgatIqryLeasBndInfoDto.thmm_pym_nth;
                 dt = JONLLON.rcvTgatIqryBndInfo.rcvTgatIqryLeasBndInfoDto.thmm_pym_dt;
             }
             var result = "";
             if(nth != "" && nth != 0){
                 result = nth+"�뚯감"+" ("+dt.substr(0,4)+"-"+dt.substr(4,2)+"-"+dt.substr(6,2)+")";
             }
             return result;
         },
         // 怨듯넻 肄붾뱶�먯꽌 肄붾뱶 �ㅼ엫 媛��� �ㅺ린 
         listFilter : function (list, key, filter){
             if(list.length > 0 && !jbwrcFnc.isEmpty(filter)){
                 var data = list.filter(function(obj){
                     return obj[key] == filter
                     });
                 if(!jbwrcFnc.isEmpty(data)){
                     return data[0].codeName;
                 }   
             }else{
                 return "-"; 
             }
         },
         openLayer : function(id, defaultOpt) {
             JBWRC.showLoading();
             var lay = $('#' + id);
             lay.data('layerOpt', defaultOpt);
             JBWRC.layerPopup.open(id, defaultOpt);
             JBWRC.hideLoading(true);
         },
         nameMask :function(src) {
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else if (src.length == 2) {
                 return src.substring(0, 1) + jbwrcFnc.lPad("", 1, "*");
             } else {
                 return src.length == 3
                         ? src.substring(0, 1) + jbwrcFnc.lPad("", 2, "*")
                         : src.substring(0, 1) + jbwrcFnc.lPad("", src.length - 1, "*");
             }
         },
         emailMask : function(src){
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else {
                 var resultStr = "";
                 var pos = src.indexOf("@");
                 if (pos == 1) {
                     resultStr = src.substring(0, 1) + jbwrcFnc.lPad("", src.substring(1, pos).length, "*") + src.substring(pos);
                 } else {
                     resultStr = src.substring(0, 2) + jbwrcFnc.lPad("", src.substring(2, pos).length, "*") + src.substring(pos);
                 }

                 return resultStr;
             }
         },
         addressMask : function(src){
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else if (src.length < 8) {
                 return src;
             } else {
                 var resultStr = "";
                 var srcLastLength = src.substring(9).length > 5 ? "5" : src.substring(9).length;
                 resultStr = src.substring(0, 8) + jbwrcFnc.lPad("", srcLastLength, "*");
                 return resultStr;
             }
         },
         postNumMask : function(src) {
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else {
                 src = src.trim();
                 var tmp = ["", ""];
                 var resultStr = "";
                 var delemiter = "";
                 if (src.length > 5) {
                     if (src.indexOf("-") <= -1 && src.indexOf(" ") <= -1) {
                         resultStr = jbwrcFnc.lPad("", src.length, "*");
                     } else {
                         if (src.indexOf("-") > -1) {
                             delemiter = "-";
                         }

                         if (src.indexOf(" ") > -1) {
                             delemiter = " ";
                         }

                         tmp[0] = src.substring(0, 3);
                         tmp[1] = src.substring(3);
                         resultStr = jbwrcFnc.lPad("", tmp[0].length, "*") + delemiter + jbwrcFnc.lPad("", tmp[1].length, "*");
                     }
                 } else {
                     resultStr = jbwrcFnc.lPad("", src.length, "*");
                 }

                 return resultStr;
             }
         },
         carNumMask : function (src) {
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else {
                 var resultStr = "";
                 if (src.length > 4) {
                     resultStr = src.substring(0, src.length - 4) + jbwrcFnc.lPad("", 4, "*");
                 } else {
                     resultStr = src;
                 }

                 return resultStr;
             }
         },
         cellPhoneMask : function (src) {
             if (jbwrcFnc.isEmpty(src)) {
                 return src;
             } else {
                 var resultStr = "";
                 if (src.length > 4) {
                     resultStr = src.substring(0, src.length - 4) + jbwrcFnc.lPad("", 4, "*");
                 } else {
                     resultStr = src;
                 }

                 return resultStr;
             }
         },
         goView : function(loanno, flag, loanSeqno) {
             var form = document.createElement("form");
             form.setAttribute("onSubmit", "return false");
             form.setAttribute("id", "loanForm");
             form.setAttribute("name", "loanForm");
             form.setAttribute("method", "POST");
             
             var url = "";
             switch (flag){
                 case 1 : //�곸꽭 湲덉쑖(�꾨즺)
                     form.setAttribute("method", "GET");
                     url = "/onl/lon/JONLLON0001.do";
                     break;
                 case 2 : //�곸꽭 由ъ뒪(�꾨즺)
                     form.setAttribute("method", "GET");
                     url = "/onl/lon/JONLLON0004.do";
                     break;
                 case 3 : //�곸꽭 �뚰깉(�꾨즺)
                     form.setAttribute("method", "GET");
                     url = "/onl/lon/JONLLON0007.do";
                     break;
                 case 4 : //�좊�湲덇껐�� �덉���(�꾨즺)
                     url = "/onl/stm/JONLSTM0003.do";
                     break;
                 case 5 : //以묐룄�곹솚  �덉��� (�꾨즺)
                     url = "/onl/stm/JONLSTM0007.do";
                     break;
                 case 6 : //寃곗젣�쇰�寃� �덉��� (�꾨즺)
                     url = "/onl/stm/JONLSTM0020.do";
                     break; 
                 case 7 : //�먮룞�댁껜怨꾩쥖蹂�寃� 源�吏꾩꽦(�꾨즺)
                     url = "/onl/stm/JONLSTM0027.do";
                     break;
                 case 8 : //利됱떆異쒓툑怨꾩쥖�깅줉  �덉��� (�꾨즺)
                     url = "/onl/stm/JONLSTM0035.do";
                     break;
                 case 9 : //�쒕쪟諛쒓툒 �뺣���(�꾨즺)
                     url = "/onl/dcm/JONLDCM0001.do";
                     break;
                 case 10 : // 泥�뎄吏�蹂�寃� (�꾨즺)
                     url = "/onl/lon/JONLLON0011.do";
                     break; 
                 case 11 : // �낃툑�댁뿭議고쉶 (�꾨즺)
                     url = "/onl/stm/JONLSTM0040.do";
                     break;
                 case 12 : // 媛��곴퀎醫뚮�寃� (�꾨즺)
                     url = "/onl/stm/JONLSTM0024.do";
                     break
                 case 13 : // 誘몃궔�댁뿭議고쉶 (�꾨즺)
                     url = "/onl/stm/JONLSTM0043.do";
                     break       
                 case 14 : // 誘몃궔�댁뿭�곸꽭議고쉶 (�꾨즺)
                     url = "/onl/stm/JONLSTM0044.do";
                     break 
                 default :
                     url = "N";
                     break;
                 
             }
             if(url == "N"){
                 return // url�� �놁쑝硫� 由ы꽩 
             }
             if($("#menuArea").length > 0 && $("#menuArea").hasClass("on")){
                 JBWRC.layerPopup.close('menuArea');
             }
             form.setAttribute("action", url);
             jbwrcUtil.setScnId(form); // scnId 異붽�
             var obj = { // TODO:1李� �앸굹怨� �곸꽭濡� �대룞�쒗궗�� �먮룞�댁껜怨꾩쥖蹂�寃� loanSeqno�꾩슂
                     "loanno" : String(loanno)
                     ,"loan_seqno" : String(loanSeqno)
             };
             for(var key in obj ){
                 var val = String(obj[key]);
                 hidenField = document.createElement('input');
                 hidenField.setAttribute('type', 'hidden');
                 hidenField.setAttribute('name', key);
                 hidenField.setAttribute('value', val);
                 form.appendChild(hidenField);
             }
             document.body.appendChild(form);
             setTimeout(function(){form.submit();}, 300); // �앹뾽 �ロ엳�� �먮땲硫붿씠�� �뚮Ц�� 
             
         },
         setPopMenu : function (loanno, flag, dpFlag, loanRlcd, showFlag, loanSeqno, gdsCd, bzopDprmNm, mgdpTlno, endYn){
             var listText = "";

             listText += '<div class="layer-popup-wrap small" id="menuArea" > ';
             listText +=     '<div class="layer-popup-container">';
             listText +=         '<div class="layer-popup-header">�낅Т�좏깮</div>';
             listText +=         '<div class="layer-popup-body con">';
             listText +=             '<section class="onl_pop">';
             listText +=                 '<div class="menuArea" id="popMenuList"> ';
             listText +=                   '<ul>';
             var menuList = [];
             if(endYn == "Y"){ // 醫낅즺�� �곹뭹 
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', '+flag+', \''+String(loanSeqno)+'\')">��異쒖긽�몄“��</a></li>');
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 9, \''+String(loanSeqno)+'\')">�쒕쪟諛쒓툒</a></li>');
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 11, \''+String(loanSeqno)+'\')">�낃툑�댁뿭議고쉶</a></li>');
             }else{
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', '+flag+', \''+String(loanSeqno)+'\')">��異쒖긽�몄“��</a></li>');
                 if(loanRlcd == "1"){
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 4, \''+String(loanSeqno)+'\')">�좊�湲덇껐��</a></li>');
                     if(flag == 1){
                         menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 5, \''+String(loanSeqno)+'\')">以묐룄�곹솚</a></li>'); 
                     }
                     if(gdsCd == "22210005"){
                         menuList.push('<li><a href="javascript: comLon.changeDayAlert(\''+String(bzopDprmNm)+'\', \''+String(mgdpTlno)+'\')">寃곗젣�쇰�寃�</a></li>');
                     }else{
                         menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 6, \''+String(loanSeqno)+'\')">寃곗젣�쇰�寃�</a></li>');
                     }
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 7, \''+String(loanSeqno)+'\')">�먮룞�댁껜怨꾩쥖蹂�寃�</a></li>');
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 8, \''+String(loanSeqno)+'\')">利됱떆異쒓툑怨꾩쥖�깅줉</a></li>');
                 }
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 9, \''+String(loanSeqno)+'\')">�쒕쪟諛쒓툒</a></li>');
                 if(loanRlcd == "1"){
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 10, \''+String(loanSeqno)+'\')">泥�뎄吏�愿�由�</a></li>');
                 }
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 11, \''+String(loanSeqno)+'\')">�낃툑�댁뿭議고쉶</a></li>');
             }
             
             for(var i in menuList){
                 if(loanRlcd != "1"){
                     if(!(!jbwrcFnc.isEmpty(dpFlag) && Number(dpFlag) == 0 && (0 == i))){ // �곸꽭 �멸꼍�� 
                         listText +=  menuList[i];
                     }
                 }else if(jbwrcFnc.isEmpty(dpFlag) || (Number(dpFlag) != i)){
                     listText +=  menuList[i];
                 }
             }
             listText +=                   '</ul>';
             listText +=                 '</div>';
             listText +=             '</section>';
             listText +=         '</div>';
             listText +=         '<div class="layer-popup-footer"></div>';
             listText +=         '<button type="button" class="l-p-b-close small">�リ린</button>';
             listText +=      '</div>';
             listText += '</div>';
             if($("#menuArea").length > 0){
                 $("#menuArea").remove();
                 $('body').append(listText); 
             }else{
                 $('body').append(listText); 
             }
             if(showFlag == "Y"){
                 setTimeout(function(){comLon.openLayer('menuArea');}, 100);
             }else{
                 $(document).off("click.menuBtn", '.menuBtn').on("click.menuBtn", '.menuBtn', function(e){
                     comLon.openLayer('menuArea');
                 });
             }
             
         },
         setPcMenu : function(loanno, flag, dpFlag, loanRlcd, loanSeqno, gdsCd, bzopDprmNm, mgdpTlno){
             var listText = "";
             listText +=  '<ul>';            
             var menuList = [];
             menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', '+flag+', \''+String(loanSeqno)+'\')">��異쒖긽�몄“��</a></li>');
             if(loanRlcd == "1"){
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 4, \''+String(loanSeqno)+'\')">�좊�湲덇껐��</a></li>');
                 if(flag == 1){
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 5, \''+String(loanSeqno)+'\')">以묐룄�곹솚</a></li>');  
                 }
                 if(gdsCd == "22210005"){
                     menuList.push('<li><a href="javascript: comLon.changeDayAlert(\''+String(bzopDprmNm)+'\', \''+String(mgdpTlno)+'\')">寃곗젣�쇰�寃�</a></li>');
                 }else{
                     menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 6, \''+String(loanSeqno)+'\')">寃곗젣�쇰�寃�</a></li>');
                 }
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 7, \''+String(loanSeqno)+'\')">�먮룞�댁껜怨꾩쥖蹂�寃�</a></li>');
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 8, \''+String(loanSeqno)+'\')">利됱떆異쒓툑怨꾩쥖�깅줉</a></li>');
             }
             menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 9, \''+String(loanSeqno)+'\')">�쒕쪟諛쒓툒</a></li>');
             if(loanRlcd == "1"){
                 menuList.push('<li><a href="javascript: comLon.goView(\''+String(loanno)+'\', 10, \''+String(loanSeqno)+'\')">泥�뎄吏�愿�由�</a></li>');
             }
             for(var i in menuList){
                 if(loanRlcd != "1"){
                     if(!(!jbwrcFnc.isEmpty(dpFlag) && Number(dpFlag) == 0 && (0 == i))){ // �곸꽭 �멸꼍�� 
                         listText +=  menuList[i];
                     }
                 }else if(jbwrcFnc.isEmpty(dpFlag) || (Number(dpFlag) != i)){
                     listText +=  menuList[i];
                 }
             }
             listText +=  '</ul>';
             $("#menuList").html(listText);
             $(document).off("click.menuBtn", '.menuBtn').on("click.menuBtn", '.menuBtn', function(e){
                 setTimeout(function(){
                     if($('[data-name="tooltip_con1"]').hasClass("on")){
                         $('[data-name="tooltip_con1"]').removeClass("on");
                         $('[data-name="tooltip_con1"]').hide();
                     }else{
                         $('[data-name="tooltip_con1"]').addClass("on");
                         $('[data-name="tooltip_con1"]').show();
                     }
                     }, 50);
             });
             $(document).off("click.menuBtn", 'body').on("click.menuBtn", 'body', function(e){
                 if(!$(e.target).hasClass("menuArea") && !$(e.target).hasClass("menuBtn")){
                     if($('[data-name="tooltip_con1"]').hasClass("on")){
                         $('[data-name="tooltip_con1"]').removeClass("on");
                         $('[data-name="tooltip_con1"]').hide();
                     }  
                 }
             });
         },
         commaWon : function(args){
             return jbwrcUtil.dateUtil.dateFormat( args , 'won');
         },
         isName : function(src){
             var regName = /^[媛�-��]{2,}$/;
             return regName.test(src);
         },
         isEmail : function(src){
             var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_\.-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
             return regEmail.test(src);
         },
         isHangleNum : function(src){ // �쒓� + �レ옄 or �쒓�
             var id = jbwrcFnc.isEmpty(src) ? "" : src;
             var regHangleNum = /^[媛�-��0-9+]*$/; //�쒓� �レ옄 
             var regNum = /^[0-9+]*$/;
             return !regNum.test(id) && regHangleNum.test(id);
         },
         isEngNum : function(src){ // �곷Ц + �レ옄 or �곷Ц
             var id = jbwrcFnc.isEmpty(src) ? "" : src;
             var regEngNum = /^[A-Za-z0-9+]*$/;
             var regNum = /^[0-9+]*$/;
             return !regNum.test(id) && regEngNum.test(id);
         },
         isPhone : function(src){
             src = src.split("-").join("");
             var regPhone = /^(01[0|1|6|9|7])\d{4}\d{4}$/;
             if(src.length >= 10 && src.substr(0, 3) != "010"){
                 regPhone = /^(01[1|6|9|7])\d{3}\d{4}$/;
             }
             return regPhone.test(src);
         },
         isTel : function(src){
             src = src.split("-").join("");
             var regTel = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4,5}$/; //12�먮━媛��덈뒗吏��� 紐⑤Ⅴ寃좎�留� 湲고쉷�섎룄
             if(src.substr(0, 3) == "010"){
                 regTel = /^(01[0|1|6|9|7])\d{4}\d{4}$/;
                 $("#bsntelNo").attr("maxlength", "11");
             }else{
                 $("#bsntelNo").attr("maxlength", "12");
             }
             return regTel.test(src);
         },
         // �몃뱶�� �섏씠�� 異붽� 諛� �쒓굅 
         hipenPh : function(src, numYn){
             var rData = src;
             if(numYn == "N" && rData.length > 0){ // �レ옄留� �꾩슂 �좊븣
                 rData = rData.replace(/[^0-9]/g, ""); 
                 return rData;
             }else if(rData.length > 7){ // �섏씠�� �ｌ쓣��
                 rData = rData.replace(/[^0-9]/g, ""); 
                 rData = rData.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
                 return rData;
             }else{
                 return rData;
             }
         },
         makeView : function(info, list, $id){
             var infoTxt = '';
             for(var i in list){
                 var obj = list[i];
                 //infoTxt += '<li><em>'+obj.titl+'</em><span>'+jbwrcUtil.dateUtil.dateFormat(info[obj.key], obj.type)+'</span></li>'
                 infoTxt += '<li><span class="label" data-lang="">'+obj.titl+'</span>';
                 infoTxt += '<p class="cont"><strong>'+jbwrcUtil.dateUtil.dateFormat(info[obj.key], obj.type)+'</strong></p></li>'
             }
             $id.html(infoTxt);
         },
         makePopView : function(info, list){
             var infoTxt = '';
             infoTxt += '           <div class="list-wrap">';
             infoTxt += '                <ul class="view-list between">';
             for(var i in list){
                 var obj = list[i];
                 if(jbwrcFnc.isEmpty(obj.key)){
                     infoTxt += '                   <li data-lang="">';
                     infoTxt += '                        <span class="label">'+obj.titl+'</span>';
                     infoTxt += '                    </li>';
                 }else{
                     if(obj.titl == "怨�"){
                         infoTxt += '                   <li data-lang="" class="total">';
                     }else{
                         infoTxt += '                   <li data-lang="">';
                     }
                     infoTxt += '                        <span class="label">'+obj.titl+'</span>';
                     infoTxt += '                        <p class="cont">';
                     infoTxt += '                            <strong>'+jbwrcUtil.dateUtil.dateFormat(info[obj.key], obj.type)+'</strong>';
                     infoTxt += '                        </p>';
                     infoTxt += '                    </li>';

                 }
             }
             infoTxt += '               </ul>';
             infoTxt += '            </div>';
             return  infoTxt;
         },
         makeNewPopView : function(info, list, title, classNm){
             var infoTxt = '';
             infoTxt += '       <div class="card-list">';
             infoTxt += '            <p class="'+classNm+'">'+title+'</p>';
             infoTxt += '            <ul class="view-list between mt13">';
             for(var i in list){
                 var obj = list[i];
                 infoTxt += '               <li>';
                 infoTxt += '                    <span class="label" data-lang="">'+obj.titl+'</span>';
                 infoTxt += '                    <p class="cont">';
                 infoTxt += '                        <strong>'+jbwrcUtil.dateUtil.dateFormat(info[obj.key], obj.type)+'</strong>';
                 infoTxt += '                    </p>';
                 infoTxt += '                </li>';
                          
             }
             infoTxt += '           </ul>';
             infoTxt += '        </div>';
             return  infoTxt;
         },
         makeDePopView : function(info, list){
             var infoTxt = '';
             infoTxt +='            <div class="list-wrap">';
             infoTxt +='             <ul class="view-list between">';
             for(var i in list){
                 var obj = list[i];
                 if(obj.titl == "怨�"){
                     infoTxt += '                   <li data-lang="" class="total">';
                 }else{
                     infoTxt += '                   <li data-lang="">';
                 }
                 infoTxt +='                     <span class="label">'+obj.titl+'</span>';
                 infoTxt +='                     <p class="cont">';
                 infoTxt +='                         <strong>'+jbwrcUtil.dateUtil.dateFormat(info[obj.key], obj.type)+'</strong>';
                 infoTxt +='                     </p>';
                 infoTxt +='                 </li>';

             }   
             infoTxt +='                </ul>';
             infoTxt +='         </div>';
             return  infoTxt;
         },
         checkValid : function(){
             jbwrcUtil.setInlineErr("", "");
             if($("[data-checking]").length > 0){
                 for(var i=0; $("[data-checking]").length > i; i++){
                     var $this = $("[data-checking]").eq(i);
                     if(jbwrcFnc.isEmpty($this.data("checking"))){ // �뗮똿 �덈맂寃쎌슦 �⑥뒪 
                         return;
                     }
                     var id = "#"+$this.data("checking");
                     var checkType = $this.data("checking").toLocaleLowerCase();
                     if(checkType.indexOf("select") >= 0){
                         $(id).off("click.chkValidChk").on("click.chkValidChk", function(){
                             $(".type-error").hide();
                             var checkValue = $("option:selected", this).val();
                             
                             if($(this).attr("id") == "bsnRelaSelect" && checkValue == "01"){
                                 $("#bsnUserName").val(JONLLON.userInfo.memberData.userNm).parents('.input-con').addClass('has-val');
                                 $("#bsnUserName").prop("disabled", true).siblings(".btn-ico-clear").addClass("hidden");
                             }else if($(this).attr("id") == "bsnRelaSelect"){
                                 $("#bsnUserName").val("").parents('.input-con').removeClass("is_val");
                                 $("#bsnUserName").prop("disabled", false).siblings(".btn-ico-clear").removeClass("hidden");
                             } 
                             
                             if(jbwrcFnc.isEmpty(checkValue)){  // �듯솕 媛��� �쒓컙�� 
                                 $(id +"_ilnErr").show();
                                 $("#agreeBtn").prop("disabled", true);
                                 return;
                             }else{
                                 if(typeof checkViewInput == "function"){
                                     checkViewInput();
                                 }
                             }
                         });
                         $(id).off("change.chkValidChk").on("change.chkValidChk", function(){
                             $(".type-error").hide();
                             var checkValue = $("option:selected", this).val();
                             if($(this).attr("id") == "bsnRelaSelect" && checkValue == "01"){
                                 $("#bsnUserName").val(JONLLON.userInfo.memberData.userNm).parents('.input-con').addClass('has-val');
                                 $("#bsnUserName").prop("disabled", true).siblings(".btn-ico-clear").addClass("hidden");
                             }else if($(this).attr("id") == "bsnRelaSelect"){
                                 $("#bsnUserName").val("").parents('.input-con').removeClass('has-val');
                                 $("#bsnUserName").prop("disabled", false).siblings(".btn-ico-clear").removeClass("hidden");
                             } 
                             if(jbwrcFnc.isEmpty(checkValue)){  // �듯솕 媛��� �쒓컙�� 
                                 $(id +"_ilnErr").show();
                                 $("#agreeBtn").prop("disabled", true);
                                 return;
                             }else{
                                 $(id +"_ilnErr").hide();
                                 if(typeof checkViewInput == "function"){
                                     checkViewInput();
                                 }
                             }
                         });
                     }else if(checkType.indexOf("check") >= 0){ // 泥댄겕 諛뺤뒪 
                         $(id).off("change").on("change", function(){
                             if(typeof checkViewInput == "function"){
                                 checkViewInput();
                             }
                         });
                     }else if(checkType.indexOf("radio") >= 0){
                         $(id).off("click.chkValidRadio").on("click.chkValidRadio", function(){
                             $(".type-error").hide();
                             var name = $(this).attr("id");
                             var checkValue = $('input[name="'+name+'"]:checked').val();
                             if(jbwrcFnc.isEmpty(checkValue)){  // �듯솕 媛��� �쒓컙�� 
                                 $(id +"_ilnErr").show();
                                 $("#agreeBtn").prop("disabled", true);
                                 return;
                             }else if(checkValue == "3" && name == "userTypeRadio" ){
                                 $('input[name="userTypeRadio"]').prop('checked', false);
                                 JBWRC.alert( "�밴퀎�덉젙�먭� 媛쒖씤/媛쒖씤�ъ뾽�먯씤 寃쎌슦留� 媛��ν빀�덈떎.", {
                                     okBtnText: '�뺤씤',
                                     cancelBtnText: '',
                                     okCallback: function(opt){}
                                 }); 
                             }else{
                                 if(typeof checkViewInput == "function"){
                                     checkViewInput();
                                 }
                             }
                         });
                     }else if(checkType.indexOf("date") >= 0){
                         $(id).off("change.chkValidDate").on("change.chkValidDate", function(e){
                             e.preventDefault();
                             $(".type-error").hide();
                             var $this = $(this);
                             var flag = $this.attr("id");
                             var selDate = $this.val().replace(".","").replace(".","");
                             if(jbwrcFnc.isEmpty(selDate)){
                                 $("#" + flag +"_ilnErr").show();
                                 $("#agreeBtn").prop("disabled", true);
                                 return;
                             }
                             var typeDate = $("#contDate").attr("typeDate");
                             //var max = moment(JONLLON.CCTRAM1801RO.lastRealDt).format("YYYY.MM.DD");
                             var max = moment(JONLLON.CCTRAM1801RO.lastRealDt);
                             var maxChkeDate = $("#contDate").attr("maxdate");
                             maxChkeDate = maxChkeDate.replace(".","").replace(".","");
                             if(flag == "bsnContDate"){
                                 //max = JONLLON.CCTRAM1801RO.lastRealDt;
                                 maxChkeDate = $("#bsnContDate").attr("maxdate");
                                 maxChkeDate = maxChkeDate.replace(".","").replace(".","");
                                 typeDate = $("#bsnContDate").attr("typeDate");
                             };
                             var checkDate = moment(selDate).format("YYYYMMDD");
                             jbwrcUtil.getWorkList(checkDate, function(copyWorkList, clsn_dt, holi_dt, today_all_clsn_dt ){
                                 if(moment(maxChkeDate).isSame(selDate) && !clsn_dt.includes(checkDate)){ // 留뚭린�쇱씤 �섏뼱�� 31�� �댄븯 �� 寃쎌슦 
                                     $("#" + flag +"_ilnErr").show();
                                     $('input[name="bsnCancelRadio"]').prop("checked", false);
                                     $('input[name="cancelRadio"]').prop("checked", false);
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else if((!moment(max).isSame(selDate) || !moment(maxChkeDate).isSame(selDate)) && !clsn_dt.includes(checkDate)){ // 留뚭린�쇨낵 �ㅻⅨ 寃쎌슦
                                     $("#" + flag +"_ilnErr").show();
                                     $('input[name="bsnCancelRadio"]').prop("checked", false);
                                     $('input[name="cancelRadio"]').prop("checked", false);
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else{
                                  // 留뚭린 �꾩씪 源뚯��� 
                                     var diffbool = moment(max).diff(moment(selDate), "days") >= 1 ? true : false;
                                     if(diffbool){  // �듯솕 媛��� �쒓컙�� 
                                         if(!jbwrcFnc.isEmpty(typeDate) && typeDate == "N"){ // �뚰듃�� 寃쎌슦  typeDate N�대㈃ 以묐룄
                                             if(flag == "bsnContDate"){ // �꾨땲��
                                                 $('[data-bsn-date="N"]input[name="bsnCancelRadio"]').prop('checked', true); // 以묐룄
                                             }else{
                                                 $('[data-cont-date="N"]input[name="cancelRadio"]').prop('checked', true); // 以묐룄
                                             }
                                         }else{
                                             if(flag == "bsnContDate"){ // �꾨땲��
                                                 $('[data-bsn-date="N"]input[name="bsnCancelRadio"]').prop('checked', true); // 以묐룄
                                             }else{
                                                 $('[data-cont-date="N"]input[name="cancelRadio"]').prop('checked', true); // 以묐룄
                                             }
                                         }
                                         
                                     }else{
                                         if(!jbwrcFnc.isEmpty(typeDate) && typeDate == "N"){// 留뚭린 
                                             if(flag == "bsnContDate"){ // �꾨땲��
                                                 $('[data-bsn-date="Y"]input[name="bsnCancelRadio"]').prop('checked', true); // 留뚭린
                                             }else{
                                                 $('[data-cont-date="Y"]input[name="cancelRadio"]').prop('checked', true); // 留뚭린
                                             }
                                         }else{
                                             if(flag == "bsnContDate"){ // �꾨땲��
                                                 $('[data-bsn-date="Y"]input[name="bsnCancelRadio"]').prop('checked', true); // 留뚭린
                                             }else{
                                                 $('[data-cont-date="Y"]input[name="cancelRadio"]').prop('checked', true); // 留뚭린
                                             }
                                         }
                                     }
                                     if(typeof checkViewInput == "function"){
                                         checkViewInput();
                                     }
                                 }
                             }, "one"); 
                         });
                     }else{
                         $(id).off("blur.chkValid").on("blur.chkValid", function(){
                             $(".type-error").hide();
                             var $this = $(this);
                             var flag = $this.attr("id");
                             var checkValue = $(this).val(); 
                             var type = $(this).attr("id").toLocaleLowerCase(); 
                             if(type.indexOf("date") >= 0){
                                 if(jbwrcFnc.isEmpty(checkValue) && checkValue.length != 8){ 
                                     $("#" + flag +"_ilnErr").show();
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else{
                                     if(typeof checkViewInput == "function"){
                                         checkViewInput();
                                     }
                                 }
                             }else if(type.indexOf("name") >= 0){
                                 if(!comLon.isName(checkValue) && JONLLON.userInfo.memberData.custTycd == "1"){ 
                                     $("#" + flag +"_ilnErr").show();
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else if(jbwrcFnc.isEmpty(checkValue)){
                                     $("#" + flag +"_ilnErr").show();
                                    $("#agreeBtn").prop("disabled", true);
                                    return;             
                                 }else{
                                     if(typeof checkViewInput == "function"){
                                         checkViewInput();
                                     }
                                 }
                             }else if(type.indexOf("telno") >= 0){
                                 if(!comLon.isTel(checkValue)){  
                                     $("#" + flag +"_ilnErr").show();
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else{
                                     var $id = $(this);
                                     setTimeout(function(){
                                         var phNum = comLon.hipenPh($id.val());
                                         //$id.attr("type", "text");
                                         $id.val(phNum);
                                         if(typeof checkViewInput == "function"){
                                             checkViewInput();
                                         }
                                         }, 100);
                                 }
                             }else if(type.indexOf("phone") >= 0){
                                 if(!comLon.isPhone(checkValue)){ 
                                     $("#" + flag +"_ilnErr").show();
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else{
                                     // 2021-03-11 �섏씠�� �쒓굅 �� tel濡�  ���� 蹂�寃� �붿껌 
                                     var $id = $(this);
                                     setTimeout(function(){
                                         var phNum = comLon.hipenPh($id.val());
                                         //$id.attr("type", "text");
                                         $id.val(phNum);
                                         if(typeof checkViewInput == "function"){
                                             checkViewInput();
                                         }
                                         }, 100);
                                     
                                 }
                             }else{
                                 if(jbwrcFnc.isEmpty(checkValue) && !(type.indexOf("radio") >= 0)){ 
                                     $("#" + flag +"_ilnErr").show();
                                     $("#agreeBtn").prop("disabled", true);
                                     return;
                                 }else{
                                     if(typeof checkViewInput == "function"){
                                         checkViewInput();
                                     }
                                 }
                             }
                         });
                         // 2021-03-11 �섏씠�� �쒓굅 �� tel濡�  ���� 蹂�寃� �붿껌 
                         if(checkType.indexOf("phone") >= 0 || checkType.indexOf("telno") >= 0){
                             $(document).off("focus.telType", id).on("focus.telType", id, function(){
                                 var checkValue = comLon.hipenPh($(this).val(), "N");
                                 //$(this).attr("type", "number");
                                 $(this).val(checkValue);
                             });
                         };
                         
                         $(id).off('keyup.comPop').on('keyup.comPop', function(e) {
                             if ( e.keyCode == '13' ) {
                                 checkViewInput();
                             }
                         });
                     }
                 }
             }
         },
         checkInput: function(okObj, popCheckYn, popSucsYn){ // CCTRAM1802WI set
             $(".type-error").hide();
             var continYn = "Y";
             $("#agreeBtn").prop("disabled", false);
             var list = Object.values(okObj);
             var setCodeList = Object.keys(okObj);
            
             for(var i in list){
                 var code = setCodeList[i];
                 var id = "#"+list[i];
                 var type = list[i].toLocaleLowerCase();
                 var value = "";
                 $(id+"_ilnErr").hide();
                 if(type.indexOf("select") >= 0){
                     value = $(id + " option:selected").val();
                     if(jbwrcFnc.isEmpty(value)){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"]').attr("tabindex", 0).focus();
                         $("#agreeBtn").prop("disabled", true);
                         break;
                     }
                 }else if(type.indexOf("radio") >= 0){
                     value = $('input[name="'+list[i]+'"]:checked').val(); 
                     if(jbwrcFnc.isEmpty(value)){  
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"]').attr("tabindex", 0).focus();
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();
                         break;
                     }
                 }else if(type.indexOf("date") >= 0){
                     value = $(id).val().split(".").join("");
                     console.log("value : " + value)
                     if(jbwrcFnc.isEmpty(value) && value.length != 8){ 
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"]').attr("tabindex", 0).focus();
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();
                         break;
                     }
                 }else if(type.indexOf("name") >= 0){
                     value = $(id).val();
                     if(!comLon.isName(value) && JONLLON.userInfo.memberData.custTycd == "1"){ 
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"] label').trigger("click");
                         //setTimeout(function(){$('[data-checking="'+list[i]+'"] input').focus();}, 300);
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();;
                         break;
                     }else if(jbwrcFnc.isEmpty(value)){
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"] label').trigger("click");
                         //setTimeout(function(){$('[data-checking="'+list[i]+'"] input').focus();}, 300);
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();;
                         break;
                     }
                 }else if(type.indexOf("phone") >= 0){
                     value = $(id).val().split("-").join("");
                     if(!comLon.isPhone(value)){ 
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"] label').trigger("click");
                         //setTimeout(function(){$('[data-checking="'+list[i]+'"] input').focus();}, 300);
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();
                         break;
                     }
                 }else if(type.indexOf("telno") >= 0){
                     value = $(id).val();
                     if(!comLon.isTel(value)){ 
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"] label').trigger("click");
                         //setTimeout(function(){$('[data-checking="'+list[i]+'"] input').focus();}, 300);
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();
                         break;
                     }
                 }else{
                     value = $(id).val();
                     if(jbwrcFnc.isEmpty(value)){
                         continYn = "N";
                         //$('[data-checking="'+list[i]+'"] label').trigger("click");
                         //setTimeout(function(){$('[data-checking="'+list[i]+'"] input').focus();}, 300);
                         $("#agreeBtn").prop("disabled", true);
                         $(id+"_ilnErr").show();
                         break;
                     }
                 }
                 
             }
             if(popSucsYn == "Y"){ // 怨꾩빟 �밴퀎 popCheckYn --> �ш린�� �밴퀎 ���곸옄 Y N
                 if(continYn != "N" && popCheckYn == "Y" && (!$("#popCheckSucs00").prop("checked") || !$("#popCheckSucs01").prop("checked"))){
                     //$("#popCheckSucs00").focus();
                     continYn = "N";
                     $("#agreeBtn").prop("disabled", true);
                 }else if(continYn != "N" && popCheckYn == "N" && (!$("#popCheckSucs02").prop("checked") || !$("#popCheckSucs03").prop("checked"))){
                     //$("#popCheckSucs02").focus();
                     continYn = "N";
                     $("#agreeBtn").prop("disabled", true);
                 }
                 if(continYn != "N"){
                     $("#agreeBtn").prop("disabled", false);
                 }
             }else{ // �섎㉧吏� 蹂�寃� �좎껌 
                 if(continYn != "N" && popCheckYn == "Y" && !$("#popCheck").prop("checked")){
                     //$("#popCheck").focus();
                     continYn = "N";
                     $("#agreeBtn").prop("disabled", true);
                 }
                 
                 if(continYn != "N"){
                     $("#agreeBtn").prop("disabled", false);
                 }
             }
         },
         radioYnBtn: function(flag){
             if(flag == "cont"){
                 $(document).off("change.radioYn", "input[name=radioYn]").on("change.radioYn", "input[name=radioYn]", function(e){
                     e.stopImmediatePropagation();
                     comLon.secondPopInit();// 珥덇린�� 
                     if($(this).val() == "Y"){
                         $('input[value="Y"]').prop("checked", true);
                     }else{
                         $('input[value="N"]').prop("checked", true);
                     }
                     $(".type-error").hide();
                     $("#agreeBtn").prop("disabled", true);
                     //�밴퀎紐⑹쟻
                     var sucsList = JONLLON.userInfo.codeData.sucsList; 
                     var sucsTxt = '<option value="" data-lang="">�좏깮�댁＜�몄슂.</option>';
                     for(var i in sucsList){
                         if(!(sucsList[i].codeName.indexOf("踰뺤씤") >= 0)){
                             sucsTxt += '<option value="'+sucsList[i].code+'" data-lang="">'+sucsList[i].codeName+'</option>';
                         }
                     }
                     $("#userSucSelect").html(sucsTxt);
                     $("#userSucSelect option:eq(0)").prop("selected", true);
                     jbwrcUtil.changeMbSelectPop("userSucSelect");
                     //setTimeout(function(){$('#userSucSelect').val('');}, 100);
                     //�밴퀎紐⑹쟻
                     //�듯솕媛��� �쒓컙��
                     var tlclList = JONLLON.userInfo.codeData.tlclList; //蹂몄씤怨쇱쓽 愿�怨�
                     var tlclTxt = "";//'<option value="">�좏깮�댁＜�몄슂.</option>';
                     for(var i in tlclList){
                         tlclTxt += '<option value="'+tlclList[i].code+'" data-lang="">'+tlclList[i].codeName+'</option>';
                     }
                     $("#userTimeSelect").html(tlclTxt); // 蹂몄씤 
                     $("#userTimeSelect option:eq(0)").prop("selected", true);
                     jbwrcUtil.changeMbSelectPop("userTimeSelect");
                     //setTimeout(function(){$('#userTimeSelect').val('0');}, 100);
                   //�듯솕媛��� �쒓컙��
                     if(JONLLON.userInfo.memberData.custTycd == "3"){ // 踰뺤씤 
                         // 踰뺤씤 
                         if(JONLLON.userInfo.memberData.phoneList.length >= 1){
                             var list = JONLLON.userInfo.memberData.phoneList;
                             var htmlTxt = '<option value="" data-lang="">�좏깮�댁＜�몄슂.</option>';
                             for(var i in list){
                                 htmlTxt += '<option value="'+i+'" data-lang="">'+list[i]+'</option>';
                             }
                             $("#sucsPhoneSelect").html(htmlTxt);
                             $("#sucsPhoneSelect option:eq(0)").prop("selected", true);
                             jbwrcUtil.changeMbSelectPop("sucsPhoneSelect");
                             //setTimeout(function(){$('#sucsPhoneSelect').val('');}, 100);
                         }else{
                             $("[data-user-phone]").show();
                             $('[data-checking="sucsPhone"]').removeClass("disabled");
                             $("#sucsPhone").attr("type", "tel");
                             $("#sucsPhone").prop("disabled", false);
                             JONLLON.userInfo.memberData.delegetePhone = "";
                         }
                         // 踰뺤씤 
                         
                     }else{
                         // 蹂몄씤 
                         $("[data-user-phone]").show();
                      // �꾨땲�ㅼ뿉�� �ъ슜�� �꾪솕 踰덊샇 
                         if(!jbwrcFnc.isEmpty(JONLLON.userInfo.memberData.delegetePhone)){ // 踰덊샇媛� �덈뒗 寃쎌슦 
                             $("#sucsPhone").attr("type", "tel");
                             $("#sucsPhone").attr("value", JONLLON.userInfo.memberData.delegetePhone);
                             $("#sucsPhone").val(JONLLON.userInfo.memberData.delegetePhone);
                             //$("#sucsPhone").parent().addClass("acting");
                             $("#sucsPhone").parent().parent().addClass("disabled");
                         }else{
                             $("#sucsPhone").prop("disabled", false);
                             JONLLON.userInfo.memberData.delegetePhone = "";
                         }
                         // 蹂몄씤 
                     }
                     // valid 梨꾪겕 
                     comLon.checkValid();
                     return false;
                 });
             }else if(flag == "cancel"){
                 $(document).off("change.radioYn", "input[name=radioComYn]").on("change.radioYn", "input[name=radioComYn]", function(e){
                     e.stopImmediatePropagation();
                     $("#contDate").off("change.chkValidDate");
                     $("#bsnContDate").off("change.chkValidDate");
                     $("#contDate").val("");//�щ젰 珥덇린��
                     $("#bsnContDate").val("");//�щ젰 珥덇린��
                     comLon.secondPopInit("Y", JONLLON.CCTRAM1801RO.lastDt, "", "Y");// 珥덇린�� 
                     $("[data-cont-close]").show();
                     if($(this).val() == "Y"){
                         $('input[value="Y"]').prop("checked", true);
                     }else{
                         $('input[value="N"]').prop("checked", true);
                     }
                     $(".type-error").hide();
                     $("#agreeBtn").prop("disabled", true);
                     comLon.setPopCommonCodeList();// �좎껌 怨듯넻 ��ぉ �뗮똿 
                     // valid 梨꾪겕 
                     comLon.checkValid();
                     return false;
                 });
             }else if(flag == "cancelNo"){
                 $(document).off("change.radioYn", "input[name=radioComYn]").on("change.radioYn", "input[name=radioComYn]", function(e){
                     e.stopImmediatePropagation();
                     $("#contDate").off("change.chkValidDate");
                     $("#bsnContDate").off("change.chkValidDate");
                     $("#contDate").val("");//�щ젰 珥덇린��
                     $("#bsnContDate").val("");//�щ젰 珥덇린��
                     comLon.secondPopInit("Y", JONLLON.CCTRAM1801RO.lastDt, "rent", "Y");// 珥덇린�� 
                     $("[data-cont-close]").show();
                     if($(this).val() == "Y"){
                         $('input[value="Y"]').prop("checked", true);
                     }else{
                         $('input[value="N"]').prop("checked", true);
                     }
                     $(".type-error").hide();
                     $("#agreeBtn").prop("disabled", true);
                     comLon.setPopCommonCodeList();// �좎껌 怨듯넻 ��ぉ �뗮똿 
                     // valid 梨꾪겕 
                     comLon.checkValid();
                     return false;
                 });
             }else{
                 $(document).off("change.radioYn", "input[name=radioComYn]").on("change.radioYn", "input[name=radioComYn]", function(e){
                     e.stopImmediatePropagation();
                     comLon.secondPopInit("Y");// 珥덇린�� 
                     $(".type-error").hide();
                     if($(this).val() == "Y"){
                         $('input[value="Y"]').prop("checked", true);
                         checkViewInput();
                     }else{
                         $('input[value="N"]').prop("checked", true);
                     }
                     $("#agreeBtn").prop("disabled", true);
                     comLon.setPopCommonCodeList();// �좎껌 怨듯넻 ��ぉ �뗮똿 
                     // valid 梨꾪겕 
                     comLon.checkValid();
                     if($(this).val() == "Y" && JONLLON.userInfo.memberData.custTycd == "1"){ // 醫낆씪 �좏깮 湲곕낯�쇰줈 �섍퀬 �낅젰 踰꾪듉 �쒖꽦�붾� �꾪븯�� 
                         checkViewInput();
                     }
                     return false;
                 });
             }
             
         },
         setInput: function(okObj, popCheckYn, popSucsYn){ // CCTRAM1802WI set
             $(".type-error").hide();
             jbwrcUtil.setInlineErr("", "");
             var continYn = "Y";
             var list = Object.values(okObj);
             var setCodeList = Object.keys(okObj);
             for(var i in list){
                 var code = setCodeList[i];
                 var id = "#"+list[i];
                 var type = list[i].toLocaleLowerCase();
                 var value = "";
                 if(type.indexOf("select") >= 0){
                     if(type.indexOf("phone") >= 0){// 踰뺤씤 踰덊샇 
                         value = $(id + " option:selected").text().split("-").join("");
                         if(jbwrcFnc.isEmpty(value)){ 
                             $(id+"_ilnErr").show();
                             continYn = "N";
                             $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                             break;
                         }
                     }else{
                         value = $(id + " option:selected").val(); 
                         if(jbwrcFnc.isEmpty(value)){ 
                             $(id+"_ilnErr").show();
                             continYn = "N";
                             $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                             break;
                         }
                     }                    
                 }else if(type.indexOf("radio") >= 0){
                     value = $('input[name="'+list[i]+'"]:checked').val(); 
                     if(jbwrcFnc.isEmpty(value)){  
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }else if(type.indexOf("date") >= 0){
                     value = $(id).val().split(".").join("");
                     if(jbwrcFnc.isEmpty(value) && value.length != 8){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }else if(type.indexOf("name") >= 0){
                     value = $(id).val();
                     if(!comLon.isName(value) && JONLLON.userInfo.memberData.custTycd == "1"){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }else if(jbwrcFnc.isEmpty(value)){
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }else if(type.indexOf("phone") >= 0){
                     value = $(id).val().split("-").join("");
                     if(!comLon.isPhone(value)){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }else if(type.indexOf("telno") >= 0){
                     value = $(id).val().split("-").join("");
                     if(!comLon.isTel(value)){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }else{
                     value = $(id).val();
                     if(jbwrcFnc.isEmpty(value)){ 
                         $(id+"_ilnErr").show();
                         continYn = "N";
                         $('[data-checking="'+list[i]+'"]').attr("tabindex", -1).focus();
                         break;
                     }
                 }
                 
                 JONLLON.CCTRAM1802WI[code] = value;
             }
             if(popSucsYn == "Y"){ // 怨꾩빟 �밴퀎 popCheckYn --> �ш린�� �밴퀎 ���곸옄 Y N
                 if(continYn != "N" && popCheckYn == "Y" && (!$("#popCheckSucs00").prop("checked") || !$("#popCheckSucs01").prop("checked"))){
                     //$("#popCheckSucs00").focus();
                     continYn = "N";
                 }else if(continYn != "N" && popCheckYn == "N" && (!$("#popCheckSucs02").prop("checked") || !$("#popCheckSucs03").prop("checked"))){
                     //$("#popCheckSucs02").focus();
                     continYn = "N";
                 }
                 if(continYn != "N"){
                     if(popCheckYn == "Y"){ // �밴퀎 ���곸옄媛� �덈뒗 寃쎌슦 
                         var paramInput = JSON.stringify(JONLLON.CCTRAM1802WI);
                         var userInfo = JSON.stringify(JONLLON.userInfo);
                         var paramOutput = JSON.stringify(JONLLON.CCTRAM1801RO);
                         var trcsNm = JONLLON.CCTRAM1802WI.trcs_nm;
                         var vhcno = JONLLON.CCTRAM1801RO.vhcno;
                         var cmdtNm = JONLLON.CCTRAM1801RO.cmdt_nm;
                         var trcsTlno = comLon.hipenPh(JONLLON.CCTRAM1802WI.trcs_tlno);
                         var sucsPrpsNm = comLon.listFilter(JONLLON.userInfo.codeData.sucsList, "code", JONLLON.CCTRAM1802WI.sucs_prps_dvcd);
                         var param = {
                                 paramInput : paramInput
                                 , userInfo : userInfo
                                 , paramOutput : paramOutput
                                 , trcsNm : trcsNm
                                 , cmdtNm : cmdtNm
                                 , vhcno : vhcno
                                 , trcsTlno : trcsTlno
                                 , sucsPrpsNm : sucsPrpsNm
                                 , termInfo : JSON.stringify(JONLLON.termInfo)
                                 , userNm : JONLLON.userInfo.memberData.userNm
                         }
                         $(window).unbind('beforeunload');//�댄깉諛⑹� �ㅼ젣
                         page.objMoveView(param, '/onl/lon/JONLLON0100.do');
                     }else{
                         setCctram1802w();
                     }
                     
                 }
             }else{ // �섎㉧吏� 蹂�寃� �좎껌 
                 if(continYn != "N" && popCheckYn == "Y" && !$("#popCheck").prop("checked")){
                     //$("#popCheck").focus();
                     continYn = "N";
                 }
                 if(continYn != "N"){
                     JONLLON.CCTRAM1802WI.trcs_tycd = JONLLON.userInfo.memberData.custTycd;  //���곴퀬媛앹쑀�뺤퐫��  
                     setCctram1802w();
                 }
             }
         },
         onlCancelPopShow : function(title, text, id, flag){
             var cnancelId = id;
             var onlCancelTxt = "";
             onlCancelTxt += '<div class="layer-popup-wrap small" id="onlCancelPop">';
             onlCancelTxt +=     '<div class="layer-popup-container">';
             onlCancelTxt +=         '<div class="layer-popup-header">'+title+' 痍⑥냼</div>';
             onlCancelTxt +=         '<div class="layer-popup-body con">';
             onlCancelTxt +=             '<p>'+text+'</p>';
             onlCancelTxt +=         '</div>';
             onlCancelTxt +=         '<div class="layer-popup-footer">';
             onlCancelTxt +=             '<div class="layer-popup-btns">';
             onlCancelTxt +=                 '<button type="button" class="l-p-b-confirm btn_base_l act">��. 痍⑥냼�⑸땲��.</button>';
             onlCancelTxt +=             '</div>';
             onlCancelTxt +=         '</div>';
             onlCancelTxt +=         '<button type="button" class="l-p-b-close small">�リ린</button>';
             onlCancelTxt +=     '</div>';
             onlCancelTxt += '</div>';
             
             if( $("#onlCancelPop").length > 0 ){
                 comLon.openLayer('onlCancelPop', {
                     okCallback: function(){
                         $(".type-error").hide();
                         JBWRC.layerPopup.close("onlCancelPop");
                         if(flag == 'cont'){
                             page.moveView([], "/onl/lon/JONLLON0028.do");
                         }else{
                             setTimeout(function(){JBWRC.layerPopup.close(cnancelId);}, 100); 
                         }
                         
                     }
                 });
             }else{
                 $('body').append(onlCancelTxt);
                 setTimeout(function(){comLon.openLayer('onlCancelPop', {
                     okCallback: function(){
                         $(".type-error").hide();
                         JBWRC.layerPopup.close("onlCancelPop");
                         if(flag == 'cont'){
                             page.moveView([], "/onl/lon/JONLLON0028.do");
                         }else{
                             setTimeout(function(){JBWRC.layerPopup.close(cnancelId);}, 100); 
                         }
                     }
                 });}, 100);
             }
         },
         csCall : function(str){
             if(JBWRC.isMobile()){
                 if(jbwrcFnc.isEmpty(str)){
                     location.href="tel:1688-2300";
                 }else{
                     location.href="tel:"+str;
                 }
                 // 濡쒕뵫�쒓컙 �⑥텞
                 setTimeout(function () {
                     JBWRC.hideLoading(true);
                 }, 1000);
             }
         },
         setPopCommonCodeList : function(){
           //蹂몄씤怨쇱쓽 愿�怨�
             var contList = JONLLON.userInfo.codeData.contList; //蹂몄씤怨쇱쓽 愿�怨�
             var contTxt = '<option value="" data-lang="">�좏깮�댁＜�몄슂.</option>';
             for(var i in contList){
                 contTxt += '<option value="'+contList[i].code+'" data-lang="">'+contList[i].codeName+'</option>';
             }
             $("#bsnRelaSelect").html(contTxt);
             $("#bsnRelaSelect option:eq(0)").prop("selected", true);
             jbwrcUtil.changeMbSelectPop("bsnRelaSelect");
             //setTimeout(function(){$('#bsnRelaSelect').val('');}, 100);
           //蹂몄씤怨쇱쓽 愿�怨�
           
           //�듯솕媛��� �쒓컙��
             var tlclList = JONLLON.userInfo.codeData.tlclList; //蹂몄씤怨쇱쓽 愿�怨�
             var tlcTxt = "";//'<option value="">�좏깮�댁＜�몄슂.</option>';
             for(var i in tlclList){
                 tlcTxt += '<option value="'+tlclList[i].code+'" data-lang="">'+tlclList[i].codeName+'</option>';
             }
             $("#userTimeSelect").html(tlcTxt); // 蹂몄씤 
             $("#bsnTimeSelect").html(tlcTxt); // ���� 
             $("#userTimeSelect option:eq(0)").prop("selected", true).parents('.select-box.pc').addClass('has-val');
             $("#bsnTimeSelect option:eq(0)").prop("selected", true).parents('.select-box.pc').addClass('has-val');
             jbwrcUtil.changeMbSelectPop("userTimeSelect");
             jbwrcUtil.changeMbSelectPop("bsnTimeSelect");
             //setTimeout(function(){$('#userTimeSelect').val('0');}, 100);
             //setTimeout(function(){$('#bsnTimeSelect').val('0');}, 100);
           //�듯솕媛��� �쒓컙��
           
           //�댁��좏삎
             var clsList = JONLLON.userInfo.codeData.clsList; //蹂몄씤怨쇱쓽 愿�怨�
             var clsTxt = "";
             var clsBsnTxt = "";
             for(var i in clsList){
                 if(!(clsList[i].codeName.indexOf("媛뺤젣") >= 0)){
                     var type = clsList[i].codeName.indexOf("以묐룄") >= 0 ? "N" : "Y";
                     clsTxt += '<label class="rdo">';
                     clsTxt += '<input type="radio" name="cancelRadio" data-cont-date="'+type+'" value="'+clsList[i].code+'" disabled>';
                     clsTxt += '<span data-lang="">'+clsList[i].codeName+'</span>';
                     clsTxt += '</label>';

                     clsBsnTxt += '<label class="rdo">';
                     clsBsnTxt += '<input type="radio" name="bsnCancelRadio" data-bsn-date="'+type+'" value="'+clsList[i].code+'" disabled>';
                     clsBsnTxt += '<span data-lang="">'+clsList[i].codeName+'</span>';
                     clsBsnTxt += '</label>';
                     
                 }
             }
             
             $("#cancelRadio").html(clsTxt); // 蹂몄씤 
             $("#bsnCancelRadio").html(clsBsnTxt); // ����
             $("#cancelRadio option:eq(0)").prop("selected", true);
             $("#bsnCancelRadio option:eq(0)").prop("selected", true);
             //setTimeout(function(){$('#cancelRadio').val('');}, 100);
             //setTimeout(function(){$('#bsnCancelRadio').val('');}, 100);
           //�댁��좏삎
           
           //諛섎궔/�몄닔�щ�
             var aftnList = JONLLON.userInfo.codeData.aftnList; //蹂몄씤怨쇱쓽 愿�怨�
             var aftnTxt = "";
             var aftnBsnTxt = "";
             var setType = $("#setType").val();
             for(var i in aftnList){
                 var checkText = "checked disabled";
                 if(!(aftnList[i].codeName.indexOf("�щ━��") >= 0 || aftnList[i].codeName.indexOf("ving") >= 0 || aftnList[i].codeName.indexOf("�꾪솚") >= 0)){
                     if(setType == "come"){
                         checkText = aftnList[i].code == "1" ? checkText : "disabled";
                     }else if(setType == "return"){
                         checkText = aftnList[i].code == "2" ? checkText : "disabled";
                     }
                     var codeNm = aftnList[i].codeName == "�묐룄" ? "�몄닔" : aftnList[i].codeName == "諛섑솚" ? "諛섎궔" : aftnList[i].codeName;

                     aftnTxt += '<label class="rdo">';
                     aftnTxt += '<input type="radio" name="returnRadio" value="'+aftnList[i].code+'" '+checkText+'>';
                     aftnTxt += '<span data-lang="">'+codeNm+'</span>';
                     aftnTxt += '</label>';

                     aftnBsnTxt += '<label class="rdo">';
                     aftnBsnTxt += '<input type="radio" name="bsnReturnRadio" value="'+aftnList[i].code+'" '+checkText+'>';
                     aftnBsnTxt += '<span data-lang="">'+codeNm+'</span>';
                     aftnBsnTxt += '</label>';
                 }
             }
             $("#returnRadio").html(aftnTxt); // 蹂몄씤 
             $("#bsnReturnRadio").html(aftnBsnTxt); // ���� 
             $("#returnRadio option:eq(0)").prop("selected", true);
             $("#bsnReturnRadio option:eq(0)").prop("selected", true);
             //setTimeout(function(){$('#returnRadio').val('');}, 100);
             //setTimeout(function(){$('#bsnReturnRadio').val('');}, 100);
           //諛섎궔/�몄닔�щ�
             $("[data-user-nm]").addClass("is_val");
             //JBWRC.setDropdown();
         },
         // 怨듯넻�앹뾽 珥덇린�� 
         popInit : function(flag, lastDt, dateType){
             $(".type-error").hide();
             //$(".sub_info").hide();//�ㅻ쪟 硫붿떆吏� �쒓굅
             $("#changeBtn").prop("disabled", true);
             $('input[type="radio"]').prop("checked", false);
             $('input[value="Y"]').trigger("click");// �� 湲곕낯 Defalult
             $('input[type="checkbox"]').prop("checked", false);  // 3�� �숈쓽 
             $('input[type="text"]').val(""); // value 珥덇린�� 
             $('input[type="number"]').val(""); // value 珥덇린�� 
             $('input[type="tel"]').val(""); // value 珥덇린�� 
             //$('input[type="tel"]').parent().removeClass("acting");
             //$('input[type="text"]').parent().removeClass("acting");
             //$('input[type="number"]').parent().removeClass("acting");
             $("#userTextArea").val(""); // �붿껌 �ы빆
             $("#bsnTextArea").val(""); // �붿껌 �ы빆
             var list = Object.keys(JONLLON.CCTRAM1802WI);
             for(var i in list){
                 var key = list[i];
                 if(key != "loanno" && key != "loan_seqno" && key != "loan_chng_dvcd"){
                     JONLLON.CCTRAM1802WI[key] = "";
                 }
             }
             $("[data-user-phone]").hide(); // 
             $("[data-crop-phone]").hide(); //
             $("[data-cont-close]").hide(); //
             if(JONLLON.userInfo.memberData.custTycd == "3"){ // 踰뺤씤 寃쎌슦 
                 $("[data-crop-phone]").show(); 
                 $("[data-text-legend]").text("踰뺤씤");
                 $("[data-text-label]").text("怨꾩빟�� �깅챸(踰뺤씤紐�)");
                 $("[data-title-strong]").text("�곷떞���곸옄 �뺣낫");
              }
             //$("#userName").attr("value", JONLLON.userInfo.memberData.userNm);
             $("#userName").val(JONLLON.userInfo.memberData.userNm).parents('.input-con').addClass('has-val');
             //$("#userName").parent().addClass("acting");
             //$("#userName").parent().parent().addClass("disabled");
             if(flag == "Y"){ // 蹂댁쬆�� 蹂�寃�, �댁�, �곗옣 
                 if(JONLLON.userInfo.memberData.custTycd == "3"){ // 踰뺤씤 
                     // 踰뺤씤 
                     $("#ques").html("�뱀궗�� �깅줉�� �꾨옒�� �곕씫泥섎줈 �곕씫�쒕┫源뚯슂?");
                     if(JONLLON.userInfo.memberData.phoneList.length >= 1){
                         var list = JONLLON.userInfo.memberData.phoneList;
                         var htmlTxt = '<option value="">�좏깮�댁＜�몄슂.</option>';
                         for(var i in list){
                             htmlTxt += '<option value="'+i+'">'+list[i]+'</option>';
                         }
                         $("#userPhoneSelect").html(htmlTxt);
                         $("#userPhoneSelect option:eq(0)").prop("selected", true);
                         jbwrcUtil.changeMbSelectPop("userPhoneSelect");
                         //setTimeout(function(){$('#userPhoneSelect').val('');}, 100);
                     }else{
                         $("[data-user-phone]").show();
                         //$("[data-user-phone]").addClass("is_val");
                         $('[data-checking="userPhone"]').removeClass("disabled");
                         $("#userPhone").attr("type", "tel");
                         $("#userPhone").prop("disabled", false);
                         JONLLON.userInfo.memberData.delegetePhone = "";
                     }
                     // 踰뺤씤 
                     
                 }else{
                     // 蹂몄씤 
                     $("#ques").html("怨꾩빟�� 蹂몄씤猿� �꾩옱�� �대��꾪솕踰덊샇濡� �곕씫�쒕┫源뚯슂?");
                     $("[data-user-phone]").show();
                     if(!jbwrcFnc.isEmpty(JONLLON.userInfo.memberData.delegetePhone)){ // 踰덊샇媛� �덈뒗 寃쎌슦 
                         $("#userPhone").attr("type", "text");
                         //$("#userPhone").attr("value", JONLLON.userInfo.memberData.delegetePhone);
                         $("#userPhone").val(JONLLON.userInfo.memberData.delegetePhone).parents('.input-con').addClass('has-val');
                         //$("#userPhone").parent().addClass("acting");
                         //$("#userPhone").parent().parent().addClass("disabled");
                     }else{
                         $('[data-checking="userPhone"]').removeClass("disabled");
                         $("#userPhone").attr("type", "tel");
                         $("#userPhone").prop("disabled", false);
                         JONLLON.userInfo.memberData.delegetePhone = "";
                     }
                     // 蹂몄씤 
                 }
             }
             $("#contDate").val("");
             $("#bsnContDate").val("");
             var severToday = moment(severTd).add(2,'days').format("YYYYMMDD");
             var mindate = moment(severToday).format("YYYYMMDD");
             var maxdate = moment(severToday).format("YYYYMM")+""+moment(severToday).daysInMonth();
             if(dateType != "rent"){
                 var date = moment(severToday).add(1,'months').format("YYYYMMDD");
                 maxdate = moment(date).format("YYYYMM")+""+moment(date).daysInMonth();
             }
             var rentMaxYn = ""; // �뚰듃 留뚭린�쇱씠 �대떖 留� 蹂대떎 �щ㈃ N
             comLon.setDate(severToday, mindate, maxdate, rentMaxYn, lastDt, dateType);
         },
      // 怨듯넻�앹뾽 珥덇린�� 
         secondPopInit : function(flag, lastDt, dateType, dateYn){
             $(".type-error").hide();
             $("#changeBtn").prop("disabled", true);
             $('input[type="radio"]').prop("checked", false);
             //$('input[value="Y"]').trigger("click");// �� 湲곕낯 Defalult
             $('input[type="checkbox"]').prop("checked", false);  // 3�� �숈쓽 
             //$('input[type="text"]').val(""); // value 珥덇린�� 
             $('input[type="number"]').val(""); // value 珥덇린�� 
             $('input[type="tel"]').val(""); // value 珥덇린�� 
             $('#contDate').val('');
             $('#bsnContDate').val('');
             //$('#contDate').parent().removeClass("focused");
             //$('#bsnContDate').parent().removeClass("focused");
             //$('input[type="tel"]').parent().removeClass("focused");
             //$('input[type="text"]').parent().removeClass("focused");
             //$('input[type="number"]').parent().removeClass("focused");
             $("#userTextArea").val(""); // �붿껌 �ы빆
             $("#bsnTextArea").val(""); // �붿껌 �ы빆
             $('#bsnUserName').val('');
             //$('#bsnUserName').parent().removeClass("focused");
             var list = Object.keys(JONLLON.CCTRAM1802WI);
             for(var i in list){
                 var key = list[i];
                 if(key != "loanno" && key != "loan_seqno" && key != "loan_chng_dvcd"){
                     JONLLON.CCTRAM1802WI[key] = "";
                 }
             }
             $("[data-user-phone]").hide(); // 
             $("[data-crop-phone]").hide(); //
             $("[data-cont-close]").hide(); //
             if(JONLLON.userInfo.memberData.custTycd == "3"){ // 踰뺤씤 寃쎌슦 
                 $("[data-crop-phone]").show(); 
              }
             $("#userName").attr("value", JONLLON.userInfo.memberData.userNm);
             $("#userName").val(JONLLON.userInfo.memberData.userNm);
             //$("#userName").parent().addClass("acting");
             //$("#userName").parent().parent().addClass("disabled");
             
             if(flag == "Y"){ // 蹂댁쬆�� 蹂�寃�, �댁�, �곗옣 
                 if(JONLLON.userInfo.memberData.custTycd == "3"){ // 踰뺤씤 
                     // 踰뺤씤 
                     $("#ques").html("�뱀궗�� �깅줉�� �꾨옒�� �곕씫泥섎줈 �곕씫�쒕┫源뚯슂?");
                     if(JONLLON.userInfo.memberData.phoneList.length >= 1){
                         var list = JONLLON.userInfo.memberData.phoneList;
                         var htmlTxt = '<option value="">�좏깮�댁＜�몄슂.</option>';
                         for(var i in list){
                             htmlTxt += '<option value="'+i+'" data-lang="">'+list[i]+'</option>';
                         }
                         $("#userPhoneSelect").html(htmlTxt); //;
                         $("#userPhoneSelect option:eq(0)").prop("selected", true);
                         jbwrcUtil.changeMbSelectPop("userPhoneSelect");
                         //setTimeout(function(){$('#userPhoneSelect').val('');}, 100);
                     }else{
                         $("[data-user-phone]").show();
                         $('[data-checking="userPhone"]').removeClass("disabled");
                         $("#userPhone").attr("type", "tel");
                         $("#userPhone").prop("disabled", false);
                         JONLLON.userInfo.memberData.delegetePhone = "";
                     }
                     // 踰뺤씤 
                     
                 }else{
                     // 蹂몄씤 
                     $("#ques").html("怨꾩빟�� 蹂몄씤猿� �꾩옱�� �대��꾪솕踰덊샇濡� �곕씫�쒕┫源뚯슂?");
                     $("[data-user-phone]").show();
                     if(!jbwrcFnc.isEmpty(JONLLON.userInfo.memberData.delegetePhone)){ // 踰덊샇媛� �덈뒗 寃쎌슦 
                         $("#userPhone").attr("type", "text");
                         $("#userPhone").attr("value", JONLLON.userInfo.memberData.delegetePhone);
                         $("#userPhone").val(JONLLON.userInfo.memberData.delegetePhone);
                         $("#userPhone").parent().addClass("acting");
                         $("#userPhone").parent().parent().addClass("disabled");
                     }else{
                         $('[data-checking="userPhone"]').removeClass("disabled");
                         $("#userPhone").attr("type", "tel");
                         $("#userPhone").prop("disabled", false);
                         JONLLON.userInfo.memberData.delegetePhone = "";
                     }
                     // 蹂몄씤 
                 }
             }
             if(dateYn == "Y"){
                 $("[data-cont-close]").show(); //
                 var severToday = moment(severTd).add(2,'days').format("YYYYMMDD");
                 var mindate = moment(severToday).format("YYYYMMDD");
                 var maxdate = moment(severToday).format("YYYYMM")+""+moment(severToday).daysInMonth();
                 if(dateType != "rent"){
                     var date = moment(severToday).add(1,'months').format("YYYYMMDD");
                     maxdate = moment(date).format("YYYYMM")+""+moment(date).daysInMonth();
                 }
                 
                 var rentMaxYn = ""; // �뚰듃 留뚭린�쇱씠 �대떖 留� 蹂대떎 �щ㈃ N
                 
                 comLon.setDate(severToday, mindate, maxdate, rentMaxYn, lastDt, dateType);
             }
             
             
         },
         setDate : function(std, mdt, maxdt, maxYn, ldt, dType){ //�좎쭨 �뗮똿
             var severToday = std;
             var mindate = mdt;
             var maxdate = maxdt;
             var rentMaxYn = maxYn;
             var lastDt = ldt;
             var dateType = dType;
             if(!jbwrcFnc.isEmpty(lastDt)){
                 rentMaxYn = "N"; // �뚰듃 留뚭린�쇱씠 �대떖 留� 蹂대떎 �щ㈃ N
                 var diffboolMax = moment(maxdate).diff(moment(lastDt), "days") >= 0 ? true : false;
                 var diffboolIng = moment(maxdate).diff(moment(mindate), "days") == 2 ? true : false; // �쒖옉�쇨낵 留뚭린�쇱씠 �댄� 李⑥씠�� 寃쎌슦 ex)�쒖옉 28�� 留뚭린 30��
                 if(diffboolMax){ // 留뚭린�쇱씠 �대떖 留� 蹂대떎 �щ㈃ 留뚭린�쇰줈 �뗮똿 
                     maxdate = moment(lastDt).format("YYYYMMDD");
                     $("[data-cont-info]").html("�댁슜留뚭린�쇨퉴吏� �댁�媛� 媛��ν빀�덈떎.");
                     rentMaxYn = "Y";// �뚰듃 留뚭린�쇱씠 �대떖 留� 蹂대떎 �щ㈃ Y
                 }else if(diffboolIng){
                     var checkMaxDate = moment(maxdate).format("YYYYMMDD");
                     jbwrcUtil.getWorkList(checkMaxDate, function(copyWorkList, clsn_dt, holi_dt, today_all_clsn_dt ){
                         if(holi_dt.includes(checkMaxDate) && holi_dt.includes(checkMinDate)){ // �쒖옉�쇨낵 留뚭린�쇱씠 怨듯쑕�쇱씤 寃쎌슦
                             for(var i in clsn_dt){
                                 var obj = clsn_dt[i];
                                 if(obj == checkMaxDate){
                                     var cnt = Number(i) + 1;
                                     maxdate = clsn_dt[cnt];
                                     break;
                                 }
                             }
                             $("#contDate").attr("typeDate", rentMaxYn);
                             $("#bsnContDate").attr("typeDate", rentMaxYn);
                             
                             $("#contDate").attr("mindate", moment(mindate).format("YYYY.MM.DD"));
                             $("#contDate").attr("maxdate", moment(maxdate).format("YYYY.MM.DD"));
                             $("#bsnContDate").attr("mindate", moment(mindate).format("YYYY.MM.DD"));
                             $("#bsnContDate").attr("maxdate", moment(maxdate).format("YYYY.MM.DD"));
                             setDatepicker();
                             $('#contDate').val('');
                             $('#bsnContDate').val('');
                             JBWRC.hideLoading(true);
                         }
                     }, "one");
                     return;
                 }
                 
                 if(dateType == "rent"){
                     $("[data-cont-info]").html("�댁��щ쭩�쇱� �뱀썡 留먯씪源뚯�留� 吏��뺤씠 媛��ν빀�덈떎.");
                 }else{
                     $("[data-cont-info]").html("�댁��щ쭩�쇱� �듭썡 留먯씪源뚯�留� 吏��뺤씠 媛��ν빀�덈떎.");
                 }
             }
             var diffbool = moment(mindate).diff(moment(maxdate), "days") >= 0 ? true : false;
             if(diffbool){
                 $("#contDate").parent().parent().addClass("disabled");
                 $("#bsnContDate").parent().parent().addClass("disabled");
                 $("#contDate").prop("disabled", true);
                 $("#bsnContDate").prop("disabled", true);
                 $("[data-cont-info]").html("�뱀썡�먮뒗 �댁�媛� 遺덇��ν빀�덈떎.");
             }
             
             $("#contDate").attr("typeDate", rentMaxYn);
             $("#bsnContDate").attr("typeDate", rentMaxYn);

             $("#contDate").attr("mindate", moment(mindate).format("YYYY.MM.DD"));
             $("#contDate").attr("maxdate", moment(maxdate).format("YYYY.MM.DD"));
             $("#bsnContDate").attr("mindate", moment(mindate).format("YYYY.MM.DD"));
             $("#bsnContDate").attr("maxdate", moment(maxdate).format("YYYY.MM.DD"));
             setDatepicker();
             $('#contDate').val('');
             $('#bsnContDate').val('');
             JBWRC.hideLoading(true);
         },
         goCstPage : function(){ // 怨좉컼�쇳꽣 硫붿씤�쇰줈 �대룞 
             page.moveView([], "/cst/cap/JCSTCAP0001.do");
         },
         //�쎄�議고쉶 
         getComInfo : function(_clauseCd, flag){
             var type = jbwrcFnc.isEmpty(flag) ? "" : flag;
             jbwrcUtil.customAjax({
                 url : "/cst/plc/getClauseOneAjax.do"
                 , data : {
                     clauseCd : _clauseCd //�쎄�援щ텇  
                 }
                 , beforeShow : false
                 , compleShow : false
                 , callBack : function(data, status, xhr) {
                     //if(status == "success" && !jbwrcFnc.isEmpty(data.clause)){
                     if(!jbwrcFnc.isEmpty(data.clause)){
                         var useStplCtnt = jbwrcFnc.isEmpty(data.clause.useStplCtnt) ? "" : data.clause.useStplCtnt;  // �댁슜
                         var title = jbwrcFnc.isEmpty(data.clause.part2) ? "" : data.clause.part2;              // �쒕ぉ
                         var code = jbwrcFnc.isEmpty(data.clause.part1) ? "" : data.clause.part1; 
                         if(!jbwrcFnc.isEmpty(type)){
                             var $id = "[data-cont-term='"+type+"']";//
                             $($id).append(useStplCtnt);
                             $($id).prev().each(function(idx, item){
                                 $(item).data("code", code);
                             });
                         }else{
                             //var term = '<input title="'+title+'"  type="checkbox" id="checkBox" data-code="'+code+'">';
                             //term += '<i class="label">'+useStplCtnt+'</i>';
                             var term = '<input type="checkbox" id="popCheck" data-code="'+code+'">';
                             term += useStplCtnt;
                             $("#termInfo").html(term);
                         }
                     }
                 }
                 , errorCallback : function(data, status, xhr){
                     JBWRC.hideLoading(true);
                     JBWRC.alert( "�쎄� 議고쉶 �ㅻ쪟�낅땲��.</br>�ㅼ떆 �쒕룄 �댁＜�몄슂.", {
                         okBtnText: '�뺤씤',
                         cancelBtnText: '', 
                         okCallback: function(opt){
                             jbwrcFnc.goBackFunc();           
                         }
                     });
                 }
             });
         },
         //�쎄� �깅줉 
         setComInfo : function(_clasue){
             if(!jbwrcFnc.isEmpty(_clasue)){
                 jbwrcUtil.customAjax({
                     url : "/onl/stm/ccsthm0407w.do"             // url 
                     , data : {clasueObj : _clasue}               // param
                     , beforeShow : false                        // 濡쒕뵫諛� �щ� 
                     , compleShow : true                        // 濡쒕뵫諛� �щ� 
                     , loginYn : "Y"                             // 濡쒓렇�� �щ�
                     , callBack : function(result){               // 肄쒕갚
                         //console.log(result);
                         
                         if(typeof completeTerm == "function"){
                             completeTerm();
                         }
                     }         
                 });
             }else{ // �쎄��� �녿뒗 寃쎌슦 
                 var clasue = JSON.stringify(JONLLON.termInfo);
                 jbwrcUtil.customAjax({
                     url : "/onl/stm/ccsthm0407w.do"             // url 
                     , data : {clasueObj : clasue}               // param
                     , beforeShow : false                        // 濡쒕뵫諛� �щ� 
                     , compleShow : true                        // 濡쒕뵫諛� �щ� 
                     , loginYn : "Y"                             // 濡쒓렇�� �щ�
                     , callBack : function(result){               // 肄쒕갚
                         //console.log(result);
                         
                         if(typeof completeTerm == "function"){
                             completeTerm();
                         }
                     }         
                 });
             }
         }
         ,// 寃곗젣�� 蹂�寃� 遺덇� alert 
         changeDayAlert : function (bzopDprmNm, mgdpTlno){
             //fn_alert('紐⑥쭛�몃�異� �곹뭹�� 寃곗젣�쇰�寃쎌씠 遺덇��⑸땲��.<br> ' + bzopDprmNm + ' : ' + mgdpTlno + '濡� �곕씫諛붾엻�덈떎.', "�뺤씤");
             JBWRC.alert('紐⑥쭛�몃�異� �곹뭹�� 寃곗젣�쇰�寃쎌씠 遺덇��⑸땲��.<br> ' + bzopDprmNm + ' : ' + mgdpTlno + '濡� �곕씫諛붾엻�덈떎.', {
                 okBtnText: "�뺤씤",
                 cancelBtnText: '',
                 okCallback: function(opt){
                     
                 }
             });
         }
 }

//'[�쒖옉]AS-IS MDMymCommon.js ################## ################## ##################
var mymCommon = {
        
        mymGoPage : function(_url, _param, _inflowDvcd){

            _param = $.extend({
                redirectUrl : _url.replace(/[/]/img,"@")
                ,inflowDvcd : _inflowDvcd
            }
            ,_param, true);

            jbwrcUtil.pageUtil.goPage("/mdr/bzc/lnd/mdLnd0010.do", false, _param);
        }
        /* 25.0501 二쇱꽍泥섎━ 吏꾪뻾�꾪솴 �댁뿭 �붾㈃�대룞 泥섎━ 蹂�寃쎌뿉 �섑븳 誘몄궗��
        ,
        mymRunApp : function(_title, _url, _this, _param){
            
            console.log("{[//]} ********** mymRunApp > _title : " + _title );
            console.log("{[//]} ********** mymRunApp > _url : " + _url );
            console.log("{[//]} ********** mymRunApp > _this : " + _this );
            console.log("{[//]} ********** mymRunApp > _param : " + _param );
            
            JBWRC.alert( _title + "��(��) App�먯꽌留� 媛��ν빀�덈떎. App�� 援щ룞�섏떆寃좎뒿�덇퉴?", {
                bodyTitle:"",
                okBtnText: "�뺤씤",
                cancelBtnText: "痍⑥냼",
                okCallback: function(){
                    _param = $.extend({
                        type : "L"
                        ,redirectUrl : _url
                        ,inflowDvcd : "MYM"
                    }
                    ,_param, true);
                    
                    var param = {};
                    param["url"] = encodeURIComponent("/mdr/bzc/lnd/mdLnd0010.do?").concat($.param(_param));
                    param["srtnUrlApchAlwnDvcd"] = "1";
                    param["srtnUrlDtlCtntDvcd"] = "1";
                    
                    jbwrcUtil.ajaxUtil.call({
                        url : '/std/makeSrtnUrl.do' //'{[//]} �섏쨷�� 二쇱꽍 ��젣  怨듯넻 > �⑥텞URL �앹꽦 �붿껌 AJAX
                        ,data : param
                        ,callBack : function(_json){

                            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ /std/makeSrtnUrl.do callBack : " + JSON.stringify(_json));

                            location.href = _json.result;
                        }
                        ,errorCallback : function(_json){
                            
                            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ /std/makeSrtnUrl.do errorCallback : " + JSON.stringify(_json));
                            
                            JBWRC.alert( "�� 援щ룞�� �ㅽ뙣�섏��듬땲��.", {
                                bodyTitle:"",
                                okBtnText: "�뺤씤",
                                okCallback: function(){
                                    //$('#').focus();
                                }
                            });
                        }
                    });
                    
                },
                cancelCallback: function(){
                }
            });
        }
        */

        /* 25.0501 二쇱꽍泥섎━ 吏꾪뻾�꾪솴 �댁뿭 �붾㈃�대룞 泥섎━ 蹂�寃쎌뿉 �섑븳 誘몄궗��
        ,
        mymGoStatePage : function(_this, _mblDtlsPrgsStcd, _paramObj, _custObj){
          
            var param = {
                    iqryDvcd : ""
                    ,cstno : _custObj.cstno

                    ,cmdtCd : ""
                    ,cmdtDtlsCd : ""
                    ,loanno : ""
                    ,loanSeqno : ""
                    ,cnslno : ""
                    ,cnslSeqno : ""
                    ,cntrno : ""
                    ,estmNo : ""
                    ,appcActcNo : ""
                    ,ivtgJudgCd : ""
                    ,kcbHedInfoYnS1 : ""
                    ,drvnLcnsYn : ""
                    ,docsActcYn : ""
                    ,plCrssFxamTrgtYn : ""
                    ,newCustYn : ""
                    ,mblDtlsPrgsStcd : ""
                    ,tmGdsYnS1 : ""
                    
                    ,mblDrctGdsTycd : _mblDtlsPrgsStcd.replace(/[0-9]/img,"")
                };
            
            var custObj = _custObj;
            
            $.extend(param, _paramObj);
            
            console.log("{[//]} ********** mymGoStatePage > param.agreFinYn : " + param.agreFinYn );
            console.log("{[//]} ********** mymGoStatePage > param.cntrno2 : " + param.cntrno2 );
            console.log("{[//]} ********** mymGoStatePage > param.gdsDivS2 : " + param.gdsDivS2 );
            console.log("{[//]} ********** mymGoStatePage > param.nxtrIvtgAvpsCd : " + param.nxtrIvtgAvpsCd );
            console.log("{[//]} ********** mymGoStatePage > param.tmGdsYnS1 : " + param.tmGdsYnS1 );
            console.log("{[//]} ********** mymGoStatePage > param.mblDrctGdsTycd : " + param.mblDrctGdsTycd );
            
            if (param.agreFinYn == "N" && param.cntrno2 != "") {
                if (param.gdsDivS2 == "01") {
                    if (param.nxtrIvtgAvpsCd == "99") {
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0220.do", param, "MYM");       //'{[//]} �섏쨷�� 二쇱꽍 ��젣 �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > �꾩옄�숈쓽 �붾㈃
                        return;
                    } else {
                        if(param.tmGdsYnS1 == "N"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0200.do", param, "MYM");   //'{[//]} �섏쨷�� 二쇱꽍 ��젣 �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > 寃뚯빟�좎껌 �깅줉 �붾㈃
                            return;
                        }
                    }
                } else if (param.gdsDivS2 == "04" || param.gdsDivS2 == "05") {
                    if (param.nxtrIvtgAvpsCd == "99") {
                        mymCommon.mymGoPage("/mdr/pln/mdPln0280.do", param, "MYM");           //'{[//]} �섏쨷�� 二쇱꽍 ��젣 媛쒖씤��異�>��異쒖빟��
                        return;
                    } else {
                        if(param.tmGdsYnS1 == "N"){
                            mymCommon.mymGoPage("/mdr/pln/mdPln0220.do", param, "MYM");       //'{[//]} �섏쨷�� 二쇱꽍 ��젣 媛쒖씤��異�>怨꾩빟�좎껌
                            return;
                        }
                    };
                };
            };
            
            console.log("{[//]} ********** mymGoStatePage > param.asetGdsYn : " + param.asetGdsYn );
            console.log("{[//]} ********** mymGoStatePage > param.asetGdsYn : �꾨줈�몄뒪 ��젣 �곷떞�� �곌껐 �덈궡�붾㈃�쇰줈 蹂�寃� �� �곕Ⅸ 愿��� �뚯뒪 ��젣��. 媛믪씠 Y�� 寃쎌슦 �쒕쾲�� 泥댄겕");        
            console.log("{[//]} ********** mymGoStatePage > _mblDtlsPrgsStcd : " + _mblDtlsPrgsStcd );
            console.log("{[//]} ********** mymGoStatePage > param.drctInflChnlDvcd : " + param.drctInflChnlDvcd );
            console.log("{[//]} ********** mymGoStatePage > param.umrFsetpYn : " + param.umrFsetpYn );
            console.log("{[//]} ********** mymGoStatePage > jbwrcFnc.isMobileWeb : " + jbwrcFnc.isMobileWeb() );
            
            switch(_mblDtlsPrgsStcd){                
                case "E001":
                    if(param.drctInflChnlDvcd == "04"){ //�쒗쑕梨꾨꼸�먯꽌 �좎엯�덉쓣寃쎌슦 臾댁“嫄� 蹂몄씤�몄쬆�쇰줈 �대룞
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                    }else{
                        if(param.umrFsetpYn == "Y"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM"); //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                            break;
                        }
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                    }
                    break;
                case "E002":
                    mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                    break;
                case "E004":
                    if(jbwrcFnc.isMobileWeb()){
                        if(param.umrFsetpYn == "Y"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM"); //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃    
                            break;
                        }
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0200.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > 寃뚯빟�좎껌 �깅줉 �붾㈃
                    }
                    else{
                        if(param.umrFsetpYn == "Y"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM"); //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                            break;
                        }
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0200.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > 寃뚯빟�좎껌 �깅줉 �붾㈃
                    }
                    break;
                case "E005":
                    if(jbwrcFnc.isMobileWeb()){
                        if(param.umrFsetpYn == "Y"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM"); //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                            break;
                        }
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0200.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > 寃뚯빟�좎껌 �깅줉 �붾㈃
                    }
                    else{
                        if(param.umrFsetpYn == "Y"){
                            mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0010.do", param, "MYM"); //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� > 蹂몄씤�몄쬆�붾㈃
                            break;
                        }
                        mymCommon.mymGoPage("/mdr/ucr/umr/mdUmr0200.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. �먮룞李⑤떞蹂� >  怨꾩빟�좎껌 > 寃뚯빟�좎껌 �깅줉 �붾㈃
                    }
                    break;
                    
                case "F001":
                    if(param.drctInflChnlDvcd == "04"){ //�쒗쑕梨꾨꼸�먯꽌 �좎엯�덉쓣寃쎌슦 臾댁“嫄� 蹂몄씤�몄쬆�쇰줈 �대룞
                        mymCommon.mymGoPage("/mdr/pln/mdPln0010.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>蹂몄씤�몄쬆�붾㈃
                    }else{
                        if(jbwrcFnc.isMobileWeb()){
                            mymCommon.mymGoPage("/mdr/pln/mdPln0040.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>�쒕룄議고쉶 諛� �ъ쭅/�뚮뱷�뺤씤
                        }
                        else{
                            mymCommon.mymGoPage("/mdr/pln/mdPln0040.do", param, "MYM");     //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>�쒕룄議고쉶 諛� �ъ쭅/�뚮뱷�뺤씤
                        }
                    }
                    break;
                case "F002":
                    mymCommon.mymGoPage("/mdr/pln/mdPln0010.do", param, "MYM");             //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>蹂몄씤�몄쬆�붾㈃
                    break;
                case "F003":
                    if(param.drctInflChnlDvcd == "04"){ //�쒗쑕梨꾨꼸�먯꽌 �좎엯�덉쓣寃쎌슦 臾댁“嫄� 蹂몄씤�몄쬆�쇰줈 �대룞
                        mymCommon.mymGoPage("/mdr/pln/mdPln0010.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>蹂몄씤�몄쬆�붾㈃
                    }
                    if(jbwrcFnc.isMobileWeb()){
                        mymCommon.mymGoPage("/mdr/pln/mdPln0040.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>�쒕룄議고쉶 諛� �ъ쭅/�뚮뱷�뺤씤
                    }
                    else{
                        mymCommon.mymGoPage("/mdr/pln/mdPln0040.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>�쒕룄議고쉶 諛� �ъ쭅/�뚮뱷�뺤씤
                    }
                    break;
                case "F004":
                case "F007":
                    if(jbwrcFnc.isMobileWeb()){
                        mymCommon.mymGoPage("/mdr/pln/mdPln0220.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>怨꾩빟�좎껌
                    }
                    else{
                        mymCommon.mymGoPage("/mdr/pln/mdPln0220.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>怨꾩빟�좎껌
                    }
                    break;
                case "F005":
                    if(jbwrcFnc.isMobileWeb()){
                        mymCommon.mymRunApp("�곷떞�좎껌 吏꾪뻾", "/mdr/pln/mdPln0212.do", _this, param);        //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>��異쒖빟��>�곷떞�좎껌�붾㈃
                    }
                    else{
                        mymCommon.mymGoPage("/mdr/pln/mdPln0212.do", param, "MYM");         //'{[//]}二쇱꽍��젣�댁빞��. 媛쒖씤��異�>��異쒖빟��>�곷떞�좎껌�붾㈃
                    }
                    break;
            }
        }
        */
}
//'[醫낅즺]AS-IS MDMymCommon.js ################## ################## ##################

//'[�쒖옉]AS-IS common.js ################## ################## ##################
var JBWRC = {
        uaVar: null,
        ua: function() {
            var
                ua = navigator.userAgent.toLowerCase(),
                div = document.createElement('div'),
                inp = document.createElement("input"),
                ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
                browser = $.browser,
                support = $.support,
                device = $.device,
                deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
                uAgent = ua.toLowerCase(),
                deviceInfoAmount = deviceInfo.length,
                isIpad = JBWRC.isIpadDevice(),
                version, i;
            if (!browser) {
                $.browser = browser = {};
            }
            for (var j = 0; j < deviceInfoAmount; j++) {
                if (uAgent.match(deviceInfo[j]) != null){
                    device = deviceInfo[j];
                    break;
                }
            }
            isIpad && (device = 'ipad');
            
            var filter = "win16|win32|win64|mac|macintel";
            support.isTouch = (document.ontouchstart !== undefined && document.ontouchstart !== null);

            if ( navigator.platform ) {
                if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
                    //mobile :: �ㅼ젣湲곌린媛� 紐⑤컮�쇳룿 �먮뒗 �쒕툝由우씤 寃쎌슦
                    browser.desktop = false;
                } else {
                    //pc  ::  �ㅼ젣湲곌린媛� �덈룄�� �먮뒗 留μ씤 寃쎌슦
                    browser.desktop = true;
                }
                isIpad && (browser.desktop = false);
            }
            browser.local = !(/^http:\/\//).test(location.href);
            browser.ie = !!ie && parseInt( ie[2] ) || ( ua.indexOf('trident')>0 && ua.indexOf('like gecko')>0 );  // ie11 add
            browser.firefox = (/firefox/i).test(ua);
            browser.webkit = (/applewebkit/i).test(ua);
            browser.chrome = (/chrome/i).test(ua);
            browser.edg = (/edg/i).test(ua);
            browser.opera = (/opera/i).test(ua);
            browser.ios = (/ip(ad|hone|od)/i).test(ua) || ( ua.indexOf('macintosh')>-1 && support.isTouch ) || isIpad;
            browser.android = (/android/i).test(ua);
            browser.safari = browser.webkit && !browser.chrome;
            browser.msie = !!ie && parseInt( ie[2] ) || ( ua.indexOf('trident')>0 && ua.indexOf('like gecko')>0 );
            // touch, mobile �섍꼍 援щ텇
            support.touch = browser.ios || browser.android || support.isTouch;
            browser.mobile = support.touch && ( browser.ios || browser.android || isIpad );

            //mobile, pc, app 援щ텇
            if ( browser.mobile ) {
                if(browser.ios){
                    browser.device = (ua.indexOf('jbwrc_ios') > -1 || ua.indexOf('jbnativeapp') > -1) ? "IA" : "IW"
                }else if(browser.android){
                    browser.device = (ua.indexOf('jbwrc_android') > -1 || ua.indexOf('jbnativeapp') > -1) ? "AA" : "AW"
                }
            }else{
                browser.device = "W"
            }
            if ( ua.indexOf('jbwrc_ios') > -1 || ua.indexOf('jbwrc_android') > -1 || ua.indexOf('jbnativeapp') > -1 ) {
                browser.isApp = true;
            } else {
                browser.isApp = false;
            }

            browser.mac = ua.indexOf('macintosh') > -1 && !browser.mobile;

            // false ��젣
            /*
            for (i in browser) {
                if (!browser[i]) {
                    delete browser[i]
                }
            }
            */

            // os 援щ텇
            browser.os = (navigator.appVersion).match(/(mac|win|linux)/i),
            browser.os = (browser.os) ? browser.os[1].toLowerCase() : '';

            // version 泥댄겕
            if ( browser.mobile ) {
                version = ua.match(/applewebkit\/([0-9.]+)/i);
                if (version && version.length > 1) {
                    browser.webkitversion = version[1];
                }
                if (browser.ios) {
                    version = ua.match(/version\/([0-9.]+)/i);
                    if (version && version.length > 1) {
                        browser.ios = version[1];
                    }
                } else if (browser.android) {
                    version = ua.match(/android ([0-9.]+)/i);
                    if (version && version.length > 1) {
                        browser.android = parseInt(version[1].replace(/\./g, ''));
                    }
                }
            }
            JBWRC.uaVar = {
                browser: browser,
                support: support,
                device: browser.device
            }
            return JBWRC.uaVar;
        },
        isApp: function() {
            return this.uaVar.browser.isApp;
        },
        isMobile: function() {      // userAgent�� 釉뚮씪�곗�媛� 紐⑤컮�� 釉뚮씪�곗�濡� �몄떇�� 寃쎌슦
            return this.uaVar.browser.mobile;
        },
        isDesktop: function() {     // OS媛� desktop�� 寃쎌슦(�щ＼ �먮��덉씠�곕줈 �꾩씠�곗쓣 �ㅼ젙�� 寃쎌슦 true 諛섑솚, �ㅼ젣 �꾩씠�곗뿉�쒕뒗 false 諛섑솚
            return this.uaVar.browser.desktop;
        },
        isTablet: function() {
            return this.uaVar.browser.mobile && window.innerWidth >= 600;
        },
        isShortPc: function() {
            return window.innerWidth >= 900 && window.innerWidth < 1170;
        },
        isIos: function() {
            return this.uaVar.browser.ios;
        },
        isAndroid: function() {
            return this.uaVar.browser.android;
        },
        isIE: function() {
            return this.uaVar.browser.ie;
        },
        isPortrait: function() {
            return window.innerHeight >= window.innerWidth;
        },
        getDevice: function() {
            return this.uaVar.browser.device;
        },
        isIpadDevice: function() {
            const ua = navigator.userAgent.toLowerCase();
            if(ua.includes("ipad")) return true;
            if(navigator.platform === 'MacIntel' && navigator.maxTOuchPoints > 1) {
                return true
            };
            const w = Math.min(window.screen.width, window.screen.height);
            if(/iphone|ipod|ipad/.test(ua) || (navigator.platform === 'MacIntel' && w >= 768 && w <= 1366)) {
                return true;
            }
            if(navigator.userAgent.match(/Intel Mac OS X/i)) return true;
            return false;
        },
        goHome: function() {
            JBWRC.showLoading();
            location.href = '/';
            setTimeout(function(){JBWRC.hideLoading(true);},1000);
        },
        goHref: function(href) {
            JBWRC.showLoading();
            location.href = href;
            setTimeout(function(){JBWRC.hideLoading(true);},1000);
        },
        isNullValue: function(val) {
            return (val==null || typeof val=='undefined' || val=='');
        },
        loadingCnt: 0,
        showLoading: function(dim){
            try{
                if(typeof bkLoadingYn != 'undefined' && bkLoadingYn == "Y" && ($.browser.device == "AA" || $.browser.device == "IA")){
                    var args = {};
                    args.callbackId = "";
                    args.className = "JBNativeUIBR";
                    args.methods = "doNProgressDlgOpen";
                    //args.methods = "doNProgressDlgClose";
                    args.param = "";
                    if ($.browser.device == "IA" || $.browser.device == "IW") {
                        
                        if (jbwrcUtil.isBravoKoreaApp()) {
                            window.webkit.messageHandlers.JBPrivateBankBridge.postMessage(encodeURIComponent(JSON.stringify(args)));
                        } else {
                            if ( dim == 'dimm' ) {
                                $('body').addClass('pageloading dim');
                            } else {
                                $('body').addClass('pageloading');
                            }
                        }
                        
                    } else if ($.browser.device == "AA" || $.browser.device == "AW") {
                        
                        if (jbwrcUtil.isBravoKoreaApp()) {
                            window.JBPrivateBankBridge.callNative(encodeURIComponent(JSON.stringify(args)));
                        } else {
                            if ( dim == 'dimm' ) {
                                $('body').addClass('pageloading dim');
                            } else {
                                $('body').addClass('pageloading');
                            }
                        }
                        
                    } else {
                        //jbwrcUtil.goMainPage('0');
                    }
                    //window.JBPrivateBankBridge.callNative(encodeURIComponent(JSON.stringify(args)));
                    JBWRC.loadingCnt++;
                }else{                    
                    if ( dim == 'dimm' ) {
                        $('body').addClass('pageloading dim');
                    } else {
                        $('body').addClass('pageloading');
                    }
                    JBWRC.loadingCnt++;
                }
            }catch(e){
                if(typeof bkLoadingYn != 'undefined' && bkLoadingYn == "Y" && ($.browser.device == "AA" || $.browser.device == "IA")){
                    //alert("釉뚮씪蹂댁퐫由ъ븘 �덉쇅�뚯뒪��  "+bkLoadingYn+" , "+$.browser.device);
                }else{
                    if ( dim == 'dimm' ) {
                        $('body').addClass('pageloading dim');
                    } else {
                        $('body').addClass('pageloading');
                    }
                    JBWRC.loadingCnt++;                    
                }
            }            
            //console.info(`>>>> showLoading....:${JBWRC.loadingCnt}`);
            //console.trace();
        },        
        hideLoading: function(flag){
            //console.info(`>>>> hideLoading....:${JBWRC.loadingCnt}:${flag}`);
            //console.trace();
            if ( flag == true ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1  ) {
                if(typeof bkLoadingYn != 'undefined' && bkLoadingYn == "Y" && ($.browser.device == "AA" || $.browser.device == "IA")){
                    var args = {};
                    args.callbackId = "";
                    args.className = "JBNativeUIBR";
                    //args.methods = "doNProgressDlgOpen";
                    args.methods = "doNProgressDlgClose";
                    args.param = "";
                    if ($.browser.device == "IA" || $.browser.device == "IW") {
                        
                        if (jbwrcUtil.isBravoKoreaApp()) {
                            window.webkit.messageHandlers.JBPrivateBankBridge.postMessage(encodeURIComponent(JSON.stringify(args)));
                        } else {
                            $('body').removeClass('pageloading dim');
                        }
                        
                    } else if ($.browser.device == "AA" || $.browser.device == "AW") {
                        
                        if (jbwrcUtil.isBravoKoreaApp()) {
                            window.JBPrivateBankBridge.callNative(encodeURIComponent(JSON.stringify(args)));
                        } else {
                            $('body').removeClass('pageloading dim');
                        }
                        
                    } else {
                        //jbwrcUtil.goMainPage('0');
                    }
                    //window.JBPrivateBankBridge.callNative(encodeURIComponent(JSON.stringify(args)));
                    JBWRC.loadingCnt = 0;
                    JBWRC.hideLoadingRandom(true,true);
                }
                else{
                    $('body').removeClass('pageloading dim');
                    JBWRC.loadingCnt = 0;
                    JBWRC.hideLoadingRandom(true,true);
                }
            } else {
                JBWRC.loadingCnt--;
            }
        },
        showLoadingSec: function(dim){
            JBWRC.showLoading();
            setTimeout(function(){JBWRC.hideLoading(true);},2000);
        },
        showLoadingSkeleton : function(){
            $('.skeleton').removeClass('hidden');
            $('.conwrap').addClass('hidden');
        },
        hideLoadingSkeleton : function(){
            $('.conwrap').removeClass('hidden');
            $('.skeleton').addClass('hidden');
        },
        showLoadingSkeletonApp : function(){
            $('body').addClass('pageloading-app');
        },
        hideLoadingSkeletonApp : function(){
            $('body').removeClass('pageloading-app');
        },

        loadingMsg:{
            //��異쒖긽�덉“��
            type1:[
                {startTime:0,  title:"怨좉컼�섍퍡 �� 留욌뒗 �곹뭹�� 李얘퀬 �덉뼱��.", subTitle:"議곌툑留� 湲곕떎�ㅼ＜�몄슂!", desc:"�됯퇏 30珥� �뺣룄 嫄몃젮��."},
                {startTime:10, title:"議곌굔�� 留욌뒗 �곹뭹�� 瑗쇨세�� �뺤씤�섍퀬 �덉뼱��.", subTitle:"�좎떆留뚯슂!", desc:"�됯퇏 30珥� �뺣룄 嫄몃젮��."},
                {startTime:20, title:"�쒗깮 醫뗭� �곹뭹�� 怨좊Ⅴ�� 以묒씠�먯슂.", subTitle:"怨� �앸굹��!"},
                // {startTime:30, title:"�쒗깮 醫뗭� �곹뭹�� 怨좊Ⅴ�� 以묒씠�먯슂.", subTitle:"怨� �앸굹��!", desc:" "}, // �� �묎렐��(源쒕묀�꾧낵 踰덉찉�� �ъ슜 �쒗븳) 愿��� �섏젙
            ],
            //�좊텇利앹“��
            type2:[
                {startTime:0,  title:"怨좉컼�섏쓽 �뺣낫瑜� �뺤씤�섍퀬 �덉뼱��.", subTitle:"議곌툑留� 湲곕떎�ㅼ＜�몄슂!", desc:"理쒕� 30珥� �뺣룄 嫄몃젮��."},
                {startTime:10, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!", desc:"理쒕� 30珥� �뺣룄 嫄몃젮��."},
                {startTime:20, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!", desc:" "},
            ],
            //理쒖쥌�ъ궗
            type3:[
                {startTime:0,  title:"怨좉컼�섏쓽 �뺣낫瑜� �뺤씤�섍퀬 �덉뼱��.", subTitle:"議곌툑留� 湲곕떎�ㅼ＜�몄슂!", desc:"理쒕� 30珥� �뺣룄 嫄몃젮��."},
                {startTime:10, title:"��異� �ъ궗瑜� �쒖옉�좉쾶��.", subTitle:"�좎떆留뚯슂!", desc:"吏�湲� �꾨㈃ �ъ궗媛� 以묐떒�� �� �덉뼱��. �좎떆留� 湲곕떎�ㅼ＜�몄슂."},
                {startTime:20, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!"},
               // {startTime:30, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!", desc:" "}, // �� �묎렐��(源쒕묀�꾧낵 踰덉찉�� �ъ슜 �쒗븳) 愿��� �섏젙
            ],
            //遺��숈궛�뺣낫議고쉶
            type4:[
                {startTime:0,  title:"怨좉컼�섏쓽 �뺣낫瑜� �뺤씤�섍퀬 �덉뼱��.", subTitle:"議곌툑留� 湲곕떎�ㅼ＜�몄슂!", desc:"遺��숈궛 �뺣낫 議고쉶源뚯� �� 1遺꾩젙�� �뚯슂�� �� �덉뼱��."},
                {startTime:10, title:"遺��숈궛 �뺣낫瑜� 遺덈윭�ㅺ퀬 �덉뼱��.", subTitle:"議곌툑留� �� 湲곕떎�ㅼ＜�몄슂!", desc:"遺��숈궛 �뺣낫媛� �뺤씤�섏� �딆쑝硫�, 吏꾪뻾�� �대젮�� �� �덉뼱��."},
                {startTime:20, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!"},
                // {startTime:30, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!", desc:" "}, // �� �묎렐��(源쒕묀�꾧낵 踰덉찉�� �ъ슜 �쒗븳) 愿��� �섏젙
            ],
            //�꾩옄�쎌젙�꾨즺
            type5:[
                {startTime:0,  title:"怨좉컼�섏쓽 �좎껌 �댁슜�� �뺤씤�섍퀬 �덉뼱��.", subTitle:"議곌툑留� 湲곕떎�ㅼ＜�몄슂!", desc:"理쒕� 30珥� �뺣룄 嫄몃젮��."},
                {startTime:10, title:"�좎껌 �뺣낫瑜� �덉쟾�섍쾶 ���ν븯怨� �덉뼱��.", subTitle:"�좎떆留뚯슂!", desc:"吏�湲� �꾨㈃ ���μ씠 以묐떒�� �� �덉뼱��. �좎떆留� 湲곕떎�� 二쇱꽭��."},
                {startTime:20, title:"�좎껌 �뺣낫 ���μ씠 嫄곗쓽 �꾨즺�섏뿀�댁슂.", subTitle:"怨� �앸굹��!"},
                // {startTime:30, title:"留덉�留� �뺤씤�� 吏꾪뻾�섍퀬 �덉뼱��.", subTitle:"怨� �앸굹��!", desc:" "}, // �� �묎렐��(源쒕묀�꾧낵 踰덉찉�� �ъ슜 �쒗븳) 愿��� �섏젙
            ],
        },
        loadingMsgTimeouts: [],
        loadingMsgLastInterval: null,
        //1:而댄벂��, 2:�뗫낫湲�, 3:�몃윮, 4:�쇱�
        lottieObj : {
            loading1 : null
            , loading2 : null
            , loading3 : null
            , loading4 : null
            
        }, 
        loadingMsgStart: function(msgList){            
            //�꾩옱 蹂댁뿬吏�怨� �덈뒗 濡쒕뵫 �앹뾽
            let $pop = $('[id^="loading-full-"].show');
            let $title = $pop.find('.layerpop-tit');
            let $subTitle = $pop.find('.sub-txt');
            let $desc = $pop.find('.desc');
            let fadeInTime = 1500, fadeOutTime=3000;
            
            // �� �묎렐��(源쒕묀�꾧낵 踰덉찉�� �ъ슜 �쒗븳) 愿��� �섏젙
            JBWRC.loadingMsgTimeouts = msgList.map((item, index) => {
                let title = setMultiLangData(item.title);
                let subTitle = setMultiLangData(item.subTitle);
                let desc = setMultiLangData(item.desc);
                
                return setTimeout(()=>{
                    console.log(index);
                    if(index == 0){
                        item.title && $title.text(title);
                        item.subTitle && $subTitle.text(subTitle);
                        item.desc && $desc.text(desc);
                    
                    } else {
                        $pop.find('.layerpop-header').fadeOut(fadeInTime, function(){
                        item.title && $title.text(title);
                        item.subTitle && $subTitle.text(subTitle);
                        item.desc && $desc.text(desc);
                            
                        $(this).fadeIn(fadeOutTime);
                    });
                        
                    }
                }, item.startTime*1000); 
            });
            
            // 硫붿떆吏� �명듃 �덉빟 (留덉�留� 硫붿떆吏� �쒖쇅)
//            JBWRC.loadingMsgTimeouts = msgList.slice(0,-1).map((item, index) => {
//                let title = setMultiLangData(item.title);
//                let subTitle = setMultiLangData(item.subTitle);
//                let desc = setMultiLangData(item.desc);
//                return setTimeout(()=>{
//                    item.title && $title.fadeOut(fadeInTime, function(){$(this).text(title).fadeIn(fadeOutTime);});
//                    setTimeout(()=>{item.subTitle && $subTitle.fadeOut(fadeInTime, function(){$(this).text(subTitle).fadeIn(fadeOutTime);});}, 200);
//                    setTimeout(()=>{item.desc && $desc.fadeOut(fadeInTime, function(){$(this).text(desc).fadeIn(fadeOutTime);});}, 400);
//                }, item.startTime*1000); 
//            });
            
            // 留덉�留� 硫붿떆吏� 諛섎났 �덉빟
//            fadeInTime = fadeOutTime = 1000;
//            const lastMsg = msgList[msgList.length -1];            
//            setTimeout(() => { 
//                let title = setMultiLangData(lastMsg.title);
//                let subTitle = setMultiLangData(lastMsg.subTitle);
//                let desc = setMultiLangData(lastMsg.desc);
//                JBWRC.loadingMsgLastInterval = setInterval(()=>{
//                    lastMsg.title && $title.fadeOut(fadeInTime, function(){$(this).text(title).fadeIn(fadeOutTime);});
//                    lastMsg.subTitle && $subTitle.fadeOut(fadeInTime, function(){$(this).text(subTitle).fadeIn(fadeOutTime);});
//                    lastMsg.desc && $desc.fadeOut(fadeInTime, function(){$(this).text(desc).fadeIn(fadeOutTime);});
//                }, 5 * 1000);
//            }, lastMsg.startTime * 1000);

        },
        loadingMsgEnd: function(){
            JBWRC.loadingMsgTimeouts.forEach(timeout => clearTimeout(timeout));
            if(JBWRC.loadingMsgLastInterval){
                clearInterval(JBWRC.loadingMsgLastInterval);
            }
        },
        showImgGifLoading(popId, msgList){
            fnOpenLayerPop(popId);
            JBWRC.loadingCnt++;

            msgList && JBWRC.loadingMsgStart(msgList);
        },
        showLoading1: function(msgList){
            var popId = 'loading-full-1';
            
            
            if(JBWRC.lottieObj.loading1) { JBWRC.lottieObj.loading1.destroy();}
            
            // 250707 lottie js 異붽�
            if(lottie) {
                JBWRC.lottieObj.loading1 = lottie.loadAnimation({
                    container: document.getElementById('loading1'), // �좊땲硫붿씠�섏쓣 蹂댁뿬以� DOM
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/assets/img/gif/motion_loading1.json' // JSON �좊땲硫붿씠�� 寃쎈줈
                });
            }
            
            JBWRC.showImgGifLoading(popId, msgList ? msgList : JBWRC.loadingMsg.type2);
        },
        hideLoading1: function(flag){
            if ( flag == true ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1 ) {
                fnCloseLayerPop('loading-full-1');
                if(JBWRC.lottieObj.loading1) { JBWRC.lottieObj.loading1.destroy();}
                JBWRC.loadingCnt = 0;
                JBWRC.loadingMsgEnd();
            } else {
                JBWRC.loadingCnt--;
            }            
        },
        showLoading2: function(msgList){
            var popId = 'loading-full-2';
            
            if(JBWRC.lottieObj.loading2) { JBWRC.lottieObj.loading2.destroy();}
            
            // 250707 lottie js 異붽�
            if(lottie) {
                JBWRC.lottieObj.loading2 = lottie.loadAnimation({
                    container: document.getElementById('loading2'), // �좊땲硫붿씠�섏쓣 蹂댁뿬以� DOM
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/assets/img/gif/motion_loading2.json' // JSON �좊땲硫붿씠�� 寃쎈줈
                });
                JBWRC.lottieObj.loading2.setSpeed(2);
            }
            
            
            JBWRC.showImgGifLoading(popId, msgList);
        },
        hideLoading2: function(flag){
            if ( flag == true ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1 ) {
                fnCloseLayerPop('loading-full-2');
                if(JBWRC.lottieObj.loading2) { JBWRC.lottieObj.loading2.destroy();}
                JBWRC.loadingCnt = 0;
                JBWRC.loadingMsgEnd();
            } else {
                JBWRC.loadingCnt--;
            }
         },
        showLoading3: function(msgList){
            if( !JBWRC.isMobile() ){
                JBWRC.showLoading();
                return;
            }
            jbwrcUtil.pageUtil.pageClickLog('EsignLoading_R', 'render');
            var popId = 'loading-full-3';
            
            if(JBWRC.lottieObj.loading3) { JBWRC.lottieObj.loading3.destroy();}
            
            // 250707 lottie js 異붽�
            if(lottie) {
                JBWRC.lottieObj.loading3 = lottie.loadAnimation({
                    container: document.getElementById('loading3'), // �좊땲硫붿씠�섏쓣 蹂댁뿬以� DOM
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/assets/img/gif/motion_loading3.json' // JSON �좊땲硫붿씠�� 寃쎈줈
                });
            }
            
            JBWRC.showImgGifLoading(popId, msgList);
        },
        hideLoading3: function(flag){
            if( !JBWRC.isMobile() ){
                JBWRC.hideLoading();
                return;
            }
            
            if ( flag == true ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1 ) {
                fnCloseLayerPop('loading-full-3');
                if(JBWRC.lottieObj.loading3) { JBWRC.lottieObj.loading3.destroy();}
                JBWRC.loadingCnt = 0;
                JBWRC.loadingMsgEnd();
            } else {
                JBWRC.loadingCnt--;
            }            
        },
        showLoading4: function(msgList){
            var popId = 'loading-full-4';
            
            if(JBWRC.lottieObj.loading4) { JBWRC.lottieObj.loading4.destroy();}
            
            // 250707 lottie js 異붽�
            if(lottie) {
                JBWRC.lottieObj.loading4 = lottie.loadAnimation({
                    container: document.getElementById('loading4'), // �좊땲硫붿씠�섏쓣 蹂댁뿬以� DOM
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/assets/img/gif/motion_loading4.json' // JSON �좊땲硫붿씠�� 寃쎈줈
                });
                
                JBWRC.lottieObj.loading4.setSpeed(1.5);
            }
            
            
            JBWRC.showImgGifLoading(popId, msgList);
        },
        hideLoading4: function(flag){
            if ( flag == true ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1 ) {
                fnCloseLayerPop('loading-full-4');
                if(JBWRC.lottieObj.loading4) { JBWRC.lottieObj.loading4.destroy();}
                JBWRC.loadingCnt = 0;
                JBWRC.loadingMsgEnd();
            } else {
                JBWRC.loadingCnt--;
            }            
        },
        //�붽굔 蹂�寃� : 2媛� �대�吏� (�뗫낫湲�,�쇱�)留� �쒕뜡 (loadingMsg.type2,type4)
        showLoadingRandom: function(msgList){
            /* if(msgList == JBWRC.loadingMsg.type3) {
                JBWRC.showLoading1(msgList);
                return;
            } */
            if(msgList == JBWRC.loadingMsg.type5) {
                JBWRC.showLoading3(msgList);
                return;
            }
            var randomDiv = Math.floor(Math.random() * 2) + 1;
            if ( randomDiv == 1 ) { JBWRC.showLoading2(msgList); }
            else if ( randomDiv == 2 ) { JBWRC.showLoading4(msgList); }
            else { JBWRC.showLoading2(msgList); }
            console.log("randomDiv:"+randomDiv);
        },
        hideLoadingRandom: function(flag,isExcludeType3){
            if ( flag == true && JBWRC.loadingCnt > 1 ) { JBWRC.loadingCnt = 1; }
            if ( JBWRC.loadingCnt <= 1 ) {
                //fnCloseLayerPop('loading-full-1');
                if( $('#loading-full-2.show').length > 0) fnCloseLayerPop('loading-full-2');
                if( !isExcludeType3 ) { if( $('#loading-full-3.show').length > 0) fnCloseLayerPop('loading-full-3'); }
                if( $('#loading-full-4.show').length > 0) fnCloseLayerPop('loading-full-4');
                //if(JBWRC.lottieObj.loading1) { JBWRC.lottieObj.loading1.destroy();}
                if(JBWRC.lottieObj.loading2) { JBWRC.lottieObj.loading2.destroy();}
                if( !isExcludeType3 && JBWRC.lottieObj.loading3 ) { JBWRC.lottieObj.loading3.destroy();}
                if(JBWRC.lottieObj.loading4) { JBWRC.lottieObj.loading4.destroy();}
                if( !isExcludeType3 ) {
                    JBWRC.loadingCnt = 0;
                    JBWRC.loadingMsgEnd();
                }                
            } else {
                JBWRC.loadingCnt--;
            }            
        },        
        layerPopup: {
            hasAlert : false,     
            opt : {},     
            confirm: function() {
                var opt = JBWRC.layerPopup.opt;
                var callbckBeforeFocus = ""; // okCallback �ㅽ뻾 �� focus �꾩튂
                var callbckAfterFocus = ""; // okCallback �ㅽ뻾 �� focus �꾩튂
                
                if ( typeof opt.okCallback == 'function' ) {
                    
                    callbckBeforeFocus = $(':focus')[0];
                    
                    opt.okCallback(opt);
                    
                    callbckAfterFocus = $(':focus')[0];
                    
                    // okCallback �ㅽ뻾 �� focus�� okCallback �ㅽ뻾 �� focus媛� �ㅻ� 寃쎌슦 湲곗〈 �ъ빱�� �꾩튂濡� �대룞 �섏� �딅룄濡� 泥섎━. 
                    if(callbckBeforeFocus != callbckAfterFocus){
                        $('[aria-controls="_alert"]').removeAttr('aria-controls');
                    }
                }
                fnCloseLayerPop('_alert');
                $('#_alert').remove();
                $('[aria-controls="_alert"]').removeAttr('aria-controls');
                JBWRC.layerPopup.opt = {};
            },
            cancel: function() {
                var opt = JBWRC.layerPopup.opt;
                var callbckBeforeFocus = ""; // cancelCallback �ㅽ뻾 �� focus �꾩튂
                var callbckAfterFocus = ""; // cancelCallback �ㅽ뻾 �� focus �꾩튂
                
                if ( typeof opt.cancelCallback == 'function' ) {
                    callbckBeforeFocus = $(':focus')[0];
                    
                    opt.cancelCallback(opt);
                    
                    callbckAfterFocus = $(':focus')[0];
                    
                    //cancelCallback �ㅽ뻾 �� focus�� cancelCallback �ㅽ뻾 �� focus媛� �ㅻ� 寃쎌슦 湲곗〈 �ъ빱�� �꾩튂濡� �대룞 �섏� �딅룄濡� 泥섎━.
                    if(callbckBeforeFocus != callbckAfterFocus){
                        $('[aria-controls="_alert"]').removeAttr('aria-controls');
                    }
                    
                }
                fnCloseLayerPop('_alert');
                $('#_alert').remove();
                $('[aria-controls="_alert"]').removeAttr('aria-controls');
                JBWRC.layerPopup.opt = {};
            },            
            close: function() {
                fnCloseLayerPop('_alert');
                $('#_alert').remove();
                JBWRC.layerPopup.opt = {};
            },
        },
        notifycation : function (_msg, _callback) {
            
            var $toastWrap = $('<div id="_toastPopup" class="toast-wrap"></div>');
            var $toastCont = $('<div class="toast-contents"></div>');
            var $toastP    = $('<p data-lang="">' + _msg + '</p>');
          
            $toastCont.append($toastP);
            $toastWrap.append($toastCont);
            $('body').append($toastWrap);
            
            fnToastPop('_toastPopup');    
            
            if(! jbwrcFnc.isNull(_callback)){
                setTimeout(function () {
                    if (typeof _callback == "function") {
                        _callback();
                    }else {
                        new Function('return ' + _callback)()();
                    }
                }, 4000);
            }
            
        },
        /**
         * �뚮┝ 硫붿꽭吏� �ㅽ뻾
         * @param msg             : �뚮┝ 硫붿꽭吏�
         * @param openDelay       : �뚮┝ 硫붿꽭吏� �ㅽ뻾 delay
         * @param liveTime        : �뚮┝ �쒖텧 �쒓컙 ( default : 2000 )
         * @example
         *      callNoti("�몄쬆踰덊샇 �좏슚�쒓컙�� 寃쎄낵�섏뿬 �ъ슂泥�씠 �꾩슂�⑸땲��.", 500 );
         *      callNoti("�몄쬆踰덊샇 �좏슚�쒓컙�� 寃쎄낵�섏뿬 �ъ슂泥�씠 �꾩슂�⑸땲��.", 500 , 3000 );
         *      
         */
        callNoti: function( msg, openDelay, liveTime ){
            setTimeout(function(){
                //JBWRC.notifycation.open( msg ,liveTime );
                JBWRC.notifycation(msg);
            },openDelay);
        },
        alert: function( text, opt ){
            if(opt == null || opt == undefined){
                opt = {};
            }
            if (typeof text === 'object') {
                console.log(text);
            }
            
            // �ъ빱�ㅻ맂 �섎━硫섑듃�� aria-controls attr�� �놁쓣 寃쎌슦
            if(!$(':focus').is('[aria-controls]')) {
                $('[aria-controls="_alert"]').removeAttr('aria-controls'); // 湲곗〈 aria-controls="alert" �쒓굅
                $(':focus').attr('aria-controls', '_alert'); // �꾩옱 �ъ빱�� �꾩튂�� aria-controls="_alert" �명똿
            }
            
            //if (JBWRC.layerPopup.hasAlert) return;
            if($('#_alert').length){
                fnCloseLayerPop('_alert');
                $('#_alert').remove();                
            }
            
            $.get('/global/xtractor/notiPop.do?msg=' + text);
            JBWRC.layerPopup.opt = opt;
            var alertHTML = '';
            alertHTML += '<div id="_alert" class="layerpop-wrap type-confirm" role="dialog" aria-modal="true" aria-labelledby="layerpop_tit3" style="z-index: 1999;">';
            alertHTML += '  <div class="layerpop" tabindex="-1">';
            alertHTML += '    <div class="layerpop-header">';
            alertHTML += '      <p id="layerpop_tit3" class="layerpop-tit" data-lang=""><span class="blind">�뚮┝</span></p>';
            ////alertHTML += '      <button class="btn-close" onClick="JBWRC.layerPopup.close()";><span class="blind">�앹뾽 �リ린</span></button>';
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-contents">';
            alertHTML += '      <div class="alert-txt-wrap">';
            if ( opt && jbwrcFnc.isNull(opt.bodyTitle) ) {
                //
            } else {
                alertHTML += '        <p class="alert-tit" data-lang="">'+opt.bodyTitle+'</p>';
            }                          
            
            alertHTML += '        <p class="alert-desc" data-lang="">'+text+'</p>';
            alertHTML += '      </div>';
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-footer">';
            if ( opt && jbwrcFnc.isNull(opt.cancelBtnText) ) {
                //
            } else {
                alertHTML += '<button class="btn-lg btn-secondary" onClick="JBWRC.layerPopup.cancel();">'+opt.cancelBtnText+'</button>';
            }    
            if ( opt && jbwrcFnc.isNull(opt.okBtnText) ) {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">�뺤씤</button>';
            } else {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">'+opt.okBtnText+'</button>';
            }    
            
            alertHTML += '    </div>';
            alertHTML += '  </div>';
            alertHTML += '</div>';

            $('body').append(alertHTML);
            if(!jbwrcFnc.isNull(text)){
                if(text.indexOf("怨좉컼�섏씠 �낅젰�섏떊 �댁슜�� 泥섎━�섎뒗 �숈븞 臾몄젣媛� 諛쒖깮�덉뼱��.") >= 0 || text.indexOf("怨좉컼�섏씠 �붿껌�섏떊 �댁슜�� 泥섎━�섎뒗 �숈븞 臾몄젣媛� 諛쒖깮�덉뼱��.")  >= 0){
                    jbwrcUtil.pageUtil.pageClickLog('Eerror_S', 'show');
                }
            }
            fnOpenLayerPop('_alert');
        },
        alertAlreadyProgress(type, rspnCd, callbackFn){
            JBWRC.hideLoading(true);
            jbwrcUtil.pageUtil.pageClickLog('CntrInProgress_S', 'show'); //, 吏꾪뻾以묒씤 �곹뭹 蹂댁쑀 �앹뾽
            var bodyTitle = '吏꾪뻾 以묒씤 �곹뭹�� �덉뼱��';
            var msg = '�대� 吏꾪뻾以묒씤 �곹뭹�� �덉뼱��.<br>�뺤씤 �� �ㅼ떆 吏꾪뻾�댁＜�몄슂.';
            var desc = '�먯꽭�� �댁슜�� <a href="tel:1688-8700" class="fc-blue">��1688-8700</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.';
            
            //TODO : UW : 24WP0092 : �곹뭹/遺��쒕퀎 臾멸뎄 �곸슜 �꾩슂
            //TM/�ㅼ씠�됲듃 : '�먯꽭�� �댁슜�� <a href="tel:1688-8700" class="fc-blue">��1688-8700</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.';
            //�ㅽ넗ODS�꾩껜 : '�먯꽭�� �댁슜�� �대떦 吏곸썝�먭쾶 臾몄쓽 遺��곷뱶�ㅼ슂.';
            //紐⑥쭛��-媛쒖씤湲덉쑖1�쇳꽣 : '�먯꽭�� �댁슜�� <a href="tel:02-6119-6000" class="fc-blue">��02-6119-6000</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.';
            //紐⑥쭛��-媛쒖씤湲덉쑖2�쇳꽣 : '�먯꽭�� �댁슜�� <a href="tel:02-6020-6820" class="fc-blue">��02-6020-6820</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.';
            //紐⑥쭛��-二쇳깮�대낫��異�,�ㅼ씠�됲듃 二쇳깮�대낫��異�/�닿뎄�� : '�먯꽭�� �댁슜�� <a href="tel:02-6910-2497" class="fc-blue">��02-6910-2497</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.';
            desc = type === 'auto' ? '�먯꽭�� �댁슜�� �대떦 吏곸썝�먭쾶 臾몄쓽 遺��곷뱶�ㅼ슂.'
                : type === '000322' ? '�먯꽭�� �댁슜�� <a href="tel:02-6119-6000" class="fc-blue">��02-6119-6000</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.'//, 媛쒖씤湲덉쑖�쇳꽣 : 000322
                : type === '000330' ? '�먯꽭�� �댁슜�� <a href="tel:02-6910-2497" class="fc-blue">��02-6910-2497</a>�쇰줈 臾몄쓽 遺��곷뱶�ㅼ슂.'//, �쇰컲湲덉쑖�� : 000330
                : desc;

            if(!jbwrcUtil.isRealServer){
                //rspnCd && (msg += '<br>' + rspnCd);
            }
            msg += '<br><br>' + desc;

            JBWRC.alert( setMultiLangData(msg), {
                bodyTitle: bodyTitle,
                okBtnText: setMultiLangData("�뺤씤"),
                cancelBtnText: "",  // 鍮꾩뼱�덈뒗 臾몄옄�� �낅젰�� 踰꾪듉 �щ씪吏�
                okCallback: function(){
                    if( callbackFn && typeof callbackFn === 'function' ) {
                        callbackFn();
                    } else {
                        JBWRC.showLoading();                                                                       
                        jbwrcUtil.goMainPage('0'); //�덉쑝濡�
                    }
                },
            });
        },
        //�꾨Ц�ㅻ쪟�� �먮룞 �ㅻ쪟硫붿떆吏� �앹뾽
        errorAlert: function( userViewMsg, sysViewMsg, opt ){
            if(opt == null || opt == undefined){
                opt = {};
            }
            
            // �ъ빱�ㅻ맂 �섎━硫섑듃�� aria-controls attr�� �놁쓣 寃쎌슦
            if(!$(':focus').is('[aria-controls]')) {
                $('[aria-controls="_alert"]').removeAttr('aria-controls'); // 湲곗〈 aria-controls="alert" �쒓굅
                $(':focus').attr('aria-controls', '_alert'); // �꾩옱 �ъ빱�� �꾩튂�� aria-controls="_alert" �명똿
            }
            
            //if (JBWRC.layerPopup.hasAlert) return;
            if($('#_alert').length){
                fnCloseLayerPop('_alert');
                $('#_alert').remove();                
            }
            
            $.get('/global/xtractor/notiPop.do?msg=' + userViewMsg);
            
            JBWRC.layerPopup.opt = opt;
            var alertHTML = '';
            alertHTML += '<div id="_alert" class="layerpop-wrap type-confirm" role="dialog" aria-modal="true" aria-labelledby="layerpop_tit2" style="z-index: 1999;" jbevent-show="Eerror_S">';
            alertHTML += '  <div class="layerpop" tabindex="-1">';
            alertHTML += '    <div class="layerpop-header">';
            alertHTML += '      <p id="layerpop_tit3" class="layerpop-tit" data-lang=""><span class="blind">�뚮┝</span></p>';
            //alertHTML += '      <button class="btn-close" onClick="JBWRC.layerPopup.close()";><span class="blind">�앹뾽 �リ린</span></button>';
            if(!jbwrcUtil.isRealServer &&  !jbwrcFnc.isNull(sysViewMsg) ){
                alertHTML += '      <button type="button" class="btn-sm" style="position:absolute;left:2rem;top:1.6rem;" onclick="$(\'.etc-detail\').slideToggle()">�곸꽭蹂닿린</button>';
            }
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-contents">';
            alertHTML += '      <div class="alert-txt-wrap">';
            if ( opt && jbwrcFnc.isNull(opt.bodyTitle) ) {
                //
            } else {
                alertHTML += '        <p class="alert-tit" data-lang="">'+opt.bodyTitle+'</p>';
            }                                      
            alertHTML += '        <p class="alert-desc" data-lang="">'+userViewMsg+'</p>';            
            alertHTML += '      </div>';
            
            if(!jbwrcUtil.isRealServer &&  !jbwrcFnc.isNull(sysViewMsg) ){
                alertHTML += '        <p class="ta-c etc-detail" style="display:none;">'+sysViewMsg+'</p>';                
            }
            
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-footer">';
            if ( opt && jbwrcFnc.isNull(opt.cancelBtnText) ) {
                //
            } else {
                alertHTML += '<button class="btn-lg btn-secondary" onClick="JBWRC.layerPopup.cancel();">'+opt.cancelBtnText+'</button>';
            }    
            if ( opt && jbwrcFnc.isNull(opt.okBtnText) ) {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">�뺤씤</button>';
            } else {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">'+opt.okBtnText+'</button>';
            }    
            
            alertHTML += '    </div>';
            alertHTML += '  </div>';
            alertHTML += '</div>';

            $('body').append(alertHTML);
            jbwrcUtil.pageUtil.pageClickLog('Eerror_S', 'show');
            fnOpenLayerPop('_alert');
        },
        //紐낆떆�� �ㅻ쪟 怨듯넻 �앹뾽
        errorCommon: function( msgCode, opt ){
            var topErrMsg = '�덉긽�섏� 紐삵븳 �ㅻ쪟媛� 諛쒖깮�덉뼱��.';
            var userViewErrorMessage = '�쇱떆�곸씤 �꾩긽�닿굅�� �ㅽ듃�뚰겕 臾몄젣�� �� �덉뒿�덈떎.';
            var detailErrMsg = '臾몄젣媛� 吏��띾맆 寃쎌슦 JB�곕━罹먰뵾�� �ㅼ씠�됲듃 <a href="tel:1566-5511" class="fc-blue">1566-5511</a> �먮뒗 <a href="/cst/cap/JCSTCAP0001.do" class="fc-blue">怨좉컼�쇳꽣</a>瑜� �댁슜�댁＜�몄슂.';
            if(opt == null || opt == undefined){
                opt = {};
            }
            
            // �ъ빱�ㅻ맂 �섎━硫섑듃�� aria-controls attr�� �놁쓣 寃쎌슦
            if(!$(':focus').is('[aria-controls]')) {
                $('[aria-controls="_alert"]').removeAttr('aria-controls'); // 湲곗〈 aria-controls="alert" �쒓굅
                $(':focus').attr('aria-controls', '_alert'); // �꾩옱 �ъ빱�� �꾩튂�� aria-controls="_alert" �명똿
            }
            
            if($('#_alert').length){
                fnCloseLayerPop('_alert');
                $('#_alert').remove();
            }
                        
            var currUrl = window.location.href;
                      
            //硫붿떆吏�媛� �녿뒗 寃쎌슦 �쒕쾭硫붿떆吏�瑜� 媛��몄샂.
            if ( opt && jbwrcFnc.isNull(opt.userViewErrorMessage) ) {
                userViewErrorMessage = "";
                jbwrcUtil.customAjax({
                    url : '/cmm/getCommMsg.do'     // url 
                    , data : {errorCode : msgCode}                    // param
                    , beforeShow : true            // 濡쒕뵫諛� �щ� 
                    , compleShow : true            // 濡쒕뵫諛� �щ� 
                    , callBack : function(result){ // 肄쒕갚
                        var keys = Object.keys(result);
                        for(var i = 0; i < keys.length; i++ ){
                            var inCode = keys[i];
                            var inMsg  = result[inCode];
                            //console.log("inCode:"+inCode+" inMsg:"+inMsg);
                            if(msgCode == inCode){
                                userViewErrorMessage = inMsg;
                                var errMsg = inMsg;
                                //console.log("msgCode:"+msgCode+" userViewErrorMessage:"+userViewErrorMessage);

                                if(errMsg.indexOf("����/���� �쒖뒪�� �곌퀎 �� �ㅻ쪟 �꾨Ц�� �묐떟諛쏆븯�듬땲��") >= 0 || errMsg.indexOf("議곗옉") >= 0 ){
                                    userViewErrorMessage = "�쇱떆�곸쑝濡� �쒕퉬�ㅺ� 吏��곕릺怨� �덉뒿�덈떎.<br>�쒕퉬�� �댁슜�� 遺덊렪�� �쒕젮 二꾩넚�⑸땲��.";
                                }
                                if(msgCode.indexOf("BECOR0774") >= 0 ){ //[BECOR0774]KCB �몄쬆�� �ㅽ뙣�섏��듬땲��.
                                    if(errMsg.indexOf("B002") >= 0 ){
                                        userViewErrorMessage = "�ㅻ챸�몄쬆�� �ㅽ뙣�섏��듬땲��(�대떦 �대쫫 誘몄〈��).<br>怨좉컼紐낆쓣 �뺤씤�섏떆怨� �ㅼ떆 吏꾪뻾�섏떆湲� 諛붾엻�덈떎.";                
                                    }else{
                                        userViewErrorMessage = "�ㅻ챸�몄쬆�� �ㅽ뙣�섏��듬땲��.<br>�먯꽭�� �ы빆�� 怨좉컼�쇳꽣�� 臾몄쓽 諛붾엻�덈떎.";             
                                    }
                                }
                                else if(errMsg.indexOf("�곷떞湲곗���(3媛쒖썡)�댁뿉") >= 0 ){ //�곷떞湲곗���(3媛쒖썡)�댁뿉 �꾩＜吏��� �곷떞嫄댁씠 議댁옱�⑸땲��.[�곷떞踰덊샇:2018032311174], [泥섎━�먯냼�띾���:000293].
                                    if(mrggYn == "Y") {  // 紐④린吏� �곷떞�� 寃쎌슦
                                        userViewErrorMessage = "二쇳깮�대낫��異� �대떦遺���(��02-6910-2497)�쇰줈 臾몄쓽二쇱떆湲� 諛붾엻�덈떎.";
                                    }else{
                                        userViewErrorMessage = "�좎슜��異� �대떦遺���(��1688-8700)�쇰줈 臾몄쓽二쇱떆湲� 諛붾엻�덈떎.";
                                    }                                     
                                }
                                else if(errMsg.indexOf("�뱀씤�섎ː 以묒엯�덈떎") >= 0 ){ //�섏썝以묎퀬李⑥쟾臾몄��먯뿉�� �몄쿇以묎퀬李⑥쟾臾몄��먯뿉 �뱀씤�섎ː 以묒엯�덈떎.[2018040411254], [泥섎━�먯냼�띾���:000293].
                                    userViewErrorMessage = "�ㅻⅨ吏��� �곷떞嫄댁씠 議댁옱�섏뿬 吏��먯쿂由ы썑 �곷떞�� 媛��ν빀�덈떎.";         
                                }
                                else if(errMsg.indexOf("�곸뾽�덉쓽 湲곗�怨� �곸씠 �⑸땲��") >= 0 ){ //臾쇳뭹肄붾뱶 �� 蹂�寃쎈릺�� �곸뾽�덉쓽 湲곗�怨� �곸씠 �⑸땲��.�곸뾽�뱀씤�덉쓽踰덊샇:20180405013.
                                    userViewErrorMessage = "怨꾩빟議곌굔�� 蹂�寃쎈릺�� 吏꾪뻾�� 遺덇��⑸땲��.";         
                                }
                                else if(errMsg.indexOf("�곸뾽�덉쓽 湲곗�怨� �곸씠 �⑸땲��") >= 0 ){ //怨꾩빟�섏젙�� �� �녿뒗 �묒닔�곹깭�대�濡� 怨꾩빟�섏젙��(��) 泥섎━�� �� �놁뒿�덈떎.
                                    userViewErrorMessage = "怨꾩빟議곌굔�� 蹂�寃쎈릺�� �붿씠�� 吏꾪뻾�� 遺덇��⑸땲��.";          
                                }
                                else if(errMsg.indexOf("�먯꽭�� �댁슜�� �대떦 �곸뾽�ъ썝�먭쾶 臾몄쓽�� 二쇱꽭��") >= 0 ){ //怨꾩빟�섏젙�� �� �녿뒗 �묒닔�곹깭�대�濡� 怨꾩빟�섏젙��(��) 泥섎━�� �� �놁뒿�덈떎.
                                    userViewErrorMessage = "�붿씠�� 吏꾪뻾�� 遺덇��ν빀�덈떎.<br>�먯꽭�� �댁슜�� �대떦 �곸뾽�ъ썝�먭쾶 臾몄쓽�� 二쇱꽭��.";          
                                }
                                else if(errMsg.indexOf("蹂몄궗�묒쓽 �꾨즺�� 吏꾪뻾諛붾엻�덈떎") >= 0 ){ //蹂몄궗�묒쓽 �꾨즺�� 吏꾪뻾諛붾엻�덈떎
                                    userViewErrorMessage = "�꾩옱 怨좉컼�섏� �댁슜 媛��ν븳 ��異쒖떊泥� 議곌굔�� �놁뒿�덈떎.";
                                }
                                else if(errMsg.indexOf("[ARS 怨꾩빟]議고쉶 �곗씠�곌� �놁뒿�덈떎") >= 0 ){ //[ARS 怨꾩빟]議고쉶 �곗씠�곌� �놁뒿�덈떎.
                                    userViewErrorMessage = "ARS�몄쬆 �붿껌以� �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.";         
                                }
                                else if(errMsg.indexOf("���쒖옄�� 媛쒖씤�ъ뾽�먮쭔 媛��ν빀�덈떎") >= 0 ){ //怨꾩궛�� 諛쒖넚�먮뒗 怨꾩빟�� 蹂몄씤怨� 怨꾩빟�먭� ���쒖옄�� 媛쒖씤�ъ뾽�먮쭔 媛��ν빀�덈떎.
                                    userViewErrorMessage = "�ъ뾽�� �뺣낫�� 媛쒖씤�ъ뾽�먮쭔 媛��ν빀�덈떎.";        
                                }
                                else if(errMsg.indexOf("�낅젰�� �ъ뾽�먮벑濡앸쾲�몄씠(媛�) �щ컮瑜댁�") >= 0 ){ // �낅젰�� �ъ뾽�먮벑濡앸쾲�몄씠(媛�) �щ컮瑜댁� �딆뒿�덈떎. 
                                    userViewErrorMessage = "�낅젰�� �ъ뾽�먮벑濡앸쾲�몄씠(媛�) �щ컮瑜댁� �딆뒿�덈떎.";        
                                }
                                else if(errMsg.indexOf("�곗씠�곌� 2嫄댁씠�� 議댁옱�섏뿬 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��") >= 0 ){ // �곗씠�곌� 2嫄댁씠�� 議댁옱�섏뿬 �ㅻ쪟媛� 諛쒖깮�섏��듬땲�� 
                                    userViewErrorMessage = "�뺣낫議고쉶以� �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.";         
                                }
                                else if(errMsg.indexOf("�곗씠�곌� 議댁옱�섏� �딆뒿�덈떎") >= 0 ){ // �곗씠�곌� 議댁옱�섏� �딆뒿�덈떎 
                                    userViewErrorMessage = "�뺣낫議고쉶以� �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.";        
                                }
                                else if(errMsg.indexOf("�좏슚湲곌컙�� 留뚮즺�섏뿀�듬땲��.寃ъ쟻�쇱옄") >= 0 ){ // 寃ъ쟻�뺣낫��(瑜�) �뺤씤�섏꽭��.(�좏슚湲곌컙�� 留뚮즺�섏뿀�듬땲��.寃ъ쟻�쇱옄:20180906)
                                    userViewErrorMessage = "�좏슚湲곌컙�� 留뚮즺�� 寃ъ쟻�뺣낫�낅땲��.";        
                                }
                                else if(errMsg.indexOf("湲곕�異� 李⑤�以묐났 �뺤씤���곴굔�낅땲��") >= 0 ){ //湲곕�異� 李⑤�以묐났 �뺤씤���곴굔�낅땲��. 吏��� �대떦�먯뿉寃� 臾몄쓽�섏뿬 李⑤�以묐났 �댁��� 吏꾪뻾諛붾엻�덈떎
                                    userViewErrorMessage = "怨좉컼�섍퍡�쒕뒗 �곷떞�먯쓣 �듯빐 吏꾪뻾媛��ν븯��땲��.";          
                                }
                                else if(errMsg.indexOf("BECOR0791") >= 0 ){                         
                                    if(errMsg.indexOf("�몄쬆��") >= 0){
                                        userViewErrorMessage = "�깅줉�� 怨듬룞�몄쬆�쒓� 議댁옱�섏� �딆뒿�덈떎.<br>��젣�섏떎�� �놁뒿�덈떎.";
                                    }
                                }
                                else if(errMsg.indexOf("異붽��뺣낫 �뺤씤") >= 0 ){
                                    userViewErrorMessage = "怨좉컼�섍퍡�� �좎껌�섏떊 ��異쒖젙蹂댁� �쒖뒪�쒖뿉 ���λ맂 ��異쒖젙蹂닿� �쇱튂�섏� �딆뒿�덈떎.<br/>異붽��뺣낫 �뺤씤�� �꾪빐 怨좉컼�쇳꽣(1566-5511)濡� �곕씫二쇱떆湲� 諛붾엻�덈떎.";    
                                }
                                else if(errMsg.indexOf("�쎌젙 �좏슚�쇱씠 珥덇낵�섏��듬땲��.") >= 0 ){
                                    userViewErrorMessage = "怨좉컼�섏쓽 �쎌젙 �좏슚�쇱씠 留뚮즺�섏뼱<br/>�댁뼱�� 吏꾪뻾�� �� �놁뒿�덈떎.<br/>泥섏쓬遺��� 吏꾪뻾 遺��곷뱶由쎈땲��.";         
                                }
                                else if(errMsg.indexOf("�뚯쑀�먭� �쇱튂 �섏� �딆뒿�덈떎.") >= 0 ){
                                    userViewErrorMessage = "�뚯쑀�먭� �쇱튂 �섏� �딆뒿�덈떎.";         
                                } 
                                else if(errMsg.indexOf("釉뚮씪蹂댁퐫由ъ븘 �닿뎅�� 怨좉컼") >= 0) {
                                    userViewErrorMessage = "釉뚮씪蹂댁퐫由ъ븘 �닿뎅�� 怨좉컼�섏� �먮룞李⑤떞蹂� �곹뭹 �좎껌�� �대졄�듬땲��. �� �ㅽ넗�댁뿉�� JB�곕━罹먰뵾�� 寃��됲븯�� �좎껌 諛붾엻�덈떎. 媛먯궗�⑸땲��!";
                                } 
                                else if(errMsg.indexOf("(援�쟻/泥대쪟湲곌컙/鍮꾩옄留뚭린�쇱옄 �뺤씤�꾩슂)") >= 0){
                                    userViewErrorMessage = "<p style='color:#212529'>鍮꾩옄留뚭린�쇱옄湲곗� �대떦 寃곗젣�쇱� �좏깮遺덇��⑸땲��.<br/><strong style='color:#e51313'>寃곗젣�� �섏젙�� �섏떆嫄곕굹</strong> ��異쒓린媛꾩쓣 蹂�寃�(�곸뾽�ъ썝�먭쾶 �붿껌)�섏떆硫� 吏꾪뻾媛��ν빀�덈떎.</p>";         
                                }                        
                                
                                if(currUrl.includes("bravo")){
                                    if(errMsg.indexOf("�깅줉�� �좎껌�묒닔嫄�") >= 0 ){ //
                                        userViewErrorMessage = "怨좉컼�섍퍡�쒕뒗 �꾩옱 吏꾪뻾以묒씤 �좎껌嫄댁씠 �덉뒿�덈떎.";
                                    }else if(errMsg.indexOf("�뱀씪 �좎껌嫄�") >= 0 ){ //
                                        userViewErrorMessage = "�뱀씪 �좎껌嫄댁씠 議댁옱�⑸땲��.";
                                    }
                                }
                                if(currUrl.includes("sale")){
                                    if(errMsg.indexOf("��] �ㅻ쪟�낅땲��.") >= 0 ){ //[鍮꾨�踰덊샇 2��] �ㅻ쪟�낅땲��
                                        if(errMsg.length > 35 ){
                                            userViewErrorMessage = errMsg.substring(35);
                                        };
                                    }else if(errMsg.indexOf("濡쒓렇�� �ㅽ뙣 媛��ν슏�� 珥덇낵�낅땲��.") >= 0 ){ //濡쒓렇�� �ㅽ뙣 媛��ν슏�� 珥덇낵�낅땲��.
                                        if(errMsg.length > 35 ){
                                            userViewErrorMessage = "濡쒓렇�� �ㅽ뙣 媛��ν슏�� 珥덇낵�낅땲��.<br>鍮꾨�踰덊샇 李얘린瑜� �댁슜�섏뿬 鍮꾨�踰덊샇 蹂�寃� �� �댁슜 諛붾엻�덈떎."
                                        };
                                    }else if(errMsg.indexOf("蹂�寃� �� 鍮꾨�踰덊샇媛� �댁쟾 鍮꾨�踰덊샇�� �숈씪�⑸땲��.") >= 0 ){ //濡쒓렇�� �ㅽ뙣 媛��ν슏�� 珥덇낵�낅땲��.
                                        if(errMsg.length > 35 ){
                                            userViewErrorMessage = "蹂�寃� �� 鍮꾨�踰덊샇媛� �댁쟾 鍮꾨�踰덊샇�� �숈씪�⑸땲��<br> �뺤씤�섏떆怨� �ㅼ떆 �낅젰�섏떆湲� 諛붾엻�덈떎.";
                                        };
                                    }else if(errMsg.indexOf("�쇱떆�곸씤 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��") >= 0 ){ //�쇱떆�곸씤 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��
                                        userViewErrorMessage = "�쇱떆�곸씤 �ㅻ쪟媛� 諛쒖깮�섏��듬땲�� .<br>臾몄젣媛� 吏��띾맆 寃쎌슦 吏��먯뿉 臾몄쓽 諛붾엻�덈떎.";
                                    }else if(errMsg.indexOf("諛쒖넚�꾪솕踰덊샇(��)媛� �낅젰�섏� �딆븯�듬땲��") >= 0 ){ //諛쒖넚�꾪솕踰덊샇(��)媛� �낅젰�섏� �딆븯�듬땲��
                                        userViewErrorMessage = "諛쒖떊�꾪솕踰덊샇媛� 議댁옱�섏� �딆븘 臾몄옄諛쒖넚�� �섏떎 �� �놁뒿�덈떎.";
                                    }else if(errMsg.indexOf("寃ъ쟻�뺣낫(��)媛� 議댁옱�섏� �딆뒿�덈떎.") >= 0 ){ //寃ъ쟻�뺣낫(��)媛� 議댁옱�섏� �딆뒿�덈떎
                                        if(errMsg.length > 35 ){
                                            userViewErrorMessage = errMsg.substring(35);
                                        };
                                    }else if(errMsg.indexOf("�낅Т�쒓컙�� 留덇컧�섏뿀�듬땲��") >= 0 ){  
                                        userViewErrorMessage = "�낅Т�쒓컙�� 留덇컧�섏뿀�듬땲��.<br>�곷떞�섎ː�� �됱씪 9:00~17:50 �먮쭔 媛��ν빀�덈떎.";
                                    }else if(errMsg.indexOf("BECOR0794") >= 0 ){ //
                                        userViewErrorMessage = "��異쒖씠�숈떆�ㅽ뀥 �댁슜�쒓컙�� �꾨떃�덈떎.(�됱씪 09:00 ~ 22:00)";                
                                    }else{
                                        userViewErrorMessage = "�쇱떆�곸씤 �ㅻ쪟媛� 諛쒖깮�섏��듬땲�� .<br>臾몄젣媛� 吏��띾맆 寃쎌슦 吏��먯뿉 臾몄쓽 諛붾엻�덈떎.";
                                    }                                   
                                }  
                                //媛쒖씤��異�,�먮떞蹂댁씪�� �꾪솕踰덊샇 �몄텧 TM�쇳꽣濡�
                                if(currUrl.includes('pln') || currUrl.includes('umr') || currUrl.includes('mvm')){
                                    if(currUrl.includes('odspln')){
                                        detailErrMsg = '�먯꽭�� �댁슜�� �대떦 LP(��異쒕え吏묒씤)�먭쾶 臾몄쓽 �먮뒗 JB�곕━罹먰뵾�� �쒖슱濡좎꽱�� <a href="tel:02-6119-6000" class="fc-blue">02)6119-6000</a>濡� 臾몄쓽�� 二쇱꽭��.';
                                    }
                                    else{
                                        detailErrMsg = '�먯꽭�� �댁슜�� JB�곕━罹먰뵾�� �ㅼ씠�됲듃 怨좉컼�쇳꽣 <a href="tel:1688-8700" class="fc-blue">1688-8700</a>濡� 臾몄쓽�� 二쇱꽭��.';
                                    }
                                }
                                else if(currUrl.includes('odspln')){//踰뺤씤�쇰븣
                                    detailErrMsg = '�먯꽭�� �댁슜�� �대떦 �곸뾽�ъ썝�먭쾶 臾몄쓽�� 二쇱꽭��.';
                                    if(errMsg.indexOf("(援�쟻/泥대쪟湲곌컙/鍮꾩옄留뚭린�쇱옄 �뺤씤�꾩슂)") >= 0){
                                        $("#idfinishdetail").text("");
                                    }
                                }
                                else if(currUrl.includes('odsucr') || currUrl.includes('odsncr')){//ODS�쇰븣
                                    detailErrMsg = '�먯꽭�� �댁슜�� �대떦 �곸뾽�ъ썝�먭쾶 臾몄쓽�� 二쇱꽭��.';
                                }
                                else if(currUrl.includes('sale')){//梨꾨꼸�⑷껄�곸씪��
                                    detailErrMsg = '�먯꽭�� �댁슜�� �대떦吏��먯뿉 臾몄쓽�� 二쇱꽭��.';
                                }
                                else if(currUrl.includes('cifqAgr') && mrggYn == "Y"){//�좎슜�뺣낫議고쉶�숈쓽
                                    if (errMsg.indexOf("�곷떞湲곗���(3媛쒖썡)�댁뿉") < 0) {
                                        detailErrMsg = '臾몄젣媛� 吏��띾맆 寃쎌슦 二쇳깮�대낫��異� 遺��� <a href="tel:'+odsPlnTel+'" class="fc-blue">'+odsPlnTel+'</a> �먮뒗 <a href="/cst/cap/JCSTCAP0001.do" class="fc-blue">怨좉컼�쇳꽣</a>瑜� �댁슜�댁＜�몄슂.';
                                        $("#idfinishdetail").text(detailErrMsg);
                                    }
                                }
                               
                                // �ㅺ뎅�� 泥섎━
                                if(userViewErrorMessage == "�덉긽�섏� 紐삵븳 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.<br>�쇱떆�곸씤 �꾩긽�닿굅�� �ㅽ듃�뚰겕 臾몄젣�� �� �덉뒿�덈떎.") {
                                    var imsiMsg = setMultiLangData("�덉긽�섏� 紐삵븳 �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.<br>");
                                    imsiMsg += "<br>";
                                    imsiMsg += setMultiLangData("�쇱떆�곸씤 �꾩긽�닿굅�� �ㅽ듃�뚰겕 臾몄젣�� �� �덉뒿�덈떎.");
                                    userViewErrorMessage = imsiMsg;
                                } else {
                                    userViewErrorMessage = setMultiLangData(userViewErrorMessage);
                                }

                                $("#idfinishdesc").text(userViewErrorMessage);
                                
                                break;
                            }
                        }
                    }             
                });
            }
            else{
                userViewErrorMessage = opt.userViewErrorMessage;
            }
            if ( opt && !jbwrcFnc.isNull(opt.topErrMsg) ) {
                topErrMsg = opt.topErrMsg;
            }
            if ( opt && !jbwrcFnc.isNull(opt.detailErrMsg) ) {
                detailErrMsg = opt.detailErrMsg;
            }
            
            $.get('/global/xtractor/notiPop.do?msg=' + userViewErrorMessage);
            
            JBWRC.layerPopup.opt = opt;
            var alertHTML = '';
            alertHTML += '<div id="_alert" class="layerpop-wrap type-bottom" role="dialog" aria-modal="true" aria-labelledby="layerpop_tit1" style="z-index: 1999;" jbevent-show="Eerror_S">';
            alertHTML += '  <div class="layerpop" tabindex="-1">';
            alertHTML += '    <div class="layerpop-header">';
            alertHTML += '      <p id="layerpop_tit1" class="layerpop-tit" data-lang="">'+topErrMsg+'</p>';
            alertHTML += '      <button class="btn-close fnClosePop"><span class="blind" data-lang="">�앹뾽 �リ린</span></button>';
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-contents">';
            alertHTML += '      <div class="finish-txt-wrap type-warning">';
            alertHTML += '        <p class="finish-desc" id="idfinishdesc" data-lang="">'+userViewErrorMessage+'</p>';
            alertHTML += '        <p class="finish-txt" data-lang="" id="idfinishdetail">'+detailErrMsg+'</p>';
            alertHTML += '      </div>';
            alertHTML += '    </div>';
            alertHTML += '    <div class="layerpop-footer">';
            alertHTML += '      <div class="btn-wrap">';
            if ( opt && jbwrcFnc.isNull(opt.cancelBtnText) ) {
                //
            } else {
                alertHTML += '<button class="btn-lg btn-secondary" onClick="JBWRC.layerPopup.cancel();">'+opt.cancelBtnText+'</button>';
            }    
            if ( opt && jbwrcFnc.isNull(opt.okBtnText) ) {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">�뺤씤</button>';
            } else {
                alertHTML += '      <button class="btn-lg btn-primary" onClick="JBWRC.layerPopup.confirm();">'+opt.okBtnText+'</button>';
            }    
            alertHTML += '      </div>';            
            alertHTML += '    </div>';
            alertHTML += '  </div>';
            alertHTML += '</div>';

            $('body').append(alertHTML);
            jbwrcUtil.pageUtil.pageClickLog('Eerror_S', 'show');
            fnOpenLayerPop('_alert');            
        },        
        eventPageBeforeUnload : function() {
            JBWRC.showLoading();
            var loca = location.href;
            var hideCnt = JBWRC.isIos() ? 9000 : 10000;
            setTimeout( function() {
                if ( location.href == loca ) {
                    JBWRC.hideLoading(true);
                }
            }, hideCnt);
        },
    };
    JBWRC.ua();

    //濡쒕뜑 �묒뀡 異붽�
    //if ( JBWRC.isIos() && !JBWRC.isDesktop() ) {
    //    window.addEventListener('pagehide', function(e) {
    //        JBWRC.eventPageBeforeUnload();
    //    });
    //} else {
        $(window).off('beforeunload.href beforeunload pagehide').on('beforeunload.href beforeunload pagehide', function(e) {
            JBWRC.eventPageBeforeUnload();
        });
/*        $('form').on('submit', function(e) {
            JBWRC.eventPageBeforeUnload();
        });*/
    //}
    window.onpageshow = function(e){
        if (e.persisted || (window.performance && window.performance.navigation.type == 2)){
            $('body').addClass('pageloading');
            
            console.log("�ㅻ줈媛�湲� 媛먯�");
            setTimeout(function(){
                JBWRC.hideLoading(true);
            }, 2000)            
        }
    }      
    
  //'[醫낅즺]AS-IS common.js ################## ################## ##################     
  //'[�쒖옉]��異쒓났�� �댁뼱�섍린  ################## ################## ##################
    var loanTempManage  = {
        //, bzwkDivVal  : [�꾩닔]�낅Т 援щ텇
        //, pageObj     : [�꾩닔]�낅Т page id (contents-wrap)
        //, comObj      : [�좏깮]�곹빀�� page, STEP 
        init : function(bzwkDivVal, pageObj, comInfo){
            if(jbwrcFnc.isNull(bzwkDivVal) || jbwrcFnc.isNull(pageObj)){
                console.log("bzwkDivVal : " + bzwkDivVal + ", pageObj : "+JSON.stringify(pageObj));
                return false;
            }
            
            var loanTempInfo = {
                bzwkDivVal      : bzwkDivVal
                , stepDivVal    : '' //, �꾩옱�④퀎�낅Т援щ텇媛� (default 媛� or �댁뼱�섍린 �곗씠�� 議고쉶 �� �명똿)
                , bizStep       : '' //, �꾩옱�④퀎 �낅Т �ㅽ꺆媛�
                , step          : [] //, {"cd" : "STEP4", "bizStepCd" : "INFO_CNFR", "page" : [stepManage.pageId[1]], "pageCnt":1}//, �쒕룄議고쉶 由ъ뒪��
            };//, �댁뼱�섍린 �뺣낫
            
            //, json�뚯씪 議고쉶 
            var datas = jbwrcUtil.storageUtil.get("loanTmpStrgJson");
            if(jbwrcFnc.isNull(datas) || jbwrcFnc.isNull(datas['loanTmpJson'][bzwkDivVal])){
                jbwrcUtil.setLoanTmpStrgJson(bzwkDivVal);//, async : false
            }
            datas = jbwrcUtil.storageUtil.get("loanTmpStrgJson")['loanTmpJson'][bzwkDivVal];//, �낅Т蹂�  �곗씠�� 議고쉶
            
            if(jbwrcFnc.isNull(datas)){
                console.log("�낅Т蹂�(�낅Т肄붾뱶:"+bzwkDivVal+") �댁뼱�섍린 step �뺣낫媛� �놁뒿�덈떎.'loanTempStrg.json' �ㅼ젙�뚯씪�� �뺤씤�� 二쇱꽭��");
                return;
            }
            
            //, STEP �명똿_[S] ---------------------------------------------------------------------------------------------
            var pathName = window.location.pathname;//, hostname/ �� 寃쎈줈(�뚮씪誘명꽣x) ex./mdr/pln/mdPln0010.do
            var stepCd = "";
            var pushCnt = 0;
            var tmpObj = Object.assign({}, pageObj); 
            for(var data of datas["aStep"]){
                for(var stepOrder of data["stepOrder"]){
                    if(stepOrder['url'] == pathName){//, �꾩옱 url 怨� 媛숈� step留�
                        if(! jbwrcFnc.isNull(comInfo)){
                            if(stepOrder['isCmm'] == "Y"){//, �곹빀�� 怨듯넻 �щ�媛� Y
                                for(var i in comInfo){//, �곹빀�깆뿉�쒕뒗 step �뺣낫瑜� 諛쏅뒗��.
                                    if(comInfo[i] == stepOrder['bizStepCd']){
                                        var obj =  Object.assign({"cd" : data['stepCd'], "page" : pageObj[i], 'pageCnt' : i}, stepOrder);
                                        loanTempInfo.step.push(obj);
                                    } 
                                }
                            }
                        }else if(stepOrder['isCmm'] != "Y"){//, �곹빀�깆씠 �꾨땶 �④퀎留� �명똿�쒕떎.
                            for(var pageKey in tmpObj){
                                pushCnt = pageKey;
                                delete tmpObj[pageKey];
                                if(pageObj[pushCnt] != 'frnsFnCfntArea'){//, �곹빀�� �쒖쇅
                                    break;
                                }
                            }
                            var obj =  Object.assign({"cd" : data['stepCd'], "page" : pageObj[pushCnt], 'pageCnt' : pushCnt}, stepOrder);
                            loanTempInfo.step.push(obj);
                        }
                    }
                }
            }
            //, STEP �명똿_[E] ---------------------------------------------------------------------------------------------
            //, stepDivVal �명똿_[S] ---------------------------------------------------------------------------------------------
            if(jbwrcFnc.isNull(loanTempInfo.step[0]) || jbwrcFnc.isNull(loanTempInfo.step[0]["cd"])){
                console.log("�꾩옱 �붾㈃ url怨� 留ㅽ븨�� �댁뼱�섍린 step �뺣낫媛� �놁뒿�덈떎. 'loanTempStrg.json' �ㅼ젙�뚯씪�� �뺤씤�� 二쇱꽭��\n[李멸퀬] isCmm:Y �쇰줈 �섏뼱�덈뒗 STEP�� �곹빀�� 怨듯넻�먯꽌 �ъ슜�섎뒗 step �낅땲��.(�낅Т step怨� 留ㅼ묶�섏� �딆쓬) ");
                return;
            }
            
            loanTempInfo.stepDivVal = loanTempInfo.step[0]["cd"]+"_"+loanTempInfo.step[0]["bizStepCd"];//, 泥ル쾲吏� �ㅽ꺆�� �④퀎援щ텇肄붾뱶瑜� �명똿
            loanTempInfo.bizStep    = loanTempInfo.step[0]["bizStep"];//, 泥ル쾲吏� �ㅽ꺆�� �낅Т �ㅽ꺆媛�
            //, stepDivVal �명똿_[E] --------------------------------------------------------------------------------------------- 
            
            console.log("loanTempManage.init > loanTempInfo : " +JSON.stringify(loanTempInfo));
            return loanTempInfo;
        }
        , saveData : function(stepManage, callback, isNoSave){
            //, loanTempInfo 媛� �명똿
            if(jbwrcFnc.isNull(stepManage.loanTempInfo)){
                stepManage.loanTempInfo = {};
            }
            if(jbwrcFnc.isNull(stepManage.loanTempInfo['bzwkDivVal'])){
                stepManage.loanTempInfo = Object.assign(stepManage.loanTempInfo, loanTempManage.init(stepManage.bzwkDivVal, stepManage.pageId, stepManage.loanTempStep));//, �댁뼱媛�湲� 愿��� �뺣낫 init
            }
            if(! jbwrcFnc.isNull(stepManage.loanTempInfo.step)){//, �명똿�� �곗씠�곌� �덉쓬
                jbwrcUtil.saveLoanTmpStrg(stepManage.loanTempInfo, callback, null, isNoSave); //, �댁뼱�섍린 ����
    
                for(var item of stepManage.loanTempInfo.step){//, {cd: 'STEP2', bizStepCd: 'LNAL_INPUT', page: 'step2', pageCnt: 1, bizStep: 9}
                    if(item['pageCnt'] == stepManage.currentStep){
                        stepManage.loanTempInfo.stepDivVal = item["cd"]+"_"+item["bizStepCd"];//, �댁뼱�섍린��  �꾩옱 �④퀎 �명똿
                        stepManage.loanTempInfo.bizStep = item["bizStep"];//, �댁뼱�섍린��  �꾩옱 �④퀎 �섎쾭
                        console.log("saveLoanTmpStrg : " +JSON.stringify(stepManage.loanTempInfo));
                    }
                }
            }
        }
        , setData : function(stepManage){
            //, loanTempInfo 媛� �명똿
            if(jbwrcFnc.isNull(stepManage.loanTempInfo)){
                stepManage.loanTempInfo = {};
            }
            if(jbwrcFnc.isNull(stepManage.loanTempInfo['bzwkDivVal'])){
                stepManage.loanTempInfo = Object.assign(stepManage.loanTempInfo, loanTempManage.init(stepManage.bzwkDivVal, stepManage.pageId, stepManage.loanTempStep));//, �댁뼱媛�湲� 愿��� �뺣낫 init
            }
            //, �댁뼱�섍린濡� �좎엯�� �④퀎�� �섏씠吏� �뺣낫
            var pageInfo = {};
            //, �댁뼱�섍린濡� �좎엯 �먭퀬 '�꾩옱�④퀎' 媛� �몄텧�섎뒗 �섏씠吏�媛� �덉쑝硫�
            jbwrcUtil.setLoanTmpData(stepManage.loanTempInfo);//, asycn : false
            if(! jbwrcFnc.isNull(stepManage.loanTempInfo['pageInfo'])){
                pageInfo = stepManage.loanTempInfo['pageInfo'];
            }
            if(! jbwrcFnc.isNull(jbwrcUtil.getQueryVariable('isFirst'))){
                if(! jbwrcFnc.isNull(pageInfo['page'])){
                    stepManage.loanTempInfo['stepDivVal']   = pageInfo['stepDivVal'];//, �④퀎 援щ텇媛� �명똿
                    stepManage.currentStep                  = pageInfo['pageCnt'];//, �꾩옱 pageId��  step
                    stepManage.prevStep                     = pageInfo['pageCnt'];//, �꾩옱 pageId��  step
                }
            }
            //, //, storage 珥덇린�� :: �댁뼱�섍린濡� �대룞�� �붾㈃�먯꽌 �댄깉�쒓꼍��
            //, var loanTmpStrgData = jbwrcUtil.storageUtil.get("loanTmpStrgData"); 
            //, //, loanTmpStrgData �곗씠�곌� null �� �꾨땲怨� �댁뼱�섍린濡� �대룞�� �붾㈃�먯꽌 �댄깉(�댄븯湲곕줈 �대룞�� url 怨� �꾩옱 url �� �ㅻ쫫)�� 寃쎌슦
            //, if(! jbwrcFnc.isNull(jbwrcUtil.storageUtil.get("loanTmpStrgData")) && loanTmpStrgData['moveUrl'] != location.pathname){
            //,     jbwrcUtil.storageUtil.remove("loanTmpStrgData");
            //, }
            return pageInfo;
        }
        , getCurStep : function(managePageId, pageId){
            var step = 0;
            if(! jbwrcFnc.isNull(managePageId)){
                var page = managePageId;
                for(var key in page){
                    if(page[key] == pageId){
                        step = key;//, �꾩옱 step
                        break;
                    }
                }
            }
            return step;
        }
         /**
         * ��異� �댁뼱�섍린 �꾩옱 �ㅽ꺆 湲곗��쇰줈 �댁쟾, �댄썑 �ㅽ꺆 議고쉶
         * @param bzwkDivVal : �낅Т援щ텇媛� ( D1, O1, ... )
         * @param stepDivVal : �④퀎援щ텇媛�
         * @param getStep : 議고쉶�� �ㅽ꺆 (-1:�댁쟾, 1:�ㅼ쓬) 
         */
        , getLoanTmpStep : function(loanTempInfo, getStep){
           
            //, json�뚯씪 議고쉶 
            var datas = jbwrcUtil.storageUtil.get("loanTmpStrgJson");
            if(jbwrcFnc.isNull(datas) || jbwrcFnc.isNull(datas['loanTmpJson'][loanTempInfo.bzwkDivVal])){
                jbwrcUtil.setLoanTmpStrgJson(loanTempInfo.bzwkDivVal);//, async : false
            }
            datas = jbwrcUtil.storageUtil.get("loanTmpStrgJson")['loanTmpJson'][loanTempInfo.bzwkDivVal];//, �곹뭹蹂�  �곗씠�� 議고쉶
            
            var nowStep = loanTempInfo.bizStep;
            var rtnStep = (getStep > 0) ? (nowStep+Math.abs(getStep)) : (nowStep-Math.abs(getStep)); 

            for(var data of datas["aStep"]){
                for(var step of data["stepOrder"]){
                    if(step['bizStep'] == rtnStep){//, �꾩옱 url 怨� 媛숈� step留�
                        return data['stepCd']+"_"+step['bizStepCd'];//, {bizStepCd: 'SELF_ATHN', bizStepCd: '蹂몄씤 �몄쬆', bizStep: 1, url: '/mdr/ucr/umr/mdUmr0010.do', isMove: 'N', ��}
                    }
                }
            }
        }
        , getLoanTmpStepData : function(stepManage, getStep){
            var loanTempInfo = stepManage.loanTempInfo;
            
            if(jbwrcFnc.isNull(stepManage.loanTempInfo)){
                console.log("stepManage.loanTempInfo �곗씠�곕� �뺤씤�� 二쇱꽭��");
                return;
            }
            if(jbwrcFnc.isNull(loanTempInfo["loanTmpStrgData"])){
                console.log("�몄텧�� �댁뼱�섍린 �곗씠�곌� �놁뒿�덈떎.");
                return;
            }
            var arrStep = loanTempInfo.step;
            var notStep = "";
            for(var data of arrStep){
                if(data.pageCnt == getStep){
                    notStep = data.cd + "_" + data.bizStepCd;
                }
            }
            
            var datas = loanTempInfo["loanTmpStrgData"]['bzwkDataCtnt'];
            for(var data in datas){
                if(data == notStep){
                    return loanTempInfo["loanTmpStrgData"]["bzwkDataCtnt"][data];
                }
            }
        }
        , tempAlert : function(){
            JBWRC.alert( "�대떦 �앹뾽�� �щ떎硫� 罹≪퀜 �� 寃고븿 �묒꽦�댁＜�몄슂.<br>- 寃고븿 �쒕ぉ : �댁뼱�섍린 �쒕퉬�� �ㅻ쪟 �앹뾽 �몄텧<br>- �ы븿 �댁슜 : 怨좉컼踰덊샇/�뚯뒪�� 吏꾪뻾寃쎈줈/�뚯뒪�명솚寃�/�뚯뒪�� �쒓컖", {
                bodyTitle:"�댁뼱�섍린 �쒕퉬�� �ㅻ쪟",
                okBtnText: "�뺤씤",
            });
            return;
        }
    }//, loanTempManage
  //'[醫낅즺]��異쒓났�� �댁뼱�섍린  ################## ################## ##################
    //'[�쒖옉] �ㅽ넗 �ъ빱�� 愿���  ################## ################## ##################
    var autoFocusUtil  = {
            AUTO_FOCUS_SELECTOR : 'button, input:password, select, input:radio:first, input[type="email"], input[type="tel"], input:text, input:checkbox:first, textarea'
            , AUTO_FOCUS_NOT_SELECTOR : '[data-isafskip="true"], .input-datepicker-btn, .btn-ico-clear, .recom-list button, .btn-tooltip, :hidden, :disabled'
            , AUTO_FOCUS_TITLE_SELECTOR : 'button, input:password, select, input:radio:first, input[type="email"], input[type="tel"], input:text, input:checkbox:first, textarea'
            , AUTO_FOCUS_TITLE_NOT_SELECTOR : '[data-isafskip="true"], .input-datepicker-btn, .btn-tooltip, .recom-list button, :hidden, :disabled'
                // , AUTO_FOCUS_TITLE_NOT_SELECTOR : '.hidden, .btn-tooltip, .recom-list button, :disabled'
            , afParentObj : null
            /**
            * �ㅽ넗 �ъ빱�� 珥덇린 �ㅽ뻾
            * @param formObj : �ㅽ넗 �ъ빱�� �섍린 �꾪븳 遺�紐� dom (default : contents) 
            * @param isTitle : �ㅻ뜑遺�遺� �꾩옱 input�� �덈궡 硫붿떆吏�(title) �곸슜�щ� (default : false) 
            */
            , initailize : function(formObj){
                
                // autofocus event �곸슜�섍린 �꾪븳 selector 
                var AUTO_FOCUS_EVENT_SELECTOR = 'button:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', select:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input:text:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input:password:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input[type="email"]:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input[type="tel"]:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', textarea:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input:radio:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                    + ', input:checkbox:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')';
                
                
                
                // autofocus event �곸슜�섍린 �꾪븳 selector 
                var AUTO_FOCUS_BLUR_TITLE_EVENT_SELECTOR = 'button:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', select:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:text:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:password:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="email"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="tel"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', textarea:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:radio:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:checkbox:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')';
                
                var AUTO_FOCUS_CLICK_TITLE_EVENT_SELECTOR = 'button:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+', .btn-step-next)'
                + ', select:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:text:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:password:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="email"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="tel"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', textarea:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:radio:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:checkbox:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')';
                
                // �щ젰
                var AUTO_FOCUS_TITLE_EVENT_SELECTOR = 'button:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', select:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:text:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+', .datepicker-item)'
                + ', input:password:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="email"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input[type="tel"]:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', textarea:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:radio:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')'
                + ', input:checkbox:not('+autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR+')';
                
                // click event �곸슜�섍린 �꾪븳 selector
                var CLICK_EVENT_SELECTOR = 'button:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')';
                
                // change event �곸슜�섍린 �꾪븳 selector
                var CHANGE_EVENT_SELECTOR = 'select:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                + ', input:radio:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')'
                                                + ', input:checkbox:not('+autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR+')';
                // input event �곸슜�섍린 �꾪븳 selector
                var INPUT_EVENT_SELECTOR = 'input:text, input:password, input[type="email"], input[type="tel"]';
                
                
                // 遺�紐� dom object�뺤씠 �꾨땶 寃쎌슦 jquery object濡� 蹂���
                if(!formObj) {
                    autoFocusUtil.afParentObj = $('.contents');
                } else if('string' == typeof formObj ){
                    autoFocusUtil.afParentObj = $(formObj);
                } else if('object' == typeof formObj) {
                    autoFocusUtil.afParentObj = $(formObj);
                }
                
                // �숈쟻 dom怨� �④폁 autofocus 湲곗〈 �대깽�� �쒓굅 諛� �대깽�� �ㅼ젙
                autoFocusUtil.afParentObj.off('autofocus', AUTO_FOCUS_EVENT_SELECTOR, autoFocusUtil.autoFocusHandler).on('autofocus', AUTO_FOCUS_EVENT_SELECTOR, autoFocusUtil.autoFocusHandler);
                // �숈쟻 dom怨� �④폁 click 湲곗〈 �대깽�� �쒓굅 諛� �대깽�� �ㅼ젙
                autoFocusUtil.afParentObj.off('click', CLICK_EVENT_SELECTOR, autoFocusUtil.eventHandler).on('click', CLICK_EVENT_SELECTOR, autoFocusUtil.eventHandler);
                // �숈쟻 dom怨� �④폁 change 湲곗〈 �대깽�� �쒓굅 諛� �대깽�� �ㅼ젙
                autoFocusUtil.afParentObj.off('change', CHANGE_EVENT_SELECTOR, autoFocusUtil.eventHandler).on('change', CHANGE_EVENT_SELECTOR, autoFocusUtil.eventHandler);
                // �숈쟻 dom怨� �④폁 input 湲곗〈 �대깽�� �쒓굅 諛� �대깽�� �ㅼ젙
                autoFocusUtil.afParentObj.off('input', INPUT_EVENT_SELECTOR, autoFocusUtil.eventHandler).on('input', INPUT_EVENT_SELECTOR, autoFocusUtil.eventHandler);
                
                // �숈쟻 dom怨� �④폁 focus 湲곗〈 �대깽�� �쒓굅 諛� �대깽�� �ㅼ젙
                autoFocusUtil.afParentObj.off('focus', AUTO_FOCUS_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler).on('focus', AUTO_FOCUS_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler);
                autoFocusUtil.afParentObj.off('click', AUTO_FOCUS_CLICK_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler).on('click', AUTO_FOCUS_CLICK_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler);
                autoFocusUtil.afParentObj.off('blur', AUTO_FOCUS_BLUR_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler).on('blur', AUTO_FOCUS_BLUR_TITLE_EVENT_SELECTOR, autoFocusUtil.focusTitleHandler);
                
                // button
                $(autoFocusUtil.afParentObj.find(autoFocusUtil.AUTO_FOCUS_SELECTOR).not(autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR)[0]).removeAttr('data-bfValue');

                
                // 紐⑤뱺 value�� �꾨━�� �곹깭�대㈃ �ㅻ뜑 ���댄� 蹂�寃�
                autoFocusUtil.complateTitle();
                 
            }
            , complateTitle  : function(){
                var i = 0;
                var obj = autoFocusUtil.afParentObj.find(autoFocusUtil.AUTO_FOCUS_TITLE_SELECTOR).not(autoFocusUtil.AUTO_FOCUS_TITLE_NOT_SELECTOR);
                var $headerTitle = autoFocusUtil.afParentObj.closest('.inner').find('.cont-header');
                
                for(i = 0 ; i < obj.length ; i++){
                    $obj = $(obj[i]);
    
                    // button �� 寃쎌슦
                    if('BUTTON' == $obj.prop('tagName')) {
                        // �명뭼�� '�ㅼ쓬' 踰꾪듉�� �꾨땶 寃쎌슦 
                        if(0 >= $obj.closest('.input-box').length) {
                            
                            // �꾩옱 dom�� �덉씠�� �앹뾽 �먮뒗 ���됲듃 諛뺤뒪(�덉씠�댄뙘��) �� 寃쎌슦
                            if($obj.is('.btn-select') || $obj.is('.select-box')) {
                                // 媛� �덉씠�댄뙘�낆씠 �좏깮�섏뿀�붿� �뺤씤 �� focus 諛� click �몃━嫄�
                                if( ($obj.is('.btn-select') && !$obj.is('.active')) 
                                        || ($obj.is('.select-box') && !$obj.is('.has-val')) ) {
                                    return false;
                                }
                                
                            // 洹� �� 踰꾪듉 dom �ъ빱��
                            } else {
                                return false;
                            }
                        }
                    // radio/checkbox �� 寃쎌슦
                    } else if('radio' == $obj.prop('type') || 'checkbox' == $obj.prop('type')) {
                        // radio/checkbox 洹몃９�� 媛믪씠 �섎굹�� 泥댄겕媛� �덈릺�덉쓣 寃쎌슦 �ъ빱��
                        if( !$('input[name="'+$obj.attr('name')+'"]').is(':checked') ){
                            return false;
                        }
                    // 洹� ��
                    } else {
                        // dom��  value媛� '' �� 寃쎌슦 �ъ빱��
                        if( '' == $obj.val() ){
                            return false;
                        }
                    }
                }
                
                $headerTitle.find('.title-wrap .title').html(setMultiLangData($headerTitle.find('.step-title').html()));
            }
            , eventHandler  : function(e){
                var eType = (e.type || '').toLowerCase();
                var $target = $(e.target);
                
                // �낅Т �곸뿭�먯꽌 autofocus 而⑦듃濡� �섍린 �꾪빐 dom�� data-isafevtskip �댄듃由щ럭�멸� �녾굅�� true 媛믪씠 �꾨땶 寃쎌슦 event �ㅽ뻾 
                if( !($target.attr('data-isafevtskip') && 'true' === $target.attr('data-isafevtskip').toLowerCase()) ) {
                
                    // event == click (button) 
                    if('click' == eType) {
                        
                        // �덉씠�� �앹뾽�� active�� has-val�� 寃쎌슦 span.value �대┃ �� �� 泥섎━
                        if(0 < $target.closest('.btn-select').length){
                            $target = $target.closest('.btn-select');
                        } else if(0 < $target.closest('.select-box').length) {
                            $target = $target.closest('.select-box');
                        }
                        
                        // �덉씠�� �앹뾽�� 寃쎌슦 �덉씠�� �앹뾽 �뺤씤 踰꾪듉 �먮뒗 �リ린 踰꾪듉(fnCloseLayerPop) �대┃ �� �숈옉 �섎룄濡� 泥섎━ 洹� �� autofocus �몃━嫄� 
                        if($target.is('.btn-select') || $target.is('.select-box')){
//                            if($target.is('.btn-select')) {
//                                $target.attr('data-bfValue', $target.find('span.value').text());
//                            }
                        } else {
                            $target.trigger('autofocus');
                        }
                    // event == change (radio, checkbox, selet)
                    } else if('change' == eType) {
                        
                        // dom�� radio �먮뒗 checkbox 寃쎌슦
                        if('radio' == $target.prop('type') || 'checkbox' == $target.prop('type')) {
                            
                            // radio/checkbox 洹몃９�� 媛믪씠 �섎굹�쇰룄 泥댄겕 �� 寃쎌슦 autofocus �몃━嫄�
                            if($('input[name="'+$target.attr('name')+'"]').is(':checked')) {
                                $target.trigger('autofocus');
                            }
                        // 洹� �� value 媛믪씠 ""�� �꾨땶 寃쎌슦  autofocus �몃━嫄�
                        } else {
                            if('' != $target.val()) {
                                $target.trigger('autofocus');
                            }
                        }
                        
                    // event == input (text, password, email, tel)
                    } else if('input' == eType) {
                        $target.trigger('autofocus');
                    }
                }
            }
            , focusTitleHandler  : function(e){
                var $target = $(e.target);
                var obj = autoFocusUtil.afParentObj.find(autoFocusUtil.AUTO_FOCUS_SELECTOR).not(autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR);
                var $headerTitle = $target.closest('.inner').find('.cont-header');
                
                if('focusin' == e.type || 'click' == e.type) {
                    if($target.is('.fnOpenPop') && !$target.is('.iscurfocus')) {
                        if( '' != $.trim($target.siblings('.step-title').html()) ) {
                            $headerTitle.find('.title-wrap .title').html(setMultiLangData($target.siblings('.step-title').html()));
                        }
                    } else if($target.is('.datepicker-item') && $('#datepickers-container').is('.active')) {
                        if( '' != $.trim($target.closest('.input-box').siblings('.step-title').html()) ) {
                            $headerTitle.find('.title-wrap .title').html(setMultiLangData($target.closest('.input-box').siblings('.step-title').html()));
                        }
                    } else {
                        if( '' != $.trim($target.parent().siblings('.step-title').html()) ) {
                            $headerTitle.find('.title-wrap .title').html(setMultiLangData($target.parent().siblings('.step-title').html()));
                        }
                    }
                    
                } else {
                    
                    if( $target.is('.fnOpenPop') && $target.is('.iscurfocus') ) {
                        return false;
                    }
                    
                    if( $target.is('.datepicker-item') && $('#datepickers-container').is('.active') ) {
                        return false;
                    }
                    
                    autoFocusUtil.complateTitle();
                }
            }
            , autoFocusHandler  : function(e){
                var j = 0;
                var $target = null;
                var $obj = null;
                var obj = autoFocusUtil.afParentObj.find(autoFocusUtil.AUTO_FOCUS_SELECTOR).not(autoFocusUtil.AUTO_FOCUS_NOT_SELECTOR);
                
                $target = $(e.target);
                
                
                // radio/checkbox type �� 寃쎌슦 radio/checkbox 洹몃９�� 泥ル쾲吏� dom�� jquery object �명똿
                if('radio' == $target.prop('type') || 'checkbox' == $target.prop('type')) {
                    $target = $('input[name="'+$target.attr('name') +'"]:first'); 
                }
                
                // �덉씠�� �앹뾽�� 寃쎌슦 �덉씠�� �앹뾽 �뺤씤 踰꾪듉 �먮뒗 �リ린 踰꾪듉(fnCloseLayerPop) �대┃ �� 媛믪씠 蹂�寃쎈릺�덈뒗吏� �뺤씤 �섍린 �꾪븳 濡쒖쭅  
                if( 'BUTTON' == $target.prop('tagName') && ($target.is('.btn-select')|| $target.is('.select-box')) ){
                    
                    if($target.is('.select-box')) {
                        if('' == $target.prev().find('select').val()) {
                            return false;
                        }
                    } else {
                        if( '二쇱냼瑜� �낅젰�댁＜�몄슂' == $.trim($target.find('span.value').text())){
                            return false;
                        }
                    }
                    
                } else if ('INPUT' == $target.prop('tagName') && !$target.is('.datepicker-item') && !( 'radio' == $target.prop('type') || 'checkbox' == $target.prop('tagName')) ){
                    if(!$target.attr('maxlength') || $target.val().length != $target.attr('maxlength') ) {
                        return false;
                    }
                }
                
                autoFocusUtil.complateTitle();
                
                // �꾩옱 諛쒖깮�� event dom 湲곗��쇰줈 �ㅼ쓬 dom focus �대룞�섍린 �꾪븳 濡쒖쭅
                obj.each(function(i, o){
                    
                    // �꾩옱 諛쒖깮�� evnet dom �� 寃쎌슦
                    if(o == $target[0]){
                        // �ㅼ쓬 dom focus �꾩튂 李얘린 �꾪븳 諛섎났 臾�
                        // * 珥덇린 �ㅽ뻾�� �꾪빐 �먭린 dom遺��� 鍮꾧탳 ��.
                        for(j = i+1 ; j < obj.length;j++){
                            $obj = $(obj[j]);
                            
                            // button �� 寃쎌슦
                            if('BUTTON' == $obj.prop('tagName')) {
                                // �명뭼�� '�ㅼ쓬' 踰꾪듉�� �꾨땶 寃쎌슦 
                                if(0 >= $obj.closest('.input-box').length) {
                                    
                                    // �꾩옱 dom�� �덉씠�� �앹뾽 �먮뒗 ���됲듃 諛뺤뒪(�덉씠�댄뙘��) �� 寃쎌슦
                                    if($obj.is('.btn-select') || $obj.is('.select-box')) {
                                        // 媛� �덉씠�댄뙘�낆씠 �좏깮�섏뿀�붿� �뺤씤 �� focus 諛� click �몃━嫄�
                                        if( ($obj.is('.btn-select') && !$obj.is('.active')) 
                                                || ($obj.is('.select-box') && !$obj.is('.has-val')) ) {
                                            $obj.focus().trigger('click');
                                            return false;
                                        }
                                        
                                    // 洹� �� 踰꾪듉 dom �ъ빱��
                                    } else {
                                        $obj.focus();
                                        return false;
                                    }
                                }
                            // radio/checkbox �� 寃쎌슦
                            } else if('radio' == $obj.prop('type') || 'checkbox' == $obj.prop('type')) {
                                
                                // radio/checkbox 洹몃９�� 媛믪씠 �섎굹�� 泥댄겕媛� �덈릺�덉쓣 寃쎌슦 �ъ빱��
                                if( !$('input[name="'+$obj.attr('name')+'"]').is(':checked') ){
                                    $obj.focus();
                                    return false;
                                }
                            // 洹� ��
                            } else {
                                
                                // dom��  value媛� '' �� 寃쎌슦 �ъ빱��
                                if( '' == $obj.val() ){
                                    if($obj.is('.datepicker-item')){
                                        $obj.focus();
                                        setTimeout(function(){
                                            $obj.click();
                                        }, 50)
                                    } else {
                                        $obj.focus().click();
                                    }
                                    
                                    return false;
                                }
                            }
                        }
                        return false;
                    }
                });
            }
            
    }//, autoFocusUtil
    //'[醫낅즺]�ㅽ넗 �ъ빱�� 愿���  ################## ################## ##################
    
    //'[�쒖옉] 梨꾪똿�곷떞 愿���  ################## ################## ##################
    var chatCnslUtil  = {
            showChatCnslBtn : function(type) {                
                console.log('call showChatCnslBtn ', type);

                // 梨꾪똿�곷떞 on/off �곹깭
                var chatStatus = '1';
                if (!jbwrcFnc.isNull(jbwrcUtil.storageUtil.get('chatOpenStatus'))) {
                    chatStatus = jbwrcUtil.storageUtil.get('chatOpenStatus');
                }

                var bubbleMsg = '梨꾪똿�곷떞�� �듯빐 沅곴툑�쒖젏�� 臾쇱뼱蹂댁꽭��!';
                var chatArea = '';
                
                if (chatStatus == '1') {
                    chatArea += '<div class="chat-btn-area">';
                    chatArea += '    <div class="chat-button chat-on"></div>';
                    chatArea += '    <div class="chat-close"></div>';
                    chatArea += '    <div class="txt-bubble-wrap chat-bubble" style="display:none;">' + bubbleMsg + '</div>';
                    chatArea += '</div>';
                } else {
                    chatArea += '<div class="chat-btn-area left-ani">';
                    chatArea += '    <div class="chat-button chat-off"></div>';
                    chatArea += '    <div class="chat-close" style="display: none;"></div>';
                    chatArea += '    <div class="txt-bubble-wrap chat-bubble" style="display:none;">' + bubbleMsg + '</div>';
                    chatArea += '</div>';
                }
                
                $('body').append(chatArea);
                
                // ##### UI �대깽�� �뺤쓽 S
                
                // �④린湲�(X) 踰꾪듉
                $('.chat-close').on('click', function(){
                    $('.chat-button').removeClass('chat-on');
                    $('.chat-button').addClass('chat-off');
                    $(this).hide();
                   
                    $('.chat-bubble').animate({right : '-100rem'},400);
                    $('.chat-bubble').hide();
                    $('.chat-btn-area').addClass('left-ani');
                    
                    jbwrcUtil.storageUtil.set('chatOpenStatus', '0');
                });
                
                $('.chat-button').off('click'); // �대깽�� 珥덇린��
                
                // 梨꾪똿�곷떞 �닿린, �꾩씠肄� 蹂댁씠湲� 踰꾪듉
                $('.chat-button').on('click', function(e){
                    
                    if ($('.chat-button').hasClass('chat-off')) {
                        
                        $('.chat-close').show();
                        $('.chat-button').removeClass('chat-off');
                        $(".chat-btn-area").removeClass('left-ani');
                        $('.chat-button').addClass('chat-on');
                        
                        $('.chat-bubble').show();
                        $('.chat-bubble').animate({right : '6rem'},400, function(){
                            setTimeout(() => {
                                $('.chat-bubble').animate({right : '-100rem'},400);
                            }, 3000);
                        });
                        
                        jbwrcUtil.storageUtil.set('chatOpenStatus', '1');
                    }
                    else if ($('.chat-button').hasClass('chat-on')) {
                        if (type == 'bravo') {
                            chatCnslUtil.oepnBravoChatCnslWindow();
                        } else {
                            chatCnslUtil.oepnChatCnslWindow();
                        }
                    }
                }); 
                
                // 留먰뭾�� �몄텧 (PC)
                $('.pc-layout .chat-button.chat-on').mouseover(function(){
                    $('.chat-bubble').show();
                });
                $('.pc-layout .chat-button.chat-on').mouseout(function(){
                    $('.chat-bubble').hide();
                });
                
                // 硫붿씤�붾㈃�먯꽌 湲곕낯媛� �몄텧 (紐⑤컮��)
                if (JBWRC.getDevice() != 'W') {
                    if ((location.pathname == '/' || location.pathname == '/main.do') && chatStatus == '1') {
                        $('.chat-bubble').show();
                        
                        setTimeout(function() {
                            $('.chat-bubble').animate({right : '-100rem'},400);
                        }, 5000);
                    }
                }
                
                // ##### UI �대깽�� �뺤쓽 E
                
            }
            , oepnChatCnslWindow : function(type, obj) {
                
                var channel = '';
                var targetName = '';
                
                if (isMobileApp == 'true') {
                    channel = 'app';
                    targetName = '_self';
                    
                } else {
                    if (JBWRC.getDevice() == 'W') {
                        channel = 'pc';
                    } else {
                        channel = 'mobile';
                    }    
                    targetName = 'postWin';
                }
                
                var url = location.origin + ':3001/scenario?domainId=wooricap&inHelperChannelId='+ channel;
                
                // 怨좉컼踰덊샇 �뷀샇��
                var encCstno = '';
                if (!jbwrcFnc.isEmpty(CM_LOGIN_INFO)) {
                    if (CM_LOGIN_INFO.isLogin) {
                        encCstno = '';
                        jbwrcUtil.customAjax({
                            url : '/chat/getEncCstno.do',
                            data : {},
                            async : false,
                            beforeShow : false, 
                            compleShow : false,
                            callBack : function (rData) {
                                encCstno = rData.encCstno;
                            }
                        });
                    }
                }
                
                //alert('App �щ� : ' + isMobileApp + '\n channel : ' + channel + '\n 怨좉컼踰덊샇 : ' + encCstno);
                
                jbwrcUtil.pageUtil.pageClickLog('ChatCnsl_C', 'click'); // 梨꾪똿�곷떞 Click
                
                if ($('#chat_cnsl').length > 0) {
                    $('#chat_cnsl').remove();
                }
                
                var form = document.createElement('form');
                form.id = 'chat_cnsl';
                form.method = 'POST';

                // URL �덉쟾 援ъ꽦
                var u = new URL(url, location.origin); // url�� 荑쇰━媛� �대� �덈떎硫� 洹몃�濡� �좎���

                // �대쫫 �덈뒗 李� �ъ슜
                if (targetName != '_self') {
                    window.open('', targetName);
                }
                form.target = targetName;
                form.action = u.toString();

                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'loginId';
                input.value = encCstno;
                form.appendChild(input);

                document.body.appendChild(form);
                form.submit();
                
            }
            , oepnBravoChatCnslWindow : function(obj) {
                
                var postObj = {
                    pageId : '',
                    pageNm : '',
                    loginId : ''
                };
                
                var str = location.pathname;

                // 1. .do �쒓굅
                var strWithoutDo = str.replace(/\.do$/, "");
    
                // 2. 留덉�留� / �ㅼ쓽 臾몄옄�� 異붿텧
                var lastSegment = strWithoutDo.substring(strWithoutDo.lastIndexOf('/') + 1);
    
                // 3. �ㅼ쓽 �レ옄 3�먮━ 異붿텧
                var regex = /(\d{3})$/;
                var match = lastSegment.match(regex);
    
                if (match) {
                    postObj.pageId = match[1];
                    console.log(postObj.pageId); // 異쒕젰: 0031
                } else {
                    console.log("�レ옄 3�먮━瑜� 李얠쓣 �� �놁뒿�덈떎.");
                }
                
                if (jbwrcFnc.isEmpty(postObj.pageId)) {
                    postObj.pageId = '999';
                }
                
                var param = {
                    pageId : postObj.pageId
                };
                jbwrcUtil.customAjax({
                    url : "/chat/getBravoChatData.do"           // url
                    , data : param                              // param
                    , beforeShow : true                         // 濡쒕뵫諛� �щ�
                    , compleShow : true                         // 濡쒕뵫諛� �щ�
                    , async : false
                    , callBack : function( data ){              // 肄쒕갚
                        encodeCstno = encodeURIComponent(data.encCstno);
                        postObj.loginId = encodeCstno;
                        postObj.pageNm = data.pageNm;
                    }
                });
                
                var url = location.origin + '/chat/JCHTMAN0020.do?&appChannelId=bkapp&loginId=' + postObj.loginId + '&pageId=' + postObj.pageId + '&pageNm=' + postObj.pageNm;
                var u = new URL(url, location.origin); // url�� 荑쇰━媛� �대� �덈떎硫� 洹몃�濡� �좎���
                
                var urlParam = {
                    "url" : url
                };
                
                jbwrcUtil.pageUtil.pageClickLog('ChatCnsl_C_Bravo', 'click'); // 梨꾪똿�곷떞(釉뚮씪蹂�) Click 
                
                var args = {};
                args.callbackId = "";
                args.className = "JBNativeUIBR";
                args.methods = "doNExternalBrowser";    // doNExternalBrowser(�몃� 釉뚮씪�곗�濡� �� ��) , doNOpenWebView (釉뚮씪蹂� �� �댁뿉�� �� ��)
                args.param = JSON.stringify(urlParam);
                
                if ($.browser.device == "IA" || $.browser.device == "IW") {
                    
                    if (jbwrcUtil.isBravoKoreaApp()) {
                        window.webkit.messageHandlers.JBPrivateBankBridge.postMessage(encodeURIComponent(JSON.stringify(args)));
                    } else {
                        alert('is not bk app');
                    }
                    
                } else if ($.browser.device == "AA" || $.browser.device == "AW") {
                    
                    if (jbwrcUtil.isBravoKoreaApp()) {
                        window.JBPrivateBankBridge.callNative(encodeURIComponent(JSON.stringify(args)));
                    } else {
                        alert('is not bk app');
                    }
                    
                }
                
            }
            , moveSrtnUrlLink : function(obj) {
                
                console.log('moveSrtnUrlLink �⑥텞URL');
                
                var url = location.origin + ':3001/talk?partitionId=' + obj.partitionId + '&appChannelId=' + obj.appChannelId + '&topicId=' + obj.topicId;
                
                var form = document.createElement('form');
                form.id = 'chat_cnsl';
                form.method = 'POST';

                console.log('url , ', url);
                
                // URL �덉쟾 援ъ꽦
                var u = new URL(url, location.origin); // url�� 荑쇰━媛� �대� �덈떎硫� 洹몃�濡� �좎���

                window.open('', '_self');
                form.target = '_self';
                form.action = u.toString();

                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'loginId';
                input.value = obj.encCstno;
                form.appendChild(input);

                document.body.appendChild(form);
                form.submit();
            }
            , moveSnsUrlLink : function(channel) {
                
                console.log('moveSnsUrlLink SNS');
                
                var url = location.origin + ':3001/scenario?domainId=wooricap&inHelperChannelId=' + channel 
                location.href = url; 
            }
    }
    //'[醫낅즺] 梨꾪똿�곷떞 愿���  ################## ################## ##################