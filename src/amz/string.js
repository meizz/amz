///import amz.createChain;
///import amz.forEach;
///import amz.type;

/**
 * @description string对象链式语法的链头，操作字符串
 * @author meizz
 * @create 2012-11-09
 * @function 
 * @name amz.string()
 * @grammar amz.string(str)
 * @param {String} str 一个需要处理的字符串
 * @return {TangramString} 返回一个TangramString对象
 */

amz.createChain("string",

    function(string){
        var type = amz.type(string),
            obj = new String(~'string|number'.indexOf(type) ? string : "");

        amz.forEach(amz.string.fn, function(item, index) { obj[ index ] = item; });
        return obj;
    }
);