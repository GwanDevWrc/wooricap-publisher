/*
 * ! <pre> ��怨좉컼 梨꾨꼸 怨듯넻 湲곕뒫�⑥닔 Javascript </pre>  (AS-IS ��遺�遺�  MDCommon.js, common_dev.js)
 * 
 * @ClassName : jbwrcFnc.js   
 * @Description : ��怨좉컼 梨꾨꼸 怨듯넻 湲곕뒫�⑥닔
 * @author 24WP0097
 * @since 2024. 11. 29.
 * @version 1.0
 * @see 
 * @Modification Information <pre> since author description ===========
 *      ============= =========================== 2024. 11. 29. 24WP0097 理쒖큹 �앹꽦 </pre>
 */

var jbwrcFnc = (function(){
    
    //attribute area
    
    return {
        //private function area

        /**
         * 二쇰��깅줉踰덊샇 泥댄겕
         */
        coCheckJuminNumber : function(headNumber, tailNumber){
            var aryJuminNumber = new Array(13);
            var aryWeighNumber = new Array('2', '3', '4', '5', '6', '7', '8', '9', '2', '3', '4', '5');

            if (headNumber.length != 6 || tailNumber.length != 7) {
                alert("二쇰��깅줉踰덊샇�� 湲몄씠媛� 留욎� �딆뒿�덈떎.");
                return false;
            }

            var vInputNumber = headNumber + tailNumber;
            if (isNaN(vInputNumber)) {
                alert("二쇰��깅줉踰덊샇�� �レ옄留� �낅젰 媛��ν빀�덈떎.");
                return false;
            }

            for (i = 0; i < 13; i++) {
                aryJuminNumber[i] = vInputNumber.substr(i, 1);
            }

            var nSum = 0;
            for (i = 0; i < 12; i++) {
                nSum += aryJuminNumber[i] * aryWeighNumber[i]; // �낅젰媛믨낵 媛�以묒튂瑜� 媛곴컖 怨깊빐�� �⑹쓣
                // 援ы븿
            }

            var nCheck = 11 - (nSum % 11);
            if (nCheck > 9) {
                nCheck -= 10;
            }

            // 泥댄겕�レ옄�� �낅젰媛믪쓽 留덉�留� �レ옄媛� �ㅻⅤ硫�
            if (nCheck != aryJuminNumber[12]) {
                alert("�щ컮瑜� 二쇰��깅줉踰덊샇媛� �꾨떃�덈떎.");
                return false;
            }

            return true;            
        },
        /**
         * �꾩옱�쇱옄瑜� �삳뒗��.
         * 
         * YYYYMMDD
         */        
        coGetCurDate : function() {
            var oToday = new Date();

            var year = oToday.getFullYear();
            var month = oToday.getMonth() + 1;
            var date = oToday.getDate();

            if (month < 10) {
                month = '0' + month;
            }
            if (date < 10) {
                date = '0' + date;
            }

            return year + '' + month + '' + date;
        },
        /**
         * �꾩옱�쒓컙�� �삳뒗��.
         * 
         * HHMISS
         */
        coGetCurTime : function() {
            var oToday = new Date();

            var hours = oToday.getHours();
            var minutes = oToday.getMinutes();
            var seconds = oToday.getSeconds();

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return hours + '' + minutes + '' + seconds;
        },        
        /**
         * �꾩옱�꾨룄 �산린
         */  
        coGetY4 : function() {
            var oToday = new Date();

            return String(oToday.getFullYear());
        },      
        /**
         * �꾩옱�� �산린
         */  
        coGetMM : function() {
            var oToday = new Date();

            var month = oToday.getMonth() + 1;

            if (month < 0) {
                month = '0' + month;
            }

            return String(month);
        },      
        /**
         * �꾩옱�� �산린
         */  
        coGetDD : function() {
            var oToday = new Date();

            var date = oToday.getDate();

            if (date < 0) {
                date = '0' + date;
            }

            return String(date);
        },      
        /**
         * �꾩옱�� �산린
         */  
        coGetHH : function() {
            var oToday = new Date();

            var hours = oToday.getHours();

            if (hours < 0) {
                hours = '0' + hours;
            }

            return String(hours);
        },           
        /**
         * �꾩옱遺� �산린
         */  
        coGetMI : function() {
            var oToday = new Date();

            var minutes = oToday.getMinutes();

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            return String(minutes);
        },           
        /**
         * �꾩옱珥� �산린
         */  
        coGetSS : function() {
            var oToday = new Date();

            var seconds = oToday.getSeconds();

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return String(seconds);
        },           
        loginTime : {
            logInTimeoutChk : 60 * 10,
            semiLogInTimeoutChk : 60 * 8,
            semiLogInTimeoutChkFlag : true,
            logInTimer : null,
            checkTime : 0
        },
        loginSmTime : {
            loginSmTimeoutChk : 60 * 10,
            semiloginSmTimeoutChk : 60 * 8,
            semiloginSmTimeoutChkFlag : true,
            loginSmTimer : null,
            checkTime : 0
        },
        securityTime : {
            securityTimeoutChk : 0,
            securityTimer : null,
            checkTime : 0
        },
        securitySmTime : {
            securitySmTimeoutChk : 0,
            securitySmTimer : null,
            checkTime : 0
        },
        winSize : {
            top : 0
        },        
        /**
         * 肄ㅻ쭏�쒓굅
         */  
        coCommaRemove : function(value) {
            return value.replace(/[^0-9]/g, '');
        },           
        /**
         * 肄ㅻ쭏�쒓굅2 - . �� �쒖쇅
         */  
        coCommaRemoveDecimal : function(value) {
            return value.replace(/[^0-9.]/g, '');
        },           
        /**
         * 泥쒕떒�� 肄ㅻ쭏李띻린
         */  
        coComma : function(value) {
            var rtn = value.toString();
            return rtn.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },
        /**
         * 泥쒕떒�� 肄ㅻ쭏李띻린
         */  
        coCommaDecimal : function(value, decimalSize) {
            var strValue = jbwrcFnc.coCommaRemoveDecimal(value);
            var aryValue = strValue.split('.');
            var bExists = strValue.indexOf('.', 0);
            var vReturn;

            if (bExists > -1) {
                var vDecimalValue = aryValue[1];
                if (aryValue[1].length >= decimalSize) {
                    vDecimalValue = aryValue[1].substring(0, decimalSize);
                }
                vReturn = coComma(aryValue[0]) + '.' + vDecimalValue;
            } else {
                vReturn = coComma(aryValue);
            }
            return vReturn;
        },
        /**
         * Object(Input Edit) Keypress Event諛쒖깮�� �レ옄留� �낅젰
         */
       coKeypressOnlyNum : function(event) {
            if ((event.keyCode < 48) || (event.keyCode > 57)) {
                event.returnValue = false;
            }
        },
        /**
         * Object(Input Edit) Keyup Event諛쒖깮�� 泥쒕떒�� 肄ㅻ쭏李띻린
         */
        coKeyupToComma : function(Obj) {
            // Obj.key = coComma(coCommaRemove(Obj.key));
            var val = Obj.value.replace(/,/g, '');
            var val2 = val.substr(0, 1);
            var val3 = val.length;

            if (val2 == 0) {
                val = val.substr(1, val3);
            }

            var num_format = function(n) {
                var reg = /(^[+-]?\d+)(\d{3})/;
                n = String(n);
                while (reg.test(n)) {
                    n = n.replace(reg, "$1" + "," + "$2");
                }

                return n;
            }

            Obj.value = num_format(val);
        },
        /**
         * Object(Input Edit) Keyup Event諛쒖깮�� 泥쒕떒�� 肄ㅻ쭏李띻린
         */
        coKeyupToCommaDecimal : function(Obj, decimalSize) {
            Obj.value = jbwrcFnc.coCommaDecimal(Obj.value, decimalSize);
        },
        /**
         * �ㅻ떖 泥댄겕
         * 
         * @param yyyy -
         *            湲곗��꾨룄
         * @param mm --
         *            湲곗���
         * @returns 1 - �ㅻ떖, 0 - �뺤긽
         */
        coIsLeapMonth : function(yyyy, mm) {
            var nY4 = Integer.parseInt(yyyy);
            var nMM = Integer.parseInt(mm);

            if (nY4 % 400 == 0 || (nY4 % 4 == 0 && nY4 % 100 != 0)) {
                return 1;
            }
            return 0;
        },
        /**
         * �대떦�꾩썡�� 留덉�留됱씪�먮� �삳뒗��.
         * 
         * @param yyyy -
         *            湲곗��꾨룄
         * @param mm -
         *            湲곗���
         * @returns {Number} - 留덉�留됱씪��
         */
        coDayOfMonth : function(yyyy, mm) {
            var nMM = Integer.parseInt(mm);
            //
            switch (nMM) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                case 2:
                    return 28 + coIsLeapMonth(yyyy, mm);
            }
        },
        /**
         * Key�� Value瑜� �삳뒗��.
         * 
         * @param str -
         *            臾몄옄��(�뺤떇 : key1=1234,key2=23456)
         * @param key -
         *            key
         * @returns value - 媛�
         */
        coGetKeyValue : function(str, key) {
            var vValue = '';
            var vArray = str.split(',');

            for (var i = 0; i < vArray.length; i++) {
                var vKeyValue = vArray[i].split('=');
                if (vKeyValue[0] == key) {
                    vValue = vKeyValue[1];
                }
            }
            return vValue;

        },
        /**
         * �꾪솕踰덊샇 �щĸ蹂���
         * 
         * @param str -
         *            臾몄옄��
         * @returns value - 媛�
         */
        coPhoneFormat : function(num) {
            return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
        },    
        /**
         * 鍮덇컪 泥댄겕
         * 
         * @param str -
         *            臾몄옄��
         * @returns value - 媛�
         */        
        isNull : function(val) {
            if (val == undefined || val == null || val == '' || (val != null && typeof val == 'object' && !Object.keys(val).length)) {
                return true;
            } else {
                return false;
            }
        },    
        /**
         * 鍮덇컪 移섑솚
         * 
         * @param val - 臾몄옄��
         * @param str - 移섑솚媛�(�놁쑝硫� '' 濡� 移섑솚)
         *            
         * @returns value - 媛�
         */        
        nvl : function(val, str) {
            if(jbwrcFnc.isNull(val)){
                if(str){ return str;}
                else{ return "";}
            }
            return val;
        },
        /**
         * �뱀닔臾몄옄 ��젣
         * 
         * @param str -
         *            臾몄옄��
         * @returns value - 媛�
         */
        coSpecialCharRemove : function(str) {
            var vSpecialChars = /[~!\#$^&*\=\-+|:;?"<,.>']/;

            return str.split(vSpecialChars).join('');
        },
        /**
         * 媛믪씠 null �대㈃ ''濡� 蹂���
         */
        coToNull : function(value) {
            if (value == null) {
                return ''
            }

            return value;
        },
        /**
         * Key Event Code 48~57�� �レ옄媛믪쑝濡� 蹂���
         */
        coNumberKeyCodeValue : function(charCode) {
            var val = 0;
            for (var code = 48; code < 58; code++) {
                if (code == charCode) {
                    return val;
                }
                val++;
            }
        },      
        /**
         * 泥⑤��뚯씪紐� 留뚮뱾湲�
         * 
         * @param bzwkId -
         *            �낅ТID
         * @param regUserNo -
         *            �깅줉�먮쾲��
         */
        coGetAttachFileName : function(bzwkId, regUserNo, extensionName) {
            var fileName = bzwkId + regUserNo + coGetCurDate() + coGetCurTime() + '.' + extensionName;

            return fileName;
        },
        /**
         * Full Path File紐낆뿉�� File紐낅쭔 �삳뒗��. (c:\Users\USER\sample.doc => sample.doc)
         * 
         * @param pathFileName -
         *            Full path file紐�
         */
        coGetOnlyFileName : function(pathFileName) {
            var vAry = pathFileName.split('\\');
            var vVal = pathFileName;
            //
            if (vAry.length > 0) {
                vVal = vAry[vAry.length - 1];
            }
            return vVal;
        },
        /**
         * File紐낆뿉�� �뺤옣�먮챸�� �삳뒗��. (c:\Users\USER\sample.doc => doc)
         * 
         * @param pathFileName -
         *            Full path file紐�
         */
        coGetExtensionName : function(pathFileName) {
            var vAry = pathFileName.split('.');
            var vVal = pathFileName;
            //
            if (vAry.length > 0) {
                vVal = vAry[1];
            }
            return vVal;
        },
        /**
         * Keyup Event諛쒖깮�� 泥쒕떒�� 肄ㅻ쭏李띻린 + �뱀닔臾몄옄, �곷Ц�쒓� �쒓굅
         * 
         * ex) <input type="tel" value="" oninput="this.value=addComma(this.value);"
         * placeholder="">
         * 
         * @param str -
         *            �낅젰媛�
         * @param idx -
         *            肄ㅻ쭏 李띿쓣 湲몄씠 (鍮덇컪 �낅젰�� 3 �뗮똿)
         */
        coAddComma : function(str, idx) {
            if (str === null || str === "") {
                return "";
            }
            var minusStr = "";
            if ("string" != typeof (str)) {
                str = String(str);
            }
            var str_l = str.replace(/\D/g, "");
            return str_l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        coAddCommaAmt : function(value) {
            if (value === null || value === "") {
                return "";
            }

            if ("string" != typeof (value)) {
                value = String(value);
            }
            if (value.substring(0, 1) == "0") {
                value = value.substring(1, value.length);
            }
            var str_l = value.replace(/\D/g, "");
            return str_l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },        
        /**
         * �⑥닔泥섎━ �щ┝
         * @param <String:Y> big : bigDecimal 媛�
         * @param <Number:N> len : �뚯닽�� �먮━��
         * @example
         *       gfn_mathCeil("1234567890.12345", 3); => 1234567890.124
         */
        gfn_mathCeil : function(bigDec, len) {
             len = len || 0;
             var count = Math.pow(10,len);
             var num = Math.ceil(bigDec*count)/count;
             var result = num.toFixed(Math.abs(len));
             return result;
             /*var times = len < 0 ? "0." + gfn_lpad("", -len - 1, "0") + "1" : "1" + gfn_lpad("", len - 1, "0");
             return Round(bigDec, times);*/
        },
         /**
          * �⑥닔泥섎━ 諛섏삱由�
          * @param <String:Y> bigDec          : bigDecimal 媛�
          * @param <Number:N> len             : �뚯닽�� �먮━��
          * @example
          *      gfn_mathRound("1234567890.12345", 5); => 1234567890.1235
          */
         gfn_mathRound : function(bigDec, len) {
             len = len || 0;
             var count = Math.pow(10,len);
             var num = Math.round(bigDec*count)/count;
             var result = num.toFixed(Math.abs(len));
             return result;
             /*
             var times = len < 0 ? "0." + gfn_lpad("", -len - 1, "0") + "1" : "1" + gfn_lpad("", len - 1, "0");
             return Round(bigDec, times);*/
        },
         /**
          * �⑥닔泥섎━ 踰꾨┝
          * @param <String:Y> bigDec  : bigDecimal 媛�
          * @param <Number:N> len     : �뚯닽�� �먮━��
          * @example
          *       gfn_mathFloor("1234567890.12345", 3); => 1234567890.123
          */
         gfn_mathFloor : function(bigDec, len) {
              len = len || 0;
              var count = Math.pow(10,len);
              var num = Math.floor(bigDec*count)/count;
              var result = num.toFixed(Math.abs(len));
              return result;
              /*return Floor(bigDec, len);*/
         },   
         /**
          * 鍮덇컪 �뺤씤 
          */
         isEmpty : function(value){

             if( value == "" || value == null || value == undefined || 
               ( value != null && typeof value == "object" && !Object.keys(value).length)){
                 return true;
             }else{
                 return false;
             }
        },
         /**
          * �꾩옱�쇱옄瑜� �삳뒗��.
          * 
          * YYMMDD
          */          
         fn_getToday : function(){
             var date = new Date();
             var yy = date.getFullYear();
             var mm = date.getMonth() + 1;
             if(mm < 10){
                 mm = '0' + mm;
             }
             var dd = date.getDate();
             if(dd < 10){
                 dd = '0' + dd;
             }
             return yy + '' + mm + '' + dd;
        },
         /**
          * �꾩옱�쒓컙�� �삳뒗��.
          * 
          * HHMISS
          */          
         fn_getTime : function(){
             var date = new Date();
             var hour = date.getHours();
             var min = date.getMinutes();
             var sec = date.getSeconds();
             if(hour < 10){
                 hour = '0' + hour;
             }
             
             return hour + "" + min + "" + sec;
        },
         /**
          * today : �ㅻ뒛 �좎쭨 媛�吏�怨좎샂 
          * parma : today �쒕쾭�먯꽌 getDate("yyyy.MM.dd HH:mm:ss") 媛믪쑝濡� 泥댄겕
          * return YYYYMMDD   
          */ 
         comGetTodayDate : function(today){
             var _date  = new Date(today);
             if(_date.toString() == 'Invalid Date'){
                 _date = new Date();
             }
             var _year  = "" + _date.getFullYear();
             var _month = "" + (_date.getMonth() + 1);
             var _day   = "" + _date.getDate();

             if( _month.length == 1 ) _month = "0" + _month;
             if( ( _day.length ) == 1 ) _day = "0" + _day;

             var tmp = "" + _year + _month + _day;
             return tmp;
        },
         /**
          * gds_lccd : �곹뭹 ��遺꾨쪟 �뺤씤 
          * parma : gds_lccd
          * return 湲덉쑖,由ъ뒪,�뚰듃     
          */
         comGdsLccd : function(gds_lccd){
             var lc_data = Number(gds_lccd); // ��遺꾨쪟 
             var result="";
             if(lc_data > 0 && lc_data < 3){  // 1 �쇰컲 2 �좊� 
                 result = "湲덉쑖";
             }else if(lc_data > 2 && lc_data < 5){
                 result = "由ъ뒪";
             }else if(lc_data > 4 && lc_data < 7){
                 result = "�뚰듃";
             }
             return result;
        },
         /**
          * 肄ㅻ쭏 : 湲덉븸 ex 1000 
          * parma : str
          * return 1,000    
          */
         comComma : function(str){
             if(jbwrcFnc.isEmpty(str)){
                 str = "0";
             }
             str = String(str);
             return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },
         /**
          * �몃뱶�곕쾲�� substr
          * @param phone          : �몃뱶�곕쾲�� ( 01012345678 )
          * @param index          : 由ы꽩 諛쏆쓣 index
          * @param substrResult   : return
          * @example          
          *      var phone = substrPhone( '01012345678', 1 );
          *      console.log(phone); => 010  
          */
         substrPhone : function( phone, index ){
             
             var substrResult = '';
             if( index == 1 ){
                 substrResult = phone.substr(0,3);
             }else if( index == 2 ){
                 substrResult = phone.substr(3,phone.length-7);
             }else if( index == 3 ){
                 substrResult = phone.substr(phone.length-4,phone.length);
             }
             return substrResult;
        },
         /**
          * 醫뚯륫臾몄옄�� 梨꾩슦湲� substr
          * @param str      : �먮Ц�먯뿴
          * @param padLen   : 理쒕� 湲몄씠
          * @param padStr   : 梨꾩슦怨좎옄�섎뒗 臾몄옄��
          * @example          
          *      console.log(lpad("123", 5, "*")); => "**123" 
          */
         lPad : function(str, padLen, padStr){
             if(padStr.length > padLen){
                 return str;
             }
             str += "";
             padStr += "";
             while(str.length < padLen){
                 str = padStr + str; 
             }
             str = str.length >= padLen ? str.substring(0, padLen) : str;
             return str; 
        },
         /**
          * �곗륫臾몄옄�� 梨꾩슦湲� substr
          * @param str      : �먮Ц�먯뿴
          * @param padLen   : 理쒕� 湲몄씠
          * @param padStr   : 梨꾩슦怨좎옄�섎뒗 臾몄옄��
          * @example          
          *      console.log(rpad("123", 5, "*")); => "123**" 
          */
        rPad : function(str, padLen, padStr){
             if(padStr.length > padLen){
                 return str + "";
             }
             str += "";
             padStr += "";
             while(str.length < padLen){
                 str += padStr; 
             }
             str = str.length >= padLen ? str.substring(0, padLen) : str;
             return str; 
        },
        /**
         * �대쫫�щ�
         */        
        isName : function(src){
            var regName = /^[媛�-��]{2,}$/;
            return regName.test(src);
        },
        /**
         * �대찓�쇱뿬遺�
         */        
        isEmail : function(src){
            var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_\.-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            return regEmail.test(src);
        },
        /**
         * �쒓�/�レ옄 �щ�
         */        
        isHangleNum : function(src){ // �쒓� + �レ옄 or �쒓�
            var id = jbwrcFnc.isEmpty(src) ? "" : src;
            var regHangleNum = /^[媛�-��0-9+]*$/; //�쒓� �レ옄 
            var regNum = /^[0-9+]*$/;
            return !regNum.test(id) && regHangleNum.test(id);
        },
        /**
         * �곷Ц/�レ옄 �щ�
         */        
        isEngNum : function(src){ // �곷Ц + �レ옄 or �곷Ц
            var id = jbwrcFnc.isEmpty(src) ? "" : src;
            var regEngNum = /^[A-Za-z0-9+]*$/;
            var regNum = /^[0-9+]*$/;
            return !regNum.test(id) && regEngNum.test(id);
        },
        /**
         * �꾪솕踰덊샇 �щ�
         */        
        isPhone : function(src){
            src = src.split("-").join("");
            var regPhone = /^(01[0|1|6|9|7])\d{4}\d{4}$/;
            if(src.length >= 10 && src.substr(0, 3) != "010"){
                regPhone = /^(01[1|6|9|7])\d{3}\d{4}$/;
            }
            return regPhone.test(src);
        },
        /**
         * �몃뱶�� �섏씠�� 異붽� 諛� �쒓굅 
         */        
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
        /**
         * �ъ뾽�먮쾲�� 泥댄겕
         */        
        fn_chkBisno : function(bisno){
            bisno = bisno.replace(/-/gi,"");
            
            if(bisno.length != 10)
            {
                return false;
            }
            
            var keyArr = [1,3,7,1,3,7,1,3,5];
            var chk = 0;
            
            keyArr.forEach(function(d,i){
                chk += d * bisno[i];
            });
            
            chk += parseInt((keyArr[8] * bisno[8]) / 10, 10);
            
            var chkVal = Math.floor(bisno[9]) === ((10 - (chk % 10)) % 10);
            
            if(chkVal == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        /**
         * 1. �곷━踰뺤씤蹂몄젏 : 81,86,87,88
         * 2. 鍮꾩쁺由щ쾿�몃낯�� 諛� 吏���(踰뺤씤寃� �녿뒗 �щ떒,�щ떒, 湲고��⑥껜以� 踰뺤씤�쇰줈 蹂댁씠�� �⑥껜瑜� �ы븿) : 82
         * 3. 援��, 吏�諛⑹옄移섎떒泥�, 吏�諛⑹옄移섎떒泥댁“�� : 83
         * 4. �멸뎅踰뺤씤�� 蹂�.吏��� 諛� �곕씫�щТ�� : 84
         * 5. �곷━踰뺤씤�� 吏��� : 85
         */
        //踰뺤씤�ъ뾽�먮쾲�� �뺢퇋�� 泥댄겕(以묎컙�먮━留� 泥댄겕)
        fn_chkCrptBisno : function(bisno){
            bisno = bisno.replace(/-/gi,"");
            
            var regTest = /^(8[1|6|7|8|2|3|4|5])$/;                                             // �ъ뾽�먮쾲�� 以묎컙�먮━踰뺤씤泥댄겕
            
            if(bisno.length != 10)
            {
                return false;
            }
            else
            {
                if(regTest.test( bisno.substr(3,2)))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        },
        /**
         * 踰뺤씤踰덊샇 泥댄겕
         */         
        fn_chkCorpRegNo : function (corpRegNo){
            corpRegNo = corpRegNo.replace(/-/gi,"");
            
            if(corpRegNo.length != 13)
            {
                return false;
            }
            
            var keyArr = [1,2,1,2,1,2,1,2,1,2,1,2];
            
            var chk = 0;
            
            keyArr.forEach(function(d,i){
                chk += d * corpRegNo[i];
            });
            
            var chkVal = Math.floor(corpRegNo[12]) === ((10 - (chk % 10)) % 10);
            
            if(chkVal == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        /**
         * �レ옄濡� 蹂���
         * NaN �대굹 �섎せ�� 臾몄옄 �낅젰�� 0�쇰줈 return
         * @param value  : �レ옄濡� 蹂��섑븷 媛�
         * @example
         *      parseNum('123') => 123
         *      parseNum('qwe') => 0
         */
        parseNum : function( value ){
            
            var num = Number(value);
            if( typeof num === 'number' && isFinite(num) ){
                if( !isNaN(num) ){
                    return num
                }else{
                    return 0;
                }
            }else{
                return 0;
            }
        },
        /**
         * �대쫫�� ko -> eng
         * Statements
         * @param name
         * @returns {String}
         */
        changeNameToEng : function(name){
            var rCho =
                [ "r", "R", "s", "e", "E", "f", "a", "q", "Q", "t", "T", "d", "w", "W",
                    "c", "z", "x", "v", "g" ];
            var rJung =
                    [ "k", "o", "i", "O", "j", "p", "u", "P", "h", "hk", "ho", "hl", "y", "n",
                        "nj", "np", "nl", "b", "m", "ml", "l" ];
            var rJong =
                    [ "", "r", "R", "rt", "s", "sw", "sg", "e", "f", "fr", "fa", "fq", "ft", "fx",
                        "fv", "fg", "a", "q", "qt", "t", "T", "d", "w", "c", "z", "x",
                        "v", "g" ];
            var cho, jung, jong;
            var cust_nm = "";
            var nTmp = "";
            for(var i = 0; i < name.length; i++) {
                nTmp = name.substring(i, i + 1).charCodeAt(0) - 0xAC00;
                jong = nTmp % 28; // 醫낆꽦
                jung = ((nTmp - jong) / 28 ) % 21 // 以묒꽦
                cho = ( ( (nTmp - jong) / 28 ) - jung ) / 21 // 醫낆꽦
                cust_nm += rCho[cho] + rJung[jung] + rJong[jong];
            }
            
            return cust_nm;
        },  
        /**
         * 二쇱냼吏� 留덉뒪��
         * Statements
         * @param src
         * @returns {String}
         */
        addressMask : function(src)
        {
          if (src.length == 0) return src;
          if (src.length < 8) return src;
          var resultStr = "";
          resultStr = src.substring(0, 8) + lPad("", src.substring(9).length, "*");
          return resultStr;
        },         
        /**
         * �대찓�� 留덉뒪��
         * Statements
         * @param src
         * @returns {String}
         */
        emailMask : function(src)
        {
          if (src.length == 0) return src;
          var resultStr = "";
          var pos = src.indexOf("@");
          if (pos == 1) {
            resultStr = src.substring(0, 1) + lPad("", src.substring(1, pos).length, "*") + src.substring(pos);
          } else {
            resultStr = src.substring(0, 2) + lPad("", src.substring(2, pos).length, "*") + src.substring(pos);
          }
          return resultStr;
        },      
        /**
         * �대��� 留덉뒪��
         * Statements
         * @param src
         * @returns {String}
         */
        cellPhoneMask : function(src)
        {
          if (src.length == 0) return src;
          var resultStr = "";
          if (src.length > 4) {
            resultStr = src.substring(0, src.length - 4) + lPad("", 4, "*");
          } else {
            resultStr = src;
          }
          return resultStr;
        },      
        /**
         * �쇰컲 �꾪솕 留덉뒪��
         * Statements
         * @param src
         * @returns {String}
         */
        tellNumMask : function(src)
        {
          if (src.length == 0) return src;
          var resultStr = "";
          if (src.length > 4) {
            resultStr = src.substring(0, src.length - 4) + lPad("", 4, "*");
          } else {
            resultStr = src;
          }
          return resultStr;
        },
        
        /**
         * keyPressOk �뺤씤 踰꾪듉 �뚮��꾨븣 valid 泥댄겕 
         * keyPressOk 瑜� input�� �ｌ� �딆쑝硫� �뺤씤 踰꾪듉 �뚮��꾨븣 valid 泥댄겕 �섏� �딆쓬
         * @example          
         *      <input type="tel" class="inp" id="bsntelNo" maxlength="12" 
         *      onkeyup="keyPressOk(this);" 
         *      onkeypress="keyPressOk(this);" 
         *      placeholder="援�쾲, 踰덊샇瑜� �ы븿�� �レ옄留� �낅젰">
         */

        keyPressOk : function(object){
            var $id = $("#" + object.id);
            var maxLen = /^(01[1|6|9|7])$/;
            var phone = /^(01[0])$/;
            if(maxLen.test(object.value.substr(0, 3))){
                $id.attr("maxlength", "10");
            }else if(phone.test(object.value.substr(0, 3))){
                $id.attr("maxlength", "11");
            }else{
                $id.attr("maxlength", "12");
            }
        },

        /**
         * maxlength 12�먯꽌 11濡� 蹂�寃�
         * maxlength 瑜� input�� �ｌ� �딆쑝硫� 湲몄씠 泥댄겕�� �섏� �딆쓬
         * @example          
         *      <input type="tel" class="inp" id="bsntelNo" maxlength="12" 
         *      onkeyup="maxlengthChange(this);" 
         *      onkeypress="maxlengthChange(this);" 
         *      onkeydown="maxlengthChange(this);" 
         *      placeholder="援�쾲, 踰덊샇瑜� �ы븿�� �レ옄留� �낅젰">
         */
        maxlengthChange : function(object){
            var $id = $("#" + object.id);
            var maxLen = /^(01[1|6|9|7])$/;
            var phone = /^(01[0])$/;
            if(maxLen.test(object.value.substr(0, 3))){
                $id.attr("maxlength", "10");
            }else if(phone.test(object.value.substr(0, 3))){
                $id.attr("maxlength", "11");
            }else{
                $id.attr("maxlength", "12");
            }
        },

        /**
         * input type number maxlength 湲곕뒫, �レ옄留� �낅젰媛���
         * maxlength 瑜� input�� �ｌ� �딆쑝硫� 湲몄씠 泥댄겕�� �섏� �딆쓬
         * @example          
         *      <input type="number" id="phoneNo_p" maxlength="11" oninput="numValidCheck(this);">
         *      <input type="number" id="phoneNo_p" oninput="numValidCheck(this);">
         */
        numValidCheck : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }
            
            if (object.classList.contains('company-num')) { // �ъ뾽�먮쾲�� �섏씠��(-) �덉쇅
                object.value = object.value.replace(/[^0-9\-]/g,'').replace(/(\..*)\./g, '$1');
            } else {
                object.value = object.value.replace(/[^0-9]/g,'').replace(/(\..*)\./g, '$1');
            }
        },

        /**
         * input type text maxlength 湲곕뒫 �쒓�, �곷Ц, �レ옄 �낅젰 媛���
         * maxlength 瑜� input�� �ｌ� �딆쑝硫� 湲몄씠 泥댄겕�� �섏� �딆쓬
         * @example          
         *      <input type="text" id="userNm_p" maxlength="40" oninput="hangelValidCheck(this);">
         *      <input type="text" id="userNm_p" oninput="hangelValidCheck(this);">
         */
        hangelValidCheck : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }

            object.value = object.value.replace(/[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|a-zA-Z0-9.]/g,'').replace(/(\..*)\./g, '$1');
        },

        hangelValidCheck1 : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }
           
        },
        
        // input �깅챸 - �쒓�, �곷Ц, 怨듬갚(�멸뎅��)留� 媛��� 
        hangelValidCheckName : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }

            object.value = object.value.replace(/[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|a-zA-Z|\s]/g,'').replace(/(\..*)\./g, '$1');
            object.value = object.value.replace(/\|/g, '');
        },
        
        // input �꾩씠�� - �곷Ц, �レ옄留� 媛���
        idValidCheck : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }

            object.value = object.value.replace(/[^a-zA-Z0-9.]/g,'').replace(/(\..*)\./g, '$1');
            object.value = object.value.replace(/\|/g, '');
        },
        
        // 硫댄뿀踰덊샇 �� 2�먮━ - �쒓�, �レ옄留� 媛���
        licenceValidCheck : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }

            object.value = object.value.replace(/[^\u3131-\u318e\uac00-\ud7a3\u119E\u11A2\u318d\u2025|0-9.]/g,'').replace(/(\..*)\./g, '$1');
        },

        /**
         * input type text maxlength 湲곕뒫, �대찓�� input
         * maxlength 瑜� input�� �ｌ� �딆쑝硫� 湲몄씠 泥댄겕�� �섏� �딆쓬
         * @example          
         *      <input type="text" id="userNm_p" maxlength="40" oninput="emailValidCheck(this);">
         *      <input type="text" id="userNm_p" oninput="emailValidCheck(this);">
         */
        emailValidCheck : function(object){
            
            if( object.maxLength > 0 ){
                if( object.value.length > object.maxLength ){
                    object.value = object.value.slice(0, object.maxLength);
                }
            }

            object.value = object.value.replace(/[^a-zA-Z0-9_\.,@-]|[\|]/g,'').replace(/(\..*)\./g, '$1');
        },

        /**
         * input type text 泥쒕떒�� 肄ㅻ쭏 �쎌엯
         * 留� 泥レ옄由� 0 �낅젰�� replace
         * @example          
         *      <input type="text" id="repay_pcpl" onkeyup="inputNumberFormat(this)">
         */
        inputNumberFormat : function(obj){
               
            obj.value = jbwrcFnc.comma(jbwrcFnc.uncomma(obj.value)).replace(/(^0+)/, '');
        },

        /**
         * 泥쒕떒�� 肄ㅻ쭏 
         */
        comma : function(str){
            str = String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },

        /**
         * comma ��젣
         */
        uncomma : function(str){
            
            str = String(str);
            return str.replace(/[^\d]+/g, '');
        },        
        /**
         * �꾩옱�쇱옄
         */        
        getTodayDate : function(){
            var _date  = new Date();
            var _year  = "" + _date.getFullYear();
            var _month = "" + (_date.getMonth() + 1);
            var _day   = "" + _date.getDate();

            if( _month.length == 1 ) _month = "0" + _month;
            if( ( _day.length ) == 1 ) _day = "0" + _day;

            var tmp = "" + _year + _month + _day;
            return tmp;
        },
        /**
         * �섏씠怨꾩궛
         */ 
        calcAge : function(birth) {                 
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1);
            var day = date.getDate();        
            if (month < 10) {   month = '0' + month };
            if (day < 10) { day = '0' + day };
            var monthDay = month + day;
            birth = birth.replace('-', '').replace('-', '');
            var birthdayy = birth.substr(0, 4);
            var birthdaymd = birth.substr(4, 4);
            var age = monthDay < birthdaymd ? year - birthdayy : year - birthdayy;
            return age;
        },
        /**
         * str�� targetStr濡� �좎뼵�� 紐⑤뱺 臾몄옄瑜� 寃��됲븯�� replaceStr濡� ��泥댄븳��.
         */
        replaceAll : function(str, targetStr, replaceStr){
            if(jbwrcFnc.isNull(str)){
                return "";
            }
            return str.replace(new RegExp(targetStr,'g'), replaceStr);
        },
        /**
         * codeToNumber
         */
        codeToNumber : function(_code){
            return Number(_code.replace(/[A-z]/img,""));
        },
        /**
         * isMobileWeb true/false
         */
        isMobileWeb : function(){
            if($.browser.mobile && ["AA","IA"].indexOf($.browser.device) == -1){
                return true;
            }
            return false;
        },
        /**
         * floatFormat
         */
        floatFormat : function(_value, _fix){
            return (parseInt(_value * Math.pow(10,_fix)) / Math.pow(10,_fix)).toFixed(_fix);
        },
        
        /**
         * 二쇰�踰덊샇 7�먮━濡� �깅퀎, 怨좉컼�좏삎 肄붾뱶 異붿텧
         * �앸뀈�붿씪 , 二쇰�踰덊샇 �� 1�먮━
         */
        getAddIdifInfo : function(brdd, gender) {
            
            if (jbwrcFnc.isEmpty(brdd) || jbwrcFnc.isEmpty(gender)) return;
            if (!(brdd.length == 6 || brdd.length == 8)) return;
            
            if (brdd.length == 8) {
                brdd = brdd.substr(2, 6);
            }

            var birthYear = Number(brdd.substr(0, 2));
            var birthMnDd = brdd.substr(2);
            var sexCd     = '';
            var custType  = '';
            
            switch (gender) {
                case '1':
                    birthYear += 1900;
                    sexCd     = "1";
                    custType  = "1";
                    break;
                case '2':
                    birthYear += 1900;
                    sexCd     = "2";
                    custType  = "1";
                    break;
                case '3':
                    birthYear += 2000;
                    sexCd     = "1";
                    custType  = "1";
                    break;
                case '4':
                    birthYear += 2000;
                    sexCd     = "2";
                    custType  = "1";
                    break;
                case '5':
                    birthYear += 1900;
                    sexCd     = "1";
                    custType  = "4";
                    break;
                case '6':
                    birthYear += 1900;
                    sexCd     = "2";
                    custType  = "4";
                    break;
                case '7':
                    birthYear += 2000;
                    sexCd     = "1";
                    custType  = "4";
                    break;
                case '8':
                    birthYear += 2000;
                    sexCd     = "2";
                    custType  = "4";
                    break;
                case '9':
                    birthYear += 1800;
                    sexCd     = "1";
                    custType  = "1";
                    break;
                case '0':
                    birthYear += 1800;
                    sexCd     = "2";
                    custType  = "1";
                    break;
                default:
                    sexCd     = "0";
                    custType  = "0";
                    break;
            }
            
            
            var addInfo = {
                brdd     : String(birthYear) + birthMnDd,
                sexCd    : sexCd,
                custType : custType
            }
            
            return addInfo;
            
        },
        //�좎쭨 �좏슚�� 寃���
        gfn_isDate : function (str) {
            var year_data = "";
            var month_data = "";
            var date_data = "";
            var i;

            str = str.replace(/[^0-9]/gi, "");

            if (str.length != 8)
                return false;

            for (i = 0; i < 8; i++) {
                var c = str.charAt(i);
                if (c < '0' || c > '9') {
                    return false;
                }
                if (i < 4)
                    year_data += c;
                else if (i >= 4 && i < 6)
                    month_data += c;
                else if (i >= 6)
                    date_data += c;
            }
            
            if (Number(year_data) < 1900) {
                return false;
            }

            var mnthst = month_data;
            var mnth = parseInt(mnthst, 10);
            var dy = parseInt(date_data, 10);

            if (mnth < 1 || mnth > 12 || dy < 1 || dy > 31) {
                return false;
            }

            if (mnth != 2) {
                if (mnth == 4 || mnth == 6 || mnth == 9 || mnth == 11) {
                    if (dy > 30) {
                        return false;
                    }
                } else if (mnth == 1 || mnth == 3 || mnth == 5 || mnth == 7
                        || mnth == 8 || mnth == 10 || mnth == 12) {
                    if (dy > 31) {
                        return false;
                    }
                }
            } else {
                var yr1 = parseInt(year_data);
                var maxdy;
                if ((yr1 % 400 == 0) || ((yr1 % 4 == 0) && (yr1 % 100 != 0))) {
                    maxdy = 29;
                } else {
                    maxdy = 28;
                }

                if (dy > maxdy) {
                    return false;
                }
            }
            return true;
        },
        /*
         * 荑좏궎媛� 媛��몄삤湲�
         * */
        getCookie : function(name) {
            var cookies = document.cookie.split("; ");
            for ( var i = 0; i < cookies.length; i++) {
                var cPos = cookies[i].indexOf("=");
                var cName = cookies[i].substring(0, cPos);
                if (cName == name) {
                    return unescape(cookies[i].substring(cPos + 1));
                }
            }
            // a cookie with the requested name does not exist
            return "";
        },
        /*
         * 荑좏궎 �명똿
         * */        
        setCookie : function(name, value, expires) {
            if(jbwrcFnc.isEmpty(expires)){
                document.cookie = name + "=" + escape(value);
            }else{
                var expire = new Date();
                expire.setDate(expire.getDate() + expires);
                var cookies = document.cookie;
                cookies = name + "=" + escape(value) + "; path=/";
                if (typeof expires != 'undefined') cookies += '; expires=' + expire.toGMTString() + ';';
                document.cookie = cookies;
            }            
        },
        /*
         * �ㅻ줈媛�湲�
         * */        
        goBackFunc : function(backUrl) {
            if (typeof backKeyEvent == "function") {
                backKeyEvent();
            }
            else if (typeof backUrl == "string") {
                window.location.href = backUrl;
            }
            else {
                //if (document.referrer) {
                //    window.location.href = document.referrer; 
                //} else {
                    window.history.back();
                //}
            }           
        },
        /*
         * sleep
         * */        
        sleep : function(ms) {
            const wakeUpTime = Date.now() + ms;
            while(Date.now() < wakeUpTime){}
        },
        /*
         * 濡쒖뺄�ㅽ넗由ъ� �좏슚湲곌컙�ㅼ젙 set
         * */
        setLocalStorageWithExpiry : function(key, value, expiry) {
            if (jbwrcFnc.isNull(value)) {
                localStorage.removeItem(key);
            } else {
                var now = new Date();
                if (!expiry) expiry = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);  // 湲덉씪 留뚮즺
                var item = {value : value, expiry : expiry.getTime()};
                localStorage.setItem(key, JSON.stringify(item));
            }
        },
        /*
         * 濡쒖뺄�ㅽ넗由ъ� �좏슚湲곌컙�ㅼ젙 get
         * */
        getLocalStorageWithExpiry : function(key) {
            var itemStr = localStorage.getItem(key);
            if (!itemStr) return null;
            var item = JSON.parse(itemStr);
            if (new Date().getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        },
        /*
         * �щ줈�� �ъ씠�� �ㅽ겕由쏀똿 ���� 蹂���
         * */
        replaceXss : function(str) {
            if(jbwrcFnc.isEmpty(str)){
                return "";
            }
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/\(/g, '&#40;');
            str = str.replace(/\)/g, '&#41;');
            str = str.replace(/#/g, '&#35;');
            str = str.replace(/&/g, '&amp;');
            return str;
        },
        
     // �곸뾽��, �곸뾽�쒓컙 議고쉶
        checkBusinessDay : function ( beforeShow, compleShow, callback ){
            
            jbwrcUtil.customAjax({
                url : "/onl/stm/checkBusinessDay.do"                // url 
                , data : ''                                         // param
                , beforeShow : jbwrcFnc.isEmpty(beforeShow) ? false : true   // 濡쒕뵫諛� �щ� 
                , compleShow : jbwrcFnc.isEmpty(compleShow) ? false : true   // 濡쒕뵫諛� �щ� 
                , callBack : function(result){                      // 肄쒕갚
                    callback(result);
                }             
            });
        }
    };
})();















 

 
