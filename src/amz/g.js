///import amz.dom;

/**
 * @description 从文档中获取指定的DOM元素
 * @author meizz
 * @create 2009-11-17
 * @modify 2012-11-26 对链式对象的支持
 * @function 
 * @name amz.g
 * @grammar amz.g(obj[, document])
 * @param {String|Element|jQuery|TangramDOM} obj 元素的ID名称或者直接传入元素本身
 * @return {Element} 如果传入的ID是不存在的则返回Null
 */
amz.g = amz.dom;