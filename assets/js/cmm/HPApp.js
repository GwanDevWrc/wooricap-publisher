/**
 * Supported Browser : MSIE, Chrome , FireFox
 * 
 * Object       : HPApp.js.js
 * Description  : js �뚯씪 �ㅻ챸�� 湲곗닠�⑸땲��.
 * Author       : ??????
 * Since        : 2020. 12. 16.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2020. 12. 16.    ??????   	 	理쒖큹 �앹꽦
 */

var HPApp = HPApp || {};

HPApp.Util = (function(){
    
    var JBWRC_MENU_1 = null;
    var JBWRC_MENU_2 = null;
    var JBWRC_MENU_3 = null;
    var JBWRC_MENU_4 = null;
    
    var JBWRC_MENUS = null;
    var timeStamp = null;
    
    return {
        
        isDevServer : false,
        isTestServer : false,
        isRealServer : false,
        
        currUser : {
            userType : '',
            loanType : '',
            orgUserType : '',
            orgLoanType : ''
        },
        
        yyyyMMdd : function(date) {
            if (!date) date = new Date();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            return [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
        },
        
        HHmmss : function(date) {
            if (!date) date = new Date();
            var hh = date.getHours();
            var mm = date.getMinutes();
            var ss = date.getSeconds();
            return [(hh>9 ? '' : '0') + hh, (mm>9 ? '' : '0') + mm, (ss>9 ? '' : '0') + ss].join('');
        },
        
        dynamicSubmit : function(url, paramMap, target) {
            var f = document.createElement('form');
            f.setAttribute('method', 'POST');
            f.setAttribute('action', url);
            f.setAttribute('target', target || '_self');
            
            for (var key in paramMap) {
                if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
                    var h = document.createElement('input');
                    h.setAttribute('type', 'hidden');
                    h.setAttribute('name', key);
                    h.setAttribute('value', paramMap[key]);
                    f.appendChild(h);
                }
            }
            return f;
        },
        
        appIronAuthDblChec : function(sid, token, beforeFunc, succFunc, errFunc, completeFunc) {
            $.ajax({
                url:"/cmm/appIronAuthDblCheck.do",
                data:{sid:sid, token:token},
                dataType:"json",
                method:"post",
                beforeSend:function() {
                    if (beforeFunc) beforeFunc();
                },
                success:function(data, status, xhr) {
                    succFunc(data);
                },
                error:function(xhr, status, error) {
                    errFunc(xhr.responseJSON)
                },
                complete:function() {
                    if (completeFunc) completeFunc();
                }
            });  
        },
        
        goErrorView : function(statusCode) {
            var url = window.location.protocol + "//" + window.location.host + "/errorView.do?statusCode=" + statusCode;
            //console.log(url);
            window.location.href = url;
        },
        
        goHome : function() {
            window.location.href = window.location.protocol + "//" + window.location.host;
        },
        
        getMenuNoByUrl : function(url) {
            url = url || window.location.pathname;
            if (url.indexOf(".do")) {
                return url.substring(url.lastIndexOf('/')+1, url.indexOf("."));
            } else {
                return "";
            }
        },
        
        getParentMneuNo : function(menuNo, level) {
             var menuArr = this.getMenu(level);
             for (i=0, max=menuArr.length; i<max; i++) {
                 if (menuArr[i].menuVal == menuNo) {
                     return menuArr[i].parentMenuVal;
                 }
             }
             return "";
        },
        
        getObservableGroupMenu : function(menuNo, level) {
            var ctx = this;
            return rxjs.from(ctx.getMenu(level)).pipe(
                rxjs.operators.find(function(menu){ return menu.menuVal == menuNo }),
                rxjs.operators.mergeMap(function(one){ return rxjs.from(ctx.getMenu(level)).pipe(
                    rxjs.operators.filter(function(menu){ return menu.parentMenuVal == one.parentMenuVal}),
                    rxjs.operators.toArray(),
                    rxjs.operators.map(function(menuGrp){ return {no:one.menuVal, nm:one.menuNm, url:one.menuUrl, pno:one.parentMenuVal, group:menuGrp } })
                ) })
            );
        },
        
        getMenu : function(level) {
            switch (level) {
                case 1: return JBWRC_MENU_1;
                case 2: return JBWRC_MENU_2;
                case 3: return JBWRC_MENU_3;
                default: return JBWRC_MENUS;
            }
        },
        
        getMenuByParentVal : function(parentVal, level) {
            var resultMenu = [];
            if (level == 3) {
                for (var i=0; i<JBWRC_MENU_3.length; i++) {
                    if (JBWRC_MENU_3[i].parentMenuVal === parentVal) {
                        resultMenu.push(JBWRC_MENU_3[i])
                    }
                }
            }
            return resultMenu;
        },
        
        getMenuByMenuVal : function(menuVal, level) {
            if (level == 3) {
                for (var i=0; i<JBWRC_MENU_3.length; i++) {
                    if (JBWRC_MENU_3[i].menuVal === menuVal) {
                        return JBWRC_MENU_3[i];
                    }
                }
            } else if (level == 2) {
                for (var i=0; i<JBWRC_MENU_2.length; i++) {
                    if (JBWRC_MENU_2[i].menuVal === menuVal) {
                        return JBWRC_MENU_2[i];
                    }
                }
            } else if (level == 1) {
                for (var i=0; i<JBWRC_MENU_1.length; i++) {
                    if (JBWRC_MENU_1[i].menuVal === menuVal) {
                        return JBWRC_MENU_1[i];
                    }
                }
            } else if (level == 4) {
                for (var i=0; i<JBWRC_MENU_4.length; i++) {
                    if (JBWRC_MENU_4[i].menuVal === menuVal) {
                        return JBWRC_MENU_4[i];
                    }
                }
            }
            return null;
        },
        
        asyncLoadMenu : function(callback) {
            
            /* �붿껌 �� 30遺� �대궡硫� 耳��쒖뿉�� �꾨떖 
            if (JBWRC_MENUS) {
                if ( ((new Date().getTime() - timeStamp) / 1000 / 60) <= 30 ) {
                    callback(JBWRC_MENUS);
                    return;
                }
            }*/
            var env = JBWRC.getDevice();
            rxjs.from(
                typeof window['menuByJsonObje'] == 'object' ? [window['menuByJsonObje']] : new Promise(function(resolve, reject){
                
                    $.ajax({
                        url:"/man/loadHpgMenu.do",
                        data:"",
                        dataType:"json",
                        method:"post",
                        success:function(data, status, xhr) {
                            resolve(data);
                        },
                        error:function(xhr, status, error) {
                            reject(xhr.responseJSON);
                        }
                    });
                
                })
            )
            .pipe(
                rxjs.operators.mergeMap(function(arr){ return rxjs.from(arr) }),
                rxjs.operators.map(function(menu){ menu.menuUrl = menu.menuUrl.replace('https://www.wooricap.com', ''); return menu; }),
                rxjs.operators.filter(function(menu){ return menu.useYn == 'Y' }),
                rxjs.operators.filter(function(menu){
                    if (env == 'W') {
                        if (menu.pcUseYn == 'Y') {
                            if (menu.pcCustTycd & HPApp.Util.currUser.userType) {
                                if (menu.pcLoanTycd & HPApp.Util.currUser.loanType) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                        //return menu.pcUseYn == 'Y';
                    } else if (env == 'IW' || env == 'AW') {
                        if (menu.mblUseYn == 'Y') {
                            if (menu.mblCustTycd & HPApp.Util.currUser.userType) {
                                if (menu.mblLoanTycd & HPApp.Util.currUser.loanType) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                        //return menu.mblUseYn == 'Y';
                    } else if (env == 'IA' || env == 'AA') {
                        if (menu.appUseYn == 'Y') {
                            if (menu.appCustTycd & HPApp.Util.currUser.userType) {
                                if (menu.appLoanTycd & HPApp.Util.currUser.loanType) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                        //return menu.appUseYn == 'Y';
                    }
                     
                }),
                rxjs.operators.groupBy(function(menu){ return menu.level }),
                rxjs.operators.mergeMap(function(group){ return group.pipe(
                    rxjs.operators.toArray(),
                    rxjs.operators.map(function(arr){ return {key:group.key, value:arr} })    
                )}),
                rxjs.operators.toArray(),
                rxjs.operators.map(function(arr){ return arr.sort(function(x1, x2){ if (x1.key > x2.key) return 1; if (x1.key < x2.key) return -1; }) })
            )
            .subscribe({
                next: function(data){
                    
                    JBWRC_MENU_1 = data[0].value;
                    JBWRC_MENU_2 = data[1].value;
                    JBWRC_MENU_3 = data[2].value;
                    JBWRC_MENU_4 = data[3].value;
                    
                    //console.log('Menu level1 count : ', JBWRC_MENU_1.length);
                    //console.log('Menu level2 count : ', JBWRC_MENU_2.length);
                    //console.log('Menu level3 count : ', JBWRC_MENU_3.length);
                    //console.log('Menu level4 count : ', JBWRC_MENU_4.length);
                    
                    rxjs.from(data[1].value)
                    .pipe(
                        rxjs.operators.map(function(x){
                            x.subMenu = x.subMenu || [];
                            $.each(data[2].value, function(idx,value){
                                if (x.menuVal == value.parentMenuVal) x.subMenu.push(value); 
                            });
                            return x;
                        }),
                        rxjs.operators.toArray(),
                        rxjs.operators.mergeMap(function(arr){
                            return rxjs.from(data[0].value)
                            .pipe(
                                rxjs.operators.map(function(x){
                                    $.each(arr, function(idx, item){
                                        x.subMenu = x.subMenu || [];
                                        if (item.parentMenuVal == x.menuVal) x.subMenu.push(item);
                                    });
                                    return x;
                                }),
                                rxjs.operators.toArray()
                            )
                        })
                    )
                    .subscribe({
                        next: function(x){ 
                            JBWRC_MENUS = x; 
                            timeStamp = new Date().getTime();
                        },
                        error: function(err){ 
                            //console.log(err) 
                        },
                        complete: function(){ callback(JBWRC_MENUS) }
                    });
                },
                error: function(err){ 
                    //console.log(err) 
                },
                complete: function(){ 
                    //console.log('') 
                }
                
            });
            
        },
        
        initLatestMenuCookie : function() {
            Cookies.set('latestMenu', {idx:0, menus:[{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''}]});
        },
        
        setLatestMenuCookie : function(menuNo) {
            var latestMenu = Cookies.getJSON('latestMenu');
            if (latestMenu) {
                
                var flag = false;
                for (var i=0; i<latestMenu.menus.length; i++) {
                    if (latestMenu.menus[i].nm == menuNo) {
                        //console.log(menuNo);
                        flag = true; 
                        break;
                    }
                }
                if (flag) return;
                var currIdx = latestMenu.idx; 
                latestMenu.idx += 1;
                latestMenu.menus[currIdx % 5] = {ord:latestMenu.idx, nm:menuNo.replace(/<script>|<\/script>/gi, '')};
                Cookies.set('latestMenu', latestMenu);
                
            } else {
                this.initLatestMenuCookie();
                this.setLatestMenuCookie(menuNo);
            }
        },
        
        getLatestMenuCookie : function() {
            
            var latestMenu = Cookies.getJSON('latestMenu');
            if (!latestMenu) this.initLatestMenuCookie();
            return Cookies.getJSON('latestMenu');
            
        },
        
        initLatestSearchMenuCookie : function() {
            Cookies.set('latestSearchMenu', {idx:0, menus:[{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''},{ord:0,nm:''}]});
        },
        
        setLatestSearchMenuCookie : function(menuNo) {
            var searchMenu = Cookies.getJSON('latestSearchMenu');
            if (searchMenu) {
                //console.log("##", searchMenu);
                var flag = false;
                for (var i=0; i<searchMenu.menus.length; i++) {
                    if (searchMenu.menus[i].nm == menuNo) {
                        //console.log(menuNo);
                        flag = true; 
                        break;
                    }
                }
                if (flag) return;
                var currIdx = searchMenu.idx; 
                searchMenu.idx += 1;
                searchMenu.menus[currIdx % 5] = {ord:searchMenu.idx, nm:menuNo.replace(/<script>|<\/script>/gi, '')};
                Cookies.set('latestSearchMenu', searchMenu);
            } else {
                this.initLatestSearchMenuCookie();
                this.setLatestSearchMenuCookie(menuNo);
            }
        },
        
        getLatestSearchMenuCookie : function() {
            var searchMenu = Cookies.getJSON('latestSearchMenu');
            if (!searchMenu) this.initLatestSearchMenuCookie();
            return Cookies.getJSON('latestSearchMenu');
        },
        
        goUrl : function(url, type) {
            switch(type) {
                case 1: window.location.href = url; break;
                case 2: window.location.replace(url); break;
                default : window.location.replace(url);
            }
        }
    };
})();