///import amz.type;
///import amz._extend;
///import amz.createChain;

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

    function(str){
        str = new String(~'string|number'.indexOf(amz.type(str)) ? str : "");

        return amz._extend( str, amz.string.fn );
    }
);