///import amz;

/**
 * @description 判断对象是否象Array，特指拥有 .length 属性且能够通过数字下标索引的对象
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isArrayLike
 * @grammer amz.isArrayLike( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
amz.isArrayLike = function( unknow ){
    return unknow != null
        &&(typeof unknow == "object" || Object.prototype.toString.call(unknow)=="[object NodeList]")
        &&(typeof unknow.length == "number"
        || typeof unknow.byteLength == "number"     //ArrayBuffer
        || typeof unknow[0] != "undefined");
};

// 20121130 在Safari 5.1.7中 typeof NodeList 结果是 function，没见过这么坑人的