///import amz.string;

/**
 * @description 对指定的字符串作驼峰化处理
 * @author meizz
 * @create 2012-12-03
 * @function
 * @name amz.string.toCamelCase
 * @grammer amz.string.toCamelCase(str)
 * @return {String} 被驼峰化的字符串
 */
amz.string.toCamelCase = function(str){
    var r_ms = /^-ms-/
        ,r_w = /-([a-zA-Z])/g
        ,replacer = function(match, x){return x.toUpperCase()};

    // main function
    return function(str) {
        if ( !~str.indexOf("-") && !~str.indexOf("_") ) {
            return str;
        }

        return str.replace(r_ms, "ms-").replace(r_w, replacer);
    };
}();
