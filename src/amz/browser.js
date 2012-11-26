///import amz.extend;

/**
 * @name amz.browser
 * @author meizz
 * @create 2012-06-29
 * @modify
 *
 * @description 判断浏览器类型和特性的属性
 * @namespace
 * @name amz.browser
 * @grammar amz.browser.ie
 * @grammar amz.browser.chrome
 * @grammar amz.browser.firefox
 * @grammar amz.browser.opera
 * @grammar amz.browser.safari
 * @grammar amz.browser.isGecko
 * @grammar amz.browser.isStrict
 * @grammar amz.browser.isWebkit
 */
amz.browser = amz.browser || function(){
    var ua = navigator.userAgent;
    
    var result = {
        isStrict : document.compatMode == "CSS1Compat"
        ,isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua)
        ,isWebkit: /webkit/i.test(ua)
    };

    try{/(\d+\.\d+)/.test(external.max_version) && (result.maxthon = + RegExp['\x241'])} catch (e){};

    // 蛋疼 你懂的
    switch (true) {
        case /msie (\d+\.\d+)/i.test(ua) :
            result.ie = document.documentMode || + RegExp['\x241'];
            break;
        case /chrome\/(\d+\.\d+)/i.test(ua) :
            result.chrome = + RegExp['\x241'];
            break;
        case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) :
            result.safari = + (RegExp['\x241'] || RegExp['\x242']);
            break;
        case /firefox\/(\d+\.\d+)/i.test(ua) :
            result.firefox = + RegExp['\x241'];
            break;
        case /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) :
            result.opera = + ( RegExp["\x246"] || RegExp["\x242"] );
            break;
    }
           
    amz.extend(amz, result);

    return result;
}();
