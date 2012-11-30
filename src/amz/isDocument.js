///import amz.type;

/**
 * @description 判断对象是否为 Document
 * @author meizz
 * @create 2012-11-27
 *
 * @function
 * @name amz.isDocument
 * @grammer amz.isDocument( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isDocument = function( unknow ) {
    return amz.type( unknow ) == "Document";
};
