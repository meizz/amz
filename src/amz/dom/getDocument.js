///import amz.dom;

/**
 * @description 取得当前DOM元素所在的document
 * @author meizz
 * @create 2013-3-3
 * @function
 * @name amz.dom.getDocument
 * @grammar amz.dom.getDocument(element)
 * @param {HTMLElement} element
 * @return {Document} document对象
 */

amz.dom.getDocument = function (element) {
    element = amz.dom(element);
    return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};