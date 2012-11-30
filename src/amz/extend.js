///import amz._extend;
///import amz.isArray;
///import amz.isObject;
///import amz.isBoolean;
///import amz.isPlainObject;

/**
 * @description 拷贝某对象的所有属性/方法；如果第一个参数为true，则进入深度克隆，并返回一个全新对象
 *
 * @name amz.extend
 * @author meizz
 * @create 2011-06-01
 * @modify 2012-08-31 mz 添加深度clone和多对象拷贝策略
 *
 * @grammar amz.extend([depthClone,] obj0[, obj1[, obj2....]])
 *
 * @param   {Boolean}   depthClone  是否深度克隆的标识，默认为false
 * @return  {Object}                合并后的JS对象
 */
amz.extend = function(depthClone, object) {
    var second, options, key, src, copy,
        i = 1,
        n = arguments.length,
        result = depthClone || {},
        copyIsArray, clone;
    
    amz.isBoolean( depthClone ) && (i = 2) && (result = object || {});
    !amz.isObject( result ) && (result = {});

    for (; i<n; i++) {
        options = arguments[i];
        if( amz.isObject(options) ) {
            for( key in options ) {
                src = result[key];
                copy = options[key];
                // Prevent never-ending loop
                if ( src === copy ) {
                    continue;
                }
                
                if(amz.isBoolean(depthClone) && depthClone && copy
                    && (amz.isPlainObject(copy) || (copyIsArray = amz.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && amz.isArray(src) ? src : [];
                        }else{
                            clone = src && amz.isPlainObject(src) ? src : {};
                        }
                        result[key] = amz.extend(depthClone, clone, copy);
                }else if(copy !== undefined){
                    result[key] = copy;
                }
            }
        }
    }
    return result;
};
/* extend 策略
   1、第一个参数为 bool ，则进行克隆操作，返回聚合后对象的副本
   2、第一个参数为 true  时进行深度克隆；
   3、第一个参数为 false 时进行浅克隆；
   4、接受聚合的对象不是一个object时，返回 空对象
//*/
