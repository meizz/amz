///import amz._extend;
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
 * @grammer amz.createSingle( prototype )
 *
 * @param   {object}        prototype   直接挂载到这个单例里的预定属性/方法
 * @param   {string}        type        类名
 * @return  {object}        类的实例
 */

amz.createSingle = function (prototype, type) {
    var me = new amz.base.Class();
    type && ( me._type_ = type );
    return amz._extend(me, prototype);
};

