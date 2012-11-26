///import amz.regexp;
///import amz.string.getByteLength;

/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function
 * @ahthor meizz
 * @create 2012-11-09
 * @name amz.string.subByte
 * @grammar amz.string(str).subByte(len[, tail])
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */
amz.string.extend({
    subByte: function (len, tail) {
        amz.check("^number(,string)?$", "amz.string.subByte");

        if (len < 0 || this.getByteLength() <= len){
            return this.valueOf();
        }
        //thanks 加宽提供优化方法
        var source = this.substr(0, len)
            .replace(amz.regexp("([^\\x00-\\xff])", "g"), "\x241 ")//双字节字符替换成两个
            .substr(0, len)//截取长度
            .replace(amz.regexp("[^\\x00-\\xff]$"),"")//去掉临界双字节字符
            .replace(amz.regexp("([^\\x00-\\xff]) ", "g"),"\x241");//还原
        return source + (tail || "");
    }
});
