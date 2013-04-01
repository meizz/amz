///import amz.type;

/**
 * @description 判断对象类型
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.isDate
 * @grammer amz.isDate( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isDate = function( unknow ) {
    return amz.type(unknow) == "date" && unknow.toString() != "Invalid Date" && !isNaN(unknow);
};
