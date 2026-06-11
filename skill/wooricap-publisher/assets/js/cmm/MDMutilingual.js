/*
 * ! <pre> �ㅺ뎅�� �ъ슜 怨듯넻 湲곕뒫�⑥닔 Javascript </pre>
 * 
 * @ClassName : MDMutilingual.js
 * @Description : �ㅺ뎅�� �ъ슜 怨듯넻 湲곕뒫�⑥닔
 * @author 24WP0097
 * @since 2024. 11. 29.
 * @version 1.0
 * @see 
 * @Modification Information <pre> since author description ===========
 *      ============= =========================== 2024. 11. 29. 24WP0097 理쒖큹 �앹꽦 </pre>
 */
;(function ($, win, doc, undefined) {

    $(doc).ready(function() {
        //changeLang();
        if(sessionStorage.getItem("reqlang") !== 'ko') changeLang();
    });

})(jQuery, window, document);


/* �몄뼱 蹂�寃� Set */
function changeLang(_callback){

    if(sessionStorage.getItem("multiLangPack") != null && sessionStorage.getItem("multiLangPack") != ''){

        var jsonEnObj = JSON.parse(sessionStorage.getItem ("multiLangPack"));

        for( var i  = 0 ;  i < $("[data-lang]").length ; i ++){
            if( !jbwrcFnc.isEmpty(jsonEnObj[$("[data-lang]").eq(i).html().split(/\s+/).join(' ').trim()])){
                $("[data-lang]").eq(i).html( jsonEnObj[ $("[data-lang]").eq(i).html().split(/\s+/).join(' ').trim() ] );
            }//if
        }//for

        if(typeof mdCmmAuth== 'object' ){
            for (var key in mdCmmAuth.mainTit){
                if( !jbwrcFnc.isEmpty(jsonEnObj[mdCmmAuth.mainTit[key]])){
                    mdCmmAuth.mainTit[key] =  jsonEnObj[ mdCmmAuth.mainTit[key] ];
                }//if
            }//for
        }//if

        $('[data-lang][placeholder]').each(function(){ //2025_04_22 �뚮젅�댁뒪���� 踰덉뿭
            //console.log($(this).attr('placeholder'))
            if (!jbwrcFnc.isEmpty(jsonEnObj[$(this).attr('placeholder')])){
                $(this).attr('placeholder' , jsonEnObj[$(this).attr('placeholder')]);
            }//if

        })//each
        
        if (typeof _callback == "function") {
            _callback();
        }

    }//if
    if(containsLang(sessionStorage.getItem ("multiLangPack"))){

        $('.h_1').css('font-family', 'none');

    }

}//changeLang()

function removeTags(str) { //�쒓렇瑜� 吏��뚯빞 �좎씪 �덉쓣��.�ㅼ슜�대낫��.
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.textContent.split(/\s+/).join(' ').trim();
}

function containsLang(text){ //以묎뎅�� , �ъ떆�꾩뼱
    const chineseRegex = /[\u4E00-\u9FFF]/
    const russianRegex = /[\u0400-\u04FF]/
    return chineseRegex.test(text) || russianRegex.test(text);
}

function getSelectLang(){ //�곗씠�� �쎌뼱�ㅺ린
    const multiLangPackArr =sessionStorage.getItem ("multiLangPack")
    const langData = JSON.parse(multiLangPackArr)
    
    return langData; 
}

//�ㅺ뎅�� 蹂��� (�ъ슜諛⑸쾿 : setMultiLangData("李⑤웾�뺣낫"))
function setMultiLangData(transText){
    return getSelectLang() == null ? transText : getSelectLang()[transText] == null ? transText : getSelectLang()[transText];
}