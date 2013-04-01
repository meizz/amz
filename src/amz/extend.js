///import amz;

/**
 * @description 拷贝某对象的所有属性/方法
 *
 * @author meizz
 * @create 2012-06-01
 *
 * @function
 * @name amz.extend
 * @grammar amz.extend(obj0[, obj1[, obj2....]])
 *
 * @param   {Object}    target  接受其它对象向我拷贝
 * @param   {Object}    source  被拷贝的对象
 * @return  {Object}            合并后的对象
 */
amz.extend = function(target, source) {
    var i, p, n=arguments.length;

    for (p in source) {
        source.hasOwnProperty(p) && ( target[p] = source[p] );
    }

    if (n > 2) {
        for (i=2; i<n; i++) {
            amz.extend(target, arguments[i]);
        }
    }

    return target;
};
