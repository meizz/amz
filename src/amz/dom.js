///import amz;

/**
 * @description 从文档中获取指定的DOM元素
 * @author meizz
 * @create 2009-11-17
 * @modify 2012-11-26 对链式对象的支持
 * @function 
 * @name amz.dom
 * @grammar amz.dom(obj[, document])
 * @param {String|Element|jQuery|TangramDOM} obj 元素的ID名称或者直接传入元素本身
 * @return {Element} 如果传入的ID是不存在的则返回Null
 */
amz.dom = amz.dom || function(obj, owner) {
    //修改IE下 amz.dom(amz.dom('dose_not_exist_id'))报错的bug，by Meizz, dengping
    if (!obj) return null;
    if ('string' == typeof obj || obj instanceof String) {
        return (owner||document).getElementById(obj);
    } else if (obj.nodeName && (obj.nodeType == 1 || obj.nodeType == 9)) {
        return obj;
    } else if (obj[0] && obj[0].nodeName ) {
        return obj[0];
    }
    return null;
};