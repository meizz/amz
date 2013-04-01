///import amz;

/**
 * @description 取得当前页面的一些高宽信息
 * @author meizz
 * @create 2013-3-3
 * @function
 * @name amz.page
 * @grammar amz.page( [document] )
 * @param {Document} doc 指定的document对象
 * @return {Object} 返回一个JSON对象，包含指定的高宽信息
 */
amz.page = amz.page || function( doc ) {
    doc = doc || document;

    var result = {},
        body = doc.body,
        win = doc.parentWindow || doc.defaultView,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    result.width  = Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
    result.height = Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);

    result.viewWidth  = client.clientWidth;
    result.viewHeight = client.clientHeight;

    result.scrollTop  = win.pageYOffset || html.scrollTop  || body.scrollTop;
    result.scrollLeft = win.pageXOffset || html.scrollLeft || body.scrollLeft;

    return result;
};