///import amz;

/**
 * @description 判断对象是否可被遍历
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isEnumerable
 * @grammer amz.isEnumerable( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */

// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
amz.isEnumerable = function( unknow ){
    return unknow != null
        && typeof unknow == "object"
        &&(typeof unknow.length == "number"
        || typeof unknow.byteLength == "number"     //ArrayBuffer
        || typeof unknow[0] != "undefined");
};
