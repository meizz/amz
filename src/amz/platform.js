///import amz.forEach;

/**
 * @description 判断客户端运行平台系统 platform
 *
 * @author meizz
 * @name amz.platform
 * @create 2012-06-29
 * @modify
 *
 * @grammer amz.platform
 * @grammer amz.isAndroid
 * @grammer amz.isIpad
 * @grammer amz.isIphone
 * @grammer amz.isLinux
 * @grammer amz.isMacintosh
 * @grammer amz.isWindows
 * @grammer amz.isX11
 */
amz.platform = amz.platform || function(){
    var ua = navigator.userAgent,
        result;

    amz.forEach( "Android iPad iPhone Linux Macintosh Windows X11".split(" "), function( item ) {
        var key = item.charAt(0).toUpperCase() + item.toLowerCase().substr( 1 );
        ( amz[ "is" + key ] = ua.indexOf( item ) > -1 ) && ( result = item );
    });

    return result;
}();
