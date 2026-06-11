/*
 * Input Mask plugin extensions http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - Robin Herbots Licensed under the MIT license
 * (http://www.opensource.org/licenses/mit-license.php) Version: 0.0.0-dev
 * 
 * Optional extensions on the jquery.inputmask base
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "./dependencyLibs/inputmask.dependencyLib", "./inputmask" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask"));
    } else {
        factory(window.dependencyLib || jQuery, window.Inputmask);
    }
}(function($, Inputmask) {
    // extra definitions
    Inputmask.extendDefinitions({
        "A" : {
            validator : "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            cardinality : 1,
            casing : "upper" // auto uppercasing
        },
        "&" : { // alfanumeric uppercasing
            validator : "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            cardinality : 1,
            casing : "upper"
        },
        "#" : { // hexadecimal
            validator : "[0-9A-Fa-f]",
            cardinality : 1,
            casing : "upper"
        }
    });
    Inputmask.extendAliases({
        "url" : {
            definitions : {
                "i" : {
                    validator : ".",
                    cardinality : 1
                }
            },
            mask : "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
            insertMode : false,
            autoUnmask : false,
            inputmode : "url",
        },
        "ip" : { // ip-address mask
            mask : "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions : {
                "i" : {
                    validator : function(chrs, maskset, pos, strict, opts) {
                        if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
                            chrs = maskset.buffer[pos - 1] + chrs;
                            if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
                                chrs = maskset.buffer[pos - 2] + chrs;
                            } else
                                chrs = "0" + chrs;
                        } else
                            chrs = "00" + chrs;
                        return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality : 1
                }
            },
            onUnMask : function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode : "numeric",
        },
        "email" : {
            // https://en.wikipedia.org/wiki/Domain_name#Domain_name_space
            // https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
            // should be extended with the toplevel domains at the end
            mask : "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
            greedy : false,
            onBeforePaste : function(pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions : {
                "*" : {
                    validator : "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    cardinality : 1,
                    casing : "lower"
                },
                "-" : {
                    validator : "[0-9A-Za-z\-]",
                    cardinality : 1,
                    casing : "lower"
                }
            },
            onUnMask : function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode : "email",
        },
        "mac" : {
            mask : "##:##:##:##:##:##"
        },
        // https://en.wikipedia.org/wiki/Vehicle_identification_number
        // see issue #1199
        "vin" : {
            mask : "V{13}9{4}",
            definitions : {
                'V' : {
                    validator : "[A-HJ-NPR-Za-hj-npr-z\\d]",
                    cardinality : 1,
                    casing : "upper"
                }
            },
            clearIncomplete : true,
            autoUnmask : true
        },
        "rrno01" : {
            mask : "999999[-zzzzzzz]",
            greedy : false,
            onKeyValidation : function(key, result) {                
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 13) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $('> section, :text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    //$($(this).parentsUntil().next().find(':input:visible, [type="tel"]:visible')[0]).focus();
                    //$(this).parentsUntil().next().find(':input:visible, [type="tel"]:visible').first().focus();
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                                        
                }
            }
        },
        "rrno02" : {
            mask : "999999[-9zzzzzz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 13) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    //$(this).parentsUntil().next().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();                    
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "card01" : {
            mask : "9999[-9999][-zzzz][-zzzz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 18) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "driveNo" : {
            mask : "99[-zzzzzz][-zz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 10) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "rsdtNo2" : {
            mask : "9[zzzzzz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 7) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "securityData01" : {
            mask : "9999[-99][-99]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 8) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "securityData02" : {
            mask : "9[-999][-zzz][-zzzz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 13) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        },
        "securityData03" : {
            mask : "9999[-99][-zz]",
            greedy : false,
            onKeyValidation : function(key, result) {
                if(!result){
                    if (!$.browser.mobile) {
                        $(this).val("");
                        $ASTX2.clearE2EText($(this)[0]);    
                    }
                }
                if (result.pos == 8) {
                    /*var thisIndes = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').index($(this));
                    var nextObj = $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes + 1);                    
                    if($(nextObj).text() == "�댁쟾"){
                        thisIndes = thisIndes + 2;
                    }else{
                        thisIndes = thisIndes + 1; 
                    }
                    $(':text:visible, select:visible,[type="tel"]:visible,[type="checkbox"]:visible,[type="button"]:visible,[type="password"]:visible').eq(thisIndes).focus();*/
                    $(this).parentsUntil("main").nextUntil().find(':input:visible, button:visible, [type="tel"]:visible').first().focus();
                }
            }
        }
    });
    return Inputmask;
}));