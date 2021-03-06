///import amz.type;

/**
 * @description 检查对象是否为一个简单对象 {}
 * @author meizz
 * @create 2012-09-03
 *
 * @function
 * @name amz.isPlainObject
 * @grammer amz.isPlainObject( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
// 20120903 mz 检查对象是否为一个简单对象 {}
amz.isPlainObject = function(unknow) {
    var key,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    if ( amz.type(unknow) != "object" ) {
        return false;
    }

    // NodeList for IE6,7,8  20121130
    if ( unknow.item && typeof unknow.length == "number" ) {
        return false;
    }

    //判断new fn()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( unknow.constructor &&
        !hasOwnProperty.call(unknow, "constructor") &&
        !hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in unknow ) break;
    return key === undefined || hasOwnProperty.call( unknow, key );
};