///import amz.regexp;

/**
 * @description 字符串做驼峰处理
 * @author meizz
 * @create 2012-12-04
 * @function
 * @name amz.camelCase
 * @grammer camelCase(str)
 * @param   {String}    str     需要被处理的字符串
 * @return  {String}    驼峰化处理后的字符串
 */
amz.camelCase = function() {
    var replacer = function(match, x){return x.toUpperCase()};

    // main function
    return function(str) {
        if ( !~str.indexOf("-") && !~str.indexOf("_") ) {
            return str;
        }

        return str.replace(amz.regexp("^-ms-"), "ms-")
                  .replace(amz.regexp("-([a-z0-9A-Z])", "g"), replacer);
    };
}();