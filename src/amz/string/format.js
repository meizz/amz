///import amz.string;

/**
 * @description 对目标字符串进行格式化
 * @author meizz
 * @create 2012-12-03
 * @function
 * @name amz.string.format
 * @grammar amz.string.format(str, obj1[, objn...])
 * @param   {String|Object} obj 提供相应数据的对象或多个字符串，参数类型为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
 * @return  {String}    格式化后的字符串
 */
amz.string.format = function () {
    var reg = /#\{([^\{\}]+)\}/g,
        data, slice = Array.prototype.slice,
        toString = Object.prototype.toString,
        replacer = function(match, key){
            var value = data[ key ];
            if (toString.call(value) == "[object Function]") value = value(key);
            return typeof value == "undefined" ? "" : value;
        };

    // main function
    return function(str, obj) {
        data = slice.call(arguments, 1);

        if(data.length){
            data = data.length == 1
                /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
                ? (obj && ( ~"[object Array]|[object Object]".indexOf(toString.call(obj)) )
                    ? obj
                    : data) 
                : data;
            return str.replace(reg, replacer);
        }
        return str;
    }
}();
