///import amz.dom;
///import amz.string.toCamelCase;
///import amz.dom.getDocument;

/**
 * @description 取得当前元素实际运行的样式值
 * @author meizz
 * @create 2013-3-3
 * @function
 * @name amz.dom.getComputedStyle
 * @grammar amz.dom.getComputedStyle( element, cssName )
 * @param {HTMLElement} element 目标DOM元素
 * @param {String} cssName 样式名
 * @return {Object} 对应的样式值
 */
amz.dom.getComputedStyle = function( element, cssName ) {
    element = amz.dom( element );
    cssName = amz.string.toCamelCase( cssName );
    if ( element.currentStyle ) {
        return element.currentStyle[ cssName ];
    } else {
        var doc = amz.dom.getDocument( element ),
            win = doc.defaultView;
        if ( win && win.getComputedStyle ) {
            var styles = win.getComputedStyle(element, null);
            if (styles) {
                return styles[ cssName ] || styles.getPropertyValue( cssName );
            }
        }
        return ""; 
    }
};