///import amz.type;
///import amz.isString;

/**
 * @description 分析形参对象的类型
 *
 * @author meizz
 * @create 2011-07-10
 * @modify
 *
 * @function
 * @name amz.check
 * @grammar amz.check(matching, position[, unchecked])
 *
 * @param   {String}    matching    被分析的形参匹配字符串
 * @param   {String}    position    被分析的模块名
 */
amz.check = function() {
    function check(list, i, reg) {
        var types = "", n;

        for (n=list.length; i<n; i++) {
            types += "," + amz.type( list[i] );
        }
        types.length && ( types = types.substr(1) );

        return reg.test(types);
    }

    return function(matching, position){
        if (!(amz.isString(matching) && amz.isString(position))) {
            throw new Error("Arguments error on amz.check!");
        }
        var rs = matching;
        rs.indexOf("^") != 0 && (rs = "^" + rs);
        rs.indexOf("$") != rs.length - 1 && (rs += "$");

        var caller, arg, i, n,
            types = "",
            reg = new RegExp(rs, "i");

        // 检查指定的对象(列)
        if (arguments.length > 2) {
            if (check(arguments, 2, reg)) return;
            else throw new Error("\u6307\u5b9a\u7684\u5bf9\u8c61\u7c7b\u578b\u4e0d\u7b26\u5408\u9884\u671f("+
                matching +")  \u4f4d\u7f6e\u5728 " + position);
        }

        // 检查函数参数类型
        if ( caller = arguments.callee.caller ) {
            if (!check(caller.arguments, 0, reg)) {
                throw new Error("\u51fd\u6570\u53c2\u6570\u7c7b\u578b\u4e0d\u7b26\u5408\u9884\u671f("+
                    matching +")  \u4f4d\u7f6e\u5728 " + ( position || caller.toString() ) );
            }
        }
    };
}();
