///import amz.extend;
///import amz.isString;
///import amz.base.Class;

/**
 * @description 创建一个 amz.base.Class 的单例实例
 *
 * @author meizz
 * @version 2012-09-27
 * @modify
 *
 * @function
 * @name amz.createSingle
 * @grammer amz.createSingle( prototype[, type] )
 *
 * @param   {object}        methods   直接挂载到这个单例里的预定属性/方法
 * @param   {string}        type        类名
 * @return  {object}        类的实例
 */
amz.createSingle = function (methods, type) {
    var me = new amz.base.Class();
    amz.isString(type) && ( me._type_ = type );
    return amz.extend(me, methods);
};

