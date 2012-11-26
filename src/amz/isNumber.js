///import amz.type;

/**
 * @description 判断Number对象类型
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isNumber
 * @grammer amz.isNumber( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isNumber = function( unknow ) {
    return amz.type( unknow ) == "number" && isFinite( unknow );
};
