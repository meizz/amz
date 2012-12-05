///import amz.string;

/**
 * @description 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * @author meizz
 * @create 2012-12-03
 * @function 
 * @name amz.string.escapeReg
 * @grammar amz.string(str).escapeReg()
 * @return  {String}    转义后的字符串
 */
amz.string.extend({
    escapeReg: function() {
        var reg = /([.*+?^=!:\x24{}()|[\]\/\\])/g;

        return function() {
            return this.replace(reg, '\\\x241');
        }
    }()
});