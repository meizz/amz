///import amz;

/**
 * @description 判断对象是否为Object或Function类型
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isObject
 * @grammer amz.isObject( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};
