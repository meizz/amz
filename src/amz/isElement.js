///import amz.type;

/**
 * @description 判断对象类型是否为 HTMLElement
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isElement
 * @grammer amz.isElement( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isElement = function( unknow ) {
    return amz.type(unknow) == "HTMLElement";
};
