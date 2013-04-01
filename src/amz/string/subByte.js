///import amz.string.getByteLength;

/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function
 * @ahthor meizz
 * @create 2012-11-09
 * @name amz.string.subByte
 * @grammar amz.string.subByte(str, len[, tail])
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */
amz.string.subByte = function (str, len, tail) {
    amz.check("^number(,string)?$", "amz.string.subByte");

    if (len < 0 || amz.string.getByteLength(str) <= len){
        return str;
    }
    //thanks 加宽提供优化方法
    var source = str.substr(0, len)
        .replace(/([^\x00-\xff])/g, "\x241 ")//双字节字符替换成两个
        .substr(0, len)//截取长度
        .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
        .replace(/([^\x00-\xff])/g,"\x241");//还原
    return source + (tail || "");
};
