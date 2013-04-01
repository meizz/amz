///import amz.string;

/**
 * @description 获取目标字符串在gbk编码下的字节长度
 * @function 
 * @ahthor meizz
 * @create 2012-11-09
 * @name amz.string.getByteLength
 * @grammar amz.string.getByteLength(str)
 * @return {Number} 字节长度
 */
amz.string.getByteLength = function (str) {
    return str.replace(/[^\x00-\xff]/g, "mm").length;
};

//获取字符在gbk编码下的字节长度, 实现原理是认为大于127的就一定是双字节。如果字符超出gbk编码范围, 则这个计算不准确
