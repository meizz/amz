///import amz.string;

/**
 * @description 删除目标字符串两端的空白字符
 * @author meizz
 * @create 2012-12-03
 * @function 
 * @name amz.string.trim
 * @grammar amz.string.trim(str)
 * @return  {String}    删除两端空白字符后的字符串
 */
amz.string.trim = function(){
    var reg = /(^[\s\xA0\uFEFF\u3000]+)|([\u3000\uFEFF\xA0\s]+\x24)/g;

    return function(str){
        return str.replace(reg, "");
    }
}();