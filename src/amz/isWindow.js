///import amz.type;

/**
 * @description 判断对象是否为 Window
 * @author meizz
 * @create 2012-11-27
 *
 * @function
 * @name amz.isWindow
 * @grammer amz.isWindow( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
amz.isWindow = function( unknow ) {
    return amz.type( unknow ) == "Window";
};
