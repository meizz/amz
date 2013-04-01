///import amz.dom;

/**
 * @description 在目标元素的指定位置插入HTML代码
 * @name amz.dom.insertHTML
 * @function
 * @grammar amz.dom.insertHTML(element, position, html)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} position  插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd，大小写不敏感
 * @param {string} html 要插入的html
 * @remark
 * 
 * 如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
 *             
 * @return {HTMLElement} 目标元素
 */
amz.dom.insertHTML = function (element, position, html) {
    var range, begin, el = amz.dom(element);

    if (el.insertAdjacentHTML) {
        el.insertAdjacentHTML(position, html);
    } else {
        range = el.ownerDocument.createRange();
        position = position.toUpperCase();
        if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
            range.selectNodeContents(el);
            range.collapse(position == 'AFTERBEGIN');
        } else {
            begin = position == 'BEFOREBEGIN';
            range[begin ? 'setStartBefore' : 'setEndAfter'](el);
            range.collapse(begin);
        }
        range.insertNode(range.createContextualFragment(html));
    }
    return element;
};