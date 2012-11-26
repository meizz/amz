///import amz.isFunction;
///import amz.isEnumerable;

/**
 * @description 去除 ArrayLike 中的重复项
 * @author meizz
 * @create 2012-07-30
 *
 * @function
 * @name amz.unique
 * @grammar amz.unique(list[, fn])
 * @param   {ArrayLike}     list    被除重的对象
 * @param   {Function}      fn      [可选]用于做除重对比的函数
 * @return  {Array}                 已经除重后的对象
 */

/**
 * @description 去除数组中的重复项
 *
 * @name amz.unique()
 * @function
 * @grammar $Array.unique([fn])
 * @param   {Function}      fn  用于做除重对比的函数
 * @return  {Array}             已经除重后的数组
 */
amz.unique = function (list, fn) {
    var isEqual = function(item1, item2) {return item1 === item2;};
    var cloneList = function(list){
        if (list.slice) return list.slice(0);

        var len = list.length, result = new Array(len);
        for (var i=0; i<len; i++) result[i] = list[i];
        return result;
    }

    return function(list, fn) {
        if (!amz.isEnumerable(list)) return list;
        amz.isFunction(fn) || ( fn = isEqual );

        var len = list.length,
            result = cloneList(list),
            i, x, y, datum;

        // 从后往前双重循环比较
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (fn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }

        len = list.length;
        list.length = result.length;
        for ( i=0; i<len; i++ ) {
            typeof result[i] == "undefined" ? delete list[i] : list[i] = result[i];
        }

        return list;
    }
}();